import { useEffect, useState, useCallback } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { format, parseISO } from "date-fns";

// UI Components
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Custom Components
import CustomCard from "@/components/blocks/Card";
import CustomPagination from "@/components/blocks/CustomPagination";
import { ConfirmDialog } from "@/components/blocks/ConfirmDialog/ConfirmDialog";

// Icons
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { IoEyeOutline } from "react-icons/io5";
import { MdEdit } from "react-icons/md";

// Services
import adminServices from "@/services/admin.services.ts";
import deleteReferensiServices from "@/services/admin.delete.referensi";

// --- Definisi Tipe Data untuk Respons API ---

// Tipe untuk setiap item penghargaan
interface PenghargaanItem {
  id: number;
  nip: string;
  nama_pegawai: string;
  tanggal_penghargaan: string;
  jenis_penghargaan: string;
  nama_penghargaan: string;
  status_info: {
    label: string;
  };
}

// Tipe untuk data yang dipaginasi
interface PaginatedData {
  data: PenghargaanItem[];
  current_page: number;
  last_page: number;
  links: any[];
}

// Tipe untuk opsi filter
interface FilterOption {
  id: number | string;
  nama: string;
}

// Tipe untuk kolom tabel
interface TableColumn {
  field: string;
  label: string;
}

// Tipe untuk keseluruhan respons API
interface ApiResponse {
  data: PaginatedData;
  filters: {
    unit_kerja: FilterOption[];
    jabatan_fungsional: FilterOption[];
    jenis_penghargaan: FilterOption[];
  };
  table_columns: TableColumn[];
}

const RiwayatPenghargaan = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const queryClient = useQueryClient();

  // --- State Management untuk Filter & Search ---
  const [searchData, setSearchData] = useState(searchParam.get("search") || "");
  const [debouncedSearch] = useDebounce(searchData, 500);

  const currentPage = searchParam.get("page") || "1";
  const unitKerjaId = searchParam.get("unit_kerja_id") || "semua";
  const jabatanFungsionalId =
    searchParam.get("jabatan_fungsional_id") || "semua";
  const jenisPenghargaan = searchParam.get("jenis_penghargaan") || "semua";

  // --- Pengambilan Data ---
  const { data, isLoading, isError } = useQuery<ApiResponse>({
    queryKey: [
      "riwayat-penghargaan",
      currentPage,
      debouncedSearch,
      unitKerjaId,
      jabatanFungsionalId,
      jenisPenghargaan,
    ],
    queryFn: async () => {
      const response = await adminServices.getPenghargaan({
        page: currentPage,
        search: debouncedSearch,
        unit_kerja_id: unitKerjaId,
        jabatan_fungsional_id: jabatanFungsionalId,
        jenis_penghargaan: jenisPenghargaan,
      });
      return response.data;
    },
    // FIX: Ganti `keepPreviousData` dengan `placeholderData`
    placeholderData: (previousData) => previousData,
  });

  // --- Penghapusan Data ---
  const { mutate: deleteData } = useMutation({
    mutationFn: (id: string) =>
      deleteReferensiServices.deteleDataPenghargaan(id),
    onSuccess: () => {
      toast.success("Data berhasil dihapus");
      queryClient.invalidateQueries({ queryKey: ["riwayat-penghargaan"] });
    },
    onError: (error: any) => {
      toast.error(`Gagal menghapus data: ${error.message}`);
    },
  });

  // --- Event Handlers ---
  const handleUrlChange = useCallback(
    (paramName: string, value: string) => {
      const newSearchParams = new URLSearchParams(searchParam);
      if (value && value !== "semua") {
        newSearchParams.set(paramName, value);
      } else {
        newSearchParams.delete(paramName);
      }

      if (paramName !== "page") {
        newSearchParams.set("page", "1");
      }
      setSearchParam(newSearchParams);
    },
    [searchParam, setSearchParam]
  );

  // --- Efek untuk Search ---
  useEffect(() => {
    if (debouncedSearch.length === 0 || debouncedSearch.length > 2) {
      handleUrlChange("search", debouncedSearch);
    }
  }, [debouncedSearch, handleUrlChange]);

  // --- Efek untuk Paginasi Awal ---
  useEffect(() => {
    if (!searchParam.has("page")) {
      handleUrlChange("page", "1");
    }
  }, [handleUrlChange, searchParam]);

  // --- Tampilan Loading & Error ---
  if (isLoading) {
    // Skeleton UI
    return (
      <div className="mt-10 mb-20 space-y-6">
        <div>
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-4 w-1/4 mt-2" />
        </div>
        <div className="p-6 border rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-between">
          <Skeleton className="h-10 w-full md:w-96" />
          <Skeleton className="h-10 w-28" />
        </div>
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Skeleton className="h-5 w-5" />
                </TableHead>
                {[...Array(7)].map((_, i) => (
                  <TableHead key={i}>
                    <Skeleton className="h-5 w-full" />
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...Array(10)].map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Skeleton className="h-5 w-5" />
                  </TableCell>
                  {[...Array(7)].map((_, j) => (
                    <TableCell key={j}>
                      <Skeleton className="h-5 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-red-600">Gagal memuat data.</p>
        <p className="text-sm text-muted-foreground">
          Silakan coba lagi beberapa saat lagi.
        </p>
      </div>
    );
  }

  const penghargaanData = data?.data;
  const filterOptions = data?.filters;

  return (
    <div className="mt-10 mb-20">
      <h1 className="text-lg sm:text-2xl font-normal">
        Riwayat Penghargaan{" "}
        <span className="text-muted-foreground font-normal text-[12px] sm:text-[16px]">
          Daftar Penghargaan
        </span>
      </h1>

      <CustomCard
        title="Filter Data"
        actions={
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Filter Unit Kerja */}
            <div className="flex flex-col gap-2">
              <Label>Unit Kerja</Label>
              <Select
                value={unitKerjaId}
                onValueChange={(value) =>
                  handleUrlChange("unit_kerja_id", value)
                }
              >
                <SelectTrigger className="w-full text-xs sm:text-sm">
                  <SelectValue placeholder="--Semua Unit Kerja--" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {filterOptions?.unit_kerja.map((option) => (
                      <SelectItem key={option.id} value={String(option.id)}>
                        {option.nama}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            {/* Filter Jabatan Fungsional */}
            <div className="flex flex-col gap-2">
              <Label>Jabatan Fungsional</Label>
              <Select
                value={jabatanFungsionalId}
                onValueChange={(value) =>
                  handleUrlChange("jabatan_fungsional_id", value)
                }
              >
                <SelectTrigger className="w-full text-xs sm:text-sm">
                  <SelectValue placeholder="--Semua Jabatan Fungsional--" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {filterOptions?.jabatan_fungsional.map((option) => (
                      <SelectItem key={option.id} value={String(option.id)}>
                        {option.nama}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            {/* Filter Jenis Penghargaan */}
            <div className="flex flex-col gap-2">
              <Label>Jenis Penghargaan</Label>
              <Select
                value={jenisPenghargaan}
                onValueChange={(value) =>
                  handleUrlChange("jenis_penghargaan", value)
                }
              >
                <SelectTrigger className="w-full text-xs sm:text-sm">
                  <SelectValue placeholder="--Semua Jenis Penghargaan--" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {filterOptions?.jenis_penghargaan.map((option) => (
                      <SelectItem key={option.id} value={String(option.id)}>
                        {option.nama}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        }
      />

      {/* Bagian Search dan Aksi */}
      <div className="w-full flex flex-col lg:flex-row justify-between items-center mt-6 gap-4">
        <div className="w-full relative lg:w-96">
          <FiSearch className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400" />
          <Input
            value={searchData}
            onChange={(e) => setSearchData(e.target.value)}
            placeholder="Cari NIP atau Nama Pegawai..."
            className="w-full pl-10 pr-4 text-xs sm:text-sm"
          />
        </div>
        <div className="w-full lg:w-auto">
          <Link to="/admin/operasional/kompensasi/detail-penghargaan">
            <Button className="cursor-pointer bg-green-light-uika hover:bg-[#329C59] w-full text-xs sm:text-sm">
              <FaPlus className="mr-2" /> Tambah Data
            </Button>
          </Link>
        </div>
      </div>

      {/* Tabel Data */}
      <div className="mt-5 border rounded-lg">
        <Table className="table-auto">
          <TableHeader>
            <TableRow className="bg-gray-100 hover:bg-gray-100">
              <TableHead className="text-center w-10">
                <Checkbox />
              </TableHead>
              {data?.table_columns?.map((col) => (
                <TableHead
                  key={col.field}
                  className="text-center text-xs sm:text-sm"
                >
                  {col.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-200">
            {penghargaanData?.data.length ? (
              penghargaanData.data.map((item) => (
                <TableRow key={item.id} className="even:bg-gray-50">
                  <TableCell className="text-center">
                    <Checkbox />
                  </TableCell>
                  <TableCell className="text-center text-xs sm:text-sm">
                    {item.nip}
                  </TableCell>
                  <TableCell className="text-xs sm:text-sm">
                    {item.nama_pegawai}
                  </TableCell>
                  <TableCell className="text-center text-xs sm:text-sm">
                    {item.tanggal_penghargaan
                      ? format(
                          parseISO(item.tanggal_penghargaan),
                          "dd MMM yyyy"
                        )
                      : "-"}
                  </TableCell>
                  <TableCell className="text-center text-xs sm:text-sm">
                    {item.jenis_penghargaan}
                  </TableCell>
                  <TableCell className="text-xs sm:text-sm">
                    {item.nama_penghargaan}
                  </TableCell>
                  <TableCell className="text-center text-xs sm:text-sm">
                    {item.status_info.label}
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center items-center w-full h-full">
                      <Link
                        to={`/admin/operasional/kompensasi/detail-data-penghargaan/${item.id}`}
                      >
                        <Button size="icon" variant="ghost" aria-label="Lihat">
                          <IoEyeOutline className="w-5 h-5 text-blue-500" />
                        </Button>
                      </Link>
                      <Link
                        to={`/admin/operasional/kompensasi/edit-data-penghargaan/${item.id}`}
                      >
                        <Button size="icon" variant="ghost" aria-label="Edit">
                          <MdEdit className="w-5 h-5 text-yellow-500" />
                        </Button>
                      </Link>
                      <ConfirmDialog
                        title="Hapus Data?"
                        description={`Apakah Anda yakin ingin menghapus data penghargaan "${item.nama_penghargaan}"?`}
                        onConfirm={() => deleteData(String(item.id))}
                      >
                        <Button
                          size="icon"
                          type="button"
                          variant="ghost"
                          aria-label="Hapus"
                        >
                          <FaRegTrashAlt className="text-red-500" />
                        </Button>
                      </ConfirmDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={(data?.table_columns?.length || 0) + 2}
                  className="text-center h-48"
                >
                  Data tidak ditemukan.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Paginasi */}
      {penghargaanData && penghargaanData.data.length > 0 && (
        <CustomPagination
          currentPage={penghargaanData?.current_page || 1}
          links={penghargaanData?.links || []}
          onPageChange={(page) => handleUrlChange("page", page.toString())}
          totalPages={penghargaanData?.last_page}
        />
      )}
    </div>
  );
};

export default RiwayatPenghargaan;
