import CustomCard from "@/components/blocks/Card";
import InfoList from "@/components/blocks/InfoList";
import SearchInput from "@/components/blocks/SearchInput";
import Title from "@/components/blocks/Title";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FaPlus } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { Link, useSearchParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import dosenServices from "@/services/dosen.services.ts";
import CustomPagination from "@/components/blocks/CustomPagination";
import { parseISO, format } from "date-fns";
import usePegawaiProfile from "@/hooks/usePegawaiProfile";
import { useDebounce } from "use-debounce";

// ── Tipe data sesuai response BE baru ────────────────────────────────────────
interface HubunganKerjaItem {
  id: string;
  no_sk: string;
  tgl_sk: string;
  tgl_mulai: string;
  tgl_selesai: string;
  pejabat_penetap: string | null;
  status: string;
  hubungan_kerja_id: string;
  status_aktif_id: string;
  hubungan_kerja: {
    nama: string;
  };
}

interface PaginatedData {
  items: HubunganKerjaItem[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

// Status badge color map
const statusColor: Record<string, string> = {
  draft: "bg-[#C4C4C4]/65 hover:bg-[#C4C4C4]/65",
  diajukan: "bg-[#FFC951]/50 hover:bg-[#FFC951]/50",
  disetujui: "bg-[#0EE03C]/50 hover:bg-[#0EE03C]/50",
  ditolak: "bg-red-500 hover:bg-red-500 text-white",
};

const HubunganKerja = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const [searchData, setSearchData] = useState(searchParam.get("search") || "");
  const [debouncedInput] = useDebounce(searchData, 500);

  // get data profil pegawai (shared & cached)
  const { profile } = usePegawaiProfile();

  const currentPage = Number(searchParam.get("page") || 1);
  const currentSearch = searchParam.get("search") || "";

  // get data daftar hubungan kerja
  const { data: rawData } = useQuery<PaginatedData>({
    // Tambahkan currentPage dan currentSearch ke queryKey agar data ter-refresh saat berubah
    queryKey: ["hubungan-kerja-pegawai", currentPage, currentSearch],
    queryFn: async () => {
      const response = await dosenServices.getHubunganKerja({
        page: currentPage,
        search: currentSearch, // Kirim parameter search ke backend
      });
      return response.data.data;
    },
  });

  // Ekstrak array dan pagination dari struktur baru
  const items = rawData?.items ?? [];
  const pagination = rawData?.pagination;

  // 1. Logika untuk menangani perubahan halaman (Pagination)
  const handlePageChange = useCallback(
    (page: number) => {
      const next = new URLSearchParams(searchParam);
      next.set("page", String(page));
      setSearchParam(next);
    },
    [searchParam, setSearchParam],
  );

  // 2. Logika untuk menangani perubahan pencarian
  useEffect(() => {
    const activeSearch = searchParam.get("search") || "";

    // Pastikan URL hanya di-update jika input pencarian benar-benar berubah
    if (debouncedInput !== activeSearch) {
      const next = new URLSearchParams(searchParam);

      if (debouncedInput) {
        next.set("search", debouncedInput);
      } else {
        next.delete("search");
      }

      // Reset ke halaman 1 HANYA saat pencarian berubah
      next.set("page", "1");
      setSearchParam(next);
    }
  }, [debouncedInput, searchParam, setSearchParam]);

  return (
    <div className="mt-10 mb-20">
      <Title title="Hubungan Kerja" subTitle="Daftar Hubungan Kerja" />
      <CustomCard
        actions={
          <div className="flex justify-end">
            <Link to="/data-riwayat/kepegawaian/detail-hubungan-kerja">
              <Button className="bg-[#FDA31A] text-xs md:text-sm hover:bg-[#F9A31A]">
                <FaPlus /> Tambah Baru
              </Button>
            </Link>
          </div>
        }
      />

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

      <div className="gap-5 flex flex-col md:flex-row mt-5">
        <SearchInput
          value={searchData}
          onChange={(e) => setSearchData(e.target.value)}
          placeholder="Cari data..."
        />
      </div>

      <Table className="mt-10 table-auto text-xs lg:text-sm">
        <TableHeader>
          <TableRow className="bg-gray-300">
            <TableHead className="text-center text-black">Tgl. Mulai</TableHead>
            <TableHead className="text-center text-black">
              Tgl. Selesai
            </TableHead>
            <TableHead className="text-center text-black">
              Hubungan Kerja
            </TableHead>
            <TableHead className="text-center text-black">Status</TableHead>
            <TableHead className="text-center text-black">Aksi</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="divide-y divide-gray-200">
          {items.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                Tidak ada data
              </TableCell>
            </TableRow>
          ) : (
            items.map((item) => (
              <TableRow key={item.id} className="even:bg-gray-100">
                <TableCell className="text-center">
                  {item.tgl_mulai
                    ? format(parseISO(item.tgl_mulai), "dd MMMM yyyy")
                    : "-"}
                </TableCell>
                <TableCell className="text-center">
                  {item.tgl_selesai
                    ? format(parseISO(item.tgl_selesai), "dd MMMM yyyy")
                    : "-"}
                </TableCell>
                <TableCell className="text-center">
                  {item.hubungan_kerja?.nama || "-"}
                </TableCell>
                <TableCell className="text-center">
                  <Button
                    size="sm"
                    className={`w-full text-xs lg:text-sm text-black ${statusColor[item.status] ?? "bg-slate-300 hover:bg-slate-300"}`}
                  >
                    {item.status}
                  </Button>
                </TableCell>
                <TableCell className="h-full">
                  <div className="flex justify-center items-center w-full h-full">
                    <Link
                      to={
                        "/data-riwayat/kepegawaian/detail-data-hubungan-kerja/" +
                        item.id
                      }
                    >
                      <Button
                        size="icon"
                        variant="ghost"
                        className="cursor-pointer"
                      >
                        <IoEyeOutline className="w-5! h-5! text-[#26A1F4]" />
                      </Button>
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <CustomPagination
        pagination={pagination}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default HubunganKerja;
