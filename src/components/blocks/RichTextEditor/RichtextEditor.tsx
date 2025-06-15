import React, { useMemo, useCallback } from "react";
import {
  createEditor,
  Descendant,
  Transforms,
  Editor,
  Element as SlateElement,
  BaseEditor,
} from "slate";
import {
  Slate,
  Editable,
  withReact,
  ReactEditor,
  RenderElementProps,
  RenderLeafProps,
  useSlate,
} from "slate-react";
import { withHistory, HistoryEditor } from "slate-history";
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaListUl,
  FaListOl,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaAlignJustify,
} from "react-icons/fa";

// ----- Tipe Data untuk Slate -----
type TextAlign = "left" | "center" | "right" | "justify";
type ParagraphElement = {
  type: "paragraph";
  align?: TextAlign;
  children: CustomText[];
};
type HeadingElement = {
  type: "heading-one" | "heading-two";
  align?: TextAlign;
  children: CustomText[];
};
type ListElement = {
  type: "numbered-list" | "bulleted-list";
  align?: TextAlign;
  children: ListItemElement[];
};
type ListItemElement = { type: "list-item"; children: CustomText[] }; // Align tidak perlu di list-item
type CustomElement =
  | ParagraphElement
  | HeadingElement
  | ListElement
  | ListItemElement;
type CustomText = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
};

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

const LIST_TYPES = ["numbered-list", "bulleted-list"];
const TEXT_ALIGN_TYPES = ["left", "center", "right", "justify"];

// ----- Objek Helper untuk Aksi Editor -----
const CustomEditor = {
  isMarkActive(
    editor: Editor,
    format: keyof Omit<CustomText, "text">
  ): boolean {
    const marks = Editor.marks(editor);
    return marks ? marks[format] === true : false;
  },
  isBlockActive(
    editor: Editor,
    format: CustomElement["type"] | TextAlign,
    blockType: "type" | "align" = "type"
  ): boolean {
    const { selection } = editor;
    if (!selection) return false;
    const [match] = Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        n[blockType] === format,
    });
    return !!match;
  },
  toggleMark(editor: Editor, format: keyof Omit<CustomText, "text">) {
    const isActive = CustomEditor.isMarkActive(editor, format);
    if (isActive) {
      Editor.removeMark(editor, format);
    } else {
      Editor.addMark(editor, format, true);
    }
  },
  toggleBlock(editor: Editor, format: CustomElement["type"]) {
    const isList = LIST_TYPES.includes(format);
    const [match] = Editor.nodes(editor, {
      match: (n) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        LIST_TYPES.includes(n.type),
    });
    const isListActive = !!match;

    Transforms.unwrapNodes(editor, {
      match: (n) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        LIST_TYPES.includes(n.type),
      split: true,
    });

    let newProperties: Partial<SlateElement>;
    if (
      isListActive &&
      isList &&
      SlateElement.isElement(match?.[0]) &&
      match[0].type === format
    ) {
      newProperties = { type: "paragraph" };
      Transforms.setNodes(editor, newProperties);
    } else if (isList) {
      newProperties = { type: "list-item" };
      Transforms.setNodes(editor, newProperties);
      const block = {
        type: format as "numbered-list" | "bulleted-list",
        children: [],
      };
      Transforms.wrapNodes(editor, block);
    } else {
      newProperties = {
        type: format as "paragraph" | "heading-one" | "heading-two",
      };
      Transforms.setNodes(editor, newProperties);
    }
  },
  toggleAlignment(editor: Editor, format: TextAlign) {
    const newProperties: Partial<SlateElement> = { align: format };
    Transforms.setNodes<SlateElement>(editor, newProperties);
  },
};

// ----- Komponen Tombol Toolbar -----
const ToolbarButton = ({
  format,
  icon,
  type,
}: {
  format: string;
  icon: React.ReactNode;
  type: "mark" | "block" | "align";
}) => {
  const editor = useSlate();
  let isActive = false;

  if (type === "mark") {
    isActive = CustomEditor.isMarkActive(editor, format as any);
  } else if (type === "align") {
    isActive = CustomEditor.isBlockActive(editor, format as any, "align");
  } else if (type === "block") {
    if (LIST_TYPES.includes(format)) {
      const [match] = Editor.nodes(editor, {
        match: (n) =>
          !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
      });
      isActive = !!match;
    } else {
      isActive = CustomEditor.isBlockActive(editor, format as any, "type");
    }
  }

  return (
    <button
      type="button"
      onMouseDown={(event) => {
        event.preventDefault();
        if (type === "mark") CustomEditor.toggleMark(editor, format as any);
        if (type === "block") CustomEditor.toggleBlock(editor, format as any);
        if (type === "align")
          CustomEditor.toggleAlignment(editor, format as any);
      }}
      style={{
        cursor: "pointer",
        padding: "5px",
        border: "1px solid transparent",
        borderRadius: "3px",
        color: isActive ? "black" : "#666",
        backgroundColor: isActive ? "#e0e0e0" : "transparent",
      }}
      title={format}
    >
      {icon}
    </button>
  );
};

// ----- PROPS UNTUK KOMPONEN UTAMA -----
interface RichTextEditorProps {
  value: Descendant[];
  onChange: (value: Descendant[]) => void;
  placeholder?: string;
}

// ----- KOMPONEN UTAMA EDITOR -----
export const RichTextEditor = ({
  value,
  onChange,
  placeholder,
}: RichTextEditorProps) => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  const renderElement = useCallback(
    ({ attributes, children, element }: RenderElementProps) => {
      const style = { textAlign: element.align };
      switch (element.type) {
        case "heading-one":
          return (
            <h1 style={style} {...attributes}>
              {children}
            </h1>
          );
        case "heading-two":
          return (
            <h2 style={style} {...attributes}>
              {children}
            </h2>
          );
        case "numbered-list":
          return (
            <ol
              className="list-decimal list-inside"
              style={style}
              {...attributes}
            >
              {children}
            </ol>
          );
        case "bulleted-list":
          return (
            <ul className="list-disc list-inside" style={style} {...attributes}>
              {children}
            </ul>
          );
        case "list-item":
          return (
            <li style={style} {...attributes}>
              {children}
            </li>
          );
        default:
          return (
            <p style={style} {...attributes}>
              {children}
            </p>
          );
      }
    },
    []
  );

  const renderLeaf = useCallback(
    ({ attributes, children, leaf }: RenderLeafProps) => {
      if (leaf.bold) {
        children = <strong>{children}</strong>;
      }
      if (leaf.italic) {
        children = <em>{children}</em>;
      }
      if (leaf.underline) {
        children = <u>{children}</u>;
      }
      return <span {...attributes}>{children}</span>;
    },
    []
  );

  return (
    <Slate editor={editor} initialValue={value} onChange={onChange}>
      <div className="w-full border rounded-md mt-1">
        <div className="flex items-center gap-2 p-2 border-b flex-wrap bg-gray-50 rounded-t-md">
          <select
            defaultValue="paragraph"
            onChange={(e) => {
              e.preventDefault();
              CustomEditor.toggleBlock(editor, e.target.value as any);
            }}
            className="border rounded p-1 text-sm bg-white"
          >
            <option value="paragraph">Teks Normal</option>
            <option value="heading-one">Heading 1</option>
            <option value="heading-two">Heading 2</option>
          </select>
          <ToolbarButton type="mark" format="bold" icon={<FaBold />} />
          <ToolbarButton type="mark" format="italic" icon={<FaItalic />} />
          <ToolbarButton
            type="mark"
            format="underline"
            icon={<FaUnderline />}
          />
          <ToolbarButton
            type="block"
            format="numbered-list"
            icon={<FaListOl />}
          />
          <ToolbarButton
            type="block"
            format="bulleted-list"
            icon={<FaListUl />}
          />
          <ToolbarButton type="align" format="left" icon={<FaAlignLeft />} />
          <ToolbarButton
            type="align"
            format="center"
            icon={<FaAlignCenter />}
          />
          <ToolbarButton type="align" format="right" icon={<FaAlignRight />} />
          <ToolbarButton
            type="align"
            format="justify"
            icon={<FaAlignJustify />}
          />
        </div>
        <div className="p-3 min-h-[200px]">
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            placeholder={placeholder || "Mulai mengetik..."}
            spellCheck
            autoFocus
          />
        </div>
      </div>
    </Slate>
  );
};
