import CustomCard from "@/components/blocks/Card";
import Title from "@/components/blocks/Title";
import SearchInput from "@/components/blocks/SearchInput";
import SelectFilter from "@/components/blocks/SelectFilter";
import unitKerjaOptions from "@/constant/dummyFilter";
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
import potsReferensiServices from "@/services/create.admin.referensi";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ISuku } from "@/types/create.referensi";
import { IoSaveOutline } from "react-icons/io5";
import { RiResetLeftFill } from "react-icons/ri";
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput";
import putReferensiServices from "@/services/put.admin.referensi";
import deleteReferensiServices from "@/services/admin.delete.referensi";
import { ConfirmDialog } from "@/components/blocks/ConfirmDialog/ConfirmDialog";

interface sukuItem {
  id: string;
  nama_suku: string;
  // Add other properties as needed
}

// Define interface for the API response
interface sukuResponse {
  data: sukuItem[];
  links: any[]; // You might want to define a more specific type
  next_page_url: string | null;
  prev_page_url: string | null;
  last_page: number;
}

const sukuSchema = z.object({
  id: z.string().optional(),
  nama_suku: z.string().min(1, "Nama suku tidak boleh kosong"),
});

type sukuFormvalue = z.infer<typeof sukuSchema>;

const Suku = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const queryClient = useQueryClient();
  const [isAddData, setIsAddData] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(
    Number(searchParam.get("page") || 1)
  );

  const form = useForm({
    defaultValues: {
      nama_suku: "",
    },
    resolver: zodResolver(sukuSchema),
  });

  // get data
  const { data } = useQuery<sukuResponse>({
    queryKey: ["suku-all", searchParam.get("page")],
    queryFn: async () => {
      const response = await adminServices.getSukuAll(searchParam.get("page"));

      return response.data.data;
    },
  });

  // tambah data
  const { mutate: postData } = useMutation({
    mutationFn: (data: ISuku) => potsReferensiServices.suku(data),
    onSuccess: () => {
      form.reset();
      toast.success("Berhasil menambahkan data");
      setIsAddData(false);
      queryClient.invalidateQueries({ queryKey: ["suku-all"] });
    },
  });

  // edit data
  const { mutate: putData } = useMutation({
    mutationFn: (data: sukuFormvalue) =>
      putReferensiServices.sukuAll(data.id!, data),
    onSuccess: () => {
      toast.success("Data berhasil diedit");

      setIsEditMode(false);
      setIsAddData(false);
      setEditingItemId(null);

      form.reset();

      queryClient.invalidateQueries({ queryKey: ["suku-all"] });
    },
  });

  // hapus data
  const { mutate: deleteData } = useMutation({
    mutationFn: (id: string) => deleteReferensiServices.deteleDataSuku(id),
    onSuccess: () => {
      toast.success("Data berhasil dihapus");
      queryClient.invalidateQueries({ queryKey: ["suku-all"] });

      if (editingItemId) {
        form.reset();
        setEditingItemId(null);
        setIsEditMode(false);
        setIsAddData(false);
      }
    },
  });

  const handleDelete = (id: string) => {
    deleteData(id);
  };

  const handleSubmitData = (values: sukuFormvalue) => {
    if (isEditMode && editingItemId) {
      putData(values);
    } else {
      postData(values);
    }
  };

  const handleEditItem = (item: sukuItem) => {
    form.reset({
      id: item.id,
      nama_suku: item.nama_suku,
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
      <Title title="Suku" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmitData)}>
          <CustomCard
            actions={
              <div className="w-full flex flex-col md:flex-row md:gap-2 gap-4 lg:gap-4 justify-between mt-6">
                <div className="w-full flex flex-col md:flex-row md:gap-2 gap-4 lg:gap-4">
                  <div className="w-full md:w-32">
                    <SelectFilter options={unitKerjaOptions} />
                  </div>
                  <div>
                    <SearchInput className="w-full" />
                  </div>
                </div>

                <div className="w-full flex gap-3 justify-end">
                  <Button
                    type="button"
                    onClick={() => {
                      if (!isEditMode) {
                        form.reset({
                          id: "",
                          nama_suku: "",
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
                    Nama Suku
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
                        name="nama_suku"
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
                      {item.nama_suku}
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

export default Suku;
