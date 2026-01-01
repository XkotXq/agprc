"use client";

import React, { useMemo } from "react";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { cn } from "@/lib/utils";

const SlateViewer = ({ value }) => {
  const editor = useMemo(() => withReact(createEditor()), []);

  // Bezpieczna wartość, jeśli value jest undefined
  const safeValue = Array.isArray(value) && value.length > 0 ? value : [
    { type: "paragraph", children: [{ text: "" }] },
  ];

  const renderElement = ({ attributes, children, element }) => {
    const style = element.align ? { textAlign: element.align } : {};
    switch (element.type) {
      case "heading-one":
        return <h1 {...attributes} style={style} className="text-3xl font-extrabold">{children}</h1>;
      case "heading-two":
        return <h2 {...attributes} style={style} className="text-2xl font-bold">{children}</h2>;
      case "bulleted-list":
        return <ul {...attributes} style={style}>{children}</ul>;
      case "numbered-list":
        return <ol {...attributes} style={style}>{children}</ol>;
      case "list-item":
        return <li {...attributes} style={style}>{children}</li>;
      default:
        return <p {...attributes} style={style}>{children}</p>;
    }
  };

  const renderLeaf = ({ attributes, children, leaf }) => {
    if (leaf.bold) children = <strong>{children}</strong>;
    if (leaf.italic) children = <em>{children}</em>;
    if (leaf.underline) children = <u>{children}</u>;
    if (leaf.code) children = <code>{children}</code>;
    return <span {...attributes}>{children}</span>;
  };

  return (
    <Slate editor={editor} value={safeValue} onChange={() => {}} initialValue={safeValue}>
      <Editable
        readOnly
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        className={cn("prose dark:prose-invert")}
      />
    </Slate>
  );
};

export default SlateViewer;
