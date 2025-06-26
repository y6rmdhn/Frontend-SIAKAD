import CustomCard from "@/components/blocks/Card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SelectFilter from "@/components/blocks/SelectFilter";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import adminServices from "@/services/admin.services";
import CustomPagination from "@/components/blocks/CustomPagination";
import { useDebounce } from "use-debounce";
import SearchInput from "@/components/blocks/SearchInput";
import unitKerjaOptions from "@/constant/dummyFilter";

const DaftarMonitoringKehadiran = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const [searchData, setSearchData] = useState(searchParam.get("search") || "");
  const [debouncedInput] = useDebounce(searchData, 500);

  // get data
  const { data } = useQuery({
    queryKey: [
      "monitoring-kehadiran",
      searchParam.get("page"),
      searchParam.get("search"),
    ],
    queryFn: async () => {
      const page = searchParam.get("page") || "1";
      const search = searchParam.get("search") || "";
      const response = await adminServices.getMonittoringKehadiran(
        page,
        search
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
      <h1 className="text-lg sm:text-2xl font-normal">
        Daftar Monitoring Kehadiran
      </h1>
      <CustomCard
        actions={
          <div className="mt-5 grid-rows-3 md:grid-rows-2 grid-flow-col grid gap-6">
            <SelectFilter
              label="Unit Kerja"
              options={[
                { label: "Admin", value: "admin" },
                { label: "User", value: "user" },
                { label: "Guest", value: "guest" },
              ]}
              placeholder="--041001 Universitas Ibn Khaldun--"
            />
            <SelectFilter
              label="Unit Kerja"
              options={[
                { label: "Admin", value: "admin" },
                { label: "User", value: "user" },
                { label: "Guest", value: "guest" },
              ]}
              placeholder="--041001 Universitas Ibn Khaldun--"
            />
            <SelectFilter
              label="Unit Kerja"
              options={[
                { label: "Admin", value: "admin" },
                { label: "User", value: "user" },
                { label: "Guest", value: "guest" },
              ]}
              placeholder="--041001 Universitas Ibn Khaldun--"
            />
          </div>
        }
      />

      <div className="mt-10 grid grid-rows-2 sm:flex gap-4">
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
              Unit Kerja
            </TableHead>
            <TableHead className="text-center text-xs sm:text-sm">
              Kehadiran
            </TableHead>
            <TableHead className="text-center text-xs sm:text-sm">
              Status
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-gray-200">
          {data?.map((item: any) => (
            <TableRow key={item.id} className=" even:bg-gray-100">
              <TableCell className="text-center text-xs sm:text-sm">
                {item.nip}
              </TableCell>
              <TableCell className="text-center text-xs sm:text-sm">
                {item.nama_pegawai}
              </TableCell>
              <TableCell className="text-center text-xs sm:text-sm">
                {item.unit_kerja}
              </TableCell>
              <TableCell className="text-center text-xs sm:text-sm">
                {item.kehadiran}
              </TableCell>
              <TableCell className="text-center text-xs sm:text-sm">
                {item.status}
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

export default DaftarMonitoringKehadiran;
