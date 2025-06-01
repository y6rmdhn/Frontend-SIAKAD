import CustomCard from "@/components/blocks/Card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import biodataDummy from "@/constant/biodataDummy/biodataDummy";
import DetailPegawaiLayout from "@/layouts/DetailPegawaiLayout";
import { FiSearch } from "react-icons/fi";
import { IoEyeOutline } from "react-icons/io5";
import {Link, useParams} from "react-router-dom";
import DetailPegawaiSidebar from "../../../../../blocks/PegawaiDetailSidebar/PegawaiDetailSidebar";
import accordionContent from "../../../../../../constant/arccodionContent/arccodionContent";

const RiwayatTes = () => {

  const params = useParams();

  return (
    <DetailPegawaiLayout title="Riwayat tes" subTitile="Daftar Riwayat Tes">
      {/*Sidebar*/}
      <DetailPegawaiSidebar currentPegawaiId={params.id} accordionData={accordionContent} />

      <div className="flex flex-col w-full">
        <div className="flex flex-col gap-4 w-full">
          <div className="flex w-full bg-[#F6FBFF] border-l-4 border-l-[#92D3FF]">
            <div className="flex flex-col w-full">
              {biodataDummy.leftColumn.map((item, index) => (
                <div
                  key={index}
                  className="border-b flex justify-between items-center py-2 pl-2"
                >
                  <h1 className="text-[#3F6FA9] font-semibold">{item.label}</h1>
                  <h1>{item.value}</h1>
                </div>
              ))}
            </div>
            <div className="flex flex-col w-full">
              {biodataDummy.rightColumn.map((item, index) => (
                <div
                  key={index}
                  className="border-b flex justify-between items-center py-2 pl-5 pr-2"
                >
                  <h1 className="text-[#3F6FA9] font-semibold">{item.label}</h1>
                  <h1>{item.value}</h1>
                </div>
              ))}
            </div>
          </div>

          <CustomCard
            actions={
              <div className="grid grid-rows-1 grid-flow-col gap-6">
                <div className="flex">
                  <Label className="pr-30 text-[#FDA31A]">
                    Status Pengajuan
                  </Label>
                  <Select>
                    <SelectTrigger className="w-80">
                      <SelectValue placeholder="--Semua Pengajuan--" />
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
                </div>
              </div>
            }
          />

          <div className="gap-5 flex">
            <Select>
              <SelectTrigger className="w-32">
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

            <div className="relative">
              <FiSearch className="absolute top-1/2 -translate-y-1/2 right-2" />
              <Input placeholder="Search" className="w-80 pr-8" />
            </div>
          </div>
        </div>

        <Table className="mt-10 table-auto border-separate border-spacing-x-[1px]">
          <TableHeader>
            <TableRow className="bg-[#004680]">
              <TableHead className="text-center text-white rounded-tl-lg">
                Nama Tes
              </TableHead>
              <TableHead className="text-center text-white">Skor Tes</TableHead>
              <TableHead className="text-center text-white">
                Jenis Tes
              </TableHead>
              <TableHead className="text-center text-white">
                Penyelenggara
              </TableHead>
              <TableHead className="text-center text-white">
                Tahun Tes
              </TableHead>
              <TableHead className="text-center text-white">
                Status Pengajuan
              </TableHead>
              <TableHead className="text-center text-white rounded-tr-lg">
                Aksi
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-[#E7ECF2]">
            <TableRow>
              <TableCell className="flex justify-items-center"></TableCell>
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
    </DetailPegawaiLayout>
  );
};

export default RiwayatTes;
