import { Link } from "react-router-dom";
import Title from "@/components/blocks/Title";
import { Button } from "@/components/ui/button";
import InfoList from "@/components/blocks/InfoList";
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
import { IoEyeOutline } from "react-icons/io5";
import SelectFilter from "@/components/blocks/SelectFilter";
import unitKerjaOptions from "@/constant/dummyFilter";
import SearchInput from "@/components/blocks/SearchInput";
import {DummyDataDosen} from "@/constant/DummyDataPegawai/dummyDataPegawai.ts";
const Pelanggaran = () => {
  return (
    <div className="mt-10 mb-20">
      <Title title="Pelanggaran" subTitle="Daftar Pelanggaran" />
      <InfoList
          items={[
            { label: "NIP", value: DummyDataDosen.pegawai_info.nip },
            { label: "Nama", value: DummyDataDosen.pegawai_info.nama },
            { label: "Unit Kerja", value: DummyDataDosen.pegawai_info.unit_kerja },
            { label: "Status", value: DummyDataDosen.pegawai_info.status },
            { label: "Jab. Akademik", value: DummyDataDosen.pegawai_info.jab_akademik },
            { label: "Jab. Fungsional", value: DummyDataDosen.pegawai_info.jab_fungsional },
            { label: "Jab. Struktural", value: DummyDataDosen.pegawai_info.jab_struktural },
            { label: "Pendidikan", value: DummyDataDosen.pegawai_info.pendidikan },
          ]}
      />
      <div className="gap-5 flex flex-col md:flex-row mt-5">
        <SelectFilter
          classname="w-full md:w-32 "
          options={unitKerjaOptions}
          placeholder="--Semua--"
        />
        <SearchInput />
      </div>

      <Table className="mt-10 table-auto text-xs lg:text-sm">
        <TableHeader>
          <TableRow className="bg-[#E7ECF2] ">
            <TableHead className="text-center text-black text-xs sm:text-sm">
              Tgl Pelanggaran
            </TableHead>
            <TableHead className="text-center text-black text-xs sm:text-sm">
              Jenis Pelanggaran
            </TableHead>
            <TableHead className="text-center text-black text-xs sm:text-sm">
              No. SK
            </TableHead>
            <TableHead className="text-center text-black text-xs sm:text-sm ">
              Tgl. SK
            </TableHead>
            <TableHead className="text-center text-black text-xs sm:text-sm">
              Aksi
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-gray-200">
          <TableRow className=" even:bg-[#E7ECF2]">
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

export default Pelanggaran;
