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
import { parseISO, format, isValid } from "date-fns";
import CustomPagination from "@/components/blocks/CustomPagination";
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

interface PangkatItem {
  id: string;
  no_sk: string;
  tgl_sk: string;
  tmt_pangkat: string;
  jenis_sk?: {
    id?: string;
    jenis_sk?: string;
    nama?: string;
  } | string | null;
  masa_kerja_tahun?: number | null;
  masa_kerja_bulan?: number | null;
  masa_kerja?: string | null;
  status: string;
  pangkat?: {
    id?: string;
    nama?: string;
  } | string | null;
  master_pangkat?: {
    id?: string;
    nama?: string;
  } | null;
}

interface PaginatedData {
  items: PangkatItem[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

const getPangkatName = (item: PangkatItem): string => {
  if (!item) return "-";
  if (typeof item.pangkat === "object" && item.pangkat !== null) {
    const p = item.pangkat as any;
    if (p.nama) return p.nama;
    if (p.nama_pangkat) return p.nama_pangkat;
    if (p.nama_golongan) return p.nama_golongan;
    if (p.jenis_pangkat) return p.jenis_pangkat;
    if (p.pangkat) return p.pangkat;
  }
  if (typeof item.pangkat === "string" && item.pangkat.trim() !== "") {
    return item.pangkat;
  }
  if (typeof item.master_pangkat === "object" && item.master_pangkat !== null) {
    const mp = item.master_pangkat as any;
    if (mp.nama) return mp.nama;
    if (mp.nama_pangkat) return mp.nama_pangkat;
  }
  const rawItem = item as any;
  if (rawItem.nama_pangkat) return rawItem.nama_pangkat;
  if (rawItem.pangkat_nama) return rawItem.pangkat_nama;
  if (rawItem.nama_golongan) return rawItem.nama_golongan;
  return "-";
};

const getJenisSkName = (item: PangkatItem): string => {
  if (!item) return "-";
  if (typeof item.jenis_sk === "object" && item.jenis_sk !== null) {
    const js = item.jenis_sk as any;
    if (js.jenis_sk) return js.jenis_sk;
    if (js.nama) return js.nama;
    if (js.name) return js.name;
  }
  if (typeof item.jenis_sk === "string" && item.jenis_sk.trim() !== "") {
    return item.jenis_sk;
  }
  const rawItem = item as any;
  if (rawItem.nama_jenis_sk) return rawItem.nama_jenis_sk;
  return "-";
};

const statusColor: Record<string, string> = {
  draft: "bg-[#C4C4C4]/65 hover:bg-[#C4C4C4]/65",
  diajukan: "bg-[#FFC951]/50 hover:bg-[#FFC951]/50",
  disetujui: "bg-[#0EE03C]/50 hover:bg-[#0EE03C]/50",
  ditolak: "bg-red-500 hover:bg-red-500 text-white",
};

const Pangkat = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const [searchData, setSearchData] = useState(searchParam.get("search") || "");
  const [debouncedInput] = useDebounce(searchData, 500);

  const { profile } = usePegawaiProfile();

  const currentPage = Number(searchParam.get("page") || 1);
  const currentSearch = searchParam.get("search") || "";

  const { data: rawData, isLoading } = useQuery<PaginatedData>({
    queryKey: ["pangkat-pegawai", currentPage, currentSearch],
    queryFn: async () => {
      const response = await dosenServices.getPangkat({
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
      <Title title="Pangkat" subTitle="Daftar Pangkat" />
      <CustomCard
        actions={
          <div className="flex justify-end">
            <Link to="/data-riwayat/kepegawaian/detail-pangkat">
              <Button className="bg-yellow-uika hover:bg-hover-yellow-uika text-xs md:text-sm">
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
            <TableHead className="text-center text-black">TMT Pangkat</TableHead>
            <TableHead className="text-center text-black">Nama Pangkat</TableHead>
            <TableHead className="text-center text-black">Jenis SK</TableHead>
            <TableHead className="text-center text-black">Masa Kerja</TableHead>
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
                <TableCell className="text-center">{formatDate(item.tmt_pangkat)}</TableCell>
                <TableCell className="text-center">
                  {getPangkatName(item)}
                </TableCell>
                <TableCell className="text-center">
                  {getJenisSkName(item)}
                </TableCell>
                <TableCell className="text-center">
                  {item.masa_kerja_tahun !== undefined && item.masa_kerja_tahun !== null
                    ? `${item.masa_kerja_tahun} Thn ${item.masa_kerja_bulan || 0} Bln`
                    : item.masa_kerja || "-"}
                </TableCell>
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
                        "/data-riwayat/kepegawaian/detail-data-pangkat/" +
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

export default Pangkat;
