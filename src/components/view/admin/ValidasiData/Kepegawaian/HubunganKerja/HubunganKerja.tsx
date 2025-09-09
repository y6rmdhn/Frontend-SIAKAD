import { useEffect, useMemo, useState, useCallback } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useDebounce } from "use-debounce";
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
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { FaCheck, FaPlus } from "react-icons/fa";

// Services
import adminServices from "@/services/admin.services";
import patchDataServices from "@/services/patch.admin.services";
import environment from "@/config/environments";

// --- Definisi Tipe Data ---

type ActionType = "approve" | "reject";

const rejectActionSchema = z.object({
  keterangan_penolakan: z.string().min(10, {
    message: "Keterangan penolakan wajib diisi (minimal 10 karakter).",
  }),
});
type ActionSchema = z.infer<typeof rejectActionSchema>;

interface HubunganKerjaItem {
  id: string;
  nip_pegawai: string;
  nama_pegawai: string;
  tgl_mulai_formatted: string;
  tgl_selesai_formatted: string;
  hubungan_kerja_label: string;
  keterangan: string | null;
  file_hubungan_kerja_link: string | null;
  file_penghargaan?: string;
  status_pengajuan: string;
}

interface PaginatedData {
  data: HubunganKerjaItem[];
  current_page: number;
  last_page: number;
  links: any[];
}

interface FilterOption {
  id: string;
  nama: string;
}

interface TableColumn {
  field: string;
  label: string;
}

interface ApiResponse {
  data: PaginatedData;
  filters: {
    original: {
      filter_options: {
        unit_kerja: FilterOption[];
        jabatan_fungsional: FilterOption[];
        status_pengajuan: FilterOption[];
      };
    };
  };
  table_columns: TableColumn[];
}

// --- Definisi Komponen ---
const HubunganKerjaKepegawaian = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const queryClient = useQueryClient();

  // --- State Management ---
  const [searchData, setSearchData] = useState(searchParam.get("search") || "");
  const [debouncedInput] = useDebounce(searchData, 500);
  const [selectedItem, setSelectedItem] = useState<number[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<ActionType | null>(null);

  const currentPage = searchParam.get("page") || "1";
  const unitKerjaFilter = searchParam.get("unit_kerja_id") || "";
  const jabatanFilter = searchParam.get("jabatan_fungsional_id") || "";
  const statusFilter = searchParam.get("status_pengajuan") || "";

  const form = useForm<ActionSchema>({
    resolver: zodResolver(rejectActionSchema),
    defaultValues: { keterangan_penolakan: "" },
  });

  useEffect(() => {
    if (!isDialogOpen) {
      form.reset({ keterangan_penolakan: "" });
    }
  }, [isDialogOpen, form]);

  // --- Data Fetching (React Query) ---
  const { data, isLoading, isError, error } = useQuery<ApiResponse>({
    queryKey: [
      "hubungan-kerja-validasi",
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
        unit_kerja_id: unitKerjaFilter,
        jabatan_fungsional_id: jabatanFilter,
        status_pengajuan: statusFilter,
      };
      const response = await adminServices.getHubunganKerjaValidasiData(params);
      return response.data;
    },
    placeholderData: (previousData) => previousData,
  });

  // Memoize filter options
  const filterOptions = useMemo(() => {
    const options = data?.filters?.original?.filter_options;
    if (!options)
      return { unitKerja: [], jabatanFungsional: [], statusPengajuan: [] };

    const mapToOptions = (items: FilterOption[] = []) =>
      items.map((opt) => ({ value: String(opt.id), label: opt.nama }));

    return {
      unitKerja: mapToOptions(options.unit_kerja),
      jabatanFungsional: mapToOptions(options.jabatan_fungsional),
      statusPengajuan: mapToOptions(options.status_pengajuan),
    };
  }, [data?.filters]);

  // --- Data Mutation ---
  const handleSuccess = (action: string) => {
    toast.success(`Berhasil ${action} data pengajuan.`);
    setSelectedItem([]);
    setIsDialogOpen(false);
    queryClient.invalidateQueries({ queryKey: ["hubungan-kerja-validasi"] });
  };

  const handleError = (err: any) =>
    toast.error(
      `Gagal: ${
        err?.response?.data?.message || err.message || "Terjadi kesalahan"
      }`
    );

  const { mutate: rejectMutation, isPending: isRejecting } = useMutation({
    mutationFn: (payload: { ids: number[]; keterangan_penolakan: string }) =>
      patchDataServices.rejectDataRiwayatHubunganKerja(payload),
    onSuccess: () => handleSuccess("menolak"),
    onError: handleError,
  });

  const { mutate: approveMutation, isPending: isApproving } = useMutation({
    mutationFn: (payload: { ids: number[] }) =>
      patchDataServices.approveDataRiwayatHubunganKerja(payload),
    onSuccess: () => handleSuccess("menyetujui"),
    onError: handleError,
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
    if (pendingAction === "reject") {
      rejectMutation({
        ids: selectedItem,
        keterangan_penolakan: values.keterangan_penolakan,
      });
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
  const tableData = data?.data;
  const pageIds = tableData?.data?.map((item) => item.id) || [];
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
        <Title title="Validasi Data Riwayat Hubungan Kerja" />
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
        <Title title="Validasi Data Riwayat Hubungan Kerja" />
        <div className="mt-10 p-4 border-l-4 border-red-500 bg-red-50 rounded-md">
          <p className="font-semibold text-red-600">Gagal Memuat Data</p>
          <p className="text-sm text-red-500">{(error as Error).message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-10 mb-20">
      <Title title="Validasi Data Riwayat Hubungan Kerja" />
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
              <Label>Jabatan Fungsional</Label>
              <SelectFilter
                placeholder="--Semua Jabatan--"
                options={filterOptions.jabatanFungsional || []}
                value={jabatanFilter}
                onValueChange={(v) =>
                  handleUrlChange("jabatan_fungsional_id", v)
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Status</Label>
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

         <Link to="/admin/validasi-data/keluarga/tambah-keluarga">
              <Button className="bg-green-600 hover:bg-green-700 w-full md:w-auto">
                <FaPlus className="mr-2" /> Tambah Data
              </Button>
            </Link>
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
              {data?.table_columns?.map((col) => (
                <TableHead key={col.field} className="text-center">
                  {col.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {!tableData?.data?.length ? (
              <TableRow>
                {/* FIX: Safely calculate colSpan */}
                <TableCell
                  colSpan={(data?.table_columns?.length ?? 10) + 1}
                  className="text-center h-24"
                >
                  Data tidak ditemukan.
                </TableCell>
              </TableRow>
            ) : (
              tableData.data.map((item) => (
                <TableRow key={item.id} className="even:bg-gray-50">
                  <TableCell className="text-center">
                    <Checkbox
                      checked={selectedItem.includes(item.id)}
                      onCheckedChange={(c) =>
                        handleSelectedItemId(item.id, !!c)
                      }
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
                  <TableCell>{item.hubungan_kerja_label}</TableCell>
                  <TableCell>{item.keterangan || "-"}</TableCell>
                  <TableCell>
                    <Label className="text-xs sm:text-sm text-left flex-1">
                      {item?.file_hubungan_kerja_link ? (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="link"
                              className="p-0 h-auto text-blue-600 hover:underline hover:text-blue-800"
                            >
                              Lihat File
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[600px]">
                            <DialogHeader>
                              <DialogTitle>Pratinjau File</DialogTitle>
                            </DialogHeader>
                            <div className="py-4">
                              {/\.(jpeg|jpg|png|gif)$/i.test(
                                item.file_penghargaan || ""
                              ) ? (
                                <img
                                  src={`${environment.API_IMAGE_URL_SECOND}${item.file_hubungan_kerja_link}`}
                                  alt="Pratinjau File"
                                  className="w-full h-auto rounded-md object-contain max-h-[70vh]"
                                />
                              ) : (
                                <div className="text-center">
                                  <p className="mb-4">
                                    Pratinjau tidak tersedia untuk tipe file
                                    ini. Silakan buka di tab baru.
                                  </p>
                                  <a
                                    href={`${environment.API_IMAGE_URL_SECOND}${item.file_hubungan_kerja_link}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <Button>Buka File</Button>
                                  </a>
                                </div>
                              )}
                            </div>
                            <DialogFooter>
                              <DialogClose asChild>
                                <Button type="button" variant="secondary">
                                  Tutup
                                </Button>
                              </DialogClose>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      ) : (
                        <span>-</span>
                      )}
                    </Label>
                  </TableCell>
                  <TableCell className="text-center">
                    {item.status_pengajuan}
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center">
                      <Link
                        to={`/admin/validasi-data/kepegawaian/hubungan-kerja/detail-hubungan-kerja/${item.id}`}
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
        currentPage={tableData?.current_page || 1}
        links={tableData?.links || []}
        onPageChange={(page) => handleUrlChange("page", String(page))}
        totalPages={tableData?.last_page}
      />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {pendingAction === "approve"
                ? "Konfirmasi Persetujuan"
                : "Konfirmasi Penolakan"}
            </DialogTitle>
            <DialogDescription>
              Anda akan {pendingAction === "approve" ? "menyetujui" : "menolak"}{" "}
              {selectedItem.length} data terpilih. Aksi ini tidak dapat
              dibatalkan.
            </DialogDescription>
          </DialogHeader>
          {pendingAction === "reject" && (
            <Form {...form}>
              <form
                id="action-form"
                onSubmit={form.handleSubmit(handleSubmitAction)}
              >
                <div className="py-4">
                  <FormFieldInput
                    form={form}
                    name="keterangan_penolakan"
                    label="Keterangan Penolakan"
                    placeholder="Masukkan alasan penolakan..."
                    required
                  />
                </div>
              </form>
            </Form>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Batal
            </Button>
            {pendingAction === "approve" ? (
              <Button
                onClick={() => approveMutation({ ids: selectedItem })}
                className="bg-green-600 hover:bg-green-700"
                disabled={isApproving}
              >
                {isApproving ? "Memproses..." : "Ya, Setujui"}
              </Button>
            ) : (
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

export default HubunganKerjaKepegawaian;
