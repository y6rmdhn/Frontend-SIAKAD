import CustomCard from "@/components/blocks/Card";
import SearchInput from "@/components/blocks/SearchInput";
import SelectFilter from "@/components/blocks/SelectFilter";
import Title from "@/components/blocks/Title";
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
import { FaRegTrashAlt } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import { Form } from "@/components/ui/form";
import { FaPlus } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { z } from "zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import adminServices from "@/services/admin.services";
import putReferensiServices from "@/services/put.admin.referensi";
import potsReferensiServices from "@/services/create.admin.referensi";
import deleteReferensiServices from "@/services/admin.delete.referensi";
import { toast } from "sonner";
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput";
import { FormFieldSelect } from "@/components/blocks/CustomFormSelect/CustomFormSelect";
import { IoSaveOutline } from "react-icons/io5";
import { RiResetLeftFill } from "react-icons/ri";
import CustomPagination from "@/components/blocks/CustomPagination";

interface kotaItem {
  id: string;
  kode: string;
  nama: string;
  provinsi_id: string;
  provinsi: {
    nama: string;
  }
}

interface kotaResponse {
  data: kotaItem[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

const kotaSchema = z.object({
  id: z.string().optional(),
  kode: z.string().min(1, "Kode tidak boleh kosong"),
  nama: z.string().min(1, "Nama tidak boleh kosong"),
  provinsi_id: z.string().min(1, "Provinsi tidak boleh kosong"),
});

type kotaFormValue = z.infer<typeof kotaSchema>;

const Kota = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const queryClient = useQueryClient();
  const [, setIsAddData] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [currentPage] = useState<number>(Number(searchParam.get("page") || 1));

  const [selectedProvinsi, setSelectedProvinsi] = useState<string>("semua");

  const form = useForm({
    defaultValues: {
      kode: "",
      nama: "",
      provinsi_id: "",
    },
    resolver: zodResolver(kotaSchema),
  });

  // Fetch all provinsis for options (unpaginated/large limit if possible, or just standard for now)
  const { data: provinsiResponse } = useQuery({
    queryKey: ["provinsi-dropdown"],
    queryFn: async () => {
      const response = await adminServices.getProvinsi({ is_dropdown: true });
      return response.data.data;
    }
  });
  const provinsiOptions = React.useMemo(() => {
    // 1. Pastikan kita mengecek ke dalam properti .data, dan pastikan itu Array
    if (!provinsiResponse?.data || !Array.isArray(provinsiResponse.data)) {
      return [];
    }

    // 2. Lakukan map pada .data (yang berisi Array aslinya)
    return provinsiResponse.data.map((prov: any) => ({
      value: prov.id,
      label: prov.nama,
    }));
  }, [provinsiResponse]);
  const searchQuery = searchParam.get("search") || "";

  const { data } = useQuery<kotaResponse>({
    queryKey: ["kota", searchParam.get("page"), selectedProvinsi, searchQuery],
    queryFn: async () => {
      const params: any = { page: searchParam.get("page") || 1 };

      if (selectedProvinsi && selectedProvinsi !== "semua") {
        params.provinsi_id = selectedProvinsi;
      }

      if (searchQuery) {
        params.search = searchQuery;
      }

      const response = await adminServices.getKota(params);

      return response.data.data;
    }
  });

  const { mutate: putData } = useMutation({
    mutationFn: (data: kotaFormValue) =>
      editingItemId
        ? putReferensiServices.kota(editingItemId, data)
        : potsReferensiServices.kota(data),
    onSuccess: () => {
      toast.success(editingItemId ? "Data berhasil diedit" : "Data berhasil ditambahkan");

      setIsEditMode(false);
      setIsAddData(false);
      setEditingItemId(null);

      form.reset();

      queryClient.invalidateQueries({ queryKey: ["kota"] });
    },
  });

  const { mutate: deleteData } = useMutation({
    mutationFn: (id: string) => deleteReferensiServices.deleteKota(id),
    onSuccess: () => {
      toast.success("Data berhasil dihapus");
      queryClient.invalidateQueries({ queryKey: ["kota"] });
    },
  });

  const handleDelete = (id: string) => {
    deleteData(id);
  };

  const handleSubmitData = (values: kotaFormValue) => {
    putData(values);
  };

  const handleEditItem = (item: kotaItem) => {
    form.reset({
      id: item.id,
      kode: item.kode,
      nama: item.nama,
      provinsi_id: item.provinsi_id || "",
    });

    setIsEditMode(true);
    setEditingItemId(item.id);
    setIsAddData(true);

    if (Number(searchParam.get("page")) !== 1) {
      searchParam.set("page", "1");
      setSearchParam(searchParam);
    }
  };

  const handleCancel = () => {
    form.reset();
    setIsEditMode(false);
    setEditingItemId(null);
    setIsAddData(false);
  };

  const combinedProvinsiOptions = [{ value: "semua", label: "Semua Provinsi" }, ...provinsiOptions];


  return (
    <div className="mt-10 mb-20">
      <Title title="Kota" subTitle="Daftar Kabupaten/Kota" />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmitData)}>
          <CustomCard
            actions={
              <div className="flex flex-col sm:flex-row gap-4">
                <Label className="w-32 text-[#FDA31A] self-center">Provinsi</Label>
                <SelectFilter
                  classname="w-auto sm:ml-32"
                  value={selectedProvinsi}
                  onValueChange={(v) => { setSelectedProvinsi(v); searchParam.set("page", "1"); setSearchParam(searchParam); }}
                  placeholder="Pilih Provinsi"
                  options={combinedProvinsiOptions}
                />
              </div>
            }
          />

          <div className="w-full flex flex-col md:flex-row md:gap-2 gap-4 lg:gap-4 justify-between mt-6">
            <div className="w-full flex flex-col md:flex-row md:gap-2 gap-4 lg:gap-4">
              <SearchInput className="w-full lg:w-80"
                value={searchQuery}
                onChange={(e: any) => {
                  const val = e.target.value;
                  if (val) {
                    searchParam.set("search", val);
                  } else {
                    searchParam.delete("search");
                  }
                  searchParam.set("page", "1");
                  setSearchParam(searchParam);
                }}
              />
            </div>

            <div className="w-full flex gap-3 justify-end">
              <Button
                type="button"
                onClick={() => {
                  form.reset({ kode: "", nama: "", provinsi_id: "" });
                  setIsEditMode(true);
                  setEditingItemId(null);
                  setIsAddData(true);
                  if (Number(searchParam.get("page")) !== 1) {
                    searchParam.set("page", "1");
                    setSearchParam(searchParam);
                  }
                }}
                className="cursor-pointer bg-green-light-uika hover:bg-hover-green-uika w-full md:w-auto text-xs sm:text-sm"
              >
                <FaPlus /> Tambah
              </Button>
            </div>
          </div>

          <Table className="mt-10 table-auto">
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead className="text-center text-xs sm:text-sm">Provinsi</TableHead>
                <TableHead className="text-center text-xs sm:text-sm">Kode</TableHead>
                <TableHead className="text-center text-xs sm:text-sm">Nama Kabupaten/Kota</TableHead>
                <TableHead className="text-center text-xs sm:text-sm">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-200">
              {isEditMode && currentPage == 1 && (
                <TableRow className=" even:bg-gray-100">
                  <TableCell className="text-center text-xs sm:text-sm">
                    <FormFieldSelect
                      form={form}
                      name="provinsi_id"
                      options={provinsiOptions}
                      placeholder="Pilih Provinsi"
                    />
                  </TableCell>
                  <TableCell className="text-center text-xs sm:text-sm">
                    <FormFieldInput
                      inputStyle="w-full"
                      position={true}
                      form={form}
                      name="kode"
                      required={false}
                    />
                  </TableCell>
                  <TableCell className="text-center text-xs sm:text-sm">
                    <FormFieldInput
                      inputStyle="w-full"
                      position={true}
                      form={form}
                      name="nama"
                      required={false}
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
                        onClick={handleCancel}
                      >
                        <RiResetLeftFill className="w-5! h-5!" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )}
              {data?.data.map((item) => {
                const provName = item.provinsi.nama;
                return (
                  <TableRow key={item.id} className=" even:bg-gray-100">
                    <TableCell className="text-center text-xs sm:text-sm">
                      {provName}
                    </TableCell>
                    <TableCell className="text-center text-xs sm:text-sm">
                      {item.kode}
                    </TableCell>
                    <TableCell className="text-center text-xs sm:text-sm">
                      {item.nama}
                    </TableCell>
                    <TableCell className="h-full">
                      <div className="flex justify-center items-center w-full h-full">
                        <Button
                          type="button"
                          size="icon"
                          variant="ghost"
                          className="cursor-pointer"
                          onClick={() => handleEditItem(item)}
                        >
                          <MdEdit className="w-6! h-6! text-blue-uika" />
                        </Button>
                        <Button
                          type="button"
                          size="icon"
                          variant="ghost"
                          className="cursor-pointer"
                          onClick={() => handleDelete(item.id)}
                        >
                          <FaRegTrashAlt className="text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          <CustomPagination
            currentPage={Number(searchParam.get("page") || 1)}
            onPageChange={(page) => {
              searchParam.set("page", page.toString());
              setSearchParam(searchParam);
            }}
            hasNextPage={data?.pagination?.hasNextPage}
            hasPrevPage={data?.pagination?.hasPrevPage}
            totalPages={data?.pagination?.totalPages}
          />
        </form>
      </Form>
    </div>
  );
};

export default Kota;
