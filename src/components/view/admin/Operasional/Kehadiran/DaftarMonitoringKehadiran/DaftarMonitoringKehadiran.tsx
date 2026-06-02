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
import { Badge } from "@/components/ui/badge";

// Icons
import { FaCalendarAlt, FaRegClock, FaMapMarkerAlt, FaUsers, FaUserClock, FaTimesCircle, FaCheckCircle } from "react-icons/fa";

// Services
import adminServices from "@/services/admin.services";

// --- Type Definitions ---
interface PegawaiItem {
  id: string;
  nama: string;
  nip: string;
}

interface SettingAbsensiItem {
  id: string;
  nama_gedung: string;
}

interface JenisKehadiranItem {
  id: string;
  kode: string;
  nama: string;
}

interface AbsensiItem {
  id: string;
  tgl_absensi: string;
  jam_masuk: string | null;
  jam_keluar: string | null;
  is_terlambat: boolean;
  durasi_terlambat: number | null;
  is_pulang_awal: boolean;
  durasi_pulang_awal: number | null;
  durasi_kerja: number | null;
  lokasi_absensi: string | null;
  foto_masuk: string | null;
  foto_keluar: string | null;
  pegawai: PegawaiItem;
  setting_absensi: SettingAbsensiItem | null;
  jenis_kehadiran: JenisKehadiranItem;
}

interface ApiResponse {
  items: AbsensiItem[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

const DaftarMonitoringKehadiran = () => {
  const [searchParam, setSearchParam] = useSearchParams();

  // --- State & URL Params ---
  const [searchData, setSearchData] = useState(searchParam.get("search") || "");
  const [debouncedSearch] = useDebounce(searchData, 300);

  const currentPage = Number(searchParam.get("page") || 1);
  const startDateFilter = searchParam.get("tgl_mulai") || "";
  const endDateFilter = searchParam.get("tgl_selesai") || "";
  const monthFilter = searchParam.get("bulan") || "semua";
  const yearFilter = searchParam.get("tahun") || "semua";

  // --- Sync Search to URL ---
  useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParam);
    if (debouncedSearch) {
      newSearchParams.set("search", debouncedSearch);
    } else {
      newSearchParams.delete("search");
    }
    newSearchParams.set("page", "1");
    setSearchParam(newSearchParams);
  }, [debouncedSearch]);

  // --- Helper to Change URL Params ---
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

  // --- Data Fetching ---
  const { data, isLoading, isError, error } = useQuery<ApiResponse>({
    queryKey: [
      "monitoring-presensi-admin",
      currentPage,
      debouncedSearch,
      startDateFilter,
      endDateFilter,
      monthFilter,
      yearFilter,
    ],
    queryFn: async () => {
      const params: any = {
        page: currentPage,
        limit: 10,
        search: debouncedSearch,
      };

      if (startDateFilter) params.tgl_mulai = startDateFilter;
      if (endDateFilter) params.tgl_selesai = endDateFilter;
      if (monthFilter !== "semua") params.bulan = monthFilter;
      if (yearFilter !== "semua") params.tahun = yearFilter;

      const response = await adminServices.getDataMonitoringPresensi(params);
      return response.data.data;
    },
  });

  // --- Derived Memos ---
  const items = useMemo(() => data?.items || [], [data]);
  const pagination = useMemo(() => data?.pagination, [data]);

  const stats = useMemo(() => {
    if (!items || items.length === 0) return { total: 0, terlambat: 0, tepatWaktu: 0 };
    let terlambat = 0;
    let tepatWaktu = 0;

    items.forEach((item) => {
      if (item.is_terlambat) {
        terlambat++;
      } else if (item.jam_masuk) {
        tepatWaktu++;
      }
    });

    return {
      total: items.length,
      terlambat,
      tepatWaktu,
    };
  }, [items]);

  const monthOptions = [
    { value: "semua", label: "Semua Bulan" },
    { value: "1", label: "Januari" },
    { value: "2", label: "Februari" },
    { value: "3", label: "Maret" },
    { value: "4", label: "April" },
    { value: "5", label: "Mei" },
    { value: "6", label: "Juni" },
    { value: "7", label: "Juli" },
    { value: "8", label: "Agustus" },
    { value: "9", label: "September" },
    { value: "10", label: "Oktobeer" },
    { value: "11", label: "November" },
    { value: "12", label: "Desember" },
  ];

  const currentYear = new Date().getFullYear();
  const yearOptions = [
    { value: "semua", label: "Semua Tahun" },
    ...[...Array(5)].map((_, i) => ({
      value: String(currentYear - i),
      label: String(currentYear - i),
    })),
  ];

  // --- Loading State ---
  if (isLoading && !data) {
    return (
      <div className="mt-10 mb-20 space-y-6 animate-pulse">
        <Title title="Daftar Monitoring Kehadiran" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-32 w-full rounded-2xl" />
          ))}
        </div>
        <Skeleton className="h-40 w-full rounded-2xl" />
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-14 w-full rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  // --- Error State ---
  if (isError) {
    return (
      <div className="text-center mt-20 p-8 max-w-md mx-auto bg-rose-50 border border-rose-200 rounded-2xl">
        <FaTimesCircle className="w-12 h-12 text-rose-500 mx-auto" />
        <h3 className="font-bold text-gray-800 mt-4 text-lg">Gagal Memuat Kehadiran</h3>
        <p className="text-rose-500 text-sm mt-1">{(error as Error).message}</p>
      </div>
    );
  }

  return (
    <div className="mt-10 mb-20 space-y-8">
      {/* Title */}
      <Title title="Daftar Monitoring Kehadiran" />

      {/* --- Stat Cards (Halaman ini saja) --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Absensi */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-blue-100 text-xs font-semibold uppercase tracking-wider">Total Absensi Hari Ini</p>
              <h3 className="text-4xl font-extrabold mt-1">{pagination?.total || stats.total}</h3>
            </div>
            <div className="p-3 bg-white/10 rounded-xl backdrop-blur-md">
              <FaUsers className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        {/* Tepat Waktu */}
        <div className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-emerald-100 text-xs font-semibold uppercase tracking-wider">Tepat Waktu (Hal. Ini)</p>
              <h3 className="text-4xl font-extrabold mt-1">{stats.tepatWaktu}</h3>
            </div>
            <div className="p-3 bg-white/10 rounded-xl backdrop-blur-md">
              <FaCheckCircle className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        {/* Terlambat */}
        <div className="bg-gradient-to-br from-rose-500 to-red-600 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-rose-100 text-xs font-semibold uppercase tracking-wider">Terlambat (Hal. Ini)</p>
              <h3 className="text-4xl font-extrabold mt-1">{stats.terlambat}</h3>
            </div>
            <div className="p-3 bg-white/10 rounded-xl backdrop-blur-md">
              <FaUserClock className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* --- Filter Section --- */}
      <CustomCard title="Filter & Pencarian Kehadiran">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
          {/* Tanggal Mulai */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Tanggal Mulai</label>
            <input
              type="date"
              className="w-full border rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={startDateFilter}
              onChange={(e) => handleUrlChange("tgl_mulai", e.target.value)}
            />
          </div>

          {/* Tanggal Selesai */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Tanggal Selesai</label>
            <input
              type="date"
              className="w-full border rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={endDateFilter}
              onChange={(e) => handleUrlChange("tgl_selesai", e.target.value)}
            />
          </div>

          {/* Bulan */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Bulan</label>
            <SelectFilter
              options={monthOptions}
              value={monthFilter}
              onValueChange={(v) => handleUrlChange("bulan", v)}
              placeholder="-- Pilih Bulan --"
            />
          </div>

          {/* Tahun */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Tahun</label>
            <SelectFilter
              options={yearOptions}
              value={yearFilter}
              onValueChange={(v) => handleUrlChange("tahun", v)}
              placeholder="-- Pilih Tahun --"
            />
          </div>
        </div>

        {/* Search */}
        <div className="w-full md:w-80 mt-6">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">Cari Pegawai</label>
          <SearchInput
            value={searchData}
            onChange={(e) => setSearchData(e.target.value)}
            placeholder="Cari NIP atau Nama Pegawai..."
            className="w-full"
          />
        </div>
      </CustomCard>

      {/* --- Table Section --- */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h4 className="font-bold text-gray-800 text-lg">Catatan Kehadiran Pegawai</h4>
          <span className="text-xs font-semibold px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full border border-blue-100">
            Total {pagination?.total || 0} Record
          </span>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 border-b border-gray-100 hover:bg-gray-50">
                <TableHead className="font-bold text-gray-700">Pegawai</TableHead>
                <TableHead className="font-bold text-gray-700 text-center">Tanggal</TableHead>
                <TableHead className="font-bold text-gray-700 text-center">Jam Masuk</TableHead>
                <TableHead className="font-bold text-gray-700 text-center">Jam Keluar</TableHead>
                <TableHead className="font-bold text-gray-700 text-center">Status</TableHead>
                <TableHead className="font-bold text-gray-700 text-center">Lokasi</TableHead>
                <TableHead className="font-bold text-gray-700 text-center">Durasi Kerja</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.length > 0 ? (
                items.map((item) => {
                  const initials = item.pegawai?.nama
                    ? item.pegawai.nama
                      .split(" ")
                      .slice(0, 2)
                      .map((n: string) => n[0])
                      .join("")
                      .toUpperCase()
                    : "?";

                  return (
                    <TableRow key={item.id} className="hover:bg-blue-50/10 border-b border-gray-100 transition-colors">
                      {/* Pegawai */}
                      <TableCell className="flex items-center gap-4 py-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-100 to-indigo-100 text-blue-600 flex items-center justify-center font-bold text-sm shadow-sm border border-blue-200">
                          {initials}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 leading-snug">{item.pegawai?.nama || "-"}</p>
                          <p className="text-xs font-semibold text-blue-600 tracking-wider mt-0.5">{item.pegawai?.nip || "-"}</p>
                        </div>
                      </TableCell>

                      {/* Tanggal */}
                      <TableCell className="text-center font-semibold text-gray-600">
                        <div className="flex items-center justify-center gap-1.5">
                          <FaCalendarAlt className="w-3.5 h-3.5 text-gray-400" />
                          <span>
                            {item.tgl_absensi
                              ? new Date(item.tgl_absensi).toLocaleDateString("id-ID", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })
                              : "-"}
                          </span>
                        </div>
                      </TableCell>

                      {/* Jam Masuk */}
                      <TableCell className="text-center">
                        {item.jam_masuk ? (
                          <div className="space-y-1">
                            <span className="font-bold text-gray-800">{item.jam_masuk}</span>
                            {item.is_terlambat && (
                              <p className="text-[10px] text-rose-600 font-extrabold bg-rose-50 border border-rose-100 rounded px-1.5 py-0.5 inline-block mx-auto">
                                Terlambat {item.durasi_terlambat}m
                              </p>
                            )}
                          </div>
                        ) : (
                          <span className="text-gray-400 font-semibold">-</span>
                        )}
                      </TableCell>

                      {/* Jam Keluar */}
                      <TableCell className="text-center">
                        {item.jam_keluar ? (
                          <div className="space-y-1">
                            <span className="font-bold text-gray-800">{item.jam_keluar}</span>
                            {item.is_pulang_awal && (
                              <p className="text-[10px] text-amber-600 font-extrabold bg-amber-50 border border-amber-100 rounded px-1.5 py-0.5 inline-block mx-auto">
                                Pulang Cepat {item.durasi_pulang_awal}m
                              </p>
                            )}
                          </div>
                        ) : (
                          <span className="text-gray-400 font-semibold">-</span>
                        )}
                      </TableCell>

                      {/* Status */}
                      <TableCell className="text-center">
                        <Badge
                          className={`font-extrabold px-3 py-1 rounded-xl text-xs uppercase tracking-wider select-none ${item.jenis_kehadiran?.kode === "HADIR"
                              ? item.is_terlambat
                                ? "bg-amber-50 text-amber-700 border border-amber-100"
                                : "bg-emerald-50 text-emerald-700 border border-emerald-100"
                              : "bg-blue-50 text-blue-700 border border-blue-100"
                            }`}
                        >
                          {item.jenis_kehadiran?.nama || "Hadir"}
                        </Badge>
                      </TableCell>

                      {/* Lokasi */}
                      <TableCell className="text-center">
                        {item.lokasi_absensi || item.setting_absensi?.nama_gedung ? (
                          <div className="flex items-center justify-center gap-1.5 text-xs text-gray-600 font-semibold">
                            <FaMapMarkerAlt className="w-3.5 h-3.5 text-rose-500" />
                            <span>{item.lokasi_absensi || item.setting_absensi?.nama_gedung}</span>
                          </div>
                        ) : (
                          <span className="text-gray-400 font-semibold">-</span>
                        )}
                      </TableCell>

                      {/* Durasi Kerja */}
                      <TableCell className="text-center font-bold text-gray-700">
                        {item.durasi_kerja ? (
                          <div className="flex items-center justify-center gap-1.5 text-xs">
                            <FaRegClock className="w-3.5 h-3.5 text-blue-500" />
                            <span>
                              {Math.floor(item.durasi_kerja / 60)}j {item.durasi_kerja % 60}m
                            </span>
                          </div>
                        ) : (
                          <span className="text-gray-400 font-semibold">-</span>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-16 text-gray-400 font-medium">
                    Tidak ada record kehadiran yang ditemukan.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {pagination && items.length > 0 && (
          <div className="p-6 border-t border-gray-100 bg-gray-50/50">
            <CustomPagination
              currentPage={currentPage}
              totalPages={pagination.totalPages}
              onPageChange={(page) => handleUrlChange("page", String(page))}
              hasNextPage={currentPage < pagination.totalPages}
              hasPrevPage={currentPage > 1}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DaftarMonitoringKehadiran;
