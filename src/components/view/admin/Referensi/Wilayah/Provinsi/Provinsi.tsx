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
import { FaRegTrashAlt } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import { Form } from "@/components/ui/form";
import { FaPlus } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
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


interface provinsiItem {
  id: string;
  kode: string;
  nama: string;
}

interface provinsiResponse {
  data: provinsiItem[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

const provinsiSchema = z.object({
  id: z.string().optional(),
  kode: z.string().min(1, "Kode tidak boleh kosong"),
  nama: z.string().min(1, "Nama tidak boleh kosong"),
});

type provinsiFormValue = z.infer<typeof provinsiSchema>;


const Provinsi = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const queryClient = useQueryClient();
  const [, setIsAddData] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const currentPage = Number(searchParam.get("page") || 1);

  const form = useForm({
    defaultValues: {
      kode: "",
      nama: ""
    },
    resolver: zodResolver(provinsiSchema),
  });

  const { data } = useQuery<provinsiResponse>({
    queryKey: ["provinsi", searchParam.get("page")],
    queryFn: async () => {
      const response = await adminServices.getProvinsi({ page: searchParam.get("page") || 1 });
      return response.data.data;
    }
  });

  const { mutate: putData } = useMutation({
    mutationFn: (data: provinsiFormValue) =>
      editingItemId
        ? putReferensiServices.provinsi(editingItemId, data)
        : potsReferensiServices.provinsi(data),
    onSuccess: () => {
      toast.success(editingItemId ? "Data berhasil diedit" : "Data berhasil ditambahkan");

      setIsEditMode(false);
      setIsAddData(false);
      setEditingItemId(null);

      form.reset();

      queryClient.invalidateQueries({ queryKey: ["provinsi"] });
    },
  });

  const { mutate: deleteData } = useMutation({
    mutationFn: (id: string) => deleteReferensiServices.deleteProvinsi(id),
    onSuccess: () => {
      toast.success("Data berhasil dihapus");
      queryClient.invalidateQueries({ queryKey: ["provinsi"] });
    },
  });

  const handleDelete = (id: string) => {
    deleteData(id);
  };

  const handleSubmitData = (values: provinsiFormValue) => {
    putData(values);
  };

  const handleEditItem = (item: provinsiItem) => {
    form.reset({
      id: item.id,
      kode: item.kode,
      nama: item.nama,
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

  return (
    <div className="mt-10 mb-20">
      <Title title="Provinsi" subTitle="Daftar Provinsi" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmitData)}>
          <CustomCard
            actions={
              <div className="w-full flex flex-col md:flex-row md:gap-2 gap-4 lg:gap-4 justify-between mt-6">
                <div className="w-full flex flex-col md:flex-row md:gap-2 gap-4 lg:gap-4">
                  <SelectFilter options={unitKerjaOptions} classname="lg:w-32" />
                  <SearchInput className="w-full lg:w-80" />
                </div>

                <div className="w-full flex gap-3 justify-end">
                  <Button
                    type="button"
                    onClick={() => {
                      form.reset({ kode: "", nama: "" });
                      setIsEditMode(true);
                      setEditingItemId(null);
                      setIsAddData(true);
                      if (Number(searchParam.get("page")) !== 1) {
                        searchParam.set("page", "1");
                        setSearchParam(searchParam);
                      }
                    }}
                    className="cursor-pointer bg-green-light-uika hover:bg-hover-green-uika w-full md:w-auto text-xs sm:text-sm"
                  >
                    <FaPlus /> Tambah
                  </Button>
                </div>
              </div>
            }
          >
            <Table className="table-auto">
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead className="text-center text-xs sm:text-sm">Kode</TableHead>
                  <TableHead className="text-center text-xs sm:text-sm">Nama Provinsi</TableHead>
                  <TableHead className="text-center text-xs sm:text-sm">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-gray-200">
                {isEditMode && currentPage == 1 && (
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
                        name="nama"
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
                          <RiResetLeftFill className="w-5! h-5!" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
                {data?.data?.map((item) => (
                  <TableRow key={item.id} className=" even:bg-gray-100">
                    <TableCell className="text-center text-xs sm:text-sm">
                      {item.kode}
                    </TableCell>
                    <TableCell className="text-center text-xs sm:text-sm">
                      {item.nama}
                    </TableCell>
                    <TableCell className="h-full">
                      <div className="flex justify-center items-center w-full h-full">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="cursor-pointer"
                          onClick={() => handleEditItem(item)}
                        >
                          <MdEdit className="w-6! h-6! text-blue-uika" />
                        </Button>
                        <Button
                          size="icon"
                          type="button"
                          variant="ghost"
                          className="cursor-pointer"
                          onClick={() => handleDelete(item.id)}
                        >
                          <FaRegTrashAlt className="text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
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

export default Provinsi;
