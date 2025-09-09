import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "use-debounce";
import { Link, useSearchParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { IoClose, IoEyeOutline } from "react-icons/io5";
import { FaCheck, FaPlus } from "react-icons/fa";
import { MdPlayArrow } from "react-icons/md";

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

// Services
import adminServices from "@/services/admin.services";
import patchDataServices from "@/services/patch.admin.services";

// --- Type Definitions ---
type ActionType = "approve" | "reject" | "draft";

// --- Component Definition ---
const JabatanStruktural = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const queryClient = useQueryClient();

  // --- State Management ---
  const [searchData, setSearchData] = useState(searchParam.get("search") || "");
  const [debouncedInput] = useDebounce(searchData, 500);
  const [selectedItem, setSelectedItem] = useState<number[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<ActionType | null>(null);

  // Ambil nilai filter langsung dari URL
  const currentPage = searchParam.get("page") || "1";
  const unitKerjaFilter = searchParam.get("unit_kerja") || "";
  const jabatanFilter = searchParam.get("jabatan_struktural") || "";
  const statusFilter = searchParam.get("status_pengajuan") || "";

  // --- Data Fetching (React Query) ---
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [
      "jabatan-struktural-validasi-data",
      currentPage,
      debouncedInput,
      unitKerjaFilter,
      jabatanFilter,
      statusFilter,
    ],
    queryFn: async () => {
      const params = {
        page: currentPage,
        search: debouncedInput,
        unit_kerja: unitKerjaFilter,
        jabatan_struktural: jabatanFilter,
        status_pengajuan: statusFilter,
      };
      const response = await adminServices.getJabatanStrukturalValidasiData(
        params
      );
      return response.data; // Asumsikan API mengembalikan seluruh data termasuk filter
    },
  });

  // Memoize filter options untuk optimasi
  const filterOptions = useMemo(() => {
    const options = data?.filters?.original?.filter_options;
    if (!options) return {};

    const mapToOptions = (items: any[]) =>
      items?.map((opt) => ({ value: String(opt.id), label: opt.nama })) || [];

    return {
      unitKerja: mapToOptions(options.unit_kerja),
      jabatanStruktural: mapToOptions(options.jabatan_struktural), // Sesuaikan nama properti
      statusPengajuan: mapToOptions(options.status_pengajuan),
    };
  }, [data]);

  // --- Data Mutation ---
  const handleSuccess = (action: ActionType) => {
    toast.success(`Berhasil ${action} data pengajuan`);
    setSelectedItem([]);
    setIsDialogOpen(false);
    queryClient.invalidateQueries({
      queryKey: ["jabatan-struktural-validasi-data"],
    });
  };

  const handleError = (err: any) =>
    toast.error(`Gagal: ${err?.message || "Terjadi kesalahan"}`);

  const { mutate: rejectMutation } = useMutation({
    mutationFn: (payload: { ids: number[] }) =>
      patchDataServices.rejectDataJabatanStruktural(payload),
    onSuccess: () => handleSuccess("reject"),
    onError: handleError,
  });

  const { mutate: approveMutation } = useMutation({
    mutationFn: (payload: { ids: number[] }) =>
      patchDataServices.approveDataJabatanStruktural(payload),
    onSuccess: () => handleSuccess("approve"),
    onError: handleError,
  });

  const { mutate: draftMutation } = useMutation({
    mutationFn: (payload: { ids: number[] }) =>
      patchDataServices.draftDataJabatanStruktural(payload),
    onSuccess: () => handleSuccess("draft"),
    onError: handleError,
  });

  // --- Event Handlers ---
  const handleUrlChange = (paramName: string, value: string) => {
    const newSearchParam = new URLSearchParams(searchParam);
    if (value) {
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

  const handleSubmitAction = () => {
    const payload = { ids: selectedItem };
    if (pendingAction === "approve") approveMutation(payload);
    else if (pendingAction === "reject") rejectMutation(payload);
    else if (pendingAction === "draft") draftMutation(payload);
    else toast.error("Aksi tidak diketahui");
  };

  const handleOpenDialog = (action: ActionType) => {
    if (selectedItem.length === 0) {
      toast.warning("Pilih setidaknya satu data untuk diproses.");
      return;
    }
    setPendingAction(action);
    setIsDialogOpen(true);
  };

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

  const dialogDetails = {
    approve: {
      title: "Konfirmasi Persetujuan",
      description: `Anda akan menyetujui ${selectedItem.length} data terpilih.`,
      confirmClass: "bg-green-600 hover:bg-green-700",
    },
    reject: {
      title: "Konfirmasi Penolakan",
      description: `Anda akan menolak ${selectedItem.length} data terpilih.`,
      confirmClass: "bg-red-600 hover:bg-red-700",
    },
    draft: {
      title: "Konfirmasi Draft",
      description: `Anda akan mengubah status ${selectedItem.length} data menjadi "draf".`,
      confirmClass: "bg-blue-500 hover:bg-blue-600",
    },
  };

  // --- Loading and Error States ---
  if (isLoading) {
    return (
      <div className="mt-10 mb-20">
        <Title title="Validasi Data Jabatan Struktural" />
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
        <Title title="Validasi Data Jabatan Struktural" />
        <div className="mt-10 p-4 border-l-4 border-red-500 bg-red-50 rounded-md">
          <p className="font-semibold text-red-600">Gagal Memuat Data</p>
          <p className="text-sm text-red-500">{(error as Error).message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-10 mb-20">
      <Title title="Validasi Data Jabatan Struktural" />
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
                onValueChange={(v) => handleUrlChange("unit_kerja", v)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Jabatan Struktural</Label>
              <SelectFilter
                placeholder="--Semua Jabatan--"
                options={filterOptions.jabatanStruktural || []}
                value={jabatanFilter}
                onValueChange={(v) => handleUrlChange("jabatan_struktural", v)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Status Pengajuan</Label>
              <SelectFilter
                placeholder="--Semua Status--"
                options={filterOptions.statusPengajuan || []}
                value={statusFilter}
                onValueChange={(v) => handleUrlChange("status_pengajuan", v)}
              />
            </div>
          </div>
        }
      />
      <div className="flex flex-col md:flex-row md:justify-between mt-10 gap-4">
  {/* Search Input */}
  <SearchInput
    placeholder="Cari NIP atau nama pegawai..."
    value={searchData}
    onChange={(e) => setSearchData(e.target.value)}
    className="w-full md:w-80"
  />

    {/* Tombol Aksi */}
    <div className="flex flex-wrap md:flex-row gap-2 justify-end">
      {selectedItem.length > 0 && (
        <>
          <Button
            type="button"
            onClick={() => handleOpenDialog("approve")}
            className="bg-green-light-uika hover:bg-[#329C59]"
          >
            <FaCheck className="mr-2" /> Approve ({selectedItem.length})
          </Button>
          <Button
            type="button"
            onClick={() => handleOpenDialog("reject")}
            variant="destructive"
          >
            <IoClose className="mr-2" /> Reject ({selectedItem.length})
          </Button>
        </>
      )}

      {/* Tombol Tambah Data selalu muncul */}
      <Link to="/admin/validasi-data/keluarga/tambah-keluarga">
        <Button className="bg-green-600 hover:bg-green-700 w-full md:w-auto">
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
                colSpan={data?.table_columns?.length + 1 || 10}
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
                <TableCell className="text-center">
                  {item.nip_pegawai}
                </TableCell>
                <TableCell>{item.nama_pegawai}</TableCell>
                <TableCell className="text-center">
                  {item.tgl_mulai_formatted}
                </TableCell>
                <TableCell className="text-center">
                  {item.tgl_selesai_formatted}
                </TableCell>
                <TableCell>{item.nama_jabatan_struktural}</TableCell>
                <TableCell className="text-center">{/* File Link */}</TableCell>
                <TableCell className="text-center">
                  {item.tgl_disetujui_formatted}
                </TableCell>
                <TableCell>
                  <div className="flex justify-center">
                    <Link
                      to={`/admin/validasi-data/kepegawaian/jabatan-struktural/detail-jabatan-struktural/${item.id}`}
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
      <CustomPagination
        currentPage={Number(currentPage)}
        links={tableData?.links || []}
        onPageChange={(p) => handleUrlChange("page", String(p))}
        totalPages={tableData?.last_page}
      />

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
              onClick={handleSubmitAction}
              className={
                pendingAction ? dialogDetails[pendingAction]?.confirmClass : ""
              }
            >
              Ya, Konfirmasi
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default JabatanStruktural;
