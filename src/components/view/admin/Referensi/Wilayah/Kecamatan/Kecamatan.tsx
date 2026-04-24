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
import React, { useState, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
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

interface kecamatanItem {
  id: string;
  kode: string;
  nama: string;
  provinsi_id: string;
  kota_id: string;
  kabupaten_kota: {
    nama: string;
    kode: string;
  }
}

interface kecamatanResponse {
  data: kecamatanItem[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

const kecamatanSchema = z.object({
  id: z.string().optional(),
  kode: z.string().min(1, "Kode tidak boleh kosong"),
  nama: z.string().min(1, "Nama tidak boleh kosong"),
  provinsi_id: z.string().min(1, "Provinsi tidak boleh kosong"),
  kota_id: z.string().min(1, "Kota tidak boleh kosong"),
});

type kecamatanFormValue = z.infer<typeof kecamatanSchema>;

const Kecamatan = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const queryClient = useQueryClient();
  const [, setIsAddData] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [currentPage] = useState<number>(Number(searchParam.get("page") || 1));

  const [selectedProvinsi, setSelectedProvinsi] = useState<string>("semua");
  const [selectedKota, setSelectedKota] = useState<string>("semua");

  const form = useForm({
    defaultValues: {
      kode: "",
      nama: "",
      provinsi_id: "",
      kota_id: "",
    },
    resolver: zodResolver(kecamatanSchema),
  });

  const formProvinsiId = useWatch({ control: form.control, name: "provinsi_id" });

  // Reset kota_id if provinsi_id changes
  useEffect(() => {
    if (formProvinsiId && isEditMode && editingItemId === null) {
      if (form.getValues("kota_id") !== "") {
        form.setValue("kota_id", "");
      }
    }
  }, [formProvinsiId, isEditMode, editingItemId, form]);


  // Fetch all provinsis 
  const { data: provinsiResponse } = useQuery({
    queryKey: ["provinsi-all"],
    queryFn: async () => {
      const response = await adminServices.getProvinsi();
      return response.data.data;
    }
  });

  const provinsiOptions = React.useMemo(() => {
    if (!provinsiResponse?.data) return [];
    return provinsiResponse.data.map((prov: any) => ({
      value: prov.id,
      label: prov.nama,
    }));
  }, [provinsiResponse]);

  // Fetch all kotas for mapping
  const { data: allKotaResponse } = useQuery({
    queryKey: ["kota-all"],
    queryFn: async () => {
      const response = await adminServices.getKota();
      return response.data.data;
    }
  });

  const allKotaOptions = React.useMemo(() => {
    if (!allKotaResponse?.data) return [];
    return allKotaResponse.data.map((kota: any) => ({
      value: kota.id,
      label: kota.nama,
    }));
  }, [allKotaResponse]);

  // Fetch filter Kotas
  const { data: filterKotaResponse } = useQuery({
    queryKey: ["kota-filter", selectedProvinsi],
    queryFn: async () => {
      const params: any = {};
      if (selectedProvinsi !== "semua") params.provinsi_id = selectedProvinsi;
      const response = await adminServices.getKota(params);
      return response.data.data;
    }
  });

  const filterKotaOptions = React.useMemo(() => {
    if (!filterKotaResponse?.data) return [];
    return filterKotaResponse.data.map((kota: any) => ({
      value: kota.id,
      label: kota.nama,
    }));
  }, [filterKotaResponse]);

  // Fetch form Kotas
  const { data: formKotaResponse } = useQuery({
    queryKey: ["kota-form", formProvinsiId],
    queryFn: async () => {
      const params: any = {};
      if (formProvinsiId) params.provinsi_id = formProvinsiId;
      const response = await adminServices.getKota(params);
      return response.data.data;
    },
    enabled: !!formProvinsiId
  });

  const formKotaOptions = React.useMemo(() => {
    if (!formKotaResponse?.data) return [];
    return formKotaResponse.data.map((kota: any) => ({
      value: kota.id,
      label: kota.nama,
    }));
  }, [formKotaResponse]);


  const { data } = useQuery<kecamatanResponse>({
    queryKey: ["kecamatan", searchParam.get("page"), selectedProvinsi, selectedKota],
    queryFn: async () => {
      const params: any = { page: searchParam.get("page") };
      if (selectedProvinsi && selectedProvinsi !== "semua") {
        params.provinsi_id = selectedProvinsi;
      }
      if (selectedKota && selectedKota !== "semua") {
        params.kota_id = selectedKota;
      }
      const response = await adminServices.getKecamatan(params);
      return response.data.data;
    }
  });

  const { mutate: putData } = useMutation({
    mutationFn: (data: kecamatanFormValue) =>
      editingItemId
        ? putReferensiServices.kecamatan(editingItemId, data)
        : potsReferensiServices.kecamatan(data),
    onSuccess: () => {
      toast.success(editingItemId ? "Data berhasil diedit" : "Data berhasil ditambahkan");

      setIsEditMode(false);
      setIsAddData(false);
      setEditingItemId(null);

      form.reset();

      queryClient.invalidateQueries({ queryKey: ["kecamatan"] });
    },
  });

  const { mutate: deleteData } = useMutation({
    mutationFn: (id: string) => deleteReferensiServices.deleteKecamatan(id),
    onSuccess: () => {
      toast.success("Data berhasil dihapus");
      queryClient.invalidateQueries({ queryKey: ["kecamatan"] });
    },
  });

  const handleDelete = (id: string) => {
    deleteData(id);
  };

  const handleSubmitData = (values: kecamatanFormValue) => {
    putData(values);
  };

  const handleEditItem = (item: kecamatanItem) => {
    form.reset({
      id: item.id,
      kode: item.kode,
      nama: item.nama,
      provinsi_id: item.provinsi_id || "",
      kota_id: item.kota_id || "",
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
  const combinedKotaOptions = [{ value: "semua", label: "Semua Kota" }, ...filterKotaOptions];

  return (
    <div className="mt-10 mb-20">
      <Title title="Kecamatan" subTitle="Daftar Kecamatan" />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmitData)}>
          <CustomCard
            actions={
              <div className="w-full flex flex-col md:flex-row sm:grid-flow-col gap-4 gap-x-20">
                <div className="w-full flex flex-col sm:flex-row justify-between gap-2">
                  <Label className="w-full text-[#FDA31A] self-center">Provinsi</Label>
                  <SelectFilter
                    classname="w-full md:w-auto"
                    value={selectedProvinsi}
                    onValueChange={(v) => {
                      setSelectedProvinsi(v);
                      setSelectedKota("semua"); // reset kota on provinsi change
                      searchParam.set("page", "1");
                      setSearchParam(searchParam);
                    }}
                    placeholder="Pilih Provinsi"
                    options={combinedProvinsiOptions}
                  />
                </div>
                <div className="w-full flex flex-col sm:flex-row justify-between gap-2">
                  <Label className="w-full text-[#FDA31A] self-center">Kota</Label>
                  <SelectFilter
                    classname="w-full md:w-auto"
                    value={selectedKota}
                    onValueChange={(v) => {
                      setSelectedKota(v);
                      searchParam.set("page", "1");
                      setSearchParam(searchParam);
                    }}
                    placeholder="Pilih Kota"
                    options={combinedKotaOptions}
                  />
                </div>
              </div>
            }
          />

          <div className="w-full flex flex-col md:flex-row md:gap-2 gap-4 lg:gap-4 justify-between mt-6">
            <div className="w-full flex flex-col md:flex-row md:gap-2 gap-4 lg:gap-4">
              <SearchInput className="w-full lg:w-80" />
            </div>

            <div className="w-full flex gap-3 justify-end">
              <Button
                type="button"
                onClick={() => {
                  form.reset({ kode: "", nama: "", provinsi_id: "", kota_id: "" });
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
                {/* <TableHead className="text-center text-xs sm:text-sm">Provinsi</TableHead> */}
                <TableHead className="text-center text-xs sm:text-sm">Kota</TableHead>
                <TableHead className="text-center text-xs sm:text-sm">Kode</TableHead>
                <TableHead className="text-center text-xs sm:text-sm">Nama Kecamatan</TableHead>
                <TableHead className="text-center text-xs sm:text-sm">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-200">
              {isEditMode && currentPage == 1 && (
                <TableRow className=" even:bg-gray-100">
                  <TableCell className="text-center text-xs sm:text-sm">
                    {/* <FormFieldSelect
                      form={form}
                      name="provinsi_id"
                      options={provinsiOptions}
                      placeholder="Pilih Provinsi"
                    /> */}
                  </TableCell>
                  <TableCell className="text-center text-xs sm:text-sm">
                    <FormFieldSelect
                      form={form}
                      name="kota_id"
                      options={formKotaOptions}
                      placeholder="Pilih Kota"
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
                // const provName = provinsiOptions.find(p => p.value === item.provinsi_id)?.label || item.provinsi_id;
                const ktName = item.kabupaten_kota.nama;
                return (
                  <TableRow key={item.id} className=" even:bg-gray-100">
                    {/* <TableCell className="text-center text-xs sm:text-sm">
                      {provName}
                    </TableCell> */}
                    <TableCell className="text-center text-xs sm:text-sm">
                      {ktName}
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

export default Kecamatan;
