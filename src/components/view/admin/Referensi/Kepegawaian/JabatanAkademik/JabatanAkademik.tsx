import CustomCard from "@/components/blocks/Card";
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput";
import CustomPagination from "@/components/blocks/CustomPagination";
import SearchInput from "@/components/blocks/SearchInput";
import { SelectFilter as SelectFilterForm } from "@/components/blocks/SelectFilterForm";
import SelectFilter from "@/components/blocks/SelectFilter";
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
import { useSearchParams } from "react-router-dom";
import { z } from "zod";
import potsReferensiServices from "@/services/create.admin.referensi.ts";
import { toast } from "sonner";
import { IJabatanAkademik } from "@/types/create.referensi";
import { zodResolver } from "@hookform/resolvers/zod";
import putReferensiServices from "@/services/put.admin.referensi";
import deleteReferensiServices from "@/services/admin.delete.referensi";
import { ConfirmDialog } from "@/components/blocks/ConfirmDialog/ConfirmDialog";

// Define interface for the data item
interface JabatanAkademikItem {
  id: number;
  kode: string;
  jabatan_akademik: string;
  role_id: number;
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

const jabatanAkademikSchema = z.object({
  id: z.number().optional(),
  kode: z.string().min(1, "Kode tidak boleh kosong"),
  jabatan_akademik: z.string().min(1, "Jabatan Akademik tidak boleh kosong"),
  role_id: z.string().min(1, "Jenis Jabatan harus dipilih"),
});

type jabatanAkademikFormvalue = z.infer<typeof jabatanAkademikSchema>;

const JabatanAkademik = () => {
  const form = useForm({
    defaultValues: {
      kode: "",
      jabatan_akademik: "",
      role_id: "",
    },
    resolver: zodResolver(jabatanAkademikSchema),
  });

  const [searchParam, setSearchParam] = useSearchParams();
  const [isAddData, setIsAddData] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [editingItemId, setEditingItemId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(
    Number(searchParam.get("page") || 1)
  );
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

  //   get data jenis jabatan
  const { data: jenisJabatan } = useQuery({
    queryKey: ["daftar-role"],
    queryFn: async () => {
      const response = await adminServices.getDaftarRoleID();
      return response.data.data;
    },
  });

  const jenisJabatanOptions =
    jenisJabatan?.data.map((role: { id: { toString: () => any; }; nama: any; }) => ({
      value: role.id.toString(),
      label: role.nama,
    })) || [];

  // tambah
  const { mutate: postData } = useMutation({
    mutationFn: (data: IJabatanAkademik) =>
      potsReferensiServices.jabatanAkademik(data),
    onSuccess: () => {
      form.reset();
      toast.success("Data berhasil ditambahkan");
      setIsAddData(false);
      queryClient.invalidateQueries({ queryKey: ["jabatan-akademik"] });
    },
  });

  // edit data
  const { mutate: putData } = useMutation({
    mutationFn: (data: jabatanAkademikFormvalue) =>
      putReferensiServices.jabatanAkademik(data.id!, data),
    onSuccess: () => {
      toast.success("Data berhasil diedit");

      setIsEditMode(false);
      setIsAddData(false);
      setEditingItemId(null);

      form.reset();

      queryClient.invalidateQueries({ queryKey: ["jabatan-akademik"] });
    },
  });

  // hapus data
  const { mutate: deleteData } = useMutation({
    mutationFn: (id: number) =>
      deleteReferensiServices.deteleJabatanAkademik(id),
    onSuccess: () => {
      toast.success("Data berhasil dihapus");
      queryClient.invalidateQueries({ queryKey: ["jabatan-akademik"] });

      if (editingItemId) {
        form.reset();
        setEditingItemId(null);
        setIsEditMode(false);
        setIsAddData(false);
      }
    },
  });

  const handleDelete = (id: number) => {
    deleteData(id);
  };

  const handleEditItem = (item: JabatanAkademikItem) => {
    form.reset({
      id: item.id,
      kode: item.kode,
      jabatan_akademik: item.jabatan_akademik,
      role_id: item.role_id.toString(),
    });

    setIsEditMode(true);
    setEditingItemId(item.id);
    setIsAddData(true);

    if (Number(searchParam.get("page")) !== 1) {
      searchParam.set("page", "1");
      setSearchParam(searchParam);
    }
  };

  const handleSubmitData = (values: jabatanAkademikFormvalue) => {
    const dataUntukApi = {
      ...values,
      role_id: Number(values.role_id),
    };

    if (isEditMode && editingItemId) {
      // @ts-ignore
      putData(dataUntukApi);
    } else {
      postData(dataUntukApi);
    }
  };

  const handleCancel = () => {
    form.reset();
    setIsEditMode(false);
    setEditingItemId(null);
    setIsAddData(false);
  };

  useEffect(() => {
    const page = Number(searchParam.get("page") || 1);
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  }, [searchParam]);

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

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmitData)}>
          <CustomCard
            actions={
              <div className="flex">
                <Label className="w-32 text-[#FDA31A]">Jabatan Akademik</Label>
                <SelectFilter
                  classname="w-full md:w-80"
                  options={unitKerjaOptions}
                  placeholder="--Pilih Jabatan Akademik--"
                />
              </div>
            }
          />

          <div className="flex flex-col gap-4 sm:flex-row justify-between mt-6">
            <div className="flex gap-4">
              <SelectFilter
                options={unitKerjaOptions}
                placeholder="--Semua--"
              />
              <SearchInput />
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                onClick={() => {
                  if (!isEditMode) {
                    form.reset({
                      id: 0,
                      role_id: "",
                      kode: "",
                      jabatan_akademik: "",
                    });

                    setSearchParam(searchParam);
                    setIsAddData(true);
                    searchParam.set("page", "1");
                  }
                }}
                className={`cursor-pointer ${
                  isEditMode
                    ? "bg-gray-400"
                    : "bg-green-light-uika hover:bg-[#329C59]"
                }`}
                disabled={isEditMode}
              >
                <FaPlus className="w-4! h-4! text-white" />
                Tambah
              </Button>
            </div>
          </div>

          <Table className="mt-10 table-auto">
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead className="text-center text-xs sm:text-sm">
                  Kode
                </TableHead>
                <TableHead className="text-center text-xs sm:text-sm">
                  Jabatan Akdemik
                </TableHead>
                <TableHead className="text-center text-xs sm:text-sm">
                  Jenis Jabatan
                </TableHead>
                <TableHead className="text-center text-xs sm:text-sm">
                  Detail Tunjangan
                </TableHead>
                <TableHead className="text-center text-xs sm:text-sm">
                  Aksi
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-200">
              {isAddData && Number(searchParam.get("page")) === 1 && (
                <TableRow className=" even:bg-gray-100">
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
                      name="jabatan_akademik"
                      required={false}
                    />
                  </TableCell>
                  <TableCell className="text-center text-xs sm:text-sm">
                    <SelectFilterForm
                      form={form}
                      name="role_id"
                      placeholder="--Pilih Jenis Jabatan--"
                      options={jenisJabatanOptions}
                      required
                    />
                  </TableCell>
                  <TableCell className="text-center text-xs sm:text-sm">
                    <FormFieldInput
                      inputStyle="w-full"
                      position={true}
                      form={form}
                      name="-"
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
                        <RiResetLeftFill className="text-yellow-uika" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )}
              {data?.data.map((item, index) => {
                const roleName = jenisJabatanOptions.find(
                  (opt: { value: number; }) => opt.value == item.role_id
                )?.label;

                console.log(roleName);

                return (
                  <TableRow key={index} className=" even:bg-gray-100">
                    <TableCell className="text-center text-xs sm:text-sm">
                      {item.kode}
                    </TableCell>
                    <TableCell className="text-center text-xs sm:text-sm">
                      {item.jabatan_akademik}
                    </TableCell>
                    <TableCell className="text-center text-xs sm:text-sm">
                      {roleName}
                    </TableCell>
                    <TableCell className="text-center text-xs sm:text-sm">
                      -
                    </TableCell>
                    <TableCell className="h-full">
                      <div className="flex justify-center items-center w-full h-full">
                        <Button
                          size="icon"
                          type="button"
                          variant="ghost"
                          className="cursor-pointer"
                          onClick={() => handleEditItem(item)}
                          disabled={isEditMode && editingItemId !== item.id}
                        >
                          <MdEdit className="w-5! h-5! text-[#26A1F4]" />
                        </Button>
                        <ConfirmDialog
                          title="Hapus Data?"
                          description="Apakah Anda yakin ingin menghapus data ini?"
                          onConfirm={() => handleDelete(item.id)}
                        >
                          <Button
                            size="icon"
                            type="button"
                            variant="ghost"
                            className="cursor-pointer"
                          >
                            <FaRegTrashAlt className="text-red-500" />
                          </Button>
                        </ConfirmDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
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
