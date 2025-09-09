import CustomCard from "@/components/blocks/Card";
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput";
import CustomPagination from "@/components/blocks/CustomPagination";
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
import adminServices from "@/services/admin.services.ts";
import potsReferensiServices from "@/services/create.admin.referensi.ts";
import putReferensiServices from "@/services/put.admin.referensi.ts";
import { IJenisCutiPost } from "@/types/create.referensi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { IoSaveOutline } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { RiResetLeftFill } from "react-icons/ri";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import deleteReferensiServices from "@/services/admin.delete.referensi.ts";
import { ConfirmDialog } from "@/components/blocks/ConfirmDialog/ConfirmDialog.tsx";
import { AxiosError } from "axios";

// Define interface for the data item
interface JenisCutiItem {
  id: string;
  kode: string;
  nama_jenis_cuti: string;
  standar_cuti: number | string; // API bisa mengembalikan string atau number
  format_nomor_surat: string;
  keterangan: string;
}

// Define interface for the API response
// FIX: Menambahkan properti 'prev_page_url'
interface JenisCutiResponse {
  data: JenisCutiItem[];
  links: any[];
  next_page_url: string | null;
  prev_page_url: string | null; // Properti ini ditambahkan
  last_page: number;
}

const jenisCutiSchema = z.object({
  id: z.number().optional(),
  kode: z.string().min(1, "Kode tidak boleh kosong"),
  nama_jenis_cuti: z.string().min(1, "Nama jenis cuti tidak boleh kosong"),
  standar_cuti: z.coerce
      .number()
      .min(1, "Standar cuti tidak boleh kosong atau minus"),
  format_nomor_surat: z.string().min(1, "Nomor surat tidak boleh kosong"),
  keterangan: z.string().min(1, "Keterangan tidak boleh kosong"),
});

type jenisCutiFormvalue = z.infer<typeof jenisCutiSchema>;

const JenisCuti = () => {
  const form = useForm<jenisCutiFormvalue>({
    defaultValues: {
      kode: "",
      nama_jenis_cuti: "",
      standar_cuti: 0,
      format_nomor_surat: "",
      keterangan: "",
    },
    resolver: zodResolver(jenisCutiSchema),
  });
  const [searchParam, setSearchParam] = useSearchParams();
  const [isAddData, setIsAddData] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [editingItemId, setEditingItemId] = useState<number | null>(null);
  const queryClient = useQueryClient();

  const { data } = useQuery<JenisCutiResponse>({
    queryKey: ["daftar-cuti", searchParam.get("page")],
    queryFn: async () => {
      const response = await adminServices.getJenisCuti(
          searchParam.get("page")
      );
      return response.data.data;
    },
  });

  const { mutate: postJenisCuti } = useMutation<
      any,
      AxiosError,
      IJenisCutiPost
  >({
    mutationFn: (data) => potsReferensiServices.jeniCuti(data),
    onSuccess: () => {
      form.reset();
      toast.success("Data berhasil ditambahkan");
      setIsAddData(false);
      queryClient.invalidateQueries({ queryKey: ["daftar-cuti"] });
    },
  });

  const { mutate: putJenisCuti } = useMutation<
      any,
      AxiosError,
      jenisCutiFormvalue
  >({
    mutationFn: (data) => putReferensiServices.jenisCuti(data.id!, data),
    onSuccess: () => {
      form.reset();
      toast.success("Data berhasil diedit");
      setIsAddData(false);
      setIsEditMode(false);
      queryClient.invalidateQueries({ queryKey: ["daftar-cuti"] });
    },
  });

  const { mutate: deleteJamKerja } = useMutation<any, AxiosError, number>({
    mutationFn: (id) => deleteReferensiServices.deteleJenisCuti(id),
    onSuccess: () => {
      toast.success("Data berhasil dihapus");
      queryClient.invalidateQueries({ queryKey: ["daftar-cuti"] });
      if (editingItemId) {
        form.reset();
        setEditingItemId(null);
        setIsEditMode(false);
        setIsAddData(false);
      }
    },
  });

  const handleDelete = (id: number) => {
    deleteJamKerja(id);
  };

  const handleSubmitJenisCuti: SubmitHandler<jenisCutiFormvalue> = (values) => {
    if (isEditMode && editingItemId) {
      putJenisCuti(values);
    } else {
      postJenisCuti(values as IJenisCutiPost);
    }
  };

  const handleEditItem = (item: JenisCutiItem) => {
    form.reset({
      id: item.id,
      kode: item.kode,
      nama_jenis_cuti: item.nama_jenis_cuti,
      standar_cuti: Number(item.standar_cuti),
      format_nomor_surat: item.format_nomor_surat,
      keterangan: item.keterangan,
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
        <h1 className="text-lg sm:text-2xl font-normal">
          Jenis Cuti{" "}
          <span className="text-muted-foreground font-normal text-[12px] sm:text-[16px]">
          Daftar Jenis Cuti
        </span>
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmitJenisCuti)}>
            <CustomCard
                actions={
                  <div className="flex justify-end">
                    <div className="flex gap-4">
                      <Button
                          type="button"
                          onClick={() => {
                            if (!isEditMode) {
                              form.reset({
                                kode: "",
                                nama_jenis_cuti: "",
                                standar_cuti: 0,
                                format_nomor_surat: "",
                                keterangan: "",
                              });
                              setIsAddData(true);
                              searchParam.set("page", "1");
                              setSearchParam(searchParam);
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
                }
            >
              <Table className="mt-5 table-auto">
                <TableHeader>
                  <TableRow className="bg-gray-100">
                    <TableHead className="text-center text-xs sm:text-sm">
                      Kode
                    </TableHead>
                    <TableHead className="text-center text-xs sm:text-sm">
                      Nama Jenis Cuti
                    </TableHead>
                    <TableHead className="text-center text-xs sm:text-sm">
                      Standar Cuti (Hari)
                    </TableHead>
                    <TableHead className="text-center text-xs sm:text-sm">
                      Format Nomor Surat
                    </TableHead>
                    <TableHead className="text-center text-xs sm:text-sm">
                      Keterangan
                    </TableHead>
                    <TableHead className="text-center text-xs sm:text-sm">
                      Aksi
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="divide-y divide-gray-200">
                  {(isAddData || isEditMode) &&
                      Number(searchParam.get("page")) === 1 && (
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
                                  name="nama_jenis_cuti"
                                  required={false}
                              />
                            </TableCell>
                            <TableCell className="text-center text-xs sm:text-sm">
                              <FormFieldInput
                                  inputStyle="w-full"
                                  position={true}
                                  form={form}
                                  type="number"
                                  name="standar_cuti"
                                  required={false}
                              />
                            </TableCell>
                            <TableCell className="text-center text-xs sm:text-sm">
                              <FormFieldInput
                                  inputStyle="w-full"
                                  position={true}
                                  form={form}
                                  name="format_nomor_surat"
                                  required={false}
                              />
                            </TableCell>
                            <TableCell className="text-center text-xs sm:text-sm">
                              <FormFieldInput
                                  inputStyle="w-full"
                                  position={true}
                                  form={form}
                                  name="keterangan"
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
                  {data?.data.map((item, index) => (
                      <TableRow key={index} className=" even:bg-gray-100">
                        <TableCell className="text-center text-xs sm:text-sm">
                          {item.kode}
                        </TableCell>
                        <TableCell className="text-center text-xs sm:text-sm">
                          {item.nama_jenis_cuti}
                        </TableCell>
                        <TableCell className="text-center text-xs sm:text-sm">
                          {item.standar_cuti}
                        </TableCell>
                        <TableCell className="text-center text-xs sm:text-sm">
                          {item.format_nomor_surat}
                        </TableCell>
                        <TableCell className="text-center text-xs sm:text-sm">
                          {item.keterangan}
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
                  ))}
                </TableBody>
              </Table>

              <CustomPagination
                  currentPage={Number(searchParam.get("page") || 1)}
                  links={data?.links || []}
                  onPageChange={(page) => {
                    if (isEditMode) {
                      toast.warning("Selesaikan edit data terlebih dahulu");
                      return;
                    }
                    searchParam.set("page", page.toString());
                    setSearchParam(searchParam);
                  }}
                  hasNextPage={!!data?.next_page_url}
                  hasPrevPage={!!data?.prev_page_url}
                  totalPages={data?.last_page}
              />
            </CustomCard>
          </form>
        </Form>
      </div>
  );
};

export default JenisCuti;
