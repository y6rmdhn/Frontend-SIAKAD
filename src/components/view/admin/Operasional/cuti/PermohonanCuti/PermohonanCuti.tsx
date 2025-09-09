import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "use-debounce";
import { Link, useSearchParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { IoClose, IoEyeOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";

// UI Components
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Form } from "@/components/ui/form";
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
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput";

// Services
import adminServices from "@/services/admin.services";
import patchDataServices from "@/services/patch.admin.services";

// --- Type and Schema Definitions ---
type ActionType = "approve" | "reject";

const rejectActionSchema = z.object({
  keterangan_admin: z
    .string()
    .min(10, "Keterangan penolakan wajib diisi (minimal 10 karakter)."),
});
type RejectActionSchema = z.infer<typeof rejectActionSchema>;

// FIX: Define the full shape of the API response
interface CutiItem {
  id: string;
  nama_pegawai: string;
  unit_kerja: string;
  jenis_cuti: string;
  lama_cuti: string;
  status: string;
}

interface FilterOption {
  value: string | number;
  label: string;
}

interface ApiResponse {
  data: CutiItem[];
  filter_options: {
    unit_kerja: FilterOption[];
    jenis_cuti: FilterOption[];
    status: FilterOption[];
  };
  pagination: {
    current_page: number;
    last_page: number;
  };
}

// --- Component Definition ---
const PermohonanCuti = () => {
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
  const jenisCutiFilter = searchParam.get("jenis_cuti") || "";
  const statusFilter = searchParam.get("status") || "";

  const form = useForm<RejectActionSchema>({
    resolver: zodResolver(rejectActionSchema),
    defaultValues: { keterangan_admin: "" },
  });

  useEffect(() => {
    if (!isDialogOpen) {
      form.reset({ keterangan_admin: "" });
    }
  }, [isDialogOpen, form]);

  // --- Data Fetching (React Query) ---
  // FIX: Provide the ApiResponse type to useQuery and replace `keepPreviousData`
  const { data, isLoading, isError, error } = useQuery<ApiResponse>({
    queryKey: [
      "permohonan-cuti-validasi-data",
      currentPage,
      debouncedInput,
      unitKerjaFilter,
      jenisCutiFilter,
      statusFilter,
    ],
    queryFn: async () => {
      const params = {
        page: currentPage,
        search: debouncedInput,
        unit_kerja: unitKerjaFilter,
        jenis_cuti: jenisCutiFilter,
        status: statusFilter,
      };
      const response = await adminServices.getPengajuanCutiAdmin(params);
      return response.data;
    },
    placeholderData: (previousData) => previousData,
  });

  // Memoize filter options for optimization
  const filterOptions = useMemo(() => {
    const filters = data?.filter_options;
    if (!filters) return { unitKerja: [], jenisCuti: [], statusPengajuan: [] };

    const mapToOptions = (items: FilterOption[]) =>
      items?.map((opt) => ({
        value: String(opt.value),
        label: opt.label,
      })) || [];

    return {
      unitKerja: mapToOptions(filters.unit_kerja),
      jenisCuti: mapToOptions(filters.jenis_cuti),
      statusPengajuan: mapToOptions(filters.status),
    };
  }, [data]);

  // --- Data Mutation ---
  const handleMutationSuccess = (action: string) => {
    toast.success(`Berhasil ${action} data pengajuan.`);
    setSelectedItem([]);
    setIsDialogOpen(false);
    queryClient.invalidateQueries({
      queryKey: ["permohonan-cuti-validasi-data"],
    });
  };

  const handleMutationError = (err: any) =>
    toast.error(
      `Gagal: ${
        err?.response?.data?.message || err.message || "Terjadi kesalahan"
      }`
    );

  // FIX: use `isPending` instead of `isLoading` for mutations
  const { mutate: rejectMutation, isPending: isRejecting } = useMutation({
    mutationFn: (payload: { ids: number[]; keterangan_admin: string }) =>
      patchDataServices.tolakPengajuanCuti(payload),
    onSuccess: () => handleMutationSuccess("menolak"),
    onError: handleMutationError,
  });

  // FIX: use `isPending` instead of `isLoading` for mutations
  const { mutate: approveMutation, isPending: isApproving } = useMutation({
    mutationFn: (payload: { ids: number[] }) =>
      patchDataServices.aprovePengajuanCuti(payload),
    onSuccess: () => handleMutationSuccess("menyetujui"),
    onError: handleMutationError,
  });

  // --- Event Handlers ---
  const handleUrlChange = (paramName: string, value: string) => {
    const newSearchParam = new URLSearchParams(searchParam);
    if (value && value !== "semua") {
      newSearchParam.set(paramName, value);
    } else {
      newSearchParam.delete(paramName);
    }
    if (paramName !== "page") newSearchParam.set("page", "1");
    setSearchParam(newSearchParam);
  };

  useEffect(() => {
    handleUrlChange("search", debouncedInput);
  }, [debouncedInput]);

  const handleSubmitReject = (values: RejectActionSchema) => {
    rejectMutation({
      ids: selectedItem,
      keterangan_admin: values.keterangan_admin,
    });
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
  const pageIds = tableData.map((item) => item.id);
  const isAllSelectedOnPage =
    pageIds.length > 0 && pageIds.every((id) => selectedItem.includes(id));
  const isSomeSelectedOnPage =
    !isAllSelectedOnPage && pageIds.some((id) => selectedItem.includes(id));

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
  if (isLoading && !data) {
    return (
      <div className="mt-10 mb-20 space-y-6">
        <Title title="Validasi Permohonan Cuti" />
        <div className="p-6 border rounded-lg mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10 space-y-2">
          {[...Array(10)].map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mt-10 mb-20 text-center">
        <Title title="Validasi Permohonan Cuti" />
        <div className="mt-10 p-4 border-l-4 border-red-500 bg-red-50 rounded-md">
          <p className="font-semibold text-red-600">Gagal Memuat Data</p>
          <p className="text-sm text-red-500">{(error as Error).message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-10 mb-20">
      <Title title="Validasi Permohonan Cuti" />
      <CustomCard
        title="Filter Data"
        actions={
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col gap-2">
              <Label>Unit Kerja</Label>
              <SelectFilter
                placeholder="--Semua Unit Kerja--"
                options={filterOptions.unitKerja}
                value={unitKerjaFilter}
                onValueChange={(v) => handleUrlChange("unit_kerja", v)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Jenis Cuti</Label>
              <SelectFilter
                placeholder="--Semua Jenis Cuti--"
                options={filterOptions.jenisCuti}
                value={jenisCutiFilter}
                onValueChange={(v) => handleUrlChange("jenis_cuti", v)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Status Pengajuan</Label>
              <SelectFilter
                placeholder="--Semua Status--"
                options={filterOptions.statusPengajuan}
                value={statusFilter}
                onValueChange={(v) => handleUrlChange("status", v)}
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
        {selectedItem.length > 0 && (
          <div className="flex flex-col md:flex-row gap-2">
            <Button
              onClick={() => handleOpenDialog("approve")}
              className="bg-green-600 hover:bg-green-700"
              disabled={isApproving || isRejecting}
            >
              <FaCheck className="mr-2" /> Setujui ({selectedItem.length})
            </Button>
            <Button
              onClick={() => handleOpenDialog("reject")}
              variant="destructive"
              disabled={isApproving || isRejecting}
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
              <TableHead>Nama Pegawai</TableHead>
              <TableHead>Unit Kerja</TableHead>
              <TableHead className="text-center">Jenis Cuti</TableHead>
              <TableHead className="text-center">Lama Cuti</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center h-24">
                  Data tidak ditemukan.
                </TableCell>
              </TableRow>
            ) : (
              tableData.map((item) => (
                <TableRow key={item.id} className="even:bg-gray-50">
                  <TableCell className="text-center">
                    <Checkbox
                      checked={selectedItem.includes(item.id)}
                      onCheckedChange={(c) =>
                        handleSelectedItemId(item.id, !!c)
                      }
                    />
                  </TableCell>
                  <TableCell>{item.nama_pegawai}</TableCell>
                  <TableCell>{item.unit_kerja}</TableCell>
                  <TableCell className="text-center">
                    {item.jenis_cuti}
                  </TableCell>
                  <TableCell className="text-center">
                    {item.lama_cuti}
                  </TableCell>
                  <TableCell className="text-center capitalize">
                    {item.status}
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center">
                      <Link
                        to={`/admin/operasional/cuti/detail-permohonan-cuti/${item.id}`}
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

      <CustomPagination
        currentPage={data?.pagination?.current_page || 1}
        onPageChange={(p) => handleUrlChange("page", String(p))}
        totalPages={data?.pagination?.last_page || 1}
      />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {pendingAction === "approve" && `Konfirmasi Persetujuan`}
              {pendingAction === "reject" && `Konfirmasi Penolakan`}
            </DialogTitle>
            <DialogDescription>
              {pendingAction === "approve" &&
                `Anda akan menyetujui ${selectedItem.length} data pengajuan cuti terpilih.`}
              {pendingAction === "reject" &&
                `Anda akan menolak ${selectedItem.length} data pengajuan cuti terpilih.`}
            </DialogDescription>
          </DialogHeader>
          {pendingAction === "reject" && (
            <Form {...form}>
              <form
                id="reject-action-form"
                onSubmit={form.handleSubmit(handleSubmitReject)}
              >
                <div className="py-4">
                  <FormFieldInput
                    form={form}
                    name="keterangan_admin"
                    label="Keterangan Penolakan"
                    placeholder="Masukkan alasan penolakan..."
                    required
                  />
                </div>
              </form>
            </Form>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              type="button"
              onClick={() => setIsDialogOpen(false)}
            >
              Batal
            </Button>
            {pendingAction === "approve" && (
              <Button
                onClick={() => approveMutation({ ids: selectedItem })}
                className="bg-green-600 hover:bg-green-700"
                disabled={isApproving}
              >
                {isApproving ? "Memproses..." : "Ya, Setujui"}
              </Button>
            )}
            {pendingAction === "reject" && (
              <Button
                type="submit"
                form="reject-action-form"
                variant="destructive"
                disabled={isRejecting}
              >
                {isRejecting ? "Memproses..." : "Ya, Tolak"}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PermohonanCuti;
