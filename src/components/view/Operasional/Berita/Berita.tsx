import CustomCard from "@/components/blocks/Card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IoClose, IoEyeOutline } from "react-icons/io5";
import { Link, useSearchParams } from "react-router-dom";
import SelectFilter from "@/components/blocks/SelectFilter";
import SearchInput from "@/components/blocks/SearchInput";
import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "use-debounce";
import { useQuery } from "@tanstack/react-query";
import dosenServices from "@/services/dosen.services";
import CustomPagination from "@/components/blocks/CustomPagination";
import { FaCheck } from "react-icons/fa";
import { BeritaParams } from "@/types";

const Berita = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const [searchData, setSearchData] = useState(searchParam.get("search") || "");
  const [debouncedInput] = useDebounce(searchData, 500);

  // get data
  const { data, isLoading } = useQuery({
    queryKey: [
      "berita-user",
      searchParam.get("page"),
      searchParam.get("search"),
      searchParam.get("unit_kerja"),
    ],
    queryFn: async () => {
      // Kumpulkan semua parameter ke dalam satu objek
      const params: BeritaParams = {
        page: searchParam.get("page"),
        search: searchParam.get("search") ?? undefined, // Konversi null -> undefined
        unit_kerja: searchParam.get("unit_kerja") ?? undefined, // Konversi null -> undefined
      };

      // Kirim satu objek tersebut ke service
      const response = await dosenServices.getDataBeritaUser(params);
      return response.data;
    },
  });

  console.log("Struktur data dari useQuery:", data);

  const unitKerjaOptions = useMemo(() => {
    if (!data?.filter_options?.unit_kerja) {
      return [{ label: "Memuat...", value: "" }];
    }
    return data.filter_options.unit_kerja.map((item: any) => ({
      label: item.nama,
      value: item.id,
    }));
  }, [data]);

  const handleUnitKerjaChange = (value: string) => {
    const newSearchParam = new URLSearchParams(searchParam);
    if (value && value !== "semua") {
      newSearchParam.set("unit_kerja", value);
    } else {
      newSearchParam.delete("unit_kerja");
    }
    newSearchParam.set("page", "1"); // Reset ke halaman 1 setiap kali filter berubah
    setSearchParam(newSearchParam);
  };

  useEffect(() => {
    const newSearchParam = new URLSearchParams(searchParam);

    if (debouncedInput.length > 3) { // UBAH: biarkan search berjalan walau kurang dari 3 char
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

  return (
    <div className="mt-10 mb-20">
      <h1 className="text-2xl font-normal">
        Berita{" "}
        <span className="text-[16px] text-muted-foreground font-normal">
          Daftar Berita
        </span>
      </h1>

      <CustomCard
        actions={
          <div className="flex flex-col md:flex-row justify-start gap-4">
            <Label className=" text-[#FDA31A] md:pr-30">Unit Kerja</Label>
            <SelectFilter
              placeholder="Pilih Unit Kerja"
              classname="w-full md:w-80"
              options={unitKerjaOptions}
              value={searchParam.get("unit_kerja") || "semua"}
              onValueChange={handleUnitKerjaChange}
            />
          </div>
        }
      />

      <CustomCard
        cardStyle="border-t-[#87E39B]"
        actions={
          <div>
            <div className="flex justify-between flex-col min-[870px]:flex-row gap-4">
              <div className="flex gap-2 order-2 w-full md:w-auto">
                <div className="flex gap-2 flex-col md:flex-row w-full md:w-auto">

                  <SearchInput
                    value={searchData}
                    onChange={(e) => setSearchData(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        }
      >
        <Table className="mt-10 table-auto text-xs lg:text-sm">
          <TableHeader>
            <TableRow className="bg-[#002E5A] ">
              <TableHead className="text-center text-white">
                Unit Kerja
              </TableHead>
              <TableHead className="text-center text-white">Judul</TableHead>
              <TableHead className="text-center text-white">
                Tgl.Posting
              </TableHead>
              <TableHead className="text-center text-white">
                Tgl.Expired
              </TableHead>
              <TableHead className="text-center text-white">
                Prioritas
              </TableHead>
              <TableHead className="text-center text-white">Aksi</TableHead>
            </TableRow>
          </TableHeader>


          <TableBody className="divide-y divide-gray-200">
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">Memuat data...</TableCell>
              </TableRow>
            ) : data?.data?.data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">Data tidak ditemukan.</TableCell>
              </TableRow>
            ) : (
              data?.data.data.map((item: any) => (
                <TableRow key={item.id} className=" even:bg-gray-100">
                  <TableCell className="text-center">
                    <TableCell className="text-center">
                      {item.unit_kerja_id.join(", ")}
                    </TableCell>
                  </TableCell>
                  <TableCell className="text-center">{item.judul}</TableCell>
                  <TableCell className="text-center">
                    {item.tgl_posting_formatted}
                  </TableCell>
                  <TableCell className="text-center">
                    {item.tgl_expired_formatted}
                  </TableCell>
                  <TableCell className="text-center flex justify-center mt-2">
                    {item.prioritas ? (
                      <FaCheck className="text-green-500 w-5! h-5!" />
                    ) : (
                      <IoClose className="text-red-500 w-5! h-5!" />
                    )}
                  </TableCell>
                  <TableCell className="h-full">
                    <div className="flex justify-center items-center w-full h-full">
                      <Link to={"/operasional/detail-berita/" + item.id}>
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
      </CustomCard>
    </div>
  );
};

export default Berita;
