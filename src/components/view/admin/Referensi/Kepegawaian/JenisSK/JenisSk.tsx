import CustomCard from "@/components/blocks/Card";
import Title from "@/components/blocks/Title";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState, useCallback } from "react";
import { useDebounce } from "use-debounce";
import { FaRegTrashAlt } from "react-icons/fa";
import { Link, useSearchParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import adminServices from "@/services/admin.services";
import CustomPagination from "@/components/blocks/CustomPagination";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IJenisSk } from "@/types/create.referensi";
import potsReferensiServices from "@/services/create.admin.referensi";
import { toast } from "sonner";
import { Form } from "@/components/ui/form";
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput";
import { IoSaveOutline } from "react-icons/io5";
import { RiResetLeftFill } from "react-icons/ri";
import putReferensiServices from "@/services/put.admin.referensi.ts";
import deleteReferensiServices from "@/services/admin.delete.referensi.ts";
import { ConfirmDialog } from "@/components/blocks/ConfirmDialog/ConfirmDialog.tsx";

// Define interface for the data item
interface JenisSKItem {
  id: string;
  kode: string;
  jenis_sk: string;
  // Add other properties as needed
}

interface PaginatedData {
  items: HubunganKerjaItem[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}


// Define interface for the API response
interface JenisSKResponse {
  items: JenisSKItem[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

const jenisSkSchema = z.object({
  id: z.string().optional(),
  kode: z.string().min(1, "Kode tidak boleh kosong"),
  jenis_sk: z.string().min(1, "Jenis SK tidak boleh kosong"),
});

type jenisSkFormvalue = z.infer<typeof jenisSkSchema>;

const JenisSk = () => {
  const form = useForm({
    defaultValues: {
      kode: "",
      jenis_sk: "",
    },
    resolver: zodResolver(jenisSkSchema),
  });
  const [searchParam, setSearchParam] = useSearchParams();
  const [isAddData, setIsAddData] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(
    Number(searchParam.get("page") || 1)
  );
  const queryClient = useQueryClient();


  // get data
  const { data: rawData } = useQuery<JenisSKResponse>({
    queryKey: ["jenis-sk", searchParam.get("page")],
    queryFn: async () => {
      const response = await adminServices.getJenisSk({ is_dropdown: false });
      return response.data.data;
    },
  });

  const items = rawData?.items || [];
  const pagination = rawData?.pagination || {};

  // Memoize url change
  const handleUrlChange = useCallback((paramName: string, value: string) => {
    const next = new URLSearchParams(searchParam);
    if (value && value !== "semua") {
      next.set(paramName, value);
    } else {
      next.delete(paramName);
    }
    if (paramName !== "page") next.set("page", "1");
    setSearchParam(next);
  }, [searchParam, setSearchParam]);

  // tambah data
  const { mutate: postJenisSk } = useMutation({
    mutationFn: (data: IJenisSk) => potsReferensiServices.jenisSk(data),
    onSuccess: () => {
      form.reset();
      toast.success("Data berhasil ditambahkan");
      setIsAddData(false);

      queryClient.invalidateQueries({ queryKey: ["jenis-sk"] });
    },
  });

  // edit data
  const { mutate: putJenisSk } = useMutation({
    mutationFn: (data: jenisSkFormvalue) =>
      putReferensiServices.jenisSk(data.id!, data),
    onSuccess: () => {
      form.reset();
      toast.success("Data berhasil diedit");
      setIsAddData(false);
      setIsEditMode(false);

      queryClient.invalidateQueries({ queryKey: ["jenis-sk"] });
    },
  });

  // hapus data
  const { mutate: deleteJenisSk } = useMutation({
    mutationFn: (id: string) => deleteReferensiServices.deteleJenisSk(id),
    onSuccess: () => {
      toast.success("Data berhasil dihapus");
      queryClient.invalidateQueries({ queryKey: ["jenis-sk"] });

      if (editingItemId) {
        form.reset();
        setEditingItemId(null);
        setIsEditMode(false);
        setIsAddData(false);
      }
    },
  });

  const handleDelete = (id: string) => {
    deleteJenisSk(id);
  };

  const handleSubmitJenisSk: SubmitHandler<jenisSkFormvalue> = (values) => {
    if (isEditMode && editingItemId) {
      putJenisSk(values);
    } else {
      postJenisSk(values);
    }
  };

  const handleEditItem = (item: JenisSKItem) => {
    form.reset({
      id: item.id,
      kode: item.kode,
      jenis_sk: item.jenis_sk,
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
      rawData?.pagination.totalPages &&
      Number(searchParam.get("page")) > rawData.pagination.totalPages &&
      rawData.pagination.totalPages > 0
    ) {
      searchParam.set("page", rawData.pagination.totalPages.toString());
      setSearchParam(searchParam);
    }
  }, [searchParam, rawData, setSearchParam]);

  return (
    <div className="mt-10 mb-20">
      <Title title="Daftar Jenis SK" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmitJenisSk)}>
          <CustomCard
            actions={
              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  onClick={() => {
                    if (!isEditMode) {
                      form.reset({
                        kode: "",
                        jenis_sk: "",
                      });

                      searchParam.set("page", "1");
                      setSearchParam(searchParam);
                      setIsAddData(true);
                    }
                  }}
                  className={`cursor-pointer ${isEditMode
                    ? "bg-gray-400"
                    : "bg-green-light-uika hover:bg-[#329C59]"
                    }`}
                  disabled={isEditMode}
                >
                  <FaPlus /> Tambah
                </Button>
              </div>
            }
          >
            <Table className="mt-10 table-auto">
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead className="text-center text-xs sm:text-sm">
                    Kode
                  </TableHead>
                  <TableHead className="text-center text-xs sm:text-sm">
                    Jenis SK
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
                        name="kode"
                        required={false}
                      />
                    </TableCell>
                    <TableCell className="text-center text-xs sm:text-sm">
                      <FormFieldInput
                        inputStyle="w-full"
                        position={true}
                        form={form}
                        name="jenis_sk"
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
                {items.map((item) => (
                  <TableRow key={item.id} className=" even:bg-gray-100">
                    <TableCell className="text-center text-xs sm:text-sm">
                      {item.kode}
                    </TableCell>
                    <TableCell className="text-center text-xs sm:text-sm">
                      {item.jenis_sk}
                    </TableCell>
                    <TableCell className="h-full">
                      <div className="flex justify-center items-center w-full h-full">
                        <Link to="">
                          <Button
                            type={"button"}
                            size="icon"
                            variant="ghost"
                            className="cursor-pointer"
                            onClick={() => handleEditItem(item)}
                            disabled={isEditMode && editingItemId !== item.id}
                          >
                            <MdEdit className="w-5! h-5! text-[#26A1F4]" />
                          </Button>
                        </Link>
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

            {/* Pagination sesuai format baru */}
            <CustomPagination
              pagination={rawData?.pagination}
              onPageChange={(page) => handleUrlChange("page", String(page))}
            />

          </CustomCard>
        </form>
      </Form>
    </div>
  );
};

export default JenisSk;
