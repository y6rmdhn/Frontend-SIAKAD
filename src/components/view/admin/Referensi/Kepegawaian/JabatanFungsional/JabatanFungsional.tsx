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
import unitKerjaOptions from "@/constant/dummyFilter";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";

const JabatanFungsional = () => {
  return (
    <div className="mt-10">
      <Title title="Jabatan Fungsional" subTitle="Daftar Jabatan Fungsional" />
      <CustomCard
        actions={
          <div className="grid grid-rows-2 sm:flex">
            <Label className="w-32 text-[#FDA31A]">Jabatan Fungsional</Label>
            <SelectFilter classname="sm:ml-32 w-full sm:w-45" options={unitKerjaOptions} />
          </div>
        }
      />

      <div className="w-full flex flex-col sm:flex-row gap-4 justify-between mt-6">
        <div className="w-full flex flex-col sm:flex-row gap-4">
          <SelectFilter options={unitKerjaOptions} classname="w-full md:w-32" />
          <SearchInput className="w-full md:w-80"/>
        </div>

        <div className="flex gap-3">
          <Link to="/admin/referensi/kepegawaian/jabatan-fungsional/detail-jabatan-fungsional">
            <Button className="cursor-pointer bg-green-light-uika hover:bg-[#329C59] w-full md:w-auto">
              <FaPlus /> Tambah
            </Button>
          </Link>
        </div>
      </div>

      <Table className="mt-10 table-auto">
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="text-center"></TableHead>
            <TableHead className="text-center text-xs sm:text-sm">Kode</TableHead>
            <TableHead className="text-center text-xs sm:text-sm">Jabatan Fungsional</TableHead>
            <TableHead className="text-center text-xs sm:text-sm">Golongan/Pangkat</TableHead>
            <TableHead className="text-center text-xs sm:text-sm">Angka Kredit</TableHead>
            <TableHead className="text-center text-xs sm:text-sm">Usia Pensiun</TableHead>
            <TableHead className="text-center text-xs sm:text-sm">Referensi Sister</TableHead>
            <TableHead className="text-center text-xs sm:text-sm">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-gray-200">
          <TableRow className=" even:bg-gray-100">
            <TableCell className="text-center">
              <Checkbox />
            </TableCell>
            <TableCell className="text-center text-xs sm:text-sm"></TableCell>
            <TableCell className="text-center text-xs sm:text-sm"></TableCell>
            <TableCell className="text-center text-xs sm:text-sm"></TableCell>
            <TableCell className="text-center text-xs sm:text-sm"></TableCell>
            <TableCell className="text-center text-xs sm:text-sm"></TableCell>
            <TableCell className="text-center text-xs sm:text-sm"></TableCell>
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
                <Button size="icon" variant="ghost" className="cursor-pointer">
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
    </div>
  );
};

export default JabatanFungsional;
