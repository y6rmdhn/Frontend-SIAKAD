import CustomCard from "@/components/blocks/Card";
import Title from "@/components/blocks/Title";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import adminServices from "@/services/admin.services";
import { FaCheck } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

const StatusKeaktifan = () => {
  const { data } = useQuery({
    queryKey: ["status-keaktifan", 1],
    queryFn: async () => {
      const statusKeaktifanResponse = await adminServices.getStatusAktif();

      console.log(statusKeaktifanResponse.data.data.data);
      return statusKeaktifanResponse.data.data.data;
    },
  });

  return (
    <div className="mt-10 mb-20">
      <Title title="Status Keaktifan" subTitle="Daftar Status Aktif" />
      <CustomCard
        actions={
          <div className="flex justify-end gap-3">
            <Link to="/admin/referensi/kepegawaian/jabatan-struktural/detail-jabatan-struktural">
              <Button className="cursor-pointer bg-green-light-uika hover:bg-hover-green-uika">
                <FaPlus /> Tambah
              </Button>
            </Link>
          </div>
        }
      >
        <Table className="table-auto">
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="text-center">Kode</TableHead>
              <TableHead className="text-center">Nama Status Aktif</TableHead>
              <TableHead className="text-center">Status Keluar</TableHead>
              <TableHead className="text-center">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-200">
            {data?.map((item) => (
              <TableRow className=" even:bg-gray-100">
                <TableCell className="text-center">{item.kode}</TableCell>
                <TableCell className="text-center">
                  {item.nama_status_aktif}
                </TableCell>
                <TableCell className="flex text-center justify-center items-center w-full h-full">
                  {item.status_keluar ? (
                    <FaCheck className="text-green-500 w-4 h-4 mt-2" />
                  ) : (
                    <IoClose className="text-red-500 w-5 h-5 mt-2" />
                  )}
                </TableCell>
                <TableCell className="h-full">
                  <div className="flex text-center justify-center items-center w-full h-full">
                    <Link to="">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="cursor-pointer"
                      >
                        <MdEdit className="w-5! h-5! text-[#26A1F4]" />
                      </Button>
                    </Link>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="cursor-pointer"
                    >
                      <FaRegTrashAlt className="text-red-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
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
    </div>
  );
};

export default StatusKeaktifan;
