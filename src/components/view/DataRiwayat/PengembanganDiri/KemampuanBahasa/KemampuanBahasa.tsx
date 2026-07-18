import { Link, useSearchParams } from "react-router-dom";
import CustomCard from "@/components/blocks/Card";
import Title from "@/components/blocks/Title";
import { Button } from "@/components/ui/button";
import InfoList from "@/components/blocks/InfoList";
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
import CustomPagination from "@/components/blocks/CustomPagination";
import { useQuery } from "@tanstack/react-query";
import dosenServices from "@/services/dosen.services";
import { useCallback, useEffect, useState } from "react";
import SearchInput from "@/components/blocks/SearchInput";
import usePegawaiProfile from "@/hooks/usePegawaiProfile";
import { useDebounce } from "use-debounce";

interface KemampuanBahasaItem {
  id: string;
  tahun: string;
  nama_lembaga: string;
  skor_mendengar: string | number;
  skor_bicara: string | number;
  skor_menulis: string | number;
  status: string;
  bahasa?: {
    nama: string;
  };
}

interface PaginatedData {
  items: KemampuanBahasaItem[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

const statusColor: Record<string, string> = {
  draft: "bg-[#C4C4C4]/65 hover:bg-[#C4C4C4]/65",
  diajukan: "bg-[#FFC951]/50 hover:bg-[#FFC951]/50",
  disetujui: "bg-[#0EE03C]/50 hover:bg-[#0EE03C]/50",
  ditolak: "bg-red-500 hover:bg-red-500 text-white",
};

const KemampuanBahasa = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const [searchData, setSearchData] = useState(searchParam.get("search") || "");
  const [debouncedInput] = useDebounce(searchData, 500);

  const { profile } = usePegawaiProfile();

  const currentPage = Number(searchParam.get("page") || 1);
  const currentSearch = searchParam.get("search") || "";

  const { data: rawData, isLoading } = useQuery<PaginatedData>({
    queryKey: ["kemampuan-bahasa-pegawai", currentPage, currentSearch],
    queryFn: async () => {
      const response = await dosenServices.getKemampuanBahasa({
        page: currentPage,
        search: currentSearch,
      });
      return response.data.data;
    },
  });

  const items = rawData?.items ?? [];
  const pagination = rawData?.pagination;

  const handlePageChange = useCallback(
    (page: number) => {
      const next = new URLSearchParams(searchParam);
      next.set("page", String(page));
      setSearchParam(next);
    },
    [searchParam, setSearchParam],
  );

  useEffect(() => {
    const activeSearch = searchParam.get("search") || "";
    if (debouncedInput !== activeSearch) {
      const next = new URLSearchParams(searchParam);
      if (debouncedInput) {
        next.set("search", debouncedInput);
      } else {
        next.delete("search");
      }
      next.set("page", "1");
      setSearchParam(next);
    }
  }, [debouncedInput, searchParam, setSearchParam]);

  return (
    <div className="mt-10 mb-20">
      <Title title="Kemampuan Bahasa" subTitle="Daftar Kemampuan Bahasa" />
      <CustomCard
        actions={
          <div className="flex justify-end">
            <Link to="/data-riwayat/pengembangan-diri/detail-kemampuan-bahasa">
              <Button className="bg-yellow-uika hover:bg-hover-yellow-uika w-full sm:w-auto">
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

      <Table className="mt-10 table-auto text-xs md:text-sm">
        <TableHeader>
          <TableRow className="bg-gray-300">
            <TableHead className="text-center text-black">Tahun</TableHead>
            <TableHead className="text-center text-black">Bahasa</TableHead>
            <TableHead className="text-center text-black">Lembaga</TableHead>
            <TableHead className="text-center text-black">Nilai Mendengar</TableHead>
            <TableHead className="text-center text-black">Nilai Bicara</TableHead>
            <TableHead className="text-center text-black">Nilai Menulis</TableHead>
            <TableHead className="text-center text-black">Status Pengajuan</TableHead>
            <TableHead className="text-center text-black">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-gray-200">
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-8">
                Memuat data...
              </TableCell>
            </TableRow>
          ) : items.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                Tidak ada data
              </TableCell>
            </TableRow>
          ) : (
            items.map((item) => (
              <TableRow key={item.id} className="even:bg-gray-100">
                <TableCell className="text-center">{item.tahun}</TableCell>
                <TableCell className="text-center">{item.bahasa?.nama || "-"}</TableCell>
                <TableCell className="text-center">{item.nama_lembaga || "-"}</TableCell>
                <TableCell className="text-center">{item.skor_mendengar}</TableCell>
                <TableCell className="text-center">{item.skor_bicara}</TableCell>
                <TableCell className="text-center">{item.skor_menulis}</TableCell>
                <TableCell className="text-center">
                  <Button
                    size="sm"
                    className={`w-full text-xs lg:text-sm text-black ${
                      statusColor[item.status] ?? "bg-slate-300 hover:bg-slate-300"
                    }`}
                  >
                    {item.status}
                  </Button>
                </TableCell>
                <TableCell className="h-full">
                  <div className="flex justify-center items-center w-full h-full">
                    <Link
                      to={`/data-riwayat/pengembangan-diri/detail-data-kemampuan-bahasa/${item.id}`}
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

export default KemampuanBahasa;
