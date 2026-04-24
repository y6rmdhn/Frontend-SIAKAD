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
import { FaRegTrashAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { useSearchParams } from "react-router-dom";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import adminServices from "@/services/admin.services";
import putReferensiServices from "@/services/put.admin.referensi";
import potsReferensiServices from "@/services/create.admin.referensi";
import deleteReferensiServices from "@/services/admin.delete.referensi";
import { toast } from "sonner";
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput";
import { IoSaveOutline } from "react-icons/io5";
import { RiResetLeftFill } from "react-icons/ri";
import CustomPagination from "@/components/blocks/CustomPagination";
import { useDebounce } from "use-debounce";
import React from "react";

interface negaraItem {
  id: string;
  kode: string;
  kode_emis: string;
  nama: string;
}

interface negaraResponse {
  data: negaraItem[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

const negaraSchema = z.object({
  id: z.string().optional(),
  kode: z.string().min(1, "Kode tidak boleh kosong"),
  kode_emis: z.string().min(1, "Kode Emis tidak boleh kosong"),
  nama: z.string().min(1, "Nama tidak boleh kosong"),
});

type negaraFormValue = z.infer<typeof negaraSchema>;

const Negara = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const queryClient = useQueryClient();
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);

  const currentPage = Number(searchParam.get("page") || 1);
  const searchQuery = searchParam.get("search") || "";

  const [searchValue, setSearchValue] = useState(searchQuery);
  const [debouncedSearch] = useDebounce(searchValue, 500);

  const form = useForm({
    defaultValues: {
      kode: "",
      kode_emis: "",
      nama: "",
    },
    resolver: zodResolver(negaraSchema),
  });

  const { data, isLoading } = useQuery<negaraResponse>({
    queryKey: ["negara", currentPage, debouncedSearch],
    queryFn: async () => {
      const params: any = { page: currentPage };
      if (debouncedSearch) {
        params.search = debouncedSearch;
      }
      const response = await adminServices.getWilayahNegara(params);
      return response.data.data;
    },
  });

  const { mutate: putData } = useMutation({
    mutationFn: (data: negaraFormValue) =>
      editingItemId
        ? putReferensiServices.wilayahNegara(editingItemId, data)
        : potsReferensiServices.wilayahNegara(data),
    onSuccess: () => {
      toast.success(editingItemId ? "Data berhasil diedit" : "Data berhasil ditambahkan");
      setIsEditMode(false);
      setEditingItemId(null);
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["negara"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Terjadi kesalahan!");
    }
  });

  const { mutate: deleteData } = useMutation({
    mutationFn: (id: string) => deleteReferensiServices.deleteWilayahNegara(id),
    onSuccess: () => {
      toast.success("Data berhasil dihapus");
      queryClient.invalidateQueries({ queryKey: ["negara"] });
    },
  });

  const handleDelete = (id: string) => {
    deleteData(id);
  };

  const handleSubmitData = (values: negaraFormValue) => {
    putData(values);
  };

  const handleEditItem = (item: negaraItem) => {
    form.reset({
      id: item.id,
      kode: item.kode,
      kode_emis: item.kode_emis,
      nama: item.nama,
    });

    setIsEditMode(true);
    setEditingItemId(item.id);

    if (currentPage !== 1) {
      searchParam.set("page", "1");
      setSearchParam(searchParam);
    }
  };

  const handleCancel = () => {
    form.reset();
    setIsEditMode(false);
    setEditingItemId(null);
  };

  React.useEffect(() => {
    if (debouncedSearch !== searchQuery) {
      if (debouncedSearch) {
        searchParam.set("search", debouncedSearch);
      } else {
        searchParam.delete("search");
      }
      searchParam.set("page", "1");
      setSearchParam(searchParam);
    }
  }, [debouncedSearch, searchParam, searchQuery, setSearchParam]);

  return (
    <div className="mt-10 mb-20">
      <Title title="Wilayah Negara" subTitle="Daftar Negara" />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmitData)}>
          <CustomCard>
            <div className="w-full flex flex-col md:flex-row md:gap-2 gap-4 lg:gap-4 justify-between mt-6">
              <div className="w-full flex flex-col md:flex-row md:gap-2 gap-4 lg:gap-4">
                <SearchInput
                  className="w-full lg:w-80"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Cari referensi negara..."
                />
              </div>

              <div className="w-full flex gap-3 justify-end">
                <Button
                  type="button"
                  onClick={() => {
                    form.reset({ kode: "", kode_emis: "", nama: "" });
                    setIsEditMode(true);
                    setEditingItemId(null);
                    if (currentPage !== 1) {
                      searchParam.set("page", "1");
                      setSearchParam(searchParam);
                    }
                  }}
                  className="cursor-pointer bg-green-light-uika hover:bg-hover-green-uika w-full md:w-auto text-xs sm:text-sm"
                >
                  <FaPlus className="mr-2" /> Tambah
                </Button>
              </div>
            </div>

            <Table className="mt-10 table-auto">
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead className="text-center text-xs sm:text-sm">Kode</TableHead>
                  <TableHead className="text-center text-xs sm:text-sm">Nama Negara</TableHead>
                  <TableHead className="text-center text-xs sm:text-sm">Kode Emis</TableHead>
                  <TableHead className="text-center text-xs sm:text-sm">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-gray-200">
                {isEditMode && currentPage === 1 && (
                  <TableRow className="even:bg-gray-100">
                    <TableCell className="text-center text-xs sm:text-sm">
                      <FormFieldInput
                        inputStyle="w-full text-center"
                        position={true}
                        form={form}
                        name="kode"
                        placeholder="ID"
                        required={false}
                      />
                    </TableCell>
                    <TableCell className="text-center text-xs sm:text-sm">
                      <FormFieldInput
                        inputStyle="w-full"
                        position={true}
                        form={form}
                        name="nama"
                        placeholder="Indonesia"
                        required={false}
                      />
                    </TableCell>
                    <TableCell className="text-center text-xs sm:text-sm">
                      <FormFieldInput
                        inputStyle="w-full text-center"
                        position={true}
                        form={form}
                        name="kode_emis"
                        placeholder="IDN"
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
                          <IoSaveOutline className="w-5! h-5! text-green-600" />
                        </Button>
                        <Button
                          size="icon"
                          type="button"
                          variant="ghost"
                          className="cursor-pointer"
                          onClick={handleCancel}
                        >
                          <RiResetLeftFill className="w-5! h-5! text-gray-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-10">Memuat data...</TableCell>
                  </TableRow>
                ) : data?.data?.length === 0 && !isEditMode ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-10">Tidak ada data referensi negara.</TableCell>
                  </TableRow>
                ) : (
                  data?.data?.map((item) => (
                    <TableRow key={item.id} className="even:bg-gray-100">
                      <TableCell className="text-center text-xs sm:text-sm">
                        {item.kode}
                      </TableCell>
                      <TableCell className="text-center text-xs sm:text-sm">
                        {item.nama}
                      </TableCell>
                      <TableCell className="text-center text-xs sm:text-sm">
                        {item.kode_emis}
                      </TableCell>
                      <TableCell className="h-full">
                        <div className="flex justify-center items-center w-full h-full">
                          <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            className="cursor-pointer"
                            onClick={() => handleEditItem(item)}
                          >
                            <MdEdit className="w-6! h-6! text-blue-uika" />
                          </Button>
                          <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            className="cursor-pointer"
                            onClick={() => handleDelete(item.id)}
                          >
                            <FaRegTrashAlt className="text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>

            <CustomPagination
              currentPage={currentPage}
              onPageChange={(page) => {
                searchParam.set("page", page.toString());
                setSearchParam(searchParam);
              }}
              hasNextPage={data?.pagination?.hasNextPage}
              hasPrevPage={data?.pagination?.hasPrevPage}
              totalPages={data?.pagination?.totalPages}
            />
          </CustomCard>
        </form>
      </Form>
    </div>
  );
};

export default Negara;
