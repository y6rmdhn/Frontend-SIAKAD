import CustomCard from "@/components/blocks/Card";
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput";
import { FormFieldSelect } from "@/components/blocks/CustomFormSelect/CustomFormSelect";
import InfoList from "@/components/blocks/InfoList";
import Title from "@/components/blocks/Title";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { IoMdDownload } from "react-icons/io";
import { FaRegTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const DetailVisitingScientist = () => {
  const form = useForm();

  return (
    <div className="mt-10 mb-20">
      <Title title="Visiting Scientist" subTitle="Detail Visiting Scientist" />
      <Form {...form}>
        <form>
          <CustomCard
            actions={
              <div className="flex justify-end gap-2">
                <Link to="/data-riwayat/pelaksanaan-pendidikan/datasering">
                  <Button
                    type="button"
                    className="bg-green-light-uika hover:bg-hover-green-uika"
                  >
                    <IoIosArrowBack /> Kembali ke Daftar
                  </Button>
                </Link>
                <Button
                  type="submit"
                  className="bg-yellow-uika hover:bg-hover-yellow-uika"
                >
                  <IoMdDownload /> Simpan
                </Button>
              </div>
            }
          >
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
            <div className="mt-10 grid grid-rows-5 grid-flow-col items-center gap-4 w-full">
              <FormFieldSelect
                label="Aktivitas Libmas"
                name="kategoriKegiatan"
                placeholder="--Pilih Aktivitas Libmas--"
                form={form}
                labelStyle="text-[#3F6FA9]"
                required={false}
                options={[
                  { value: "1", label: "Kenaikan 1" },
                  { value: "2", label: "Kenaikan 2" },
                ]}
              />

              <FormFieldSelect
                label="Kategori Capaian Luaran"
                name="kategoriKegiatan"
                placeholder="--Pilih Kategori Capaian Luaran--"
                form={form}
                labelStyle="text-[#3F6FA9]"
                required={false}
                options={[
                  { value: "1", label: "Kenaikan 1" },
                  { value: "2", label: "Kenaikan 2" },
                ]}
              />

              <FormFieldInput
                label="Perguruan Tinggi Pengundang"
                name="perguruanTinggiPengundang"
                form={form}
                placeholder="Cari Perguruan Tinggi Pengundang"
                required={true}
                labelStyle="text-[#3F6FA9]"
              />

              <FormFieldInput
                label="Lama Kegiatan (Hari)"
                name="lamaKegiatan"
                form={form}
                required={true}
                labelStyle="text-[#3F6FA9]"
              />

              <FormFieldInput
                label="Tanggal Input"
                name="tanggalInput"
                form={form}
                required={false}
                labelStyle="text-[#3F6FA9]"
              />

              <FormFieldSelect
                label="Kategori Kegiatan"
                name="kategoriKegiatan"
                placeholder="--Pilih Kategori Kegiatan--"
                form={form}
                labelStyle="text-[#3F6FA9]"
                required={true}
                options={[
                  { value: "1", label: "Kenaikan 1" },
                  { value: "2", label: "Kenaikan 2" },
                ]}
              />

              <FormFieldInput
                label="Nama Kegiatan"
                name="namaKegiatan"
                form={form}
                required={true}
                labelStyle="text-[#3F6FA9]"
              />

              <FormFieldInput
                label="Tanggal Pelaksanaan"
                name="tanggalPelaksanaan"
                type="date"
                form={form}
                required={true}
                labelStyle="text-[#3F6FA9]"
              />

              <FormFieldSelect
                label="SK Penugasan"
                name="skPenugasan"
                placeholder="--Pilih Sk Penugasan--"
                form={form}
                labelStyle="text-[#3F6FA9]"
                required={false}
                options={[
                  { value: "1", label: "Kenaikan 1" },
                  { value: "2", label: "Kenaikan 2" },
                ]}
              />
            </div>

            <h1 className="mt-10 text-green-light-uika font-semibold text-xl">
              Dokumen Pendukung
            </h1>

            <Separator className="w-full" />

            <div className="flex justify-end mt-10">
              <Button className="bg-green-light-uika hover:bg-hover-green-uika">
                <FaPlus /> Tambah
              </Button>
            </div>

            <Table className="mt-3 table-auto border-separate border-spacing-x-[1px]">
              <TableHeader>
                <TableRow className="bg-[#002E5A]">
                  <TableHead className="text-center text-white rounded-tl-lg">
                    Tipe Dokumen
                  </TableHead>
                  <TableHead className="text-center text-white">
                    Dokumen
                  </TableHead>
                  <TableHead className="text-center text-white">
                    Nama Dokumen
                  </TableHead>
                  <TableHead className="text-center text-white">
                    Jenis Dokumen
                  </TableHead>
                  <TableHead className="text-center text-white">
                    Keterangan
                  </TableHead>
                  <TableHead className="text-center text-white rounded-tr-lg">
                    Aksi
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-gray-200">
                <TableRow className=" even:bg-gray-100">
                  <TableCell className="text-center"></TableCell>
                  <TableCell className="text-center"></TableCell>
                  <TableCell className="text-center"></TableCell>
                  <TableCell className="text-center"></TableCell>
                  <TableCell className="text-center"></TableCell>
                  <TableCell className="h-full">
                    <div className="flex justify-center items-center w-full h-full">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="cursor-pointer"
                      >
                        <FaRegTrashAlt className="w-4! h-4! text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <Pagination className="mt-8 flex justify-end">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </CustomCard>
        </form>
      </Form>
    </div>
  );
};

export default DetailVisitingScientist;
