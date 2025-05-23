import CustomCard from "@/components/blocks/Card";
import SearchInput from "@/components/blocks/SearchInput";
import SelectFilter from "@/components/blocks/SelectFilter";
import Title from "@/components/blocks/Title";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import unitKerjaOptions from "@/constant/dummyFilter";
import React, { useEffect, useRef, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { Link, useSearchParams } from "react-router-dom";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { IoEyeOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import adminServices from "@/services/admin.services";
import { ChevronDownIcon } from "lucide-react";
import CustomPagination from "@/components/blocks/CustomPagination";

// Define interface for the data item
interface UnitKerjaItem {
  kode_unit: string;
  nama_unit: string;
  parent_unit_id: string | null;
  // Add other properties as needed
}

// Define interface for the tree node
interface UnitNode extends UnitKerjaItem {
  children: UnitNode[];
}

// Define interface for the API response
interface UnitKerjaResponse {
  data: UnitKerjaItem[];
  links: any[]; // You might want to define a more specific type
  next_page_url: string | null;
  prev_page_url: string | null;
  last_page: number;
}

const UnitKerja = () => {
  const [openRows, setOpenRows] = useState<Record<string, boolean>>({});
  const rowRefs = useRef<Record<string, HTMLTableRowElement | null>>({});
  const [searchParam, setSearchParam] = useSearchParams();

  const { data } = useQuery<UnitKerjaResponse>({
    queryKey: ["unit-kerja", searchParam.get("page")],
    queryFn: async () => {
      const response = await adminServices.getUnitKerja(
        searchParam.get("page")
      );
      return response.data.data;
    },
  });

  function buildTree(units: UnitKerjaItem[]): UnitNode[] {
    const tree: UnitNode[] = [];

    units.forEach((unit) => {
      if (unit.parent_unit_id === null) {
        const rootNode: UnitNode = { ...unit, children: [] };

        units.forEach((child) => {
          if (
            child.parent_unit_id &&
            child.parent_unit_id.length > 4 &&
            child.parent_unit_id === unit.kode_unit
          ) {
            const childNode: UnitNode = { ...child, children: [] };

            units.forEach((grandChild) => {
              if (grandChild.parent_unit_id === child.kode_unit) {
                childNode.children.push({ ...grandChild, children: [] });
              }
            });

            rootNode.children.push(childNode);
          }
        });

        tree.push(rootNode);
      }
    });

    return tree;
  }

  const treeData = data?.data ? buildTree(data.data) : [];

  const toggleRow = (kode_unit: string) => {
    setOpenRows((prev) => {
      const newState = {
        ...prev,
        [kode_unit]: !prev[kode_unit],
      };

      if (!prev[kode_unit] && rowRefs.current[kode_unit]) {
        setTimeout(() => {
          rowRefs.current[kode_unit]?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 100);
      }

      return newState;
    });
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

  // Proper type for ref callback
  const createRefCallback =
    (kode_unit: string) => (el: HTMLTableRowElement | null) => {
      rowRefs.current[kode_unit] = el;
    };

  return (
    <div className="mt-10 mb-20">
      <Title title="Unit Kerja" subTitle="Daftar Unit Kerja" />
      <CustomCard
        actions={
          <div className="grid grid-rows-2 gap-4 lg:flex justify-between mt-6">
            <div className="grid grid-rows-2 sm:flex gap-4">
              <SelectFilter options={unitKerjaOptions} />
              <SearchInput />
            </div>

            <div className="gap-3 flex sm:gap-4">
              <Link to="/admin/referensi/kepegawaian/unit-kerja/detail-unit-kerja">
                <Button className="cursor-pointer bg-green-light-uika hover:bg-hover-green-uika sm:w-27 lg:w-auto">
                  <FaPlus /> Tambah
                </Button>
              </Link>
              <Button variant="destructive" className="cursor-pointer">
                <FaRegTrashAlt /> Hapus
              </Button>
            </div>
          </div>
        }
      >
        <Table className="table-auto">
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="text-center w-10"></TableHead>
              <TableHead className="text-center text-xs sm:text-sm">Kode</TableHead>
              <TableHead className="text-center text-xs sm:text-sm">Unit Kerja</TableHead>
              <TableHead className="text-center text-xs sm:text-sm">Parent Unit Kerja</TableHead>
              <TableHead className="text-center text-xs sm:text-sm">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-200">
            {treeData.map((item) => (
              <React.Fragment key={item.kode_unit}>
                <TableRow
                  className="even:bg-gray-200"
                  ref={createRefCallback(item.kode_unit)}
                >
                  <TableCell>
                    {item.children.length > 0 && (
                      <Button
                        onClick={() => toggleRow(item.kode_unit)}
                        variant="ghost"
                        size="icon"
                      >
                        <ChevronDownIcon
                          className={`text-muted-foreground size-4 transition-transform duration-200 ${
                            openRows[item.kode_unit] ? "rotate-180" : ""
                          }`}
                        />
                      </Button>
                    )}
                  </TableCell>
                  <TableCell className="text-center text-xs sm:text-sm">
                    {item.kode_unit}
                  </TableCell>
                  <TableCell className="text-center text-xs sm:text-sm">
                    {item.nama_unit}
                  </TableCell>
                  <TableCell className="text-center text-xs sm:text-sm">-</TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center items-center w-full h-full">
                      <Link to="">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="cursor-pointer"
                        >
                          <IoIosArrowUp className="w-6! h-6! text-yellow-uika" />
                        </Button>
                      </Link>
                      <Link to="">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="cursor-pointer"
                        >
                          <IoIosArrowDown className="w-6! h-6! text-yellow-uika" />
                        </Button>
                      </Link>
                      <Link to="">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="cursor-pointer"
                        >
                          <FaPlus className="w-5! h-5! text-green-500" />
                        </Button>
                      </Link>
                      <Link to="">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="cursor-pointer"
                        >
                          <IoEyeOutline className="w-5! h-5! text-[#26A1F4]" />
                        </Button>
                      </Link>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="cursor-pointer"
                      >
                        <FaRegTrashAlt className="text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>

                {openRows[item.kode_unit] &&
                  item.children.map((child) => (
                    <React.Fragment key={child.kode_unit}>
                      <TableRow
                        className="even:bg-gray-100"
                        ref={createRefCallback(child.kode_unit)}
                      >
                        <TableCell>
                          {child.children.length > 0 && (
                            <Button
                              onClick={() => toggleRow(child.kode_unit)}
                              variant="ghost"
                              size="icon"
                            >
                              <ChevronDownIcon
                                className={`text-muted-foreground size-4 transition-transform duration-200 ${
                                  openRows[child.kode_unit] ? "rotate-180" : ""
                                }`}
                              />
                            </Button>
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          {child.kode_unit}
                        </TableCell>
                        <TableCell className="text-left pl-6">
                          {child.nama_unit}
                        </TableCell>
                        <TableCell className="text-center">
                          {child.parent_unit_id}
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex justify-center items-center w-full h-full">
                            <Link to="">
                              <Button
                                size="icon"
                                variant="ghost"
                                className="cursor-pointer"
                              >
                                <IoIosArrowUp className="w-6! h-6! text-yellow-uika" />
                              </Button>
                            </Link>
                            <Link to="">
                              <Button
                                size="icon"
                                variant="ghost"
                                className="cursor-pointer"
                              >
                                <IoIosArrowDown className="w-6! h-6! text-yellow-uika" />
                              </Button>
                            </Link>
                            <Link to="">
                              <Button
                                size="icon"
                                variant="ghost"
                                className="cursor-pointer"
                              >
                                <FaPlus className="w-5! h-5! text-green-500" />
                              </Button>
                            </Link>
                            <Link to="">
                              <Button
                                size="icon"
                                variant="ghost"
                                className="cursor-pointer"
                              >
                                <IoEyeOutline className="w-5! h-5! text-[#26A1F4]" />
                              </Button>
                            </Link>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="cursor-pointer"
                            >
                              <FaRegTrashAlt className="text-red-500" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>

                      {openRows[child.kode_unit] &&
                        child.children.map((grand) => (
                          <TableRow
                            key={grand.kode_unit}
                            className="bg-gray-50"
                            ref={createRefCallback(grand.kode_unit)}
                          >
                            <TableCell></TableCell>
                            <TableCell className="text-center">
                              {grand.kode_unit}
                            </TableCell>
                            <TableCell className="text-left pl-12">
                              {grand.nama_unit}
                            </TableCell>
                            <TableCell className="text-center">
                              {grand.parent_unit_id}
                            </TableCell>
                            <TableCell className="text-center">
                              <div className="flex justify-center items-center w-full h-full">
                                <Link to="">
                                  <Button
                                    size="icon"
                                    variant="ghost"
                                    className="cursor-pointer"
                                  >
                                    <IoIosArrowUp className="w-6! h-6! text-yellow-uika" />
                                  </Button>
                                </Link>
                                <Link to="">
                                  <Button
                                    size="icon"
                                    variant="ghost"
                                    className="cursor-pointer"
                                  >
                                    <IoIosArrowDown className="w-6! h-6! text-yellow-uika" />
                                  </Button>
                                </Link>
                                <Link to="">
                                  <Button
                                    size="icon"
                                    variant="ghost"
                                    className="cursor-pointer"
                                  >
                                    <FaPlus className="w-5! h-5! text-green-500" />
                                  </Button>
                                </Link>
                                <Link to="">
                                  <Button
                                    size="icon"
                                    variant="ghost"
                                    className="cursor-pointer"
                                  >
                                    <IoEyeOutline className="w-5! h-5! text-[#26A1F4]" />
                                  </Button>
                                </Link>
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  className="cursor-pointer"
                                >
                                  <FaRegTrashAlt className="text-red-500" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                    </React.Fragment>
                  ))}
              </React.Fragment>
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

export default UnitKerja;
