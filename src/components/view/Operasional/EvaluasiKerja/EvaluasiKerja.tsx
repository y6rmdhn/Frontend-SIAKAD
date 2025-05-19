import Title from "@/components/blocks/Title";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import React from "react";
import { Link } from "react-router-dom";
import { IoEyeOutline } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";
import { MdOutlineFileDownload } from "react-icons/md";

const EvaluasiKerja = () => {
  return (
    <div className="mt-10 mb-20">
      <Title title="Evaluasi Kerja" subTitle="Form Evaluasi Kerja" />

      <div className="w-full grid grid-cols-2 gap-96 mt-10 bg-[#D6E8F9] p-4 text-[#2572BE]">
        <div className="flex flex-col gap-2">
          <p>NIP</p>
          <p>Nama Lengkap</p>
          <p>Unit Kerja</p>
          <p>Status</p>
        </div>
        <div className="flex flex-col gap-2">
          <p>Jab. Akademik</p>
          <p>Jab. Fungsional</p>
          <p>Jab. Struktural</p>
          <p>Pendidikan</p>
        </div>
      </div>

    <div className="flex justify-end mt-10">
          <div className="flex gap-4">
            <Link to="/data-riwayat/pelaksanaan-pengabdian/pembicara">
              <Button className="bg-green-light-uika hover:bg-[#329C59] cursor-pointer flex items-center gap-2">
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

      <Table className="mt-10">
        <TableHeader>
          <TableRow className="bg-[#2572BE] text-white">
            <TableHead className="text-center text-white">NIP</TableHead>
            <TableHead className="text-center text-white">Nama Pegawai</TableHead>
            <TableHead className="text-center text-white">Hubungan Kerja</TableHead>
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