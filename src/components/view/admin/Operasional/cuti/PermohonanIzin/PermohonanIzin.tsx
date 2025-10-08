import { useEffect, useMemo, useState, useCallback } from "react";
import { useDebounce } from "use-debounce";
import { Link, useSearchParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

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

// Icons
import { IoClose, IoEyeOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";

// Services
import adminServices from "@/services/admin.services";
import patchDataServices from "@/services/patch.admin.services";

// --- Type and Schema Definitions ---
type ActionType = "approve" | "reject";

const rejectActionSchema = z.object({
  keterangan: z
    .string()
    .min(10, "Keterangan penolakan wajib diisi (minimal 10 karakter)."),
});
type ActionSchema = z.infer<typeof rejectActionSchema>;

interface IzinItem {
  id: string; // ✅ ID sebagai string
  nama_pegawai: string;
  jenis_izin: string;
  lama_izin: string;
  status: string;
}

interface FilterOption {
  id?: string;
  value?: string | number;
  nama?: string;
  label?: string;
}

interface ApiResponse {
  data: IzinItem[];
  filter_options: {
    unit_kerja: FilterOption[];
    periode_izin: FilterOption[];
    status: FilterOption[];
    jenis_izin: FilterOption[];
  };
  pagination: {
    current_page: number;
    last_page: number;
  };
}

// --- Component Definition ---
const PermohonanIzin = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const queryClient = useQueryClient();

  // --- State Management ---
  const [searchData, setSearchData] = useState(searchParam.get("search") || "");
  const [debouncedInput] = useDebounce(searchData, 500);
  const [selectedItem, setSelectedItem] = useState<string[]>([]); // ✅ DIUBAH: number[] -> string[]
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<ActionType | null>(null);

  const currentPage = searchParam.get("page") || "1";
  const unitKerjaFilter = searchParam.get("unit_kerja") || "";
  const periodeIzinFilter = searchParam.get("periode_izin") || "";
  const statusFilter = searchParam.get("status") || "";
  const jenisIzinFilter = searchParam.get("jenis_izin") || "";

  const form = useForm<ActionSchema>({
    resolver: zodResolver(rejectActionSchema),
    defaultValues: { keterangan: "" },
  });

  useEffect(() => {
    if (!isDialogOpen) {
      form.reset({ keterangan: "" });
    }
  }, [isDialogOpen, form]);

  // --- Data Fetching (React Query) ---
  const { data, isLoading, isError, error } = useQuery<ApiResponse>({
    queryKey: [
      "permohonan-izin-validasi",
      currentPage,
      debouncedInput,
      unitKerjaFilter,
      periodeIzinFilter,
      statusFilter,
      jenisIzinFilter,
    ],
    queryFn: async () => {
      const params = {
        page: currentPage,
        search: debouncedInput,
        unit_kerja: unitKerjaFilter,
        periode_izin: periodeIzinFilter,
        status: statusFilter,
        jenis_izin: jenisIzinFilter,
      };
      const response = await adminServices.getPengajuanIzinAdmin(params);
      return response.data;
    },
    placeholderData: (previousData) => previousData,
  });

  // Memoize filter options for optimization
  const filterOptions = useMemo(() => {
    const filters = data?.filter_options;
    if (!filters) {
      return {
        unitKerja: [],
        periodeIzin: [],
        status: [],
        jenisIzin: [],
      };
    }
    const mapToOptions = (items: FilterOption[] = []) =>
      items.map((opt) => ({
        value: String(opt.value ?? opt.id),
        label: opt.label ?? opt.nama ?? "",
      }));

    return {
      unitKerja: mapToOptions(filters.unit_kerja),
      periodeIzin: mapToOptions(filters.periode_izin),
      status: mapToOptions(filters.status),
      jenisIzin: mapToOptions(filters.jenis_izin),
    };
  }, [data]);

  // --- Data Mutation ---
  const handleMutationSuccess = (action: string) => {
    toast.success(`Berhasil ${action} data pengajuan.`);
    setSelectedItem([]);
    setIsDialogOpen(false);
    queryClient.invalidateQueries({ queryKey: ["permohonan-izin-validasi"] });
  };

  const handleMutationError = (err: any) =>
    toast.error(
      `Gagal: ${
        err?.response?.data?.message || err.message || "Terjadi kesalahan"
      }`
    );

  const { mutate: rejectMutation, isPending: isRejecting } = useMutation({
    mutationFn: (
      payload: { ids: string[]; keterangan: string } // ✅ DIUBAH: number[] -> string[]
    ) => patchDataServices.tolakPengajuanIzin(payload),
    onSuccess: () => handleMutationSuccess("menolak"),
    onError: handleMutationError,
  });

  const { mutate: approveMutation, isPending: isApproving } = useMutation({
    mutationFn: (
      payload: { ids: string[] } // ✅ DIUBAH: number[] -> string[]
    ) => patchDataServices.aprovePengajuanIzin(payload),
    onSuccess: () => handleMutationSuccess("menyetujui"),
    onError: handleMutationError,
  });

  // --- Event Handlers ---
  const handleUrlChange = useCallback(
    (paramName: string, value: string) => {
      const newSearchParam = new URLSearchParams(searchParam);
      if (value && value !== "semua") {
        newSearchParam.set(paramName, value);
      } else {
        newSearchParam.delete(paramName);
      }
      if (paramName !== "page") newSearchParam.set("page", "1");
      setSearchParam(newSearchParam);
    },
    [searchParam, setSearchParam]
  );

  useEffect(() => {
    handleUrlChange("search", debouncedInput);
  }, [debouncedInput, handleUrlChange]);

  const handleSubmitAction = (values: ActionSchema) => {
    if (pendingAction === "approve") {
      approveMutation({ ids: selectedItem });
    } else if (pendingAction === "reject") {
      rejectMutation({ ids: selectedItem, keterangan: values.keterangan });
    }
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

  const handleSelectedItemId = (
    id: string,
    checked: boolean // ✅ DIUBAH: number -> string
  ) =>
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
        <Title title="Validasi Permohonan Izin" />
        <div className="p-6 border rounded-lg mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
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
        <Title title="Validasi Permohonan Izin" />
        <div className="mt-10 p-4 border-l-4 border-red-500 bg-red-50 rounded-md">
          <p className="font-semibold text-red-600">Gagal Memuat Data</p>
          <p className="text-sm text-red-500">{(error as Error).message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-10 mb-20">
      <Title title="Validasi Permohonan Izin" />
      <CustomCard
        title="Filter Data"
        actions={
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
              <Label>Jenis Izin</Label>
              <SelectFilter
                placeholder="--Semua Jenis Izin--"
                options={filterOptions.jenisIzin}
                value={jenisIzinFilter}
                onValueChange={(v) => handleUrlChange("jenis_izin", v)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Periode Izin</Label>
              <SelectFilter
                placeholder="--Semua Periode--"
                options={filterOptions.periodeIzin}
                value={periodeIzinFilter}
                onValueChange={(v) => handleUrlChange("periode_izin", v)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Status Pengajuan</Label>
              <SelectFilter
                placeholder="--Semua Status--"
                options={filterOptions.status}
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
              <TableHead>Jenis Izin</TableHead>
              <TableHead className="text-center">Lama Izin</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center h-24">
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
                  <TableCell>{item.jenis_izin}</TableCell>
                  <TableCell className="text-center">
                    {item.lama_izin}
                  </TableCell>
                  <TableCell className="text-center capitalize">
                    {item.status}
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center">
                      <Link
                        to={`/admin/operasional/cuti/detail-permohonan-izin/${item.id}`}
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
                `Anda akan menyetujui ${selectedItem.length} data pengajuan izin terpilih.`}
              {pendingAction === "reject" &&
                `Anda akan menolak ${selectedItem.length} data pengajuan izin terpilih. Aksi ini tidak dapat dibatalkan.`}
            </DialogDescription>
          </DialogHeader>
          {pendingAction === "reject" ? (
            <Form {...form}>
              <form
                id="action-form"
                onSubmit={form.handleSubmit(handleSubmitAction)}
              >
                <div className="py-4">
                  <FormFieldInput
                    form={form}
                    name="keterangan"
                    label="Keterangan Penolakan"
                    placeholder="Masukkan alasan penolakan..."
                    required
                  />
                </div>
              </form>
            </Form>
          ) : null}
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
                form="action-form"
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

export default PermohonanIzin;
