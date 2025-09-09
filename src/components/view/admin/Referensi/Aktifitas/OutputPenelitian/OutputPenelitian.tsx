// Import
import CustomCard from "@/components/blocks/Card";
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
import potsReferensiServices from "@/services/create.admin.referensi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { IOutputPenelitianPost } from "@/types/create.referensi";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput";
import { IoSaveOutline } from "react-icons/io5";
import { RiResetLeftFill } from "react-icons/ri";
import putReferensiServices from "@/services/put.admin.referensi";
import deleteReferensiServices from "@/services/admin.delete.referensi.ts";
import {ConfirmDialog} from "@/components/blocks/ConfirmDialog/ConfirmDialog.tsx";

// Zod Schema
const outputPenelitianSchema = z.object({
  id: z.number().optional(),
  kode: z.string().min(1, "Kode tidak boleh kosong"),
  output_penelitian: z.string().min(1, "Output penelitian tidak boleh kosong"),
});

type OutputPenelitianFormValues = z.infer<typeof outputPenelitianSchema>;

// Tipe untuk item dan response
interface OutputPenelitianItem {
  id: string;
  kode: string;
  output_penelitian: string;
}

interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

interface OutputPenelitianResponse {
  data: OutputPenelitianItem[];
  links: PaginationLink[];
  next_page_url: string | null;
  prev_page_url: string | null;
  last_page: number;
}

// Komponen utama
const OutputPenelitian = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const [isAddData, setIsAddData] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [editingItemId, setEditingItemId] = useState<number | null>(null);
  const queryClient = useQueryClient();

  const form = useForm<OutputPenelitianFormValues>({
    defaultValues: {
      kode: "",
      output_penelitian: "",
    },
    resolver: zodResolver(outputPenelitianSchema),
  });

  const currentPage = Number(searchParam.get("page")) || 1;

  // get data
  const { data } = useQuery<OutputPenelitianResponse>({
    queryKey: ["output-penelitian", currentPage],
    queryFn: async () => {
      const response = await adminServices.getOutputPenelitian(currentPage);
      return response.data.data;
    },
  });

  // tambah data
  const { mutate: postOutputPenelitian } = useMutation({
    mutationFn: (data: IOutputPenelitianPost) =>
      potsReferensiServices.outputPenelitian(data),
    onSuccess: () => {
      form.reset();
      toast.success("Data berhasil ditambahkan");
      setIsAddData(false);
      queryClient.invalidateQueries({ queryKey: ["output-penelitian"] });
    },
  });

  // edit data
  const { mutate: putOutputPenelitian } = useMutation({
    mutationFn: (data: OutputPenelitianFormValues) =>
      putReferensiServices.outputPenelitian(data.id!, data),
    onSuccess: () => {
      form.reset();
      toast.success("Data berhasil diedit");
      setIsAddData(false);
      setIsEditMode(false);

      queryClient.invalidateQueries({ queryKey: ["output-penelitian"] });
    },
  });

  // hapus data
  const {mutate: deleteOutputPenelitian} = useMutation({
    mutationFn: (id: number) => deleteReferensiServices.deteleOutputPenelitian(id),
    onSuccess: () => {
      toast.success("Data berhasil dihapus");
      queryClient.invalidateQueries({ queryKey: ["output-penelitian"] });

      if (editingItemId) {
        form.reset();
        setEditingItemId(null);
        setIsEditMode(false);
        setIsAddData(false);
      }
    }
  })

  const handleDelete = (id: number) => {
    deleteOutputPenelitian(id)
  };

  const handleSubmitOutputPenelitian = (values: OutputPenelitianFormValues) => {
    if (isEditMode && editingItemId) {
      putOutputPenelitian(values);
    } else {
      postOutputPenelitian(values as IOutputPenelitianPost);
    }
  };

  const handleEditItem = (item: OutputPenelitianItem) => {
    form.reset({
      id: item.id,
      kode: item.kode,
      output_penelitian: item.output_penelitian,
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
    if (!searchParam.get("page") || isNaN(currentPage)) {
      searchParam.set("page", "1");
      setSearchParam(searchParam);
    }
  }, [searchParam, setSearchParam]);

  useEffect(() => {
    if (currentPage < 1) {
      searchParam.set("page", "1");
      setSearchParam(searchParam);
    }
  }, [currentPage, searchParam, setSearchParam]);

  useEffect(() => {
    if (data?.last_page && currentPage > data.last_page && data.last_page > 0) {
      searchParam.set("page", data.last_page.toString());
      setSearchParam(searchParam);
    }
  }, [data, currentPage, searchParam, setSearchParam]);

  return (
    <div className="mt-10 mb-20">
      <h1 className="text-lg sm:text-2xl font-normal">Daftar Output Penelitian</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmitOutputPenelitian)}>
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
                          output_penelitian: "",
                        });

                        setIsAddData(!isAddData);
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
                  <TableHead className="text-center text-xs sm:text-sm">Kode</TableHead>
                  <TableHead className="text-center text-xs sm:text-sm">Output</TableHead>
                  <TableHead className="text-center text-xs sm:text-sm">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-gray-200">
                {(isAddData || isEditMode) && currentPage === 1 && (
                  <TableRow className="even:bg-gray-100">
                    <TableCell className="text-center text-xs sm:text-sm">
                      <FormFieldInput
                        inputStyle="w-full"
                        position
                        form={form}
                        name="kode"
                      />
                    </TableCell>
                    <TableCell className="text-center text-xs sm:text-sm">
                      <FormFieldInput
                        inputStyle="w-full"
                        position
                        form={form}
                        name="output_penelitian"
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
                  <TableRow key={index} className="even:bg-gray-100">
                    <TableCell className="text-center text-xs sm:text-sm">{item.kode}</TableCell>
                    <TableCell className="text-center text-xs sm:text-sm">
                      {item.output_penelitian}
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
              currentPage={currentPage}
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
              totalPages={data?.last_page || 1}
            />
          </CustomCard>
        </form>
      </Form>
    </div>
  );
};

export default OutputPenelitian;
