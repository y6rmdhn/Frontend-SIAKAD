import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

// UI & Custom Components
import CustomCard from "@/components/blocks/Card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CustomPagination from "@/components/blocks/CustomPagination";
import SelectFilter from "@/components/blocks/SelectFilter";
import SearchInput from "@/components/blocks/SearchInput";
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput";
import { Form } from "@/components/ui/form";
import { InfiniteScrollSelect } from "@/components/blocks/InfiniteScrollSelect/InfiniteScrollSelect";
import { ConfirmDialog } from "@/components/blocks/ConfirmDialog/ConfirmDialog";

// Icons
import { MdEdit } from "react-icons/md";
import { FaFileImport, FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { IoSaveOutline } from "react-icons/io5";
import { RiResetLeftFill } from "react-icons/ri";

// Services & Constants
import adminServices from "@/services/admin.services";
import potsReferensiServices from "@/services/create.admin.referensi";
import deleteReferensiServices from "@/services/admin.delete.referensi";
import putReferensiServices from "@/services/put.admin.referensi";
import unitKerjaOptions from "@/constant/dummyFilter";

const timeFormatRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

export const inputPresensiSchema = z
  .object({
    id: z.number().optional(),
    pegawai_id: z.coerce
      .number({
        required_error: "Pegawai harus dipilih.",
        invalid_type_error: "Pegawai harus dipilih.",
      })
      .min(1, { message: "Pegawai harus dipilih." }),

    tanggal_absensi: z
      .string({
        required_error: "Tanggal absensi harus diisi.",
      })
      .nonempty("Tanggal absensi tidak boleh kosong."),

    jenis_kehadiran_id: z.coerce
      .number({
        required_error: "Status kehadiran harus dipilih.",
        invalid_type_error: "Status kehadiran harus dipilih.",
      })
      .min(1, { message: "Status kehadiran harus dipilih." }),

    jam_masuk: z
      .string()
      .regex(timeFormatRegex, {
        message: "Format jam harus HH:MM (contoh: 08:00).",
      })
      .optional()
      .or(z.literal("")),

    jam_keluar: z
      .string()
      .regex(timeFormatRegex, {
        message: "Format jam harus HH:MM (contoh: 17:00).",
      })
      .optional()
      .or(z.literal("")),

    keterangan: z
      .string()
      .max(255, "Keterangan tidak boleh lebih dari 255 karakter.")
      .optional(),
  })
  .refine(
    (data) => {
      if (data.jam_masuk && data.jam_keluar) {
        return data.jam_keluar > data.jam_masuk;
      }
      return true;
    },
    {
      message: "Jam keluar harus setelah jam masuk.",
      path: ["jam_keluar"],
    }
  );

export type InputPresensiFormValue = z.infer<typeof inputPresensiSchema>;

// Tipe data untuk satu item presensi dari API
interface PresensiData {
  id: number;
  nip: string;
  pegawai_id: number;
  nama_pegawai: string;
  status: string;
  jenis_kehadiran: {
    id: number;
    nama_jenis: string;
  };
  tanggal_absensi: string;
  jam_masuk: string;
  jam_keluar: string;
  keterangan: string;
}

// Tipe data untuk seluruh respons API yang dipaginasi
interface PaginatedPresensiResponse {
  data: PresensiData[];
  last_page: number;
  filters_applied: {
    tanggal: string;
  };
}

const InputKehadiran = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const [searchData, setSearchData] = useState(searchParam.get("search") || "");
  const [debouncedInput] = useDebounce(searchData, 500);

  const queryClient = useQueryClient();
  const [isAddData, setIsAddData] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [editingItemId, setEditingItemId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(
    Number(searchParam.get("page") || 1)
  );

  const form = useForm<InputPresensiFormValue>({
    resolver: zodResolver(inputPresensiSchema),
    defaultValues: {
      pegawai_id: undefined,
      tanggal_absensi: "",
      jenis_kehadiran_id: undefined,
      jam_masuk: "",
      jam_keluar: "",
      keterangan: "",
    },
  });

  // Mengambil data
  const { data } = useQuery<PaginatedPresensiResponse>({
    queryKey: [
      "input-presensi-operasional",
      searchParam.get("page"),
      searchParam.get("search"),
    ],
    queryFn: async () => {
      const page = searchParam.get("page") || "1";
      const search = searchParam.get("search") || "";
      const response = await adminServices.getInputKehadiran(page, search);
      return response.data;
    },
  });

  // Menambah data
  const { mutate: postData } = useMutation({
    mutationFn: (data: InputPresensiFormValue) =>
      potsReferensiServices.inputPresensi(data),
    onSuccess: () => {
      form.reset();
      toast.success("Berhasil menambahkan data");
      setIsAddData(false);
      queryClient.invalidateQueries({
        queryKey: ["input-presensi-operasional"],
      });
    },
  });

  // Mengedit data
  const { mutate: putData } = useMutation({
    mutationFn: (data: InputPresensiFormValue) =>
      putReferensiServices.inputPresensi(data.id!, data),
    onSuccess: () => {
      toast.success("Data berhasil diedit");
      setIsEditMode(false);
      setIsAddData(false);
      setEditingItemId(null);
      form.reset();
      queryClient.invalidateQueries({
        queryKey: ["input-presensi-operasional"],
      });
    },
  });

  // Menghapus data
  const { mutate: deleteEselon } = useMutation({
    mutationFn: (id: number) =>
      deleteReferensiServices.deteleDataInputPresensi(id),
    onSuccess: () => {
      toast.success("Data berhasil dihapus");
      queryClient.invalidateQueries({
        queryKey: ["input-presensi-operasional"],
      });
      if (editingItemId) {
        form.reset();
        setEditingItemId(null);
        setIsEditMode(false);
        setIsAddData(false);
      }
    },
  });

  const handleDelete = (id: number) => {
    deleteEselon(id);
  };

  const handleSubmitData = (values: InputPresensiFormValue) => {
    if (isEditMode && editingItemId) {
      putData(values);
    } else {
      postData(values);
    }
  };

  const handleEditItem = (item: PresensiData) => {
    form.reset({
      id: item.id,
      pegawai_id: item.pegawai_id,
      tanggal_absensi: item.tanggal_absensi,
      jenis_kehadiran_id: item.jenis_kehadiran.id,
      jam_masuk: item.jam_masuk,
      jam_keluar: item.jam_keluar,
      keterangan: item.keterangan,
    });
    setIsEditMode(true);
    setEditingItemId(item.id ?? null);
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
    const newSearchParam = new URLSearchParams(searchParam);
    if (debouncedInput.length > 3) {
      newSearchParam.set("search", debouncedInput);
      newSearchParam.set("page", "1");
    } else {
      newSearchParam.delete("search");
    }
    if (searchParam.toString() !== newSearchParam.toString()) {
      setSearchParam(newSearchParam);
    }
  }, [debouncedInput, searchParam, setSearchParam]);

  useEffect(() => {
    const page = Number(searchParam.get("page") || 1);
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  }, [searchParam, currentPage]);

  useEffect(() => {
    if (!searchParam.get("page")) {
      const newSearchParam = new URLSearchParams(searchParam);
      newSearchParam.set("page", "1");
      setSearchParam(newSearchParam);
    }
  }, [searchParam, setSearchParam]);

  useEffect(() => {
    if (Number(searchParam.get("page")) < 1) {
      const newSearchParam = new URLSearchParams(searchParam);
      newSearchParam.set("page", "1");
      setSearchParam(newSearchParam);
    }
  }, [searchParam, setSearchParam]);

  useEffect(() => {
    if (
      data?.last_page &&
      Number(searchParam.get("page")) > data.last_page &&
      data.last_page > 0
    ) {
      const newSearchParam = new URLSearchParams(searchParam);
      newSearchParam.set("page", data.last_page.toString());
      setSearchParam(newSearchParam);
    }
  }, [searchParam, data, setSearchParam]);

  return (
    <div className="mt-10 mb-20">
      <h1 className="text-lg sm:text-2xl font-normal">Input Presensi</h1>
      <CustomCard
        actions={
          <div className="grid grid-rows-3 md:grid-rows-2 grid-flow-col gap-6">
            <div className="flex md:flex-col flex-col lg:flex-row">
              <Label className="w-full text-[#FDA31A]">Unit Kerja</Label>
              <SelectFilter
                classname="w-full md:w-32 "
                options={unitKerjaOptions}
                placeholder="--Semua--"
              />
            </div>
            <div className="flex md:flex-col flex-col lg:flex-row">
              <Label className="w-full text-[#FDA31A]">Tanggal</Label>
              <Input type="date" className="w-60 sm:w-full" />
            </div>
            <div className="flex md:flex-col flex-col lg:flex-row">
              <Label className="w-full text-[#FDA31A]">Tanggal</Label>
              <SelectFilter
                classname="w-full md:w-32 "
                options={unitKerjaOptions}
                placeholder="--Semua--"
              />
            </div>
          </div>
        }
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmitData)}>
          <div className="w-full flex flex-col lg:flex-row justify-between mt-6">
            <div className="mt-10 grid grid-rows-2 sm:flex gap-4">
              <SelectFilter
                classname="w-full md:w-80"
                options={unitKerjaOptions}
                placeholder="--Semua--"
              />
              <SearchInput
                value={searchData}
                onChange={(e) => setSearchData(e.target.value)}
              />
            </div>
            <div className="w-full grid sm:grid-cols-2 gap-4 mt-4 lg:mt-0 lg:flex lg:w-auto">
              <div className="w-full lg:w-auto">
                <Button
                  type="button"
                  onClick={() => {
                    if (!isEditMode) {
                      form.reset({
                        id: 0,
                        pegawai_id: undefined,
                        tanggal_absensi: "",
                        jenis_kehadiran_id: undefined,
                        jam_masuk: "",
                        jam_keluar: "",
                        keterangan: "",
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
              <div className="w-full lg:w-auto">
                <Button className="cursor-pointer bg-green-light-uika hover:bg-[#329C59] w-full lg:w-auto text-xs sm:text-sm">
                  <FaFileImport /> Import
                </Button>
              </div>
            </div>
          </div>

          <Table className="mt-10 table-auto">
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead className="text-center text-xs sm:text-sm">
                  NIP
                </TableHead>
                <TableHead className="text-center text-xs sm:text-sm">
                  Pegawai
                </TableHead>
                <TableHead className="text-center text-xs sm:text-sm">
                  Status
                </TableHead>
                <TableHead className="text-center text-xs sm:text-sm">
                  Tanggal Absensi
                </TableHead>
                <TableHead className="text-center text-xs sm:text-sm">
                  Jam Datang
                </TableHead>
                <TableHead className="text-center text-xs sm:text-sm">
                  Jam Pulang
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
                <TableRow className=" even:bg-gray-100">
                  <TableCell className="text-center text-xs sm:text-sm">
                    -
                  </TableCell>
                  <TableCell className="text-center text-xs sm:text-sm">
                    <InfiniteScrollSelect
                      form={form}
                      name="pegawai_id"
                      placeholder="--Pilih Pegawai--"
                      required={false}
                      queryKey="pegawai-select-operasional"
                      queryFn={adminServices.getPegawaiAdminPage}
                      itemValue="id"
                      itemLabel="nama_pegawai"
                    />
                  </TableCell>
                  <TableCell className="text-center">
                    <InfiniteScrollSelect
                      form={form}
                      name="jenis_kehadiran_id"
                      placeholder="--Pilih Status--"
                      required={false}
                      queryKey="jenis-kehadiran-select"
                      queryFn={adminServices.getJenisKehadiran}
                      itemValue="id"
                      itemLabel="nama_jenis"
                    />
                  </TableCell>
                  <TableCell className="text-center text-xs sm:text-sm">
                    <FormFieldInput
                      inputStyle="w-full"
                      position={true}
                      form={form}
                      type="date"
                      name="tanggal_absensi"
                      required={false}
                    />
                  </TableCell>
                  <TableCell className="text-center text-xs sm:text-sm">
                    <FormFieldInput
                      inputStyle="w-full"
                      position={true}
                      form={form}
                      placeholder="HH:MI"
                      name="jam_masuk"
                      required={false}
                    />
                  </TableCell>
                  <TableCell className="text-center text-xs sm:text-sm">
                    <FormFieldInput
                      inputStyle="w-full"
                      position={true}
                      placeholder="HH:MI"
                      form={form}
                      name="jam_keluar"
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
                    {item.nip}
                  </TableCell>
                  <TableCell className="text-center text-xs sm:text-sm">
                    {item.nama_pegawai}
                  </TableCell>
                  <TableCell className="text-center text-xs sm:text-sm">
                    {item.jenis_kehadiran.nama_jenis}
                  </TableCell>
                  <TableCell className="text-center text-xs sm:text-sm">
                    {data?.filters_applied.tanggal}
                  </TableCell>
                  <TableCell className="text-center text-xs sm:text-sm">
                    {item.jam_masuk || "-"}
                  </TableCell>
                  <TableCell className="text-center text-xs sm:text-sm">
                    {item.jam_keluar || "-"}
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
            data={data}
            onPageChange={(page) => {
              const newSearchParam = new URLSearchParams(searchParam);
              newSearchParam.set("page", page.toString());
              setSearchParam(newSearchParam);
            }}
          />
        </form>
      </Form>
    </div>
  );
};

export default InputKehadiran;
