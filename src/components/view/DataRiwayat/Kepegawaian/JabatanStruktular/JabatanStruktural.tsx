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
import { parseISO, format, isValid } from "date-fns";
import usePegawaiProfile from "@/hooks/usePegawaiProfile";
import { useDebounce } from "use-debounce";

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

interface JabatanStrukturalItem {
  id: string;
  no_sk: string;
  tgl_sk: string;
  tgl_mulai: string;
  tgl_selesai: string | null;
  pejabat_penetap: string | null;
  status: string;
  jabatan_struktural?: {
    nama: string;
  };
}

interface PaginatedData {
  items: JabatanStrukturalItem[];
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

const JabatanStruktural = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const [searchData, setSearchData] = useState(searchParam.get("search") || "");
  const [debouncedInput] = useDebounce(searchData, 500);

  const { profile } = usePegawaiProfile();

  const currentPage = Number(searchParam.get("page") || 1);
  const currentSearch = searchParam.get("search") || "";

  const { data: rawData, isLoading } = useQuery<PaginatedData>({
    queryKey: ["jabatan-struktural-pegawai", currentPage, currentSearch],
    queryFn: async () => {
      const response = await dosenServices.getJabatanStruktural({
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
      <Title title="Jabatan Struktural" subTitle="Daftar Jabatan Struktural" />
      <CustomCard
        actions={
          <div className="flex justify-end">
            <Link to="/data-riwayat/kepegawaian/detail-jabatan-struktural">
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
            <TableHead className="text-center text-black">No. SK</TableHead>
            <TableHead className="text-center text-black">Tgl. SK</TableHead>
            <TableHead className="text-center text-black">Tgl. Mulai</TableHead>
            <TableHead className="text-center text-black">Tgl. Selesai</TableHead>
            <TableHead className="text-center text-black">Jab. Struktural</TableHead>
            <TableHead className="text-center text-black">Pejabat Penetap</TableHead>
            <TableHead className="text-center text-black">Status</TableHead>
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
                <TableCell className="text-center">{item.no_sk || "-"}</TableCell>
                <TableCell className="text-center">{formatDate(item.tgl_sk)}</TableCell>
                <TableCell className="text-center">{formatDate(item.tgl_mulai)}</TableCell>
                <TableCell className="text-center">{formatDate(item.tgl_selesai)}</TableCell>
                <TableCell className="text-center">
                  {item.jabatan_struktural?.nama || "-"}
                </TableCell>
                <TableCell className="text-center">{item.pejabat_penetap || "-"}</TableCell>
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
                      to={
                        "/data-riwayat/kepegawaian/detail-data-jabatan-struktural/" +
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

export default JabatanStruktural;
