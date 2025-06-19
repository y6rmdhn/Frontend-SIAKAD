import Title from "@/components/blocks/Title";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Printer } from "lucide-react";
import React from "react";
import { IoEyeOutline } from "react-icons/io5";
import { Link, Links } from "react-router-dom";

const penggajian = () => {



  return (

    

    <div className="mt-10 mb-20">
      <Title title="Penggajian" subTitle="Detail Penggajian" />

      <div className="flex justify-end">
        <Link to="/penggajian/printpenggajian" className="flex items-center gap-2">
        <Printer  className="w-6 h-6 text-blue-500 cursor-pointer" />
        </Link>
      </div>
      
      <div id="printArea" >
        <Table className="mt-10 table-auto text-xs md:text-sm">
            <TableHeader>
            <TableRow className="bg-gray-300 ">
                <TableHead className="text-center text-black">No</TableHead>
                <TableHead className="text-center text-black">Kode</TableHead>
                <TableHead className="text-center text-black">Deskripsi</TableHead>
                <TableHead className="text-center text-black">Nominal</TableHead>
            </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-200">
            <TableRow className="bg-gray-50">
                <TableCell colSpan={4} className="text-center font-bold text-lg">Gaji</TableCell>
            </TableRow>
                    <TableRow  className="hover:bg-gray-100">
                        <TableCell className="text-center"></TableCell>
                        <TableCell className="text-center"></TableCell>
                        <TableCell className="text-center"></TableCell>
                        <TableCell className="text-center">
                            
                        </TableCell>
                    </TableRow>
            <TableRow className="bg-gray-50">
                <TableCell colSpan={4} className="text-center font-bold text-lg">Potongan</TableCell>
            </TableRow>
                    <TableRow  className="hover:bg-gray-100">
                        <TableCell className="text-center"></TableCell>
                        <TableCell className="text-center"></TableCell>
                        <TableCell className="text-center"></TableCell>
                        <TableCell className="text-center">
                            
                        </TableCell>
                    </TableRow>
            </TableBody>
        </Table>
      </div>

    
    </div>
  );
};


export default penggajian;
