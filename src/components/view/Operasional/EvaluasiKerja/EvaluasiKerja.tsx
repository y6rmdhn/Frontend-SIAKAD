import Title from "@/components/blocks/Title";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Link } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import InfoList from "@/components/blocks/InfoList";

const EvaluasiKerja = () => {
  return (
    <div className="mt-10 mb-20">
      <Title title="Evaluasi Kerja" subTitle="Data Evaluasi Kerja" />
      <InfoList
        items={[
          "NIP",
          "Nama",
          "Unit Kerja",
          "Status",
          "Jab. Akademik",
          "Jab. Fungsional",
          "Jab. Struktural",
          "Pendidikan",
        ]}
      />

      <Table className="mt-10 table-auto text-xs lg:text-sm border-1">
        <TableHeader>
          <TableRow className="bg-[#004680] text-white">
            <TableHead className="text-center text-white border text-xs sm:text-sm">NIP</TableHead>
            <TableHead className="text-center text-white border text-xs sm:text-sm">
              Nama Pegawai
            </TableHead>
            <TableHead className="text-center text-white border text-xs sm:text-sm">
              Hubungan Kerja
            </TableHead>
            <TableHead className="text-center text-white border text-xs sm:text-sm">Fungsional</TableHead>
            <TableHead className="text-center text-white border text-xs sm:text-sm">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className=" even:bg-gray-100">
            <TableCell className="text-center text-xs sm:text-sm"></TableCell>
            <TableCell className="text-center text-xs sm:text-sm"></TableCell>
            <TableCell className="text-center text-xs sm:text-sm"></TableCell>
            <TableCell className="text-center text-xs sm:text-sm"></TableCell>
            <TableCell className="h-full">
              <div className="flex justify-center items-center w-full h-full">
                <Link to="/operasional/evaluasi-kerja/form-evaluasi-kerja-dosen">
                  <Button
                    size="icon"
                    type="button"
                    variant="ghost"
                    className="cursor-pointer"
                  >
                    <MdEdit className="w-6! h-6! bg-[#FDA31A] text-white rounded-sm" />
                  </Button>
                </Link>
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
            <PaginationLink href="#" isActive>
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
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

export default EvaluasiKerja;
