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
import { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import adminServices from "@/services/admin.services";
import { FaCheck } from "react-icons/fa6";
import { IoClose, IoSaveOutline } from "react-icons/io5";
import CustomPagination from "@/components/blocks/CustomPagination";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IStatusKeaktifan } from "@/types/create.referensi";
import potsReferensiServices from "@/services/create.admin.referensi";
import { toast } from "sonner";
import { Form } from "@/components/ui/form";
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput";
import { RiResetLeftFill } from "react-icons/ri";
import putReferensiServices from "@/services/put.admin.referensi.ts";
import deleteReferensiServices from "@/services/admin.delete.referensi.ts";
import { ConfirmDialog } from "@/components/blocks/ConfirmDialog/ConfirmDialog.tsx";

// Define interface for the data item
interface StatusKeaktifanItem {
  id: string;
  kode: string;
  nama_status_aktif: string;
  status_keluar: boolean;
  // Add other properties as needed
}

// Define interface for the API response
interface StatusKeaktifanResponse {
  data: StatusKeaktifanItem[];
  links: any[]; // You might want to define a more specific type
  next_page_url: string | null;
  prev_page_url: string | null;
  last_page: number;
}

const statusKeaktifanSchema = z.object({
  id: z.string().optional(),
  kode: z.string().min(1, "Kode tidak boleh kosong"),
  nama_status_aktif: z.string().min(1, "Nama status aktif tidak boleh kosong"),
  status_keluar: z.boolean(),
});

type statusKeaktifanFormvalue = z.infer<typeof statusKeaktifanSchema>;

const StatusKeaktifan = () => {
  const form = useForm({
    defaultValues: {
      kode: "",
      nama_status_aktif: "",
      status_keluar: false,
    },
    resolver: zodResolver(statusKeaktifanSchema),
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
  const { data } = useQuery<StatusKeaktifanResponse>({
    queryKey: ["status-keaktifan", searchParam.get("page")],
    queryFn: async () => {
      const statusKeaktifanResponse = await adminServices.getStatusAktif(
        searchParam.get("page")
      );

      return statusKeaktifanResponse.data.data;
    },
  });

  // tambah
  const { mutate: postStatusAktif } = useMutation({
    mutationFn: (data: IStatusKeaktifan) =>
      potsReferensiServices.statusKeaktifan(data),
    onSuccess: () => {
      form.reset();
      toast.success("Data berhasil ditambahkan");
      setIsAddData(false);
      queryClient.invalidateQueries({ queryKey: ["status-keaktifan"] });
    },
  });

  // edit
  const { mutate: putStatusAktif } = useMutation({
    mutationFn: (data: statusKeaktifanFormvalue) =>
      putReferensiServices.statusAktif(data.id!, data),
    onSuccess: () => {
      form.reset();
      toast.success("Data berhasil diedit");
      setIsAddData(false);
      setIsEditMode(false);

      queryClient.invalidateQueries({ queryKey: ["status-keaktifan"] });
    },
  });

  // hapus data
  const { mutate: deleteStatusAktif } = useMutation({
    mutationFn: (id: string) => deleteReferensiServices.deteleStatusAktif(id),
    onSuccess: () => {
      toast.success("Data berhasil dihapus");
      queryClient.invalidateQueries({ queryKey: ["status-keaktifan"] });

      if (editingItemId) {
        form.reset();
        setEditingItemId(null);
        setIsEditMode(false);
        setIsAddData(false);
      }
    },
  });

  const handleDelete = (id: string) => {
    deleteStatusAktif(id);
  };

  const handleSubmitKeaktifan: SubmitHandler<statusKeaktifanFormvalue> = (
    values
  ) => {
    if (isEditMode && editingItemId) {
      putStatusAktif(values);
    } else {
      postStatusAktif(values);
    }
  };

  const handleEditItem = (item: StatusKeaktifanItem) => {
    form.reset({
      id: item.id,
      kode: item.kode,
      nama_status_aktif: item.nama_status_aktif,
      status_keluar: item.status_keluar,
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
      <Title title="Status Keaktifan" subTitle="Daftar Status Aktif" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmitKeaktifan)}>
          <CustomCard
            actions={
              <div className="flex justify-end gap-3">
                <Button
                  type="button"
                  onClick={() => {
                    if (!isEditMode) {
                      form.reset({
                        kode: "",
                        nama_status_aktif: "",
                        status_keluar: false,
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
                  <FaPlus /> Tambah
                </Button>
              </div>
            }
          >
            <Table className="table-auto">
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead className="text-center text-xs sm:text-sm">
                    Kode
                  </TableHead>
                  <TableHead className="text-center text-xs sm:text-sm">
                    Nama Status Aktif
                  </TableHead>
                  <TableHead className="text-center text-xs sm:text-sm">
                    Status Keluar
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
                        name="nama_status_aktif"
                        required={false}
                      />
                    </TableCell>
                    <TableCell className="text-center text-xs sm:text-sm">
                      <FormFieldInput
                        inputStyle="w-full"
                        position={true}
                        form={form}
                        type="checkbox"
                        name="status_keluar"
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
                      {item.nama_status_aktif}
                    </TableCell>
                    <TableCell className="flex text-center justify-center items-center w-full h-full">
                      {item.status_keluar ? (
                        <FaCheck className="text-green-500 w-4 h-4 mt-2" />
                      ) : (
                        <IoClose className="text-red-500 w-5 h-5 mt-2" />
                      )}
                    </TableCell>
                    <TableCell className="h-full">
                      <div className="flex text-center justify-center items-center w-full h-full">
                        <Button
                          size="icon"
                          type="button"
                          variant="ghost"
                          onClick={() => handleEditItem(item)}
                          disabled={isEditMode && editingItemId !== item.id}
                          className="cursor-pointer"
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

export default StatusKeaktifan;
