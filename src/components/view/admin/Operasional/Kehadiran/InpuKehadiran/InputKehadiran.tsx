import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "use-debounce";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

// UI & Custom Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Form } from "@/components/ui/form";
import CustomCard from "@/components/blocks/Card";
import CustomPagination from "@/components/blocks/CustomPagination";
import SelectFilter from "@/components/blocks/SelectFilter";
import SearchInput from "@/components/blocks/SearchInput";
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput";
import { InfiniteScrollSelect } from "@/components/blocks/InfiniteScrollSelect/InfiniteScrollSelect";
import { ConfirmDialog } from "@/components/blocks/ConfirmDialog/ConfirmDialog";
import Title from "@/components/blocks/Title";
import { Skeleton } from "@/components/ui/skeleton";

// Icons
import { MdEdit } from "react-icons/md";
import { FaFileImport, FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { IoSaveOutline } from "react-icons/io5";
import { RiResetLeftFill } from "react-icons/ri";

// Services
import adminServices from "@/services/admin.services";
import potsReferensiServices from "@/services/create.admin.referensi";
import deleteReferensiServices from "@/services/admin.delete.referensi";
import putReferensiServices from "@/services/put.admin.referensi";

// --- START ZOD SCHEMA & TYPES ---
const timeFormatRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

export const inputPresensiSchema = z
  .object({
    id: z.number().optional(),
    pegawai_id: z.coerce.number().min(1, "Pegawai harus dipilih."),
    tanggal_absensi: z.string().nonempty("Tanggal absensi harus diisi."),
    jenis_kehadiran_id: z.coerce
      .number()
      .min(1, "Status kehadiran harus dipilih."),
    jam_masuk: z
      .string()
      .regex(timeFormatRegex, "Format jam harus HH:MM.")
      .optional()
      .or(z.literal("")),
    jam_keluar: z
      .string()
      .regex(timeFormatRegex, "Format jam harus HH:MM.")
      .optional()
      .or(z.literal("")),
    keterangan: z.string().max(255, "Keterangan maks 255 karakter.").optional(),
  })
  .refine(
    (data) => {
      if (data.jam_masuk && data.jam_keluar) {
        return data.jam_keluar > data.jam_masuk;
      }
      return true;
    },
    { message: "Jam keluar harus setelah jam masuk.", path: ["jam_keluar"] }
  );

export type InputPresensiFormValue = z.infer<typeof inputPresensiSchema>;

interface PresensiData {
  id: string;
  nip: string;
  pegawai_id: number;
  nama_pegawai: string;
  status: string;
  jenis_kehadiran: { id: string; nama_jenis: string };
  tanggal_absensi: string;
  jam_masuk: string;
  jam_keluar: string;
  keterangan: string;
}

interface PaginatedData {
  data: PresensiData[];
  pagination: {
    current_page: number;
    last_page: number;
  };
  table_columns: any[];
  filters_applied: { tanggal: string };
  filter_options: any;
}
// --- END ZOD SCHEMA & TYPES ---

const InputKehadiran = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const queryClient = useQueryClient();

  // --- State & URL Params ---
  const [searchData, setSearchData] = useState(searchParam.get("search") || "");
  const [debouncedSearch] = useDebounce(searchData, 500);
  const [isAddData, setIsAddData] = useState<boolean>(false);
  const [editingItemId, setEditingItemId] = useState<number | null>(null);

  const currentPage = searchParam.get("page") || "1";
  const tanggalFilter = searchParam.get("tanggal") || "";
  const unitKerjaFilter = searchParam.get("unit_kerja_id") || "";
  const jenisKehadiranFilter = searchParam.get("jenis_kehadiran_id") || "";
  const statusPresensiFilter = searchParam.get("status_presensi") || "";

  const form = useForm<InputPresensiFormValue>({
    resolver: zodResolver(inputPresensiSchema),
    defaultValues: {
      tanggal_absensi: new Date().toISOString().split("T")[0],
    },
  });

  // --- Data Fetching ---
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [
      "input-presensi",
      currentPage,
      debouncedSearch,
      tanggalFilter,
      unitKerjaFilter,
      jenisKehadiranFilter,
      statusPresensiFilter,
    ],
    queryFn: async () => {
      const response = await adminServices.getInputKehadiran({
        page: currentPage,
        search: debouncedSearch,
        tanggal: tanggalFilter,
        unit_kerja_id: unitKerjaFilter,
        jenis_kehadiran_id: jenisKehadiranFilter,
        status_presensi: statusPresensiFilter,
      });
      return response.data as PaginatedData;
    },
    placeholderData: keepPreviousData,
  });

  // --- Memoize Filter Options ---
  const filterOptions = useMemo(() => {
    const options = data?.filter_options || {};
    return {
      unitKerja:
        options.unit_kerja?.map((opt: any) => ({
          value: String(opt.id),
          label: opt.label,
        })) || [],
      jenisKehadiran:
        options.jenis_kehadiran?.map((opt: any) => ({
          value: String(opt.id),
          label: opt.label,
        })) || [],
      statusPresensi:
        options.status_presensi?.map((opt: any) => ({
          value: opt.value,
          label: opt.label,
        })) || [],
    };
  }, [data]);

  // --- Data Mutations ---
  const { mutate: postData } = useMutation({
    mutationFn: (data: InputPresensiFormValue) =>
      potsReferensiServices.inputPresensi(data),
    onSuccess: () => {
      toast.success("Berhasil menambahkan data");
      handleCancel();
      queryClient.invalidateQueries({ queryKey: ["input-presensi"] });
    },
    onError: (err: any) =>
      toast.error(
        `Gagal: ${err.response?.data?.message || "Terjadi kesalahan"}`
      ),
  });

  const { mutate: putData } = useMutation({
    mutationFn: (data: InputPresensiFormValue) =>
      putReferensiServices.inputPresensi(data.id!, data),
    onSuccess: () => {
      toast.success("Data berhasil diedit");
      handleCancel();
      queryClient.invalidateQueries({ queryKey: ["input-presensi"] });
    },
    onError: (err: any) =>
      toast.error(
        `Gagal: ${err.response?.data?.message || "Terjadi kesalahan"}`
      ),
  });

  const { mutate: deleteMutation } = useMutation({
    mutationFn: (id: number) =>
      deleteReferensiServices.deteleDataInputPresensi(id),
    onSuccess: () => {
      toast.success("Data berhasil dihapus");
      handleCancel();
      queryClient.invalidateQueries({ queryKey: ["input-presensi"] });
    },
    onError: (err: any) =>
      toast.error(
        `Gagal: ${err.response?.data?.message || "Terjadi kesalahan"}`
      ),
  });

  // --- Event Handlers ---
  const handleUrlChange = (paramName: string, value: string) => {
    const newSearchParams = new URLSearchParams(searchParam);
    if (value) {
      newSearchParams.set(paramName, value);
    } else {
      newSearchParams.delete(paramName);
    }
    if (paramName !== "page") newSearchParams.set("page", "1");
    setSearchParam(newSearchParams);
  };

  const handleSubmitData = (values: InputPresensiFormValue) => {
    editingItemId ? putData(values) : postData(values);
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
    setEditingItemId(item.id);
    setIsAddData(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancel = () => {
    form.reset({
      tanggal_absensi: tanggalFilter || new Date().toISOString().split("T")[0],
    });
    setEditingItemId(null);
    setIsAddData(false);
  };

  // --- Effects ---
  useEffect(() => {
    handleUrlChange("search", debouncedSearch);
  }, [debouncedSearch]);

  useEffect(() => {
    if (!searchParam.get("page")) {
      handleUrlChange("page", "1");
    }
    if (!tanggalFilter && data?.filters_applied?.tanggal) {
      handleUrlChange("tanggal", data.filters_applied.tanggal);
    }
  }, [data]);

  // --- Loading & Error State ---
  if (isLoading && !data) {
    return (
      <div className="mt-10 mb-20 space-y-6">
        <Title
          title="Input Presensi"
          subTitle="Manajemen Input Presensi Harian"
        />
        <div className="p-6 border rounded-lg mt-6">
          <Skeleton className="h-24 w-full" />
        </div>
        <div className="mt-10 space-y-2">
          {[...Array(10)].map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (isError)
    return (
      <div className="text-center mt-20 text-red-500">
        Gagal memuat data: {(error as Error).message}
      </div>
    );

  return (
    <div className="mt-10 mb-20">
      <Title
        title="Input Presensi"
        subTitle="Manajemen Input Presensi Harian"
      />

      {/* Filter Card */}
      <CustomCard
        title="Filter Data"
        actions={
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex flex-col gap-2">
              <Input
                type="date"
                value={tanggalFilter}
                onChange={(e) => handleUrlChange("tanggal", e.target.value)}
              />
            </div>
            <SelectFilter
              label="Unit Kerja"
              placeholder="-- Semua Unit --"
              options={filterOptions.unitKerja}
              value={unitKerjaFilter}
              onValueChange={(v) => handleUrlChange("unit_kerja_id", v)}
            />
            <SelectFilter
              label="Jenis Kehadiran"
              placeholder="-- Semua Jenis --"
              options={filterOptions.jenisKehadiran}
              value={jenisKehadiranFilter}
              onValueChange={(v) => handleUrlChange("jenis_kehadiran_id", v)}
            />
            <SelectFilter
              label="Status Presensi"
              placeholder="-- Semua Status --"
              options={filterOptions.statusPresensi}
              value={statusPresensiFilter}
              onValueChange={(v) => handleUrlChange("status_presensi", v)}
            />
          </div>
        }
      />

      {/* Form Tambah/Edit */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmitData)}>
          {isAddData && (
            <CustomCard
              title={
                editingItemId ? "Edit Data Presensi" : "Tambah Data Presensi"
              }
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <InfiniteScrollSelect
                  form={form}
                  name="pegawai_id"
                  label="Pegawai"
                  placeholder="--Pilih Pegawai--"
                  queryKey="pegawai-select"
                  queryFn={adminServices.getPegawaiAdminPage}
                  itemValue="id"
                  itemLabel="nama_pegawai"
                  required
                />
                <FormFieldInput
                  form={form}
                  name="tanggal_absensi"
                  label="Tanggal Absensi"
                  type="date"
                  required
                />
                <InfiniteScrollSelect
                  form={form}
                  name="jenis_kehadiran_id"
                  label="Status Kehadiran"
                  placeholder="--Pilih Status--"
                  queryKey="jenis-kehadiran-select"
                  queryFn={adminServices.getJenisKehadiran}
                  itemValue="id"
                  itemLabel="nama_jenis"
                  required
                />
                <FormFieldInput
                  form={form}
                  name="jam_masuk"
                  label="Jam Masuk"
                  placeholder="HH:MM"
                />
                <FormFieldInput
                  form={form}
                  name="jam_keluar"
                  label="Jam Keluar"
                  placeholder="HH:MM"
                />
                <FormFieldInput
                  form={form}
                  name="keterangan"
                  label="Keterangan"
                />
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <Button type="button" variant="ghost" onClick={handleCancel}>
                  <RiResetLeftFill className="mr-2" /> Batal
                </Button>
                <Button type="submit">
                  <IoSaveOutline className="mr-2" />{" "}
                  {editingItemId ? "Simpan Perubahan" : "Simpan"}
                </Button>
              </div>
            </CustomCard>
          )}

          {/* Tombol Aksi Utama */}
          <div className="flex flex-col md:flex-row justify-between mt-6 gap-4">
            <SearchInput
              value={searchData}
              onChange={(e) => setSearchData(e.target.value)}
              placeholder="Cari Pegawai..."
              className="w-full md:w-80"
            />
            <div className="flex gap-2">
              <Button
                type="button"
                onClick={() => !editingItemId && setIsAddData((prev) => !prev)}
                className={`bg-green-light-uika hover:bg-[#329C59] ${
                  isAddData && !editingItemId ? "hidden" : "flex"
                }`}
                disabled={editingItemId !== null}
              >
                <FaPlus className="mr-2" /> Tambah
              </Button>
              <Button type="button" className="bg-blue-500 hover:bg-blue-600">
                <FaFileImport className="mr-2" /> Import
              </Button>
            </div>
          </div>

          {/* Tabel Data */}
          <div className="mt-5 border rounded-lg">
            <Table className="text-xs lg:text-sm">
              <TableHeader>
                <TableRow className="bg-gray-100 hover:bg-gray-100">
                  {data?.table_columns?.map((col: any) => (
                    <TableHead key={col.field} className="text-center">
                      {col.label}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  [...Array(10)].map((_, i) => (
                    <TableRow key={i}>
                      <TableCell colSpan={7}>
                        <Skeleton className="h-6 w-full" />
                      </TableCell>
                    </TableRow>
                  ))
                ) : data?.data.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={data?.table_columns?.length || 7}
                      className="text-center h-48"
                    >
                      Data tidak ditemukan.
                    </TableCell>
                  </TableRow>
                ) : (
                  data?.data.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="text-center">{item.nip}</TableCell>
                      <TableCell>{item.nama_pegawai}</TableCell>
                      <TableCell className="text-center">
                        {item.status}
                      </TableCell>
                      <TableCell className="text-center">
                        {item.jam_masuk || "-"}
                      </TableCell>
                      <TableCell className="text-center">
                        {item.jam_keluar || "-"}
                      </TableCell>
                      <TableCell>{item.keterangan || "-"}</TableCell>
                      <TableCell>
                        <div className="flex justify-center items-center">
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => handleEditItem(item)}
                            disabled={editingItemId === item.id}
                          >
                            <MdEdit
                              className={`w-5 h-5 ${
                                editingItemId === item.id
                                  ? "text-gray-400"
                                  : "text-yellow-500"
                              }`}
                            />
                          </Button>
                          <ConfirmDialog
                            title="Hapus Data?"
                            description={`Yakin ingin menghapus presensi untuk ${item.nama_pegawai}?`}
                            onConfirm={() => deleteMutation(item.id)}
                          >
                            <Button size="icon" variant="ghost">
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
          </div>
        </form>
      </Form>

      {data?.data && data.data.length > 0 && (
        <CustomPagination
          currentPage={data.pagination.current_page}
          totalPages={data.pagination.last_page}
          onPageChange={(page) => handleUrlChange("page", String(page))}
          hasNextPage={data.pagination.current_page < data.pagination.last_page}
          hasPrevPage={data.pagination.current_page > 1}
        />
      )}
    </div>
  );
};

export default InputKehadiran;
