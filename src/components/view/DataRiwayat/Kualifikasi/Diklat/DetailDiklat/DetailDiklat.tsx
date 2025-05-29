import CustomCard from "@/components/blocks/Card";
import Title from "@/components/blocks/Title";
import { Button } from "@/components/ui/button";
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
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput";
import { FormFieldSelect } from "@/components/blocks/CustomFormSelect/CustomFormSelect";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import InfoList from "@/components/blocks/InfoList";

const DetailDiklat = () => {
  const form = useForm();
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
            <div className="flex justify-end gap-2 w-full flex-col md:flex-row">
              <Link
                className="w-full md:w-auto"
                to="/data-riwayat/kualifikasi/diklat"
              >
                <Button className="bg-green-light-uika w-full md:w-auto hover:bg-hover-green-uika">
                  <IoIosArrowBack /> Kembali ke Daftar
                </Button>
              </Link>
              <Link to="">
                <Button className="bg-[#FDA31A] w-full md:w-auto text-white cursor-pointer">
                  <MdOutlineFileDownload />
                  Simpan
                </Button>
              </Link>
            </div>
            <InfoList
              items={[
                "NIP",
                "Nama",
                "Unit Kerja",
                "Status",
                "Jab. Akademik",
                "Jab. Fungsional",
                "Jab. Struktural",
                "Pendidikan",
              ]}
            />

            <Form {...form}>
              <form>
                <div className="mt-10 grid md:grid-rows-8 md:grid-flow-col md:items-center gap-6 w-full">
                  {/* Kolom Kiri */}
                  <FormFieldSelect
                    label="Jenis Diklat"
                    name="jenisDiklat"
                    placeholder="-- pilih Jenis Diklat --"
                    form={form}
                    labelStyle="text-[#2572BE]"
                    required={true}
                    options={[
                      { value: "1", label: "Jenis 1" },
                      { value: "2", label: "Jenis 2" },
                      { value: "lain", label: "Lainnya" },
                    ]}
                  />

                  <FormFieldSelect
                    label="Kategori Kegiatan"
                    name="kategoriKegiatan"
                    placeholder="-- pilih Kategori Kegiatan --"
                    form={form}
                    labelStyle="text-[#2572BE]"
                    required={true}
                    options={[
                      { value: "1", label: "Kategori 1" },
                      { value: "2", label: "Kategori 2" },
                      { value: "lain", label: "Lainnya" },
                    ]}
                  />

                  <FormFieldSelect
                    label="Tingkatan Diklat"
                    name="tingkatanDiklat"
                    placeholder="-- pilih Tingkatan Diklat --"
                    form={form}
                    labelStyle="text-[#2572BE]"
                    required={true}
                    options={[
                      { value: "1", label: "Tingkat 1" },
                      { value: "2", label: "Tingkat 2" },
                      { value: "lain", label: "Lainnya" },
                    ]}
                  />

                  <FormFieldInput
                    label="Nama Diklat"
                    name="namaDiklat"
                    form={form}
                    required={true}
                    labelStyle="text-[#2572BE]"
                  />

                  <FormFieldInput
                    label="Penyelenggara"
                    name="penyelenggara"
                    form={form}
                    required={true}
                    labelStyle="text-[#2572BE]"
                  />

                  <FormFieldInput
                    label="Peran"
                    name="peran"
                    form={form}
                    labelStyle="text-[#2572BE]"
                  />

                  <FormFieldInput
                    label="Jumlah Jam"
                    name="jumlahJam"
                    form={form}
                    labelStyle="text-[#2572BE]"
                  />

                  <FormFieldInput
                    label="Nomor Sertifikat"
                    name="nomorSertifikat"
                    form={form}
                    required={true}
                    labelStyle="text-[#2572BE]"
                  />

                  <FormFieldInput
                    label="Tanggal"
                    name="tanggal"
                    type="date"
                    form={form}
                    required={true}
                    labelStyle="text-[#2572BE]"
                  />

                  <FormFieldInput
                    label="Tahun Penyelenggaraan"
                    name="tahunPenyelenggaraan"
                    placeholder="2004"
                    form={form}
                    required={true}
                    labelStyle="text-[#2572BE]"
                  />

                  <FormFieldInput
                    label="Tempat"
                    name="tempat"
                    form={form}
                    labelStyle="text-[#2572BE]"
                  />

                  {/* Kolom Kanan */}
                  <FormFieldInput
                    label="Tanggal Mulai"
                    name="tanggalMulai"
                    type="date"
                    form={form}
                    required={true}
                    labelStyle="text-[#2572BE]"
                  />

                  <FormFieldInput
                    label="Tanggal Selesai"
                    name="tanggalSelesai"
                    type="date"
                    form={form}
                    required={true}
                    labelStyle="text-[#2572BE]"
                  />

                  <FormFieldSelect
                    label="SK. Penugasan"
                    name="skPenugasan"
                    placeholder="-- Pilih SK. Penugasan --"
                    form={form}
                    required={false}
                    labelStyle="text-[#2572BE]"
                    options={[
                      { value: "1", label: "SK 1" },
                      { value: "2", label: "SK 2" },
                      { value: "lain", label: "Lainnya" },
                    ]}
                  />

                  <FormFieldInput
                    label="Tanggal Input"
                    name="tanggalInput"
                    form={form}
                    labelStyle="text-[#2572BE]"
                  />
                </div>
              </form>
            </Form>
          </div>
        }
      >
        <Table className="mt-10 table-auto">
          <TableHeader>
            <TableRow className="bg-[#002E5A]">
              <TableHead className="text-center text-white border">
                Tipe Dokumen
              </TableHead>
              <TableHead className="text-center text-white border">
                Dokumen
              </TableHead>
              <TableHead className="text-center text-white border">
                Nama Dokumen
              </TableHead>
              <TableHead className="text-center text-white border">
                Jenis Dokumen
              </TableHead>
              <TableHead className="text-center text-white border">
                Keterangan
              </TableHead>
              <TableHead className="text-center text-white">
                <Button className="w-5 h-5 bg-[#FDA31A] cursor-pointer">
                  <IoAdd />
                </Button>
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-200">
            <TableRow className=" even:bg-gray-100">
              <TableCell className="text-center border border-gray-200">
                <Select>
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

              <TableCell className="border border-gray-200">
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

              <TableCell className="text-center border border-gray-200"></TableCell>
              <TableCell className="text-center border border-gray-200">
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
              <TableCell className="text-center border border-gray-200"></TableCell>
              <TableCell className="h-full border border-gray-200">
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
      </CustomCard>
    </div>
  );
};

export default DetailDiklat;
