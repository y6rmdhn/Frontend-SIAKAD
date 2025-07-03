import { useEffect, useMemo, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { useQuery } from "@tanstack/react-query";

// UI & Custom Components
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CustomCard from "@/components/blocks/Card";
import CustomPagination from "@/components/blocks/CustomPagination";
import SearchInput from "@/components/blocks/SearchInput";
import SelectFilter from "@/components/blocks/SelectFilter";
import Title from "@/components/blocks/Title";

// Services
import adminServices from "@/services/admin.services";

// --- Type Definitions ---
interface MonitoringItem {
  id: number;
  nip: string;
  nama_pegawai: string;
  unit_kerja: string;
  kehadiran: string;
  status: string;
}

interface FilterOption {
  value: string | number;
  label: string;
}

interface ApiResponse {
  hari: string;
  data: MonitoringItem[];
  filter_options: {
    unit_kerja: FilterOption[];
    status_presensi: FilterOption[];
  };
  pagination: {
    current_page: number;
    last_page: number;
  };
}

// --- Component Definition ---
const DaftarMonitoringKehadiran = () => {
  const [searchParam, setSearchParam] = useSearchParams();

  // --- State & URL Params ---
  const [searchData, setSearchData] = useState(searchParam.get("search") || "");
  const [debouncedSearch] = useDebounce(searchData, 500);

  const currentPage = searchParam.get("page") || "1";
  const unitKerjaFilter = searchParam.get("unit_kerja") || "";
  const statusFilter = searchParam.get("status_presensi") || "";

  // --- Data Fetching ---
  const { data, isLoading, isError, error } = useQuery<ApiResponse>({
    queryKey: [
      "monitoring-presensi",
      currentPage,
      debouncedSearch,
      unitKerjaFilter,
      statusFilter,
    ],
    queryFn: async () => {
      const response = await adminServices.getDataMonitoringPresensi({
        page: currentPage,
        search: debouncedSearch,
        unit_kerja: unitKerjaFilter,
        status_presensi: statusFilter,
      });
      return response.data;
    },
    placeholderData: (previousData) => previousData,
  });

  // --- Memos & Event Handlers ---
  const filterOptions = useMemo(() => {
    const options = data?.filter_options;
    return {
      unitKerja:
        options?.unit_kerja?.map((opt) => ({
          // Pastikan value selalu string
          value: String(opt.value),
          label: opt.label,
        })) || [],
      statusPresensi:
        options?.status_presensi?.map((opt) => ({
          // FIX: Pastikan value selalu string untuk mengatasi error
          value: String(opt.value),
          label: opt.label,
        })) || [],
    };
  }, [data]);

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
  }, [searchParam, handleUrlChange]);

  // --- Loading & Error States ---
  if (isLoading && !data) {
    return (
      <div className="mt-10 mb-20 space-y-6">
        <Title title="Daftar Monitoring Kehadiran" />
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
      <Title title="Daftar Monitoring Kehadiran" subTitle={data?.hari || ""} />

      <CustomCard
        title="Filter Data"
        actions={
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SelectFilter
              label="Unit Kerja"
              options={filterOptions.unitKerja}
              placeholder="-- Semua Unit Kerja --"
              value={unitKerjaFilter}
              onValueChange={(value) => handleUrlChange("unit_kerja", value)}
            />
            <SelectFilter
              label="Status Kehadiran"
              options={filterOptions.statusPresensi}
              placeholder="-- Semua Status --"
              value={statusFilter}
              onValueChange={(value) =>
                handleUrlChange("status_presensi", value)
              }
            />
          </div>
        }
      />

      <div className="mt-10 w-full md:w-80">
        <SearchInput
          value={searchData}
          onChange={(e) => setSearchData(e.target.value)}
          placeholder="Cari NIP atau Nama Pegawai..."
        />
      </div>

      <div className="mt-5 border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100 hover:bg-gray-100">
              <TableHead>NIP</TableHead>
              <TableHead>Nama Pegawai</TableHead>
              <TableHead>Unit Kerja</TableHead>
              <TableHead className="text-center">Kehadiran</TableHead>
              <TableHead className="text-center">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data?.length ? (
              data.data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.nip}</TableCell>
                  <TableCell>{item.nama_pegawai}</TableCell>
                  <TableCell>{item.unit_kerja}</TableCell>
                  <TableCell className="text-center">
                    {item.kehadiran}
                  </TableCell>
                  <TableCell className="text-center">{item.status}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center h-48">
                  Tidak ada data untuk ditampilkan.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {data?.pagination && data.data.length > 0 && (
        <CustomPagination
          currentPage={data.pagination.current_page}
          totalPages={data.pagination.last_page}
          onPageChange={(page) => handleUrlChange("page", String(page))}
        />
      )}
    </div>
  );
};

export default DaftarMonitoringKehadiran;
