import CustomCard from "@/components/blocks/Card";
import InfoList from "@/components/blocks/InfoList";
import SearchInput from "@/components/blocks/SearchInput";
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
import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import CustomPagination from "@/components/blocks/CustomPagination";
import { useQuery } from "@tanstack/react-query";
import dosenServices from "@/services/dosen.services";

const PendidikanFormal = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const [searchData, setSearchData] = useState(searchParam.get("search") || "");
  const [debouncedInput] = useDebounce(searchData, 500);

  // Filters state can be added here if needed, based on the `filters` from the API response
  // For example:
  // const [statusFilter, setStatusFilter] = useState(searchParam.get("status") || "semua");
  // const [jenjangFilter, setJenjangFilter] = useState(searchParam.get("jenjang") || "semua");

  // get data
  const { data } = useQuery({
    queryKey: [
      "pendidikan-formal-dosen",
      searchParam.get("page"),
      searchParam.get("search"),
      // Add other filters to the queryKey to ensure re-fetching when they change
      // searchParam.get("status"),
      // searchParam.get("jenjang"),
    ],
    queryFn: async () => {
      const page = searchParam.get("page") || "1";
      const search = searchParam.get("search") || "";
      // Pass other filters to the service function
      const response = await dosenServices.getDataPendidikanFormalUser(
        page,
        search
        // statusFilter,
        // jenjangFilter
      );
      return response.data;
    },
  });


  useEffect(() => {
    const newSearchParam = new URLSearchParams(searchParam);

    if (debouncedInput.length > 3) {
      newSearchParam.set("search", debouncedInput);
      newSearchParam.set("page", "1");
    } else if (debouncedInput.length === 0) {
      newSearchParam.delete("search");
    }

    if (searchParam.toString() !== newSearchParam.toString()) {
      setSearchParam(newSearchParam);
    }
  }, [debouncedInput, searchParam, setSearchParam]);

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
      <Title title="Pendidikan Formal" subTitle="Daftar Pendidikan Formal" />

      <CustomCard
        actions={
          <div className="flex justify-end">
            <Link to="/data-riwayat/kualifikasi/detail-pendidikan-formal">
              <Button className="bg-[#FDA31A] text-xs md:text-sm hover:bg-[#F9A31A]">
                <FaPlus className="mr-2" /> Tambah Baru
              </Button>
            </Link>
          </div>
        }
      />

      {/* Display employee info only if available */}
      {data?.pegawai_info && (
        <InfoList
          items={[
            { label: "NIP", value: data.pegawai_info.nip },
            { label: "Nama", value: data.pegawai_info.nama },
            { label: "Unit Kerja", value: data.pegawai_info.unit_kerja },
            { label: "Status", value: data.pegawai_info.status },
            { label: "Jab. Akademik", value: data.pegawai_info.jab_akademik },
            {
              label: "Jab. Fungsional",
              value: data.pegawai_info.jab_fungsional,
            },
            {
              label: "Jab. Struktural",
              value: data.pegawai_info.jab_struktural,
            },
            { label: "Pendidikan", value: data.pegawai_info.pendidikan },
          ]}
        />
      )}

      <div className="gap-5 flex flex-col md:flex-row mt-5">
        <SearchInput
          value={searchData}
          onChange={(e) => setSearchData(e.target.value)}
          className="w-full"
        />
      </div>

      <Table className="mt-10 table-auto text-xs lg:text-sm">
        <TableHeader>
          <TableRow className="bg-[#E7ECF2] ">
            <TableHead className="text-center text-black">No</TableHead>
            <TableHead className="text-center text-black">Jenjang</TableHead>
            <TableHead className="text-center text-black">Gelar</TableHead>
            <TableHead className="text-center text-black">
              Nama Institusi
            </TableHead>
            <TableHead className="text-center text-black">
              Tahun Lulus
            </TableHead>
            <TableHead className="text-center text-black">
              Status Pengajuan
            </TableHead>
            <TableHead className="text-center text-black">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-gray-200">
          {data?.data.data.map((item: any, index: any) => (
            <TableRow key={item.id} className="even:bg-gray-50">
              <TableCell className="text-center">{index + 1}</TableCell>
              <TableCell className="text-center">
                {item.jenjang_pendidikan}
              </TableCell>
              <TableCell className="text-center">
                {item.gelar_akademik}
              </TableCell>
              <TableCell className="text-center">
                {item.perguruan_tinggi}
              </TableCell>
              <TableCell className="text-center">{item.tahun_lulus}</TableCell>
              <TableCell className="text-center capitalize">
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
                    to={`/data-riwayat/kualifikasi/detail-data-pendidikan-formal/${item.id}`}
                  >
                    <Button
                      size="icon"
                      variant="ghost"
                      className="cursor-pointer"
                    >
                      <IoEyeOutline className="w-5 h-5 text-[#26A1F4]" />
                    </Button>
                  </Link>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {data && data.total > 0 && (
        <CustomPagination
          currentPage={Number(searchParam.get("page") || 1)}
          links={data.links || []}
          onPageChange={(page) => {
            const newSearchParam = new URLSearchParams(searchParam);
            newSearchParam.set("page", page.toString());
            setSearchParam(newSearchParam);
          }}
          hasNextPage={!!data.next_page_url}
          hasPrevPage={!!data.prev_page_url}
          totalPages={data.last_page}
        />
      )}
    </div>
  );
};

export default PendidikanFormal;
