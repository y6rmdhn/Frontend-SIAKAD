import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon } from "lucide-react";
import { IoIosArrowBack, IoMdAdd, IoMdArrowRoundBack } from "react-icons/io";
import { MdSave } from "react-icons/md";
import { Separator } from "@/components/ui/separator";
import Title from "@/components/blocks/Title";
import CustomCard from "@/components/blocks/Card";
import React from 'react';
import SearchInput from "@/components/blocks/SearchInput";


const DetailBerita = () => {
  
  return (
     <div className="mt-10 mb-20">
        <Title title="Berita" subTitle="Detail Berita" />

        <Separator className="w-full bg-green-500" />
    
       <CustomCard
  actions={
    <div className=" ">
      <div className="flex justify-between items-center">
      <SearchInput />
        <div className="flex space-x-4 items-center">
          <Link to="/operasional/berita">
            <Button className="bg-[#1a64d3] hover:bg-hover-blue-200">
              <IoIosArrowBack /> Kembali ke Daftar
            </Button>
          </Link>
          <Link to="/operasional/berita/edit/1">
            <Button className="bg-[#3ABC67] hover:bg-hover-blue-200">
              <MdSave /> Simpan
            </Button>
          </Link>
        </div>
      </div>
    </div>
  }
/>
       <div className="space-y-5">
      {/* Unit */}
      <div>
        <Label className="text-sm font-semibold text-[#2572BE]">Unit*</Label>
        <Input value="Universitas Ibn Khaldun" disabled />
      </div>

      {/* Judul */}
      <div>
        <Label className="text-sm font-semibold text-[#2572BE]">Judul*</Label>
        <Input placeholder="Masukkan judul berita" />
      </div>

      {/* Isi Berita */}
      <div>
        <Label className="text-sm font-semibold text-[#2572BE]">Isi Berita*</Label>
        <div className="border p-2 rounded-md">
          {/* Editor Toolbar Placeholder */}
          <div className="flex items-center gap-2 mb-2">
            <select className="border px-2 py-1 rounded text-sm">
              <option>Normal text</option>
            </select>
            <button className="text-sm font-bold">Bold</button>
            <button className="italic text-sm">Italic</button>
            <button className="underline text-sm">Underline</button>
            {/* Simbol list / align */}
            <div className="ml-auto flex gap-1">
              <div className="w-5 h-5 bg-gray-300 rounded-sm" />
              <div className="w-5 h-5 bg-gray-300 rounded-sm" />
            </div>
          </div>
          <Textarea placeholder="Tulis isi berita di sini..." rows={6} />
        </div>
      </div>

      {/* Tanggal Posting & Expired */}
      <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
        <div>
          <Label className="text-sm font-semibold text-[#2572BE]">Tgl. Posting*</Label>
          <div className="relative">
            <Input placeholder="dd-mm-yyyy" />
            <CalendarIcon className="absolute right-2 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
        <div>
          <Label className="text-sm font-semibold text-[#2572BE]">Tgl. Expired*</Label>
          <div className="relative">
            <Input placeholder="dd-mm-yyyy" />
            <CalendarIcon className="absolute right-2 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Prioritas */}
      <div className="flex items-center gap-2">
        <Label className="text-sm font-semibold">Prioritas</Label>
        <Input type="checkbox" className="w-4 h-4" />
      </div>

      {/* Gambar Berita */}
      <div>
        <Label className="text-sm font-semibold">Gambar Berita</Label>
        <Input type="file" accept=".jpg,.jpeg" />
        <p className="text-xs text-gray-500 mt-1">jpg, jpeg (maxsize: 5 MB)</p>
      </div>

      {/* File Berita */}
      <div>
        <Label className="text-sm font-semibold">File Berita</Label>
        <Input type="file" accept=".jpg,.jpeg,.pdf" />
        <p className="text-xs text-gray-500 mt-1">jpg, jpeg, pdf (maxsize: 5 MB)</p>
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

      </div>
    );  
};

export default DetailBerita;
