import { Link, useSearchParams } from "react-router-dom";
import CustomCard from "@/components/blocks/Card";
import Title from "@/components/blocks/Title";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FaPlus } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import SearchInput from "@/components/blocks/SearchInput";
import unitKerjaOptions from "@/constant/dummyFilter";
import SelectFilter from "@/components/blocks/SelectFilter";
import InfoList from "@/components/blocks/InfoList";
import { useQuery } from "@tanstack/react-query";
import dosenServices from "@/services/dosen.services";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { format } from "date-fns";
import CustomPagination from "@/components/blocks/CustomPagination";

const Tes = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const [searchData, setSearchData] = useState(searchParam.get("search") || "");
  const [debouncedInput] = useDebounce(searchData, 500);

  // get data
  const { data } = useQuery({
    queryKey: [
      "kompetensi-tes-dosen",
      searchParam.get("page"),
      searchParam.get("search"),
    ],
    queryFn: async () => {
      const response = await dosenServices.getDataTesDosen(
        searchParam.get("page")
      );
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
      <Title title="Tes" subTitle="Riwayat Tes" />
      <CustomCard
        actions={
          <div className="flex justify-end">
            <Link to="/data-riwayat/kompetensi/detail-tes">
              <Button className="bg-[#FDA31A] text-xs md:text-sm hover:bg-[#F9A31A]">
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

      <div className="gap-5 flex flex-col md:flex-row mt-5">
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

      <Table className="mt-10 table-auto text-xs lg:text-sm">
        <TableHeader>
          <TableRow className="bg-[#E7ECF2] ">
            <TableHead className="text-center text-black">Nama Tes</TableHead>
            <TableHead className="text-center text-black">Skor Tes</TableHead>
            <TableHead className="text-center text-black">Jenis Tes</TableHead>
            <TableHead className="text-center text-black">
              Penyelenggara
            </TableHead>
            <TableHead className="text-center text-black">
              Tanggal Tes
            </TableHead>
            <TableHead className="text-center text-black">
              Status Pengajuan
            </TableHead>
            <TableHead className="text-center text-black">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-gray-200">
          {data?.data.data.map((item: any) => (
            <TableRow className=" even:bg-[#E7ECF2]">
              <TableCell className="text-center">{item.nama_tes}</TableCell>
              <TableCell className="text-center">{item.skor}</TableCell>
              <TableCell className="text-center">{item.jenis_tes}</TableCell>
              <TableCell className="text-center">
                {item.penyelenggara}
              </TableCell>
              <TableCell className="text-center">
                {formatDate(item.tgl_tes)}
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
                  <Link
                    to={`/data-riwayat/kompetensi/detail-data-tes/${item.id}`}
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

export default Tes;
