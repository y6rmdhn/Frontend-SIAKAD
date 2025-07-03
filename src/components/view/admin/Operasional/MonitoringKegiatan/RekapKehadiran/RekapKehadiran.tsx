import { useEffect, useMemo, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { useQuery } from "@tanstack/react-query";

// UI & Custom Components
import { Button } from "@/components/ui/button";
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
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import CustomCard from "@/components/blocks/Card";
import CustomPagination from "@/components/blocks/CustomPagination";
import SearchInput from "@/components/blocks/SearchInput";
import Title from "@/components/blocks/Title";
import SelectFilter from "@/components/blocks/SelectFilter";

// Services
import adminServices from "@/services/admin.services";

// --- Definisi Tipe Data ---

// Tipe untuk detail kegiatan dalam setiap item data
interface KegiatanDetail {
  jam_masuk: string;
  jam_keluar: string;
  rencana_pekerjaan: string;
}

// Tipe untuk setiap item dalam daftar monitoring
interface KegiatanItem {
  nip: string;
  nama: string;
  detail: KegiatanDetail | null;
  realisasi_pekerjaan: string;
  foto_masuk: string;
  foto_keluar: string;
  status: string;
}

// Tipe untuk opsi filter unit kerja
interface UnitKerjaOption {
  id: number;
  nama_unit: string;
}

// Tipe untuk keseluruhan respons API
interface ApiResponse {
  hari: string;
  data: KegiatanItem[];
  filter_options: {
    unit_kerja: UnitKerjaOption[];
  };
  current_page: number;
  last_page: number;
  links: any[]; // Bisa dispesifikkan lebih lanjut jika perlu
}

// --- Definisi Komponen ---
const RekapKehadiran = () => {
  const [searchParam, setSearchParam] = useSearchParams();

  // --- State & URL Params ---
  const [searchData, setSearchData] = useState(searchParam.get("search") || "");
  const [debouncedSearch] = useDebounce(searchData, 500);

  const currentPage = searchParam.get("page") || "1";
  const unitKerjaFilter = searchParam.get("unit_kerja") || "";
  const tanggalFilter = searchParam.get("tanggal") || "";

  // --- Pengambilan Data ---
  const { data, isLoading, isError, error } = useQuery<ApiResponse>({
    queryKey: [
      "monitoring-kegiatan",
      currentPage,
      debouncedSearch,
      unitKerjaFilter,
      tanggalFilter,
    ],
    queryFn: async () => {
      const response = await adminServices.getDataMonitoringKegiatan({
        page: currentPage,
        search: debouncedSearch,
        unit_kerja: unitKerjaFilter,
        tanggal: tanggalFilter,
      });
      return response.data;
    },
    // FIX: Ganti `keepPreviousData` dengan `placeholderData`
    placeholderData: (previousData) => previousData,
  });

  // --- Memos & Event Handlers ---
  const unitKerjaOptions = useMemo(() => {
    const options = data?.filter_options?.unit_kerja || [];
    return options.map((unit) => ({
      value: String(unit.id),
      label: unit.nama_unit,
    }));
  }, [data?.filter_options?.unit_kerja]);

  const handleUrlChange = useCallback(
    (paramName: string, value: string) => {
      const newSearchParams = new URLSearchParams(searchParam);
      if (value) {
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

  // --- Effects ---
  useEffect(() => {
    handleUrlChange("search", debouncedSearch);
  }, [debouncedSearch, handleUrlChange]);

  useEffect(() => {
    if (!searchParam.has("page")) {
      handleUrlChange("page", "1");
    }
  }, [handleUrlChange, searchParam]);

  // --- Tampilan Loading & Error ---
  if (isLoading && !data) {
    return (
      <div className="mt-10 mb-20 space-y-6">
        <Title title="Monitoring Kegiatan" />
        <div className="p-6 border rounded-lg mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10 space-y-2">
          {[...Array(10)].map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center mt-20 text-red-500">
        Gagal memuat data: {(error as Error).message}
      </div>
    );
  }

  return (
    <div className="mt-10 mb-20">
      <Title title="Monitoring Kegiatan" subTitle={data?.hari || ""} />

      {/* Filter Card */}
      <CustomCard
        title="Filter Data"
        actions={
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <Label>Unit Kerja</Label>
              <SelectFilter
                placeholder="-- Semua Unit Kerja --"
                options={unitKerjaOptions}
                value={unitKerjaFilter}
                onValueChange={(value) => handleUrlChange("unit_kerja", value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Tanggal</Label>
              <Input
                type="date"
                value={tanggalFilter}
                onChange={(e) => handleUrlChange("tanggal", e.target.value)}
              />
            </div>
          </div>
        }
      />

      {/* Search Input */}
      <div className="w-full md:w-80 mt-6">
        <SearchInput
          value={searchData}
          onChange={(e) => setSearchData(e.target.value)}
          placeholder="Cari NIP atau Nama Pegawai..."
        />
      </div>

      {/* Data Table */}
      <div className="mt-5 border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100 hover:bg-gray-100">
              <TableHead>NIP</TableHead>
              <TableHead>Nama Pegawai</TableHead>
              <TableHead className="text-center">Jam Masuk</TableHead>
              <TableHead className="text-center">Jam Keluar</TableHead>
              <TableHead>Rencana Pekerjaan</TableHead>
              <TableHead>Realisasi Pekerjaan</TableHead>
              <TableHead className="text-center">Foto Masuk</TableHead>
              <TableHead className="text-center">Foto Keluar</TableHead>
              <TableHead className="text-center">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data?.length ? (
              data.data.map((item) => (
                <TableRow key={item.nip}>
                  <TableCell>{item.nip}</TableCell>
                  <TableCell>{item.nama}</TableCell>
                  <TableCell className="text-center">
                    {item.detail?.jam_masuk || "-"}
                  </TableCell>
                  <TableCell className="text-center">
                    {item.detail?.jam_keluar || "-"}
                  </TableCell>
                  <TableCell className="max-w-xs break-words">
                    {item.detail?.rencana_pekerjaan || "-"}
                  </TableCell>
                  <TableCell className="max-w-xs break-words">
                    {item.realisasi_pekerjaan || "-"}
                  </TableCell>
                  <TableCell className="text-center">
                    <DialogImageTrigger
                      imageUrl={item.foto_masuk}
                      title="Foto Masuk"
                    />
                  </TableCell>
                  <TableCell className="text-center">
                    <DialogImageTrigger
                      imageUrl={item.foto_keluar}
                      title="Foto Keluar"
                    />
                  </TableCell>
                  <TableCell className="text-center">{item.status}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} className="text-center h-48">
                  Tidak ada data untuk ditampilkan.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {data?.data?.length && (
        <CustomPagination
          currentPage={data.current_page}
          totalPages={data.last_page}
          onPageChange={(page) => handleUrlChange("page", String(page))}
          links={data.links}
        />
      )}
    </div>
  );
};

// Sub-komponen untuk menampilkan tombol dan dialog gambar
const DialogImageTrigger = ({
  imageUrl,
  title,
}: {
  imageUrl?: string;
  title: string;
}) => {
  if (!imageUrl) {
    return <span className="text-gray-400">-</span>;
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="link" className="p-0 h-auto text-blue-500">
          Lihat
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription className="flex justify-center p-4">
            <img
              src={imageUrl}
              alt={title}
              className="max-w-full h-auto rounded-md"
            />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Tutup</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RekapKehadiran;
