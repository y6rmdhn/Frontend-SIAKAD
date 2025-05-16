import CustomCard from "@/components/blocks/Card";
import CustomPagination from "@/components/blocks/CustomPagination";
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
import adminServices from "@/services/admin.services";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { FaCheck, FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { Link, useSearchParams } from "react-router-dom";

// Define interface for the data item
interface HubunganKerjaItem {
  kode: string;
  nama_hub_kerja: string;
  status_aktif: boolean;
  pns: boolean;
  // Add other properties as needed
}

// Define interface for the API response
interface HubunganKerjaResponse {
  data: HubunganKerjaItem[];
  links: any[]; // You might want to define a more specific type
  next_page_url: string | null;
  prev_page_url: string | null;
  last_page: number;
}

const HubunganKerja = () => {
  const [searchParam, setSearchParam] = useSearchParams();

  const { data } = useQuery<HubunganKerjaResponse>({
    queryKey: ["hubungan-kerja", searchParam.get("page")],
    queryFn: async () => {
      const response = await adminServices.getHubunganKerja(
        searchParam.get("page")
      );
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
    <div className="mt-10">
      <Title title="Hubungan Kerja" />

      <CustomCard
        actions={
          <div className="flex justify-between mt-6">
            <div className="flex gap-4">
              <SelectFilter options={unitKerjaOptions} />
              <SearchInput />
            </div>

            <div className="flex gap-3">
              <Button className="cursor-pointer bg-green-light-uika hover:bg-[#329C59]">
                <FaPlus /> Tambah
              </Button>
            </div>
          </div>
        }
      >
        <Table className="mt-10 table-auto">
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="text-center">Kode</TableHead>
              <TableHead className="text-center">Nama Hubungan Kerja</TableHead>
              <TableHead className="text-center">Status Aktif</TableHead>
              <TableHead className="text-center">PNS</TableHead>
              <TableHead className="text-center">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-200">
            {data?.data.map((item, index) => (
              <TableRow key={index} className=" even:bg-gray-100">
                <TableCell className="text-center">{item.kode}</TableCell>
                <TableCell className="text-center">
                  {item.nama_hub_kerja}
                </TableCell>
                <TableCell>
                  <div className="flex justify-center items-center">
                    {item.status_aktif ? (
                      <FaCheck className="text-green-500 w-4 h-4" />
                    ) : (
                      <IoClose className="text-red-500 w-5 h-5" />
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex justify-center items-center">
                    {item.pns ? (
                      <FaCheck className="text-green-500 w-4 h-4" />
                    ) : (
                      <IoClose className="text-red-500 w-5 h-5" />
                    )}
                  </div>
                </TableCell>
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

export default HubunganKerja;
