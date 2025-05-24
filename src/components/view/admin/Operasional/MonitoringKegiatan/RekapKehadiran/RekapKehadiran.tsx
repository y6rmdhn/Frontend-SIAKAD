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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { FiSearch } from "react-icons/fi";

const RekapKehadiran = () => {
  return (
    <div className="mt-10 mb-20">
      <h1 className="text-lg sm:text-2xl font-normal">Monitoring Kegiatan</h1>
      <CustomCard
        actions={
          <div className="grid grid-rows-2 lg:grid-cols-2 grid-flow-col gap-5">
            <div className="grid grid-rows-2 sm:flex">
              <Label className="w-full text-[#FDA31A] text-xs sm:text-sm">Unit Kerja</Label>
              <Select>
                <SelectTrigger className="w-full text-xs sm:text-sm">
                  <SelectValue placeholder="041001 - Universitas Ibn Khaldun" />
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
            <div className="grid grid-rows-2 sm:flex">
              <Label className="w-full text-[#FDA31A] text-xs sm:text-sm">Tanggal Akhir</Label>
              <Input type="date" />
            </div>
          </div>
        }
      />

      <div className="grid grid-rows-2 sm:flex gap-4 w-full mt-5 mb-10">
        <Select>
          <SelectTrigger className="w-full sm:w-32 text-xs sm:text-sm">
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

        <div className="relative w-full md:w-80">
          <Input
            placeholder="Search"
            className="w-full pr-10 text-xs sm:text-sm"
          />
          <FiSearch className="absolute top-1/2 right-3 transform -translate-y-1/2" />
        </div>
      </div>

      <Table className="mt-10 table-auto">
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="text-center text-xs sm:text-sm">NIP</TableHead>
            <TableHead className="text-center text-xs sm:text-sm">Nama Pegawai</TableHead>
            <TableHead className="text-center text-xs sm:text-sm">Jam Masuk</TableHead>
            <TableHead className="text-center text-xs sm:text-sm">Jam Keluar</TableHead>
            <TableHead className="text-center max-w-40 text-xs sm:text-sm">
              Rencana Pekerjaan
            </TableHead>
            <TableHead className="text-center max-w-40 text-xs sm:text-sm">
              Realisasi Pekerjaan
            </TableHead>
            <TableHead className="text-center text-xs sm:text-sm">File</TableHead>
            <TableHead className="text-center text-xs sm:text-sm">Foto Masuk</TableHead>
            <TableHead className="text-center text-xs sm:text-sm">Foto Keluar</TableHead>
            <TableHead className="text-center text-xs sm:text-sm">Status</TableHead>
            <TableHead className="text-center text-xs sm:text-sm">Valid?</TableHead>
            <TableHead className="text-center text-xs sm:text-sm">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-gray-200">
          <TableRow className=" even:bg-gray-100">
            <TableCell className="text-center align-top text-xs sm:text-sm">0306077701</TableCell>
            <TableCell className="text-center align-top text-xs sm:text-sm">
              A HERI ISWANTO
            </TableCell>
            <TableCell className="whitespace-normal break-words max-w-20 align-top text-xs sm:text-sm">
              06:47 Anda Berada di [Area Kampus UIKA]
            </TableCell>
            <TableCell className="whitespace-normal break-words max-w-20 align-top text-xs sm:text-sm">
              16:00:17 Anda Berada di [Area Kampus UIKA]
            </TableCell>
            <TableCell className="whitespace-normal break-words max-w-40 align-top text-xs sm:text-sm">
              Membersihkan lobi membersihkan lorong lantai 1 Membersihkan ruang
              kantor Membersihkan ruang dosen Membersihkan kamar kecil dosen dan
              mahasiswa
            </TableCell>
            <TableCell className="whitespace-normal break-words max-w-40 align-top text-xs sm:text-sm">
              Membersihkan lobi membersihkan lorong lantai 1 Membersihkan ruang
              kantor Membersihkan ruang dosen Membersihkan kamar kecil dosen dan
              mahasiswa
            </TableCell>
            <TableCell className="h-full align-top text-center">-</TableCell>
            <TableCell className="h-full align-top text-center">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="ghost"
                    className="text-blue-500 hover:text-blue-500 cursor-pointer"
                  >
                    Lihat
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </TableCell>
            <TableCell className="h-full align-top text-center">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="ghost"
                    className="text-blue-500 hover:text-blue-500 cursor-pointer"
                  >
                    Lihat
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </TableCell>
            <TableCell className="h-full align-top text-center">-</TableCell>
            <TableCell className="h-full align-top text-red-500 text-center">
              x
            </TableCell>
            <TableCell className="h-full align-top text-center">-</TableCell>
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

export default RekapKehadiran;
