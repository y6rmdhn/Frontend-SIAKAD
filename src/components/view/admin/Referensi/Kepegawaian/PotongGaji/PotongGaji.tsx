import CustomCard from "@/components/blocks/Card";
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
import { FaPlus } from "react-icons/fa";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MdEdit } from "react-icons/md";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import adminServices from "@/services/admin.services.ts";
import { toast } from "sonner";
import CustomPagination from "@/components/blocks/CustomPagination";
import { z } from "zod";
import potsReferensiServices from "@/services/create.admin.referensi.ts";
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput.tsx";
import { IoSaveOutline } from "react-icons/io5";
import { RiResetLeftFill } from "react-icons/ri";
import { zodResolver } from "@hookform/resolvers/zod";
import putReferensiServices from "@/services/put.admin.referensi.ts";
import { FormFieldSelect } from "@/components/blocks/CustomFormSelect/CustomFormSelect";

// Define interface for the data item based on API response
interface PotongGajiItem {
  id: string;
  kode_potongan: string;
  nama_potongan: string;
  jenis_potongan: string;
  nilai_potongan: string;
  dihitung_dari: string;
  is_active: boolean;
  keterangan: string;
  created_at: string;
  updated_at: string;
}

// Define interface for the API response
interface PotongGajiResponse {
  current_page: number;
  data: PotongGajiItem[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: any[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

const potongGajiSchema = z.object({
  id: z.string().optional(),
  kode_potongan: z.string().min(1, "Kode potongan tidak boleh kosong"),
  nama_potongan: z.string().min(1, "Nama potongan tidak boleh kosong"),
  jenis_potongan: z.string().min(1, "Jenis potongan tidak boleh kosong"),
  nilai_potongan: z.string().min(1, "Nilai potongan tidak boleh kosong"),
  dihitung_dari: z.string().min(1, "Dihitung dari tidak boleh kosong"),
  is_active: z.boolean().default(true),
  keterangan: z.string().optional(),
});

type PotongGajiFormValue = z.infer<typeof potongGajiSchema>;

const PotongGaji = () => {
  const form = useForm({
    defaultValues: {
      kode_potongan: "",
      nama_potongan: "",
      jenis_potongan: "",
      nilai_potongan: "",
      dihitung_dari: "",
      is_active: true,
      keterangan: "",
    },
    resolver: zodResolver(potongGajiSchema),
  });

  const [searchParam, setSearchParam] = useSearchParams();
  const [isAddData, setIsAddData] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(
    Number(searchParam.get("page") || 1)
  );
  const queryClient = useQueryClient();

  // Opsi untuk select dropdown
  const jenisPotonganOptions = [
    { label: "Persen", value: "persen" },
    { label: "Nominal Tetap", value: "nominal" },
  ];

  const dihitungDariOptions = [
    { label: "Gaji Pokok", value: "gaji_pokok" },
    { label: "Penghasilan Bruto", value: "penghasilan_bruto" },
  ];

  // get data
  const { data } = useQuery<PotongGajiResponse>({
    queryKey: ["potong-gaji", searchParam.get("page")],
    queryFn: async () => {
      const response = await adminServices.getPotongGaji();
      console.log(response.data);
      return response.data;
    },
  });

  // tambah data
  const { mutate: postPotongGaji } = useMutation({
    mutationFn: (data: PotongGajiFormValue) =>
      potsReferensiServices.potongGaji(data),
    onSuccess: () => {
      form.reset();
      toast.success("Data potongan gaji berhasil ditambahkan");
      setIsAddData(false);
      queryClient.invalidateQueries({ queryKey: ["potong-gaji"] });
    },
    onError: (error: any) => {
      console.error("Error adding data:", error);
      toast.error("Gagal menambahkan data potongan gaji");
    },
  });

  // edit data
  const { mutate: putPotongGaji } = useMutation({
    mutationFn: (data: PotongGajiFormValue) =>
      putReferensiServices.potongGaji(data.id!, data),
    onSuccess: () => {
      form.reset();
      toast.success("Data potongan gaji berhasil diedit");
      setIsAddData(false);
      setIsEditMode(false);
      queryClient.invalidateQueries({ queryKey: ["potong-gaji"] });
    },
    onError: (error: any) => {
      console.error("Error editing data:", error);
      toast.error("Gagal mengedit data potongan gaji");
    },
  });

  const handleSubmitPotongGaji = (values: PotongGajiFormValue) => {
    console.log("Submitting data:", values); // Debug log

    // Pastikan nilai potongan dalam format yang benar
    const formattedValues = {
      ...values,
      nilai_potongan: values.nilai_potongan.toString(),
    };

    if (isEditMode && editingItemId) {
      putPotongGaji(formattedValues);
    } else {
      postPotongGaji(formattedValues);
    }
  };

  const handleEditItem = (item: PotongGajiItem) => {
    form.reset({
      id: item.id,
      kode_potongan: item.kode_potongan,
      nama_potongan: item.nama_potongan,
      jenis_potongan: item.jenis_potongan,
      nilai_potongan: item.nilai_potongan,
      dihitung_dari: item.dihitung_dari,
      is_active: item.is_active,
      keterangan: item.keterangan,
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

  const formatNilaiPotongan = (jenis: string, nilai: string) => {
    if (jenis === "persen") {
      return `${nilai}%`;
    } else {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(Number(nilai));
    }
  };

  const getJenisPotonganLabel = (value: string) => {
    const option = jenisPotonganOptions.find((opt) => opt.value === value);
    return option ? option.label : value;
  };

  const getDihitungDariLabel = (value: string) => {
    const option = dihitungDariOptions.find((opt) => opt.value === value);
    return option ? option.label : value;
  };

  const getStatusBadge = (isActive: boolean) => {
    return isActive ? (
      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
        Aktif
      </span>
    ) : (
      <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
        Non-Aktif
      </span>
    );
  };

  return (
    <div className="mt-10 mb-20">
      <h1 className="text-lg sm:text-2xl font-normal">Master Potongan Gaji</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmitPotongGaji)}>
          <CustomCard
            actions={
              <div className="flex justify-end">
                <div className="flex gap-4">
                  <Button
                    type="button"
                    onClick={() => {
                      if (!isEditMode) {
                        form.reset({
                          kode_potongan: "",
                          nama_potongan: "",
                          jenis_potongan: "",
                          nilai_potongan: "",
                          dihitung_dari: "",
                          is_active: true,
                          keterangan: "",
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
                    <FaPlus className="w-4! h-4! text-white" />
                    Tambah Potongan
                  </Button>
                </div>
              </div>
            }
          >
            <Table className="mt-5 table-auto">
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead className="text-center text-xs sm:text-sm">
                    Kode Potongan
                  </TableHead>
                  <TableHead className="text-center text-xs sm:text-sm">
                    Nama Potongan
                  </TableHead>
                  <TableHead className="text-center text-xs sm:text-sm">
                    Jenis Potongan
                  </TableHead>
                  <TableHead className="text-center text-xs sm:text-sm">
                    Nilai Potongan
                  </TableHead>
                  <TableHead className="text-center text-xs sm:text-sm">
                    Dihitung Dari
                  </TableHead>
                  <TableHead className="text-center text-xs sm:text-sm">
                    Status
                  </TableHead>
                  <TableHead className="text-center text-xs sm:text-sm">
                    Keterangan
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
                        name="kode_potongan"
                        required={false}
                        placeholder="BPJS-KES"
                      />
                    </TableCell>
                    <TableCell className="text-center text-xs sm:text-sm">
                      <FormFieldInput
                        inputStyle="w-full"
                        position={true}
                        form={form}
                        name="nama_potongan"
                        required={false}
                        placeholder="BPJS Kesehatan"
                      />
                    </TableCell>
                    <TableCell className="text-center text-xs sm:text-sm">
                      <FormFieldSelect
                        form={form}
                        name="jenis_potongan"
                        labelStyle="text-[#3F6FA9]"
                        options={jenisPotonganOptions}
                        placeholder="--Pilih Jenis Potongan--"
                        required={false}
                      />
                    </TableCell>
                    <TableCell className="text-center text-xs sm:text-sm">
                      <FormFieldInput
                        inputStyle="w-full"
                        position={true}
                        form={form}
                        name="nilai_potongan"
                        required={false}
                        placeholder="1.00"
                      />
                    </TableCell>
                    <TableCell className="text-center text-xs sm:text-sm">
                      <FormFieldSelect
                        form={form}
                        name="dihitung_dari"
                        labelStyle="text-[#3F6FA9]"
                        options={dihitungDariOptions}
                        placeholder="--Pilih Dihitung Dari--"
                        required={false}
                      />
                    </TableCell>
                    <TableCell className="text-center text-xs sm:text-sm">
                      <FormFieldInput
                        inputStyle="w-full"
                        position={true}
                        form={form}
                        name="is_active"
                        type="checkbox"
                        required={false}
                      />
                    </TableCell>
                    <TableCell className="text-center text-xs sm:text-sm">
                      <FormFieldInput
                        inputStyle="w-full"
                        position={true}
                        form={form}
                        name="keterangan"
                        required={false}
                        placeholder="Keterangan potongan"
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
                  <TableRow key={item.id} className="even:bg-gray-100">
                    <TableCell className="text-center text-xs sm:text-sm font-mono">
                      {item.kode_potongan}
                    </TableCell>
                    <TableCell className="text-center text-xs sm:text-sm">
                      {item.nama_potongan}
                    </TableCell>
                    <TableCell className="text-center text-xs sm:text-sm capitalize">
                      {getJenisPotonganLabel(item.jenis_potongan)}
                    </TableCell>
                    <TableCell className="text-center text-xs sm:text-sm text-red-600 font-medium">
                      {formatNilaiPotongan(
                        item.jenis_potongan,
                        item.nilai_potongan
                      )}
                    </TableCell>
                    <TableCell className="text-center text-xs sm:text-sm capitalize">
                      {getDihitungDariLabel(item.dihitung_dari)}
                    </TableCell>
                    <TableCell className="text-center text-xs sm:text-sm">
                      {getStatusBadge(item.is_active)}
                    </TableCell>
                    <TableCell className="text-center text-xs sm:text-sm">
                      {item.keterangan || "-"}
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

export default PotongGaji;
