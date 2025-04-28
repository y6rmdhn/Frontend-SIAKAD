import CustomCard from "@/components/blocks/Card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import { HiMiniXMark } from "react-icons/hi2";
import { MdEdit } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import data from "../../../../../constant/settingKehadiran/index";

const StatusItem = ({ label, status }) => {
  const isCheck = status === "check";

  return (
    <div className="flex justify-between items-center bg-white p-2 rounded-md shadow">
      <Label className="text-sm">{label}</Label>
      <div
        className={`${
          isCheck ? "bg-green-100" : "bg-red-100"
        } rounded-md px-2 py-1`}
      >
        {isCheck ? (
          <FaCheck className="w-4 h-4 text-green-500" />
        ) : (
          <HiMiniXMark className="w-4 h-4 text-[#FF0000]" />
        )}
      </div>
    </div>
  );
};

const SettingKehadiran = () => {
  return (
    <div className="mt-10 mb-10">
      <h1 className="text-2xl font-normal">Setting Kehadiran</h1>
      <CustomCard
        actions={
          <div className="w-full flex justify-end">
            <Button className="bg-green-light-uika cursor-pointer hover:bg-[#329C59]">
              <MdEdit /> Edit
            </Button>
          </div>
        }
      >
        <div className="flex gap-2 w-full">
          <div className="flex flex-col w-full gap-2">
            {data.leftColumnItems.map((item, index) => (
              <StatusItem key={index} label={item.label} status={item.status} />
            ))}
          </div>

          <div className="flex flex-col w-full gap-2">
            {data.rightColumnItems.map((item, index) => (
              <StatusItem key={index} label={item.label} status={item.status} />
            ))}
          </div>
        </div>
      </CustomCard>

      <Table className="mt-10 table-auto">
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="text-center">Nama Gedung</TableHead>
            <TableHead className="text-center">Latitude</TableHead>
            <TableHead className="text-center">Langtitude</TableHead>
            <TableHead className="text-center">
              Radius Presensi(Meter)
            </TableHead>
            <TableHead className="text-center">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-gray-200">
          <TableRow className=" even:bg-gray-100">
            <TableCell className="text-center">Kampus Uika</TableCell>
            <TableCell className="text-center">
              -6.5598900000000000000000
            </TableCell>
            <TableCell className="text-center">
              106.7929600000000000000000
            </TableCell>
            <TableCell className="text-center">200.000</TableCell>
            <TableCell className="h-full">
              <div className="flex justify-center items-center w-full h-full">
                <Button size="icon" variant="ghost" className="cursor-pointer">
                  <MdEdit className="w-5! h-5! text-[#26A1F4]" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default SettingKehadiran;
