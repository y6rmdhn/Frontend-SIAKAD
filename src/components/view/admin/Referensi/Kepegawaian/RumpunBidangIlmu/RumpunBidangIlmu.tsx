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
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";

const RumpunBidangIlmu = () => {
  return (
    <div className="mt-10 mb-20">
      <Title title="Rumpun Bidang Ilmu" subTitle="Daftar Rumpun Bidang Ilmu" />
      <CustomCard
        actions={
          <div className="grid grid-rows-2 gap-3 md:flex justify-between mt-6">
            <div className="grid grid-rows-2 sm:flex gap-4">
              <SelectFilter options={unitKerjaOptions} />
              <SearchInput />
            </div>

            <div className="flex gap-3">
              <Link to="/admin/referensi/kepegawaian/jabatan-struktural/detail-jabatan-struktural">
                <Button className="cursor-pointer bg-green-light-uika hover:bg-hover-green-uika sm:w-auto md:w-25 lg:w-auto md:text-xs lg:text-sm">
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
              <TableHead className="text-center text-xs sm:text-sm">Nama Bidang</TableHead>
              <TableHead className="text-center text-xs sm:text-sm">Parent Bidang</TableHead>
              <TableHead className="text-center text-xs sm:text-sm">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-200">
            <TableRow className=" even:bg-gray-100">
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
                      <FaPlus className="w-5! h-5! text-green-500" />
                    </Button>
                  </Link>
                  <Link to="">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="cursor-pointer"
                    >
                      <MdEdit className="w-5! h-5! text-[#26A1F4]" />
                    </Button>
                  </Link>
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

export default RumpunBidangIlmu;
