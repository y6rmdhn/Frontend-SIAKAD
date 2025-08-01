import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { toast } from "sonner";
import { CheckedState } from "@radix-ui/react-checkbox";

// UI & Custom Components
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
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
import CustomPagination from "@/components/blocks/CustomPagination";
import SearchInput from "@/components/blocks/SearchInput";
import SelectFilter from "@/components/blocks/SelectFilter";
import { ConfirmDialog } from "@/components/blocks/ConfirmDialog/ConfirmDialog";

// Icons
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { MdEdit } from "react-icons/md";

// Services
import adminServices from "@/services/admin.services";
import deleteReferensiServices from "@/services/admin.delete.referensi";

// Tipe Data
interface PegawaiItem {
  id: number;
  nip: string;
  nidn: string | null;
  nama_pegawai: string;
  unit_kerja: string;
  pendidikan_terakhir: string; // Optional field for education
  status: string;
}

interface PegawaiApiResponse {
  data: {
    data: PegawaiItem[];
    links: any[];
    last_page: number;
    current_page: number;
  };
  filters: {
    unit_kerja: any[];
    status_aktif: any[];
    hubungan_kerja: any[];
  };
}

const Pegawai = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const queryClient = useQueryClient();

  // --- State & URL Params ---
  const [searchData, setSearchData] = useState(searchParam.get("search") || "");
  const [debouncedSearch] = useDebounce(searchData, 500);
  const [selectedPegawaiId, setSelectedPegawaiId] = useState<number[]>([]);

  const currentPage = searchParam.get("page") || "1";
  const unitKerjaFilter = searchParam.get("unit_kerja_id") || "";
  const pendidikanTerakhirFilter = searchParam.get("hubungan_kerja_id") || "";
  const statusAktifFilter = searchParam.get("status_aktif_id") || "";
  const hubunganKerjaFilter = searchParam.get("hubungan_kerja_id") || "";

  // --- Data Fetching ---
  const { data, isLoading, isError, error } = useQuery<PegawaiApiResponse>({
    // FIX 1: Explicitly type the useQuery hook
    queryKey: [
      "pegawai",
      currentPage,
      debouncedSearch,
      unitKerjaFilter,
      pendidikanTerakhirFilter,
      statusAktifFilter,
      hubunganKerjaFilter,
    ],
    queryFn: async () => {
      const response = await adminServices.getPegawaiAdminPage({
        page: currentPage,
        search: debouncedSearch,
        unit_kerja_id: unitKerjaFilter,
        status_aktif_id: statusAktifFilter,
        hubungan_kerja_id: hubunganKerjaFilter,
      });
      return response.data; // Type assertion is no longer needed here
    },
    placeholderData: keepPreviousData,
  });

  // --- Memos & Event Handlers ---
  const filterOptions = useMemo(() => {
    // FIX 2: Check if data and data.filters exist before mapping
    const filters = data?.filters;
    return {
      unitKerja:
        filters?.unit_kerja?.map((opt: any) => ({
          value: String(opt.id),
          label: opt.nama_unit,
        })) || [],
      statusAktif:
        filters?.status_aktif?.map((opt: any) => ({
          value: String(opt.id),
          label: opt.nama_status_aktif,
        })) || [],
      hubunganKerja:
        filters?.hubungan_kerja?.map((opt: any) => ({
          value: String(opt.id),
          label: opt.nama_hub_kerja,
        })) || [],
    };
  }, [data]);

  const handleUrlChange = (paramName: string, value: string) => {
    const newSearchParams = new URLSearchParams(searchParam);
    if (value && value !== "semua") {
      newSearchParams.set(paramName, value);
    } else {
      newSearchParams.delete(paramName);
    }
    if (paramName !== "page") {
      newSearchParams.set("page", "1");
    }
    setSearchParam(newSearchParams);
  };

  const handleSelectedPegawaiId = (pegawaiId: number, checked: boolean) => {
    setSelectedPegawaiId((prev) =>
      checked ? [...prev, pegawaiId] : prev.filter((id) => id !== pegawaiId)
    );
  };

  // --- Data Mutation (Delete) ---
  const { mutate: deleteData } = useMutation({
    mutationFn: (payload: { pegawai_ids: number[] }) =>
      deleteReferensiServices.deletePegawai(payload.pegawai_ids),
    onSuccess: () => {
      toast.success("Data berhasil dihapus");
      queryClient.invalidateQueries({ queryKey: ["pegawai"] });
      setSelectedPegawaiId([]);
    },
    onError: (err: any) => {
      toast.error(
        `Gagal menghapus data: ${err?.response?.data?.message || err.message}`
      );
    },
  });

  const handleDeleteSelected = () => {
    if (selectedPegawaiId.length > 0) {
      deleteData({ pegawai_ids: selectedPegawaiId });
    }
  };

  const handleDeleteSingle = (id: number) => {
    deleteData({ pegawai_ids: [id] });
  };

  // --- Effects ---
  useEffect(() => {
    handleUrlChange("search", debouncedSearch);
  }, [debouncedSearch]);

  useEffect(() => {
    if (!searchParam.has("page")) {
      handleUrlChange("page", "1");
    }
  }, []);

  // --- Loading & Error State ---
  if (isLoading && !data) {
    return (
      <div className="mt-10 mb-20 space-y-6">
        <Title title="Pegawai" subTitle="Manajemen Data Pegawai" />
        <div className="p-6 border rounded-lg mt-6">
          <Skeleton className="h-24 w-full" />
        </div>
        <div className="mt-10 space-y-2">
          {[...Array(10)].map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (isError)
    return (
      <div className="text-center mt-20 text-red-500">
        Gagal memuat data pegawai: {(error as Error).message}
      </div>
    );

  // FIX 3: Define tableData more safely
  const tableData = data?.data;

  // --- Select All Logic ---
  // FIX 4: Safely access tableData and its nested data property
  const currentPageIds = tableData?.data?.map((item) => item.id) || [];
  const isAllSelected =
    currentPageIds.length > 0 &&
    currentPageIds.every((id) => selectedPegawaiId.includes(id));

  const handleSelectAll = (checked: CheckedState) => {
    if (checked) {
      const newSelectedIds = [
        ...new Set([...selectedPegawaiId, ...currentPageIds]),
      ];
      setSelectedPegawaiId(newSelectedIds);
    } else {
      setSelectedPegawaiId((prev) =>
        prev.filter((id) => !currentPageIds.includes(id))
      );
    }
  };

  return (
    <div className="w-full mt-10 mb-20">
      <Title title="Pegawai" subTitle="Manajemen Data Pegawai" />
      <CustomCard title="Filter Pegawai">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <SelectFilter
            label="Unit Kerja"
            placeholder="-- Semua Unit Kerja --"
            options={filterOptions.unitKerja}
            value={unitKerjaFilter}
            onValueChange={(value) => handleUrlChange("unit_kerja_id", value)}
          />
          <SelectFilter
            label="Status Aktif"
            placeholder="-- Semua Status --"
            options={filterOptions.statusAktif}
            value={statusAktifFilter}
            onValueChange={(value) => handleUrlChange("status_aktif_id", value)}
          />
          <SelectFilter
            label="Hubungan Kerja"
            placeholder="-- Semua Hubungan --"
            options={filterOptions.hubunganKerja}
            value={hubunganKerjaFilter}
            onValueChange={(value) =>
              handleUrlChange("hubungan_kerja_id", value)
            }
          />
        </div>
      </CustomCard>

      <div className="mt-14 flex flex-col min-[1137px]:flex-row gap-4 justify-between">
        <div className="w-full md:w-80">
          <SearchInput
            value={searchData}
            onChange={(e) => setSearchData(e.target.value)}
            placeholder="Cari NIP atau Nama..."
          />
        </div>
        <div className="flex flex-col md:flex-row gap-2">
          <Link to="/admin/pegawai/data-pegawai">
            <Button className="cursor-pointer w-full bg-green-light-uika hover:bg-[#329C59]">
              <FaPlus className="mr-2" /> Tambah Pegawai
            </Button>
          </Link>
          {selectedPegawaiId.length > 0 && (
            <ConfirmDialog
              title="Hapus Data Terpilih?"
              description={`Apakah Anda yakin ingin menghapus ${selectedPegawaiId.length} data pegawai ini?`}
              onConfirm={handleDeleteSelected}
            >
              <Button variant="destructive" className="cursor-pointer">
                <FaRegTrashAlt className="mr-2" /> Hapus (
                {selectedPegawaiId.length})
              </Button>
            </ConfirmDialog>
          )}
        </div>
      </div>

      <div className="mt-5 border rounded-lg">
        <Table className="table-auto text-xs lg:text-sm">
          <TableHeader>
            <TableRow className="bg-gray-100 hover:bg-gray-100">
              <TableHead className="w-12">
                <Checkbox
                  checked={isAllSelected}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead>NIP</TableHead>
              <TableHead>NIDN</TableHead>
              <TableHead>Nama Pegawai</TableHead>
              <TableHead>Unit Kerja</TableHead>
              <TableHead>Pendidikan Terakhir</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* FIX 5: Check tableData and its length before mapping */}
            {tableData?.data && tableData.data.length > 0 ? (
              tableData.data.map((item) => (
                <TableRow key={item.id} className="even:bg-gray-50">
                  <TableCell>
                    <Checkbox
                      checked={selectedPegawaiId.includes(item.id)}
                      onCheckedChange={(checked) =>
                        handleSelectedPegawaiId(item.id, !!checked)
                      }
                    />
                  </TableCell>
                  <TableCell>{item.nip}</TableCell>
                  <TableCell>{item.nidn || "-"}</TableCell>
                  <TableCell>{item.nama_pegawai}</TableCell>
                  <TableCell>{item.unit_kerja}</TableCell>
                  <TableCell className="text-center">{item.pendidikan_terakhir}</TableCell>
                  <TableCell className="text-center">{item.status}</TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center items-center">
                      <Link to={`/admin/pegawai/edit-data-pegawai/${item.id}`}>
                        <Button size="icon" variant="ghost">
                          <MdEdit className="text-yellow-500" />
                        </Button>
                      </Link>
                      <Link to={`/admin/detail-pegawai/biodata/${item.id}`}>
                        <Button size="icon" variant="ghost">
                          <IoEyeOutline className="text-blue-500" />
                        </Button>
                      </Link>
                      <ConfirmDialog
                        title="Hapus Data?"
                        description={`Apakah Anda yakin ingin menghapus data "${item.nama_pegawai}"?`}
                        onConfirm={() => handleDeleteSingle(item.id)}
                      >
                        <Button size="icon" variant="ghost">
                          <FaRegTrashAlt className="text-red-500" />
                        </Button>
                      </ConfirmDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center h-48">
                  Data pegawai tidak ditemukan.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* FIX 6: Add a guard clause for the entire pagination block */}
      {tableData && tableData.data.length > 0 && (
        <CustomPagination
          currentPage={tableData.current_page}
          totalPages={tableData.last_page}
          onPageChange={(page) => handleUrlChange("page", String(page))}
          hasNextPage={tableData.current_page < tableData.last_page}
          hasPrevPage={tableData.current_page > 1}
        />
      )}
    </div>
  );
};

export default Pegawai;
