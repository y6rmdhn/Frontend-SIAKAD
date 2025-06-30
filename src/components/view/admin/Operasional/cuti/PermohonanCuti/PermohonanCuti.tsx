import CustomCard from "@/components/blocks/Card";
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput";
import CustomPagination from "@/components/blocks/CustomPagination";
import SearchInput from "@/components/blocks/SearchInput";
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
import { Form } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaCheck } from "react-icons/fa";
import { IoClose, IoEyeOutline } from "react-icons/io5";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { useDebounce } from "use-debounce";
import { z } from "zod";

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

const PermohonanCuti = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const [searchData, setSearchData] = useState(searchParam.get("search") || "");
  const [debouncedInput] = useDebounce(searchData, 500);
  const [selectedItem, setSelectedItem] = useState<number[]>([]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<ActionType | null>(null);
  const queryClient = useQueryClient();

  const form = useForm<ActionSchema>({
    resolver: zodResolver(
      pendingAction === "reject" ? rejectActionSchema : actionSchema
    ),
    defaultValues: {
      keterangan_admin: "",
    },
  });

  // Query untuk mengambil data
  const { data } = useQuery({
    queryKey: [
      "pengajuan-cuti-admin",
      searchParam.get("page"),
      searchParam.get("search"),
    ],
    queryFn: async () => {
      const page = searchParam.get("page") || "1";
      const search = searchParam.get("search") || "";
      const response = await adminServices.getPengajuanCutiAdmin(page, search);
      return response.data;
    },
  });

  const handleSuccess = (action: ActionType) => {
    toast.success(`Berhasil ${action} data pengajuan`);
    setSelectedItem([]);
    form.reset();
    setIsDialogOpen(false);
    queryClient.invalidateQueries({ queryKey: ["pengajuan-cuti-admin"] });
  };

  const handleError = (error: Error) => {
    toast.error(`Gagal: ${error.message}`);
  };

  // reject
  const { mutate: rejectMutation } = useMutation({
    mutationFn: (payload: { ids: number[]; keterangan?: string }) =>
      patchDataServices.aprovePengajuanCuti(payload),
    onSuccess: () => handleSuccess("reject"),
    onError: handleError,
  });

  // approve
  const { mutate: approveMutation } = useMutation({
    mutationFn: (payload: { ids: number[]; keterangan?: string }) =>
      patchDataServices.aprovePengajuanCuti(payload),
    onSuccess: () => handleSuccess("approve"),
    onError: handleError,
  });

  const handleSubmitData = (values: ActionSchema) => {
    const payload = {
      ids: selectedItem,
      keterangan_admin: values.keterangan_admin,
    };

    switch (pendingAction) {
      case "approve":
        if (!payload.keterangan_admin) {
          delete payload.keterangan_admin;
        }
        approveMutation(payload);
        break;
      case "reject":
        rejectMutation(payload);
        break;
      default:
        toast.error("Aksi tidak diketahui");
    }
  };

  const pageIds = data?.data?.map((item: any) => item.id) || [];
  const isAllSelectedOnPage =
    pageIds.length > 0 && pageIds.every((id: any) => selectedItem.includes(id));
  const isSomeSelectedOnPage = pageIds.some((id: any) =>
    selectedItem.includes(id)
  );

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
    if (debouncedInput) {
      newSearchParam.set("search", debouncedInput);
      newSearchParam.set("page", "1");
    } else {
      newSearchParam.delete("search");
    }
    if (searchParam.toString() !== newSearchParam.toString()) {
      setSearchParam(newSearchParam);
    }
  }, [debouncedInput, searchParam, setSearchParam]);

  return (
    <div className="mt-10 mb-20">
      <h1 className="text-lg sm:text-2xl font-normal">
        Permohonan Cuti{" "}
        <span className="text-muted-foreground font-normal text-[12px] sm:text-[16px]">
          Daftar Permohonan Cuti
        </span>
      </h1>

      <CustomCard
        actions={
          <div className="grid grid-rows-3 lg:grid-rows-2 grid-flow-col gap-5 lg:gap-10">
            <div className="flex flex-col sm:flex-row">
              <Label className="w-full text-[#FDA31A]">Unit Kerja</Label>
              <Select>
                <SelectTrigger className="text-xs sm:text-sm w-full">
                  <SelectValue placeholder="041001 - Universitas Ibn Khaldun" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Unit Kerja</SelectLabel>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                    <SelectItem value="grapes">Grapes</SelectItem>
                    <SelectItem value="pineapple">Pineapple</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col sm:flex-row">
              <Label className="w-full text-[#FDA31A]">Status</Label>
              <Select>
                <SelectTrigger className="text-xs sm:text-sm w-full">
                  <SelectValue placeholder="Diajukan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Unit Kerja</SelectLabel>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                    <SelectItem value="grapes">Grapes</SelectItem>
                    <SelectItem value="pineapple">Pineapple</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col sm:flex-row">
              <Label className="w-full text-[#FDA31A]">Periode Cuti</Label>
              <Select>
                <SelectTrigger className="text-xs sm:text-sm w-full">
                  <SelectValue placeholder="Cuti Tahunan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Unit Kerja</SelectLabel>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                    <SelectItem value="grapes">Grapes</SelectItem>
                    <SelectItem value="pineapple">Pineapple</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        }
      />

      <div className="flex flex-col gap-4 md:flex-row justify-between mt-6">
        <div className="w-full flex flex-col sm:flex-row gap-3">
          <Select>
            <SelectTrigger className="text-xs sm:text-sm sm:w-32 w-full">
              <SelectValue placeholder="--Semua--" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Unit Kerja</SelectLabel>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
                <SelectItem value="grapes">Grapes</SelectItem>
                <SelectItem value="pineapple">Pineapple</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

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
          </div>
        )}
      </div>

      <Table className="mt-10 table-auto">
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
            <TableHead className="text-center text-xs sm:text-sm">
              NIP
            </TableHead>
            <TableHead className="text-center text-xs sm:text-sm">
              Nama Pegawai
            </TableHead>
            <TableHead className="text-center text-xs sm:text-sm">
              Unit Kerja
            </TableHead>
            <TableHead className="text-center text-xs sm:text-sm">
              Sisa Cuti
            </TableHead>
            <TableHead className="text-center text-xs sm:text-sm">
              Cuti Dipakai
            </TableHead>
            <TableHead className="text-center text-xs sm:text-sm">
              Jumlah Cuti
            </TableHead>
            <TableHead className="text-center text-xs sm:text-sm">
              Aksi
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-gray-200">
          {data?.data.map((item: any) => (
            <TableRow key={item.id} className="even:bg-gray-100">
              <TableCell className="text-center">
                <Checkbox
                  checked={selectedItem.includes(item.id)}
                  onCheckedChange={(checked) =>
                    handleSelectedItemId(item.id, checked === true)
                  }
                />
              </TableCell>
              <TableCell className="text-center text-xs sm:text-sm">
                {item.nip}
              </TableCell>
              <TableCell className="text-center text-xs sm:text-sm">
                {item.nama_pegawai}
              </TableCell>
              <TableCell className="text-center text-xs sm:text-sm"></TableCell>
              <TableCell className="text-center text-xs sm:text-sm"></TableCell>
              <TableCell className="text-center text-xs sm:text-sm"></TableCell>
              <TableCell className="text-center text-xs sm:text-sm"></TableCell>
              <TableCell className="h-full">
                <div className="flex justify-center items-center w-full h-full">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="cursor-pointer"
                  >
                    <IoEyeOutline className="w-5! h-5! text-[#26A1F4]" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <CustomPagination
        currentPage={Number(searchParam.get("page") || 1)}
        data={data}
        onPageChange={(page) => {
          const newSearchParam = new URLSearchParams(searchParam);
          newSearchParam.set("page", page.toString());
          setSearchParam(newSearchParam);
        }}
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
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PermohonanCuti;
