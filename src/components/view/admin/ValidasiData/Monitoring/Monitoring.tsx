import CustomCard from "@/components/blocks/Card";
import CustomPagination from "@/components/blocks/CustomPagination";
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
import unitKerjaOptions from "@/constant/dummyFilter";
import adminServices from "@/services/admin.services";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { Link, useSearchParams } from "react-router-dom";
import { useDebounce } from "use-debounce";

const Monitoring = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const [searchData, setSearchData] = useState(searchParam.get("search") || "");
  const [debouncedInput] = useDebounce(searchData, 500);

  // get data
  const { data } = useQuery({
    queryKey: [
      "monitoring-validasi-data",
      searchParam.get("page"),
      searchParam.get("search"),
    ],
    queryFn: async () => {
      const response = await adminServices.getMonitoringValidasiData(
        searchParam.get("page") || 1,
        searchParam.get("search") || ""
      );

      return response.data.data;
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
      <Title title="Monitoring" />

      <CustomCard
        actions={
          <div className="grid md:grid-flow-col grid-flow-row gap-6">
            <div className="flex flex-col md:flex-row gap-2">
              <Label className="w-full text-[#FDA31A] text-xs md:text-sm">
                Unit Kerja
              </Label>
              <SelectFilter placeholder="" options={unitKerjaOptions} />
            </div>
            <div className="flex flex-col md:flex-row gap-2">
              <Label className="w-full text-[#FDA31A] text-xs md:text-sm">
                Hubungan Kerja
              </Label>
              <SelectFilter placeholder="" options={unitKerjaOptions} />
            </div>
          </div>
        }
      />

      <div className="flex justify-between md:mt-10 mt-5">
        <div className="lg:gap-5 gap-2 w-full flex flex-col md:flex-row mt-5">
          <SelectFilter classname="md:w-32" options={unitKerjaOptions} />
          <SearchInput
            value={searchData}
            onChange={(e) => setSearchData(e.target.value)}
          />
        </div>
      </div>

      <Table className="mt-10 table-auto text-xs md:text-sm">
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="text-center" colSpan={2} rowSpan={2}>
              Nama Riwayat
            </TableHead>
            <TableHead className="text-center" colSpan={6}>
              Status
            </TableHead>
          </TableRow>
          <TableRow className="bg-gray-100">
            <TableHead className="text-center">Diajukan</TableHead>
            <TableHead className="text-center">Disetujui</TableHead>
            <TableHead className="text-center">Ditolak</TableHead>
            <TableHead className="text-center">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-gray-200">
          {data?.map((item: any) => (
            <TableRow key={item.id} className=" even:bg-gray-100">
              <TableCell className="text-center">
                <Checkbox className="bg-gray-100 border-gray-300 data-[state=checked]:bg-green-light-uika data-[state=checked]:border-green-light-uika cursor-pointer" />
              </TableCell>
              <TableCell className="text-start">{item.item}</TableCell>
              <TableCell className="text-center">{item.diajukan}</TableCell>
              <TableCell className="text-center">{item.disetujui}</TableCell>
              <TableCell className="text-center">{item.ditolak}</TableCell>
              <TableCell className="h-full">
                <div className="flex justify-center items-center w-full h-full">
                  <Link to="/admin/operasional/kompensasi/detail-dokumen-internal">
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

export default Monitoring;
