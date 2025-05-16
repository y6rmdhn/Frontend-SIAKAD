import FilterPegawai from "@/components/blocks/FilterPegawai";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { FiSearch } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { Checkbox } from "@/components/ui/checkbox";
import { MdEdit } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
import { FaSyncAlt } from "react-icons/fa";
import Status from "@/components/blocks/Status";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import CustomCard from "@/components/blocks/Card";
import { useQuery } from "@tanstack/react-query";
import adminServices from "@/services/admin.services";
import { useEffect } from "react";
import CustomPagination from "@/components/blocks/CustomPagination";

const Pegawai = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [searchParam, setSearchParam] = useSearchParams();

  const { data } = useQuery({
    queryKey: ["pegawai", searchParam.get("page")],
    queryFn: async () => {
      const response = await adminServices.getPegawaiAdminPage(
        searchParam.get("page")
      );
      console.log(response.data.data);

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
    <div className="w-full mt-10">
      <h1 className="text-2xl font-normal">Pegawai</h1>
      <CustomCard title="Filter">
        <FilterPegawai />
      </CustomCard>

      <div className="mt-14 flex gap-10 justify-between">
        <div className="flex gap-5">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="-- Semua --" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Semua</SelectLabel>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
                <SelectItem value="grapes">Grapes</SelectItem>
                <SelectItem value="pineapple">Pineapple</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <div className="relative">
            <Input placeholder="Search" className="w-2xs pr-8" />
            <FiSearch className="absolute -translate-y-1/2 top-1/2 right-2" />
          </div>
        </div>

        <div className="flex gap-2">
          <Link to="/admin/pegawai/data-pegawai">
            <Button className="cursor-pointer bg-green-light-uika hover:bg-[#329C59]">
              <FaPlus /> Tambah
            </Button>
          </Link>

          <Button variant="destructive" className="cursor-pointer">
            <FaRegTrashAlt /> Hapus
          </Button>

          <Button className="cursor-pointer min-w-52 bg-green-light-uika flex justify-start items-center hover:bg-[#329C59]">
            <FaCheck /> Set Status
          </Button>
        </div>
      </div>

      <Table className="mt-3 table-auto">
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="text-center"></TableHead>
            <TableHead className="text-center">NIP</TableHead>
            <TableHead className="text-center">NIDN</TableHead>
            <TableHead className="text-center">Nama Pegawai</TableHead>
            <TableHead className="text-center">Uni Kerja</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-center">Terhubung Sister</TableHead>
            <TableHead className="text-center">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-gray-200">
          {data?.data.map((item, index) => (
            <TableRow key={index} className=" even:bg-gray-100">
              <TableCell className="font-medium">
                <Checkbox />
              </TableCell>
              <TableCell className="text-center">{item.nip}</TableCell>
              <TableCell className="text-center">{item.nidn}</TableCell>
              <TableCell className="text-center">{item.nama_pegawai}</TableCell>
              <TableCell className="text-center">{item.unit_kerja}</TableCell>
              <TableCell className="text-center">{item.status}</TableCell>
              <TableCell className="text-center">
                {item.terhubung_sister}
              </TableCell>
              <TableCell className="text-center w-28">
                <div className="flex">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="cursor-pointer"
                  >
                    <MdEdit className="w-5! h-5! text-[#26A1F4]" />
                  </Button>
                  <Button
                    onClick={() =>
                      navigate("/admin/detail-pegawai/biodata/" + item.id)
                    }
                    size="icon"
                    variant="ghost"
                    className="cursor-pointer"
                  >
                    <IoEyeOutline className="w-5! h-5! text-[#26A1F4]" />
                  </Button>
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

      <Status />
    </div>
  );
};

export default Pegawai;
