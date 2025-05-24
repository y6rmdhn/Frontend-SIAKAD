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
import { IoEyeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const Monitoring = () => {
  return (
    <div className="mt-10 mb-20">
      <Title title="Monitoring" />

      <CustomCard
        actions={
          <div className="grid md:grid-flow-col grid-flow-row gap-6">
            <div className="flex flex-col md:flex-row gap-2">
              <Label className="w-full text-[#FDA31A] text-xs md:text-sm">
                Unit Kerja
              </Label>
              <SelectFilter placeholder="" options={unitKerjaOptions} />
            </div>
            <div className="flex flex-col md:flex-row gap-2">
              <Label className="w-full text-[#FDA31A] text-xs md:text-sm">
                Hubungan Kerja
              </Label>
              <SelectFilter placeholder="" options={unitKerjaOptions} />
            </div>
          </div>
        }
      />

      <div className="flex justify-between md:mt-10 mt-5">
        <div className="lg:gap-5 gap-2 w-full flex flex-col md:flex-row mt-5">
          <SelectFilter classname="md:w-32" options={unitKerjaOptions} />
          <SearchInput />
        </div>
      </div>

      <Table className="mt-10 table-auto text-xs md:text-sm">
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="text-center" colSpan={2} rowSpan={2}>
              Nama Riwayat
            </TableHead>
            <TableHead className="text-center" colSpan={6}>
              Status
            </TableHead>
          </TableRow>
          <TableRow className="bg-gray-100">
            <TableHead className="text-center">Draft</TableHead>
            <TableHead className="text-center">Diajukan</TableHead>
            <TableHead className="text-center">Disetujui</TableHead>
            <TableHead className="text-center">Ditolak</TableHead>
            <TableHead className="text-center">Ditangguhkan</TableHead>
            <TableHead className="text-center">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-gray-200">
          <TableRow className=" even:bg-gray-100">
            <TableCell className="text-center">
              <Checkbox className="bg-gray-100 border-gray-300 data-[state=checked]:bg-green-light-uika data-[state=checked]:border-green-light-uika cursor-pointer" />
            </TableCell>
            <TableCell className="text-center"></TableCell>
            <TableCell className="text-center"></TableCell>
            <TableCell className="text-center"></TableCell>
            <TableCell className="text-center"></TableCell>
            <TableCell className="text-center"></TableCell>
            <TableCell className="text-center"></TableCell>
            <TableCell className="h-full">
              <div className="flex justify-center items-center w-full h-full">
                <Link to="/admin/operasional/kompensasi/detail-dokumen-internal">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="cursor-pointer"
                  >
                    <IoEyeOutline className="w-5! h-5! text-[#26A1F4]" />
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

export default Monitoring;
