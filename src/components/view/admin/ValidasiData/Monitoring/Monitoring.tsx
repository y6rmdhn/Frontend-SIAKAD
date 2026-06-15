import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";

// UI Components
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
import { IoEyeOutline } from "react-icons/io5";
import { FaHourglassHalf, FaCheckCircle, FaTimesCircle, FaFileAlt } from "react-icons/fa";

// Services
import adminServices from "@/services/admin.services";

// --- Route Map for Categories ---
const routeMap: Record<string, string> = {
  DataHubunganKerja: "/admin/validasi-data/kepegawaian/hubungan-kerja",
  DataPangkat: "/admin/validasi-data/kepegawaian/pangkat",
  DataJabatanFungsional: "/admin/validasi-data/kepegawaian/jabatan-fungsional",
  DataJabatanStruktural: "/admin/validasi-data/kepegawaian/jabatan-struktural",
  DataKeluarga: "/admin/validasi-data/keluarga",
  DataKemampuanBahasa: "/admin/validasi-data/pengembangan/kemampuan-bahasa",
  DataOrganisasi: "/admin/validasi-data/pengembangan/organisasi",
  DataPendidikanFormal: "/admin/validasi-data/kualifikasi/pendidikan-formal",
  DataPenelitian: "/admin/validasi-data/pelaksanaan-penelitian/penelitian",
  DataPenghargaan: "/admin/validasi-data/penunjang/penghargaan",
  DataPenunjangLainnya: "/admin/validasi-data/penunjang/penunjang-lain",
  DataPublikasi: "/admin/validasi-data/pelaksanaan-penelitian/publikasi",
  DataRiwayatPekerjaan: "/admin/validasi-data/kualifikasi/riwayat-pekerjaan",
  DataSertifikasi: "/admin/validasi-data/kompetensi/sertifikasi",
  DataTest: "/admin/validasi-data/kompetensi/tes",
};

const Monitoring = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const [activeTab, setActiveTab] = useState<"summary" | "submissions">("summary");

  // --- States ---
  const [searchCategory, setSearchCategory] = useState("");
  const [debouncedCategory] = useDebounce(searchCategory, 300);

  const currentPage = Number(searchParam.get("page") || 1);
  const statusFilter = searchParam.get("status") || "semua";

  // --- Fetch Data ---
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["monitoring-validasi-data", currentPage, statusFilter],
    queryFn: async () => {
      const params: any = {
        page: currentPage,
        limit: 10,
      };
      if (statusFilter && statusFilter !== "semua") {
        params.status = statusFilter;
      }
      const response = await adminServices.getMonitoringValidasiData(params);
      return response.data.data;
    },
  });

  // --- Synchronize URL Param for Page ---
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

  // --- Derived Filtering & Memos ---
  const filteredDetails = useMemo(() => {
    if (!data?.details || !Array.isArray(data.details)) return [];
    return data.details.filter((detail: any) =>
      detail.label.toLowerCase().includes(debouncedCategory.toLowerCase())
    );
  }, [data?.details, debouncedCategory]);

  const summary = useMemo(() => {
    return data?.summary || { diajukan: 0, disetujui: 0, ditolak: 0, draft: 0 };
  }, [data]);

  const submissions = useMemo(() => {
    return data?.submissions || [];
  }, [data]);

  const pagination = useMemo(() => {
    return data?.pagination || { total_items: 0, total_pages: 1, current_page: 1, limit: 10 };
  }, [data]);

  const statusOptions = [
    { value: "semua", label: "Semua Status" },
    { value: "diajukan", label: "Diajukan" },
    { value: "disetujui", label: "Disetujui" },
    { value: "ditolak", label: "Ditolak" },
    { value: "draft", label: "Draft" },
  ];

  if (isLoading && !data) {
    return (
      <div className="mt-10 mb-20 space-y-6">
        <Title title="Monitoring Validasi Data" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32 w-full rounded-xl" />
          ))}
        </div>
        <Skeleton className="h-12 w-80 rounded-xl" />
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
      <div className="text-center mt-20 p-6 max-w-lg mx-auto bg-red-50 rounded-xl border border-red-200">
        <Title title="Monitoring Validasi Data" />
        <p className="text-red-600 font-semibold mt-4">Gagal memuat data monitoring</p>
        <p className="text-red-500 text-sm mt-1">{(error as Error).message}</p>
      </div>
    );
  }

  return (
    <div className="mt-10 mb-20 space-y-8">
      {/* Title */}
      <Title title="Monitoring Validasi Data" />

      {/* --- Stat Cards (Summary KPI) --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Diajukan Card */}
        <div className="relative overflow-hidden bg-gradient-to-br from-amber-500 to-orange-600 text-white p-6 rounded-2xl shadow-lg border border-amber-500/10">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-amber-100 text-xs font-semibold uppercase tracking-wider">Total Diajukan</p>
              <h3 className="text-4xl font-extrabold mt-1 tracking-tight">{summary.diajukan}</h3>
            </div>
            <div className="p-3 bg-white/10 rounded-xl backdrop-blur-md">
              <FaHourglassHalf className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        {/* Disetujui Card */}
        <div className="relative overflow-hidden bg-gradient-to-br from-emerald-500 to-teal-600 text-white p-6 rounded-2xl shadow-lg border border-emerald-500/10">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-emerald-100 text-xs font-semibold uppercase tracking-wider">Total Disetujui</p>
              <h3 className="text-4xl font-extrabold mt-1 tracking-tight">{summary.disetujui}</h3>
            </div>
            <div className="p-3 bg-white/10 rounded-xl backdrop-blur-md">
              <FaCheckCircle className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        {/* Ditolak Card */}
        <div className="relative overflow-hidden bg-gradient-to-br from-rose-500 to-red-600 text-white p-6 rounded-2xl shadow-lg border border-rose-500/10">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-rose-100 text-xs font-semibold uppercase tracking-wider">Total Ditolak</p>
              <h3 className="text-4xl font-extrabold mt-1 tracking-tight">{summary.ditolak}</h3>
            </div>
            <div className="p-3 bg-white/10 rounded-xl backdrop-blur-md">
              <FaTimesCircle className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        {/* Draft Card */}
        <div className="relative overflow-hidden bg-gradient-to-br from-slate-500 to-slate-600 text-white p-6 rounded-2xl shadow-lg border border-slate-500/10">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-slate-100 text-xs font-semibold uppercase tracking-wider">Total Draft</p>
              <h3 className="text-4xl font-extrabold mt-1 tracking-tight">{summary.draft}</h3>
            </div>
            <div className="p-3 bg-white/10 rounded-xl backdrop-blur-md">
              <FaFileAlt className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* --- Tabs & Navigation --- */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab("summary")}
          className={`px-6 py-3 font-semibold text-sm transition-all border-b-2 ${
            activeTab === "summary"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Ringkasan per Kategori
        </button>
        <button
          onClick={() => setActiveTab("submissions")}
          className={`px-6 py-3 font-semibold text-sm transition-all border-b-2 ${
            activeTab === "submissions"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Pengajuan Riwayat Terbaru
        </button>
      </div>

      {/* --- Tab 1: Ringkasan per Kategori --- */}
      {activeTab === "summary" && (
        <div className="space-y-6">
          <CustomCard title="Cari Kategori Riwayat">
            <div className="w-full md:w-80">
              <SearchInput
                value={searchCategory}
                onChange={(e) => setSearchCategory(e.target.value)}
                placeholder="Cari kategori riwayat..."
                className="w-full"
              />
            </div>
          </CustomCard>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h4 className="font-bold text-gray-800 text-lg font-sans">Detail Validasi per Modul</h4>
              <span className="text-xs font-semibold px-3 py-1 bg-blue-50 text-blue-600 rounded-full border border-blue-100">
                {filteredDetails.length} Kategori
              </span>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50 border-b border-gray-100">
                    <TableHead className="font-bold text-gray-700">Nama Riwayat / Modul</TableHead>
                    <TableHead className="text-center font-bold text-gray-700">Diajukan</TableHead>
                    <TableHead className="text-center font-bold text-gray-700">Disetujui</TableHead>
                    <TableHead className="text-center font-bold text-gray-700">Ditolak</TableHead>
                    <TableHead className="text-center font-bold text-gray-700">Draft</TableHead>
                    <TableHead className="text-center w-24 font-bold text-gray-700">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDetails.length > 0 ? (
                    filteredDetails.map((item: any) => {
                      const listUrl = routeMap[item.name] || "#";
                      return (
                        <TableRow key={item.name} className="hover:bg-blue-50/10 border-b border-gray-100 transition-colors">
                          <TableCell className="font-bold text-gray-800 py-4">{item.label}</TableCell>
                          
                          {/* Diajukan Count */}
                          <TableCell className="text-center">
                            <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-bold ${
                              item.statusCounts.diajukan > 0 ? "bg-amber-50 text-amber-700" : "bg-gray-50 text-gray-400"
                            }`}>
                              {item.statusCounts.diajukan}
                            </span>
                          </TableCell>

                          {/* Disetujui Count */}
                          <TableCell className="text-center">
                            <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-bold ${
                              item.statusCounts.disetujui > 0 ? "bg-emerald-50 text-emerald-700" : "bg-gray-50 text-gray-400"
                            }`}>
                              {item.statusCounts.disetujui}
                            </span>
                          </TableCell>

                          {/* Ditolak Count */}
                          <TableCell className="text-center">
                            <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-bold ${
                              item.statusCounts.ditolak > 0 ? "bg-rose-50 text-rose-700" : "bg-gray-50 text-gray-400"
                            }`}>
                              {item.statusCounts.ditolak}
                            </span>
                          </TableCell>

                          {/* Draft Count */}
                          <TableCell className="text-center">
                            <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-bold ${
                              item.statusCounts.draft > 0 ? "bg-slate-100 text-slate-700" : "bg-gray-50 text-gray-400"
                            }`}>
                              {item.statusCounts.draft}
                            </span>
                          </TableCell>

                          {/* Action */}
                          <TableCell className="text-center">
                            <Link to={listUrl}>
                              <Button size="icon" variant="ghost" className="hover:bg-blue-50 rounded-xl transition-all">
                                <IoEyeOutline className="w-5 h-5 text-blue-500" />
                              </Button>
                            </Link>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-16 text-gray-400 font-medium">
                        Kategori riwayat tidak ditemukan.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      )}

      {/* --- Tab 2: Pengajuan Riwayat Terbaru --- */}
      {activeTab === "submissions" && (
        <div className="space-y-6">
          <CustomCard title="Filter Pengajuan">
            <div className="w-full md:w-80 flex flex-col gap-2">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Status Validasi</label>
              <SelectFilter
                options={statusOptions}
                value={statusFilter}
                onValueChange={(v) => handleUrlChange("status", v)}
                placeholder="-- Pilih Status --"
              />
            </div>
          </CustomCard>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h4 className="font-bold text-gray-800 text-lg">Daftar Pengajuan Riwayat Pegawai</h4>
              <span className="text-xs font-semibold px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full border border-blue-100">
                Total {pagination.total_items} Pengajuan
              </span>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50 border-b border-gray-100">
                    <TableHead className="font-bold text-gray-700">Pegawai</TableHead>
                    <TableHead className="font-bold text-gray-700">Jenis Riwayat</TableHead>
                    <TableHead className="text-center font-bold text-gray-700">Tgl. Diajukan</TableHead>
                    <TableHead className="text-center font-bold text-gray-700">Status</TableHead>
                    <TableHead className="text-center w-24 font-bold text-gray-700">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {submissions.length > 0 ? (
                    submissions.map((item: any) => {
                      const parentUrl = routeMap[item.jenis_pengajuan] || "#";
                      const detailUrl = item.status === "diajukan" 
                        ? `${parentUrl}` 
                        : `${parentUrl}`;

                      const initials = item.pegawai?.nama
                        ? item.pegawai.nama
                            .split(" ")
                            .slice(0, 2)
                            .map((n: string) => n[0])
                            .join("")
                            .toUpperCase()
                        : "?";

                      const statusColors: Record<string, string> = {
                        diajukan: "bg-amber-50 text-amber-700 border-amber-100",
                        disetujui: "bg-emerald-50 text-emerald-700 border-emerald-100",
                        ditolak: "bg-rose-50 text-rose-700 border-rose-100",
                        draft: "bg-slate-100 text-slate-700 border-slate-200",
                      };

                      return (
                        <TableRow key={item.id} className="hover:bg-blue-50/10 border-b border-gray-100 transition-colors">
                          {/* Pegawai Info */}
                          <TableCell className="flex items-center gap-4 py-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-100 to-indigo-100 text-blue-600 flex items-center justify-center font-bold text-sm shadow-sm border border-blue-200">
                              {initials}
                            </div>
                            <div>
                              <p className="font-bold text-gray-900 leading-snug">{item.pegawai?.nama || "-"}</p>
                              <p className="text-xs font-semibold text-blue-600 tracking-wider mt-0.5">{item.pegawai?.nip || "-"}</p>
                            </div>
                          </TableCell>

                          {/* Jenis Riwayat */}
                          <TableCell className="font-semibold text-gray-800">{item.label}</TableCell>

                          {/* Created At */}
                          <TableCell className="text-center font-medium text-gray-600">
                            {item.created_at ? new Date(item.created_at).toLocaleDateString("id-ID", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            }) : "-"}
                          </TableCell>

                          {/* Status */}
                          <TableCell className="text-center">
                            <span className={`inline-flex px-3 py-1 rounded-xl text-xs font-bold border capitalize ${
                              statusColors[item.status] || "bg-slate-50 text-slate-500"
                            }`}>
                              {item.status}
                            </span>
                          </TableCell>

                          {/* Action Link to Validation */}
                          <TableCell className="text-center">
                            <Link to={detailUrl}>
                              <Button size="icon" variant="ghost" className="hover:bg-blue-50 rounded-xl transition-all">
                                <IoEyeOutline className="w-5 h-5 text-blue-500" />
                              </Button>
                            </Link>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-16 text-gray-400 font-medium">
                        Tidak ada pengajuan riwayat.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Submissions Pagination */}
            {submissions.length > 0 && (
              <div className="p-6 border-t border-gray-100 bg-gray-50/50">
                <CustomPagination
                  currentPage={currentPage}
                  totalPages={pagination.total_pages}
                  onPageChange={(page) => handleUrlChange("page", String(page))}
                  hasNextPage={currentPage < pagination.total_pages}
                  hasPrevPage={currentPage > 1}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Monitoring;
