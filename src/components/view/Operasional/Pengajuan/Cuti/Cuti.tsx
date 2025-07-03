import CustomCard from "@/components/blocks/Card";
import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa6";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link, useSearchParams } from "react-router-dom";
import { IoEyeOutline } from "react-icons/io5";
import { IoIosDocument } from "react-icons/io";
import InfoList from "@/components/blocks/InfoList";
import Title from "@/components/blocks/Title";
import SelectFilter from "@/components/blocks/SelectFilter";
import SearchInput from "@/components/blocks/SearchInput";
import { useQuery } from "@tanstack/react-query";
import dosenServices from "@/services/dosen.services";
import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "use-debounce";
import CustomPagination from "@/components/blocks/CustomPagination";
import { format } from "date-fns";
import { CutiParams } from "@/types";

const Cuti = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const [searchData, setSearchData] = useState(searchParam.get("search") || "");
  const [debouncedInput] = useDebounce(searchData, 500);

  // get data - dengan semua filter ditambahkan
  const { data, isLoading } = useQuery({
    queryKey: [
      "pengajuan-cuti-dosen",
      searchParam.get("page"),
      searchParam.get("search"),
      searchParam.get("jenis_cuti"),      // Filter baru
      searchParam.get("jumlah_cuti"),     // Filter baru
      searchParam.get("status_pengajuan"),// Filter baru
    ],
    queryFn: async () => {
      const params: CutiParams = {
        page: searchParam.get("page"),
        search: searchParam.get("search"),
        jenis_cuti: searchParam.get("jenis_cuti"),
        jumlah_cuti: searchParam.get("jumlah_cuti"),
        status_pengajuan: searchParam.get("status_pengajuan"),
      };
      const response = await dosenServices.getDataCuti(params);
      return response.data;
    },
  });

  console.log(data);

  const jenisCutiOptions = useMemo(() => {
    const options = data?.filter_options?.jenis_cuti?.map((item: any) => ({
      label: item.nama,
      value: item.id.toString(),
    })) || [];
    return [{ label: "Semua Jenis Cuti", value: "semua" }, ...options];
  }, [data]);

  const jumlahCutiOptions = useMemo(() => {
    const options = data?.filter_options?.jumlah_cuti?.map((item: number) => ({
      label: `${item} hari`,
      value: item.toString(),
    })) || [];
    return [{ label: "Semua Jumlah Cuti", value: "semua" }, ...options];
  }, [data]);

  const statusPengajuanOptions = useMemo(() => {
    return data?.filter_options?.status_pengajuan?.map((item: any) => ({
      label: item.nama,
      value: item.id,
    })) || [];
  }, [data]);

  const handleFilterChange = (filterName: string, value: string) => {
    const newSearchParam = new URLSearchParams(searchParam);
    if (value && value !== "semua") {
      newSearchParam.set(filterName, value);
    } else {
      newSearchParam.delete(filterName);
    }
    newSearchParam.set("page", "1");
    setSearchParam(newSearchParam);
  };

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return "-";
    try {
      return format(new Date(dateString), "dd MMMM yyyy");
    } catch (error) {
      return "Tanggal tidak valid";
    }
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
      <Title title="Cuti" subTitle="Daftar Pengajuan Cuti" />

      <CustomCard
        actions={
          <div className="flex justify-end">
            <Link to="/operasional/pengajuan/tambah-cuti">
              <Button className="bg-[#FDA31A] text-xs md:text-sm">
                <FaPlus className="mr-2" /> Tambah Baru
              </Button>
            </Link>
          </div>
        }
      >
        <InfoList
          items={[
            { label: "NIP", value: data?.pegawai_info.nip },
            { label: "Nama", value: data?.pegawai_info.nama },
            { label: "Unit Kerja", value: data?.pegawai_info.unit_kerja },
            { label: "Status", value: data?.pegawai_info.status },
            { label: "Jab. Akademik", value: data?.pegawai_info.jab_akademik },
            {
              label: "Jab. Fungsional",
              value: data?.pegawai_info.jab_fungsional,
            },
            {
              label: "Jab. Struktural",
              value: data?.pegawai_info.jab_struktural,
            },
            { label: "Pendidikan", value: data?.pegawai_info.pendidikan },
          ]}
        />
      </CustomCard>

      {/* Filter */}
      <CustomCard
        actions={
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex gap-4 min-[864px]:flex-row flex-col">
              <Label className="text-[#FDA31A] md:w-60 text-xs md:text-sm">
                Jumlah Cuti
              </Label>
              <SelectFilter classname="w-full" placeholder="Pilih Jumlah"
                value={searchParam.get("jumlah_cuti") || "semua"}
                options={jumlahCutiOptions}
                onValueChange={(value) => handleFilterChange("jumlah_cuti", value)}
              />
            </div>
            <div className="flex gap-4 min-[864px]:flex-row flex-col">
              <Label className="text-[#FDA31A] md:w-60 text-xs md:text-sm">
                Status Pengajuan
              </Label>
              <SelectFilter classname="w-full" placeholder="Pilih Status"
                value={searchParam.get("status_pengajuan") || "semua"}
                options={statusPengajuanOptions}
                onValueChange={(value) => handleFilterChange("status_pengajuan", value)}
              />
            </div>
            <div className="flex gap-4 min-[864px]:flex-row flex-col">
              <Label className="text-[#FDA31A] md:w-60 text-xs md:text-sm">
                Jenis Cuti
              </Label>
              <SelectFilter classname="w-full" placeholder="Pilih Jenis"
                value={searchParam.get("jenis_cuti") || "semua"}
                options={jenisCutiOptions}
                onValueChange={(value) => handleFilterChange("jenis_cuti", value)} />
            </div>
          </div>
        }
      />

      <div className="flex mt-4 flex-col min-[864px]:flex-row justify-between gap-5 mb-5">
        <div className="flex gap-2 flex-col md:flex-row w-full md:w-auto order-2 md:order-1">
          <SearchInput
            value={searchData}
            onChange={(e) => setSearchData(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <Table className="mt-6 table-auto text-xs lg:text-sm">
        <TableHeader>
          <TableRow className="bg-[#002E5A]">
            {data?.table_columns.map((column: any) => (
              <TableHead className="text-center text-white">
                {column.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-gray-200">
          {isLoading ? (
            <TableRow><TableCell colSpan={8} className="text-center h-24">Memuat data...</TableCell></TableRow>
          ) : data?.data?.data?.length === 0 ? (
            <TableRow><TableCell colSpan={8} className="text-center h-24">Data tidak ditemukan.</TableCell></TableRow>
          ) : (
            data?.data.data.map((item: any) => (
              <TableRow className="even:bg-gray-100">
                <TableCell className="text-center">{item.no_urut_cuti}</TableCell>
                <TableCell className="text-center">{item.jenis_cuti}</TableCell>
                <TableCell className="text-center">
                  {formatDate(item.tgl_mulai)}
                </TableCell>
                <TableCell className="text-center">
                  {formatDate(item.tgl_selesai)}
                </TableCell>
                <TableCell className="text-center">
                  {item.jumlah_cuti ? `${item.jumlah_cuti} hari` : "-"}
                </TableCell>
                <TableCell className="text-center">{item.alasan_cuti}</TableCell>
                <TableCell className="text-center">
                  <Button
                    size="sm"
                    className={`w-full text-xs lg:text-sm text-black
                                  ${item.status_pengajuan === "draf"
                        ? "bg-[#C4C4C4]/65 hover:bg-[#C4C4C4]/65"
                        : item.status_pengajuan === "diajukan"
                          ? "bg-[#FFC951]/50 hover:bg-[#FFC951]/50"
                          : item.status_pengajuan === "disetujui"
                            ? "bg-[#0EE03C]/50 hover:bg-[#0EE03C]/50"
                            : item.status_pengajuan === "ditolak"
                              ? "bg-red-500 hover:bg-red-500"
                              : "bg-slate-300 hover:bg-slate-300"
                      }
                                `}
                  >
                    {item.status_pengajuan}
                  </Button>
                </TableCell>
                <TableCell>
                  <div className="flex justify-center items-center gap-2">
                    <Link to={"/operasional/pengajuan/detail-cuti/" + item.id}>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="cursor-pointer"
                      >
                        <IoEyeOutline className="w-5 h-5 text-[#26A1F4]" />
                      </Button>
                    </Link>
                    <Link to="/admin/operasional/kompensasi/detail-dokumen-internal">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="cursor-pointer"
                      >
                        <IoIosDocument className="w-5 h-5 text-[#26A1F4]" />
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
    </div>
  );
};

export default Cuti;
