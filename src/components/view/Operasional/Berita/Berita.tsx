import CustomCard from "@/components/blocks/Card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IoAdd, IoEyeOutline } from "react-icons/io5";
import { HiMiniTrash } from "react-icons/hi2";
import { Link, useSearchParams } from "react-router-dom";
import SelectFilter from "@/components/blocks/SelectFilter";
import SearchInput from "@/components/blocks/SearchInput";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { useQuery } from "@tanstack/react-query";
import dosenServices from "@/services/dosen.services";

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

              <div className="flex gap-2 order-1 md:order-2 w-full md:w-auto">
                <div className="flex gap-2 flex-col md:flex-row w-full md:w-auto">
                  <Link to="/operasional/tambah-berita">
                    <Button className="bg-[#87E39B] text-white">
                      <IoAdd />
                      Tambah
                    </Button>
                  </Link>
                  <Button className="bg-[#FDA31A] text-white">
                    <HiMiniTrash />
                    Hapus
                  </Button>
                </div>
              </div>
            </div>
          </div>
        }
      >
        <Table className="mt-10 table-auto text-xs lg:text-sm">
          <TableHeader>
            <TableRow className="bg-[#002E5A] ">
              <TableHead className="text-center text-white"></TableHead>
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
                  <Checkbox className="bg-gray-100 border-gray-300 data-[state=checked]:bg-green-light-uika data-[state=checked]:border-green-light-uika cursor-pointer" />
                </TableCell>
                <TableCell className="text-center"></TableCell>
                <TableCell className="text-center">{item.judul}</TableCell>
                <TableCell className="text-center"></TableCell>
                <TableCell className="text-center"></TableCell>
                <TableCell className="text-center"></TableCell>
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
                    <Link to="">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="cursor-pointer"
                      >
                        <HiMiniTrash className="w-5! h-5! text-[#FDA31A]" />
                      </Button>
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Pagination className="mt-8 flex justify-end">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </CustomCard>
    </div>
  );
};

export default Berita;
