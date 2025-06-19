import CustomCard from "@/components/blocks/Card";
import CustomPagination from "@/components/blocks/CustomPagination";
import SelectFilter from "@/components/blocks/SelectFilter";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
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
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { IoEyeOutline } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { Link, useSearchParams } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton"; // Impor untuk loading state

// --- START DEFINISI TIPE DATA ---

// Tipe untuk opsi filter dari API
interface FilterOption {
  id: number | string;
  nama: string;
}

// Tipe untuk item data pelanggaran di dalam tabel
interface PelanggaranItem {
  id: number;
  nama_pegawai: string;
  tgl_pelanggaran_formatted: string;
  jenis_pelanggaran: string;
}

// Tipe untuk link pagination
interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

// Tipe utama untuk keseluruhan respons API
interface PelanggaranApiResponse {
  data: {
    data: PelanggaranItem[];
  };
  filters: {
    unit_kerja: FilterOption[];
    jabatan_fungsional: FilterOption[];
    jenis_pelanggaran: FilterOption[];
  };
  links: PaginationLink[];
  next_page_url: string | null;
  prev_page_url: string | null;
  last_page: number;
}

// --- END DEFINISI TIPE DATA ---

const Pelanggaran = () => {
  const [searchParam, setSearchParam] = useSearchParams();

  // FIX: Menambahkan tipe generik pada useQuery
  const { data, isLoading } = useQuery<PelanggaranApiResponse>({
    queryKey: ["jenis-pelanggaran-kompensasi", searchParam.get("page")],
    queryFn: async () => {
      const page = searchParam.get("page") || "1";
      const response = await adminServices.getPelanggaran(page);
      return response.data;
    },
  });

  // `unitKerja`, `item` sekarang memiliki tipe yang benar secara otomatis
  const unitKerjaOptions =
      data?.filters?.unit_kerja?.map((unitKerja) => ({
        label: unitKerja.nama,
        value: String(unitKerja.id),
      })) || [];

  const jabatanFungsionalOptions =
      data?.filters?.jabatan_fungsional?.map((item) => ({
        label: item.nama,
        value: String(item.id),
      })) || [];

  const jabatanPelanggaranOptions =
      data?.filters?.jenis_pelanggaran?.map((item) => ({
        label: item.nama,
        value: String(item.id),
      })) || [];

  useEffect(() => {
    if (!searchParam.get("page")) {
      searchParam.set("page", "1");
      setSearchParam(searchParam);
    }
  }, [searchParam, setSearchParam]);

  useEffect(() => {
    if (Number(searchParam.get("page")) < 1) {
      searchParam.set("page", "1");
      setSearchParam(searchParam);
    }
  }, [searchParam, setSearchParam]);

  useEffect(() => {
    if (
        data?.last_page &&
        Number(searchParam.get("page")) > data.last_page &&
        data.last_page > 0
    ) {
      searchParam.set("page", data.last_page.toString());
      setSearchParam(searchParam);
    }
  }, [searchParam, data, setSearchParam]);

  return (
      <div className="mt-10 mb-20">
        <h1 className="text-lg sm:text-2xl font-normal">
          Riwayat Pelanggaran{" "}
          <span className="text-muted-foreground font-normal text-[12px] sm:text-[16px]">
          Daftar Pelanggaran
        </span>
        </h1>

        <CustomCard
            actions={
              <div className="grid grid-rows-3 lg:grid-rows-2 grid-flow-col gap-5 lg:gap-10">
                <div className="flex flex-col sm:flex-row">
                  <Label className="w-full text-[#FDA31A]">Unit Kerja</Label>
                  <SelectFilter
                      classname="w-full md:w-80"
                      options={unitKerjaOptions}
                      placeholder="--Semua Pengajuan--"
                  />
                </div>
                <div className="flex flex-col sm:flex-row">
                  <Label className="w-full text-[#FDA31A]">Jenis Pelanggaran</Label>
                  <SelectFilter
                      classname="w-full md:w-80"
                      options={jabatanPelanggaranOptions}
                      placeholder="--Semua Pengajuan--"
                  />
                </div>
                <div className="flex flex-col sm:flex-row">
                  <Label className="w-full text-[#FDA31A]">
                    Jabatan Fungsional
                  </Label>
                  <SelectFilter
                      classname="w-full md:w-80"
                      options={jabatanFungsionalOptions}
                      placeholder="--Semua Pengajuan--"
                  />
                </div>
              </div>
            }
        />

        <div className="w-full flex flex-col lg:flex-row justify-between mt-6">
          <div className="w-full grid sm:grid-cols-2 gap-4 lg:flex lg:w-full">
            <div className="w-full lg:w-32">
              <Select>
                <SelectTrigger className="w-full lg:w-32 text-xs sm:text-sm">
                  <SelectValue placeholder="--Semua--" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Unit Kerja</SelectLabel>
                    {unitKerjaOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="w-full relative lg:w-90">
              <FiSearch className="absolute top-1/2 -translate-y-1/2 right-2" />
              <Input
                  placeholder="Search"
                  className="w-full pr-8 lg:w-90 text-xs sm:text-sm"
              />
            </div>
          </div>

          <div className="w-full grid sm:grid-cols-2 gap-4 mt-4 lg:mt-0 lg:flex lg:w-auto">
            <div className="w-full lg:w-auto">
              <Link to="/admin/operasional/kompensasi/detail-riwayat-pelanggaran">
                <Button className="cursor-pointer bg-green-light-uika hover:bg-[#329C59] w-full lg:w-auto text-xs sm:text-sm">
                  <FaPlus /> Tambah
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {isLoading ? (
            <div className="mt-10 space-y-4">
              <Skeleton className="h-12 w-full" />
              {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-10 w-full" />
              ))}
            </div>
        ) : (
            <>
              <Table className="mt-10 table-auto">
                <TableHeader>
                  <TableRow className="bg-gray-100">
                    <TableHead className="text-center"></TableHead>
                    <TableHead className="text-center text-xs sm:text-sm">
                      Nama Pegawai
                    </TableHead>
                    <TableHead className="text-center text-xs sm:text-sm">
                      Tanggal Pelanggaran
                    </TableHead>
                    <TableHead className="text-center text-xs sm:text-sm">
                      Jenis Pelanggaran
                    </TableHead>
                    <TableHead className="text-center text-xs sm:text-sm">
                      Aksi
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="divide-y divide-gray-200">
                  {data?.data?.data?.map((item) => (
                      <TableRow key={item.id} className=" even:bg-gray-100">
                        <TableCell className="text-center">
                          <Checkbox className="bg-gray-100 border-gray-300 data-[state=checked]:bg-green-light-uika data-[state=checked]:border-green-light-uika cursor-pointer" />
                        </TableCell>
                        <TableCell className="text-center text-xs sm:text-sm">
                          {item.nama_pegawai}
                        </TableCell>
                        <TableCell className="text-center text-xs sm:text-sm">
                          {item.tgl_pelanggaran_formatted}
                        </TableCell>
                        <TableCell className="text-center text-xs sm:text-sm">
                          {item.jenis_pelanggaran}
                        </TableCell>
                        <TableCell className="h-full">
                          <div className="flex justify-center items-center w-full h-full">
                            <Link
                                to={
                                    "/admin/operasional/kompensasi/detail-data-pelanggaran/" +
                                    item.id
                                }
                            >
                              <Button
                                  size="icon"
                                  variant="ghost"
                                  className="cursor-pointer"
                              >
                                <IoEyeOutline className="w-5! h-5! text-[#26A1F4]" />
                              </Button>
                            </Link>

                            <Link
                                to={
                                    "/admin/operasional/kompensasi/edit-data-pelanggaran/" +
                                    item.id
                                }
                            >
                              <Button
                                  size="icon"
                                  variant="ghost"
                                  className="cursor-pointer"
                              >
                                <MdEdit className="w-5! h-5! text-[#26A1F4]" />
                              </Button>
                            </Link>

                            <Button
                                size="icon"
                                variant="ghost"
                                className="cursor-pointer"
                            >
                              <FaRegTrashAlt className="w-4! h-4! text-red-500" />
                            </Button>
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
      </div>
  );
};

export default Pelanggaran;
