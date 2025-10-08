import CustomCard from "@/components/blocks/Card";
import SearchInput from "@/components/blocks/SearchInput";
import SelectFilter from "@/components/blocks/SelectFilter";
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
import unitKerjaOptions from "@/constant/dummyFilter";
import { Form } from "@/components/ui/form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { useSearchParams } from "react-router-dom";
import CustomPagination from "@/components/blocks/CustomPagination";
import adminServices from "@/services/admin.services.ts";
import potsReferensiServices from "@/services/create.admin.referensi.ts";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput.tsx";
import { IoSaveOutline } from "react-icons/io5";
import { RiResetLeftFill } from "react-icons/ri";
import putReferensiServices from "@/services/put.admin.referensi.ts";
import deleteReferensiServices from "@/services/admin.delete.referensi.ts";
import { ConfirmDialog } from "@/components/blocks/ConfirmDialog/ConfirmDialog.tsx";

// Define interface for the data item
interface pangkatItem {
  id: string; // ✅ DIUBAH: number -> string
  pangkat: string;
  nama_golongan: string;
  tunjangan: string;
}

// Define interface for the API response
interface pangkatResponse {
  data: pangkatItem[];
  links: any[];
  next_page_url: string | null;
  prev_page_url: string | null;
  last_page: number;
}

const pangkatSchema = z.object({
  id: z.string().optional(), // ✅ DIUBAH: number -> string
  pangkat: z.string().min(1, "Pangkat tidak boleh kosong"),
  nama_golongan: z.string().min(1, "Nama Golongan tidak boleh kosong"),
  tunjangan: z.string().min(1, "Tunjangan tidak boleh kosong"),
});

type pangkatFormvalue = z.infer<typeof pangkatSchema>;

const Pangkat = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const queryClient = useQueryClient();
  const [isAddData, setIsAddData] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null); // ✅ DIUBAH: number -> string
  const [currentPage, setCurrentPage] = useState<number>(
    Number(searchParam.get("page") || 1)
  );

  const form = useForm<pangkatFormvalue>({
    defaultValues: {
      id: "", // ✅ DIUBAH: 0 -> string kosong
      pangkat: "",
      nama_golongan: "",
      tunjangan: "",
    },
    resolver: zodResolver(pangkatSchema),
  });

  // get data
  const { data } = useQuery<pangkatResponse>({
    queryKey: ["pangkat", searchParam.get("page")],
    queryFn: async () => {
      const response = await adminServices.getMasterPangkatReferensi(
        searchParam.get("page")
      );
      console.log("📋 Data pangkat dari API:", response.data.data);
      return response.data.data;
    },
  });

  // tambah data
  const { mutate: postPangkat } = useMutation({
    mutationFn: (data: pangkatFormvalue) => {
      const { id, ...createData } = data; // Hapus id untuk create
      return potsReferensiServices.pangkat(createData);
    },
    onSuccess: () => {
      form.reset();
      toast.success("Berhasil menambahkan data");
      setIsAddData(false);
      queryClient.invalidateQueries({ queryKey: ["pangkat"] });
    },
    onError: (error) => {
      toast.error(`Gagal menambah data: ${error.message}`);
    },
  });

  // edit data
  const { mutate: putPangkat } = useMutation({
    mutationFn: (data: pangkatFormvalue) => {
      if (!data.id) {
        throw new Error("ID diperlukan untuk edit data");
      }
      return putReferensiServices.pangkat(data.id, data);
    },
    onSuccess: () => {
      toast.success("Data berhasil diedit");
      setIsEditMode(false);
      setIsAddData(false);
      setEditingItemId(null);
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["pangkat"] });
    },
    onError: (error) => {
      toast.error(`Gagal mengedit data: ${error.message}`);
    },
  });

  // hapus data
  const { mutate: deletePangkat } = useMutation({
    mutationFn: (
      id: string // ✅ DIUBAH: number -> string
    ) => deleteReferensiServices.deteleMasterPangkat(id),
    onSuccess: () => {
      toast.success("Data berhasil dihapus");
      queryClient.invalidateQueries({ queryKey: ["pangkat"] });

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
    deletePangkat(id);
  };

  const handlePangkatSubmit = (values: pangkatFormvalue) => {
    console.log("📤 Submit data:", values);
    if (isEditMode && editingItemId) {
      putPangkat(values);
    } else {
      postPangkat(values);
    }
  };

  const handleEditItem = (item: pangkatItem) => {
    console.log("📝 Edit item:", item);

    form.reset({
      id: item.id,
      pangkat: item.pangkat,
      nama_golongan: item.nama_golongan,
      tunjangan: item.tunjangan,
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
      <Title title="Pangkat/Golongan" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handlePangkatSubmit)}>
          <CustomCard
            actions={
              <div className="w-full flex flex-col md:flex-row md:gap-2 gap-4 lg:gap-4 justify-between mt-6">
                <div className="w-full flex flex-col md:flex-row md:gap-2 gap-4 lg:gap-4">
                  <SelectFilter
                    classname="w-full md:w-32"
                    options={unitKerjaOptions}
                  />
                  <SearchInput />
                </div>

                <div className="w-full flex gap-3 justify-end">
                  <Button
                    type="button"
                    onClick={() => {
                      if (!isEditMode) {
                        form.reset({
                          id: "", // ✅ DIUBAH: 0 -> string kosong
                          pangkat: "",
                          nama_golongan: "",
                          tunjangan: "",
                        });
                        setIsAddData(true);
                        searchParam.set("page", "1");
                        setSearchParam(searchParam);
                      }
                    }}
                    className={`cursor-pointer w-full md:w-auto text-xs sm:text-sm ${
                      isEditMode
                        ? "bg-gray-400"
                        : "bg-green-light-uika hover:bg-[#329C59]"
                    }`}
                    disabled={isEditMode}
                  >
                    <FaPlus /> Tambah
                  </Button>
                </div>
              </div>
            }
          >
            <Table className="mt-10 table-auto">
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead className="text-center text-xs sm:text-sm">
                    Pangkat
                  </TableHead>
                  <TableHead className="text-center text-xs sm:text-sm">
                    Golongan
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
                {(isAddData || isEditMode) && currentPage === 1 && (
                  <TableRow className=" even:bg-gray-100">
                    <TableCell className="text-center text-xs sm:text-sm">
                      <FormFieldInput
                        inputStyle="w-full"
                        position={true}
                        form={form}
                        name="pangkat"
                        required={false}
                      />
                    </TableCell>
                    <TableCell className="text-center text-xs sm:text-sm">
                      <FormFieldInput
                        inputStyle="w-full"
                        position={true}
                        form={form}
                        name="nama_golongan"
                        required={false}
                      />
                    </TableCell>
                    <TableCell className="text-center text-xs sm:text-sm">
                      <FormFieldInput
                        inputStyle="w-full"
                        position={true}
                        form={form}
                        name="tunjangan"
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
                      {item.pangkat}
                    </TableCell>
                    <TableCell className="text-center text-xs sm:text-sm">
                      {item.nama_golongan}
                    </TableCell>
                    <TableCell className="text-center text-xs sm:text-sm">
                      {item.tunjangan}
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

export default Pangkat;
