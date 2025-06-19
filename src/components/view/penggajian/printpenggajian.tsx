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
import React, { useEffect } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const printpenggajian = () => {

    useEffect(() => {
        window.print();
    }, []);

    const handlePrint = () => {
        window.print();
    };


  return (

    

    <div className="mt-10 mb-20">


      <div className="flex justify-end">
        <Printer onClick={handlePrint} className="w-6 h-6 text-blue-500 cursor-pointer" />
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
            <TableRow className="bg-gray-200">
                <TableCell colSpan={4} className="text-center font-bold text-lg">Gaji</TableCell>
            </TableRow>
                    <TableRow  className="hover:bg-gray-100">
                        <TableCell className="text-center"></TableCell>
                        <TableCell className="text-center"></TableCell>
                        <TableCell className="text-center"></TableCell>
                        <TableCell className="text-center">
                            
                        </TableCell>
                    </TableRow>
            <TableRow className="bg-gray-200">
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



export default printpenggajian;
