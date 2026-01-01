import isHotkey from "is-hotkey";
import React, {
	useCallback,
	useMemo,
	useState,
	forwardRef,
	useImperativeHandle,
} from "react";
import {
	Editor,
	Element as SlateElement,
	Transforms,
	createEditor,
} from "slate";
import { withHistory } from "slate-history";
import { Editable, Slate, useSlate, withReact } from "slate-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import clsx from "clsx";
import {
	Bold,
	Italic,
	Underline,
	Code,
	Heading1,
	Heading2,
	List,
	ListOrdered,
	AlignLeft,
	AlignCenter,
	AlignRight,
	AlignJustify,
} from "lucide-react";

const createEmptyValue = () => [
	{
		type: "paragraph",
		children: [{ text: "" }],
	},
];

const HOTKEYS = {
	"mod+b": "bold",
	"mod+i": "italic",
	"mod+u": "underline",
	"mod+`": "code",
};
const LIST_TYPES = ["numbered-list", "bulleted-list"];
const TEXT_ALIGN_TYPES = ["left", "center", "right", "justify"];
const SlateEditor = forwardRef(function SlateEditor({ setDescription }, ref) {
	const [value, setValue] = useState(initialValue);
	const renderElement = useCallback((props) => <Element {...props} />, []);
	const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
	const editor = useMemo(() => withHistory(withReact(createEditor())), []);

	const extractText = (nodes) => {
		return nodes
			.map((n) =>
				SlateElement.isElement(n) ? extractText(n.children) : n.text
			)
			.join("");
	};

	useImperativeHandle(ref, () => ({
		resetDescription: () => {
			const empty = createEmptyValue();
			setValue(empty);
			setDescription(empty);
			Transforms.delete(editor, {
				at: {
					anchor: Editor.start(editor, []),
					focus: Editor.end(editor, []),
				},
			});
		},
	}));

	return (
		<Slate
			editor={editor}
			value={value}
			initialValue={value}
			onChange={(newValue) => {
				setValue(newValue);
				const text = extractText(newValue);
				setDescription(newValue);
			}}>
			<div className="flex gap-1 mb-2 flex-wrap">
				<MarkButton format="bold" icon={<Bold className="size-5" />} />
				<MarkButton format="italic" icon={<Italic className="size-5" />} />
				<MarkButton
					format="underline"
					icon={<Underline className="size-5" />}
				/>
				<MarkButton format="code" icon={<Code className="size-5" />} />
				<BlockButton
					format="heading-one"
					icon={<Heading1 className="size-5" />}
				/>
				<BlockButton
					format="heading-two"
					icon={<Heading2 className="size-5" />}
				/>
				<BlockButton
					format="numbered-list"
					icon={<ListOrdered className="size-5" />}
				/>
				<BlockButton
					format="bulleted-list"
					icon={<List className="size-5" />}
				/>
				<BlockButton format="left" icon={<AlignLeft className="size-5" />} />
				<BlockButton
					format="center"
					icon={<AlignCenter className="size-5" />}
				/>
				<BlockButton format="right" icon={<AlignRight className="size-5" />} />
				<BlockButton
					format="justify"
					icon={<AlignJustify className="size-5" />}
				/>
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
						if (isHotkey(hotkey, event)) {
							event.preventDefault();
							const mark = HOTKEYS[hotkey];
							toggleMark(editor, mark);
						}
					}
				}}
			/>
		</Slate>
	);
});
const toggleBlock = (editor, format) => {
	const isActive = isBlockActive(
		editor,
		format,
		isAlignType(format) ? "align" : "type"
	);
	const isList = isListType(format);
	Transforms.unwrapNodes(editor, {
		match: (n) =>
			!Editor.isEditor(n) &&
			SlateElement.isElement(n) &&
			isListType(n.type) &&
			!isAlignType(format),
		split: true,
	});
	let newProperties;
	if (isAlignType(format)) {
		newProperties = {
			align: isActive ? undefined : format,
		};
	} else {
		newProperties = {
			type: isActive ? "paragraph" : isList ? "list-item" : format,
		};
	}
	Transforms.setNodes(editor, newProperties);
	if (!isActive && isList) {
		const block = { type: format, children: [] };
		Transforms.wrapNodes(editor, block);
	}
};
const toggleMark = (editor, format) => {
	const isActive = isMarkActive(editor, format);
	if (isActive) {
		Editor.removeMark(editor, format);
	} else {
		Editor.addMark(editor, format, true);
	}
};
const isBlockActive = (editor, format, blockType = "type") => {
	const { selection } = editor;
	if (!selection) return false;
	const [match] = Array.from(
		Editor.nodes(editor, {
			at: Editor.unhangRange(editor, selection),
			match: (n) => {
				if (!Editor.isEditor(n) && SlateElement.isElement(n)) {
					if (blockType === "align" && isAlignElement(n)) {
						return n.align === format;
					}
					return n.type === format;
				}
				return false;
			},
		})
	);
	return !!match;
};
const isMarkActive = (editor, format) => {
	const marks = Editor.marks(editor);
	return marks ? marks[format] === true : false;
};
const Element = ({ attributes, children, element }) => {
	const style = {};
	if (isAlignElement(element)) {
		style.textAlign = element.align;
	}
	switch (element.type) {
		case "bulleted-list":
			return (
				<ul style={style} {...attributes}>
					{children}
				</ul>
			);
		case "heading-one":
			return (
				<h1 style={style} className="text-2xl" {...attributes}>
					{children}
				</h1>
			);
		case "heading-two":
			return (
				<h2 style={style} className="text-xl" {...attributes}>
					{children}
				</h2>
			);
		case "list-item":
			return (
				<li style={style} {...attributes}>
					{children}
				</li>
			);
		case "numbered-list":
			return (
				<ol style={style} {...attributes}>
					{children}
				</ol>
			);
		default:
			return (
				<p style={style} {...attributes}>
					{children}
				</p>
			);
	}
};
const Leaf = ({ attributes, children, leaf }) => {
	if (leaf.bold) {
		children = <strong>{children}</strong>;
	}
	if (leaf.code) {
		children = <code>{children}</code>;
	}
	if (leaf.italic) {
		children = <em>{children}</em>;
	}
	if (leaf.underline) {
		children = <u>{children}</u>;
	}
	return <span {...attributes}>{children}</span>;
};
const BlockButton = ({ format, icon }) => {
	const editor = useSlate();
	return (
		<SwitchButton
			type="button"
			active={isBlockActive(
				editor,
				format,
				isAlignType(format) ? "align" : "type"
			)}
			onPointerDown={(event) => event.preventDefault()}
			onClick={() => toggleBlock(editor, format)}
			data-test-id={`block-button-${format}`}>
			{icon}
		</SwitchButton>
	);
};
const MarkButton = ({ format, icon }) => {
	const editor = useSlate();
	return (
		<SwitchButton
			type="button"
			active={isMarkActive(editor, format)}
			onPointerDown={(event) => event.preventDefault()}
			onClick={() => toggleMark(editor, format)}
			data-test-id={`mark-button-${format}`}>
			{icon}
		</SwitchButton>
	);
};
const isAlignType = (format) => {
	return TEXT_ALIGN_TYPES.includes(format);
};
const isListType = (format) => {
	return LIST_TYPES.includes(format);
};
const isAlignElement = (element) => {
	return "align" in element;
};
const initialValue = [
	{
		type: "paragraph",
		children: [{ text: "" }],
	},
];
const SwitchButton = ({ className, active, children, ...props }) => {
	return (
		<button
			{...props}
			className={clsx(
				"rounded-xl p-2 aspect-square",
				active && "bg-neutral-600/50 hover:bg-neutral-500/50",
				!active && "hover:bg-neutral-700/50"
			)}>
			{children}
		</button>
	);
};
export default SlateEditor;
