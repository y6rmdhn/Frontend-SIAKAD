import CustomCard from "@/components/blocks/Card";
import SearchInput from "@/components/blocks/SearchInput";
import SelectFilter from "@/components/blocks/SelectFilter";
import Title from "@/components/blocks/Title";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
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
import { FaCheck, FaRegTrashAlt } from "react-icons/fa";
import { IoClose, IoEyeOutline } from "react-icons/io5";
import { parseISO, format } from "date-fns";
import CustomPagination from "@/components/blocks/CustomPagination";
import { useSearchParams } from "react-router-dom";

// Define interfaces for data structures
interface BeritaItem {
  id: string | number;
  judul: string;
  tgl_posting: string;
  tgl_expired: string;
  prioritas: boolean;
  unit_kerja_id: string[] | string;
  // Add other properties as needed
}

interface BeritaResponse {
  data: BeritaItem[];
  links: any[];
  next_page_url: string | null;
  prev_page_url: string | null;
  last_page: number;
}

const Berita = () => {
  const [searchParam, setSearchParam] = useSearchParams();

  const { data } = useQuery<BeritaResponse>({
    queryKey: ["berita", searchParam.get("page")],
    queryFn: async () => {
      const response = await adminServices.getBerita(searchParam.get("page"));
      return response.data.data;
    },
  });

  const handleDateFormat = (dates: string): string => {
    try {
      const isoDate = dates;
      const date = parseISO(isoDate);
      return format(date, "d MMM yyyy");
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid Date";
    }
  };

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
      <Title title="Berita" subTitle="Daftar Berita" />

      <CustomCard
        actions={
          <div className="sm:flex grid grid-rows-1 gap-3">
            <Label className="sm:w-45 md:w-60 text-yellow-uika">Unit Kerja</Label>
            <SelectFilter
              classname="w-58 md:w-80 lg:w-92"
              placeholder="04001 - Universitas Ibn Khaldun"
              options={[{ value: "apple", label: "apple" }]}
            />
          </div>
        }
      />

      <div className="grid grid-rows-2 gap-2 sm:flex justify-between mt-6">
        <div className="grid grid-rows-2 sm:flex gap-2 lg:gap-4">
          <SelectFilter
            classname="w-60 sm:w-32"
            placeholder="--Semua--"
            options={[{ value: "apple", label: "apple" }]}
          />

          <SearchInput className=""/>
        </div>

        <Button className="bg-green-light-uika hover:bg-hover-green-uika w-18 md:w-23">
          Batalkan
        </Button>
      </div>

      <Table className="mt-3 sm:mt-10 table-auto">
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="text-center"></TableHead>
            <TableHead className="text-center text-xs sm:text-sm">Unit Kerja</TableHead>
            <TableHead className="text-center text-xs sm:text-sm">Judul</TableHead>
            <TableHead className="text-center text-xs sm:text-sm">Tgl Posting</TableHead>
            <TableHead className="text-center text-xs sm:text-sm">Tgl Expired</TableHead>
            <TableHead className="text-center text-xs sm:text-sm">Prioritas</TableHead>
            <TableHead className="text-center text-xs sm:text-sm">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-gray-200">
          {data?.data.map((item, index) => (
            <TableRow key={index} className="even:bg-gray-100">
              <TableCell className="text-center">
                <Checkbox />
              </TableCell>
              <TableCell className="text-center text-xs sm:text-sm">
                {Array.isArray(item.unit_kerja_id)
                  ? item.unit_kerja_id[0]
                  : item.unit_kerja_id}
              </TableCell>
              <TableCell className="text-center text-xs sm:text-sm">{item.judul}</TableCell>
              <TableCell className="text-center text-xs sm:text-sm">
                {handleDateFormat(item.tgl_posting)}
              </TableCell>
              <TableCell className="text-center text-xs sm:text-sm">
                {handleDateFormat(item.tgl_expired)}
              </TableCell>
              <TableCell className="text-center">
                <div className="flex justify-center">
                  {item.prioritas ? (
                    <FaCheck className="text-green-500 w-4 h-4 mt-2" />
                  ) : (
                    <IoClose className="text-red-500 w-5 h-5 mt-2" />
                  )}
                </div>
              </TableCell>
              <TableCell className="h-full">
                <div className="flex justify-center items-center w-full h-full">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="cursor-pointer"
                  >
                    <IoEyeOutline className="w-5! h-5! text-[#26A1F4]" />
                  </Button>

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
    </div>
  );
};

export default Berita;
