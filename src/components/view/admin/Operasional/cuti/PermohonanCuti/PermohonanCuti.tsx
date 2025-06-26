import CustomCard from "@/components/blocks/Card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
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
// import adminServices from "@/services/admin.services";
// import patchDataServices from "@/services/patch.admin.services";
// import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
import { FiSearch } from "react-icons/fi";
import { IoEyeOutline } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { useSearchParams } from "react-router-dom";
// import { toast } from "sonner";
import { useDebounce } from "use-debounce";

// Definisikan tipe data untuk form dan mutasi
// interface IFormInput {
//   keterangan_admin: string;
// }

// interface IMutationVariables {
//   id: number;
//   data: IFormInput;
// }

// Tipe untuk data item dari API (sesuaikan dengan data asli Anda)
// interface IzinItem {
//   id: number;
//   nip: string;
//   nama_pegawai: string;
//   jenis_izin: string;
//   detail_data: {
//     keterangan_pemohon: string;
//     tgl_disetujui: string | null;
//   };
//   lama_izin: string;
//   status: string;
// }

const PermohonanCuti = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  // const queryClient = useQueryClient();

  const [searchData] = useState(searchParam.get("search") || "");
  const [debouncedInput] = useDebounce(searchData, 500);

  // State untuk mengelola dialog
  // const [, setDialogState] = useState<{
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
  // const { data } = useQuery<{ data: IzinItem[] }>({
  //   queryKey: [
  //     "pengajuan-cuti-admin",
  //     searchParam.get("page"),
  //     searchParam.get("search"),
  //   ],
  //   queryFn: async () => {
  //     const page = searchParam.get("page") || "1";
  //     const search = searchParam.get("search") || "";
  //     const response = await adminServices.getPengajuanCutiAdmin(page, search);
  //     return response.data;
  //   },
  // });

  // Fungsi untuk menutup dialog dan mereset state
  // const closeDialog = () => {
  //   setDialogState({ isOpen: false, action: null, item: null });
  //   form.reset();
  // };

  // Mutasi untuk MENYETUJUI cuti
  // const { mutate: approveMutation, isPending: isApproving } = useMutation({
  //   mutationFn: (variables: IMutationVariables) =>
  //     patchDataServices.aprovePengajuanCuti(variables.id, variables.data),
  //   onSuccess: () => {
  //     toast.success("Berhasil menyetujui pengajuan cuti");
  //     queryClient.invalidateQueries({ queryKey: ["pengajuan-cuti-admin"] });
  //     closeDialog();
  //   },
  //   onError: (error) => {
  //     toast.error(`Gagal: ${error.message}`);
  //   },
  // });

  // Mutasi untuk MENOLAK cuti
  // const { mutate: rejectMutation, isPending: isRejecting } = useMutation({
  //   mutationFn: (variables: IMutationVariables) => {
  //     const payloadForReject = {
  //       keterangan: variables.data.keterangan_admin,
  //     };
  //     return patchDataServices.tolakPengajuanCuti(
  //       variables.id,
  //       payloadForReject
  //     );
  //   },
  //   onSuccess: () => {
  //     toast.success("Berhasil menolak pengajuan izin");
  //     queryClient.invalidateQueries({ queryKey: ["pengajuan-cuti-admin"] });
  //     closeDialog();
  //   },
  //   onError: (error) => {
  //     toast.error(`Gagal: ${error.message}`);
  //   },
  // });

  // Fungsi untuk membuka dialog
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

          <div className="w-full md:w-90 relative">
            <FiSearch className="absolute top-1/2 -translate-y-1/2 right-2" />
            <Input
              placeholder="Search"
              className="w-full md:w-90 pr-8 text-xs sm:text-sm"
            />
          </div>
        </div>

        <Button className="cursor-pointer bg-green-light-uika hover:bg-[#329C59]">
          Refresh
        </Button>
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
          {/* {data?.data.map((item: any) => ( */}
          <TableRow className=" even:bg-gray-100">
            <TableCell className="text-center">
              <Checkbox />
            </TableCell>
            <TableCell className="text-center text-xs sm:text-sm"></TableCell>
            <TableCell className="text-center text-xs sm:text-sm"></TableCell>
            <TableCell className="text-center text-xs sm:text-sm"></TableCell>
            <TableCell className="text-center text-xs sm:text-sm"></TableCell>
            <TableCell className="text-center text-xs sm:text-sm"></TableCell>
            <TableCell className="text-center text-xs sm:text-sm"></TableCell>
            <TableCell className="h-full">
              <div className="flex justify-center items-center w-full h-full">
                <Button size="icon" variant="ghost" className="cursor-pointer">
                  <IoEyeOutline className="w-5! h-5! text-[#26A1F4]" />
                </Button>

                <Button size="icon" variant="ghost" className="cursor-pointer">
                  <MdEdit className="w-5! h-5! text-[#26A1F4]" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
          {/* ))} */}
        </TableBody>
      </Table>

      <Pagination className="mt-8 flex justify-end">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PermohonanCuti;
