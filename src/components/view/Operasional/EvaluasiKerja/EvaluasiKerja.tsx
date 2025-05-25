import Title from "@/components/blocks/Title";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import React from "react";
import { Link } from "react-router-dom";
import { IoEyeOutline } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";
import { MdOutlineFileDownload } from "react-icons/md";
import InfoList from "@/components/blocks/InfoList";

const EvaluasiKerja = () => {
  return (
    <div className="mt-10 mb-20">
      <Title title="Evaluasi Kerja" subTitle="Form Evaluasi Kerja" />

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

      <div className="flex justify-end mt-10">
        <div className="flex flex-col md:flex-row w-full md:w-auto gap-4">
          <Link
            className="w-full md:w-auto"
            to="/data-riwayat/pelaksanaan-pengabdian/pembicara"
          >
            <Button className="bg-green-light-uika w-full md:w-auto hover:bg-[#329C59] cursor-pointer flex items-center gap-2">
              <IoIosArrowBack />
              Kembali ke Daftar
            </Button>
          </Link>

          <Button className="bg-[#FDA31A] hover:bg-[#329C59] cursor-pointer flex items-center gap-2">
            <MdOutlineFileDownload />
            Simpan
          </Button>
        </div>
      </div>

      <Table className="mt-10 table-auto text-xs lg:text-sm">
        <TableHeader>
          <TableRow className="bg-[#2572BE] text-white">
            <TableHead className="text-center text-white">NIP</TableHead>
            <TableHead className="text-center text-white">
              Nama Pegawai
            </TableHead>
            <TableHead className="text-center text-white">
              Hubungan Kerja
            </TableHead>
            <TableHead className="text-center text-white">Fungsional</TableHead>
            <TableHead className="text-center text-white">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className=" even:bg-gray-100">
            <TableCell className="text-center"></TableCell>
            <TableCell className="text-center"></TableCell>
            <TableCell className="text-center"></TableCell>
            <TableCell className="text-center"></TableCell>
            <TableCell className="h-full">
              <div className="flex justify-center items-center w-full h-full">
                <Link to="/admin/operasional/kompensasi/detail-dokumen-internal">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="cursor-pointer"
                  >
                    <IoEyeOutline className="w-5! h-5! text-[#26A1F4]" />
                  </Button>
                </Link>
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
            <PaginationLink href="#" isActive>
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
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
    </div>
  );
};

export default EvaluasiKerja;
