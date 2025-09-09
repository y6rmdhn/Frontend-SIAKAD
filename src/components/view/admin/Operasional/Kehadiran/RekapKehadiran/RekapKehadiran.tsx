import { useEffect, useMemo, useState, useCallback } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { useQuery } from "@tanstack/react-query";

// UI & Custom Components
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
import CustomCard from "@/components/blocks/Card";
import CustomPagination from "@/components/blocks/CustomPagination";
import SearchInput from "@/components/blocks/SearchInput";
import SelectFilter from "@/components/blocks/SelectFilter";
import Title from "@/components/blocks/Title";

// Icons
import { IoEyeOutline } from "react-icons/io5";

// Services
import adminServices from "@/services/admin.services";

// --- Type Definitions ---
// Defines a single item in the rekap list
interface RekapItem {
  nip: string;
  nama_pegawai: string;
  unit_kerja: string;
  hari_kerja: number;
  hadir: number;
  terlambat: number;
  sakit: number;
  izin: number;
  alpa: number; // Corrected from 'alpha' if it was a typo
  cuti: number;
  aksi: {
    detail_url: string;
  };
}

// Defines the structure for filter options provided by the API
interface UnitKerjaOption {
  id: string;
  nama_unit: string;
}

// Defines the entire API response structure
interface ApiResponse {
  data: RekapItem[];
  filter_options: {
    unit_kerja: UnitKerjaOption[];
  };
  filters: {
    tanggal_awal: string;
    tanggal_akhir: string;
  };
  pagination: {
    current_page: number;
    last_page: number;
  };
}

// --- Component Definition ---
const RekapKehadiran = () => {
  const [searchParam, setSearchParam] = useSearchParams();

  // --- State & URL Params ---
  const [searchData, setSearchData] = useState(searchParam.get("search") || "");
  const [debouncedSearch] = useDebounce(searchData, 500);

  const currentPage = searchParam.get("page") || "1";
  const unitKerjaFilter = searchParam.get("unit_kerja_id") || "";
  const tanggalAwalFilter = searchParam.get("tanggal_awal") || "";
  const tanggalAkhirFilter = searchParam.get("tanggal_akhir") || "";

  // --- Data Fetching ---
  const { data, isLoading, isError, error } = useQuery<ApiResponse>({
    queryKey: [
      "rekap-kehadiran",
      currentPage,
      debouncedSearch,
      unitKerjaFilter,
      tanggalAwalFilter,
      tanggalAkhirFilter,
    ],
    queryFn: async () => {
      const response = await adminServices.getRekapKehadiran({
        page: currentPage,
        search: debouncedSearch,
        unit_kerja_id: unitKerjaFilter,
        tanggal_awal: tanggalAwalFilter,
        tanggal_akhir: tanggalAkhirFilter,
      });
      return response.data;
    },
    // FIX: Replace `keepPreviousData` with `placeholderData`
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
    // This effect now safely depends on specific data properties and the memoized handler
    if (!searchParam.has("page")) {
      handleUrlChange("page", "1");
    }
    if (!tanggalAwalFilter && data?.filters?.tanggal_awal) {
      handleUrlChange("tanggal_awal", data.filters.tanggal_awal);
    }
    if (!tanggalAkhirFilter && data?.filters?.tanggal_akhir) {
      handleUrlChange("tanggal_akhir", data.filters.tanggal_akhir);
    }
  }, [
    data?.filters?.tanggal_awal,
    data?.filters?.tanggal_akhir,
    handleUrlChange,
    searchParam,
    tanggalAwalFilter,
    tanggalAkhirFilter,
  ]);

  // --- Loading & Error States ---
  if (isLoading && !data) {
    return (
      <div className="mt-10 mb-20 space-y-6">
        <Title title="Rekapitulasi Presensi" />
        <div className="p-6 border rounded-lg mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
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
      <Title
        title="Rekapitulasi Presensi"
        subTitle="Presensi Bulanan Pegawai"
      />

      <CustomCard
        title="Filter Data"
        actions={
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="flex flex-col gap-2">
              <Label>Unit Kerja</Label>
              <SelectFilter
                placeholder="-- Semua Unit Kerja --"
                options={unitKerjaOptions}
                value={unitKerjaFilter}
                onValueChange={(value) =>
                  handleUrlChange("unit_kerja_id", value)
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Tanggal Awal</Label>
              <Input
                type="date"
                value={tanggalAwalFilter}
                onChange={(e) =>
                  handleUrlChange("tanggal_awal", e.target.value)
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Tanggal Akhir</Label>
              <Input
                type="date"
                value={tanggalAkhirFilter}
                onChange={(e) =>
                  handleUrlChange("tanggal_akhir", e.target.value)
                }
              />
            </div>
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
              <TableHead>
                <Checkbox />
              </TableHead>
              <TableHead>NIP</TableHead>
              <TableHead>Nama Pegawai</TableHead>
              <TableHead>Unit Kerja</TableHead>
              <TableHead className="text-center">Hari Kerja</TableHead>
              <TableHead className="text-center">Hadir</TableHead>
              <TableHead className="text-center">Terlambat</TableHead>
              <TableHead className="text-center">Sakit</TableHead>
              <TableHead className="text-center">Izin</TableHead>
              <TableHead className="text-center">Alpa</TableHead>
              <TableHead className="text-center">Cuti</TableHead>
              <TableHead className="text-center">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data?.length ? (
              data.data.map((item) => (
                <TableRow key={item.nip}>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell>{item.nip}</TableCell>
                  <TableCell>{item.nama_pegawai}</TableCell>
                  <TableCell>{item.unit_kerja}</TableCell>
                  <TableCell className="text-center">
                    {item.hari_kerja}
                  </TableCell>
                  <TableCell className="text-center">{item.hadir}</TableCell>
                  <TableCell className="text-center">
                    {item.terlambat}
                  </TableCell>
                  <TableCell className="text-center">{item.sakit}</TableCell>
                  <TableCell className="text-center">{item.izin}</TableCell>
                  <TableCell className="text-center">{item.alpa}</TableCell>
                  <TableCell className="text-center">{item.cuti}</TableCell>
                  <TableCell className="text-center">
                    <Link to={item.aksi.detail_url} target="_blank">
                      <Button size="icon" variant="ghost">
                        <IoEyeOutline className="text-blue-500" />
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={13} className="text-center h-48">
                  Tidak ada data rekapitulasi untuk ditampilkan.
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

export default RekapKehadiran;
