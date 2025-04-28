import CustomCard from "@/components/blocks/Card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FiSearch } from "react-icons/fi";
import { IoAdd } from "react-icons/io5";
import { HiMiniTrash } from "react-icons/hi2";
import { IoChevronBackOutline } from "react-icons/io5";
import { MdOutlineFileDownload } from "react-icons/md";
import React, { useRef, useState } from "react";

const DetailDokumenInternal = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>("No file chosen");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("Ukuran file maksimal 2 MB!");
        event.target.value = ""; // reset input
        setFileName("No file chosen");
      } else {
        setFileName(file.name);
      }
    } else {
      setFileName("No file chosen");
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="mt-10">
      <h1 className="text-xl  font-bold">
        Dokumen Internal{" "}
        <span className="text-[13px] text-muted-foreground font-normal">
          Detail Dokumen Internal
        </span>
      </h1>
      <CustomCard
        actions={
          <div className="">
            <div className="flex justify-between mb-5">
              <div className="flex gap-6">
                <div className="relative">
                  <FiSearch className="absolute top-1/2 -translate-y-1/2 right-2" />
                  <Input
                    placeholder="Cari Nama Dokumen Internal"
                    className="w-80 pr-8"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="bg-[#87E39B] text-white cursor-pointer">
                  <IoChevronBackOutline />
                  Kembali Ke Daftar
                </Button>
                <Button className="bg-[#FDA31A] text-white cursor-pointer">
                  <MdOutlineFileDownload />
                  Simpan
                </Button>
              </div>
            </div>

            {/* Data Dokumen Section */}
            <div className="space-y-4">
              <div className="border-b-1 border-[#FDA31A]">
                <h1 className="text-sm font-normal text-[#FDA31A]">
                  Data Dokumen
                </h1>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {/* Kolom Kiri */}
                <div className="space-y-4">
                  <div className="flex gap-20">
                    <Label className="w-40 text-[#002E5A]">
                      No. Dokumen<span className="text-red-500">*</span>
                    </Label>
                    <Input />
                  </div>

                  <div className="flex gap-14">
                    <Label className="w-50 text-[#002E5A]">
                      Nama Dokumen<span className="text-red-500">*</span>
                    </Label>
                    <Input />
                  </div>

                  <div className="flex gap-14">
                    <Label className="w-50 text-[#002E5A]">
                      Uraian Singkat
                    </Label>
                    <Input />
                  </div>

                  <div className="flex gap-14">
                    <Label className="w-50 text-[#002E5A]">URL Dokumen</Label>
                    <Input />
                  </div>

                  <div className="flex gap-14">
                    <Label className="w-50 text-[#002E5A]">
                      Tanggal Dokumen<span className="text-red-500">*</span>
                    </Label>
                    <Input type="date" placeholder="dd - mm - yyyy" />
                  </div>

                  <div className="flex gap-14">
                    <Label className="w-50 text-[#002E5A]">
                      Jenis Dokumen<span className="text-red-500">*</span>
                    </Label>
                    <Input
                      className="text-center"
                      placeholder="Surat Keputusan"
                    />
                  </div>
                </div>

                {/* Kolom Kanan */}
                <div className="space-y-4">
                  <div className="flex gap-14">
                    <Label className="w-50 text-[#002E5A]">
                      Menu referensi
                    </Label>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pengajaran" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sk">Surat Keputusan</SelectItem>
                        <SelectItem value="sk">Pengajaran</SelectItem>
                        <SelectItem value="lain">Lainnya</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex">
                    <Label className="w-50 text-[#002E5A]">File</Label>
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        onClick={triggerFileInput}
                        className="bg-gray-200 rounded border text-black border-gray-400 hover:bg-gray-300"
                      >
                        Choose File
                      </Button>
                      <span className="italic text-gray-600">{fileName}</span>
                      <Input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf,.jpg,.jpeg"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </div>
                  </div>

                  <div className="flex gap-14">
                    <Label className="w-50 text-[#002E5A]">
                      Status Dokumen
                    </Label>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Baru" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="br">Baru</SelectItem>
                        <SelectItem value="lm">Lama</SelectItem>
                        <SelectItem value="lain">Lainnya</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex gap-14">
                    <Label className="w-50 text-[#002E5A]">
                      Tingkat<span className="text-red-500">*</span>
                    </Label>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="--Pilih Tingkat--" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="t1">tingkat 1</SelectItem>
                        <SelectItem value="t2">tingkat 2</SelectItem>
                        <SelectItem value="lain">Lainnya</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex gap-14">
                    <Label className="w-80 text-[#002E5A]">
                      Nama Pejabat Penetap
                    </Label>
                    <div className="relative w-full">
                      <FiSearch className="absolute top-1/2 -translate-y-1/2 right-2" />
                      <Input
                        placeholder="Cari Pejabat Penetap"
                        className="w-80 pr-8"
                      />
                    </div>
                  </div>

                  <div className="flex gap-14">
                    <Label className="w-50 text-[#002E5A]">
                      Nama Validator
                    </Label>
                    <div className="relative">
                      <FiSearch className="absolute top-1/2 -translate-y-1/2 right-2" />
                      <Input
                        placeholder="Cari Nama Validator"
                        className="w-80 pr-8"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-b-1 border-[#FDA31A] mb-5 mt-10">
              <h1 className="text-sm font-normal text-[#FDA31A]">
                Data Dokumen
              </h1>
            </div>
            <Table className=" table-auto">
              <TableHeader>
                <TableRow className="bg-[#002E5A] ">
                  <TableHead className="text-center text-white">
                    Pegawai
                  </TableHead>
                  <TableHead className="w-10 text-center text-white">
                    <Button className="w-5 h-5 bg-[#FDA31A] cursor-pointer">
                      <IoAdd />
                    </Button>
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody className="bg-white divide-y divide-gray-200">
                <TableRow className=" even:bg-gray-100">
                  <TableCell className="text-center">
                    <div className="flex justify-between">
                      <Select>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="-- Pilih Pegawai --" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Unit Kerja</SelectLabel>
                            <SelectItem value="apple">Apple</SelectItem>
                            <SelectItem value="banana">Banana</SelectItem>
                            <SelectItem value="blueberry">Blueberry</SelectItem>
                            <SelectItem value="grapes">Grapes</SelectItem>
                            <SelectItem value="pineapple">Pineapple</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </TableCell>
                  <TableCell className="h-full">
                    <div className="flex justify-center items-center w-full h-full">
                      <Link to="">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="cursor-pointer"
                        >
                          <HiMiniTrash className="w-5! h-5! text-[#FD1A1E]" />
                        </Button>
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        }
      />
    </div>
  );
};

export default DetailDokumenInternal;
