import CustomCard from "@/components/commons/card";
import SearchInput from "@/components/commons/SearchInput";
import SelectFilter from "@/components/commons/SelectFilter";
import Title from "@/components/commons/Title";
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
import React from "react";
import { IoMdDownload } from "react-icons/io";

const MediaPubikasi = () => {
  return (
    <div className="mt-10 mb-20">
      <Title title="Media Publikasi" subTitle="Daftar Media Publikasi" />
      <CustomCard
        actions={
          <div className="flex justify-between mt-6">
            <div className="flex gap-4">
              <SelectFilter options={unitKerjaOptions} />
              <SearchInput />
            </div>

            <div className="flex gap-3">
              <Button className="cursor-pointer bg-green-light-uika hover:bg-hover-green-uika">
                <IoMdDownload /> Unduh dari SISTER
              </Button>
            </div>
          </div>
        }
      >
        <Table className="mt-10 table-auto">
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="text-center">Nama</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-200">
            <TableRow className=" even:bg-gray-100">
              <TableCell className="text-center"></TableCell>
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
    </div>
  );
};

export default MediaPubikasi;
