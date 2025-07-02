import CustomCard from "@/components/blocks/Card";
import Title from "@/components/blocks/Title";
import { Button } from "@/components/ui/button";
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
import InfoList from "@/components/blocks/InfoList";
import { FaPlus } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { useQuery } from "@tanstack/react-query";
import dosenServices from "@/services/dosen.services";
import CustomPagination from "@/components/blocks/CustomPagination";
import SearchInput from "@/components/blocks/SearchInput";
import { format } from "date-fns";

const Penghargaan = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const [searchData, setSearchData] = useState(searchParam.get("search") || "");
  const [debouncedInput] = useDebounce(searchData, 500);

  const { data, isLoading } = useQuery({
    queryKey: [
      "penghargaan-dosen-penunjang",
      searchParam.get("page"),
      searchParam.get("search"),
    ],
    queryFn: async () => {
      const search = searchParam.get("search") || "";
      const response = await dosenServices.getPenghargaan(
        searchParam.get("page"),
        search
      );
      console.log(response.data);
      return response.data;
    },
  });

  const infoItems = isLoading
    ? [
        { label: "NIP", value: "Memuat..." },
        { label: "Nama", value: "Memuat..." },
        { label: "Unit Kerja", value: "Memuat..." },
        { label: "Status", value: "Memuat..." },
        { label: "Jab. Akademik", value: "Memuat..." },
        { label: "Jab. Fungsional", value: "Memuat..." },
        { label: "Jab. Struktural", value: "Memuat..." },
        { label: "Pendidikan", value: "Memuat..." },
      ]
    : [
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
      ];

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
      <Title title="Penghargaan" subTitle="Daftar Penghargaan" />
      <CustomCard
        actions={
          <div className="flex justify-end">
            <Link to="/data-riwayat/penunjang/detail-penghargaan">
              <Button className="bg-yellow-uika hover:bg-hover-yellow-uika w-full sm:auto">
                <FaPlus /> Tambah Baru
              </Button>
            </Link>
          </div>
        }
      />
      <InfoList items={infoItems} />
      <div className="gap-5 w-full flex flex-col sm:flex-row mt-5">
        <Select>
          <SelectTrigger className="w-full sm:w-32">
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
          className="w-full md:w-1/2"
        />
      </div>
      <Table className="mt-10 table-auto">
        <TableHeader>
          <TableRow className="bg-gray-300 ">
            <TableHead className="text-center text-black text-xs sm:text-sm">
              No
            </TableHead>
            <TableHead className="text-center text-black text-xs sm:text-sm">
              Nama Penghargaan
            </TableHead>
            <TableHead className="text-center text-black text-xs sm:text-sm">
              Instansi
            </TableHead>
            <TableHead className="text-center text-black text-xs sm:text-sm">
              Tgl. Penghargaan
            </TableHead>
            <TableHead className="text-center text-black text-xs sm:text-sm">
              No Sk
            </TableHead>
            <TableHead className="text-center text-black text-xs sm:text-sm">
              Status Pengajuan
            </TableHead>
            <TableHead className="text-center text-black text-xs sm:text-sm">
              Aksi
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-gray-200">
          {/* ✨ 3. Tambahkan kondisi untuk loading, data kosong, dan data ada */}
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-10">
                Memuat data...
              </TableCell>
            </TableRow>
          ) : !data?.data?.data || data.data.data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-10">
                Data tidak ditemukan.
              </TableCell>
            </TableRow>
          ) : (
            data.data.data.map((item: any, index: any) => (
              <TableRow key={item.id} className=" even:bg-gray-100">
                <TableCell className="text-center text-xs sm:text-sm">
                  {index + 1}
                </TableCell>
                <TableCell className="text-center text-xs sm:text-sm">
                  {item.nama_penghargaan}
                </TableCell>
                <TableCell className="text-center text-xs sm:text-sm">
                  {item.instansi_pemberi}
                </TableCell>
                <TableCell className="text-center text-xs sm:text-sm">
                  {format(item.tanggal_penghargaan, "dd MMMM yyyy")}
                </TableCell>
                <TableCell className="text-center text-xs sm:text-sm">
                  {item.no_sk}
                </TableCell>
                <TableCell className="text-center text-xs sm:text-sm">
                  {
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
                  }
                </TableCell>
                <TableCell className="h-full">
                  <div className="flex justify-center items-center w-full h-full">
                    <Link
                      to={
                        "/data-riwayat/penunjang/detail-data-penghargaan/" +
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
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
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

export default Penghargaan;
