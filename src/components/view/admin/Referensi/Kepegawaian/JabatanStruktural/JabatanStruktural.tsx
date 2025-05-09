import CustomCard from "@/components/blocks/Card";
import SearchInput from "@/components/blocks/SearchInput";
import SelectFilter from "@/components/blocks/SelectFilter";
import Title from "@/components/blocks/Title";
import { Button } from "@/components/ui/button";
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
import { FaRegTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { IoEyeOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";

const JabatanStruktural = () => {
  return (
    <div className="mt-10 mb-20">
      <Title title="Jabatan Struktural" subTitle="Daftar Jabatan Struktural" />
      <CustomCard
        actions={
          <div className="flex">
            <Label className="w-32 text-[#FDA31A]">Jabatan Struktural</Label>
            <SelectFilter classname="ml-32 w-80" options={unitKerjaOptions} />
          </div>
        }
      />

      <div className="flex justify-between mt-6">
        <div className="flex gap-4">
          <SelectFilter options={unitKerjaOptions} />
          <SearchInput />
        </div>

        <div className="flex gap-3">
          <Link to="/admin/referensi/kepegawaian/jabatan-struktural/detail-jabatan-struktural">
            <Button className="cursor-pointer bg-green-light-uika hover:bg-hover-green-uika">
              <FaPlus /> Tambah
            </Button>
          </Link>
          <Button variant="destructive" className="cursor-pointe">
            <FaRegTrashAlt /> Hapus
          </Button>
        </div>
      </div>

      <Table className="mt-10 table-auto">
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="text-center">Kode</TableHead>
            <TableHead className="text-center">
              Nama Jabatan Struktural
            </TableHead>
            <TableHead className="text-center">
              Parent Jabatan Struktural
            </TableHead>
            <TableHead className="text-center">Unit Kerja</TableHead>
            <TableHead className="text-center">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-gray-200">
          <TableRow className=" even:bg-gray-100">
            <TableCell className="text-center"></TableCell>
            <TableCell className="text-center"></TableCell>
            <TableCell className="text-center"></TableCell>
            <TableCell className="text-center"></TableCell>
            <TableCell className="h-full">
              <div className="flex justify-center items-center w-full h-full">
                <Link to="">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="cursor-pointer"
                  >
                    <IoIosArrowUp className="w-6! h-6! text-yellow-uika" />
                  </Button>
                </Link>
                <Link to="">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="cursor-pointer"
                  >
                    <IoIosArrowDown className="w-6! h-6! text-yellow-uika" />
                  </Button>
                </Link>
                <Link to="">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="cursor-pointer"
                  >
                    <FaPlus className="w-5! h-5! text-green-500" />
                  </Button>
                </Link>
                <Link to="">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="cursor-pointer"
                  >
                    <IoEyeOutline className="w-5! h-5! text-[#26A1F4]" />
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

export default JabatanStruktural;
