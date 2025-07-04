import CustomCard from "@/components/blocks/Card";
import InfoList from "@/components/blocks/InfoList";
import SearchInput from "@/components/blocks/SearchInput";
import SelectFilter from "@/components/blocks/SelectFilter";
import Title from "@/components/blocks/Title";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FaPlus } from "react-icons/fa";
import { IoIosDocument } from "react-icons/io";
import { IoEyeOutline } from "react-icons/io5";
import { Link, useSearchParams } from "react-router-dom";
import dosenServices from "@/services/dosen.services";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { format } from "date-fns";
import CustomPagination from "@/components/blocks/CustomPagination";

const Izin = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const [searchData, setSearchData] = useState(searchParam.get("search") || "");
  const [debouncedInput] = useDebounce(searchData, 500);

  // get data
  const { data } = useQuery({
    queryKey: [
      "pengajuan-izin-dosen",
      searchParam.get("page"),
      searchParam.get("search"),
    ],
    queryFn: async () => {
      const page = searchParam.get("page") || "1";
      const search = searchParam.get("search") || "";
      const response = await dosenServices.getDataIzin(page, search);
      console.log(response.data);
      return response.data;
    },
  });

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
      <Title title="Izin" subTitle="Daftar Permohonan Izin" />
      <CustomCard
        actions={
          <div className="flex justify-end ">
            <Link to="/operasional/pengajuan/tambah-izin">
              <Button className="bg-[#FDA31A] text-xs md:text-sm">
                <FaPlus /> Tambah Baru
              </Button>
            </Link>
          </div>
        }
      />
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
      <CustomCard
        actions={
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex gap-4 min-[864px]:flex-row flex-col">
              <Label className="text-[#FDA31A] md:w-60 text-xs md:text-sm">
                Unit Kerja
              </Label>
              <SelectFilter
                classname="w-full"
                placeholder="2025"
                options={[
                  { label: "Admin", value: "admin" },
                  { label: "User", value: "user" },
                  { label: "Guest", value: "guest" },
                ]}
              />
            </div>
            <div className="flex gap-4 min-[864px]:flex-row flex-col">
              <Label className="text-[#FDA31A] md:w-60 text-xs md:text-sm">
                Status
              </Label>
              <SelectFilter
                classname="w-full"
                placeholder="2025"
                options={[
                  { label: "Admin", value: "admin" },
                  { label: "User", value: "user" },
                  { label: "Guest", value: "guest" },
                ]}
              />
            </div>
            <div className="flex gap-4 min-[864px]:flex-row flex-col">
              <Label className="text-[#FDA31A] md:w-60 text-xs md:text-sm">
                Jenis Izin
              </Label>
              <SelectFilter
                classname="w-full"
                placeholder="2025"
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

      <div className="flex mt-4 flex-col min-[864px]:flex-row justify-between gap-5 mb-5">
        <div className="flex gap-2 flex-col md:flex-row w-full md:w-auto order-2 md:order-1">
          <SearchInput
            value={searchData}
            onChange={(e) => setSearchData(e.target.value)}
          />
        </div>
      </div>

      <Table className="mt-10 table-auto text-xs lg:text-sm">
        <TableHeader>
          <TableRow className="bg-[#002E5A] ">
            {data?.table_columns.map((column: any) => (
              <TableHead className="text-center text-white">
                {column.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-gray-200">
          {data?.data.data.map((item: any) => (
            <TableRow key={item.id} className=" even:bg-gray-100">
              <TableCell className="text-center">{item.no_izin}</TableCell>
              <TableCell className="text-center">
                {item.jenis_izin ? item.jenis_izin : "-"}
              </TableCell>
              <TableCell className="text-center">
                {formatDate(item.tgl_mulai)}
              </TableCell>
              <TableCell className="text-center">
                {formatDate(item.tgl_selesai)}
              </TableCell>
              <TableCell className="text-center">
                {item.jumlah_izin ? `${item.jumlah_izin} hari` : "-"}
              </TableCell>
              <TableCell className="text-center">
                {item.alasan_izin ? item.alasan_izin : "-"}
              </TableCell>
              <TableCell className="text-center">
                <Button
                  size="sm"
                  className={`w-full text-xs lg:text-sm text-black
                  ${
                    item.status_pengajuan === "draf"
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
              <TableCell className="h-full">
                <div className="flex justify-center items-center w-full h-full">
                  <Link to={"/operasional/pengajuan/detail-izin/" + item.id}>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="cursor-pointer"
                    >
                      <IoEyeOutline className="w-5! h-5! text-[#26A1F4]" />
                    </Button>
                  </Link>
                  <Link to="">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="cursor-pointer"
                    >
                      <IoIosDocument className="w-5! h-5! text-[#26A1F4]" />
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
    </div>
  );
};

export default Izin;
