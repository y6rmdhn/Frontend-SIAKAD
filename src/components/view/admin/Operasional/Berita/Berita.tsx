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

const Berita = () => {
  const [searchParam, setSearchParam] = useSearchParams();

  const { data } = useQuery({
    queryKey: ["berita", searchParam.get("page")],
    queryFn: async () => {
      const response = await adminServices.getBerita(searchParam.get("page"));
      return response.data.data;
    },
  });

  const handleDateFormat = (dates) => {
    const isoDate = dates;
    const date = parseISO(isoDate);

    return format(date, "d MMM yyyy");
  };

  useEffect(() => {
    if (!searchParam.get("page")) {
      searchParam.set("page", 1);

      setSearchParam(searchParam);
    }
  }, []);

  useEffect(() => {
    if (Number(searchParam.get("page")) < 1) {
      searchParam.set("page", 1);
      setSearchParam(searchParam);
    }
  }, []);

  useEffect(() => {
    if (
      Number(searchParam.get("page")) > data?.last_page &&
      data?.last_page > 0
    ) {
      searchParam.set("page", data?.last_page);
      setSearchParam(searchParam);
    }
  }, [searchParam, data]);

  return (
    <div className="mt-10 mb-20">
      <Title title="Berita" subTitle="Daftar Berita" />

      <CustomCard
        actions={
          <div className="flex">
            <Label className="w-60 text-yellow-uika">Unit Kerja</Label>
            <SelectFilter
              classname="w-92"
              placeholder="04001 - Universitas Ibn Khaldun"
              options={[{ value: "apple", label: "apple" }]}
            />
          </div>
        }
      />

      <div className="flex justify-between mt-6">
        <div className="flex gap-4">
          <SelectFilter
            classname="w-32"
            placeholder="--Semua--"
            options={[{ value: "apple", label: "apple" }]}
          />

          <SearchInput />
        </div>

        <Button className="bg-green-light-uika hover:bg-hover-green-uika">
          Batalkan
        </Button>
      </div>

      <Table className="mt-10 table-auto">
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="text-center"></TableHead>
            <TableHead className="text-center">Unit Kerja</TableHead>
            <TableHead className="text-center">Judul</TableHead>
            <TableHead className="text-center">Tgl Posting</TableHead>
            <TableHead className="text-center">Tgl Expired</TableHead>
            <TableHead className="text-center">Prioritas</TableHead>
            <TableHead className="text-center">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-gray-200">
          {data?.data.map((item) => (
            <TableRow className=" even:bg-gray-100">
              <TableCell className="text-center">
                <Checkbox />
              </TableCell>
              <TableCell className="text-center">
                {item.unit_kerja_id[0]}
              </TableCell>
              <TableCell className="text-center">{item.judul}</TableCell>
              <TableCell className="text-center">
                {handleDateFormat(item.tgl_posting)}
              </TableCell>
              <TableCell className="text-center">
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
