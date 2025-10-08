import CustomCard from "@/components/blocks/Card";
import { ConfirmDialog } from "@/components/blocks/ConfirmDialog/ConfirmDialog";
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput";
import CustomPagination from "@/components/blocks/CustomPagination";
import SearchInput from "@/components/blocks/SearchInput";
import SelectFilter from "@/components/blocks/SelectFilter";
import Title from "@/components/blocks/Title";
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
import unitKerjaOptions from "@/constant/dummyFilter";
import deleteReferensiServices from "@/services/admin.delete.referensi";
import adminServices from "@/services/admin.services";
import potsReferensiServices from "@/services/create.admin.referensi";
import putReferensiServices from "@/services/put.admin.referensi";
import { IHubunganKerja } from "@/types/create.referensi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaCheck, FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { IoClose, IoSaveOutline } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { RiResetLeftFill } from "react-icons/ri";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

interface hubunganKerjaItem {
  id: string;
  kode: string;
  nama_hub_kerja: string;
  status_aktif: boolean;
  pns: boolean;
  // Add other properties as needed
}

// Define interface for the API response
interface hubunganKerjaResponse {
  data: hubunganKerjaItem[];
  links: any[]; // You might want to define a more specific type
  next_page_url: string | null;
  prev_page_url: string | null;
  last_page: number;
}

const hubunganKerjaSchema = z.object({
  id: z.string().optional(),
  kode: z.string().min(1, "kode tidak boleh kosong"),
  nama_hub_kerja: z.string().min(1, "Nama Hub Kerja tidak boleh kosong"),
  status_aktif: z.boolean(),
  pns: z.boolean(),
});

type hubunganKerjaFormvalue = z.infer<typeof hubunganKerjaSchema>;

const HubunganKerja = () => {
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
      kode: "",
      nama_hub_kerja: "",
      status_aktif: false,
      pns: false,
    },
    resolver: zodResolver(hubunganKerjaSchema),
  });

  // get data
  const { data } = useQuery<hubunganKerjaResponse>({
    queryKey: ["hubungan-kerja", searchParam.get("page")],
    queryFn: async () => {
      const response = await adminServices.getHubunganKerja(
        searchParam.get("page")
      );
      return response.data.data;
    },
  });

  // tambah data
  const { mutate: postData } = useMutation({
    mutationFn: (data: IHubunganKerja) =>
      potsReferensiServices.hubunganKerja(data),
    onSuccess: () => {
      form.reset();
      toast.success("Berhasil menambahkan data");
      setIsAddData(false);
      queryClient.invalidateQueries({ queryKey: ["hubungan-kerja"] });
    },
  });

  // edit data
  const { mutate: putData } = useMutation({
    mutationFn: (data: hubunganKerjaFormvalue) =>
      putReferensiServices.hubunganKerja(data.id!, data),
    onSuccess: () => {
      toast.success("Data berhasil diedit");

      setIsEditMode(false);
      setIsAddData(false);
      setEditingItemId(null);

      form.reset();

      queryClient.invalidateQueries({ queryKey: ["hubungan-kerja"] });
    },
  });

  // hapus data
  const { mutate: deleteData } = useMutation({
    mutationFn: (id: string) => deleteReferensiServices.deteleHubunganKerja(id),
    onSuccess: () => {
      toast.success("Data berhasil dihapus");
      queryClient.invalidateQueries({ queryKey: ["hubungan-kerja"] });

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

  const handleCancel = () => {
    form.reset();
    setIsEditMode(false);
    setEditingItemId(null);
    setIsAddData(false);
  };

  const handleSubmitData = (values: hubunganKerjaFormvalue) => {
    if (isEditMode && editingItemId) {
      putData(values);
    } else {
      postData(values);
    }
  };

  const handleEditItem = (item: hubunganKerjaItem) => {
    form.reset({
      id: item.id,
      kode: item.kode,
      nama_hub_kerja: item.nama_hub_kerja,
      status_aktif: item.status_aktif,
      pns: item.pns,
    });

    setIsEditMode(true);
    setEditingItemId(item.id);
    setIsAddData(true);

    if (Number(searchParam.get("page")) !== 1) {
      searchParam.set("page", "1");
      setSearchParam(searchParam);
    }
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
    <div className="mt-10">
      <Title title="Hubungan Kerja" />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmitData)}>
          <CustomCard
            actions={
              <div className="w-full flex flex-col md:flex-row md:gap-2 gap-4 lg:gap-4 justify-between mt-6">
                <div className="w-full flex flex-col md:flex-row md:gap-2 gap-4 lg:gap-4">
                  <SelectFilter
                    options={unitKerjaOptions}
                    classname="lg:w-32"
                  />
                  <SearchInput className="w-full lg:w-80" />
                </div>

                <div className="w-full flex gap-3 justify-end">
                  <Button
                    type="button"
                    onClick={() => {
                      if (!isEditMode) {
                        form.reset({
                          id: "",
                          kode: "",
                          nama_hub_kerja: "",
                          status_aktif: false,
                          pns: false,
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
            <Table className="mt-10 table-auto">
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead className="text-center text-xs sm:text-sm">
                    Kode
                  </TableHead>
                  <TableHead className="text-center text-xs sm:text-sm">
                    Nama Hubungan Kerja
                  </TableHead>
                  <TableHead className="text-center text-xs sm:text-sm">
                    Status Aktif
                  </TableHead>
                  <TableHead className="text-center text-xs sm:text-sm">
                    PNS
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
                        name="nama_hub_kerja"
                        required={false}
                      />
                    </TableCell>
                    <TableCell className="text-center">
                      <FormFieldInput
                        inputStyle="w-full"
                        position={true}
                        type="checkbox"
                        form={form}
                        name="status_aktif"
                        required={false}
                      />
                    </TableCell>
                    <TableCell className="text-center">
                      <FormFieldInput
                        inputStyle="w-full"
                        position={true}
                        type="checkbox"
                        form={form}
                        name="pns"
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
                      {item.nama_hub_kerja}
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center items-center">
                        {item.status_aktif ? (
                          <FaCheck className="text-green-500 w-4 h-4" />
                        ) : (
                          <IoClose className="text-red-500 w-5 h-5" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center items-center">
                        {item.pns ? (
                          <FaCheck className="text-green-500 w-4 h-4" />
                        ) : (
                          <IoClose className="text-red-500 w-5 h-5" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="h-full">
                      <div className="flex justify-center items-center w-full h-full">
                        <Link to="">
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

export default HubunganKerja;
