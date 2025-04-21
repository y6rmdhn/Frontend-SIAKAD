import CustomCard from "@/components/commons/card";
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
import { FaPlus } from "react-icons/fa";

const JenisPublikasi = () => {
  const form = useForm();

  return (
    <div className="mt-10 mb-20">
      <h1 className="text-2xl font-normal">Jenis Publikasi</h1>
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
                  <TableHead className="text-center">Jenis Publikasi</TableHead>
                  <TableHead className="text-center">Bobot Iku 5</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-gray-200">
                <TableRow className=" even:bg-gray-100">
                  <TableCell className="text-center"></TableCell>
                  <TableCell className="text-center"></TableCell>
                  <TableCell className="h-full"></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CustomCard>
        </form>
      </Form>
    </div>
  );
};

export default JenisPublikasi;
