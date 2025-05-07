import CustomCard from "@/components/blocks/Card";
import SearchInput from "@/components/blocks/SearchInput";
import SelectFilter from "@/components/blocks/SelectFilter";
import Title from "@/components/blocks/Title";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
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
import adminServices from "@/services/admin.services";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FaCheck, FaRegTrashAlt } from "react-icons/fa";
import { IoClose, IoEyeOutline } from "react-icons/io5";
import { parseISO, format } from "date-fns";

const Berita = () => {
  const { data, isPending } = useQuery({
    queryKey: ["berita"],
    queryFn: async () => {
      const response = await adminServices.getBerita();
      return response.data.data.data;
    },
  });

  const handleDateFormat = (dates) => {
    const isoDate = dates;
    const date = parseISO(isoDate);

    return format(date, "d MMM yyyy");
  };

  return (
    <div className="mt-10 mb-20">
      <Title title="Berita" subTitle="Daftar Berita" />

      <CustomCard
        actions={
          <div className="flex">
            <Label className="w-60 text-yellow-uika">Unit Kerja</Label>
            <SelectFilter
              classname="w-92"
              placeholder="04001 - Universitas Ibn Khaldun"
              options={[{ value: "apple", label: "apple" }]}
            />
          </div>
        }
      />

      <div className="flex justify-between mt-6">
        <div className="flex gap-4">
          <SelectFilter
            classname="w-32"
            placeholder="--Semua--"
            options={[{ value: "apple", label: "apple" }]}
          />

          <SearchInput />
        </div>

        <Button className="bg-green-light-uika hover:bg-hover-green-uika">
          Batalkan
        </Button>
      </div>

      <Table className="mt-10 table-auto">
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="text-center"></TableHead>
            <TableHead className="text-center">Unit Kerja</TableHead>
            <TableHead className="text-center">Judul</TableHead>
            <TableHead className="text-center">Tgl Posting</TableHead>
            <TableHead className="text-center">Tgl Expired</TableHead>
            <TableHead className="text-center">Prioritas</TableHead>
            <TableHead className="text-center">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-gray-200">
          {data?.map((item) => (
            <TableRow className=" even:bg-gray-100">
              <TableCell className="text-center">
                <Checkbox />
              </TableCell>
              <TableCell className="text-center">
                {item.unit_kerja_id[0]}
              </TableCell>
              <TableCell className="text-center">{item.judul}</TableCell>
              <TableCell className="text-center">
                {handleDateFormat(item.tgl_posting)}
              </TableCell>
              <TableCell className="text-center">
                {handleDateFormat(item.tgl_expired)}
              </TableCell>
              <TableCell className="text-center">
                <div className="flex justify-center">
                  {item.prioritas ? (
                    <FaCheck className="text-green-500 w-4 h-4 mt-2" />
                  ) : (
                    <IoClose className="text-red-500 w-5 h-5 mt-2" />
                  )}
                </div>
              </TableCell>
              <TableCell className="h-full">
                <div className="flex justify-center items-center w-full h-full">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="cursor-pointer"
                  >
                    <IoEyeOutline className="w-5! h-5! text-[#26A1F4]" />
                  </Button>

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
    </div>
  );
};

export default Berita;
