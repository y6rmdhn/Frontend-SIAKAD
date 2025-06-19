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
import InfoList from "@/components/blocks/InfoList";
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { FormFieldSelect } from "@/components/blocks/CustomFormSelect/CustomFormSelect";
import {DummyDataDosen} from "@/constant/DummyDataPegawai/dummyDataPegawai.ts";

const DetailRiwayatPekerjaan = () => {
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
      <Title title="Riwayat Pekerjaan" subTitle="Detail Riwayat Pekerjaan" />

      <CustomCard
        actions={
          <div>
            <div className="flex justify-end gap-2 w-full flex-col md:flex-row">
              <Link
                className="w-full md:w-auto"
                to="/data-riwayat/kualifikasi/riwayat-pekerjaan"
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
                  { label: "NIP", value: DummyDataDosen.pegawai_info.nip },
                  { label: "Nama", value: DummyDataDosen.pegawai_info.nama },
                  { label: "Unit Kerja", value: DummyDataDosen.pegawai_info.unit_kerja },
                  { label: "Status", value: DummyDataDosen.pegawai_info.status },
                  { label: "Jab. Akademik", value: DummyDataDosen.pegawai_info.jab_akademik },
                  { label: "Jab. Fungsional", value: DummyDataDosen.pegawai_info.jab_fungsional },
                  { label: "Jab. Struktural", value: DummyDataDosen.pegawai_info.jab_struktural },
                  { label: "Pendidikan", value: DummyDataDosen.pegawai_info.pendidikan },
                ]}
            />

            <Form {...form}>
              <form>
                <div className="mt-10 grid md:grid-rows-5 md:grid-flow-col md:items-center gap-6 w-full">
                  {/* Kolom Kiri */}
                  <FormFieldSelect
                    label="Bidang Usaha"
                    name="bidangUsaha"
                    placeholder="- - pilih Bidang Usaha - -"
                    form={form}
                    labelStyle="text-[#2572BE]"
                    required={true}
                    options={[
                      { value: "jenis1", label: "Jenis 1" },
                      { value: "jenis2", label: "Jenis 2" },
                      { value: "lain", label: "Lainnya" },
                    ]}
                  />

                  <FormFieldSelect
                    label="Jenis Pekerjaan"
                    name="jenisPekerjaan"
                    placeholder="- - pilih Jenis Pekerjaan - -"
                    form={form}
                    labelStyle="text-[#2572BE]"
                    required={true}
                    options={[
                      { value: "kategori1", label: "Kategori 1" },
                      { value: "kategori2", label: "Kategori 2" },
                      { value: "lain", label: "Lainnya" },
                    ]}
                  />

                  <FormFieldInput
                    label="Jabatan"
                    name="jabatan"
                    form={form}
                    required={true}
                    labelStyle="text-[#2572BE]"
                  />

                  <FormFieldInput
                    label="Area Pekerjaan"
                    name="area_pekerjaan"
                    form={form}
                    type="radio"
                    options={[
                      { value: "dalam_negri", label: "Dalam Negeri" },
                      { value: "luar_negri", label: "Luar Negeri" },
                    ]}
                    labelStyle="text-[#2572BE]"
                    placeholder="22 April 2025"
                  />

                  <FormFieldInput
                    label="Tanggal Input"
                    name="tanggalInput"
                    form={form}
                    labelStyle="text-[#2572BE]"
                    placeholder="22 April 2025"
                  />

                  {/* Kolom Kanan */}
                  <FormFieldInput
                    label="Divisi"
                    name="divisi"
                    form={form}
                    labelStyle="text-[#2572BE]"
                  />

                  <FormFieldInput
                    label="Deskripsi Kerja"
                    name="deskripsiKerja"
                    form={form}
                    labelStyle="text-[#2572BE]"
                  />

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
              <TableHead className="text-center text-white border">
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

export default DetailRiwayatPekerjaan;
