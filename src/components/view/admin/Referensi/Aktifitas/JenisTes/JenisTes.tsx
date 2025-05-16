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
import adminServices from "@/services/admin.services";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";
import { IoSaveOutline } from "react-icons/io5";
import { RiResetLeftFill } from "react-icons/ri";
import potsReferensiServices from "@/services/create.admin.referensi";
import { toast } from "sonner";
import { IJenisTesPost } from "@/types/create.referensi";
import putReferensiServices from "@/services/put.admin.referensi";
import deleteReferensiServices from "@/services/admin.delete.referensi.ts";
import {ConfirmDialog} from "@/components/blocks/ConfirmDialog/ConfirmDialog.tsx";

// Define a type for an item in the data array
interface JenisTesItem {
  id: number;
  kode: string;
  jenis_tes: string;
  nilai_minimal: number;
  nilai_maksimal: number;
  // Add any other properties that the API returns
}

// Define a type for the API response
interface JenisTesResponse {
  data: JenisTesItem[];
  links: any[]; // You might want to define a more specific type here
  next_page_url: string | null;
  prev_page_url: string | null;
  last_page: number;
}

const jenisTesFormSchema = z
  .object({
    id: z.number().optional(),
    kode: z
      .string()
      .min(1, "Kode tidak boleh kosong")
      .max(10, "Kode tidak boleh lebih dari 10 karakter"),

    jenis_tes: z
      .string()
      .min(3, "Jenis Tes tidak boleh kurang dari 3 karakter"),

    nilai_minimal: z.coerce
      .number()
      .min(0, "Nilai minimal harus lebih besar dari atau sama dengan 0")
      .max(100, "Nilai minimal harus lebih kecil dari atau sama dengan 100"),

    nilai_maksimal: z.coerce
      .number()
      .min(0, "Nilai maksimal harus lebih besar dari atau sama dengan 0")
      .max(100, "Nilai maksimal harus lebih kecil dari atau sama dengan 100"),
  })
  .refine((data) => data.nilai_maksimal > data.nilai_minimal, {
    message: "Nilai maksimal harus lebih besar dari nilai minimal",
    path: ["nilai_maksimal"],
  });

// Define the type from the Zod schema
type JenisTesFormData = z.infer<typeof jenisTesFormSchema>;

const JenisTes = () => {
  const form = useForm<JenisTesFormData>({
    defaultValues: {
      kode: "",
      jenis_tes: "",
      nilai_minimal: 0,
      nilai_maksimal: 0,
    },
    resolver: zodResolver(jenisTesFormSchema),
  });

  const [searchParam, setSearchParam] = useSearchParams();
  const [isAddData, setIsAddData] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [editingItemId, setEditingItemId] = useState<number | null>(null);
  const queryClient = useQueryClient();

  // get data
  const { data } = useQuery<JenisTesResponse>({
    queryKey: ["jenis-tes", searchParam.get("page")],
    queryFn: async () => {
      const response = await adminServices.getJenisTes(searchParam.get("page"));
      console.log(response.data.data);

      return response.data.data;
    },
  });

  // tambah
  const { mutate: postJenisTes } = useMutation({
    mutationFn: (data: IJenisTesPost) => potsReferensiServices.jenisTes(data),
    onSuccess: () => {
      form.reset();
      toast.success("Data berhasil ditambahkan");
      setIsAddData(false);
    },
  });

  // edit
  const { mutate: putJenisTes } = useMutation({
    mutationFn: (data: JenisTesFormData) =>
      putReferensiServices.jenisTes(data.id!, data),
    onSuccess: () => {
      form.reset();
      toast.success("Data berhasil diedit");
      setIsEditMode(false);
      setIsAddData(false);

      queryClient.invalidateQueries({ queryKey: ["jenis-tes"] });
    },
  });

  // hapus data
  const {mutate: deleteJenisTest} = useMutation({
    mutationFn: (id: number) => deleteReferensiServices.deteleJenistest(id),
    onSuccess: () => {
      toast.success("Data berhasil dihapus");
      queryClient.invalidateQueries({ queryKey: ["jenis-tes"] });

      if (editingItemId) {
        form.reset();
        setEditingItemId(null);
        setIsEditMode(false);
        setIsAddData(false);
      }
    }
  })

  const handleDelete = (id: number) => {
    deleteJenisTest(id)
  };

  const handleSubmitJenisTes = (values: JenisTesFormData) => {
    if (isEditMode && editingItemId) {
      putJenisTes(values);
    } else {
      postJenisTes(values as IJenisTesPost);
    }
  };

  const handleEditItem = (item: JenisTesItem) => {
    form.reset({
      id: item.id,
      kode: item.kode,
      jenis_tes: item.jenis_tes,
      nilai_minimal: item.nilai_minimal,
      nilai_maksimal: item.nilai_maksimal,
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
      <h1 className="text-2xl font-normal">Daftar Jenis Tes</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmitJenisTes)}>
          <CustomCard
            actions={
              <div className="flex justify-end">
                <div className="flex gap-4">
                  <Button
                    onClick={() => {
                      if (!isEditMode) {
                        form.reset({
                          kode: "",
                          jenis_tes: "",
                          nilai_minimal: 0,
                          nilai_maksimal: 0,
                        });

                        setIsAddData(!isAddData);
                        searchParam.set("page", "1");
                        setSearchParam(searchParam);
                      }
                    }}
                    type="button"
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
                  <TableHead className="text-center">Kode</TableHead>
                  <TableHead className="text-center">Jenis Tes</TableHead>
                  <TableHead className="text-center">Nilai Minimal</TableHead>
                  <TableHead className="text-center">Nilai Maksimal</TableHead>
                  <TableHead className="text-center">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-gray-200">
                {(isAddData || isEditMode) &&
                  Number(searchParam.get("page")) === 1 && (
                    <TableRow className="even:bg-gray-100">
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
                          name="jenis_tes"
                          required={false}
                        />
                      </TableCell>
                      <TableCell className="text-center">
                        <FormFieldInput
                          inputStyle="w-full"
                          position={true}
                          form={form}
                          type="number"
                          name="nilai_minimal"
                          required={false}
                        />
                      </TableCell>
                      <TableCell className="text-center">
                        <FormFieldInput
                          inputStyle="w-full"
                          position={true}
                          form={form}
                          type="number"
                          name="nilai_maksimal"
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
                    <TableCell className="text-center">{item.kode}</TableCell>
                    <TableCell className="text-center">
                      {item.jenis_tes}
                    </TableCell>
                    <TableCell className="text-center">
                      {item.nilai_minimal}
                    </TableCell>
                    <TableCell className="text-center">
                      {item.nilai_maksimal}
                    </TableCell>
                    <TableCell className="h-full">
                      <div className="flex justify-center items-center w-full h-full">
                        <Button
                          size="icon"
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
                            <FaRegTrashAlt className="text-red-500"/>
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
                // Jika sedang dalam mode edit, jangan ganti halaman
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

export default JenisTes;
