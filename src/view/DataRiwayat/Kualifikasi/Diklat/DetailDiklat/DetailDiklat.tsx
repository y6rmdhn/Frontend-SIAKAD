import CustomCard from "@/components/blocks/Card";
import Title from "@/components/blocks/Title";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
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
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { MdOutlineFileDownload } from "react-icons/md";
import { HiMiniTrash } from "react-icons/hi2";
import { IoAdd } from "react-icons/io5";

const DetailDiklat = () => {
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
    <div className="mt-10 mb-20">
      <Title title="Riwayat Diklat" subTitle="Detail Riwayat Diklat" />

      <CustomCard
        actions={
          <div>
            <div className="flex justify-end gap-2">
              <Link to="/data-riwayat/kualifikasi/diklat">
                <Button className="bg-green-light-uika hover:bg-hover-green-uika">
                  <IoIosArrowBack /> Kembali ke Daftar
                </Button>
              </Link>
              <Link to="">
                <Button className="bg-[#FDA31A] text-white cursor-pointer">
                  <MdOutlineFileDownload />
                  Simpan
                </Button>
              </Link>
            </div>
            <div className="w-full border-l-2 border-[#6AAEF1] grid grid-cols-2 gap-96 mt-10 bg-[#D6E8F9] p-4 ">
              <div className="flex flex-col gap-2 text-[#2572BE]">
                <p>NIP</p>
                <p>Nama</p>
                <p>Unit Kerja</p>
                <p>Status</p>
              </div>
              <div className="flex flex-col gap-2 text-[#2572BE]">
                <p>Jab. Akademik</p>
                <p>Jab. Fungsional</p>
                <p>Jab. Struktural</p>
                <p>Pendidikan</p>
              </div>
            </div>

            <div className="space-y-4 mt-20">
              <div className="grid grid-cols-2 gap-4">
                {/* Kolom Kiri */}
                <div className="space-y-4">
                  <div className="flex gap-20">
                    <Label className="w-40 text-[#2572BE]">
                      Jenis Diklat<span className="text-red-500">*</span>
                    </Label>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="-- pilih Jenis Diklat --" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sk">Jenis 1</SelectItem>
                        <SelectItem value="sk">Jenis 2</SelectItem>
                        <SelectItem value="lain">Lainnya</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex gap-14">
                    <Label className="w-50 text-[#2572BE]">
                      Kategori Kegiatan<span className="text-red-500">*</span>
                    </Label>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="-- pilih Kategori Kegiatan --" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sk">Kategori 1</SelectItem>
                        <SelectItem value="sk">Kategori 2</SelectItem>
                        <SelectItem value="lain">Lainnya</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex gap-14">
                    <Label className="w-50 text-[#2572BE]">
                      Tingkatan Diklat<span className="text-red-500">*</span>
                    </Label>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="-- pilih Tingkatan Diklat --" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sk">Tingkat 1</SelectItem>
                        <SelectItem value="sk">Tingkat 2</SelectItem>
                        <SelectItem value="lain">Lainnya</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex gap-14">
                    <Label className="w-50 text-[#2572BE]">
                      Nama Diklat<span className="text-red-500">*</span>
                    </Label>
                    <Input />
                  </div>

                  <div className="flex gap-14">
                    <Label className="w-50 text-[#2572BE]">
                      Penyelenggara<span className="text-red-500">*</span>
                    </Label>
                    <Input />
                  </div>

                  <div className="flex gap-14">
                    <Label className="w-50 text-[#2572BE]">
                      Peran
                    </Label>
                    <Input />
                  </div>

                  <div className="flex gap-14">
                    <Label className="w-50 text-[#2572BE]">
                      Jumlah Jam
                    </Label>
                    <Input />
                  </div>

                  <div className="flex gap-14">
                    <Label className="w-50 text-[#2572BE]">
                      Nomor Sertifikat<span className="text-red-500">*</span>
                    </Label>
                    <Input />
                  </div>

                  <div className="flex gap-14">
                    <Label className="w-50 text-[#2572BE]">
                      Tanggal <span className="text-red-500">*</span>
                    </Label>
                    <Input type="date" placeholder="dd - mm - yyyy" />
                  </div>

                  <div className="flex gap-14">
                    <Label className="w-50 text-[#2572BE]">
                      Tahun Penyelenggaraan<span className="text-red-500">*</span>
                    </Label>
                    <Input
                      placeholder="2004"
                    />
                  </div>

                  <div className="flex gap-14">
                    <Label className="w-50 text-[#2572BE]">
                      Tempat<span className="text-red-500">*</span>
                    </Label>
                    <Input
                      placeholder=""
                    />
                  </div>
                </div>

                {/* Kolom Kanan */}
                <div className="space-y-4">
                  <div className="flex gap-14">
                    <Label className="w-50 text-[#2572BE]">
                      Tanggal Mulai<span className="text-red-500">*</span>
                    </Label>
                    <Input type="date" placeholder="dd - mm - yyyy" />
                  </div>

                  <div className="flex gap-14">
                    <Label className="w-50 text-[#2572BE]">
                      Tanggal Selesai<span className="text-red-500">*</span>
                    </Label>
                    <Input type="date" placeholder="dd - mm - yyyy" />
                  </div>

                  <div className="flex gap-14">
                    <Label className="w-50 text-[#2572BE]">
                      SK. Penugasan
                    </Label>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="-- Pilih SK. Penugasan --" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="br">sk 1</SelectItem>
                        <SelectItem value="lm">sk 2</SelectItem>
                        <SelectItem value="lain">Lainnya</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex gap-14">
                    <Label className="w-50 text-[#2572BE]">
                      Tanggal Input
                    </Label>
                    <Input />
                  </div>

                </div>
              </div>
            </div>

            <Table className="mt-10 table-auto">
              <TableHeader>
                <TableRow className="bg-[#002E5A]">
                  <TableHead className="text-center text-white border-1">
                    Tipe Dokumen
                  </TableHead>
                  <TableHead className="text-center text-white border-1">
                    Dokumen
                  </TableHead>
                  <TableHead className="text-center text-white border-1">
                    Nama Dokumen
                  </TableHead>
                  <TableHead className="text-center text-white border-1">
                    Jenis Dokumen
                  </TableHead>
                  <TableHead className="text-center text-white border-1">
                    Keterangan
                  </TableHead>
                  <TableHead className="text-center text-white"><Button className="w-5 h-5 bg-[#FDA31A] cursor-pointer">
                    <IoAdd />
                  </Button></TableHead>
                </TableRow>
              </TableHeader>

              <TableBody className="divide-y divide-gray-200">
                <TableRow className=" even:bg-gray-100">
                  <TableCell className="text-center"><Select>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="File" />
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
                  </TableCell>

                  <TableCell className="">
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
                    <span className="text-blue-600 text-xs mt-1">
                      jpg.jpeg pdf (maxsize 2 MB)
                    </span>
                  </TableCell>

                  <TableCell className="text-center"></TableCell>
                  <TableCell className="text-center">
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="--Pilih Jenis Dokumen --" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="br">dokumen 1</SelectItem>
                        <SelectItem value="lm">dokumen 2</SelectItem>
                        <SelectItem value="lain">Lainnya</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-center"></TableCell>
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

export default DetailDiklat;
