import { Link, useSearchParams } from "react-router-dom";
import CustomCard from "@/components/blocks/Card";
import Title from "@/components/blocks/Title";
import { Label } from "@/components/ui/label";
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
import InfoList from "@/components/blocks/InfoList";
import SelectFilter from "@/components/blocks/SelectFilter";
import SearchInput from "@/components/blocks/SearchInput";
import { useQuery } from "@tanstack/react-query";
import dosenServices from "@/services/dosen.services.ts";
import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "use-debounce";
import CustomPagination from "@/components/blocks/CustomPagination";
import { parseISO, format } from "date-fns";

const statusColor: Record<string, string> = {
  draft: "bg-gray-400/80 hover:bg-gray-400/80 text-white",
  diajukan: "bg-[#FFC951]/75 hover:bg-[#FFC951]/75 text-black",
  disetujui: "bg-[#0EE03C]/75 hover:bg-[#0EE03C]/75 text-black",
  ditolak: "bg-red-500 hover:bg-red-500 text-white",
};

interface KeluargaItem {
  id: string;
  nama: string;
  hubungan: string;
  jenis_kelamin: string;
  tgl_lahir: string | null;
  umur: string | number;
  telepon: string;
  status: string;
}

interface PaginatedKeluargaResponse {
  items: KeluargaItem[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

const Keluarga = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const [searchData, setSearchData] = useState(searchParam.get("search") || "");
  const [debouncedInput] = useDebounce(searchData, 500);

  const currentPage = searchParam.get("page") || "1";
  const statusFilter = searchParam.get("status") || "";

  // Fetch Pegawai profile to show in InfoList
  const { data: profileData } = useQuery({
    queryKey: ["profil-pegawai-keluarga"],
    queryFn: async () => {
      const response = await dosenServices.getProfilPegawai();
      return response.data.data;
    },
  });

  // Fetch all family members
  const { data: keluargaData, isLoading } = useQuery<PaginatedKeluargaResponse>({
    queryKey: ["keluarga-dosen", currentPage, debouncedInput, statusFilter],
    queryFn: async () => {
      const response = await dosenServices.getDataKeluarga({
        page: currentPage,
        search: debouncedInput,
        status: statusFilter,
      });
      return response.data.data;
    },
  });

  const handleFilterChange = (filterName: string, value: string) => {
    const newSearchParam = new URLSearchParams(searchParam);
    if (value && value !== "semua") {
      newSearchParam.set(filterName, value);
    } else {
      newSearchParam.delete(filterName);
    }
    newSearchParam.set("page", "1");
    setSearchParam(newSearchParam);
  };

  useEffect(() => {
    const newSearchParam = new URLSearchParams(searchParam);
    if (debouncedInput) {
      newSearchParam.set("search", debouncedInput);
    } else {
      newSearchParam.delete("search");
    }
    newSearchParam.set("page", "1");
    setSearchParam(newSearchParam);
  }, [debouncedInput]);

  useEffect(() => {
    if (!searchParam.get("page")) {
      searchParam.set("page", "1");
      setSearchParam(searchParam);
    }
  }, [searchParam, setSearchParam]);

  const items = keluargaData?.items ?? [];
  const pagination = keluargaData?.pagination;

  return (
    <div className="mt-10 mb-20">
      <Title title="Data Keluarga" subTitle="Daftar Anggota Keluarga" />
      <CustomCard
        actions={
          <div className="h-0 flex justify-end">
            <Link to="/data-riwayat/keluarga/tambah-keluarga">
              <Button className="bg-yellow-uika text-xs md:text-auto hover:bg-hover-yellow-uika">
                <FaPlus className="mr-2" /> Tambah Baru
              </Button>
            </Link>
          </div>
        }
      />

      <InfoList
        items={[
          { label: "NIP", value: profileData?.nip },
          { label: "Nama", value: profileData?.nama },
          { label: "Unit Kerja", value: profileData?.unit_kerja_id?.nama },
          { label: "Status", value: profileData?.status_aktif_id?.nama },
          { label: "Jab. Fungsional", value: profileData?.jabatan_fungsional_id?.nama },
          { label: "Hubungan Kerja", value: profileData?.hubungan_kerja_id?.nama },
        ]}
      />

      <CustomCard
        actions={
          <div className="flex flex-col md:flex-row gap-4">
            <Label className="text-[#FDA31A] md:pr-20 self-center">Status Pengajuan</Label>
            <SelectFilter
              classname="w-full md:w-64"
              placeholder="--Semua Pengajuan--"
              value={statusFilter || "semua"}
              options={[
                { label: "Semua Pengajuan", value: "semua" },
                { label: "Draft", value: "draft" },
                { label: "Diajukan", value: "diajukan" },
                { label: "Disetujui", value: "disetujui" },
                { label: "Ditolak", value: "ditolak" },
              ]}
              onValueChange={(value) => handleFilterChange("status", value)}
            />
          </div>
        }
      />

      <div className="md:gap-5 gap-2 flex mt-5 flex-col sm:flex-row">
        <SearchInput
          value={searchData}
          onChange={(e) => setSearchData(e.target.value)}
          placeholder="Cari nama keluarga..."
          className="w-full md:w-80"
        />
      </div>

      <div className="mt-10 border rounded-lg overflow-x-auto">
        <Table className="table-auto text-xs lg:text-sm">
          <TableHeader>
            <TableRow className="bg-[#002E5A] hover:bg-[#002E5A]">
              <TableHead className="text-center text-white border w-12">#</TableHead>
              <TableHead className="text-center text-white border">Nama</TableHead>
              <TableHead className="text-center text-white border">Hubungan</TableHead>
              <TableHead className="text-center text-white border">Jenis Kelamin</TableHead>
              <TableHead className="text-center text-white border">Tgl. Lahir</TableHead>
              <TableHead className="text-center text-white border">Umur</TableHead>
              <TableHead className="text-center text-white border">Telepon</TableHead>
              <TableHead className="text-center text-white border">Status</TableHead>
              <TableHead className="text-center text-white border w-24">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-200">
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center h-24">
                  Memuat data keluarga...
                </TableCell>
              </TableRow>
            ) : items.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center h-24">
                  Data tidak ditemukan.
                </TableCell>
              </TableRow>
            ) : (
              items.map((item, index) => (
                <TableRow key={item.id} className="even:bg-gray-50">
                  <TableCell className="text-center">
                    {(Number(currentPage) - 1) * 10 + index + 1}
                  </TableCell>
                  <TableCell className="text-center font-medium">{item.nama}</TableCell>
                  <TableCell className="text-center capitalize">{item.hubungan}</TableCell>
                  <TableCell className="text-center">{item.jenis_kelamin}</TableCell>
                  <TableCell className="text-center">
                    {item.tgl_lahir
                      ? format(parseISO(item.tgl_lahir), "dd MMMM yyyy")
                      : "-"}
                  </TableCell>
                  <TableCell className="text-center">{item.umur} Tahun</TableCell>
                  <TableCell className="text-center">{item.telepon || "-"}</TableCell>
                  <TableCell className="text-center">
                    <Button
                      size="sm"
                      className={`text-xs capitalize h-7 px-2 font-normal cursor-default ${
                        statusColor[item.status] ?? "bg-slate-300 text-black"
                      }`}
                    >
                      {item.status}
                    </Button>
                  </TableCell>
                  <TableCell className="text-center">
                    <Link to={`/data-riwayat/keluarga/detail-data/${item.id}`}>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="cursor-pointer"
                      >
                        <IoEyeOutline className="w-5 h-5 text-[#26A1F4]" />
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <CustomPagination
        currentPage={Number(currentPage)}
        onPageChange={(page) => {
          searchParam.set("page", String(page));
          setSearchParam(searchParam);
        }}
        hasNextPage={pagination?.hasNextPage ?? false}
        hasPrevPage={pagination?.hasPrevPage ?? false}
        totalPages={pagination?.totalPages ?? 1}
      />
    </div>
  );
};

export default Keluarga;
