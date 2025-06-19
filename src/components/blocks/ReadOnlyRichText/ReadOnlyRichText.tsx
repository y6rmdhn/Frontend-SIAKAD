import { useMemo, useCallback } from "react";
import { createEditor, Descendant } from "slate";
import {
  Slate,
  Editable,
  withReact,
  RenderElementProps,
  RenderLeafProps,
} from "slate-react";

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

type ListItemElement = {
  type: "list-item";
  align?: TextAlign;
  children: CustomText[];
};

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

const initialValue: Descendant[] = [
  { type: "paragraph", children: [{ text: "" }] },
];

interface ReadOnlyRichTextProps {
  content: string | Descendant[];
}

export const ReadOnlyRichText = ({ content }: ReadOnlyRichTextProps) => {
  const editor = useMemo(() => withReact(createEditor()), []);

  const parsedContent = useMemo((): Descendant[] => {
    if (!content) return initialValue;
    try {
      const result =
          typeof content === "string" ? JSON.parse(content) : content;
      return Array.isArray(result) && result.length > 0 ? result : initialValue;
    } catch (error) {
      console.error("Failed to parse rich text content:", error);
      return [{ type: "paragraph", children: [{ text: String(content) }] }];
    }
  }, [content]);

  const renderElement = useCallback(
      ({ attributes, children, element }: RenderElementProps) => {
        const style = { textAlign: (element as CustomElement).align };
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
        const customLeaf = leaf as CustomText;
        if (customLeaf.bold) children = <strong>{children}</strong>;
        if (customLeaf.italic) children = <em>{children}</em>;
        if (customLeaf.underline) children = <u>{children}</u>;
        return <span {...attributes}>{children}</span>;
      },
      []
  );

  return (
      <Slate editor={editor} initialValue={parsedContent}>
        <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            readOnly
            className="prose max-w-none"
        />
      </Slate>
  );
};
