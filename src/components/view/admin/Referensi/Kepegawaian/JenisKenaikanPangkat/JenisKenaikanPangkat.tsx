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
import { FaRegTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";

const JenisKenaikanPangkat = () => {
  return (
    <div className="mt-10 mb-20">
      <Title title="Daftar Jenis Kenaikan Pangkat" />
      <CustomCard
        actions={
          <div className="flex justify-end gap-4">
            <Link to="/admin/referensi/kepegawaian/jabatan-struktural/detail-jabatan-struktural">
              <Button className="cursor-pointer bg-green-light-uika hover:bg-hover-green-uika">
                <FaPlus /> Tambah
              </Button>
            </Link>
          </div>
        }
      >
        <Table className="mt-10 table-auto">
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="text-center text-xs sm:text-sm">Kode</TableHead>
              <TableHead className="text-center text-xs sm:text-sm">Jenis Pangkat</TableHead>
              <TableHead className="text-center text-xs sm:text-sm">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-200">
            <TableRow className=" even:bg-gray-100">
              <TableCell className="text-center text-xs sm:text-sm"></TableCell>
              <TableCell className="text-center text-xs sm:text-sm"></TableCell>
              <TableCell className="h-full">
                <div className="flex justify-center items-center w-full h-full gap-2">
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

export default JenisKenaikanPangkat;
