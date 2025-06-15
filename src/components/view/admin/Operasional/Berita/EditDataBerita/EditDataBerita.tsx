import CustomCard from "@/components/blocks/Card";
import Title from "@/components/blocks/Title";
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput";
import { FormFieldSelect } from "@/components/blocks/CustomFormSelect/CustomFormSelect";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import React, { useState, useMemo, useCallback } from "react";
import { useForm } from "react-hook-form";
import SearchInput from "@/components/blocks/SearchInput";
import { IoIosArrowBack, IoMdAdd } from "react-icons/io";
import { IoSaveSharp } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";
import { BiRefresh } from "react-icons/bi";
import { Link } from "react-router-dom";
import {FormFieldInputFile} from "@/components/blocks/CustomFormInputFile/CustomFormInputFile.tsx";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

//KODE AWAL SLATE JS

import { createEditor, Descendant, Transforms, Editor, Text, BaseEditor, Element as SlateElement } from 'slate';
import { Slate, Editable, withReact, ReactEditor, RenderElementProps, RenderLeafProps, useSlate } from 'slate-react';
import { withHistory, HistoryEditor } from 'slate-history';
import {
  FaBold, FaItalic, FaUnderline, FaListUl, FaListOl,
  FaAlignLeft, FaAlignCenter, FaAlignRight, FaAlignJustify
} from 'react-icons/fa';

// Definisi Tipe (Tetap sama, sudah benar)
type TextAlign = 'left' | 'center' | 'right' | 'justify';
type ParagraphElement = { type: 'paragraph'; align?: TextAlign; children: CustomText[] };
type HeadingElement = { type: 'heading-one' | 'heading-two'; align?: TextAlign; children: CustomText[] };
type ListElement = { type: 'numbered-list' | 'bulleted-list'; align?: TextAlign; children: ListItemElement[] };
type ListItemElement = { type: 'list-item'; align?: TextAlign; children: CustomText[] };
type CustomElement = ParagraphElement | HeadingElement | ListElement | ListItemElement;
type CustomText = { text: string; bold?: boolean; italic?: boolean; underline?: boolean; };

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}


const LIST_TYPES = ['numbered-list', 'bulleted-list'];
const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify'];

const CustomEditor = {
  isMarkActive(editor: Editor, format: keyof Omit<CustomText, 'text'>): boolean {
    const marks = Editor.marks(editor);
    return marks ? marks[format] === true : false;
  },

  isBlockActive(editor: Editor, format: CustomElement['type'] | TextAlign, blockType: 'type' | 'align' = 'type'): boolean {
    const { selection } = editor;
    if (!selection) return false;
    const [match] = Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: n =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        n[blockType] === format,
    });
    return !!match;
  },

  toggleMark(editor: Editor, format: keyof Omit<CustomText, 'text'>) {
    const isActive = CustomEditor.isMarkActive(editor, format);
    if (isActive) {
      Editor.removeMark(editor, format);
    } else {
      Editor.addMark(editor, format, true);
    }
  },

  // [FIX] FUNGSI INI DIUBAH TOTAL DENGAN LOGIKA YANG LEBIH BAIK
  toggleBlock(editor: Editor, format: CustomElement['type']) {
    const isList = LIST_TYPES.includes(format);

    // Cek apakah blok yang aktif adalah list
    const [match] = Editor.nodes(editor, {
        match: n =>
            !Editor.isEditor(n) &&
            SlateElement.isElement(n) &&
            LIST_TYPES.includes(n.type),
    });
    const isListActive = !!match;
    
    // Pertama, selalu batalkan format list yang ada
    Transforms.unwrapNodes(editor, {
      match: n =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        LIST_TYPES.includes(n.type),
      split: true,
    });
    
    let newProperties: Partial<SlateElement>;
    // Jika format yang ditekan adalah list yang sama dengan yang aktif,
    // maka kita hanya menonaktifkannya (mengubahnya jadi paragraf)
    if (isListActive && isList && SlateElement.isElement(match[0]) && match[0].type === format) {
        newProperties = { type: 'paragraph' };
        Transforms.setNodes(editor, newProperties);
    } 
    // Jika formatnya adalah list (dan tidak ada list yang aktif, atau listnya beda jenis)
    else if (isList) {
        newProperties = { type: 'list-item' };
        Transforms.setNodes(editor, newProperties);
        const block = { type: format as 'numbered-list' | 'bulleted-list', children: [] };
        Transforms.wrapNodes(editor, block);
    } 
    // Jika formatnya bukan list (seperti heading)
    else {
        newProperties = { type: format };
        Transforms.setNodes(editor, newProperties);
    }
  },

  toggleAlignment(editor: Editor, format: TextAlign) {
    const newProperties: Partial<SlateElement> = {
      align: format,
    };
    Transforms.setNodes<SlateElement>(editor, newProperties);
  }
};

const ToolbarButton = ({ format, icon, type }: { format: string; icon: React.ReactNode; type: 'mark' | 'block' | 'align' }) => {
    const editor = useSlate();
    let isActive = false;
    switch (type) {
        case 'mark':
            isActive = CustomEditor.isMarkActive(editor, format as any);
            break;
        case 'align':
            isActive = CustomEditor.isBlockActive(editor, format as any, 'align');
            break;
        case 'block':
            // Khusus untuk list, kita cek node parent
            if (LIST_TYPES.includes(format)) {
                const [match] = Editor.nodes(editor, {
                    match: n => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
                })
                isActive = !!match
            } else {
                isActive = CustomEditor.isBlockActive(editor, format as any, 'type');
            }
            break;
        default:
            isActive = false;
    }
    
    return (
        <button
            type="button"
            onMouseDown={event => {
                event.preventDefault();
                if (type === 'mark') CustomEditor.toggleMark(editor, format as any);
                if (type === 'block') CustomEditor.toggleBlock(editor, format as any);
                if (type === 'align') CustomEditor.toggleAlignment(editor, format as any);
            }}
            style={{ 
                cursor: 'pointer', padding: '5px', border: '1px solid transparent', borderRadius: '3px',
                color: isActive ? 'black' : '#666', backgroundColor: isActive ? '#e0e0e0' : 'transparent' 
            }}
            title={format}
        >
            {icon}
        </button>
    )
};

//KODE AKHIR SLATE JS

const EditDataBerita = () => {
    const form = useForm();

    //SLATE JS
      const editor = useMemo(() => withHistory(withReact(createEditor())), []);
      
      const initialValue: Descendant[] = [{ type: 'paragraph', align: 'left', children: [{ text: '' }] }];
      
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [value, setValue] = useState<Descendant[]>(initialValue);
    
      const renderElement = useCallback(({ attributes, children, element }: RenderElementProps) => {
        const style = { textAlign: element.align };
        switch (element.type) {
          case 'heading-one': return <h1 style={style} {...attributes}>{children}</h1>;
          case 'heading-two': return <h2 style={style} {...attributes}>{children}</h2>;
          case 'numbered-list': return <ol style={style} {...attributes}>{children}</ol>;
          case 'bulleted-list': return <ul style={style} {...attributes}>{children}</ul>;
          case 'list-item': return <li style={style} {...attributes}>{children}</li>;
          default: return <p style={style} {...attributes}>{children}</p>;
        }
      }, []);
    
      const renderLeaf = useCallback(({ attributes, children, leaf }: RenderLeafProps) => {
        if (leaf.bold) { children = <strong>{children}</strong>; }
        if (leaf.italic) { children = <em>{children}</em>; }
        if (leaf.underline) { children = <u>{children}</u>; }
        return <span {...attributes}>{children}</span>;
      }, []);
    
      //KODE AKHIR SLATE JS

    return (
        <div className="mt-10 mb-20">
            <Title title="Berita" subTitle="Detail Berita" />

            <Separator className="w-full bg-green-500" />

            <Form {...form}>
                <form>
                    <CustomCard
                        actions={
                            <div className="w-full flex flex-col gap-4 lg:flex-row justify-between">
                                <div className="w-full lg:w-96 relative">
                                    <SearchInput />
                                </div>

                                <div className="w-full flex flex-col lg:flex-row justify-end gap-2">
                                    <div>
                                        <Link
                                            className="w-full xl:w-auto"
                                            to="/admin/operasional/berita"
                                        >
                                            <Button className="bg-[#3ABC67] w-full xl:w-auto hover:bg-hover-blue-200 text-xs sm:text-sm">
                                                <IoIosArrowBack /> Kembali ke Daftar
                                            </Button>
                                        </Link>
                                    </div>
                                    <div>
                                        <Button className="bg-[#3ABC67] w-full xl:w-auto hover:bg-hover-blue-200 text-xs sm:text-sm">
                                            <IoSaveSharp /> Simpan
                                        </Button>
                                    </div>
                                    <div>
                                        <Button className="bg-[#3ABC67] w-full xl:w-auto hover:bg-hover-blue-200 text-xs sm:text-sm">
                                            <BiRefresh className="bg-[#FDA31A] rounded-full" /> Batal
                                        </Button>
                                    </div>
                                    <div>
                                        <Button className="bg-[#F56954] w-full xl:w-auto hover:bg-hover-blue-200 text-xs sm:text-sm">
                                            <FaRegTrashAlt /> Hapus
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        }
                    />
                    <div className="space-y-5 mt-5">
            {/* Unit */}
            <div>
              <Label className="text-sm font-semibold text-[#2572BE]">Unit<span className="text-red-500">*</span></Label>
              <Input value="Universitas Ibn Khaldun" disabled />
            </div>

            {/* Judul */}
            <div>
              <Label className="text-sm font-semibold text-[#2572BE]">Judul<span className="text-red-500">*</span></Label>
              <Input placeholder="Masukkan judul berita" />
            </div>

            {/* Isi Berita */}
            <div>
              <Label className="text-sm font-semibold text-[#2572BE]">Isi Berita<span className="text-red-500">*</span></Label>
              <Slate
                              editor={editor}
                              initialValue={initialValue}
                              onChange={newValue => {
                                const isAstChange = editor.operations.some(op => 'set_selection' !== op.type);
                                if (isAstChange) {
                                  setValue(newValue);
                                  editor.children = newValue;
                                }
                              }}
                            >
                              <div className="w-full border rounded-md mt-1">
                                <div className="flex items-center gap-2 p-2 border-b flex-wrap bg-gray-50">
                                  <select 
                                    defaultValue="paragraph"
                                    onChange={e => {
                                        e.preventDefault();
                                        CustomEditor.toggleBlock(editor, e.target.value as any);
                                    }}
                                    className="border rounded p-1 text-sm"
                                  >
                                    <option value="paragraph">Teks Normal</option>
                                    <option value="heading-one">Heading 1</option>
                                    <option value="heading-two">Heading 2</option>
                                  </select>
                                  <ToolbarButton type="mark" format="bold" icon={<FaBold />} />
                                  <ToolbarButton type="mark" format="italic" icon={<FaItalic />} />
                                  <ToolbarButton type="mark" format="underline" icon={<FaUnderline />} />
                                  <ToolbarButton type="block" format="numbered-list" icon={<FaListOl />} />
                                  <ToolbarButton type="block" format="bulleted-list" icon={<FaListUl />} />
                                  <ToolbarButton type="align" format="left" icon={<FaAlignLeft />} />
                                  <ToolbarButton type="align" format="center" icon={<FaAlignCenter />} />
                                  <ToolbarButton type="align" format="right" icon={<FaAlignRight />} />
                                  <ToolbarButton type="align" format="justify" icon={<FaAlignJustify />} />
                                </div>
                                <div className="p-3 min-h-[100px]">
                                  <Editable
                                    renderElement={renderElement}
                                    renderLeaf={renderLeaf}
                                    placeholder="Mulai mengetik..."
                                    spellCheck
                                    autoFocus
                                  />
                                </div>
                              </div>
                            </Slate>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-semibold text-[#2572BE]">Tgl. Posting<span className="text-red-500">*</span></Label>
                <div className="relative">
                  <Input type="date" />
                </div>
              </div>
              <div>
                <Label className="text-sm font-semibold text-[#2572BE]">Tgl. Expired<span className="text-red-500">*</span></Label>
                <div className="relative">
                  <Input type="date" />
                </div>
              </div>
            </div>

            {/* Prioritas */}
            <div>
              <FormFieldInput
                form={form}
                label="Prioritas"
                name="prioritas"
                type="checkbox"
                labelStyle="font-semibold"
                inputStyle="mt-2"
              />
            </div>

            {/* Gambar Berita */}
            <div>
              <FormFieldInputFile
                label="Gambar Berita"
                name="gambar_berita"
                required={false}
                labelStyle="font-semibold"
              />
            </div>

            {/* File Berita */}
            <div>
              <FormFieldInputFile
                label="File Berita"
                name="file_berita"
                required={false}
                labelStyle="font-semibold"
              />
            </div>

            {/* Penerima Berita */}
            <div className="flex items-center gap-2">
              <select className="w-full border px-2 py-2 rounded text-sm">
                <option>-- Pilih Penerima --</option>
              </select>
              <Button size="icon" className="bg-blue-500 text-white hover:bg-blue-600">
                <IoMdAdd />
              </Button>
            </div>
          </div>
                </form>
            </Form>
        </div>
    );
};

export default EditDataBerita;
