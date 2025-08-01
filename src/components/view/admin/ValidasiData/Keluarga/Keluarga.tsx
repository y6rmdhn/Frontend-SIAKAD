import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "use-debounce";
import { Link, useSearchParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { IoEyeOutline, IoClose } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";

// UI Components
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Form } from "@/components/ui/form";
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
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput";

// Services
import adminServices from "@/services/admin.services";
import patchDataServices from "@/services/patch.admin.services";
import { FaPlus } from "react-icons/fa";

// --- Type and Schema Definitions ---
type ActionType = "approve" | "reject" | "draft";

const actionSchema = z.object({
  keterangan_admin: z.string().optional(),
});

const rejectActionSchema = z.object({
  keterangan_admin: z.string().min(10, {
    message: "Keterangan penolakan wajib diisi (minimal 10 karakter).",
  }),
});

type ActionSchema = z.infer<typeof actionSchema>;

// --- Component Definition ---
const Keluarga = () => {
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
  const hubunganFilter = searchParam.get("hubungan") || "";
  const jabatanFilter = searchParam.get("jabatan_fungsional") || "";
  const statusFilter = searchParam.get("status") || "";

  // --- React Hook Form ---
  const form = useForm<ActionSchema>({
    resolver: zodResolver(
      pendingAction === "reject" ? rejectActionSchema : actionSchema
    ),
    defaultValues: { keterangan_admin: "" },
  });

  // Reset form ketika dialog ditutup atau action berubah
  useEffect(() => {
    form.reset({ keterangan_admin: "" });
  }, [isDialogOpen, pendingAction, form]);

  // --- Data Fetching (React Query) ---
  const { data, isLoading } = useQuery({
    queryKey: [
      "keluarga-validasi-data",
      currentPage,
      debouncedInput,
      unitKerjaFilter,
      hubunganFilter,
      jabatanFilter,
      statusFilter,
    ],
    queryFn: async () => {
      const params = {
        page: currentPage,
        search: debouncedInput,
        unit_kerja: unitKerjaFilter,
        hubungan: hubunganFilter,
        jabatan_fungsional: jabatanFilter,
        status: statusFilter,
      };
      const response = await adminServices.getKeluargaValidasiData(params);
      return response.data;
    },
  });

  // Memoize filter options untuk optimasi
  const filterOptions = useMemo(() => {
    const options = data?.filter_options;
    if (!options) return {};

    // Fungsi untuk memetakan dan memastikan value adalah string
    const mapToOptions = (items: any[]) =>
      items?.map((opt) => ({ ...opt, value: String(opt.value) })) || [];

    return {
      unit_kerja: mapToOptions(options.unit_kerja),
      hubungan: mapToOptions(options.hubungan),
      jabatan_fungsional: mapToOptions(options.jabatan_fungsional),
      status: mapToOptions(options.status),
    };
  }, [data]);

  // --- Data Mutation (React Query) ---
  const handleSuccess = (action: ActionType) => {
    toast.success(`Berhasil ${action} data pengajuan.`);
    form.reset();
    setSelectedItem([]);
    setIsDialogOpen(false);
    queryClient.invalidateQueries({ queryKey: ["keluarga-validasi-data"] });
  };

  const handleError = (error: Error) => toast.error(`Gagal: ${error.message}`);

  const { mutate: rejectMutation } = useMutation({
    mutationFn: (payload: { ids: number[]; keterangan?: string }) =>
      patchDataServices.tolakDataKeluarga(payload),
    onSuccess: () => handleSuccess("reject"),
    onError: handleError,
  });

  const { mutate: approveMutation } = useMutation({
    mutationFn: (payload: { ids: number[]; keterangan?: string }) =>
      patchDataServices.approveDataKeluarga(payload),
    onSuccess: () => handleSuccess("approve"),
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

    // Selalu reset ke halaman 1 jika filter berubah
    if (paramName !== "page") {
      newSearchParam.set("page", "1");
    }
    setSearchParam(newSearchParam);
  };

  useEffect(() => {
    // Hanya update URL untuk search, filter lain dihandle oleh onValueChange
    if (debouncedInput.length >= 3 || debouncedInput.length === 0) {
      handleUrlChange("search", debouncedInput);
    }
  }, [debouncedInput]);

  const handleSubmitData = (values: ActionSchema) => {
    const payload = {
      ids: selectedItem,
      keterangan: values.keterangan_admin,
    };
    if (pendingAction === "approve") approveMutation(payload);
    else if (pendingAction === "reject") rejectMutation(payload);
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
  const tableData = data?.data?.data || [];
  const pageIds = tableData.map((item: any) => item.id);
  const isAllSelectedOnPage =
    pageIds.length > 0 && pageIds.every((id: any) => selectedItem.includes(id));
  const isSomeSelectedOnPage = pageIds.some((id: any) =>
    selectedItem.includes(id)
  );

  const handleSelectedItemId = (id: number, checked: boolean) => {
    setSelectedItem((prev) =>
      checked ? [...prev, id] : prev.filter((i) => i !== id)
    );
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedItem(
      checked
        ? [...new Set([...selectedItem, ...pageIds])]
        : selectedItem.filter((id) => !pageIds.includes(id))
    );
  };

  const dialogDetails = {
    approve: {
      title: "Konfirmasi Persetujuan",
      description: `Anda akan menyetujui ${selectedItem.length} data terpilih.`,
    },
    reject: {
      title: "Konfirmasi Penolakan",
      description: `Anda akan menolak ${selectedItem.length} data terpilih.`,
    },
    draft: {
      title: "Konfirmasi Draft",
      description: `Anda akan mengubah status ${selectedItem.length} data terpilih menjadi "draf".`,
    },
  };

  return (
    <div className="mt-10 mb-20">
      <h1 className="text-xl lg:text-2xl font-medium">
        Validasi Data Keluarga
      </h1>


      <CustomCard
        title="Filter Data"
        actions={
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex flex-col gap-2">
              <Label>Unit Kerja</Label>
              <SelectFilter
                placeholder="--Semua Unit Kerja--"
                options={filterOptions.unit_kerja || []}
                value={unitKerjaFilter}
                onValueChange={(value) => handleUrlChange("unit_kerja", value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Hubungan</Label>
              <SelectFilter
                placeholder="--Semua Hubungan--"
                options={filterOptions.hubungan || []}
                value={hubunganFilter}
                onValueChange={(value) => handleUrlChange("hubungan", value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Jabatan Fungsional</Label>
              <SelectFilter
                placeholder="--Semua Jabatan--"
                options={filterOptions.jabatan_fungsional || []}
                value={jabatanFilter}
                onValueChange={(value) =>
                  handleUrlChange("jabatan_fungsional", value)
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Status Pengajuan</Label>
              <SelectFilter
                placeholder="--Semua Status--"
                options={filterOptions.status || []}
                value={statusFilter}
                onValueChange={(value) => handleUrlChange("status", value)}
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
    <Link to="/admin/operasional/kompensasi/detail-riwayat-pelanggaran">
      <Button className="bg-green-600 hover:bg-green-700 w-full md:w-auto">
        <FaPlus className="mr-2" /> Tambah Data
      </Button>
    </Link>
  </div>
</div>


      <Table className="mt-10 table-auto text-xs lg:text-sm">
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="text-center w-[50px]">
              <Checkbox
                onCheckedChange={(c) => handleSelectAll(c === true)}
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
              <TableHead key={col.field} className="text-center ">
                {col.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-gray-200">
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={10} className="text-center py-10 ">
                Memuat data...
              </TableCell>
            </TableRow>
          ) : tableData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={10} className="text-center py-10">
                Data tidak ditemukan.
              </TableCell>
            </TableRow>
          ) : (
            tableData.map((item: any) => (
              <TableRow key={item.id} className="even:bg-gray-50">
                <TableCell className="text-center">
                  <Checkbox
                    checked={selectedItem.includes(item.id)}
                    onCheckedChange={(c) =>
                      handleSelectedItemId(item.id, c === true)
                    }
                  />
                </TableCell>
                <TableCell className="text-center rounded-tl-lg">{item.nip}</TableCell>
                <TableCell>{item.nama_pegawai}</TableCell>
                <TableCell>{item.nama_keluarga}</TableCell>
                <TableCell className="text-center">{item.hubungan}</TableCell>
                <TableCell className="text-center">{item.tgl_lahir}</TableCell>
                <TableCell className="text-center">
                  {item.dokumen || "-"}
                </TableCell>
                <TableCell className="text-center">
                  {item.tgl_diajukan}
                </TableCell>
                <TableCell className="text-center capitalize rounded-tr-lg">
                  <Button
                    size="sm"
                    variant={item.status_info?.color || "secondary"}
                    className="cursor-default"
                  >
                    {item.status_pengajuan}
                  </Button>
                </TableCell>
                <TableCell>
                  <div className="flex justify-center items-center w-full h-full">
                    <Link to={`/admin/data-keluarga/${item.id}`}>
                      <Button size="icon" variant="ghost">
                        <IoEyeOutline className="w-5 h-5 text-blue-500" />
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
        links={data?.data?.links || []}
        onPageChange={(page) => handleUrlChange("page", page.toString())}
        hasNextPage={!!data?.data?.next_page_url}
        hasPrevPage={!!data?.data?.prev_page_url}
        totalPages={data?.data?.last_page}
      />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmitData)}>
              <DialogHeader>
                <DialogTitle>
                  {pendingAction && dialogDetails[pendingAction]?.title}
                </DialogTitle>
                <DialogDescription>
                  {pendingAction && dialogDetails[pendingAction]?.description}
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <FormFieldInput
                  form={form}
                  name="keterangan_admin"
                  label="Keterangan"
                  placeholder="Tambahkan keterangan..."
                  required={pendingAction === "reject"}
                />
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Batal
                </Button>
                <Button type="submit">Konfirmasi</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Keluarga;
