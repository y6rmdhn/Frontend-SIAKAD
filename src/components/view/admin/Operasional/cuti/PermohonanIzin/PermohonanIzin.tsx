import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
// import { toast } from "sonner";
import { useDebounce } from "use-debounce";

// Impor komponen UI dan ikon
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
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
// import { Textarea } from "@/components/ui/textarea";
import { IoEyeOutline } from "react-icons/io5";
import { MdEdit } from "react-icons/md";

// Impor komponen & service kustom
import CustomCard from "@/components/blocks/Card";
import CustomPagination from "@/components/blocks/CustomPagination";
import SearchInput from "@/components/blocks/SearchInput";
import Title from "@/components/blocks/Title";
import adminServices from "@/services/admin.services";
// import patchDataServices from "@/services/patch.admin.services";

// Definisikan tipe data untuk form dan mutasi
// interface IFormInput {
//   keterangan_admin: string;
// }

// interface IMutationVariables {
//   id: number;
//   data: IFormInput;
// }

// Tipe untuk data item dari API (sesuaikan dengan data asli Anda)
interface IzinItem {
  id: number;
  nip: string;
  nama_pegawai: string;
  jenis_izin: string;
  detail_data: {
    keterangan_pemohon: string;
    tgl_disetujui: string | null;
  };
  lama_izin: string;
  status: string;
}

const PermohonanIzin = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  // const queryClient = useQueryClient();

  const [searchData, setSearchData] = useState(searchParam.get("search") || "");
  const [debouncedInput] = useDebounce(searchData, 500);

  // State untuk mengelola dialog
  // const [dialogState, setDialogState] = useState<{
  //   isOpen: boolean;
  //   action: "approve" | "reject" | null;
  //   item: IzinItem | null;
  // }>({
  //   isOpen: false,
  //   action: null,
  //   item: null,
  // });

  // const form = useForm<IFormInput>({
  //   defaultValues: {
  //     keterangan_admin: "",
  //   },
  // });

  // Query untuk mengambil data
  const { data, isLoading } = useQuery<{ data: IzinItem[] }>({
    queryKey: [
      "pengajuan-izin-admin",
      searchParam.get("page"),
      searchParam.get("search"),
    ],
    queryFn: async () => {
      const page = searchParam.get("page") || "1";
      const search = searchParam.get("search") || "";
      const response = await adminServices.getPengajuanIzinAdmin(page, search);
      return response.data;
    },
  });

  // Fungsi untuk menutup dialog dan mereset state
  // const closeDialog = () => {
  //   setDialogState({ isOpen: false, action: null, item: null });
  //   form.reset();
  // };

  // Mutasi untuk MENYETUJUI izin
  // const { mutate: approveMutation, isPending: isApproving } = useMutation({
  //   mutationFn: (variables: IMutationVariables) =>
  //     patchDataServices.aprovePengajuanIzin(variables.id, variables.data),
  //   onSuccess: () => {
  //     toast.success("Berhasil menyetujui pengajuan izin");
  //     queryClient.invalidateQueries({ queryKey: ["pengajuan-izin-admin"] });
  //     closeDialog();
  //   },
  //   onError: (error) => {
  //     toast.error(`Gagal: ${error.message}`);
  //   },
  // });

  // // Mutasi untuk MENOLAK izin
  // const { mutate: rejectMutation, isPending: isRejecting } = useMutation({
  //   mutationFn: (variables: IMutationVariables) => {
  //     const payloadForReject = {
  //       keterangan: variables.data.keterangan_admin,
  //     };
  //     return patchDataServices.tolakPengajuanIzin(
  //       variables.id,
  //       payloadForReject
  //     );
  //   },
  //   onSuccess: () => {
  //     toast.success("Berhasil menolak pengajuan izin");
  //     queryClient.invalidateQueries({ queryKey: ["pengajuan-izin-admin"] });
  //     closeDialog();
  //   },
  //   onError: (error) => {
  //     toast.error(`Gagal: ${error.message}`);
  //   },
  // });

  // // Fungsi untuk membuka dialog
  // const handleOpenDialog = (action: "approve" | "reject", item: IzinItem) => {
  //   setTimeout(() => {
  //     setDialogState({ isOpen: true, action, item });
  //   }, 100);
  // };

  // // Fungsi yang dijalankan saat form di-submit
  // const onSubmit = (formData: IFormInput) => {
  //   if (!dialogState.action || !dialogState.item) return;

  //   const variables: IMutationVariables = {
  //     id: dialogState.item.id,
  //     data: formData,
  //   };

  //   if (dialogState.action === "approve") {
  //     approveMutation(variables);
  //   } else if (dialogState.action === "reject") {
  //     rejectMutation(variables);
  //   }
  // };

  // const isProcessing = isApproving || isRejecting;

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
      <Title title="Pengajuan Izin" subTitle="Daftar Pengajuan Izin" />

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
                    <SelectLabel>Status</SelectLabel>
                    <SelectItem value="diajukan">Diajukan</SelectItem>
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
                    <SelectLabel>Periode</SelectLabel>
                    <SelectItem value="tahunan">Cuti Tahunan</SelectItem>
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
                <SelectLabel>Filter</SelectLabel>
                <SelectItem value="semua">--Semua--</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <SearchInput
            value={searchData}
            onChange={(e) => setSearchData(e.target.value)}
          />
        </div>
      </div>

      <Table className="mt-10 table-auto">
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="text-center"></TableHead>
            <TableHead className="text-center text-xs sm:text-sm">
              NIP
            </TableHead>
            <TableHead className="text-center text-xs sm:text-sm">
              Nama Pegawai
            </TableHead>
            <TableHead className="text-center text-xs sm:text-sm">
              Jenis Izin
            </TableHead>
            <TableHead className="text-center text-xs sm:text-sm">
              Keterangan Izin
            </TableHead>
            <TableHead className="text-center text-xs sm:text-sm">
              Lama Izin
            </TableHead>
            <TableHead className="text-center text-xs sm:text-sm">
              Status
            </TableHead>
            <TableHead className="text-center text-xs sm:text-sm">
              Tgl Disetujui
            </TableHead>
            <TableHead className="text-center text-xs sm:text-sm">
              Aksi
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-gray-200">
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={9} className="text-center">
                Memuat data...
              </TableCell>
            </TableRow>
          ) : (
            data?.data.map((item) => (
              <TableRow key={item.id} className=" even:bg-gray-100">
                <TableCell className="text-center">
                  <Checkbox className="bg-gray-100 border-gray-300 data-[state=checked]:bg-green-light-uika data-[state=checked]:border-green-light-uika cursor-pointer" />
                </TableCell>
                <TableCell className="text-center">{item.nip}</TableCell>
                <TableCell className="text-center">
                  {item.nama_pegawai}
                </TableCell>
                <TableCell className="text-center text-xs sm:text-sm">
                  {item.jenis_izin}
                </TableCell>
                <TableCell className="text-center text-xs sm:text-sm">
                  {item.detail_data.keterangan_pemohon}
                </TableCell>
                <TableCell className="text-center text-xs sm:text-sm">
                  {item.lama_izin}
                </TableCell>
                <TableCell className="text-center text-xs sm:text-sm">
                  <Button
                    size="sm"
                    className={`w-full text-xs lg:text-sm text-black
                      ${
                        item.status === "Draf"
                          ? "bg-[#C4C4C4]/65 hover:bg-[#C4C4C4]/65"
                          : item.status === "Diajukan"
                          ? "bg-[#FFC951]/50 hover:bg-[#FFC951]/50"
                          : item.status === "Disetujui"
                          ? "bg-[#0EE03C]/50 hover:bg-[#0EE03C]/50"
                          : item.status === "Ditolak"
                          ? "bg-red-500 hover:bg-red-500"
                          : "bg-slate-300 hover:bg-slate-300"
                      }
                    `}
                  >
                    {item.status}
                  </Button>
                </TableCell>
                <TableCell className="text-center text-xs sm:text-sm">
                  {item.detail_data.tgl_disetujui || "-"}
                </TableCell>
                <TableCell className="h-full">
                  <div className="flex justify-center items-center w-full h-full">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="cursor-pointer"
                    >
                      <IoEyeOutline className="w-5 h-5 text-[#26A1F4]" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="cursor-pointer"
                        >
                          <MdEdit className="w-5 h-5 text-[#26A1F4]" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>Pilih Aksi</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          // onSelect={() => handleOpenDialog("approve", item)}
                          className="cursor-pointer"
                        >
                          Setujui
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          // onSelect={() => handleOpenDialog("reject", item)}
                          className="cursor-pointer text-red-600 focus:text-red-600"
                        >
                          Tolak
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* <Dialog
        open={dialogState.isOpen}
        onOpenChange={(openValue) => {
          if (!openValue) {
            closeDialog();
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {dialogState.action === "approve"
                ? "Konfirmasi Persetujuan Izin"
                : "Konfirmasi Penolakan Izin"}
            </DialogTitle>
            <DialogDescription>
              Anda akan{" "}
              {dialogState.action === "approve" ? "menyetujui" : "menolak"}{" "}
              permohonan izin dari{" "}
              <strong>{dialogState.item?.nama_pegawai}</strong>. Silakan berikan
              keterangan.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="keterangan_admin"
                rules={{ required: "Keterangan wajib diisi." }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Keterangan Admin</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Contoh: Disetujui, harap kembali tepat waktu."
                        {...field}
                        disabled={isProcessing}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={closeDialog}
                  disabled={isProcessing}
                >
                  Batal
                </Button>
                <Button type="submit" disabled={isProcessing}>
                  {isProcessing
                    ? "Memproses..."
                    : dialogState.action === "approve"
                    ? "Ya, Setujui"
                    : "Ya, Tolak"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog> */}

      <CustomPagination
        currentPage={Number(searchParam.get("page") || 1)}
        data={data}
        onPageChange={(page) => {
          const newSearchParam = new URLSearchParams(searchParam);
          newSearchParam.set("page", page.toString());
          setSearchParam(newSearchParam);
        }}
      />
    </div>
  );
};

export default PermohonanIzin;
