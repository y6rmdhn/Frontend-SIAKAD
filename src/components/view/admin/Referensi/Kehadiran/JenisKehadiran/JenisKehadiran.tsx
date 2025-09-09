import CustomCard from "@/components/blocks/Card";
import { ConfirmDialog } from "@/components/blocks/ConfirmDialog/ConfirmDialog";
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
import deleteReferensiServices from "@/services/admin.delete.referensi";
import adminServices from "@/services/admin.services";
import potsReferensiServices from "@/services/create.admin.referensi";
import putReferensiServices from "@/services/put.admin.referensi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { IoSaveOutline } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { RiResetLeftFill } from "react-icons/ri";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

interface jenisKehadiranItem {
  id: string;
  kode_jenis: string;
  nama_jenis: string;
  warna: string;
  // Add other properties as needed
}

// Define interface for the API response
interface jenisKehadiranResponse {
  data: jenisKehadiranItem[];
  links: any[]; // You might want to define a more specific type
  next_page_url: string | null;
  prev_page_url: string | null;
  last_page: number;
}

const jenisKehadiranSchema = z.object({
  id: z.number().optional(),
  kode_jenis: z.string().min(1, "Kode tidak boleh kosong"),
  nama_jenis: z.string().min(1, "Nama Jenis tidak boleh kosong"),
  warna: z.string().min(1, "Warna tidak boleh kosong"),
});

type jenisKehadiranFormvalue = z.infer<typeof jenisKehadiranSchema>;

const JenisKehadiran = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const queryClient = useQueryClient();
  const [isAddData, setIsAddData] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [editingItemId, setEditingItemId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(
    Number(searchParam.get("page") || 1)
  );

  const form = useForm({
    defaultValues: {
      id: 0,
      kode_jenis: "",
      nama_jenis: "",
      warna: "",
    } as jenisKehadiranFormvalue,
    resolver: zodResolver(jenisKehadiranSchema),
  });

  // get data
  const { data } = useQuery<jenisKehadiranResponse>({
    queryKey: ["jenis-kehadiran", searchParam.get("page")],
    queryFn: async () => {
      const response = await adminServices.getJenisKehadiran(
        searchParam.get("page")
      );

      return response.data.data;
    },
  });

  // tambah data
  const { mutate: postdata } = useMutation({
    mutationFn: (data: jenisKehadiranFormvalue) =>
      potsReferensiServices.jenisKehadiran(data),
    onSuccess: () => {
      form.reset();
      toast.success("Berhasil menambahkan data");
      setIsAddData(false);
      queryClient.invalidateQueries({ queryKey: ["jenis-kehadiran"] });
    },
  });

  // edit data
  const { mutate: putData } = useMutation({
    mutationFn: (data: jenisKehadiranFormvalue) =>
      putReferensiServices.jenisKehadiran(data.id!, data),
    onSuccess: () => {
      toast.success("Data berhasil diedit");

      setIsEditMode(false);
      setIsAddData(false);
      setEditingItemId(null);

      form.reset();

      queryClient.invalidateQueries({ queryKey: ["jenis-kehadiran"] });
    },
  });

  // hapus data
  const { mutate: deleteData } = useMutation({
    mutationFn: (id: number) =>
      deleteReferensiServices.deteleDataJenisKehadiran(id),
    onSuccess: () => {
      toast.success("Data berhasil dihapus");
      queryClient.invalidateQueries({ queryKey: ["jenis-kehadiran"] });

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

  const handleSubmitData = (values: jenisKehadiranFormvalue) => {
    if (isEditMode && editingItemId) {
      putData(values);
    } else {
      postdata(values);
    }
  };

  const handleEditItem = (item: jenisKehadiranItem) => {
    form.reset({
      id: item.id,
      kode_jenis: item.kode_jenis,
      nama_jenis: item.nama_jenis,
      warna: item.warna,
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
      <h1 className="text-lg sm:text-2xl font-normal">
        Daftar Jenis Kehadiran
      </h1>
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
                          id: 0,
                          kode_jenis: "",
                          nama_jenis: "",
                          warna: "",
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
            }
          >
            <Table className="mt-5 table-auto">
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead className="text-center text-xs sm:text-sm">
                    Kode
                  </TableHead>
                  <TableHead className="text-center text-xs sm:text-sm">
                    Jenis Kehadiran
                  </TableHead>
                  <TableHead className="text-center text-xs sm:text-sm">
                    Warna
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
                        name="kode_jenis"
                        required={false}
                      />
                    </TableCell>
                    <TableCell className="text-center text-xs sm:text-sm">
                      <FormFieldInput
                        inputStyle="w-full"
                        position={true}
                        form={form}
                        name="nama_jenis"
                        required={false}
                      />
                    </TableCell>
                    <TableCell className="text-center">
                      <FormFieldInput
                        inputStyle="w-full"
                        position={true}
                        form={form}
                        name="warna"
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
                {data?.data.map((item) => (
                  <TableRow key={item.id} className=" even:bg-gray-100">
                    <TableCell className="text-center text-xs sm:text-sm">
                      {item.kode_jenis}
                    </TableCell>
                    <TableCell className="text-center text-xs sm:text-sm">
                      {item.nama_jenis}
                    </TableCell>
                    <TableCell className="text-center text-xs sm:text-sm">
                      {item.warna}
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

export default JenisKehadiran;
