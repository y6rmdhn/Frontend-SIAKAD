import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "use-debounce";
import { Link, useSearchParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { IoEyeOutline } from "react-icons/io5";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

// UI Components
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Custom Components
import CustomCard from "@/components/blocks/Card";
import CustomPagination from "@/components/blocks/CustomPagination";
import SearchInput from "@/components/blocks/SearchInput";
import SelectFilter from "@/components/blocks/SelectFilter";
import Title from "@/components/blocks/Title";
import { ConfirmDialog } from "@/components/blocks/ConfirmDialog/ConfirmDialog";

// Services
import adminServices from "@/services/admin.services";
import deleteReferensiServices from "@/services/admin.delete.referensi";

// --- Component Definition ---
const Pelanggaran = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const queryClient = useQueryClient();

  // --- State Management ---
  const [searchData, setSearchData] = useState(searchParam.get("search") || "");
  const [debouncedInput] = useDebounce(searchData, 500);
  const [selectedItem, setSelectedItem] = useState<number[]>([]);

  // Get filter values directly from the URL with new ID suffixes
  const currentPage = searchParam.get("page") || "1";
  const unitKerjaFilter = searchParam.get("unit_kerja_id") || "";
  const jabatanFungsionalFilter =
    searchParam.get("jabatan_fungsional_id") || "";
  const jenisPelanggaranFilter = searchParam.get("jenis_pelanggaran_id") || "";

  // --- Data Fetching (React Query) ---
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [
      "pelanggaran-data",
      currentPage,
      debouncedInput,
      unitKerjaFilter,
      jabatanFungsionalFilter,
      jenisPelanggaranFilter,
    ],
    queryFn: async () => {
      const params = {
        page: currentPage,
        search: debouncedInput,
        unit_kerja: unitKerjaFilter,
        jabatan_fungsional: jabatanFungsionalFilter,
        jenis_pelanggaran: jenisPelanggaranFilter,
      };
      const response = await adminServices.getPelanggaran(params);
      return response.data;
    },
  });

  // Memoize filter options for optimization
  const filterOptions = useMemo(() => {
    const filters = data?.filters;
    if (!filters) return {};
    const mapToOptions = (items: any[]) =>
      items?.map((opt) => ({ value: String(opt.id), label: opt.nama })) || [];
    return {
      unitKerja: mapToOptions(filters.unit_kerja),
      jabatanFungsional: mapToOptions(filters.jabatan_fungsional),
      jenisPelanggaran: mapToOptions(filters.jenis_pelanggaran),
    };
  }, [data]);

  // --- Data Mutation (Delete) ---
  const { mutate: deleteData } = useMutation({
    mutationFn: (id: number) =>
      deleteReferensiServices.deteleDataPelanggaran(id),
    onSuccess: () => {
      toast.success("Data berhasil dihapus");
      queryClient.invalidateQueries({ queryKey: ["pelanggaran-data"] });
      setSelectedItem([]);
    },
    onError: (err: any) => {
      toast.error(`Gagal menghapus data: ${err.message}`);
    },
  });

  // --- Event Handlers ---
  const handleUrlChange = (paramName: string, value: string) => {
    const newSearchParam = new URLSearchParams(searchParam);
    if (value && value !== "semua") {
      newSearchParam.set(paramName, value);
    } else {
      newSearchParam.delete(paramName);
    }
    if (paramName !== "page") {
      newSearchParam.set("page", "1");
    }
    setSearchParam(newSearchParam);
  };

  useEffect(() => {
    if (debouncedInput.length >= 3 || debouncedInput.length === 0) {
      handleUrlChange("search", debouncedInput);
    }
  }, [debouncedInput]);

  // --- Table Selection Logic ---
  const tableData = data?.data || [];
  const pageIds = tableData.data?.map((item: any) => item.id) || [];
  const isAllSelectedOnPage =
    pageIds.length > 0 && pageIds.every((id: any) => selectedItem.includes(id));
  const isSomeSelectedOnPage = pageIds.some((id: any) =>
    selectedItem.includes(id)
  );

  const handleSelectedItemId = (id: number, checked: boolean) =>
    setSelectedItem((prev) =>
      checked ? [...prev, id] : prev.filter((i) => i !== id)
    );
  const handleSelectAll = (checked: boolean) =>
    setSelectedItem(
      checked
        ? [...new Set([...selectedItem, ...pageIds])]
        : selectedItem.filter((id) => !pageIds.includes(id))
    );

  // --- Loading and Error States ---
  if (isLoading) {
    return (
      <div className="mt-10 mb-20">
        <Title title="Riwayat Pelanggaran" subTitle="Daftar Pelanggaran" />
        <div className="p-6 border rounded-lg mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10 space-y-2">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mt-10 mb-20 text-center">
        <Title title="Riwayat Pelanggaran" subTitle="Daftar Pelanggaran" />
        <div className="mt-10 p-4 border-l-4 border-red-500 bg-red-50 rounded-md">
          <p className="font-semibold text-red-600">Gagal Memuat Data</p>
          <p className="text-sm text-red-500">{(error as Error).message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-10 mb-20">
      <Title title="Riwayat Pelanggaran" subTitle="Daftar Pelanggaran" />
      <CustomCard
        title="Filter Data"
        actions={
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex flex-col gap-2">
              <Label>Unit Kerja</Label>
              <SelectFilter
                placeholder="--Semua Unit Kerja--"
                options={filterOptions.unitKerja || []}
                value={unitKerjaFilter}
                onValueChange={(v) => handleUrlChange("unit_kerja_id", v)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Jenis Pelanggaran</Label>
              <SelectFilter
                placeholder="--Semua Jenis--"
                options={filterOptions.jenisPelanggaran || []}
                value={jenisPelanggaranFilter}
                onValueChange={(v) =>
                  handleUrlChange("jenis_pelanggaran_id", v)
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Jabatan Fungsional</Label>
              <SelectFilter
                placeholder="--Semua Jabatan--"
                options={filterOptions.jabatanFungsional || []}
                value={jabatanFungsionalFilter}
                onValueChange={(v) =>
                  handleUrlChange("jabatan_fungsional_id", v)
                }
              />
            </div>
          </div>
        }
      />

      <div className="flex flex-col md:flex-row md:justify-between mt-10 gap-4">
        <SearchInput
          value={searchData}
          onChange={(e) => setSearchData(e.target.value)}
          className="w-full md:w-80"
          placeholder="Cari NIP atau nama pegawai..."
        />
        <div className="flex flex-col md:flex-row gap-2">
          {selectedItem.length > 0 && (
            <ConfirmDialog
              title="Hapus Data Terpilih?"
              description={`Apakah Anda yakin ingin menghapus ${selectedItem.length} data pelanggaran ini?`}
              onConfirm={() =>
                toast.info("Fungsi hapus batch belum diimplementasikan.")
              } // Ganti dengan mutasi batch delete jika ada
            >
              <Button variant="destructive">
                <FaRegTrashAlt className="mr-2" /> Hapus ({selectedItem.length})
              </Button>
            </ConfirmDialog>
          )}
          <Link to="/admin/operasional/kompensasi/detail-riwayat-pelanggaran">
            <Button className="bg-green-600 hover:bg-green-700 w-full">
              <FaPlus className="mr-2" /> Tambah Data
            </Button>
          </Link>
        </div>
      </div>

      <Table className="mt-5 text-xs lg:text-sm">
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="text-center w-10">
              <Checkbox
                onCheckedChange={(c) => handleSelectAll(!!c)}
                checked={
                  isAllSelectedOnPage
                    ? true
                    : isSomeSelectedOnPage
                    ? "indeterminate"
                    : false
                }
              />
            </TableHead>
            {data?.table_columns?.map((col: any) => (
              <TableHead key={col.field} className="text-center">
                {col.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableData.data?.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={data?.table_columns?.length + 2 || 7}
                className="text-center h-24"
              >
                Data tidak ditemukan.
              </TableCell>
            </TableRow>
          ) : (
            tableData.data.map((item: any) => (
              <TableRow key={item.id} className="even:bg-gray-50">
                <TableCell className="text-center">
                  <Checkbox
                    checked={selectedItem.includes(item.id)}
                    onCheckedChange={(c) => handleSelectedItemId(item.id, !!c)}
                  />
                </TableCell>
                <TableCell className="text-center">{item.nip}</TableCell>
                <TableCell>{item.nama_pegawai}</TableCell>
                <TableCell className="text-center">
                  {item.tgl_pelanggaran_formatted}
                </TableCell>
                <TableCell>{item.jenis_pelanggaran}</TableCell>
                <TableCell>
                  <div className="flex justify-center items-center">
                    <Link
                      to={`/admin/operasional/kompensasi/detail-data-pelanggaran/${item.id}`}
                    >
                      <Button size="icon" variant="ghost">
                        <IoEyeOutline className="text-blue-500" />
                      </Button>
                    </Link>
                    <Link
                      to={`/admin/operasional/kompensasi/edit-data-pelanggaran/${item.id}`}
                    >
                      <Button size="icon" variant="ghost">
                        <MdEdit className="text-yellow-500" />
                      </Button>
                    </Link>
                    <ConfirmDialog
                      title="Hapus Data?"
                      description={`Apakah Anda yakin ingin menghapus data pelanggaran "${item.jenis_pelanggaran}"?`}
                      onConfirm={() => deleteData(item.id)}
                    >
                      <Button size="icon" variant="ghost">
                        <FaRegTrashAlt className="text-red-500" />
                      </Button>
                    </ConfirmDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <CustomPagination
        currentPage={Number(currentPage)}
        links={data?.data?.links || []}
        onPageChange={(p) => handleUrlChange("page", String(p))}
        totalPages={data?.data?.last_page}
      />
    </div>
  );
};

export default Pelanggaran;
