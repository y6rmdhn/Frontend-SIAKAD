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
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { useQuery } from "@tanstack/react-query";
import dosenServices from "@/services/dosen.services";
import CustomPagination from "@/components/blocks/CustomPagination";
import { FaCheck } from "react-icons/fa";

const Berita = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const [searchData, setSearchData] = useState(searchParam.get("search") || "");
  const [debouncedInput] = useDebounce(searchData, 500);

  // get data
  const { data } = useQuery({
    queryKey: [
      "berita-user",
      searchParam.get("page"),
      searchParam.get("search"),
    ],
    queryFn: async () => {
      const response = await dosenServices.getDataBeritaUser(
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
              placeholder="041001 - Universitas Ibn Khaldun"
              classname="w-full md:w-80"
              options={[
                { label: "Admin", value: "admin" },
                { label: "User", value: "user" },
                { label: "Guest", value: "guest" },
              ]}
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
                  <SelectFilter
                    classname="w-full md:w-30"
                    options={[
                      { label: "Admin", value: "admin" },
                      { label: "User", value: "user" },
                      { label: "Guest", value: "guest" },
                    ]}
                  />

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
            {data?.data.map((item: any) => (
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
                    <Link to="/operasional/detail-berita">
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
      </CustomCard>
    </div>
  );
};

export default Berita;
