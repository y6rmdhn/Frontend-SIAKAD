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

const DetailPendidikanFormal = () => {
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
      <Title title="Pendidikan Formal" subTitle="Detail Pendidikan Formal" />

      <CustomCard
        actions={
          <div>
            <div className="flex justify-end gap-2">
              <Link to="/data-riwayat/kualifikasi/pendidikan-formal">
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

            <div className="mt-10">
              {/* Institusi */}
              <div className="border-b-1 border-[#FDA31A] mb-5">
                <h1 className="text-sm font-semibold text-[#3ABC67]">
                  Institusi
                </h1>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {/* Kolom Kiri */}
                  <div className="space-y-4">

                    <div className="flex gap-14">
                      <Label className="w-50 text-[#2572BE]">
                        Lokasi Studi
                      </Label>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-5">
                          <div className="flex items-center gap-2">
                            <Input
                              id="domestic"
                              name="area"
                              type="radio"
                              value="domestic"
                              className="h-3 w-3 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <Label
                              htmlFor="domestic"
                              className="ml-2 block text-xs sm:text-sm text-gray-900"
                            >
                              Dalam Negeri
                            </Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <Input
                              id="overseas"
                              name="area"
                              type="radio"
                              value="overseas"
                              className="h-3 w-3 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <Label
                              htmlFor="overseas"
                              className="ml-2 block text-xs sm:text-sm text-gray-900"
                            >
                              Luar Negeri
                            </Label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-20">
                      <Label className="w-40 text-[#2572BE]">
                        Jenjang Studi<span className="text-red-500">*</span>
                      </Label>
                      <Select>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="- - Pilih Jenjang Studi - -" />
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
                        Nama Institusi<span className="text-red-500">*</span>
                      </Label>
                      <Input />
                    </div>
                  </div>

                  {/* Kolom Kanan */}
                  <div className="space-y-4">


                  </div>
                </div>
              </div>
            </div>

            {/* Akademik */}
            <div className="mt-10">
              <div className="border-b-1 border-[#FDA31A] mb-5">
                <h1 className="text-sm font-semibold text-[#3ABC67]">
                  Akademik
                </h1>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {/* Kolom Kiri */}
                  <div className="space-y-4">

                    <div className="flex gap-14">
                      <Label className="w-50 text-[#2572BE]">
                        NISN
                      </Label>
                      <Input />
                    </div>

                    <div className="flex gap-20">
                      <Label className="w-40 text-[#2572BE]">
                        Konsentrasi
                      </Label>
                      <Input />
                    </div>

                  </div>

                  {/* Kolom Kanan */}
                  <div className="space-y-4">

                    <div className="flex gap-14">
                      <Label className="w-50 text-[#2572BE]">
                        Tahun Masuk<span className="text-red-500">*</span>
                      </Label>
                      <Input />
                    </div>

                    <div className="flex gap-14">
                      <Label className="w-50 text-[#2572BE]">
                        Tanggal Kelulusan<span className="text-red-500">*</span>
                      </Label>
                      <Input type="date" placeholder="dd - mm - yyyy" />
                    </div>

                    <div className="flex gap-14">
                      <Label className="w-50 text-[#2572BE]">
                        Tahun Lulus<span className="text-red-500">*</span>
                      </Label>
                      <Input />
                    </div>

                  </div>
                </div>
              </div>
            </div>

            {/* Ijazah */}
            <div className="mt-10">
              <div className="border-b-1 border-[#FDA31A] mb-5">
                <h1 className="text-sm font-semibold text-[#3ABC67]">
                  Ijazah
                </h1>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {/* Kolom Kiri */}
                  <div className="space-y-4">

                    <div className="flex gap-14">
                      <Label className="w-50 text-[#2572BE]">
                        Nomor Ijazah
                      </Label>
                      <Input />
                    </div>

                    <div className="flex gap-14">
                      <Label className="w-50 text-[#2572BE]">
                        Tanggal Ijazah
                      </Label>
                      <Input type="date" placeholder="dd - mm - yyyy" />
                    </div>

                    <div className="flex">
                      <Label className="w-50 text-[#2572BE]">File Ijazah</Label>
                      <div>
                        <div className="flex gap-2">
                          <Button
                            type="button"
                            onClick={triggerFileInput}
                            className="h-5 bg-gray-200 rounded border text-black border-gray-400 hover:bg-gray-300"
                          >
                            Choose File
                          </Button>
                          <span className="text-sm italic text-gray-600">{fileName}</span>
                          <Input
                            ref={fileInputRef}
                            type="file"
                            accept=".pdf,.jpg,.jpeg"
                            className="hidden"
                            onChange={handleFileChange}
                          />
                        </div>
                        <span className="text-blue-600 text-xs">
                          jpg.jpeg pdf (maxsize 2.097152 MB)
                        </span>
                      </div>
                    </div>

                    <div className="flex">
                      <Label className="w-50 text-[#2572BE]">File Transkrip</Label>
                      <div>
                        <div className="flex gap-2">
                          <Button
                            type="button"
                            onClick={triggerFileInput}
                            className="h-5 bg-gray-200 rounded border text-black border-gray-400 hover:bg-gray-300"
                          >
                            Choose File
                          </Button>
                          <span className="text-sm italic text-gray-600">{fileName}</span>
                          <Input
                            ref={fileInputRef}
                            type="file"
                            accept=".pdf,.jpg,.jpeg"
                            className="hidden"
                            onChange={handleFileChange}
                          />
                        </div>
                        <span className="text-blue-600 text-xs">
                          jpg.jpeg pdf (maxsize 2.097152 MB)
                        </span>
                      </div>
                    </div>


                  </div>

                  {/* Kolom Kanan */}
                  <div className="space-y-4">

                    <div className="flex gap-14">
                      <Label className="w-50 text-[#2572BE]">
                        Nomor Ijazah Negara
                      </Label>
                      <Input />
                    </div>

                    <div className="flex gap-14">
                      <Label className="w-50 text-[#2572BE]">
                        Tanggal Ijazah Negara
                      </Label>
                      <Input type="date" placeholder="dd - mm - yyyy" />
                    </div>


                  </div>
                </div>
              </div>
            </div>


            {/* Status Pengajuan */}
            <div className="mt-10">
              <div className="border-b-1 border-[#FDA31A] mb-5">
                <h1 className="text-sm font-semibold text-[#3ABC67]">
                  Status Pengajuan
                </h1>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {/* Kolom Kiri */}
                  <div className="space-y-4">

                    <div className="flex gap-14">
                      <Label className="w-50 text-[#2572BE]">
                        Tanggal Input
                      </Label>
                      <Input
                        placeholder="22 April 2025"
                      />
                    </div>
                  </div>

                  {/* Kolom Kanan */}
                  <div className="space-y-4">


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

export default DetailPendidikanFormal;
