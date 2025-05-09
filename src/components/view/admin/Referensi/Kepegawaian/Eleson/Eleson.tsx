import CustomCard from "@/components/blocks/Card";
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
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";

const Eleson = () => {
  return (
    <div className="mt-10">
      <Title title="Daftar Eleson" />

      <CustomCard
        actions={
          <div className="flex justify-end">
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
              <TableHead className="text-center">Kode</TableHead>
              <TableHead className="text-center">Nama Eleson</TableHead>
              <TableHead className="text-center">Aktif</TableHead>
              <TableHead className="text-center">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-200">
            <TableRow className=" even:bg-gray-100">
              <TableCell className="text-center"></TableCell>
              <TableCell className="text-center"></TableCell>
              <TableCell className="text-center"></TableCell>
              <TableCell className="text-center">
                <div className="flex justify-center items-center w-full h-full">
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
      </CustomCard>
    </div>
  );
};

export default Eleson;
