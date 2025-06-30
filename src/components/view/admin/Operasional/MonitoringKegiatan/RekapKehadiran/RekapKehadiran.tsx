import CustomCard from "@/components/blocks/Card";
import { Button } from "@/components/ui/button";
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
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { useQuery } from "@tanstack/react-query";
import dosenServices from "@/services/dosen.services";
import CustomPagination from "@/components/blocks/CustomPagination";
import SearchInput from "@/components/blocks/SearchInput";

const RekapKehadiran = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const [searchData, setSearchData] = useState(searchParam.get("search") || "");
  const [debouncedInput] = useDebounce(searchData, 500);

  // get data
  const { data } = useQuery({
    queryKey: [
      "monitoring-kegiatan",
      searchParam.get("page"),
      searchParam.get("search"),
    ],
    queryFn: async () => {
      const search = searchParam.get("search") || "";
      const response = await dosenServices.getDataMonitoringKegiatan(
        searchParam.get("page"),
        search
      );
      console.log(response.data);
      return response.data;
    },
  });

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
      <h1 className="text-lg sm:text-2xl font-normal">Monitoring Kegiatan</h1>
      <CustomCard
        actions={
          <div className="grid grid-rows-2 lg:grid-cols-2 grid-flow-col gap-5">
            <div className="grid grid-rows-2 sm:flex">
              <Label className="w-full text-[#FDA31A] text-xs sm:text-sm">
                Unit Kerja
              </Label>
              <Select>
                <SelectTrigger className="w-full text-xs sm:text-sm">
                  <SelectValue placeholder="041001 - Universitas Ibn Khaldun" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Unit Kerja</SelectLabel>
                    {data?.filter_options?.unit_kerja.map((unit: any) => (
                      <SelectItem key={unit.id} value={unit.value}>
                        {unit.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-rows-2 sm:flex">
              <Label className="w-full text-[#FDA31A] text-xs sm:text-sm">
                Tanggal Akhir
              </Label>
              <Input type="date" />
            </div>
          </div>
        }
      />

      <div className="grid grid-rows-2 sm:flex gap-4 w-full mt-5 mb-10">
        <Select>
          <SelectTrigger className="w-full sm:w-32 text-xs sm:text-sm">
            <SelectValue placeholder="--Semua--" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Unit Kerja</SelectLabel>
              {data?.filter_options?.unit_kerja.map((unit: any) => (
                <SelectItem key={unit.id} value={unit.value}>
                  {unit.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <SearchInput
          value={searchData}
          onChange={(e) => setSearchData(e.target.value)}
        />
      </div>

      <Table className="mt-10 table-auto">
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="text-center text-xs sm:text-sm">
              NIP
            </TableHead>
            <TableHead className="text-center text-xs sm:text-sm">
              Nama Pegawai
            </TableHead>
            <TableHead className="text-center text-xs sm:text-sm">
              Jam Masuk
            </TableHead>
            <TableHead className="text-center text-xs sm:text-sm">
              Jam Keluar
            </TableHead>
            <TableHead className="text-center max-w-40 text-xs sm:text-sm">
              Rencana Pekerjaan
            </TableHead>
            <TableHead className="text-center max-w-40 text-xs sm:text-sm">
              Realisasi Pekerjaan
            </TableHead>
            <TableHead className="text-center text-xs sm:text-sm">
              File
            </TableHead>
            <TableHead className="text-center text-xs sm:text-sm">
              Foto Masuk
            </TableHead>
            <TableHead className="text-center text-xs sm:text-sm">
              Foto Keluar
            </TableHead>
            <TableHead className="text-center text-xs sm:text-sm">
              Status
            </TableHead>
            <TableHead className="text-center text-xs sm:text-sm">
              Valid?
            </TableHead>
            <TableHead className="text-center text-xs sm:text-sm">
              Aksi
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-gray-200">
          {data?.data?.length > 0 ? (
            data?.data.map((item: any) => (
              <TableRow key={item.nip} className=" even:bg-gray-100">
                <TableCell className="text-center align-top text-xs sm:text-sm">
                  {item.nip}
                </TableCell>
                <TableCell className="text-center align-top text-xs sm:text-sm">
                  {item.nama_pegawai}
                </TableCell>
                <TableCell className="whitespace-normal break-words max-w-20 align-top text-xs sm:text-sm">
                  {item.detail.jam_masuk}
                </TableCell>
                <TableCell className="whitespace-normal break-words max-w-20 align-top text-xs sm:text-sm">
                  {item.detail.jam_keluar || "-"}
                </TableCell>
                <TableCell className="whitespace-normal break-words max-w-40 align-top text-xs sm:text-sm">
                  {item.detail.rencana_pekerjaan}
                </TableCell>
                <TableCell className="whitespace-normal break-words max-w-40 align-top text-xs sm:text-sm">
                  {item.realisasi_pekerjaan}
                </TableCell>
                <TableCell className="h-full align-top text-center">
                  {item.file ? (
                    <a
                      href={item.file}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Lihat
                    </a>
                  ) : (
                    "-"
                  )}
                </TableCell>
                <TableCell className="h-full align-top text-center">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        className="text-blue-500 hover:text-blue-500 cursor-pointer"
                        disabled={!item.foto_masuk}
                      >
                        Lihat
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Foto Masuk</AlertDialogTitle>
                        <AlertDialogDescription>
                          <img
                            src={item.foto_masuk}
                            alt="Foto Masuk"
                            className="w-full h-auto"
                          />
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Tutup</AlertDialogCancel>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
                <TableCell className="h-full align-top text-center">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        className="text-blue-500 hover:text-blue-500 cursor-pointer"
                        disabled={!item.foto_keluar}
                      >
                        Lihat
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Foto Keluar</AlertDialogTitle>
                        <AlertDialogDescription>
                          <img
                            src={item.foto_keluar}
                            alt="Foto Keluar"
                            className="w-full h-auto"
                          />
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Tutup</AlertDialogCancel>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
                <TableCell
                  className={`h-full align-top text-center text-${item.status_color}-500`}
                >
                  {item.status}
                </TableCell>
                <TableCell
                  className={`h-full align-top text-center ${
                    item.valid ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {item.valid ? "✓" : "x"}
                </TableCell>
                <TableCell className="h-full align-top text-center">
                  <Button
                    variant="ghost"
                    className="text-blue-500 hover:text-blue-500 cursor-pointer"
                    onClick={() =>
                      window.open(item.actions.detail.url, "_blank")
                    }
                  ></Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={12}
                className="text-center text-gray-500 py-4"
              >
                Tidak ada data yang tersedia
              </TableCell>
            </TableRow>
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

export default RekapKehadiran;
