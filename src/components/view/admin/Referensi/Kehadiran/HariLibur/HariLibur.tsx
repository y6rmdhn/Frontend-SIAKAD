import CustomCard from "@/components/blocks/Card";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
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
import { useForm } from "react-hook-form";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";

const HariLibur = () => {
  const form = useForm();

  return (
    <div className="mt-10 mb-20">
      <h1 className="text-xs sm:text-sm font-normal">
        Hari Libur{" "}
        <span className="text-muted-foreground font-normal text-[16px]">
          Daftar Hari Libur
        </span>
      </h1>
      <Form {...form}>
        <form>
          <CustomCard
            actions={
              <div className="grid grid-rows-2 sm:flex justify-between gap-3">
                <div className="grid grid-rows-2 sm:flex">
                  <Label className="w-60 sm:w-40 md:w-60 text-[#FDA31A]">Unit Kerja</Label>
                  <Select>
                    <SelectTrigger className="w-58 sm:w-40 md:w-50">
                      <SelectValue placeholder="2025" />
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
                <div className="flex gap-4">
                  <Button className="cursor-pointer bg-green-light-uika hover:bg-[#329C59]">
                    <FaPlus className="w-4! h-4! text-white" />
                    Tambah
                  </Button>
                </div>
              </div>
            }
          >


            <Table className="mt-5 table-auto">
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead className="text-center text-xs sm:text-sm">Nama Hari Libur</TableHead>
                  <TableHead className="text-center text-xs sm:text-sm">Tanggal Mulai</TableHead>
                  <TableHead className="text-center text-xs sm:text-sm">Tanggal Selesai</TableHead>
                  <TableHead className="text-center text-xs sm:text-sm">Keterangan</TableHead>
                  <TableHead className="text-center text-xs sm:text-sm">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-gray-200">
                <TableRow className=" even:bg-gray-100">
                  <TableCell className="text-center text-xs sm:text-sm"></TableCell>
                  <TableCell className="text-center text-xs sm:text-sm"></TableCell>
                  <TableCell className="text-center text-xs sm:text-sm"></TableCell>
                  <TableCell className="text-center text-xs sm:text-sm"></TableCell>
                  <TableCell className="h-full">
                    <div className="flex justify-center items-center w-full h-full">
                      <Link to="/admin/operasional/kompensasi/detail-dokumen-internal">
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
          </CustomCard>
        </form>
      </Form>
    </div>
  );
};

export default HariLibur;
