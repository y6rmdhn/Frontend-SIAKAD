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
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { IoClose, IoEyeOutline } from "react-icons/io5";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { useDebounce } from "use-debounce";

type ActionType = "approve" | "reject" | "draft";

const KemampuanBahasa = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const [searchData, setSearchData] = useState(searchParam.get("search") || "");
  const [debouncedInput] = useDebounce(searchData, 500);
  const [selectedItem, setSelectedItem] = useState<number[]>([]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<ActionType | null>(null);
  const queryClient = useQueryClient();

  // get data
  const { data } = useQuery({
    queryKey: [
      "kemampuan-bahasa-validasi-data",
      searchParam.get("page"),
      searchParam.get("search"),
    ],
    queryFn: async () => {
      const response = await adminServices.getKemampuanBahasa(
        searchParam.get("page") || 1,
        searchParam.get("search") || ""
      );

      return response.data.data;
    },
  });

  const handleSuccess = (action: ActionType) => {
    toast.success(`Berhasil ${action} data pengajuan`);
    setSelectedItem([]);
    setIsDialogOpen(false);
    queryClient.invalidateQueries({
      queryKey: ["kemampuan-bahasa-validasi-data"],
    });
  };

  const handleError = (error: Error) => {
    toast.error(`Gagal: ${error.message}`);
  };

  // reject
  const { mutate: rejectMutation } = useMutation({
    mutationFn: (payload: { ids: number[]; keterangan?: string }) =>
      patchDataServices.rejectDataRiwayatKemampuanBahasa(payload),
    onSuccess: () => handleSuccess("reject"),
    onError: handleError,
  });

  // approve
  const { mutate: approveMutation } = useMutation({
    mutationFn: (payload: { ids: number[]; keterangan?: string }) =>
      patchDataServices.approveDataRiwayatKemampuanBahasa(payload),
    onSuccess: () => handleSuccess("approve"),
    onError: handleError,
  });

  // draft
  // const { mutate: draftMutation } = useMutation({
  //   mutationFn: (payload: { ids: number[]; keterangan?: string }) =>
  //     patchDataServices.draftDataJabatanStruktural(payload),
  //   onSuccess: () => handleSuccess("draft"),
  //   onError: handleError,
  // });

  const handleSubmitData = (e: any) => {
    e.preventDefault();

    const payload = {
      ids: selectedItem,
    };

    switch (pendingAction) {
      case "approve":
        approveMutation(payload);
        break;
      case "reject":
        rejectMutation(payload);
        break;
      // case "draft":
      //   draftMutation(payload);
      //   break;
      default:
        toast.error("Aksi tidak diketahui");
    }
  };

  const pageIds = data?.data?.map((item: any) => item.id) || [];
  const isAllSelectedOnPage =
    pageIds.length > 0 && pageIds.every((id: any) => selectedItem.includes(id));
  const isSomeSelectedOnPage = pageIds.some((id: any) => selectedItem.includes(id));

  const handleSelectedItemId = (pegawaiId: number, checked: boolean) => {
    if (checked) {
      setSelectedItem((prev) => [...prev, pegawaiId]);
    } else {
      setSelectedItem((prev) => prev.filter((id) => id !== pegawaiId));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    const currentPageIds = data?.data?.map((item: any) => item.id) || [];
    if (checked) {
      setSelectedItem((prev) => [...new Set([...prev, ...currentPageIds])]);
    } else {
      setSelectedItem((prev) =>
        prev.filter((id) => !currentPageIds.includes(id))
      );
    }
  };

  const handleOpenDialog = (action: ActionType) => {
    setPendingAction(action);
    setIsDialogOpen(true);
  };

  const dialogDetails = {
    approve: {
      title: "Konfirmasi Persetujuan",
      description: `Anda akan menyetujui ${selectedItem.length} data keluarga terpilih. Aksi ini tidak dapat dibatalkan.`,
      confirmText: "Ya, Setujui",
      confirmClass: "bg-green-light-uika hover:bg-[#329C59]",
    },
    reject: {
      title: "Konfirmasi Penolakan",
      description: `Anda akan menolak ${selectedItem.length} data keluarga terpilih. Aksi ini tidak dapat dibatalkan.`,
      confirmText: "Ya, Tolak",
      confirmClass: "bg-red-600 hover:bg-red-700",
    },
    draft: {
      title: "Konfirmasi Draft",
      description: `Anda akan mengubah status ${selectedItem.length} data keluarga terpilih menjadi "draf".`,
      confirmText: "Ya, Simpan ke Draf",
      confirmClass: "bg-blue-500 hover:bg-blue-600",
    },
  };

  useEffect(() => {
    const newSearchParam = new URLSearchParams(searchParam);

    if (debouncedInput.length > 3) {
      newSearchParam.set("search", debouncedInput);
      newSearchParam.set("page", "1");
    } else {
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
  }, [searchParam, setSearchParam]);

  useEffect(() => {
    if (Number(searchParam.get("page")) < 1) {
      const newSearchParam = new URLSearchParams(searchParam);
      newSearchParam.set("page", "1");
      setSearchParam(newSearchParam);
    }
  }, [searchParam, setSearchParam]);

  useEffect(() => {
    if (
      data?.last_page &&
      Number(searchParam.get("page")) > data.last_page &&
      data.last_page > 0
    ) {
      const newSearchParam = new URLSearchParams(searchParam);
      newSearchParam.set("page", data.last_page.toString());
      setSearchParam(newSearchParam);
    }
  }, [searchParam, data, setSearchParam]);

  return (
    <div className="mt-10 mb-20">
      <Title title="Validasi" subTitle="Daftar Kemampuan Bahasa" />

      <CustomCard
        actions={
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col min-[1258px]:flex-row gap-1 col-span-2 md:col-span-1">
              <Label className="text-[#FDA31A] md:w-full text-xs md:text-sm">
                Unit Kerja
              </Label>
              <SelectFilter
                placeholder="041001 - Universitas Ibn Khaldun"
                options={[
                  { label: "Admin", value: "admin" },
                  { label: "User", value: "user" },
                  { label: "Guest", value: "guest" },
                ]}
              />
            </div>
            <div className="flex flex-col min-[1258px]:flex-row gap-1 col-span-2 md:col-span-1">
              <Label className="text-[#FDA31A] md:w-full text-xs md:text-sm">
                Status
              </Label>
              <SelectFilter
                placeholder="Disetujui"
                options={[
                  { label: "Admin", value: "admin" },
                  { label: "User", value: "user" },
                  { label: "Guest", value: "guest" },
                ]}
              />
            </div>
            <div className="flex flex-col min-[1258px]:flex-row gap-1 col-span-2 md:col-span-1">
              <Label className="text-[#FDA31A] md:w-full text-xs md:text-sm">
                Jabatan Fungsional
              </Label>
              <SelectFilter
                placeholder="-Semua Jabatan Fungsional-"
                options={[
                  { label: "Admin", value: "admin" },
                  { label: "User", value: "user" },
                  { label: "Guest", value: "guest" },
                ]}
              />
            </div>
          </div>
        }
      />

      <div className="flex flex-col md:flex-row md:justify-between mt-10 gap-4">
        <div className="flex flex-col md:flex-row gap-2 lg:gap-4">
          <SelectFilter
            placeholder="--Semua--"
            options={[
              { label: "Admin", value: "admin" },
              { label: "User", value: "user" },
              { label: "Guest", value: "guest" },
            ]}
          />

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
              <FaCheck className="w-5! h-5! text-white" />
              Approve {selectedItem.length} data
            </Button>
            <Button
              type="button"
              onClick={() => handleOpenDialog("reject")}
              variant="destructive"
            >
              <IoClose className="w-5! h-5! text-white" />
              Reject {selectedItem.length} data
            </Button>
            {/* <Button
                     type="button"
                     onClick={() => handleOpenDialog("draft")}
                     className="bg-blue-500 hover:bg-blue-600"
                   >
                     <MdPlayArrow className="w-5! h-5! text-white" />
                     Draft {selectedItem.length} data
                   </Button> */}
          </div>
        )}
      </div>

      <Table className="mt-10 table-auto text-xs lg:text-sm">
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="text-center">
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
            <TableHead className="text-center">Tahun</TableHead>
            <TableHead className="text-center">Bahasa</TableHead>
            <TableHead className="text-center">Kemampuan Mendengar</TableHead>
            <TableHead className="text-center">Kemampuan Bicara</TableHead>
            <TableHead className="text-center">Kemampuan Menulis</TableHead>
            <TableHead className="text-center">Tgl Disetujui</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-center">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-gray-200">
          {data?.data.map((item: any) => (
            <TableRow className=" even:bg-gray-100">
              <TableCell className="text-center">
                <Checkbox
                  checked={selectedItem.includes(item.id)}
                  onCheckedChange={(checked) =>
                    handleSelectedItemId(item.id, checked === true)
                  }
                />
              </TableCell>
              <TableCell className="text-center">{item.nip_pegawai}</TableCell>
              <TableCell className="text-center">{item.nama_pegawai}</TableCell>
              <TableCell className="text-center">{item.tahun}</TableCell>
              <TableCell className="text-center">{item.nama_bahasa}</TableCell>
              <TableCell className="text-center">
                {item.kemampuan_mendengar}
              </TableCell>
              <TableCell className="text-center">
                {item.kemampuan_bicara}
              </TableCell>
              <TableCell className="text-center">
                {item.kemampuan_menulis}
              </TableCell>
              <TableCell className="text-center">
                {item.timestamps.tgl_disetujui
                  ? format(item.timestamps.tgl_disetujui, "dd MMMM yyyy")
                  : "-"}
              </TableCell>
              <TableCell className="text-center">
                <Button
                  size="sm"
                  className={`w-full text-xs lg:text-sm text-black
                                                    ${
                                                      item.status_pengajuan ===
                                                      "draf"
                                                        ? "bg-[#C4C4C4]/65 hover:bg-[#C4C4C4]/65"
                                                        : item.status_pengajuan ===
                                                          "diajukan"
                                                        ? "bg-[#FFC951]/50 hover:bg-[#FFC951]/50"
                                                        : item.status_pengajuan ===
                                                          "disetujui"
                                                        ? "bg-[#0EE03C]/50 hover:bg-[#0EE03C]/50"
                                                        : item.status_pengajuan ===
                                                          "ditolak"
                                                        ? "bg-red-500 hover:bg-red-500"
                                                        : "bg-slate-300 hover:bg-slate-300"
                                                    }
                                                  `}
                >
                  {item.status_pengajuan}
                </Button>
              </TableCell>
              <TableCell className="h-full">
                <div className="flex justify-center items-center w-full h-full">
                  <Link to="/admin/pengembangan/kemampuan-bahasa/detail-data-kemampuan-bahasa">
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
          ))}
        </TableBody>
      </Table>

      <CustomPagination
        currentPage={Number(searchParam.get("page") || 1)}
        links={data?.links || []}
        onPageChange={(page) => {
          searchParam.set("page", page.toString());
          setSearchParam(searchParam);
        }}
        hasNextPage={!!data?.next_page_url}
        hasPrevPage={!!data?.prev_page_url}
        totalPages={data?.last_page}
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

            <DialogFooter>
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
                Konfirmasi
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default KemampuanBahasa;
