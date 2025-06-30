import { Button } from "@/components/ui/button";
import CustomCard from "@/components/blocks/Card";
import CustomPagination from "@/components/blocks/CustomPagination";
import FilterPegawai from "@/components/blocks/FilterPegawai";
import SearchInput from "@/components/blocks/SearchInput";
import SelectFilter from "@/components/blocks/SelectFilter";
import Status from "@/components/blocks/Status";
import { Checkbox } from "@/components/ui/checkbox";
import { Form } from "@/components/ui/form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import unitKerjaOptions from "@/constant/dummyFilter";
import adminServices from "@/services/admin.services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaCheck, FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { Link, useSearchParams } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { useDebounce } from "use-debounce";
import { toast } from "sonner";
import deleteReferensiServices from "@/services/admin.delete.referensi";
import { ConfirmDialog } from "@/components/blocks/ConfirmDialog/ConfirmDialog";

// --- START DEFINISI TIPE DATA ---

// Tipe untuk item data pegawai di dalam tabel
interface PegawaiItem {
  id: number;
  nip: string;
  nidn: string | null;
  nama_pegawai: string;
  unit_kerja: string;
  status: string;
}

// Tipe untuk link pagination
interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

// Tipe utama untuk keseluruhan respons API
interface PegawaiApiResponse {
  data: PegawaiItem[];
  links: PaginationLink[];
  next_page_url: string | null;
  prev_page_url: string | null;
  last_page: number;
}

// --- END DEFINISI TIPE DATA ---

const Pegawai = () => {
  const form = useForm();
  const [selectedPegawaiId, setSelectedPegawaiId] = useState<number[]>([]);
  const [searchParam, setSearchParam] = useSearchParams();
  const [searchData, setSearchData] = useState(searchParam.get("search") || "");
  const [debouncedInput] = useDebounce(searchData, 500);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery<PegawaiApiResponse>({
    queryKey: ["pegawai", searchParam.get("page"), searchParam.get("search")],
    queryFn: async () => {
      const page = searchParam.get("page") || "1";
      const search = searchParam.get("search") || "";
      const response = await adminServices.getPegawaiAdminPage(page, search);
      return response.data.data;
    },
  });

  const handleSelectedPegawaiId = (pegawaiId: number, checked: boolean) => {
    if (checked) {
      setSelectedPegawaiId((prev) => [...prev, pegawaiId]);
    } else {
      setSelectedPegawaiId((prev) => prev.filter((id) => id !== pegawaiId));
    }
  };

  const { mutate: deleteData } = useMutation({
    mutationFn: (payload: any) =>
      deleteReferensiServices.deletePegawai(payload),
    onSuccess: () => {
      toast.success("Data berhasil dihapus");
      queryClient.invalidateQueries({ queryKey: ["pegawai"] });
      setSelectedPegawaiId([]);
    },
    onError: () => {
      toast.error("Gagal menghapus data");
    },
  });

  // --- START PERBAIKAN ---

  // Fungsi untuk menangani penghapusan beberapa data yang dipilih
  const handleDeleteSelected = () => {
    const payload = {
      pegawai_ids: selectedPegawaiId,
    };

    if (selectedPegawaiId.length > 0) {
      deleteData(payload);
    }
  };

  // Fungsi untuk menangani penghapusan satu data dari baris tabel
  const handleDeleteSingle = (id: number) => {
    // Mutation 'deleteData' mengharapkan array, jadi kita kirim id dalam sebuah array
    deleteData({ pegawai_ids: id });
  };

  // --- END PERBAIKAN ---

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
    <div className="w-full mt-10 mb-20">
      <Form {...form}>
        {/* Menghapus 'onSubmit' dari form karena aksi dikontrol oleh tombol dengan dialog konfirmasi */}
        <form>
          <h1 className="text-2xl font-normal">Pegawai</h1>
          <CustomCard title="Filter">
            <FilterPegawai />
          </CustomCard>

          <div className="mt-14 flex flex-col min-[1137px]:flex-row gap-4 justify-between">
            <div className="flex flex-col md:flex-row gap-5">
              <SelectFilter
                classname="w-full md:w-32 "
                options={unitKerjaOptions}
                placeholder="--Semua--"
              />
              <SearchInput
                value={searchData}
                onChange={(e) => setSearchData(e.target.value)}
              />
            </div>

            <div className="flex flex-col md:flex-row gap-2">
              <Link to="/admin/pegawai/data-pegawai">
                <Button className="cursor-pointer w-full bg-green-light-uika hover:bg-[#329C59]">
                  <FaPlus /> Tambah
                </Button>
              </Link>

              {/* Tombol Hapus Beberapa Data */}
              {selectedPegawaiId.length > 0 && (
                <ConfirmDialog
                  title="Hapus Data Terpilih?"
                  description={`Apakah Anda yakin ingin menghapus ${selectedPegawaiId.length} data ini?`}
                  // Memanggil fungsi yang benar
                  onConfirm={handleDeleteSelected}
                >
                  <Button variant="destructive" className="cursor-pointer">
                    <FaRegTrashAlt /> Hapus {selectedPegawaiId.length} Data
                  </Button>
                </ConfirmDialog>
              )}

              <Button className="cursor-pointer min-w-52 bg-green-light-uika flex lg:justify-start lg:items-center hover:bg-[#329C59]">
                <FaCheck /> Set Status
              </Button>
            </div>
          </div>

          {isLoading ? (
            <div className="mt-3 space-y-4">
              <Skeleton className="h-12 w-full" />
              {[...Array(10)].map((_, i) => (
                <Skeleton key={i} className="h-10 w-full" />
              ))}
            </div>
          ) : (
            <>
              <Table className="mt-3 table-auto text-xs lg:text-sm">
                <TableHeader>
                  <TableRow className="bg-gray-100">
                    <TableHead className="text-center"></TableHead>
                    <TableHead className="text-center">NIP</TableHead>
                    <TableHead className="text-center">NIDN</TableHead>
                    <TableHead className="text-center">Nama Pegawai</TableHead>
                    <TableHead className="text-center">Unit Kerja</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-center">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="divide-y divide-gray-200">
                  {data?.data.map((item) => (
                    <TableRow key={item.id} className=" even:bg-gray-100">
                      <TableCell className="font-medium">
                        <Checkbox
                          checked={selectedPegawaiId.includes(item.id)}
                          onCheckedChange={(checked) =>
                            handleSelectedPegawaiId(item.id, checked === true)
                          }
                        />
                      </TableCell>
                      <TableCell className="text-center">{item.nip}</TableCell>
                      <TableCell className="text-center">{item.nidn}</TableCell>
                      <TableCell className="text-center">
                        {item.nama_pegawai}
                      </TableCell>
                      <TableCell className="text-center">
                        {item.unit_kerja}
                      </TableCell>
                      <TableCell className="text-center">
                        {item.status}
                      </TableCell>
                      <TableCell className="text-center w-28">
                        <div className="flex">
                          <Link
                            to={"/admin/pegawai/edit-data-pegawai/" + item.id}
                          >
                            <Button
                              size="icon"
                              variant="ghost"
                              className="cursor-pointer"
                            >
                              <MdEdit className="w-5! h-5! text-[#26A1F4]" />
                            </Button>
                          </Link>
                          <Link to={"/admin/detail-pegawai/biodata/" + item.id}>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="cursor-pointer"
                            >
                              <IoEyeOutline className="w-5! h-5! text-[#26A1F4]" />
                            </Button>
                          </Link>

                          {/* --- START PERBAIKAN --- */}
                          {/* Tombol Hapus Satu Data dengan ConfirmDialog */}
                          <ConfirmDialog
                            title="Hapus Data?"
                            description={`Apakah Anda yakin ingin menghapus data "${item.nama_pegawai}"?`}
                            onConfirm={() => handleDeleteSingle(item.id)}
                          >
                            <Button
                              size="icon"
                              variant="ghost"
                              className="cursor-pointer"
                            >
                              <FaRegTrashAlt className="text-red-500" />
                            </Button>
                          </ConfirmDialog>
                          {/* --- END PERBAIKAN --- */}
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
            </>
          )}

          <Status />
        </form>
      </Form>
    </div>
  );
};

export default Pegawai;
