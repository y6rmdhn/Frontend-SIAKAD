import CustomCard from "@/components/blocks/Card";
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
import React, { useEffect } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { Link, useSearchParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import adminServices from "@/services/admin.services";
import { FaCheck } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import CustomPagination from "@/components/blocks/CustomPagination";

const StatusKeaktifan = () => {
  const [searchParam, setSearchParam] = useSearchParams();

  const { data } = useQuery({
    queryKey: ["status-keaktifan", searchParam.get("page")],
    queryFn: async () => {
      const statusKeaktifanResponse = await adminServices.getStatusAktif(
        searchParam.get("page")
      );

      return statusKeaktifanResponse.data.data;
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
      <Title title="Status Keaktifan" subTitle="Daftar Status Aktif" />
      <CustomCard
        actions={
          <div className="flex justify-end gap-3">
            <Link to="/admin/referensi/kepegawaian/jabatan-struktural/detail-jabatan-struktural">
              <Button className="cursor-pointer bg-green-light-uika hover:bg-hover-green-uika">
                <FaPlus /> Tambah
              </Button>
            </Link>
          </div>
        }
      >
        <Table className="table-auto">
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="text-center">Kode</TableHead>
              <TableHead className="text-center">Nama Status Aktif</TableHead>
              <TableHead className="text-center">Status Keluar</TableHead>
              <TableHead className="text-center">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-200">
            {data?.data.map((item) => (
              <TableRow className=" even:bg-gray-100">
                <TableCell className="text-center">{item.kode}</TableCell>
                <TableCell className="text-center">
                  {item.nama_status_aktif}
                </TableCell>
                <TableCell className="flex text-center justify-center items-center w-full h-full">
                  {item.status_keluar ? (
                    <FaCheck className="text-green-500 w-4 h-4 mt-2" />
                  ) : (
                    <IoClose className="text-red-500 w-5 h-5 mt-2" />
                  )}
                </TableCell>
                <TableCell className="h-full">
                  <div className="flex text-center justify-center items-center w-full h-full">
                    <Link to="">
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
    </div>
  );
};

export default StatusKeaktifan;
