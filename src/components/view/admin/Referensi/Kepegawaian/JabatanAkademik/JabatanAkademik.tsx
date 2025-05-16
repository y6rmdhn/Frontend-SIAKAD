import CustomCard from "@/components/blocks/Card";
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput";
import CustomPagination from "@/components/blocks/CustomPagination";
import SearchInput from "@/components/blocks/SearchInput";
import { SelectFilter } from "@/components/blocks/SelectFilterForm";
import Title from "@/components/blocks/Title";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import adminServices from "@/services/admin.services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { IoSaveOutline } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { RiResetLeftFill } from "react-icons/ri";
import { Link, useSearchParams } from "react-router-dom";
import { z } from "zod";

// Define interface for the data item
interface JabatanAkademikItem {
  kode: string;
  jabatan_akademik: string;
  // Add other properties as needed
}

// Define interface for the API response
interface JabatanAkademikResponse {
  data: JabatanAkademikItem[];
  links: any[]; // You might want to define a more specific type
  next_page_url: string | null;
  prev_page_url: string | null;
  last_page: number;
}

const jabatanAkademik = z.object({
  id: z.number().optional(),
  kode: z.string().min(1, "Kode tidak boleh kosong"),
  nama_jenis_cuti: z.string().min(1, "Nama jenis cuti tidak boleh kosong"),
  standar_cuti: z.coerce
    .number()
    .min(1, "Standar cuti tidak boleh kosong atau minus"),
  format_nomor_surat: z.string().min(1, "Nomor surat tidak boleh kosong"),
  keterangan: z.string().min(1, "Keterangan tidak boleh kosong"),
});

type jabatanAkademikFormvalue = z.infer<typeof jabatanAkademik>;

const JabatanAkademik = () => {
  const form = useForm();
  const [searchParam, setSearchParam] = useSearchParams();
  const [isAddData, setIsAddData] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const unitKerjaOptions = [
    { value: "d3-ti", label: "D3 Teknik Informatika" },
    { value: "s1-si", label: "S1 Sistem Informasi" },
    { value: "lainnya", label: "Lainnya" },
  ];

  // get data
  const { data } = useQuery<JabatanAkademikResponse>({
    queryKey: ["jabatan-akademik", searchParam.get("page")],
    queryFn: async () => {
      const response = await adminServices.getJabatanAkademik(
        searchParam.get("page")
      );
      return response.data.data;
    },
  });

  // tambah data
  // const { mutate: postJabatanAkademik } = useMutation({
  //   mutationFn: async () => {

  //   }
  // })

  useEffect(() => {
    if (!searchParam.get("page")) {
      searchParam.set("page", "1");
      setSearchParam(searchParam);
    }
  }, [searchParam, setSearchParam]);

  useEffect(() => {
    if (Number(searchParam.get("page")) < 1) {
      searchParam.set("page", "1");
      setSearchParam(searchParam);
    }
  }, [searchParam, setSearchParam]);

  useEffect(() => {
    if (
      data?.last_page &&
      Number(searchParam.get("page")) > data.last_page &&
      data.last_page > 0
    ) {
      searchParam.set("page", data.last_page.toString());
      setSearchParam(searchParam);
    }
  }, [searchParam, data, setSearchParam]);

  return (
    <div className="mt-10 mb-20">
      <Title title="Jabatan Akademik" subTitle="Daftar Jabatan Akademik" />
      <CustomCard
        actions={
          <div className="flex">
            <Label className="w-32 text-[#FDA31A]">Jabatan Akademik</Label>
            {/* <SelectFilter  form={form} options={unitKerjaOptions} /> */}
          </div>
        }
      />

      <div className="flex justify-between mt-6">
        <div className="flex gap-4">
          {/* <SelectFilter
            form={form}
            options={unitKerjaOptions}
            placeholder="--Semua--"
          /> */}
          <SearchInput />
        </div>

        <div className="flex gap-3">
          <Button
            onClick={() => setIsAddData(true)}
            className="cursor-pointer bg-green-light-uika hover:bg-[#329C59]"
          >
            <FaPlus /> Tambah
          </Button>
        </div>
      </div>

      <Form {...form}>
        <form>
          <Table className="mt-10 table-auto">
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead className="text-center">Kode</TableHead>
                <TableHead className="text-center">
                  Nama Hubungan Kerja
                </TableHead>
                <TableHead className="text-center">Jenis Jabatan</TableHead>
                <TableHead className="text-center">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-200">
              {isAddData && Number(searchParam.get("page")) === 1 && (
                <TableRow className=" even:bg-gray-100">
                  <TableCell className="text-center">
                    <FormFieldInput
                      inputStyle="w-full"
                      position={true}
                      form={form}
                      name="kode"
                      required={false}
                    />
                  </TableCell>
                  <TableCell className="text-center">
                    <FormFieldInput
                      inputStyle="w-full"
                      position={true}
                      form={form}
                      name="nama_jenis_cuti"
                      required={false}
                    />
                  </TableCell>
                  <TableCell className="text-center">
                    <SelectFilter
                      form={form}
                      name="jabatan_akademik"
                      placeholder="--Pilih Jenis Jabatan--"
                      options={unitKerjaOptions}
                      required
                    />
                  </TableCell>
                  <TableCell className="h-full">
                    <div className="flex justify-center items-center w-full h-full">
                      <Button
                        type="submit"
                        size="icon"
                        variant="ghost"
                        className="cursor-pointer"
                      >
                        <IoSaveOutline className="w-5! h-5!" />
                      </Button>
                      <Button
                        size="icon"
                        type="button"
                        variant="ghost"
                        className="cursor-pointer"
                        onClick={() => form.reset()}
                      >
                        <RiResetLeftFill className="text-yellow-uika" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )}
              {data?.data.map((item, index) => (
                <TableRow key={index} className=" even:bg-gray-100">
                  <TableCell className="text-center">{item.kode}</TableCell>
                  <TableCell className="text-center"></TableCell>
                  <TableCell className="text-center">
                    {item.jabatan_akademik}
                  </TableCell>
                  <TableCell className="h-full">
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
              ))}
            </TableBody>
          </Table>

          <CustomPagination
            currentPage={Number(searchParam.get("page") || 1)}
            links={data?.links || []}
            onPageChange={(page) => {
              searchParam.set("page", page.toString());
              setSearchParam(searchParam);
            }}
            hasNextPage={!!data?.next_page_url}
            hasPrevPage={!!data?.prev_page_url}
            totalPages={data?.last_page}
          />
        </form>
      </Form>
    </div>
  );
};

export default JabatanAkademik;
