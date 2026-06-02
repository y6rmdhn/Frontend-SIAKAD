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
import { FaUsers, FaUserTie, FaUserShield } from "react-icons/fa";

// Services
import adminServices from "@/services/admin.services";

// --- Tipe Data ---
interface PegawaiItem {
  id: string;
  nama: string;
  nip: string;
  jenis_kelamin: string;
  email_pegawai: string;
  file_foto: string | null;
  status_kerja: string;
}

interface HubunganKerjaMonitoringItem {
  id: string;
  kode: string;
  nama: string;
  is_aktif: boolean;
  is_pns: boolean;
  list_pegawai: PegawaiItem[];
}

const HubunganKerjaPegawai = () => {
  const [searchParam, setSearchParam] = useSearchParams();

  // --- State & URL Params ---
  const [searchData, setSearchData] = useState(searchParam.get("search") || "");
  const [debouncedSearch] = useDebounce(searchData, 300);

  const currentPage = Number(searchParam.get("page") || 1);
  const selectedHubunganKerja = searchParam.get("hubungan_kerja") || "semua";
  const selectedGender = searchParam.get("gender") || "semua";

  // --- Data Fetching ---
  const { data, isLoading, isError, error } = useQuery<HubunganKerjaMonitoringItem[]>({
    queryKey: ["monitoring-hubungan-kerja"],
    queryFn: async () => {
      const response = await adminServices.getHubunganKerjaMonitoring();
      return response.data.data;
    },
  });

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

  // --- Derived Data & Stats ---
  const stats = useMemo(() => {
    if (!data || !Array.isArray(data)) {
      return { total: 0, pns: 0, nonPns: 0 };
    }
    let total = 0;
    let pns = 0;
    let nonPns = 0;

    data.forEach((hk) => {
      const count = hk.list_pegawai?.length || 0;
      total += count;
      if (hk.is_pns) {
        pns += count;
      } else {
        nonPns += count;
      }
    });

    return { total, pns, nonPns };
  }, [data]);

  const hubunganKerjaOptions = useMemo(() => {
    if (!data || !Array.isArray(data)) return [];
    return [
      { value: "semua", label: "Semua Hubungan Kerja" },
      ...data.map((hk) => ({
        value: hk.id,
        label: hk.nama,
      })),
    ];
  }, [data]);

  const genderOptions = [
    { value: "semua", label: "Semua Jenis Kelamin" },
    { value: "L", label: "Laki-laki" },
    { value: "P", label: "Perempuan" },
  ];

  // --- Flatten & Filter Pegawai ---
  const allPegawai = useMemo(() => {
    if (!data || !Array.isArray(data)) return [];
    const list: any[] = [];
    data.forEach((hk) => {
      if (hk.list_pegawai && Array.isArray(hk.list_pegawai)) {
        hk.list_pegawai.forEach((peg) => {
          list.push({
            id: peg.id,
            nama: peg.nama,
            nip: peg.nip,
            jenis_kelamin: peg.jenis_kelamin === "L" ? "Laki-laki" : peg.jenis_kelamin === "P" ? "Perempuan" : peg.jenis_kelamin || "-",
            jenis_kelamin_raw: peg.jenis_kelamin,
            email: peg.email_pegawai || "-",
            hubungan_kerja: hk.nama,
            hubungan_kerja_id: hk.id,
            is_pns: hk.is_pns,
          });
        });
      }
    });
    return list;
  }, [data]);

  const filteredPegawai = useMemo(() => {
    return allPegawai.filter((peg) => {
      const matchSearch =
        peg.nama.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        peg.nip.toLowerCase().includes(debouncedSearch.toLowerCase());

      const matchHubunganKerja =
        selectedHubunganKerja === "semua" || peg.hubungan_kerja_id === selectedHubunganKerja;

      const matchGender =
        selectedGender === "semua" || peg.jenis_kelamin_raw === selectedGender;

      return matchSearch && matchHubunganKerja && matchGender;
    });
  }, [allPegawai, debouncedSearch, selectedHubunganKerja, selectedGender]);

  // --- Client Side Pagination ---
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredPegawai.length / itemsPerPage) || 1;
  const paginatedPegawai = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredPegawai.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredPegawai, currentPage]);

  if (isLoading && !data) {
    return (
      <div className="mt-10 mb-20 space-y-6">
        <Title title="Monitoring Hubungan Kerja Pegawai" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-32 w-full rounded-xl" />
          ))}
        </div>
        <Skeleton className="h-24 w-full rounded-xl" />
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
        <Title title="Monitoring Hubungan Kerja" />
        <p className="text-red-600 font-semibold mt-4">Gagal memuat data monitoring</p>
        <p className="text-red-500 text-sm mt-1">{(error as Error).message}</p>
      </div>
    );
  }

  return (
    <div className="mt-10 mb-20 space-y-8">
      {/* Header & Title */}
      <Title title="Monitoring Hubungan Kerja Pegawai" />

      {/* --- Stat Cards Section --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Total Pegawai */}
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-6 rounded-2xl shadow-lg border border-blue-500/20">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-blue-100 text-sm font-semibold uppercase tracking-wider">Total Pegawai</p>
              <h3 className="text-4xl font-extrabold mt-2 tracking-tight">{stats.total}</h3>
            </div>
            <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-md">
              <FaUsers className="w-8 h-8 text-white" />
            </div>
          </div>
          <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-white/5 rounded-full blur-xl" />
        </div>

        {/* Card 2: Pegawai PNS */}
        <div className="relative overflow-hidden bg-gradient-to-br from-emerald-600 to-teal-700 text-white p-6 rounded-2xl shadow-lg border border-emerald-500/20">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-emerald-100 text-sm font-semibold uppercase tracking-wider">Pegawai PNS</p>
              <h3 className="text-4xl font-extrabold mt-2 tracking-tight">{stats.pns}</h3>
            </div>
            <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-md">
              <FaUserShield className="w-8 h-8 text-white" />
            </div>
          </div>
          <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-white/5 rounded-full blur-xl" />
        </div>

        {/* Card 3: Pegawai Non-PNS */}
        <div className="relative overflow-hidden bg-gradient-to-br from-violet-600 to-fuchsia-700 text-white p-6 rounded-2xl shadow-lg border border-violet-500/20">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-violet-100 text-sm font-semibold uppercase tracking-wider">Pegawai Non-PNS</p>
              <h3 className="text-4xl font-extrabold mt-2 tracking-tight">{stats.nonPns}</h3>
            </div>
            <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-md">
              <FaUserTie className="w-8 h-8 text-white" />
            </div>
          </div>
          <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-white/5 rounded-full blur-xl" />
        </div>
      </div>

      {/* --- Filter Section --- */}
      <CustomCard title="Filter & Pencarian">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Hubungan Kerja</label>
            <SelectFilter
              options={hubunganKerjaOptions}
              value={selectedHubunganKerja}
              onValueChange={(v) => handleUrlChange("hubungan_kerja", v)}
              placeholder="-- Pilih Hubungan Kerja --"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Jenis Kelamin</label>
            <SelectFilter
              options={genderOptions}
              value={selectedGender}
              onValueChange={(v) => handleUrlChange("gender", v)}
              placeholder="-- Pilih Jenis Kelamin --"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Cari Pegawai</label>
            <SearchInput
              value={searchData}
              onChange={(e) => setSearchData(e.target.value)}
              placeholder="Cari NIP atau Nama Pegawai..."
              className="w-full"
            />
          </div>
        </div>
      </CustomCard>

      {/* --- Table Section --- */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h4 className="font-bold text-gray-800 text-lg">Daftar Hubungan Kerja Pegawai</h4>
          <span className="text-xs font-semibold px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full border border-blue-100">
            Menampilkan {filteredPegawai.length} hasil
          </span>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 hover:bg-gray-50 border-b border-gray-100">
                <TableHead className="w-16 text-center font-bold text-gray-700">No</TableHead>
                <TableHead className="font-bold text-gray-700">Pegawai</TableHead>
                <TableHead className="text-center font-bold text-gray-700">Jenis Kelamin</TableHead>
                <TableHead className="font-bold text-gray-700">Email</TableHead>
                <TableHead className="text-center font-bold text-gray-700">Hubungan Kerja</TableHead>
                <TableHead className="text-center w-24 font-bold text-gray-700">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedPegawai.length > 0 ? (
                paginatedPegawai.map((item, index) => {
                  const globalIndex = (currentPage - 1) * itemsPerPage + index + 1;
                  const initials = item.nama
                    .split(" ")
                    .slice(0, 2)
                    .map((n: string) => n[0])
                    .join("")
                    .toUpperCase();

                  return (
                    <TableRow key={item.id} className="hover:bg-blue-50/20 border-b border-gray-100 transition-colors duration-150">
                      {/* Index */}
                      <TableCell className="text-center font-semibold text-gray-500">{globalIndex}</TableCell>

                      {/* Pegawai Info */}
                      <TableCell className="flex items-center gap-4 py-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-100 to-indigo-100 text-blue-600 flex items-center justify-center font-bold text-sm shadow-sm border border-blue-200">
                          {initials || "?"}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 leading-snug">{item.nama}</p>
                          <p className="text-xs font-semibold text-blue-600 tracking-wider mt-0.5">{item.nip}</p>
                        </div>
                      </TableCell>

                      {/* Gender */}
                      <TableCell className="text-center">
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${
                          item.jenis_kelamin_raw === "L" 
                            ? "bg-sky-50 text-sky-600 border border-sky-100" 
                            : "bg-pink-50 text-pink-600 border border-pink-100"
                        }`}>
                          {item.jenis_kelamin}
                        </span>
                      </TableCell>

                      {/* Email */}
                      <TableCell className="font-medium text-gray-600">{item.email}</TableCell>

                      {/* Hubungan Kerja */}
                      <TableCell className="text-center">
                        <span className={`inline-flex px-3 py-1.5 rounded-xl text-xs font-extrabold uppercase tracking-wider ${
                          item.is_pns 
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-100" 
                            : "bg-violet-50 text-violet-700 border border-violet-100"
                        }`}>
                          {item.hubungan_kerja}
                        </span>
                      </TableCell>

                      {/* Actions */}
                      <TableCell className="text-center">
                        <Link to={`/admin/detail-pegawai/kepegawaian/hubungan-kerja/${item.id}`}>
                          <Button size="icon" variant="ghost" className="hover:bg-amber-50 rounded-xl group transition-all duration-150">
                            <MdEdit className="w-5 h-5 text-amber-500 group-hover:scale-110 transition-transform" />
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-16 text-gray-400 font-medium">
                    Tidak ada pegawai yang ditemukan.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {filteredPegawai.length > 0 && (
          <div className="p-6 border-t border-gray-100 bg-gray-50/50">
            <CustomPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => handleUrlChange("page", String(page))}
              hasNextPage={currentPage < totalPages}
              hasPrevPage={currentPage > 1}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default HubunganKerjaPegawai;
