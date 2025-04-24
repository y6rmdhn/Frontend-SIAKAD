import CustomCard from "@/components/commons/card";
import { Input } from "@/components/ui/input";
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
import biodataDummy from "@/constant/biodataDummy/biodataDummy";
import DetailPegawaiLayout from "@/layouts/DetailPegawaiLayout";
import React from "react";
import { FiSearch } from "react-icons/fi";

const Keluarga = () => {
  return (
    <DetailPegawaiLayout title="Keluarga Pegawai" subTitile="Daftar Keluarga">
      <div className="flex flex-col w-full">
        <div className="flex flex-col gap-4 w-full">
          <div className="flex w-full">
            <div className="flex flex-col w-full">
              {biodataDummy.leftColumn.map((item, index) => (
                <div
                  key={index}
                  className="border-b flex justify-between items-center py-2 pl-2"
                >
                  <h1 className="text-[#3F6FA9]">{item.label}</h1>
                  <h1>{item.value}</h1>
                </div>
              ))}
            </div>
            <div className="flex flex-col w-full">
              {biodataDummy.rightColumn.map((item, index) => (
                <div
                  key={index}
                  className="border-b flex justify-between items-center py-2 pl-5"
                >
                  <h1 className="text-[#3F6FA9]">{item.label}</h1>
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
      </div>
    </DetailPegawaiLayout>
  );
};

export default Keluarga;
