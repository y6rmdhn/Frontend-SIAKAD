import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";

// UI & Custom Components
import Title from "@/components/blocks/Title";
import CustomCard from "@/components/blocks/Card";
import SearchInput from "@/components/blocks/SearchInput";
import SelectFilter from "@/components/blocks/SelectFilter";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CustomPagination from "@/components/blocks/CustomPagination";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

// Icons
import { MdEdit } from "react-icons/md";

// Services
import adminServices from "@/services/admin.services";

// --- Tipe Data ---
interface PegawaiItem {
  id: string;
  nip: string;
  nama_pegawai: string;
  unit_kerja: string;
  hubungan_kerja: string;
  jabatan_fungsional: string;
  usia_pensiun: string;
  tanggal_lahir: string;
  tanggal_efektif: string;
  tanggal_berakhir: string;
  aksi: {
    detail_url: string;
  };
}

interface ApiResponse {
  data: PegawaiItem[];
  pagination: {
    current_page: number;
    last_page: number;
  };
  filter_options: {
    unit_kerja: any[];
    hubungan_kerja: any[];
    status_masa_kerja: any[];
    level_filter: any[]; // Menambahkan level filter
  };
  summary: {
    total_pegawai: number;
    hampir_berakhir_kontrak: number;
    hampir_pensiun_usia: number;
  };
  table_columns: any[];
}

// --- Komponen Utama ---
const HubunganKerjaPegawai = () => {
  const [searchParam, setSearchParam] = useSearchParams();

  // --- State & URL Params ---
  const [searchData, setSearchData] = useState(searchParam.get("search") || "");
  const [debouncedSearch] = useDebounce(searchData, 500);

  const currentPage = searchParam.get("page") || "1";
  const unitKerjaFilter = searchParam.get("unit_kerja") || "";
  const hubunganKerjaFilter = searchParam.get("hubungan_kerja") || "";
  const statusMasaKerjaFilter = searchParam.get("status_masa_kerja") || "";
  const levelFilter = searchParam.get("level") || "seuniv"; // Default ke 'seuniv'

  // --- Data Fetching ---
  const { data, isLoading, isError, error } = useQuery<ApiResponse>({
    queryKey: [
      "monitoring-hubungan-kerja",
      currentPage,
      debouncedSearch,
      unitKerjaFilter,
      hubunganKerjaFilter,
      statusMasaKerjaFilter,
      levelFilter,
    ],
    queryFn: async () => {
      const response = await adminServices.getHubunganKerjaMonitoring({
        page: currentPage,
        search: debouncedSearch,
        unit_kerja: unitKerjaFilter,
        hubungan_kerja: hubunganKerjaFilter,
        status_masa_kerja: statusMasaKerjaFilter,
        level: levelFilter,
      });
      return response.data;
    },
    // @ts-ignore
    keepPreviousData: true,
  });

  // --- Memos & Event Handlers ---
  const filterOptions = useMemo(() => {
    // @ts-ignore
    const filters = data?.filter_options || {};
    return {
      unitKerja:
        filters.unit_kerja?.map((opt: any) => ({
          value: String(opt.id),
          label: opt.nama,
        })) || [],
      hubunganKerja:
        // @ts-ignore
        filters.hubungan_kerja?.map((opt: any) => ({
          value: String(opt.id),
          label: opt.nama,
        })) || [],
      statusMasaKerja:
        // @ts-ignore
        filters.status_masa_kerja?.map((opt: any) => ({
          value: String(opt.id),
          label: opt.nama,
        })) || [],
      levelFilter:
        // @ts-ignore
        filters.level_filter?.map((opt: any) => ({
          value: String(opt.id),
          label: opt.nama,
        })) || [],
    };
  }, [data]);

  const handleUrlChange = (paramName: string, value: string) => {
    const newSearchParams = new URLSearchParams(searchParam);
    if (value && value !== "semua") {
      newSearchParams.set(paramName, value);
    } else {
      newSearchParams.delete(paramName);
    }
    if (paramName !== "page") newSearchParams.set("page", "1");
    setSearchParam(newSearchParams);
  };

  useEffect(() => {
    handleUrlChange("search", debouncedSearch);
  }, [debouncedSearch]);

  if (isLoading && !data) {
    return (
      <div className="mt-10 mb-20 space-y-6">
        <Title title="Monitoring Hubungan Kerja" />
        <Skeleton className="h-24 w-full" />
        <div className="mt-10 space-y-2">
          <Skeleton className="h-10 w-full" />
          {[...Array(5)].map((_, i) => (
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
    <div className="mt-10 mb-10">
      <Title title="Monitoring Hubungan Kerja" />
      <CustomCard title="Filter Data">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <SelectFilter
            label="Level"
            placeholder="--Pilih Level--"
            options={filterOptions.levelFilter}
            value={levelFilter}
            onValueChange={(v) => handleUrlChange("level", v)}
          />
          <SelectFilter
            label="Unit Kerja"
            placeholder="--Semua Unit Kerja--"
            options={filterOptions.unitKerja}
            value={unitKerjaFilter}
            onValueChange={(v) => handleUrlChange("unit_kerja", v)}
          />
          <SelectFilter
            label="Hubungan Kerja"
            placeholder="--Semua Hubungan Kerja--"
            options={filterOptions.hubunganKerja}
            value={hubunganKerjaFilter}
            onValueChange={(v) => handleUrlChange("hubungan_kerja", v)}
          />
          <SelectFilter
            label="Status Masa Kerja"
            placeholder="--Semua Status--"
            options={filterOptions.statusMasaKerja}
            value={statusMasaKerjaFilter}
            onValueChange={(v) => handleUrlChange("status_masa_kerja", v)}
          />
        </div>
      </CustomCard>
      <div className="w-full md:w-80 my-6">
        <SearchInput
          value={searchData}
          onChange={(e) => setSearchData(e.target.value)}
          placeholder="Cari NIP atau Nama Pegawai..."
        />
      </div>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100 hover:bg-gray-100">
              {
                // @ts-ignore
                data?.table_columns?.map((col: any) => (
                  <TableHead key={col.field} className="text-center">
                    {col.label}
                  </TableHead>
                ))
              }
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              // @ts-ignore
              data?.data.length > 0 ? (
                // @ts-ignore
                data.data.map((item: any) => (
                  <TableRow key={item.id} className="even:bg-gray-50">
                    <TableCell className="text-left align-top">
                      <p className="font-semibold text-blue-600">{item.nip}</p>
                      <p>{item.nama_pegawai}</p>
                      <p className="text-xs text-gray-500">{item.unit_kerja}</p>
                    </TableCell>
                    <TableCell className="text-center align-middle">
                      {item.hubungan_kerja}
                    </TableCell>
                    <TableCell className="text-center align-middle">
                      {item.jabatan_fungsional}
                    </TableCell>
                    <TableCell className="text-center align-middle">
                      {item.usia_pensiun}
                    </TableCell>
                    <TableCell className="text-center align-middle">
                      {item.tanggal_lahir}
                    </TableCell>
                    <TableCell className="text-center align-middle">
                      {item.tanggal_efektif}
                    </TableCell>
                    <TableCell className="text-center align-middle">
                      {item.tanggal_berakhir}
                    </TableCell>
                    <TableCell className="text-center align-middle">
                      <Link to={item.aksi.detail_url}>
                        <Button size="icon" variant="ghost">
                          <MdEdit className="w-5 h-5 text-yellow-500" />
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    // @ts-ignore
                    colSpan={data?.table_columns?.length || 8}
                    className="text-center h-48"
                  >
                    Tidak ada data untuk ditampilkan.
                  </TableCell>
                </TableRow>
              )
            }
          </TableBody>
        </Table>
      </div>
      // @ts-ignore
      {
        // @ts-ignore
        data?.data && data.data.length > 0 && (
          <CustomPagination
            // @ts-ignore
            currentPage={data.pagination.current_page}
            // @ts-ignore
            totalPages={data.pagination.last_page}
            // @ts-ignore
            onPageChange={(page) => handleUrlChange("page", String(page))}
            // @ts-ignore
            hasNextPage={
              // @ts-ignore
              data.pagination.current_page < data.pagination.last_page
            }
            // @ts-ignore
            hasPrevPage={data.pagination.current_page > 1}
          />
        )
      }
    </div>
  );
};

export default HubunganKerjaPegawai;
