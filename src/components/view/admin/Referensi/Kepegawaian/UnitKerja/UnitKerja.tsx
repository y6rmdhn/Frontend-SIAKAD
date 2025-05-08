import CustomCard from "@/components/blocks/Card";
import SearchInput from "@/components/blocks/SearchInput";
import SelectFilter from "@/components/blocks/SelectFilter";
import Title from "@/components/blocks/Title";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
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
import unitKerjaOptions from "@/constant/dummyFilter";
import React, { useRef, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { IoEyeOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import adminServices from "@/services/admin.services";
import { ChevronDownIcon } from "lucide-react";

const UnitKerja = () => {
  const [openRows, setOpenRows] = useState<Record<string, boolean>>({});
  const rowRefs = useRef<Record<string, HTMLTableRowElement | null>>({});

  const { data } = useQuery({
    queryKey: ["unit-kerja"],
    queryFn: async () => {
      const response = await adminServices.getUnitKerja();
      return response.data.data.data;
    },
  });

  function buildTree(units) {
    const tree: any[] = [];

    units.forEach((unit) => {
      if (unit.parent_unit_id === null) {
        const rootNode = { ...unit, children: [] };

        units.forEach((child) => {
          if (
            child.parent_unit_id &&
            child.parent_unit_id.length > 4 &&
            child.parent_unit_id === unit.kode_unit
          ) {
            const childNode = { ...child, children: [] };

            units.forEach((grandChild) => {
              if (grandChild.parent_unit_id === child.kode_unit) {
                childNode.children.push(grandChild);
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

  const treeData = data ? buildTree(data) : [];

  const toggleRow = (kode_unit: string) => {
    setOpenRows((prev) => {
      const newState = {
        ...prev,
        [kode_unit]: !prev[kode_unit],
      };

      // Scroll to the row if it's being opened
      if (!prev[kode_unit] && rowRefs.current[kode_unit]) {
        setTimeout(() => {
          rowRefs.current[kode_unit]?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 100); // delay a bit to wait for DOM to render
      }

      return newState;
    });
  };

  return (
    <div className="mt-10 mb-20">
      <Title title="Unit Kerja" subTitle="Daftar Unit Kerja" />
      <CustomCard
        actions={
          <div className="flex justify-between mt-6">
            <div className="flex gap-4">
              <SelectFilter options={unitKerjaOptions} />
              <SearchInput />
            </div>

            <div className="flex gap-3">
              <Link to="/admin/referensi/kepegawaian/unit-kerja/detail-unit-kerja">
                <Button className="cursor-pointer bg-green-light-uika hover:bg-hover-green-uika">
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
              <TableHead className="text-center">Kode</TableHead>
              <TableHead className="text-center">Unit Kerja</TableHead>
              <TableHead className="text-center">Parent Unit Kerja</TableHead>
              <TableHead className="text-center">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-200">
            {treeData.map((item) => (
              <React.Fragment key={item.kode_unit}>
                <TableRow
                  className="even:bg-gray-200"
                  ref={(el) => (rowRefs.current[item.kode_unit] = el)}
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
                  <TableCell className="text-center">
                    {item.kode_unit}
                  </TableCell>
                  <TableCell className="text-center">
                    {item.nama_unit}
                  </TableCell>
                  <TableCell className="text-center">-</TableCell>
                  <TableCell className="text-center">Aksi</TableCell>
                </TableRow>

                {openRows[item.kode_unit] &&
                  item.children.map((child) => (
                    <React.Fragment key={child.kode_unit}>
                      <TableRow
                        className="even:bg-gray-100"
                        ref={(el) => (rowRefs.current[child.kode_unit] = el)}
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
                        <TableCell className="text-center">Aksi</TableCell>
                      </TableRow>

                      {openRows[child.kode_unit] &&
                        child.children.map((grand) => (
                          <TableRow
                            key={grand.kode_unit}
                            className="bg-gray-50"
                            ref={(el) =>
                              (rowRefs.current[grand.kode_unit] = el)
                            }
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
                            <TableCell className="text-center">Aksi</TableCell>
                          </TableRow>
                        ))}
                    </React.Fragment>
                  ))}
              </React.Fragment>
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

export default UnitKerja;

{
  /* <TableCell className="h-full">
  <div className="flex justify-center items-center w-full h-full">
    <Link to="">
      <Button size="icon" variant="ghost" className="cursor-pointer">
        <IoIosArrowUp className="w-6! h-6! text-yellow-uika" />
      </Button>
    </Link>
    <Link to="">
      <Button size="icon" variant="ghost" className="cursor-pointer">
        <IoIosArrowDown className="w-6! h-6! text-yellow-uika" />
      </Button>
    </Link>
    <Link to="">
      <Button size="icon" variant="ghost" className="cursor-pointer">
        <FaPlus className="w-5! h-5! text-green-500" />
      </Button>
    </Link>
    <Link to="">
      <Button size="icon" variant="ghost" className="cursor-pointer">
        <IoEyeOutline className="w-5! h-5! text-[#26A1F4]" />
      </Button>
    </Link>
    <Button size="icon" variant="ghost" className="cursor-pointer">
      <FaRegTrashAlt className="text-red-500" />
    </Button>
  </div>
</TableCell>; */
}
