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
  DialogTrigger,
  DialogClose,
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
  keterangan: z.string().min(10, "Keterangan penolakan minimal 10 karakter."),
});
type RejectActionSchema = z.infer<typeof rejectActionSchema>;

interface JabatanAkademikItem {
  id: string;
  nip_pegawai: string;
  nama_pegawai: string;
  tmt_jabatan_formatted: string;
  nama_jabatan_akademik: string;
  tgl_sk_formatted: string;
  no_sk: string;
  file_jabatan_link: string | null;
  status_pengajuan: string;
}

interface PaginatedData {
  data: JabatanAkademikItem[];
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
      filters: {
        unit_kerja: FilterOption[];
        jabatan_akademik: FilterOption[];
        status_pengajuan: FilterOption[];
      };
    };
  };
  table_columns: TableColumn[];
}

// --- Definisi Komponen ---
const JabatanAkademik = () => {
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
  const jabatanAkademikFilter = searchParam.get("jabatan_akademik_id") || "";
  const statusFilter = searchParam.get("status_pengajuan") || "";

  const form = useForm<RejectActionSchema>({
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
      "jabatan-akademik-validasi",
      currentPage,
      debouncedInput,
      unitKerjaFilter,
      jabatanAkademikFilter,
      statusFilter,
    ],
    queryFn: async () => {
      const params = {
        page: currentPage,
        search: debouncedInput,
        unit_kerja_id: unitKerjaFilter,
        jabatan_akademik_id: jabatanAkademikFilter,
        status_pengajuan: statusFilter,
      };
      const response = await adminServices.getJabatanAkademikValidasiData(
        params
      );
      return response.data;
    },
    placeholderData: (previousData) => previousData,
  });

  // Memoize filter options
  const filterOptions = useMemo(() => {
    const options = data?.filters?.original?.filters;
    if (!options)
      return { unitKerja: [], jabatanAkademik: [], statusPengajuan: [] };

    const mapToOptions = (items: FilterOption[] = []) =>
      items.map((opt) => ({ value: String(opt.id), label: opt.nama }));

    return {
      unitKerja: mapToOptions(options.unit_kerja),
      jabatanAkademik: mapToOptions(options.jabatan_akademik),
      statusPengajuan: mapToOptions(options.status_pengajuan),
    };
  }, [data?.filters]);

  // --- Data Mutation ---
  const handleSuccess = (action: string) => {
    toast.success(`Berhasil ${action} data pengajuan.`);
    setSelectedItem([]);
    setIsDialogOpen(false);
    queryClient.invalidateQueries({ queryKey: ["jabatan-akademik-validasi"] });
  };

  const handleError = (err: any) =>
    toast.error(
      `Gagal: ${
        err?.response?.data?.message || err.message || "Terjadi kesalahan"
      }`
    );

  const { mutate: rejectMutation, isPending: isRejecting } = useMutation({
    mutationFn: (payload: { ids: number[]; keterangan: string }) =>
      patchDataServices.rejectDataRiwayatJabatanAkademik(payload),
    onSuccess: () => handleSuccess("menolak"),
    onError: handleError,
  });

  const { mutate: approveMutation, isPending: isApproving } = useMutation({
    mutationFn: (payload: { ids: number[] }) =>
      patchDataServices.approveDataRiwayatJabatanAkademik(payload),
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

  const handleSubmitReject = (values: RejectActionSchema) => {
    rejectMutation({ ids: selectedItem, keterangan: values.keterangan });
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
        <Title title="Validasi Data Riwayat Jabatan Akademik" />
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
        <Title title="Validasi Data Riwayat Jabatan Akademik" />
        <div className="mt-10 p-4 border-l-4 border-red-500 bg-red-50 rounded-md">
          <p className="font-semibold text-red-600">Gagal Memuat Data</p>
          <p className="text-sm text-red-500">{(error as Error).message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-10 mb-20">
      <Title title="Validasi Data Riwayat Jabatan Akademik" />
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
              <Label>Jabatan Akademik</Label>
              <SelectFilter
                placeholder="--Semua Jabatan--"
                options={filterOptions.jabatanAkademik || []}
                value={jabatanAkademikFilter}
                onValueChange={(v) => handleUrlChange("jabatan_akademik_id", v)}
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
                <TableCell
                  // FIX: Safely calculate colSpan
                  colSpan={(data?.table_columns?.length ?? 9) + 1}
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
                    {item.tmt_jabatan_formatted}
                  </TableCell>
                  <TableCell>{item.nama_jabatan_akademik}</TableCell>
                  <TableCell className="text-center">
                    {item.tgl_sk_formatted}
                  </TableCell>
                  <TableCell className="text-center">{item.no_sk}</TableCell>
                  <TableCell className="text-center">
                    <Label className="text-xs sm:text-sm text-left flex-1">
                      {item?.file_jabatan_link ? (
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
                                item.file_jabatan_link || ""
                              ) ? (
                                <img
                                  src={`${environment.API_IMAGE_URL_SECOND}${item.file_jabatan_link}`}
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
                                    href={`${environment.API_IMAGE_URL_SECOND}${item.file_jabatan_link}`}
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
                        to={`/admin/validasi-data/kepegawaian/jabatan-akademik/detail-jabatan-akademik/${item.id}`}
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
                onSubmit={form.handleSubmit(handleSubmitReject)}
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

export default JabatanAkademik;
