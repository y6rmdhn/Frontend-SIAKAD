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
import { FormFieldInputFile } from "@/components/blocks/CustomFormInputFile/CustomFormInputFile";
import { Link } from "react-router-dom";

const DetailDatasering = () => {
  const form = useForm();

  return (
    <div className="mt-10 mb-20">
      <Title title="Datasering" subTitle="Detail Datasering" />
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
            <div className="mt-10 grid grid-rows-5 grid-flow-col gap-2 w-full">
              <FormFieldSelect
                label="Kategori Kegiatan"
                name="kategoriKegiatan"
                placeholder="--Pilih Nama Jabatan--"
                form={form}
                labelStyle="text-[#3F6FA9]"
                required={true}
                options={[
                  { value: "1", label: "Kenaikan 1" },
                  { value: "2", label: "Kenaikan 2" },
                ]}
              />

              <FormFieldInput
                label="Perguruan Tinggi Sasaran"
                name="perguruanTinggiSasaran"
                form={form}
                required={true}
                type="date"
                labelStyle="text-[#3F6FA9]"
              />

              <FormFieldInput
                label="Bidang Tugas"
                name="perguruanTinggiSasaran"
                form={form}
                required={false}
                labelStyle="text-[#3F6FA9]"
              />

              <FormFieldInput
                label="Metode Pelaksanaan"
                name="metodePelaksanaan"
                form={form}
                required={false}
                labelStyle="text-[#3F6FA9]"
              />

              <FormFieldInput
                label="Tanggal Input"
                name="tanggalInput"
                placeholder="22 April 2025"
                form={form}
                required={false}
                labelStyle="text-[#3F6FA9]"
              />

              <FormFieldInput
                label="Tgl.Mulai"
                name="tgmMulai"
                form={form}
                type="date"
                required={false}
                labelStyle="text-[#3F6FA9]"
              />

              <FormFieldInputFile
                label="Tgl.Selesai"
                name="tgmMulai"
                form={form}
                type="file"
                required={false}
                labelStyle="text-[#3F6FA9]"
              />

              <FormFieldInput
                label="Deskripsi Kegiatan"
                name="deskripsiKegiatan"
                form={form}
                required={true}
                labelStyle="text-[#3F6FA9]"
              />

              <FormFieldInput
                label="SK Penugasan"
                name="skPenugasan"
                form={form}
                required={true}
                labelStyle="text-[#3F6FA9]"
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

export default DetailDatasering;
