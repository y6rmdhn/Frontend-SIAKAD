import CustomCard from "@/components/blocks/Card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { MdEdit } from "react-icons/md";

const PeriodeCuti = () => {
  return (
    <div className="mt-10 mb-20">
      <h1 className="text-lg sm:text-2xl font-normal">Periode Cuti</h1>

      <CustomCard
        actions={
          <div className="flex flex-col lg:flex gap-4 lg:flex-row justify-between mt-6">
            <div className="w-full flex flex-col sm:flex-row gap-3">
              <Select>
                <SelectTrigger className="w-full sm:w-40 lg:w-32 text-xs sm:text-sm">
                  <SelectValue placeholder="--Semua--" />
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

              <div className="w-full lg:w-90 relative">
                <FiSearch className="absolute top-1/2 -translate-y-1/2 right-2" />
                <Input placeholder="Search" className="lg:w-90 pr-8 text-xs sm:text-sm w-full" />
              </div>
            </div>

            <Button className="cursor-pointer bg-green-light-uika hover:bg-[#329C59] text-xs sm:text-sm">
              <FaPlus /> Tambah
            </Button>
          </div>
        }
      >
        <Table className="mt-10 table-auto">
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="text-center text-xs sm:text-sm">NIP</TableHead>
              <TableHead className="text-center text-xs sm:text-sm">Nama Periode</TableHead>
              <TableHead className="text-center text-xs sm:text-sm">Tgl Mulai</TableHead>
              <TableHead className="text-center text-xs sm:text-sm">Tgl Selesai</TableHead>
              <TableHead className="text-center text-xs sm:text-sm">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-200">
            <TableRow className=" even:bg-gray-100">
              <TableCell className="text-center text-xs sm:text-sm">01</TableCell>
              <TableCell className="text-center text-xs sm:text-sm">Cuti Tahunan</TableCell>
              <TableCell className="text-center text-xs sm:text-sm">1 Jan 2024</TableCell>
              <TableCell className="text-center text-xs sm:text-sm">31 Des 2024</TableCell>
              <TableCell className="h-full">
                <div className="flex justify-center items-center w-full h-full">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="cursor-pointer"
                  >
                    <MdEdit className="w-5! h-5! text-[#26A1F4]" />
                  </Button>

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

export default PeriodeCuti;
