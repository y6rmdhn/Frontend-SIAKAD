import { Link, useSearchParams } from "react-router-dom";
import Title from "@/components/blocks/Title";
import { Button } from "@/components/ui/button";
import InfoList from "@/components/blocks/InfoList";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IoEyeOutline } from "react-icons/io5";
import SelectFilter from "@/components/blocks/SelectFilter";
import unitKerjaOptions from "@/constant/dummyFilter";
import SearchInput from "@/components/blocks/SearchInput";
import { useEffect, useState } from "react";
import dosenServices from "@/services/dosen.services";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import CustomPagination from "@/components/blocks/CustomPagination";
const Pelanggaran = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const [searchData, setSearchData] = useState(searchParam.get("search") || "");
  const [debouncedInput] = useDebounce(searchData, 500);

  // get data
  const { data } = useQuery({
    queryKey: [
      "pelanggaran-kompensasi-dosen-2",
      searchParam.get("page"),
      searchParam.get("search"),
    ],
    queryFn: async () => {
      const search = searchParam.get("search") || "";
      const response = await dosenServices.getDataPelanggaran(
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
      <Title title="Pelanggaran" subTitle="Daftar Pelanggaran" />
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
            <TableHead className="text-center text-black text-xs sm:text-sm">
              Tgl Pelanggaran
            </TableHead>
            <TableHead className="text-center text-black text-xs sm:text-sm">
              Jenis Pelanggaran
            </TableHead>
            <TableHead className="text-center text-black text-xs sm:text-sm">
              No. SK
            </TableHead>
            <TableHead className="text-center text-black text-xs sm:text-sm ">
              Tgl. SK
            </TableHead>
            <TableHead className="text-center text-black text-xs sm:text-sm">
              Aksi
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-gray-200">
          {data?.data.data.map((item: any) => (
            <TableRow key={item.id} className=" even:bg-[#E7ECF2]">
              <TableCell className="text-center text-xs sm:text-sm">
                {item.tgl_pelanggaran}
              </TableCell>
              <TableCell className="text-center text-xs sm:text-sm">
                {item.jenis_pelanggaran}
              </TableCell>
              <TableCell className="text-center text-xs sm:text-sm">
                {item.no_sk}
              </TableCell>
              <TableCell className="text-center text-xs sm:text-sm">
                {item.tgl_sk}
              </TableCell>
              <TableCell className="h-full">
                <div className="flex justify-center items-center w-full h-full">
                  <Link to="">
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

export default Pelanggaran;
