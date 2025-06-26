import CustomCard from "@/components/blocks/Card";
import { ConfirmDialog } from "@/components/blocks/ConfirmDialog/ConfirmDialog";
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput";
import CustomPagination from "@/components/blocks/CustomPagination";
import { InfiniteScrollSelect } from "@/components/blocks/InfiniteScrollSelect/InfiniteScrollSelect";
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
import deleteReferensiServices from "@/services/admin.delete.referensi";
import adminServices from "@/services/admin.services";
import potsReferensiServices from "@/services/create.admin.referensi";
import putReferensiServices from "@/services/put.admin.referensi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { FaCheck, FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { IoClose, IoSaveOutline } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { RiResetLeftFill } from "react-icons/ri";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const jenisIzinSchema = z.object({
  id: z.number().optional(),
  jenis_kehadiran_id: z.coerce
    .number({
      required_error: "Jenis kehadiran harus dipilih.",
    })
    .min(1, "Jenis kehadiran harus dipilih."),
  kode: z.string().min(1, "Kode tidak boleh kosong."),
  jenis_izin: z.string().min(1, "Jenis izin tidak boleh kosong."),
  izin_max: z.string().min(1, "Izin max tidak boleh kosong."),
  potong_cuti: z.boolean(),
});

export type jenisIzinFormvalue = z.infer<typeof jenisIzinSchema>;

const JenisIzin = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const queryClient = useQueryClient();
  const [isAddData, setIsAddData] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [editingItemId, setEditingItemId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(
    Number(searchParam.get("page") || 1)
  );

  const form = useForm<jenisIzinFormvalue>({
    defaultValues: {
      jenis_kehadiran_id: 0,
      kode: "",
      jenis_izin: "",
      izin_max: "",
      potong_cuti: false,
    },
    resolver: zodResolver(jenisIzinSchema),
  });

  const { data: jenisIzinData } = useQuery({
    queryKey: ["jenis-izin-referensi", searchParam.get("page")],
    queryFn: async () => {
      const response = await adminServices.getJenisIzinReferensi(
        searchParam.get("page")
      );
      return response.data.data;
    },
  });

  const { data: jenisKehadiranData } = useQuery({
    queryKey: ["jenis-kehadiran-all"],
    queryFn: async () => {
      const response = await adminServices.getJenisKehadiran();
      return response.data.data;
    },
  });

  const jenisKehadiranMap = useMemo(() => {
    if (!jenisKehadiranData) return {};
    return jenisKehadiranData.data.reduce((acc: any, kehadiran: any) => {
      acc[kehadiran.id] = kehadiran.nama_jenis;
      return acc;
    }, {});
  }, [jenisKehadiranData]);

  // --- MUTATIONS (CREATE, UPDATE, DELETE) ---
  const { mutate: postData } = useMutation({
    mutationFn: (data: jenisIzinFormvalue) =>
      potsReferensiServices.jenisIzin(data),
    onSuccess: () => {
      form.reset();
      toast.success("Berhasil menambahkan data");
      setIsAddData(false);
      queryClient.invalidateQueries({ queryKey: ["jenis-izin-referensi"] });
    },
  });

  const { mutate: putData } = useMutation({
    mutationFn: (data: jenisIzinFormvalue) =>
      putReferensiServices.jenisIzin(data.id!, data),
    onSuccess: () => {
      toast.success("Data berhasil diedit");
      setIsEditMode(false);
      setIsAddData(false);
      setEditingItemId(null);
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["jenis-izin-referensi"] });
    },
  });

  const { mutate: deleteData } = useMutation({
    mutationFn: (id: number) => deleteReferensiServices.deleteJenisIzin(id),
    onSuccess: () => {
      toast.success("Data berhasil dihapus");
      queryClient.invalidateQueries({ queryKey: ["jenis-izin-referensi"] });
      if (editingItemId) {
        form.reset();
        setEditingItemId(null);
        setIsEditMode(false);
        setIsAddData(false);
      }
    },
  });

  // --- HANDLER FUNCTIONS ---
  const handleDelete = (id: number) => {
    deleteData(id);
  };

  const handleEditItem = (item: jenisIzinFormvalue) => {
    form.reset({
      id: item.id,
      jenis_kehadiran_id: item.jenis_kehadiran_id,
      kode: item.kode,
      jenis_izin: item.jenis_izin,
      izin_max: item.izin_max,
      potong_cuti: item.potong_cuti,
    });
    setIsEditMode(true);
    setEditingItemId(item.id ?? null);
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

  const handleSubmitData = (values: jenisIzinFormvalue) => {
    if (isEditMode && editingItemId) {
      putData(values);
    } else {
      postData(values);
    }
  };

  // --- USEEFFECT HOOKS ---
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
    if (
      jenisIzinData?.last_page &&
      Number(searchParam.get("page")) > jenisIzinData.last_page &&
      jenisIzinData.last_page > 0
    ) {
      searchParam.set("page", jenisIzinData.last_page.toString());
      setSearchParam(searchParam);
    }
  }, [searchParam, jenisIzinData, setSearchParam]);

  return (
    <div className="mt-10 mb-20">
      <h1 className="text-lg sm:text-2xl font-normal">
        Jenis Izin{" "}
        <span className="text-muted-foreground font-normal text-[16px]">
          Daftar Jenis Izin
        </span>
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmitData)}>
          <CustomCard
            actions={
              <div className="flex justify-end">
                <Button
                  type="button"
                  onClick={() => {
                    if (!isEditMode) {
                      form.reset({
                        id: 0,
                        jenis_kehadiran_id: undefined,
                        kode: "",
                        jenis_izin: "",
                        izin_max: "",
                        potong_cuti: false,
                      });
                      searchParam.set("page", "1");
                      setSearchParam(searchParam);
                      setIsAddData(true);
                    }
                  }}
                  className={`cursor-pointer ${
                    isEditMode
                      ? "bg-gray-400"
                      : "bg-green-light-uika hover:bg-[#329C59]"
                  }`}
                  disabled={isEditMode}
                >
                  <FaPlus className="w-4 h-4 text-white" />
                  <span className="ml-2">Tambah</span>
                </Button>
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
                    Jenis Izin
                  </TableHead>
                  <TableHead className="text-center text-xs sm:text-sm">
                    Status Presensi
                  </TableHead>
                  <TableHead className="text-center text-xs sm:text-sm">
                    Maksimal (Hari)
                  </TableHead>
                  <TableHead className="text-center text-xs sm:text-sm">
                    Potong Cuti
                  </TableHead>
                  <TableHead className="text-center text-xs sm:text-sm">
                    Aksi
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-gray-200">
                {(isAddData || isEditMode) && currentPage === 1 && (
                  <TableRow className="even:bg-gray-100">
                    <TableCell className="text-center">
                      <FormFieldInput
                        form={form}
                        name="kode"
                        required={false}
                      />
                    </TableCell>
                    <TableCell className="text-center">
                      <FormFieldInput
                        form={form}
                        name="jenis_izin"
                        required={false}
                      />
                    </TableCell>
                    <TableCell className="text-center">
                      <InfiniteScrollSelect
                        form={form}
                        name="jenis_kehadiran_id"
                        placeholder="--Pilih Kehadiran--"
                        required={false}
                        queryKey="jenis-kehadiran-select"
                        queryFn={adminServices.getJenisKehadiran}
                        itemValue="id"
                        itemLabel="nama_jenis"
                      />
                    </TableCell>
                    <TableCell className="text-center">
                      <FormFieldInput
                        form={form}
                        name="izin_max"
                        required={false}
                      />
                    </TableCell>
                    <TableCell className="text-center">
                      <FormFieldInput
                        type="checkbox"
                        form={form}
                        name="potong_cuti"
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center items-center w-full h-full">
                        <Button
                          type="submit"
                          size="icon"
                          variant="ghost"
                          className="cursor-pointer"
                        >
                          <IoSaveOutline className="w-5 h-5" />
                        </Button>
                        <Button
                          size="icon"
                          type="button"
                          variant="ghost"
                          className="cursor-pointer"
                          onClick={handleCancel}
                        >
                          <RiResetLeftFill className="text-yellow-uika w-5 h-5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )}

                {jenisIzinData?.data.map((item: any) => (
                  <TableRow key={item.id} className="even:bg-gray-100">
                    <TableCell className="text-center text-xs sm:text-sm">
                      {item.kode}
                    </TableCell>
                    <TableCell className="text-center text-xs sm:text-sm">
                      {item.jenis_izin}
                    </TableCell>
                    <TableCell className="text-center text-xs sm:text-sm">
                      {jenisKehadiranMap[item.jenis_kehadiran_id] || "-"}
                    </TableCell>
                    <TableCell className="text-center text-xs sm:text-sm">
                      {item.izin_max} hari
                    </TableCell>
                    <TableCell className="text-center flex justify-center items-center mt-2">
                      {item.potong_cuti ? (
                        <FaCheck className="text-green-500 w-5 h-5" />
                      ) : (
                        <IoClose className="text-red-500 w-5 h-5" />
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center items-center w-full h-full">
                        <Button
                          size="icon"
                          type="button"
                          variant="ghost"
                          className="cursor-pointer"
                          onClick={() => handleEditItem(item)}
                          disabled={isEditMode && editingItemId !== item.id}
                        >
                          <MdEdit className="w-5 h-5 text-[#26A1F4]" />
                        </Button>
                        <ConfirmDialog
                          title="Hapus Data?"
                          description="Apakah Anda yakin ingin menghapus data ini?"
                          onConfirm={() => handleDelete(item.kode)}
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
              data={jenisIzinData}
              currentPage={Number(searchParam.get("page") || 1)}
              onPageChange={(page) => {
                searchParam.set("page", page.toString());
                setSearchParam(searchParam);
              }}
            />
          </CustomCard>
        </form>
      </Form>
    </div>
  );
};

export default JenisIzin;
