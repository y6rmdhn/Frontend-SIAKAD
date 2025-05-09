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
import { useEffect } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { Link, useSearchParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import adminServices from "@/services/admin.services";
import CustomPagination from "@/components/blocks/CustomPagination";

// Define interface for the data item
interface JenisSKItem {
  kode: string;
  jenis_sk: string;
  // Add other properties as needed
}

// Define interface for the API response
interface JenisSKResponse {
  data: JenisSKItem[];
  links: any[]; // You might want to define a more specific type
  next_page_url: string | null;
  prev_page_url: string | null;
  last_page: number;
}

const JenisSk = () => {
  const [searchParam, setSearchParam] = useSearchParams();

  const { data } = useQuery<JenisSKResponse>({
    queryKey: ["jenis-sk", searchParam.get("page")],
    queryFn: async () => {
      const response = await adminServices.getJenisSk(searchParam.get("page"));
      return response.data.data;
    },
  });

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

  return (
    <div className="mt-10 mb-20">
      <Title title="Daftar Jenis SK" />
      <CustomCard
        actions={
          <div className="flex justify-end gap-4">
            <Link to="/admin/referensi/kepegawaian/jabatan-struktural/detail-jabatan-struktural">
              <Button className="cursor-pointer bg-green-light-uika hover:bg-hover-green-uika">
                <FaPlus /> Tambah
              </Button>
            </Link>
          </div>
        }
      >
        <Table className="mt-10 table-auto">
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="text-center">Kode</TableHead>
              <TableHead className="text-center">Jenis SK</TableHead>
              <TableHead className="text-center">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-200">
            {data?.data.map((item, index) => (
              <TableRow key={index} className=" even:bg-gray-100">
                <TableCell className="text-center">{item.kode}</TableCell>
                <TableCell className="text-center">{item.jenis_sk}</TableCell>
                <TableCell className="h-full">
                  <div className="flex justify-center items-center w-full h-full">
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

export default JenisSk;
