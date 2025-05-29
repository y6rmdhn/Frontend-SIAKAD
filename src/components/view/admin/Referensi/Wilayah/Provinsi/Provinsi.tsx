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
import { FaRegTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";

const Provinsi = () => {
  return (
    <div className="mt-10 mb-20">
      <Title title="Provinsi" subTitle="Daftar Provinsi" />
      <CustomCard
        actions={
          <div className="w-full flex flex-col md:flex-row md:gap-2 gap-4 lg:gap-4 justify-between mt-6">
            <div className="w-full flex flex-col md:flex-row md:gap-2 gap-4 lg:gap-4">
              <SelectFilter options={unitKerjaOptions} classname="lg:w-32" />
              <SearchInput className="w-full lg:w-80" />
            </div>

            <div className="w-full flex gap-3 justify-end">
              <Link to="/admin/referensi/kepegawaian/jabatan-struktural/detail-jabatan-struktural">
                <Button className="cursor-pointer bg-green-light-uika hover:bg-hover-green-uika w-full md:w-auto text-xs sm:text-sm">
                  <FaPlus /> Tambah
                </Button>
              </Link>
            </div>
          </div>
        }
      >
        <Table className="table-auto">
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="text-center text-xs sm:text-sm">Kode</TableHead>
              <TableHead className="text-center text-xs sm:text-sm">Nama Provinsi</TableHead>
              <TableHead className="text-center text-xs sm:text-sm">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-200">
            <TableRow className=" even:bg-gray-100">
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
                      <MdEdit className="w-6! h-6! text-blue-uika" />
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

export default Provinsi;
