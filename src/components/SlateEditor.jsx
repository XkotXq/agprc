"use client";
import React, { useState, useCallback, useMemo, forwardRef, useImperativeHandle } from "react";
import { createEditor, Transforms, Editor, Element as SlateElement } from "slate";
import { Slate, Editable, withReact, useSlate } from "slate-react";
import { withHistory } from "slate-history";
import { Bold, Italic, Underline, Code, Heading1, Heading2, List, ListOrdered, AlignLeft, AlignCenter, AlignRight, AlignJustify } from "lucide-react";
import clsx from "clsx";
import { cn } from "@/lib/utils";

const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
};

const LIST_TYPES = ["numbered-list", "bulleted-list"];
const TEXT_ALIGN_TYPES = ["left", "center", "right", "justify"];

const initialValue = [
  { type: "paragraph", children: [{ text: "" }] },
];

const SlateEditor = forwardRef(({ setDescription }, ref) => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const [value, setValue] = useState(initialValue);

  const renderElement = useCallback(props => <Element {...props} />, []);
  const renderLeaf = useCallback(props => <Leaf {...props} />, []);

  const extractText = (nodes) =>
    nodes.map(n => (SlateElement.isElement(n) ? extractText(n.children) : n.text)).join("");

  useImperativeHandle(ref, () => ({
    resetDescription: () => {
      const empty = [{ type: "paragraph", children: [{ text: "" }] }];
      setValue(empty);
      setDescription(empty);
      Transforms.delete(editor, {
        at: { anchor: Editor.start(editor, []), focus: Editor.end(editor, []) },
      });
    },
  }));

  return (
    <Slate
      initialValue={initialValue}
      editor={editor}
      value={value}
      onChange={(newValue) => {
        setValue(newValue);
        setDescription(newValue);
      }}
    >
      <div className="flex gap-1 mb-2 flex-wrap">
        <MarkButton format="bold" icon={<Bold className="size-5" />} />
        <MarkButton format="italic" icon={<Italic className="size-5" />} />
        <MarkButton format="underline" icon={<Underline className="size-5" />} />
        <MarkButton format="code" icon={<Code className="size-5" />} />
        <BlockButton format="heading-one" icon={<Heading1 className="size-5" />} />
        <BlockButton format="heading-two" icon={<Heading2 className="size-5" />} />
        <BlockButton format="numbered-list" icon={<ListOrdered className="size-5" />} />
        <BlockButton format="bulleted-list" icon={<List className="size-5" />} />
        <BlockButton format="left" icon={<AlignLeft className="size-5" />} />
        <BlockButton format="center" icon={<AlignCenter className="size-5" />} />
        <BlockButton format="right" icon={<AlignRight className="size-5" />} />
        <BlockButton format="justify" icon={<AlignJustify className="size-5" />} />
      </div>

      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder="Opis..."
        spellCheck={false}
        autoFocus
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-neutral-900 border-input w-full min-w-0 rounded-xl border bg-neutral-900 px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
        )}
        onKeyDown={(event) => {
          for (const hotkey in HOTKEYS) {
            if (window.isHotkey && window.isHotkey(hotkey, event)) {
              event.preventDefault();
              toggleMark(editor, HOTKEYS[hotkey]);
            }
          }
        }}
      />
    </Slate>
  );
});

function toggleBlock(editor, format) {
  const isActive = isBlockActive(editor, format, TEXT_ALIGN_TYPES.includes(format) ? "align" : "type");
  const isList = LIST_TYPES.includes(format);

  if (TEXT_ALIGN_TYPES.includes(format)) {
    Transforms.setNodes(editor, { align: isActive ? undefined : format }, {
      match: n => SlateElement.isElement(n)
    });
    return;
  }

  if (isList) {
    if (isActive) {
      Transforms.unwrapNodes(editor, {
        match: n => SlateElement.isElement(n) && LIST_TYPES.includes(n.type),
        split: true
      });
      Transforms.setNodes(editor, { type: "paragraph" }, {
        match: n => SlateElement.isElement(n) && n.type === "list-item",
        split: true
      });
    } else {
      Transforms.setNodes(editor, { type: "list-item" }, {
        match: n => SlateElement.isElement(n) && !LIST_TYPES.includes(n.type) && n.type !== "list-item"
      });
      const block = { type: format, children: [] };
      Transforms.wrapNodes(editor, block, { split: true });
    }
  } else {
    const newType = isActive ? "paragraph" : format;
    Transforms.setNodes(editor, { type: newType }, {
      match: n => SlateElement.isElement(n)
    });
  }
}

function toggleMark(editor, format) {
  const marks = Editor.marks(editor);
  if (marks && marks[format]) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
}

function isBlockActive(editor, format, blockType = "type") {
  const { selection } = editor;
  if (!selection) return false;
  const [match] = Array.from(Editor.nodes(editor, {
    at: Editor.unhangRange(editor, selection),
    match: n => !Editor.isEditor(n) && SlateElement.isElement(n) &&
      (blockType === "align" ? ("align" in n && n.align === format) : n.type === format)
  }));
  return !!match;
}

function Element({ attributes, children, element }) {
  const style = {};
  if ("align" in element) style.textAlign = element.align;

  switch (element.type) {
    case "bulleted-list": return <ul className="list-disc ml-5" {...attributes}>{children}</ul>;
    case "numbered-list": return <ol className="list-decimal ml-5" {...attributes}>{children}</ol>;
    case "list-item": return <li {...attributes}>{children}</li>;
    case "heading-one": return <h1 className="text-2xl" style={style} {...attributes}>{children}</h1>;
    case "heading-two": return <h2 className="text-xl" style={style} {...attributes}>{children}</h2>;
    default: return <p style={style} {...attributes}>{children}</p>;
  }
}

function Leaf({ attributes, children, leaf }) {
  if (leaf.bold) children = <strong>{children}</strong>;
  if (leaf.italic) children = <em>{children}</em>;
  if (leaf.underline) children = <u>{children}</u>;
  if (leaf.code) children = <code>{children}</code>;
  return <span {...attributes}>{children}</span>;
}

const BlockButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <button
      type="button"
      onPointerDown={e => e.preventDefault()}
      onClick={() => toggleBlock(editor, format)}
      className={clsx(
        "rounded-xl p-2 aspect-square",
        isBlockActive(editor, format, TEXT_ALIGN_TYPES.includes(format) ? "align" : "type")
          ? "bg-neutral-600/50 hover:bg-neutral-500/50"
          : "hover:bg-neutral-700/50"
      )}
    >
      {icon}
    </button>
  );
};

const MarkButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <button
      type="button"
      onPointerDown={e => e.preventDefault()}
      onClick={() => toggleMark(editor, format)}
      className={clsx(
        "rounded-xl p-2 aspect-square",
        editor && Editor.marks(editor)?.[format]
          ? "bg-neutral-600/50 hover:bg-neutral-500/50"
          : "hover:bg-neutral-700/50"
      )}
    >
      {icon}
    </button>
  );
};

export default SlateEditor;
