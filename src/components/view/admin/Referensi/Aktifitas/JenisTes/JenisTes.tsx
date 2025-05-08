import CustomCard from "@/components/blocks/Card";
import CustomPagination from "@/components/blocks/CustomPagination";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
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
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { Link, useSearchParams } from "react-router-dom";

const JenisTes = () => {
  const form = useForm();
  const [searchParam, setSearchParam] = useSearchParams();
  const [isAddData, setIsAddData] = useState<boolean>(false);

  const { data, isPending } = useQuery({
    queryKey: ["jenis-tes", searchParam.get("page")],
    queryFn: async () => {
      const response = await adminServices.getJenisTes(searchParam.get("page"));
      console.log(response.data.data);

      return response.data.data;
    },
  });

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
      <h1 className="text-2xl font-normal">Daftar Jenis Tes</h1>
      <Form {...form}>
        <form>
          <CustomCard
            actions={
              <div className="flex justify-end">
                <div className="flex gap-4">
                  <Button
                    type="button"
                    className="cursor-pointer bg-green-light-uika hover:bg-[#329C59]"
                  >
                    <FaPlus className="w-4! h-4! text-white" />
                    Tambah
                  </Button>
                </div>
              </div>
            }
          >
            <Table className="mt-5 table-auto">
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead className="text-center">Kode</TableHead>
                  <TableHead className="text-center">Jenis Tes</TableHead>
                  <TableHead className="text-center">Nilai Minimal</TableHead>
                  <TableHead className="text-center">Nilai Maksimal</TableHead>
                  <TableHead className="text-center">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-gray-200">
                {data?.data.map((item) => (
                  <TableRow className=" even:bg-gray-100">
                    <TableCell className="text-center">{item.kode}</TableCell>
                    <TableCell className="text-center">
                      {item.jenis_tes}
                    </TableCell>
                    <TableCell className="text-center">
                      {item.nilai_minimal}
                    </TableCell>
                    <TableCell className="text-center">
                      {item.nilai_maksimal}
                    </TableCell>
                    <TableCell className="h-full">
                      <div className="flex justify-center items-center w-full h-full">
                        <Link to="/admin/operasional/kompensasi/detail-dokumen-internal">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="cursor-pointer"
                          >
                            <MdEdit className="w-5! h-5! text-[#26A1F4]" />
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
        </form>
      </Form>
    </div>
  );
};

export default JenisTes;
