import { Link, useSearchParams } from "react-router-dom";
import CustomCard from "@/components/blocks/Card";
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
import SearchInput from "@/components/blocks/SearchInput";
import InfoList from "@/components/blocks/InfoList";
import { useQuery } from "@tanstack/react-query";
import dosenServices from "@/services/dosen.services";
import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { parseISO, format, isValid } from "date-fns";
import CustomPagination from "@/components/blocks/CustomPagination";
import usePegawaiProfile from "@/hooks/usePegawaiProfile";

const formatDate = (dateStr?: string | null) => {
  if (!dateStr || dateStr.trim() === "" || dateStr.startsWith("0000-00-00")) {
    return "-";
  }
  try {
    const parsed = parseISO(dateStr);
    if (isValid(parsed)) {
      return format(parsed, "dd MMMM yyyy");
    }
  } catch (e) {
    // ignore
  }
  return "-";
};

interface TesItem {
  id: string;
  nama: string;
  nilai: string;
  penyelenggara: string;
  tgl_test: string;
  status: string;
  jenis_test?: {
    nama: string;
  };
}

interface PaginatedData {
  items: TesItem[];
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

const Tes = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const [searchData, setSearchData] = useState(searchParam.get("search") || "");
  const [debouncedInput] = useDebounce(searchData, 500);

  const { profile } = usePegawaiProfile();

  const currentPage = Number(searchParam.get("page") || 1);
  const currentSearch = searchParam.get("search") || "";

  const { data: rawData, isLoading } = useQuery<PaginatedData>({
    queryKey: ["kompetensi-tes-pegawai", currentPage, currentSearch],
    queryFn: async () => {
      const response = await dosenServices.getDataTesDosen({
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
      <Title title="Tes" subTitle="Riwayat Tes" />
      <CustomCard
        actions={
          <div className="flex justify-end">
            <Link to="/data-riwayat/kompetensi/detail-tes">
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
            <TableHead className="text-center text-black">Nama Tes</TableHead>
            <TableHead className="text-center text-black">Skor/Nilai</TableHead>
            <TableHead className="text-center text-black">Jenis Tes</TableHead>
            <TableHead className="text-center text-black">Penyelenggara</TableHead>
            <TableHead className="text-center text-black">Tanggal Tes</TableHead>
            <TableHead className="text-center text-black">Status</TableHead>
            <TableHead className="text-center text-black">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-gray-200">
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8">
                Memuat data...
              </TableCell>
            </TableRow>
          ) : items.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                Tidak ada data
              </TableCell>
            </TableRow>
          ) : (
            items.map((item) => (
              <TableRow key={item.id} className="even:bg-gray-100">
                <TableCell className="text-center">{item.nama}</TableCell>
                <TableCell className="text-center">{item.nilai}</TableCell>
                <TableCell className="text-center">{item.jenis_test?.nama || "-"}</TableCell>
                <TableCell className="text-center">{item.penyelenggara}</TableCell>
                <TableCell className="text-center">{formatDate(item.tgl_test)}</TableCell>
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
                    <Link to={`/data-riwayat/kompetensi/detail-data-tes/${item.id}`}>
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

export default Tes;
