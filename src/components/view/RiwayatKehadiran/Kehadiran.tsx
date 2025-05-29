import CustomCard from "@/components/blocks/Card";
import SelectFilter from "@/components/blocks/SelectFilter";
import Title from "@/components/blocks/Title";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IoIosDocument } from "react-icons/io";
import { IoEyeOutline } from "react-icons/io5";

const Kehadiran = () => {
  return (
    <div className="mt-10">
      <Title title="Riwayat" subTitle="Presensi Pegawai" />

      <CustomCard
        actions={
          <div className=" ">
            <div className="flex flex-col md:flex-row gap-4">
              <Label className=" text-[#FDA31A] md:pr-30">Tahun</Label>
              <SelectFilter
                placeholder="--Semua--"
                options={[
                  { label: "Admin", value: "admin" },
                  { label: "User", value: "user" },
                  { label: "Guest", value: "guest" },
                ]}
              />
            </div>
          </div>
        }
      >
        <Table className="mt-10 table-auto text-xs lg:text-sm">
          <TableHeader>
            <TableRow className="bg-[#002E5A] ">
              <TableHead className="text-center text-white"></TableHead>
              <TableHead className="text-center text-white">NIP</TableHead>
              <TableHead className="text-center text-white">
                Nama Pegawai
              </TableHead>
              <TableHead className="text-center text-white">
                Tugas Tambahan
              </TableHead>
              <TableHead className="text-center text-white">
                Perguruan Tinggi Penugasan
              </TableHead>
              <TableHead className="text-center text-white">
                Terhitung Mulai Tanggal
              </TableHead>
              <TableHead className="text-center text-white">
                Tgl Disetujui
              </TableHead>
              <TableHead className="text-center text-white">Aksi</TableHead>
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
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="cursor-pointer"
                    >
                      <IoEyeOutline className="w-5! h-5! text-[#26A1F4]" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <Table className="mt-10 table-auto">
                      <TableHeader>
                        <TableRow className="bg-[#002E5A] ">
                          <TableHead className="text-center text-white"></TableHead>
                          <TableHead className="text-center text-white">
                            NIP
                          </TableHead>
                          <TableHead className="text-center text-white">
                            Nama Pegawai
                          </TableHead>
                          <TableHead className="text-center text-white">
                            Tugas Tambahan
                          </TableHead>
                          <TableHead className="text-center text-white">
                            Perguruan Tinggi Penugasan
                          </TableHead>
                          <TableHead className="text-center text-white">
                            Terhitung Mulai Tanggal
                          </TableHead>
                          <TableHead className="text-center text-white">
                            Tgl Disetujui
                          </TableHead>
                          <TableHead className="text-center text-white">
                            Aksi
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody className="divide-y divide-gray-200">
                        <TableRow className=" even:bg-gray-100">
                          <TableCell className="text-center">
                            <Checkbox />
                          </TableCell>
                          <TableCell className="text-center"></TableCell>
                          <TableCell className="text-center"></TableCell>
                          <TableCell className="text-center"></TableCell>
                          <TableCell className="text-center"></TableCell>
                          <TableCell className="text-center"></TableCell>
                          <TableCell className="text-center"></TableCell>
                          <TableCell className="h-full">
                            <div className="flex justify-center items-center w-full h-full">
                              <Button
                                size="icon"
                                variant="ghost"
                                className="cursor-pointer"
                              >
                                <IoEyeOutline className="w-5! h-5! text-[#26A1F4]" />
                              </Button>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="cursor-pointer"
                              >
                                <IoIosDocument className="w-5! h-5! text-[#26A1F4]" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <Button size="icon" variant="ghost" className="cursor-pointer">
                  <IoIosDocument className="w-5! h-5! text-[#26A1F4]" />
                </Button>
              </TableCell>
              <TableCell className="h-full align-top text-center"></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CustomCard>
    </div>
  );
};

export default Kehadiran;
