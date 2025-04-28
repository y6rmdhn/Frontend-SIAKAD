import CustomCard from "@/components/blocks/Card";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import { useForm } from "react-hook-form";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";

const JenisPengabdian = () => {
  const form = useForm();

  return (
    <div className="mt-10 mb-20">
      <h1 className="text-2xl font-normal">Jenis Pengabdian</h1>
      <Form {...form}>
        <form>
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
                  <TableHead className="text-center">Nama PKM</TableHead>
                  <TableHead className="text-center">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-gray-200">
                <TableRow className=" even:bg-gray-100">
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

export default JenisPengabdian;
