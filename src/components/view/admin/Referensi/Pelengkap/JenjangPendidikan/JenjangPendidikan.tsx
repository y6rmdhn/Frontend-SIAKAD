import CustomCard from "@/components/blocks/Card";
import Title from "@/components/blocks/Title";
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
import { useForm } from "react-hook-form";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { useSearchParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import adminServices from "@/services/admin.services";
import { useEffect, useState } from "react";
import CustomPagination from "@/components/blocks/CustomPagination";
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput";
import { RiResetLeftFill } from "react-icons/ri";
import { IoSaveOutline } from "react-icons/io5";
import potsReferensiServices from "@/services/create.admin.referensi";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import putReferensiServices from "@/services/put.admin.referensi";
import deleteReferensiServices from "@/services/admin.delete.referensi";
import { ConfirmDialog } from "@/components/blocks/ConfirmDialog/ConfirmDialog";

export const jenjangPendidikanSchema = z.object({
  id: z.string().optional(), // ✅ DIUBAH: number -> string
  jenjang_singkatan: z
    .string({
      required_error: "Jenjang singkatan tidak boleh kosong.",
    })
    .min(1, "Jenjang singkatan tidak boleh kosong."),
  jenjang_pendidikan: z
    .string({
      required_error: "Nama jenjang tidak boleh kosong.",
    })
    .min(3, "Nama jenjang harus memiliki minimal 3 karakter."),
  nama_jenjang_pendidikan_eng: z
    .string({
      required_error: "Nama jenjang (EN) tidak boleh kosong.",
    })
    .min(3, "Nama jenjang (EN) harus memiliki minimal 3 karakter."),
  urutan_jenjang_pendidikan: z.coerce
    .number({
      required_error: "Urutan jenjang tidak boleh kosong.",
      invalid_type_error: "Urutan jenjang harus berupa angka.",
    })
    .int("Urutan harus bilangan bulat.")
    .positive("Urutan harus lebih dari 0."),
  perguruan_tinggi: z.boolean().default(false),
  pasca_sarjana: z.boolean().default(false),
});

export type JenjangPendidikanSchema = z.infer<typeof jenjangPendidikanSchema>;

const JenjangPendidikan = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const queryClient = useQueryClient();
  const [isAddData, setIsAddData] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null); // ✅ DIUBAH: number -> string
  const [currentPage, setCurrentPage] = useState<number>(
    Number(searchParam.get("page") || 1)
  );

  const form = useForm<JenjangPendidikanSchema>({
    resolver: zodResolver(jenjangPendidikanSchema),
    defaultValues: {
      id: "", // ✅ DIUBAH: undefined -> string kosong
      jenjang_singkatan: "",
      jenjang_pendidikan: "",
      nama_jenjang_pendidikan_eng: "",
      urutan_jenjang_pendidikan: undefined,
      perguruan_tinggi: false,
      pasca_sarjana: false,
    },
  });

  // get data
  const { data } = useQuery({
    queryKey: ["jenjang-pendidikan", searchParam.get("page")],
    queryFn: async () => {
      const response = await adminServices.getJenjangPendidikan(
        searchParam.get("page")
      );
      console.log("📋 Data jenjang pendidikan:", response.data.data);
      return response.data.data;
    },
  });

  // tambah data
  const { mutate: postData } = useMutation({
    mutationFn: (data: JenjangPendidikanSchema) => {
      const { id, ...createData } = data; // Hapus id untuk create
      return potsReferensiServices.jenjangPendidikan(createData);
    },
    onSuccess: () => {
      form.reset();
      toast.success("Berhasil menambahkan data");
      setIsAddData(false);
      queryClient.invalidateQueries({ queryKey: ["jenjang-pendidikan"] });
    },
    onError: (error) => {
      toast.error(`Gagal menambah data: ${error.message}`);
    },
  });

  // edit data
  const { mutate: putData } = useMutation({
    mutationFn: (data: JenjangPendidikanSchema) => {
      if (!data.id) {
        throw new Error("ID diperlukan untuk edit data");
      }
      return putReferensiServices.jenjangPendidikan(data.id, data);
    },
    onSuccess: () => {
      toast.success("Data berhasil diedit");
      setIsEditMode(false);
      setIsAddData(false);
      setEditingItemId(null);
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["jenjang-pendidikan"] });
    },
    onError: (error) => {
      toast.error(`Gagal mengedit data: ${error.message}`);
    },
  });

  // hapus data
  const { mutate: deleteData } = useMutation({
    mutationFn: (
      id: string // ✅ DIUBAH: number -> string
    ) => deleteReferensiServices.jenjangPendidikan(id),
    onSuccess: () => {
      toast.success("Data berhasil dihapus");
      queryClient.invalidateQueries({ queryKey: ["jenjang-pendidikan"] });

      if (editingItemId) {
        form.reset();
        setEditingItemId(null);
        setIsEditMode(false);
        setIsAddData(false);
      }
    },
    onError: (error) => {
      toast.error(`Gagal menghapus data: ${error.message}`);
    },
  });

  const handleDelete = (id: string) => {
    // ✅ DIUBAH: number -> string
    deleteData(id);
  };

  const handleSubmitData = (values: JenjangPendidikanSchema) => {
    console.log("📤 Submit data:", values);
    if (isEditMode && editingItemId) {
      putData(values);
    } else {
      postData(values);
    }
  };

  const handleEditItem = (item: JenjangPendidikanSchema) => {
    console.log("📝 Edit item:", item);

    form.reset({
      id: item.id,
      jenjang_singkatan: item.jenjang_singkatan,
      jenjang_pendidikan: item.jenjang_pendidikan,
      nama_jenjang_pendidikan_eng: item.nama_jenjang_pendidikan_eng,
      urutan_jenjang_pendidikan: item.urutan_jenjang_pendidikan,
      perguruan_tinggi: item.perguruan_tinggi,
      pasca_sarjana: item.pasca_sarjana,
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
      <Title title="Jenjang Pendidikan" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmitData)}>
          <CustomCard
            actions={
              <div className="flex justify-end">
                <div className="flex gap-4">
                  <Button
                    type="button"
                    onClick={() => {
                      if (!isEditMode) {
                        form.reset({
                          id: "", // ✅ DIUBAH: 0 -> string kosong
                          jenjang_singkatan: "",
                          jenjang_pendidikan: "",
                          nama_jenjang_pendidikan_eng: "",
                          urutan_jenjang_pendidikan: 0,
                          perguruan_tinggi: false,
                          pasca_sarjana: false,
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
                    Jenjang
                  </TableHead>
                  <TableHead className="text-center text-xs sm:text-sm">
                    Nama Jenjang Pendidikan
                  </TableHead>
                  <TableHead className="text-center text-xs sm:text-sm">
                    Nama Jenjang Pendidikan (EN)
                  </TableHead>
                  <TableHead className="text-center text-xs sm:text-sm">
                    Urutan Jenjang Pendidikan
                  </TableHead>
                  <TableHead className="text-center text-xs sm:text-sm">
                    Perguruan Tinggi?
                  </TableHead>
                  <TableHead className="text-center text-xs sm:text-sm">
                    Pasca Sarjana?
                  </TableHead>
                  <TableHead className="text-center text-xs sm:text-sm">
                    Aksi
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-gray-200">
                {(isAddData || isEditMode) && currentPage === 1 && (
                  <TableRow className=" even:bg-gray-100">
                    <TableCell className="text-center text-xs sm:text-sm">
                      <FormFieldInput
                        inputStyle="w-full"
                        position={true}
                        form={form}
                        name="jenjang_singkatan"
                        required={false}
                      />
                    </TableCell>
                    <TableCell className="text-center text-xs sm:text-sm">
                      <FormFieldInput
                        inputStyle="w-full"
                        position={true}
                        form={form}
                        name="jenjang_pendidikan"
                        required={false}
                      />
                    </TableCell>
                    <TableCell className="text-center text-xs sm:text-sm">
                      <FormFieldInput
                        inputStyle="w-full"
                        position={true}
                        form={form}
                        name="nama_jenjang_pendidikan_eng"
                        required={false}
                      />
                    </TableCell>
                    <TableCell className="text-center text-xs sm:text-sm">
                      <FormFieldInput
                        inputStyle="w-full"
                        position={true}
                        form={form}
                        name="urutan_jenjang_pendidikan"
                        required={false}
                      />
                    </TableCell>
                    <TableCell className="text-center">
                      <FormFieldInput
                        inputStyle="w-full"
                        position={true}
                        type="checkbox"
                        form={form}
                        name="perguruan_tinggi"
                        required={false}
                      />
                    </TableCell>
                    <TableCell className="text-center">
                      <FormFieldInput
                        inputStyle="w-full"
                        position={true}
                        type="checkbox"
                        form={form}
                        name="pasca_sarjana"
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
                {data?.data.map((item: any) => (
                  <TableRow key={item.id} className=" even:bg-gray-100">
                    <TableCell className="text-center text-xs sm:text-sm">
                      {item.jenjang_singkatan}
                    </TableCell>
                    <TableCell className="text-center text-xs sm:text-sm">
                      {item.jenjang_pendidikan}
                    </TableCell>
                    <TableCell className="text-center text-xs sm:text-sm">
                      {item.nama_jenjang_pendidikan_eng}
                    </TableCell>
                    <TableCell className="text-center text-xs sm:text-sm">
                      {item.urutan_jenjang_pendidikan}
                    </TableCell>
                    <TableCell className="text-center text-xs sm:text-sm">
                      {item.perguruan_tinggi ? "Ya" : "Tidak"}
                    </TableCell>
                    <TableCell className="text-center text-xs sm:text-sm">
                      {item.pasca_sarjana ? "Ya" : "Tidak"}
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

export default JenjangPendidikan;
