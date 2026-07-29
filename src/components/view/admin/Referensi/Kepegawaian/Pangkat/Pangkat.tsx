import CustomCard from "@/components/blocks/Card";
import SearchInput from "@/components/blocks/SearchInput";
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
import { useCallback, useEffect, useState } from "react";
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput.tsx";
import { IoSaveOutline } from "react-icons/io5";
import { RiResetLeftFill } from "react-icons/ri";
import putReferensiServices from "@/services/put.admin.referensi.ts";
import deleteReferensiServices from "@/services/admin.delete.referensi.ts";
import { ConfirmDialog } from "@/components/blocks/ConfirmDialog/ConfirmDialog.tsx";
import { useDebounce } from "use-debounce";

const formatNumber = (val: number | string | undefined | null): string => {
  if (val === undefined || val === null || val === "") return "0";
  const num = typeof val === "number" ? val : parseFloat(String(val)) || 0;
  return new Intl.NumberFormat("en-US").format(num);
};

interface pangkatItem {
  id: string;
  kode: string;
  nama: string;
  tunjangan: number | string;
  potongan: number | string;
}

interface pangkatResponse {
  items: pangkatItem[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

const pangkatSchema = z.object({
  id: z.string().optional(),
  kode: z.string().min(1, "Kode tidak boleh kosong"),
  nama: z.string().min(1, "Nama Golongan tidak boleh kosong"),
  tunjangan: z.coerce.number().min(0, "Tunjangan tidak boleh negatif"),
  potongan: z.coerce.number().min(0, "Potongan tidak boleh negatif"),
});

type pangkatFormvalue = z.infer<typeof pangkatSchema>;

const Pangkat = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const [searchData, setSearchData] = useState(searchParam.get("search") || "");
  const [debouncedInput] = useDebounce(searchData, 500);

  const queryClient = useQueryClient();
  const [isAddData, setIsAddData] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);

  const currentPage = Number(searchParam.get("page") || 1);
  const currentSearch = searchParam.get("search") || "";

  const form = useForm<pangkatFormvalue>({
    defaultValues: {
      id: "",
      kode: "",
      nama: "",
      tunjangan: 0,
      potongan: 0,
    },
    resolver: zodResolver(pangkatSchema),
  });

  // get data
  const { data, isLoading } = useQuery<pangkatResponse>({
    queryKey: ["pangkat-referensi", currentPage, currentSearch],
    queryFn: async () => {
      const response = await adminServices.getMasterPangkatReferensi({
        page: currentPage,
        search: currentSearch,
      });
      return response.data.data;
    },
  });

  const items = data?.items ?? [];
  const pagination = data?.pagination;

  // tambah data
  const { mutate: postPangkat } = useMutation({
    mutationFn: (data: pangkatFormvalue) => {
      const { id, ...createData } = data;
      return potsReferensiServices.pangkat(createData);
    },
    onSuccess: () => {
      form.reset();
      toast.success("Berhasil menambahkan data");
      setIsAddData(false);
      queryClient.invalidateQueries({ queryKey: ["pangkat-referensi"] });
    },
    onError: (error: any) => {
      const msg = error.response?.data?.message || error.message || "Gagal menambah data";
      toast.error(msg);
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
      queryClient.invalidateQueries({ queryKey: ["pangkat-referensi"] });
    },
    onError: (error: any) => {
      const msg = error.response?.data?.message || error.message || "Gagal mengedit data";
      toast.error(msg);
    },
  });

  // hapus data
  const { mutate: deletePangkat } = useMutation({
    mutationFn: (id: string) => deleteReferensiServices.deteleMasterPangkat(id),
    onSuccess: () => {
      toast.success("Data berhasil dihapus");
      queryClient.invalidateQueries({ queryKey: ["pangkat-referensi"] });

      if (editingItemId) {
        form.reset();
        setEditingItemId(null);
        setIsEditMode(false);
        setIsAddData(false);
      }
    },
    onError: (error: any) => {
      const msg = error.response?.data?.message || error.message || "Gagal menghapus data";
      toast.error(msg);
    },
  });

  const handleDelete = (id: string) => {
    deletePangkat(id);
  };

  const handlePangkatSubmit = (values: pangkatFormvalue) => {
    if (isEditMode && editingItemId) {
      putPangkat(values);
    } else {
      postPangkat(values);
    }
  };

  const handleEditItem = (item: pangkatItem) => {
    form.reset({
      id: item.id,
      kode: item.kode,
      nama: item.nama,
      tunjangan: Number(item.tunjangan) || 0,
      potongan: Number(item.potongan) || 0,
    });

    setIsEditMode(true);
    setEditingItemId(item.id);
    setIsAddData(true);
  };

  const handleCancel = () => {
    form.reset();
    setIsEditMode(false);
    setEditingItemId(null);
    setIsAddData(false);
  };

  const handlePageChange = useCallback(
    (page: number) => {
      if (isEditMode) {
        toast.warning("Selesaikan edit data terlebih dahulu");
        return;
      }
      const next = new URLSearchParams(searchParam);
      next.set("page", String(page));
      setSearchParam(next);
    },
    [isEditMode, searchParam, setSearchParam],
  );

  useEffect(() => {
    const activeSearch = searchParam.get("search") || "";
    if (debouncedInput !== activeSearch) {
      const next = new URLSearchParams(searchParam);
      if (debouncedInput) {
        next.set("search", debouncedInput);
      } else {
        next.delete("search");
      }
      next.set("page", "1");
      setSearchParam(next);
    }
  }, [debouncedInput, searchParam, setSearchParam]);

  return (
    <div className="mt-10 mb-20">
      <Title title="Pangkat/Golongan" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handlePangkatSubmit)}>
          <CustomCard
            actions={
              <div className="w-full flex flex-col md:flex-row md:gap-2 gap-4 lg:gap-4 justify-between mt-6">
                <div className="w-full flex flex-col md:flex-row md:gap-2 gap-4 lg:gap-4">
                  <SearchInput
                    value={searchData}
                    onChange={(e) => setSearchData(e.target.value)}
                    placeholder="Cari data..."
                  />
                </div>

                <div className="w-full flex gap-3 justify-end">
                  <Button
                    type="button"
                    onClick={() => {
                      if (!isEditMode) {
                        form.reset({
                          id: "",
                          kode: "",
                          nama: "",
                          tunjangan: 0,
                          potongan: 0,
                        });
                        setIsAddData(true);
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
                    Kode
                  </TableHead>
                  <TableHead className="text-center text-xs sm:text-sm">
                    Pangkat / Golongan
                  </TableHead>
                  <TableHead className="text-center text-xs sm:text-sm">
                    Detail Tunjangan
                  </TableHead>
                  <TableHead className="text-center text-xs sm:text-sm">
                    Potongan
                  </TableHead>
                  <TableHead className="text-center text-xs sm:text-sm">
                    Aksi
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-gray-200">
                {(isAddData || isEditMode) && currentPage === 1 && (
                  <TableRow className="even:bg-gray-100">
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
                        name="nama"
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
                        type="number"
                      />
                      <span className="text-[10px] text-gray-500 block mt-1">
                        Rp {formatNumber(form.watch("tunjangan"))}
                      </span>
                    </TableCell>
                    <TableCell className="text-center text-xs sm:text-sm">
                      <FormFieldInput
                        inputStyle="w-full"
                        position={true}
                        form={form}
                        name="potongan"
                        required={false}
                        type="number"
                      />
                      <span className="text-[10px] text-gray-500 block mt-1">
                        Rp {formatNumber(form.watch("potongan"))}
                      </span>
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
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      Memuat data...
                    </TableCell>
                  </TableRow>
                ) : items.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                      Tidak ada data
                    </TableCell>
                  </TableRow>
                ) : (
                  items.map((item, index) => (
                    <TableRow key={item.id || index} className="even:bg-gray-100">
                      <TableCell className="text-center text-xs sm:text-sm">
                        {item.kode || "-"}
                      </TableCell>
                      <TableCell className="text-center text-xs sm:text-sm">
                        {item.nama || "-"}
                      </TableCell>
                      <TableCell className="text-center text-xs sm:text-sm">
                        {formatNumber(item.tunjangan)}
                      </TableCell>
                      <TableCell className="text-center text-xs sm:text-sm">
                        {formatNumber(item.potongan)}
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
                  ))
                )}
              </TableBody>
            </Table>

            <CustomPagination
              pagination={pagination}
              onPageChange={handlePageChange}
            />
          </CustomCard>
        </form>
      </Form>
    </div>
  );
};

export default Pangkat;
