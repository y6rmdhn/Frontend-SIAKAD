import CustomCard from "@/components/blocks/Card";
import CustomPagination from "@/components/blocks/CustomPagination";
import SearchInput from "@/components/blocks/SearchInput";
import SelectFilter from "@/components/blocks/SelectFilter";
import Title from "@/components/blocks/Title";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import adminServices from "@/services/admin.services";
import patchDataServices from "@/services/patch.admin.services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { IoClose, IoEyeOutline } from "react-icons/io5";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { useDebounce } from "use-debounce";

// ✨ FIX: Menghapus 'draft' dari tipe aksi
type ActionType = "approve" | "reject";

const JabatanFungsional = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const [searchData, setSearchData] = useState(searchParam.get("search") || "");
  const [debouncedInput] = useDebounce(searchData, 500);
  const [selectedItem, setSelectedItem] = useState<number[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<ActionType | null>(null);
  const queryClient = useQueryClient();

  const currentUnitKerja = searchParam.get("unit_kerja") || "semua";
  const currentStatus = searchParam.get("status_pengajuan") || "semua";
  const currentJabatan = searchParam.get("jabatan_fungsional") || "semua";
  const currentPage = searchParam.get("page") || "1";

  const { data, isLoading } = useQuery({
    queryKey: [
      "jabatan-fungsional-validasi-data",
      currentPage,
      debouncedInput,
      currentUnitKerja,
      currentStatus,
      currentJabatan,
    ],
    queryFn: async () => {
      const params = {
        page: currentPage,
        search: debouncedInput,
        unit_kerja: currentUnitKerja,
        status_pengajuan: currentStatus,
        jabatan_fungsional: currentJabatan,
      };
      const response = await adminServices.getJabatanFungsionalValidasiData(
        params
      );
      return response.data;
    },
    staleTime: 30000,
  });

  const { unitKerjaOptions, statusOptions, jabatanFungsionalOptions } =
    useMemo(() => {
      const filters = data?.filters?.original?.filter_options;
      const mapToOptions = (items: any[], valueKey = "id", labelKey = "nama") =>
        items?.map((item: any) => ({
          value: String(item[valueKey]),
          label: item[labelKey],
        })) || [];

      return {
        unitKerjaOptions: mapToOptions(filters?.unit_kerja),
        statusOptions: mapToOptions(filters?.status_pengajuan),
        jabatanFungsionalOptions: mapToOptions(filters?.jabatan_fungsional),
      };
    }, [data]);

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

  const handleSuccess = (action: ActionType) => {
    toast.success(`Berhasil ${action} data pengajuan`);
    setSelectedItem([]);
    setIsDialogOpen(false);
    queryClient.invalidateQueries({
      queryKey: ["jabatan-fungsional-validasi-data"],
    });
  };

  const handleError = (error: Error) => {
    toast.error(`Gagal: ${error.message}`);
  };

  const { mutate: rejectMutation } = useMutation({
    mutationFn: (payload: { ids: number[] }) =>
      patchDataServices.rejectDataJabatanFungsional(payload),
    onSuccess: () => handleSuccess("reject"),
    onError: handleError,
  });

  const { mutate: approveMutation } = useMutation({
    mutationFn: (payload: { ids: number[] }) =>
      patchDataServices.approveDataJabatanFungsional(payload),
    onSuccess: () => handleSuccess("approve"),
    onError: handleError,
  });

  // ✨ FIX: Menghapus mutasi untuk draf karena tidak dibutuhkan

  const handleSubmitData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = { ids: selectedItem };
    if (!pendingAction) return;

    // ✨ FIX: Menyederhanakan objek mutasi
    const mutations = {
      approve: approveMutation,
      reject: rejectMutation,
    };

    // Memanggil mutasi yang sesuai
    mutations[pendingAction](payload);
  };

  const tableData = data?.data?.data || [];
  const pageIds = tableData.map((item: any) => item.id) || [];
  const isAllSelectedOnPage =
    pageIds.length > 0 && pageIds.every((id: any) => selectedItem.includes(id));
  const isSomeSelectedOnPage = pageIds.some((id: any) =>
    selectedItem.includes(id)
  );

  const handleSelectedItemId = (pegawaiId: number, checked: boolean) => {
    setSelectedItem((prev) =>
      checked ? [...prev, pegawaiId] : prev.filter((id) => id !== pegawaiId)
    );
  };

  const handleSelectAll = (checked: boolean) => {
    const currentPageIds = tableData.map((item: any) => item.id) || [];
    if (checked) {
      setSelectedItem((prev) => [...new Set([...prev, ...currentPageIds])]);
    } else {
      setSelectedItem((prev) =>
        prev.filter((id) => !currentPageIds.includes(id))
      );
    }
  };

  const handleOpenDialog = (action: ActionType) => {
    if (selectedItem.length === 0) {
      toast.info("Pilih setidaknya satu data untuk diproses.");
      return;
    }
    setPendingAction(action);
    setIsDialogOpen(true);
  };

  // ✨ FIX: Menghapus detail dialog untuk draf
  const dialogDetails = {
    approve: {
      title: "Konfirmasi Persetujuan",
      description: `Anda akan menyetujui ${selectedItem.length} data terpilih. Aksi ini tidak dapat dibatalkan.`,
      confirmText: "Ya, Setujui",
      confirmClass: "bg-green-light-uika hover:bg-[#329C59]",
    },
    reject: {
      title: "Konfirmasi Penolakan",
      description: `Anda akan menolak ${selectedItem.length} data terpilih. Aksi ini tidak dapat dibatalkan.`,
      confirmText: "Ya, Tolak",
      confirmClass: "bg-red-600 hover:bg-red-700",
    },
  };

  useEffect(() => {
    const newSearchParam = new URLSearchParams(searchParam);
    if (
      debouncedInput &&
      (debouncedInput.length > 3 || debouncedInput.length === 0)
    ) {
      newSearchParam.set("search", debouncedInput);
      newSearchParam.set("page", "1");
    } else if (!debouncedInput) {
      newSearchParam.delete("search");
    }

    if (searchParam.toString() !== newSearchParam.toString()) {
      setSearchParam(newSearchParam);
    }
  }, [debouncedInput, searchParam, setSearchParam]);

  useEffect(() => {
    if (!searchParam.get("page")) {
      const newSearchParam = new URLSearchParams(searchParam);
      newSearchParam.set("page", "1");
      setSearchParam(newSearchParam);
    }
  }, []);

  return (
    <div className="mt-10 mb-20">
      <Title title="Jabatan Fungsional" />

      <CustomCard
        actions={
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-1">
              <Label className="text-[#FDA31A] text-xs md:text-sm">
                Unit Kerja
              </Label>
              <SelectFilter
                placeholder="Pilih Unit Kerja"
                options={unitKerjaOptions}
                value={currentUnitKerja}
                onValueChange={(value) => handleUrlChange("unit_kerja", value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label className="text-[#FDA31A] text-xs md:text-sm">
                Status
              </Label>
              <SelectFilter
                placeholder="Pilih Status"
                options={statusOptions}
                value={currentStatus}
                onValueChange={(value) =>
                  handleUrlChange("status_pengajuan", value)
                }
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label className="text-[#FDA31A] text-xs md:text-sm">
                Jabatan Fungsional
              </Label>
              <SelectFilter
                placeholder="Pilih Jabatan"
                options={jabatanFungsionalOptions}
                value={currentJabatan}
                onValueChange={(value) =>
                  handleUrlChange("jabatan_fungsional", value)
                }
              />
            </div>
          </div>
        }
      />

      <div className="flex flex-col md:flex-row md:justify-between mt-10 gap-4">
        <div className="flex flex-col md:flex-row gap-2 lg:gap-4">
          <SearchInput
            value={searchData}
            onChange={(e) => setSearchData(e.target.value)}
          />
        </div>
        {selectedItem.length > 0 && (
          <div className="flex md:flex-row flex-col gap-2">
            <Button
              type="button"
              onClick={() => handleOpenDialog("approve")}
              className="bg-green-light-uika hover:bg-[#329C59]"
            >
              <FaCheck className="w-5! h-5! text-white mr-2" />
              Approve {selectedItem.length} data
            </Button>
            <Button
              type="button"
              onClick={() => handleOpenDialog("reject")}
              variant="destructive"
            >
              <IoClose className="w-5! h-5! text-white mr-2" />
              Reject {selectedItem.length} data
            </Button>
          </div>
        )}
      </div>

      <Table className="mt-10 table-auto text-xs lg:text-sm">
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="text-center w-[50px]">
              <Checkbox
                onCheckedChange={(checked) => handleSelectAll(checked === true)}
                checked={
                  isAllSelectedOnPage
                    ? true
                    : isSomeSelectedOnPage
                    ? "indeterminate"
                    : false
                }
              />
            </TableHead>
            <TableHead className="text-center">NIP</TableHead>
            <TableHead className="text-center">Nama Pegawai</TableHead>
            <TableHead className="text-center">Nama Jabatan</TableHead>
            <TableHead className="text-center">No SK</TableHead>
            <TableHead className="text-center">Tgl SK</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-center">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-gray-200">
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-10">
                Memuat data...
              </TableCell>
            </TableRow>
          ) : tableData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-10">
                Data tidak ditemukan.
              </TableCell>
            </TableRow>
          ) : (
            tableData.map((item: any) => (
              <TableRow key={item.id} className="even:bg-gray-100">
                <TableCell className="text-center">
                  <Checkbox
                    checked={selectedItem.includes(item.id)}
                    onCheckedChange={(checked) =>
                      handleSelectedItemId(item.id, checked === true)
                    }
                  />
                </TableCell>
                <TableCell className="text-center">
                  {item.nip_pegawai}
                </TableCell>
                <TableCell>{item.nama_pegawai}</TableCell>
                <TableCell>{item.nama_jabatan_fungsional}</TableCell>
                <TableCell className="text-center">{item.no_sk}</TableCell>
                <TableCell className="text-center">
                  {item.tanggal_sk_formatted}
                </TableCell>
                <TableCell className="text-center">
                  <Button
                    size="sm"
                    variant={item.status_info.color || "secondary"}
                    className="cursor-default capitalize"
                  >
                    {item.status_pengajuan}
                  </Button>
                </TableCell>
                <TableCell>
                  <div className="flex justify-center items-center w-full h-full">
                    <Link
                      to={`/admin/operasional/kompensasi/detail-dokumen-internal/${item.id}`}
                    >
                      <Button
                        size="icon"
                        variant="ghost"
                        className="cursor-pointer"
                      >
                        <IoEyeOutline className="w-5! h-5! text-[#26A1F4]" />
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
        onPageChange={(page) => handleUrlChange("page", String(page))}
        hasNextPage={!!data?.data?.next_page_url}
        hasPrevPage={!!data?.data?.prev_page_url}
        totalPages={data?.data?.last_page}
      />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSubmitData}>
            <DialogHeader>
              <DialogTitle>
                {pendingAction && dialogDetails[pendingAction]?.title}
              </DialogTitle>
              <DialogDescription>
                {pendingAction && dialogDetails[pendingAction]?.description}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="mt-4">
              <Button
                variant="outline"
                type="button"
                onClick={() => setIsDialogOpen(false)}
              >
                Batal
              </Button>
              <Button
                type="submit"
                className={
                  pendingAction
                    ? dialogDetails[pendingAction]?.confirmClass
                    : ""
                }
              >
                {pendingAction && dialogDetails[pendingAction]?.confirmText}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default JabatanFungsional;
