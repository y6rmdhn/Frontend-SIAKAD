import { Link } from "react-router-dom";
import CustomCard from "@/components/blocks/Card";
import Title from "@/components/blocks/Title";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useRef, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { MdOutlineFileDownload } from "react-icons/md";
const DetailKemampuanBahasa = () => {
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
      <Title title="Kemampuan Bahasa" subTitle="Detail Kemampuan Bahasa" />
      <CustomCard
        actions={
          <div>
            <div className="flex justify-end gap-2">
              <Link to="/data-riwayat/pengembangan-diri/kemampuan-bahasa">
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
                <div className="space-y-6">
                  <div className="flex gap-14">
                    <Label className="w-50 text-[#2572BE]">
                      Jenis Tes<span className="text-red-500">*</span>
                    </Label>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="- - pilih Jenis Tes - -" />
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
                      Penyelenggara<span className="text-red-500">*</span>
                    </Label>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="- - pilih Jenis Penghargaan - -" />
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
                      Skor Tes<span className="text-red-500">*</span>
                    </Label>
                    <Input />
                  </div>

                  <div className="flex gap-14">
                    <Label className="w-50 text-[#2572BE]">
                      SK Penugasan<span className="text-red-500">*</span>
                    </Label>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="- - pilih SK Penugasan - -" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sk">Kategori 1</SelectItem>
                        <SelectItem value="sk">Kategori 2</SelectItem>
                        <SelectItem value="lain">Lainnya</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Kolom Kanan */}
                <div className="space-y-6">
                  <div className="flex gap-14">
                    <Label className="w-50 text-[#2572BE]">
                      Nama Tes<span className="text-red-500">*</span>
                    </Label>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="- - Pilih Tingkat Penghargaan - -" />
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
                      Tanggal Tes<span className="text-red-500">*</span>
                    </Label>
                    <Input type="date" placeholder="dd - mm - yyyy" />
                  </div>

                  <div className="flex">
                    <Label className="w-50 text-[#2572BE]">
                      File Pendukung
                    </Label>
                    <div>
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          onClick={triggerFileInput}
                          className="h-5 bg-gray-200 rounded border text-black border-gray-400 hover:bg-gray-300"
                        >
                          Choose File
                        </Button>
                        <span className="text-sm italic text-gray-600">
                          {fileName}
                        </span>
                        <Input
                          ref={fileInputRef}
                          type="file"
                          accept=".pdf,.jpg,.jpeg"
                          className="hidden"
                          onChange={handleFileChange}
                        />
                      </div>
                      <span className="text-blue-600 text-xs">
                        jpg.jpeg pdf (maxsize 2.007152 MB)
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-14">
                    <Label className="w-50 text-[#2572BE]">Tanggal Input</Label>
                    <Input placeholder="22 April 2025" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
};

export default DetailKemampuanBahasa;
