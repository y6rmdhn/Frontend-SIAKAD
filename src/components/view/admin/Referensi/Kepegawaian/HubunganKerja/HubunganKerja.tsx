import CustomCard from "@/components/blocks/Card";
import SearchInput from "@/components/blocks/SearchInput";
import SelectFilter from "@/components/blocks/SelectFilter";
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
import unitKerjaOptions from "@/constant/dummyFilter";
import adminServices from "@/services/admin.services";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FaCheck, FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";

const HubunganKerja = () => {
  const { data } = useQuery({
    queryKey: ["hubungan-kerja"],
    queryFn: async () => {
      const response = await adminServices.getHubunganKerja();
      return response.data.data.data;
    },
  });

  return (
    <div className="mt-10">
      <Title title="Hubungan Kerja" />

      <CustomCard
        actions={
          <div className="flex justify-between mt-6">
            <div className="flex gap-4">
              <SelectFilter options={unitKerjaOptions} />
              <SearchInput />
            </div>

            <div className="flex gap-3">
              <Button className="cursor-pointer bg-green-light-uika hover:bg-[#329C59]">
                <FaPlus /> Tambah
              </Button>
            </div>
          </div>
        }
      >
        <Table className="mt-10 table-auto">
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="text-center">Kode</TableHead>
              <TableHead className="text-center">Nama Hubungan Kerja</TableHead>
              <TableHead className="text-center">Status Aktif</TableHead>
              <TableHead className="text-center">PNS</TableHead>
              <TableHead className="text-center">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-200">
            {data?.map((item) => (
              <TableRow className=" even:bg-gray-100">
                <TableCell className="text-center">{item.kode}</TableCell>
                <TableCell className="text-center">
                  {item.nama_hub_kerja}
                </TableCell>
                <TableCell>
                  <div className="flex justify-center items-center">
                    {item.status_aktif ? (
                      <FaCheck className="text-green-500 w-4 h-4" />
                    ) : (
                      <IoClose className="text-red-500 w-5 h-5" />
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex justify-center items-center">
                    {item.pns ? (
                      <FaCheck className="text-green-500 w-4 h-4" />
                    ) : (
                      <IoClose className="text-red-500 w-5 h-5" />
                    )}
                  </div>
                </TableCell>
                <TableCell className="h-full">
                  <div className="flex justify-center items-center w-full h-full">
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

export default HubunganKerja;
