import CustomCard from "@/components/blocks/Card";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SelectFilter from "@/components/blocks/SelectFilter";
import SearchInput from "@/components/blocks/SearchInput";
import { useEffect, useState } from "react";
import dosenServices from "@/services/dosen.services";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import CustomPagination from "@/components/blocks/CustomPagination";
import { FaCheck } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

/// DIUBAH: value diubah menjadi string
const opsiBulan = [
  { label: "Januari", value: "1" }, { label: "Februari", value: "2" },
  { label: "Maret", value: "3" }, { label: "April", value: "4" },
  { label: "Mei", value: "5" }, { label: "Juni", value: "6" },
  { label: "Juli", value: "7" }, { label: "Agustus", value: "8" },
  { label: "September", value: "9" }, { label: "Oktober", value: "10" },
  { label: "November", value: "11" }, { label: "Desember", value: "12" },
];

const generateOpsiTahun = () => {
  const tahunSekarang = new Date().getFullYear();
  const tahunMulai = 2005;
  const opsi = [];
  for (let tahun = tahunSekarang; tahun >= tahunMulai; tahun--) {
    // DIUBAH: value diubah menjadi string
    opsi.push({ label: String(tahun), value: String(tahun) });
  }
  return opsi;
};
const opsiTahun = generateOpsiTahun();

const KegiatanHarian = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const [searchData, setSearchData] = useState(searchParam.get("search") || "");
  const [debouncedInput] = useDebounce(searchData, 500);
  const bulan = searchParam.get("bulan") || (new Date().getMonth() + 1).toString();
  const tahun = searchParam.get("tahun") || (new Date().getFullYear()).toString();

  

  // get data
  const { data } = useQuery({
    queryKey: [
      "kegiatan-harian",
      searchParam.get("page"),
      searchParam.get("search"),
      searchParam.get("bulan"),
      searchParam.get("tahun"),
    ],
    queryFn: async () => {
      const search = searchParam.get("search") || "";
      const response = await dosenServices.getDataKegiatanHarian(
        searchParam.get("page"),
        search,
        Number(bulan), // <-- Kirim bulan
        Number(tahun)  // <-- Kirim tahun
      );
      console.log(response.data);
      return response.data;
    },
  });

  const handleFilterChange = (key: string, value: string) => {
    const newSearchParam = new URLSearchParams(searchParam);
    newSearchParam.set(key, value);
    newSearchParam.set("page", "1");
    setSearchParam(newSearchParam);
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
      <h1 className="text-2xl font-normal ">Kegiatan Harian</h1>

      <CustomCard
        actions={
          <div className="grid md:grid-rows-1 md:grid-flow-col grid-rows-2 gap-6">
            <div className="flex flex-col md:flex-row gap-4">
              <Label className="text-[#FDA31A]">Bulan</Label>
              <SelectFilter
                placeholder="Pilih Bulan"
                options={opsiBulan} // Sekarang sudah cocok tipenya
                value={bulan}
                onValueChange={(value: string) => handleFilterChange("bulan", value)}
              />
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <Label className="text-[#FDA31A]">Tahun</Label>
              <SelectFilter
                placeholder="Pilih Tahun"
                options={opsiTahun} // Sekarang sudah cocok tipenya
                value={tahun}
                onValueChange={(value: string) => handleFilterChange("tahun", value)}
              />
            </div>
          </div>
        }
      />

      <div className="flex flex-col sm:flex-row gap-4 mt-10 w-full">

        <SearchInput
          value={searchData}
          onChange={(e) => setSearchData(e.target.value)}
        />
      </div>

      <Table className="mt-10 table-auto text-xs lg:text-sm">
        <TableHeader>
          <TableRow className="bg-[#002E5A] ">
            <TableHead className="text-center text-white">
              Tgl Kehadiran
            </TableHead>
            <TableHead className="text-center text-white">Jam Masuk</TableHead>
            <TableHead className="text-center text-white">Jam Keluar</TableHead>
            <TableHead className="text-center text-white">Pekerjaan</TableHead>
            <TableHead className="text-center text-white">File</TableHead>
            <TableHead className="text-center text-white">Status</TableHead>
            <TableHead className="text-center text-white">Valid</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-gray-200">
          {data?.data.data.map((item: any) => (
            <TableRow key={item.id} className=" even:bg-gray-100">
              <TableCell className="text-center">
                {item.tgl_kehadiran}
              </TableCell>
              <TableCell className="text-center">{item.jam_masuk}</TableCell>
              <TableCell className="text-center">{item.jam_keluar}</TableCell>
              <TableCell className="text-center">
                {item.pekerjaan ? item.pekerjaan : "-"}
              </TableCell>
              <TableCell className="text-center">
                {item.file.nama_file
                  ? item.file.nama_file
                  : item.file.keterangan}
              </TableCell>
              <TableCell className="text-center">
                <Button
                  size="sm"
                  className={`w-full text-xs lg:text-sm text-black
                                  ${
                                    item.status.label === "Draf"
                                      ? "bg-[#C4C4C4]/65 hover:bg-[#C4C4C4]/65"
                                      : item.status.label === "diajukan"
                                      ? "bg-[#FFC951]/50 hover:bg-[#FFC951]/50"
                                      : item.status.label === "disetujui"
                                      ? "bg-[#0EE03C]/50 hover:bg-[#0EE03C]/50"
                                      : item.status.label === "ditolak"
                                      ? "bg-red-500 hover:bg-red-500"
                                      : "bg-slate-300 hover:bg-slate-300"
                                  }
                                `}
                >
                  {item.status.label}
                </Button>
              </TableCell>
              <TableCell className="text-center flex justify-center mt-2">
                {item.is_valid ? (
                  <FaCheck className="text-green-500 w-5! h-5!" />
                ) : (
                  <IoClose className="text-red-500 w-5! h-5!" />
                )}
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

export default KegiatanHarian;
