import CustomCard from "@/components/blocks/Card";
import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa6";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link, useSearchParams } from "react-router-dom";
import { IoEyeOutline } from "react-icons/io5";
import { IoIosDocument } from "react-icons/io";
import InfoList from "@/components/blocks/InfoList";
import Title from "@/components/blocks/Title";
import SelectFilter from "@/components/blocks/SelectFilter";
import SearchInput from "@/components/blocks/SearchInput";
import { useQuery } from "@tanstack/react-query";
import dosenServices from "@/services/dosen.services";
import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "use-debounce";
import CustomPagination from "@/components/blocks/CustomPagination";
import { format, parseISO } from "date-fns";
import usePegawaiProfile from "@/hooks/usePegawaiProfile";
import { toast } from "sonner";

// ── Peta warna status ────────────────────────────────────────────────────────
const statusColor: Record<string, string> = {
  draft: "bg-[#C4C4C4]/65 hover:bg-[#C4C4C4]/65",
  diajukan: "bg-[#FFC951]/50 hover:bg-[#FFC951]/50",
  disetujui: "bg-[#0EE03C]/50 hover:bg-[#0EE03C]/50",
  ditolak: "bg-red-500 hover:bg-red-500 text-white",
};

const Cuti = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const [searchData, setSearchData] = useState(searchParam.get("search") || "");
  const [debouncedInput] = useDebounce(searchData, 500);

  // ── Profil pegawai — cached, tidak ikut re-fetch saat filter berubah ──────
  const { profile } = usePegawaiProfile();

  // ── Baca nilai filter dari URL ─────────────────────────────────────────────
  const currentPage = Number(searchParam.get("page") || 1);

  // ── Query data cuti ────────────────────────────────────────────────────────
  const { data, isLoading } = useQuery({
    queryKey: [
      "pengajuan-cuti-dosen",
      searchParam.get("page"),
      searchParam.get("search"),
      searchParam.get("jenis_cuti"),
      searchParam.get("status_pengajuan"),
    ],
    queryFn: async () => {
      const params: Record<string, any> = {
        page: currentPage,
        limit: 10,
      };

      const search = searchParam.get("search");
      const jenisCuti = searchParam.get("jenis_cuti");
      const statusPengajuan = searchParam.get("status_pengajuan");

      if (search) params.search = search;
      if (jenisCuti) params.jenis_cuti_id = jenisCuti;
      if (statusPengajuan && statusPengajuan !== "semua")
        params.status = statusPengajuan;

      const response = await dosenServices.getDataCuti(params);
      return response.data;
    },
  });

  // ── Ekstrak items & pagination dari response ─ ikuti pola HubunganKerja ───
  const items = data?.data?.items ?? [];
  const pagination = data?.data?.pagination;

  // ── Filter options dari response BE ───────────────────────────────────────
  const jenisCutiOptions = useMemo(() => {
    const options = data?.filter_options?.jenis_cuti?.map((item: any) => ({
      label: item.nama,
      value: item.id.toString(),
    })) || [];
    return [{ label: "Semua Jenis Cuti", value: "semua" }, ...options];
  }, [data]);

  const statusPengajuanOptions = useMemo(() => {
    const raw = data?.filter_options?.status_pengajuan ?? [];
    const options = raw.map((item: any) => ({
      label: typeof item === "string" ? item : item.nama,
      value: typeof item === "string" ? item : item.id,
    }));
    return [{ label: "Semua Status", value: "semua" }, ...options];
  }, [data]);

  // ── Handlers ───────────────────────────────────────────────────────────────
  const handleFilterChange = (filterName: string, value: string) => {
    const next = new URLSearchParams(searchParam);
    if (value && value !== "semua") {
      next.set(filterName, value);
    } else {
      next.delete(filterName);
    }
    next.set("page", "1");
    setSearchParam(next);
  };

  const handlePageChange = (page: number) => {
    const next = new URLSearchParams(searchParam);
    next.set("page", String(page));
    setSearchParam(next);
  };

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return "-";
    try {
      return format(parseISO(dateString), "dd MMMM yyyy");
    } catch {
      return "Tanggal tidak valid";
    }
  };

  // ── useEffect — inisialisasi page (satu guard, ikuti pola HubunganKerja) ──
  useEffect(() => {
    if (!searchParam.get("page")) {
      const next = new URLSearchParams(searchParam);
      next.set("page", "1");
      setSearchParam(next);
    }
  }, [searchParam, setSearchParam]);

  // ── useEffect — sync search debounce ke URL ────────────────────────────────
  useEffect(() => {
    const next = new URLSearchParams(searchParam);
    if (debouncedInput.length > 2) {
      next.set("search", debouncedInput);
      next.set("page", "1");
    } else {
      next.delete("search");
    }
    if (searchParam.toString() !== next.toString()) {
      setSearchParam(next);
    }
  }, [debouncedInput, searchParam, setSearchParam]);

  // ── Guard: reset jika page melebihi totalPages ─────────────────────────────
  useEffect(() => {
    if (
      pagination?.totalPages &&
      Number(searchParam.get("page")) > pagination.totalPages &&
      pagination.totalPages > 0
    ) {
      const next = new URLSearchParams(searchParam);
      next.set("page", String(pagination.totalPages));
      setSearchParam(next);
    }
  }, [searchParam, pagination, setSearchParam]);

  return (
    <div className="mt-10 mb-20">
      <Title title="Cuti" subTitle="Daftar Pengajuan Cuti" />

      {/* Tombol tambah + InfoList profil pegawai */}
      <CustomCard
        actions={
          <div className="flex justify-end">
            <Link to="/operasional/pengajuan/tambah-cuti">
              <Button className="bg-[#FDA31A] text-xs md:text-sm">
                <FaPlus className="mr-2" /> Tambah Baru
              </Button>
            </Link>
          </div>
        }
      >
        <InfoList
          items={[
            { label: "NIP", value: profile?.nip ?? "-" },
            { label: "Nama", value: profile?.nama ?? "-" },
            { label: "Unit Kerja", value: profile?.unit_kerja ?? "-" },
            { label: "Status", value: profile?.status ?? "-" },
            { label: "Jab. Fungsional", value: profile?.jab_fungsional ?? "-" },
            { label: "Jab. Struktural", value: profile?.jab_struktural ?? "-" },
            { label: "Pendidikan", value: profile?.pendidikan ?? "-" },
          ]}
        />
      </CustomCard>

      {/* Filter */}
      <CustomCard
        actions={
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex gap-4 min-[864px]:flex-row flex-col">
              <Label className="text-[#FDA31A] md:w-60 text-xs md:text-sm">
                Status Pengajuan
              </Label>
              <SelectFilter
                classname="w-full"
                placeholder="Pilih Status"
                value={searchParam.get("status_pengajuan") || "semua"}
                options={statusPengajuanOptions}
                onValueChange={(value) =>
                  handleFilterChange("status_pengajuan", value)
                }
              />
            </div>
            <div className="flex gap-4 min-[864px]:flex-row flex-col">
              <Label className="text-[#FDA31A] md:w-60 text-xs md:text-sm">
                Jenis Cuti
              </Label>
              <SelectFilter
                classname="w-full"
                placeholder="Pilih Jenis"
                value={searchParam.get("jenis_cuti") || "semua"}
                options={jenisCutiOptions}
                onValueChange={(value) =>
                  handleFilterChange("jenis_cuti", value)
                }
              />
            </div>
          </div>
        }
      />

      {/* Search */}
      <div className="flex mt-4 flex-col min-[864px]:flex-row justify-between gap-5 mb-5">
        <div className="flex gap-2 flex-col md:flex-row w-full md:w-auto order-2 md:order-1">
          <SearchInput
            value={searchData}
            onChange={(e) => setSearchData(e.target.value)}
          />
        </div>
      </div>

      {/* Tabel — hardcoded header (tidak bergantung response BE) */}
      <Table className="mt-6 table-auto text-xs lg:text-sm">
        <TableHeader>
          <TableRow className="bg-[#002E5A]">
            <TableHead className="text-center text-white">No. Urut</TableHead>
            <TableHead className="text-center text-white">Jenis Cuti</TableHead>
            <TableHead className="text-center text-white">Tgl. Mulai</TableHead>
            <TableHead className="text-center text-white">Tgl. Selesai</TableHead>
            <TableHead className="text-center text-white">Jumlah</TableHead>
            <TableHead className="text-center text-white">Alasan</TableHead>
            <TableHead className="text-center text-white">Status</TableHead>
            <TableHead className="text-center text-white">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-gray-200">
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center h-24">
                Memuat data...
              </TableCell>
            </TableRow>
          ) : items.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center h-24">
                Data tidak ditemukan.
              </TableCell>
            </TableRow>
          ) : (
            items.map((item: any) => (
              <TableRow key={item.id} className="even:bg-gray-100">
                <TableCell className="text-center">
                  {item.no_urut_cuti ?? "-"}
                </TableCell>
                <TableCell className="text-center">
                  {item.jenis_cuti?.nama ?? item.jenis_cuti ?? "-"}
                </TableCell>
                <TableCell className="text-center">
                  {formatDate(item.tgl_mulai)}
                </TableCell>
                <TableCell className="text-center">
                  {formatDate(item.tgl_selesai)}
                </TableCell>
                <TableCell className="text-center">
                  {item.jumlah_cuti ? `${item.jumlah_cuti} hari` : "-"}
                </TableCell>
                <TableCell className="text-center">
                  {item.alasan_cuti ?? "-"}
                </TableCell>
                <TableCell className="text-center">
                  <Button
                    size="sm"
                    className={`w-full text-xs lg:text-sm text-black ${statusColor[item.status] ?? "bg-slate-300 hover:bg-slate-300"
                      }`}
                  >
                    {item.status}
                  </Button>
                </TableCell>
                <TableCell>
                  <div className="flex justify-center items-center gap-2">
                    <Link to={"/operasional/pengajuan/detail-cuti/" + item.id}>
                      <Button size="icon" variant="ghost" className="cursor-pointer">
                        <IoEyeOutline className="w-5 h-5 text-[#26A1F4]" />
                      </Button>
                    </Link>
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      className="cursor-pointer"
                      onClick={() => {
                        const fileUrl = item.file_cuti?.url || item.file_pendukung?.url || item.file_url;
                        if (fileUrl) {
                          window.open(fileUrl, "_blank");
                        } else {
                          toast.error("File pendukung tidak tersedia");
                        }
                      }}
                    >
                      <IoIosDocument className="w-5 h-5 text-[#26A1F4]" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Pagination — pola baru (pagination object + onPageChange) */}
      <CustomPagination
        pagination={pagination}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Cuti;
