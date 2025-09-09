import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "use-debounce";
import { Link, useSearchParams } from "react-router-dom";
import {
  useMutation,
  useQuery,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query"; // Diperbarui
import { toast } from "sonner";

// UI Components
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Custom Components
import CustomCard from "@/components/blocks/Card";
import CustomPagination from "@/components/blocks/CustomPagination";
import SearchInput from "@/components/blocks/SearchInput";
import SelectFilter from "@/components/blocks/SelectFilter";
import Title from "@/components/blocks/Title";

// Icons
import { IoClose, IoEyeOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";

// Services
import adminServices from "@/services/admin.services";
import patchDataServices from "@/services/patch.admin.services";

// --- Type Definitions ---
type ActionType = "approve" | "reject";

interface DiklatItem {
  id: string;
  nip: string;
  nama_pegawai: string;
  nama_diklat: string;
  jenis_diklat: string;
  penyelenggara: string;
  tahun_penyelenggaraan: string;
  status_pengajuan_label: string;
  tgl_diajukan_formatted: string;
}

interface ApiResponse {
  data: DiklatItem[];
  pagination: {
    current_page: number;
    last_page: number;
  };
  filters: {
    unit_kerja: any[];
    jenis_diklat: any[];
    status_pengajuan: any[];
  };
  table_columns: any[];
}
// --- Component Definition ---
const DiklatValidasi = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const queryClient = useQueryClient();

  // --- State Management ---
  const [searchData, setSearchData] = useState(searchParam.get("search") || "");
  const [debouncedInput] = useDebounce(searchData, 500);
  const [selectedItem, setSelectedItem] = useState<number[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<ActionType | null>(null);

  const currentPage = searchParam.get("page") || "1";
  const unitKerjaFilter = searchParam.get("unit_kerja") || "";
  const jenisDiklatFilter = searchParam.get("jenis_diklat") || "";
  const statusFilter = searchParam.get("status_pengajuan") || "";

  // --- Data Fetching ---
  const { data, isLoading, isError } = useQuery<ApiResponse>({
    queryKey: [
      "diklat-validasi-data",
      currentPage,
      debouncedInput,
      unitKerjaFilter,
      jenisDiklatFilter,
      statusFilter,
    ],
    queryFn: async () => {
      const params = {
        page: currentPage,
        search: debouncedInput,
        unit_kerja: unitKerjaFilter,
        jenis_diklat: jenisDiklatFilter,
        status_pengajuan: statusFilter,
      };
      const response = await adminServices.getDiklatValidasiData(params);
      // PERBAIKAN: Mengembalikan seluruh object `response.data`
      return response.data;
    },
    // PERBAIKAN: Menggunakan `placeholderData` untuk TanStack Query v5
    placeholderData: keepPreviousData,
  });

  // --- Memoized Filter Options ---
  const filterOptions = useMemo(() => {
    // PERBAIKAN: Path filter disesuaikan dengan struktur API
    const filters = data?.filters || {};
    const mapToOptions = (items: any[]) =>
      items?.map((opt) => ({ value: String(opt.id), label: opt.nama })) || [];
    return {
      // @ts-ignore
      unitKerja: mapToOptions(filters.unit_kerja),
      // @ts-ignore
      jenisDiklat: mapToOptions(filters.jenis_diklat),
      // @ts-ignore
      statusPengajuan: mapToOptions(filters.status_pengajuan),
    };
  }, [data]);

  // --- Data Mutations ---
  const handleSuccess = (actionText: string) => {
    toast.success(`Berhasil ${actionText} data pengajuan.`);
    setSelectedItem([]);
    setIsDialogOpen(false);
    queryClient.invalidateQueries({ queryKey: ["diklat-validasi-data"] });
  };

  const handleError = (err: any) =>
    toast.error(
      `Gagal: ${
        err?.response?.data?.message || err.message || "Terjadi kesalahan"
      }`
    );

  // PERBAIKAN: `isLoading` diganti menjadi `isPending` untuk TanStack Query v5
  const { mutate: rejectMutation, isPending: isRejecting } = useMutation({
    mutationFn: (payload: { ids: number[] }) =>
      patchDataServices.rejectDataDiklat(payload),
    onSuccess: () => handleSuccess("menolak"),
    onError: handleError,
  });

  const { mutate: approveMutation, isPending: isApproving } = useMutation({
    mutationFn: (payload: { ids: number[] }) =>
      patchDataServices.approveDataDiklat(payload),
    onSuccess: () => handleSuccess("menyetujui"),
    onError: handleError,
  });

  // --- Event Handlers & Table Logic ---
  const handleUrlChange = (paramName: string, value: string) => {
    const newSearchParams = new URLSearchParams(searchParam);
    if (value && value !== "semua") newSearchParams.set(paramName, value);
    else newSearchParams.delete(paramName);
    if (paramName !== "page") newSearchParams.set("page", "1");
    setSearchParam(newSearchParams);
  };

  useEffect(() => {
    handleUrlChange("search", debouncedInput);
  }, [debouncedInput]);

  const handleOpenDialog = (action: ActionType) => {
    if (selectedItem.length === 0) {
      toast.warning("Pilih setidaknya satu data untuk diproses.");
      return;
    }
    setPendingAction(action);
    setIsDialogOpen(true);
  };

  const handleConfirmAction = () => {
    if (pendingAction === "approve") approveMutation({ ids: selectedItem });
    else if (pendingAction === "reject") rejectMutation({ ids: selectedItem });
  };

  const tableData = data?.data || [];
  const pageIds = tableData.map((item) => item.id);
  const isAllSelectedOnPage =
    pageIds.length > 0 && pageIds.every((id) => selectedItem.includes(id));
  const isSomeSelectedOnPage = pageIds.some((id) => selectedItem.includes(id));

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

  const dialogDetails = {
    approve: {
      title: "Konfirmasi Persetujuan",
      description: `Anda akan menyetujui ${selectedItem.length} data terpilih.`,
    },
    reject: {
      title: "Konfirmasi Penolakan",
      description: `Anda akan menolak ${selectedItem.length} data terpilih.`,
    },
  };

  if (isLoading && !data) {
    /* ... Loading state ... */
  }
  if (isError) {
    /* ... Error state ... */
  }

  return (
    <div className="mt-10 mb-20">
      <Title title="Validasi Riwayat Diklat" subTitle="Kualifikasi" />
      <CustomCard
        title="Filter Data"
        actions={
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <SelectFilter
              placeholder="--Semua Unit Kerja--"
              options={filterOptions.unitKerja}
              value={unitKerjaFilter}
              onValueChange={(v) => handleUrlChange("unit_kerja", v)}
              label="Unit Kerja"
            />
            <SelectFilter
              placeholder="--Semua Jenis--"
              options={filterOptions.jenisDiklat}
              value={jenisDiklatFilter}
              onValueChange={(v) => handleUrlChange("jenis_diklat", v)}
              label="Jenis Diklat"
            />
            <SelectFilter
              placeholder="--Semua Status--"
              options={filterOptions.statusPengajuan}
              value={statusFilter}
              onValueChange={(v) => handleUrlChange("status_pengajuan", v)}
              label="Status Pengajuan"
            />
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
        {selectedItem.length > 0 && (
          <div className="flex flex-col md:flex-row gap-2">
            <Button
              onClick={() => handleOpenDialog("approve")}
              className="bg-green-600 hover:bg-green-700"
            >
              <FaCheck className="mr-2" /> Setujui ({selectedItem.length})
            </Button>
            <Button
              onClick={() => handleOpenDialog("reject")}
              variant="destructive"
            >
              <IoClose className="mr-2" /> Tolak ({selectedItem.length})
            </Button>
          </div>
        )}
      </div>

      <div className="mt-5 border rounded-lg">
        <Table className="text-xs lg:text-sm">
          <TableHeader>
            <TableRow className="bg-gray-100 hover:bg-gray-100">
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
            {isLoading ? (
              [...Array(10)].map((_, i) => (
                <TableRow key={i}>
                  <TableCell colSpan={9}>
                    <Skeleton className="h-6 w-full" />
                  </TableCell>
                </TableRow>
              ))
            ) : tableData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={
                    // @ts-ignore
                    data?.table_columns?.length + 1 || 10
                  }
                  className="text-center h-24"
                >
                  Data tidak ditemukan.
                </TableCell>
              </TableRow>
            ) : (
              tableData.map((item: DiklatItem) => (
                <TableRow key={item.id} className="even:bg-gray-50">
                  <TableCell className="text-center">
                    <Checkbox
                      checked={selectedItem.includes(item.id)}
                      onCheckedChange={(c) =>
                        handleSelectedItemId(item.id, !!c)
                      }
                    />
                  </TableCell>
                  <TableCell className="text-center">{item.nip}</TableCell>
                  <TableCell>{item.nama_pegawai}</TableCell>
                  <TableCell>{item.nama_diklat}</TableCell>
                  <TableCell className="text-center">
                    {item.jenis_diklat}
                  </TableCell>
                  <TableCell>{item.penyelenggara}</TableCell>
                  <TableCell className="text-center">
                    {item.tahun_penyelenggaraan}
                  </TableCell>
                  <TableCell className="text-center">
                    {item.status_pengajuan_label}
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center">
                      <Link
                        to={`/admin/validasi-data/kualifikasi/diklat/detail-diklat/${item.id}`}
                      >
                        <Button size="icon" variant="ghost">
                          <IoEyeOutline className="text-blue-500" />
                        </Button>
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {data?.data && data.data.length > 0 && (
        <CustomPagination
          currentPage={data.pagination.current_page}
          totalPages={data.pagination.last_page}
          onPageChange={(p) => handleUrlChange("page", String(p))}
          hasNextPage={data.pagination.current_page < data.pagination.last_page}
          hasPrevPage={data.pagination.current_page > 1}
        />
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {pendingAction && dialogDetails[pendingAction]?.title}
            </DialogTitle>
            <DialogDescription>
              {pendingAction && dialogDetails[pendingAction]?.description}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              type="button"
              onClick={() => setIsDialogOpen(false)}
            >
              Batal
            </Button>
            <Button
              onClick={handleConfirmAction}
              className={
                pendingAction === "approve"
                  ? "bg-green-600 hover:bg-green-700"
                  : ""
              }
              variant={pendingAction === "reject" ? "destructive" : "default"}
              disabled={isApproving || isRejecting}
            >
              {isApproving || isRejecting
                ? "Memproses..."
                : `Ya, ${pendingAction === "approve" ? "Setujui" : "Tolak"}`}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DiklatValidasi;
