import CustomCard from "@/components/blocks/Card";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { useForm } from "react-hook-form";
import { FiSearch } from "react-icons/fi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { FormFieldSelect } from "@/components/blocks/CustomFormSelect/CustomFormSelect";
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput";

const DaftarMonitoringKehadiran = () => {
  const form = useForm();

  return (
    <div className="mt-10 mb-20">
      <h1 className="text-2xl font-normal">Daftar Monitoring Kehadiran</h1>
      <Form {...form}>
        <form>
          <CustomCard
            actions={
              <div className="mt-10 grid-rows-2 grid-flow-col grid gap-5">
                <FormFieldSelect
                  form={form}
                  label="Unit Kerja"
                  name="unit_kerja"
                  labelStyle="text-[#FDA31A]"
                  options={[
                    { label: "Admin", value: "admin" },
                    { label: "User", value: "user" },
                    { label: "Guest", value: "guest" },
                  ]}
                  placeholder="--041001 Universitas Ibn Khaldun--"
                  required={false}
                />
                <FormFieldSelect
                  form={form}
                  label="Status Presensi"
                  name="status_presensi"
                  labelStyle="text-[#FDA31A]"
                  options={[
                    { label: "Admin", value: "admin" },
                    { label: "User", value: "user" },
                    { label: "Guest", value: "guest" },
                  ]}
                  placeholder="--Semua Status Presensi--"
                  required={false}
                />
                <FormFieldInput
                  form={form}
                  label="Tanggal"
                  name="tanggal"
                  labelStyle="text-[#FDA31A]"
                  required={false}
                  type="date"
                />
              </div>
            }
          />

          <div className="mt-10 gap-5 flex">
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
          <Table className="mt-10 table-auto">
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead className="text-center">NIP</TableHead>
                <TableHead className="text-center">Nama Pegawai</TableHead>
                <TableHead className="text-center">Unit Kerja</TableHead>
                <TableHead className="text-center">Jam Kerja</TableHead>
                <TableHead className="text-center">Kehadiran</TableHead>
                <TableHead className="text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-200">
              <TableRow className=" even:bg-gray-100">
                <TableCell className="text-center">0306077701</TableCell>
                <TableCell className="text-center">A HERI ISWANTO</TableCell>
                <TableCell className="text-center">
                  Universitas Ibn Khaldun
                </TableCell>
                <TableCell className="text-center">-</TableCell>
                <TableCell className="text-center">-</TableCell>
                <TableCell className="text-center">Alpha</TableCell>
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
        </form>
      </Form>
    </div>
  );
};

export default DaftarMonitoringKehadiran;
