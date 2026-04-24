import { useEffect, useMemo, useState, useCallback } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { format, parseISO } from "date-fns";

// UI Components
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Form } from "@/components/ui/form";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogClose, DialogContent, DialogDescription,
  DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem,
  SelectTrigger, SelectValue,
} from "@/components/ui/select";

// Custom Components
import CustomCard from "@/components/blocks/Card";
import CustomPagination from "@/components/blocks/CustomPagination";
import SearchInput from "@/components/blocks/SearchInput";
import Title from "@/components/blocks/Title";
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput";

// Icons
import { IoClose, IoEyeOutline } from "react-icons/io5";
import { FaCheck, FaPlus } from "react-icons/fa";

// Services
import adminServices from "@/services/admin.services";
import patchDataServices from "@/services/patch.admin.services";

// ── Types ──────────────────────────────────────────────────────────────────────
type ActionType = "approve" | "reject";

const rejectActionSchema = z.object({
  keterangan_penolakan: z.string().min(10, {
    message: "Keterangan penolakan wajib diisi (minimal 10 karakter).",
  }),
});
type ActionSchema = z.infer<typeof rejectActionSchema>;

interface Dokumen {
  id: string;
  file_name: string;
  url: string;
}

interface JabatanStrukturalItem {
  id: string;
  pegawai?: { nip: string; nama: string };
  jabatan_struktural?: { nama: string };
  no_sk: string | null;
  tgl_sk: string | null;
  tgl_mulai: string | null;
  tgl_selesai: string | null;
  pejabat_penetap: string | null;
  status: string;
  tgl_disetujui?: string | null;
  tgl_ditolak?: string | null;
  createdAt?: string;
  dokumen?: Dokumen[];
}

interface PaginatedData {
  items: JabatanStrukturalItem[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

const statusColor: Record<string, string> = {
  draft: "bg-gray-400",
  diajukan: "bg-yellow-400 text-black",
  disetujui: "bg-green-500",
  ditolak: "bg-red-500",
};

const formatDate = (d?: string | null) =>
  d ? format(parseISO(d), "dd MMM yyyy") : "-";

const getRelevantDate = (item: JabatanStrukturalItem) => {
  if (item.status === "disetujui") return { label: "Tgl. Disetujui", value: item.tgl_disetujui };
  if (item.status === "ditolak") return { label: "Tgl. Ditolak", value: item.tgl_ditolak };
  return { label: "Tgl. Diajukan", value: item.createdAt };
};

// ── Komponen Utama ─────────────────────────────────────────────────────────────
const JabatanStruktural = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const queryClient = useQueryClient();

  const [searchData, setSearchData] = useState(searchParam.get("search") || "");
  const [debouncedInput] = useDebounce(searchData, 500);
  const [selectedItem, setSelectedItem] = useState<string[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isFileDialogOpen, setIsFileDialogOpen] = useState(false);
  const [selectedDokumen, setSelectedDokumen] = useState<Dokumen[]>([]);
  const [pendingAction, setPendingAction] = useState<ActionType | null>(null);

  const currentPage = searchParam.get("page") || "1";
  const statusFilter = searchParam.get("status") ?? "";
  const startDate = searchParam.get("start_date") || "";
  const endDate = searchParam.get("end_date") || "";
  const unitKerjaId = searchParam.get("unit_kerja_id") || "";

  const form = useForm<ActionSchema>({
    resolver: zodResolver(rejectActionSchema),
    defaultValues: { keterangan_penolakan: "" },
  });

  useEffect(() => {
    if (!isDialogOpen) form.reset({ keterangan_penolakan: "" });
  }, [isDialogOpen, form]);

  const { data: rawData, isError, isLoading, error } = useQuery<PaginatedData>({
    queryKey: [
      "jabatan-struktural-validasi",
      currentPage,
      debouncedInput,
      statusFilter,
      startDate,
      endDate,
      unitKerjaId,
    ],
    queryFn: async () => {
      const params: Record<string, string> = { page: currentPage, limit: "10" };
      if (statusFilter && statusFilter !== "semua") params.status = statusFilter;
      if (debouncedInput) params.search = debouncedInput;
      if (startDate) params.start_date = startDate;
      if (endDate) params.end_date = endDate;
      if (unitKerjaId) params.unit_kerja_id = unitKerjaId;
      const response = await adminServices.getJabatanStrukturalValidasiData(params);
      return response.data.data;
    },
    placeholderData: (prev) => prev,
  });

  const { data: unitKerjaOptions } = useQuery<{ id: string; nama: string }[]>({
    queryKey: ["master-unit-kerja"],
    queryFn: async () => {
      const response = await adminServices.getUnitKerja({ is_dropdown: true });
      return response.data.data.items ?? [];
    },
  });

  const items = rawData?.items ?? [];
  const pagination = rawData?.pagination;

  const handleUrlChange = useCallback((paramName: string, value: string) => {
    const next = new URLSearchParams(searchParam);
    if (value && value !== "semua") {
      next.set(paramName, value);
    } else {
      next.delete(paramName);
    }
    if (paramName !== "page") next.set("page", "1");
    setSearchParam(next);
  }, [searchParam, setSearchParam]);

  useEffect(() => {
    handleUrlChange("search", debouncedInput);
  }, [debouncedInput, handleUrlChange]);

  const handleSuccess = (action: string) => {
    toast.success(`Berhasil ${action} data pengajuan.`);
    setSelectedItem([]);
    setIsDialogOpen(false);
    queryClient.invalidateQueries({ queryKey: ["jabatan-struktural-validasi"] });
  };

  const handleError = (err: any) =>
    toast.error(`Gagal: ${err?.response?.data?.message || err.message || "Terjadi kesalahan"}`);

  const { mutate: rejectMutation, isPending: isRejecting } = useMutation({
    mutationFn: (payload: { ids: string[]; keterangan_penolakan: string }) =>
      patchDataServices.rejectDataJabatanStruktural(payload),
    onSuccess: () => handleSuccess("menolak"),
    onError: handleError,
  });

  const { mutate: approveMutation, isPending: isApproving } = useMutation({
    mutationFn: (payload: { ids: string[] }) =>
      patchDataServices.approveDataJabatanStruktural(payload),
    onSuccess: () => handleSuccess("menyetujui"),
    onError: handleError,
  });

  const pageIds = useMemo(() => items.map((i) => i.id), [items]);
  const isAllSelectedOnPage = pageIds.length > 0 && pageIds.every((id) => selectedItem.includes(id));
  const isSomeSelectedOnPage = !isAllSelectedOnPage && pageIds.some((id) => selectedItem.includes(id));

  const handleSelectedItemId = (id: string, checked: boolean) =>
    setSelectedItem((prev) => checked ? [...prev, id] : prev.filter((i) => i !== id));

  const handleSelectAll = (checked: boolean) =>
    setSelectedItem(checked
      ? [...new Set([...selectedItem, ...pageIds])]
      : selectedItem.filter((id) => !pageIds.includes(id))
    );

  const handleOpenDialog = (action: ActionType) => {
    if (selectedItem.length === 0) { toast.warning("Pilih setidaknya satu data."); return; }
    setPendingAction(action);
    setIsDialogOpen(true);
  };

  const handleSubmitAction = (values: ActionSchema) => {
    if (pendingAction === "reject") {
      rejectMutation({ ids: selectedItem, keterangan_penolakan: values.keterangan_penolakan });
    }
  };

  if (isLoading && !rawData) {
    return (
      <div className="mt-10 mb-20 space-y-6">
        <Title title="Validasi Data Jabatan Struktural" />
        <div className="mt-10 space-y-2">
          {[...Array(10)].map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
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

      {/* Filter Section */}
      <CustomCard
        title="Filter Data"
        actions={
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label>Status Pengajuan</Label>
              <Select
                value={statusFilter || "semua"}
                onValueChange={(v) => handleUrlChange("status", v)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="--Pilih Status--" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="semua">Semua Status</SelectItem>
                  <SelectItem value="diajukan">Diajukan</SelectItem>
                  <SelectItem value="disetujui">Disetujui</SelectItem>
                  <SelectItem value="ditolak">Ditolak</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <Label>Unit Kerja</Label>
              <Select
                value={unitKerjaId || "semua"}
                onValueChange={(v) => handleUrlChange("unit_kerja_id", v)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="--Pilih Unit Kerja--" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="semua">Semua Unit Kerja</SelectItem>
                  {unitKerjaOptions?.map((uk) => (
                    <SelectItem key={uk.id} value={uk.id}>{uk.nama}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <Label>Tanggal Mulai Pengajuan</Label>
              <input
                type="date"
                className="border rounded-md px-3 py-2 text-sm"
                value={startDate}
                onChange={(e) => handleUrlChange("start_date", e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label>Tanggal Akhir Pengajuan</Label>
              <input
                type="date"
                className="border rounded-md px-3 py-2 text-sm"
                value={endDate}
                max={new Date().toISOString().split("T")[0]}
                onChange={(e) => handleUrlChange("end_date", e.target.value)}
              />
            </div>
          </div>
        }
      />

      {/* Search & Actions */}
      <div className="flex flex-col md:flex-row md:justify-between mt-10 gap-4">
        <SearchInput
          value={searchData}
          onChange={(e) => setSearchData(e.target.value)}
          className="w-full md:w-80"
          placeholder="Cari NIP atau nama pegawai..."
        />
        <div className="flex flex-col md:flex-row gap-2 items-start md:items-center">
          {selectedItem.length > 0 && (
            <>
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
            </>
          )}
          <Link to="/admin/validasi-data/kepegawaian/jabatan-struktural/tambah-jabatan-struktural">
            <Button className="bg-green-600 hover:bg-green-700 w-full md:w-auto">
              <FaPlus className="mr-2" /> Tambah Data
            </Button>
          </Link>
        </div>
      </div>

      {/* Table */}
      <div className="mt-5 border rounded-lg overflow-x-auto">
        <Table className="text-xs lg:text-sm">
          <TableHeader>
            <TableRow className="bg-gray-100 hover:bg-gray-100">
              <TableHead className="text-center w-10">
                <Checkbox
                  onCheckedChange={(c) => handleSelectAll(!!c)}
                  checked={isAllSelectedOnPage ? true : isSomeSelectedOnPage ? "indeterminate" : false}
                />
              </TableHead>
              <TableHead className="text-center">NIP</TableHead>
              <TableHead>Nama Pegawai</TableHead>
              <TableHead>Jabatan Struktural</TableHead>
              <TableHead className="text-center">No. SK</TableHead>
              <TableHead className="text-center">Tgl. Mulai</TableHead>
              <TableHead className="text-center">Tgl. Selesai</TableHead>
              <TableHead className="text-center">File</TableHead>
              <TableHead className="text-center">
                {statusFilter === "disetujui" ? "Tgl. Disetujui"
                  : statusFilter === "ditolak" ? "Tgl. Ditolak"
                    : "Tgl. Diajukan"}
              </TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.length === 0 ? (
              <TableRow>
                <TableCell colSpan={11} className="text-center h-24">
                  Tidak ada data.
                </TableCell>
              </TableRow>
            ) : (
              items.map((item) => {
                const relevantDate = getRelevantDate(item);
                return (
                  <TableRow key={item.id} className="even:bg-gray-50">
                    <TableCell className="text-center">
                      <Checkbox
                        checked={selectedItem.includes(item.id)}
                        onCheckedChange={(c) => handleSelectedItemId(item.id, !!c)}
                      />
                    </TableCell>
                    <TableCell className="text-center">{item.pegawai?.nip ?? "-"}</TableCell>
                    <TableCell>{item.pegawai?.nama ?? "-"}</TableCell>
                    <TableCell>{item.jabatan_struktural?.nama ?? "-"}</TableCell>
                    <TableCell className="text-center">{item.no_sk ?? "-"}</TableCell>
                    <TableCell className="text-center">{formatDate(item.tgl_mulai)}</TableCell>
                    <TableCell className="text-center">{formatDate(item.tgl_selesai)}</TableCell>
                    <TableCell className="text-center">
                      {item.dokumen && item.dokumen.length > 0 ? (
                        <Button
                          variant="link"
                          className="p-0 h-auto text-blue-600 hover:underline hover:text-blue-800"
                          onClick={() => {
                            setSelectedDokumen(item.dokumen!);
                            setIsFileDialogOpen(true);
                          }}
                        >
                          Lihat File
                        </Button>
                      ) : (
                        <span>-</span>
                      )}
                    </TableCell>
                    <TableCell className="text-center">{formatDate(relevantDate.value)}</TableCell>
                    <TableCell className="text-center">
                      <span className={`capitalize px-2 py-1 rounded-md text-white text-xs ${statusColor[item.status] ?? "bg-slate-400"}`}>
                        {item.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <Link to={`/admin/validasi-data/kepegawaian/jabatan-struktural/detail-jabatan-struktural/${item.id}`}>
                        <Button size="icon" variant="ghost">
                          <IoEyeOutline className="text-blue-500" />
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      <CustomPagination
        pagination={pagination}
        onPageChange={(page) => handleUrlChange("page", String(page))}
      />

      {/* File Dialog */}
      <Dialog open={isFileDialogOpen} onOpenChange={setIsFileDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Pratinjau Dokumen</DialogTitle>
          </DialogHeader>
          <div className="py-4 flex flex-col gap-3">
            {selectedDokumen.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between border rounded p-2">
                <span className="text-sm">📄 {doc.file_name}</span>
                <a href={doc.url} target="_blank" rel="noreferrer">
                  <Button size="sm" variant="outline">Buka File</Button>
                </a>
              </div>
            ))}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">Tutup</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Approve/Reject Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {pendingAction === "approve" ? "Konfirmasi Persetujuan" : "Konfirmasi Penolakan"}
            </DialogTitle>
            <DialogDescription>
              Anda akan {pendingAction === "approve" ? "menyetujui" : "menolak"}{" "}
              {selectedItem.length} data terpilih. Aksi ini tidak dapat dibatalkan.
            </DialogDescription>
          </DialogHeader>
          {pendingAction === "reject" && (
            <Form {...form}>
              <form id="action-form" onSubmit={form.handleSubmit(handleSubmitAction)}>
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
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Batal</Button>
            {pendingAction === "approve" ? (
              <Button
                onClick={() => approveMutation({ ids: selectedItem })}
                className="bg-green-600 hover:bg-green-700"
                disabled={isApproving}
              >
                {isApproving ? "Memproses..." : "Ya, Setujui"}
              </Button>
            ) : (
              <Button type="submit" form="action-form" variant="destructive" disabled={isRejecting}>
                {isRejecting ? "Memproses..." : "Ya, Tolak"}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default JabatanStruktural;
