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
import { IoMdDownload } from "react-icons/io";

const GelarAkademik = () => {
  return (
    <div className="mt-10">
      <Title title="Gelar Akademik" subTitle="Daftar Gelar Akademik" />

      <CustomCard
        actions={
          <div className="w-full flex flex-col md:flex-row md:gap-2 gap-4 lg:gap-4 justify-between mt-6">
            <div className="w-full flex flex-col md:flex-row md:gap-2 gap-4 lg:gap-4">
              <SelectFilter options={unitKerjaOptions} />
              <SearchInput className="w-full"/>
            </div>

            <div className="w-full flex gap-3 justify-end">
              <Button className="cursor-pointer bg-green-light-uika hover:bg-[#329C59] w-full md:w-35 lg:w-auto text-xs sm:text-sm">
                <IoMdDownload /> Unduh dari Sister
              </Button>
            </div>
          </div>
        }
      >
        <Table className="mt-10 table-auto">
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="text-center text-xs sm:text-sm">Gelar</TableHead>
              <TableHead className="text-center text-xs sm:text-sm">Nama Gelar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-200">
            <TableRow className=" even:bg-gray-100">
              <TableCell className="text-center text-xs sm:text-sm"></TableCell>
              <TableCell className="text-center text-xs sm:text-sm"></TableCell>
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

export default GelarAkademik;
