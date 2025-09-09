import CustomCard from "@/components/blocks/Card";
import { ConfirmDialog } from "@/components/blocks/ConfirmDialog/ConfirmDialog";
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput";
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
import { IJenisHari } from "@/types/create.referensi";
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

interface jenishariItem {
  id: string;
  kode: string;
  nama_hari: string;
  jenis_hari: boolean;
}

interface jenisHariResponse {
  data: jenishariItem[];
  links: any[];
  next_page_url: string | null;
  prev_page_url: string | null;
  last_page: number;
}

const jenisHariSchema = z.object({
  id: z.number().optional(),
  kode: z.string().min(1, "kode tidak boleh kosong"),
  nama_hari: z.string().min(1, "Nama hari tidak boleh kosong"),
  jenis_hari: z
    .enum(["true", "false"], {
      required_error: "Jenis hari harus dipilih.",
    })
    .transform((value) => value === "true"),
});

type jenisHariFormvalue = z.infer<typeof jenisHariSchema>;

const JenisHari = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const queryClient = useQueryClient();
  const [isAddData, setIsAddData] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [editingItemId, setEditingItemId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(
    Number(searchParam.get("page") || 1)
  );

  const form = useForm({
    resolver: zodResolver(jenisHariSchema),
    defaultValues: {
      kode: "",
      nama_hari: "",
      jenis_hari: undefined,
    },
  });

  // add data
  const { data } = useQuery<jenisHariResponse>({
    queryKey: ["jenis-hari"],
    queryFn: async () => {
      const response = await adminServices.getJenisHari();
      return response.data.data;
    },
  });

  // tambah data
  const { mutate: postData } = useMutation({
    mutationFn: (data: IJenisHari) => potsReferensiServices.jenisHari(data),
    onSuccess: () => {
      form.reset();
      toast.success("Berhasil menambahkan data");
      setIsAddData(false);
      queryClient.invalidateQueries({ queryKey: ["jenis-hari"] });
    },
  });

  // edit data
  const { mutate: putData } = useMutation({
    mutationFn: (data: jenisHariFormvalue) =>
      putReferensiServices.jenisHari(data.id!, data),
    onSuccess: () => {
      toast.success("Data berhasil diedit");

      setIsEditMode(false);
      setIsAddData(false);
      setEditingItemId(null);

      form.reset();

      queryClient.invalidateQueries({ queryKey: ["jenis-hari"] });
    },
  });

  // hapus data
  const { mutate: deleteData } = useMutation({
    mutationFn: (id: number) => deleteReferensiServices.deteleJenisHari(id),
    onSuccess: () => {
      toast.success("Data berhasil dihapus");
      queryClient.invalidateQueries({ queryKey: ["jenis-hari"] });

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

  const handleSubmitData = (values: jenisHariFormvalue) => {
    if (isEditMode && editingItemId) {
      putData(values);
    } else {
      postData(values);
    }
  };

  const handleEditItem = (item: jenishariItem) => {
    form.reset({
      id: item.id,
      kode: item.kode,
      nama_hari: item.nama_hari,
      jenis_hari: item.jenis_hari,
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
        Setting Hari{" "}
        <span className="text-muted-foreground font-normal text-[16px]">
          Daftar Setting Hari
        </span>
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
                          kode: "",
                          nama_hari: "",
                          jenis_hari: false,
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
                    Nama hari
                  </TableHead>
                  <TableHead className="text-center text-xs sm:text-sm">
                    Jenis Hari
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
                        name="nama_hari"
                        required={false}
                      />
                    </TableCell>
                    <TableCell className="text-center flex justify-center items-center">
                      <FormFieldInput
                        inputStyle="w-full"
                        position={true}
                        type="radio"
                        options={[
                          { value: "true", label: "Efektif" },
                          { value: "false", label: "Non Efektif" },
                        ]}
                        form={form}
                        name="jenis_hari"
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
                      {item.kode}
                    </TableCell>
                    <TableCell className="text-center text-xs sm:text-sm">
                      {item.nama_hari}
                    </TableCell>
                    <TableCell className="text-center text-xs sm:text-sm">
                      {item.jenis_hari ? "Efektif" : "Non Efektif"}
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
          </CustomCard>
        </form>
      </Form>
    </div>
  );
};

export default JenisHari;
