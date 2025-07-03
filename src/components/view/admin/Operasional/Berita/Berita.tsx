import { useEffect, useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { toast } from "sonner";
import { format, parseISO } from "date-fns";

// UI & Custom Components
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Title from "@/components/blocks/Title";
import CustomCard from "@/components/blocks/Card";
import SelectFilter from "@/components/blocks/SelectFilter";
import SearchInput from "@/components/blocks/SearchInput";
import CustomPagination from "@/components/blocks/CustomPagination";
import { ConfirmDialog } from "@/components/blocks/ConfirmDialog/ConfirmDialog";

// Icons
import { FaCheck, FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { IoClose, IoEyeOutline } from "react-icons/io5";

// Services
import adminServices from "@/services/admin.services";
import deleteReferensiServices from "@/services/admin.delete.referensi";

// Interfaces
interface BeritaItem {
  id: string | number;
  judul: string;
  tgl_posting: string;
  tgl_expired: string;
  prioritas: boolean;
  unit_kerja: { id: number; nama: string }[];
}

interface PaginatedBeritaResponse {
  data: BeritaItem[];
  links: any[];
  last_page: number;
}

const Berita = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const queryClient = useQueryClient();

  const [searchData, setSearchData] = useState(searchParam.get("search") || "");
  const [debouncedSearch] = useDebounce(searchData, 500);

  const currentPage = searchParam.get("page") || "1";
  const unitKerjaFilter = searchParam.get("unit_kerja_id") || "";

  // --- Start of Fix ---
  const { data: beritaData, isLoading: isBeritaLoading } = useQuery({
    queryKey: ["berita", currentPage, debouncedSearch, unitKerjaFilter],
    queryFn: async (): Promise<PaginatedBeritaResponse> => {
      const response = await adminServices.getBerita({
        page: currentPage,
        search: debouncedSearch,
        unitKerjaId: unitKerjaFilter,
      });
      return response.data.data;
    },
    // Replace `keepPreviousData` with `placeholderData`
    placeholderData: (previousData) => previousData,
  });
  // --- End of Fix ---

  const { data: unitKerjaList } = useQuery({
    queryKey: ["all-unit-kerja-dropdown"],
    queryFn: () => adminServices.getSemuaUnitKerja(),
    staleTime: Infinity,
  });

  const { mutate: deleteData } = useMutation({
    mutationFn: (id: number) => deleteReferensiServices.deteleDataBerita(id),
    onSuccess: () => {
      toast.success("Data berhasil dihapus");
      queryClient.invalidateQueries({ queryKey: ["berita"] });
    },
  });

  const unitKerjaOptions = useMemo(() => {
    if (!unitKerjaList) return [];
    return unitKerjaList.map((unit) => ({
      value: String(unit.id),
      label: unit.nama_unit,
    }));
  }, [unitKerjaList]);

  const handleUrlChange = (paramName: string, value: string) => {
    const newSearchParams = new URLSearchParams(searchParam);
    if (value) {
      newSearchParams.set(paramName, value);
    } else {
      newSearchParams.delete(paramName);
    }

    if (paramName !== "page") {
      newSearchParams.set("page", "1");
    }

    setSearchParam(newSearchParams);
  };

  const handleDateFormat = (dates: string): string => {
    if (!dates) return "-";
    try {
      return format(parseISO(dates), "d MMM yyyy");
    } catch (error) {
      return "Invalid Date";
    }
  };

  useEffect(() => {
    handleUrlChange("search", debouncedSearch);
  }, [debouncedSearch]);

  useEffect(() => {
    if (!searchParam.has("page")) {
      handleUrlChange("page", "1");
    }
  }, [searchParam]);

  return (
    <div className="mt-10 mb-20">
      <Title title="Berita" subTitle="Daftar Berita" />

      <CustomCard title="Filter Berita">
        <div className="flex items-center gap-4">
          <Label className="w-40">Unit Kerja</Label>
          <SelectFilter
            classname="w-full md:w-80"
            placeholder="-- Pilih Unit Kerja --"
            options={unitKerjaOptions}
            value={unitKerjaFilter}
            onValueChange={(value) => handleUrlChange("unit_kerja_id", value)}
          />
        </div>
      </CustomCard>

      <div className="flex flex-col md:flex-row md:justify-between mt-10 gap-4">
        <SearchInput
          className="w-full md:w-80"
          placeholder="Cari berdasarkan judul berita..."
          value={searchData}
          onChange={(e) => setSearchData(e.target.value)}
        />
        <Link to="/admin/operasional/detail-berita">
          <Button className="bg-green-light-uika hover:bg-[#329C59] w-full">
            <FaPlus className="mr-2" /> Tambah Berita
          </Button>
        </Link>
      </div>

      {/* Tabel Data */}
      <div className="mt-5 border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100 hover:bg-gray-100">
              <TableHead className="w-12 text-center">
                <Checkbox />
              </TableHead>
              <TableHead>Unit Kerja</TableHead>
              <TableHead>Judul</TableHead>
              <TableHead className="text-center">Tgl Posting</TableHead>
              <TableHead className="text-center">Tgl Expired</TableHead>
              <TableHead className="text-center">Prioritas</TableHead>
              <TableHead className="text-center">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isBeritaLoading && !beritaData ? ( // Show skeleton only on initial load
              // Skeleton Loading
              [...Array(5)].map((_, i) => (
                <TableRow key={i}>
                  <TableCell colSpan={7} className="p-4">
                    <div className="w-full h-6 bg-gray-200 rounded animate-pulse" />
                  </TableCell>
                </TableRow>
              ))
            ) : beritaData && beritaData.data.length > 0 ? (
              beritaData.data.map(
                (
                  item: BeritaItem // Added type for item
                ) => (
                  <TableRow key={item.id}>
                    <TableCell className="text-center">
                      <Checkbox />
                    </TableCell>
                    <TableCell className="text-xs">
                      {item.unit_kerja?.map((uk) => uk.nama).join(", ")}
                    </TableCell>
                    <TableCell>{item.judul}</TableCell>
                    <TableCell className="text-center">
                      {handleDateFormat(item.tgl_posting)}
                    </TableCell>
                    <TableCell className="text-center">
                      {handleDateFormat(item.tgl_expired)}
                    </TableCell>
                    <TableCell className="text-center">
                      {item.prioritas ? (
                        <FaCheck className="text-green-500 mx-auto" />
                      ) : (
                        <IoClose className="text-red-500 mx-auto" />
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center items-center">
                        <Link
                          to={`/admin/operasional/detail-data-berita/${item.id}`}
                        >
                          <Button size="icon" variant="ghost">
                            <IoEyeOutline className="text-blue-500" />
                          </Button>
                        </Link>
                        <ConfirmDialog
                          title="Hapus Berita?"
                          description={`Anda yakin ingin menghapus berita "${item.judul}"?`}
                          onConfirm={() => deleteData(Number(item.id))}
                        >
                          <Button size="icon" variant="ghost">
                            <FaRegTrashAlt className="text-red-500" />
                          </Button>
                        </ConfirmDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              )
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center h-48">
                  Data berita tidak ditemukan.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {beritaData && beritaData.data.length > 0 && (
        <CustomPagination
          currentPage={Number(currentPage)}
          links={beritaData.links}
          onPageChange={(page) => handleUrlChange("page", page.toString())}
          totalPages={beritaData.last_page}
        />
      )}
    </div>
  );
};

export default Berita;
