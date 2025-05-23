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
import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { Checkbox } from "@/components/ui/checkbox";
import { MdEdit } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
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
import { useEffect, useState } from "react";
import CustomPagination from "@/components/blocks/CustomPagination";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import SearchInput from "@/components/blocks/SearchInput";

const Pegawai = () => {
  const params = useParams();
  const navigate = useNavigate();
  const form = useForm();
  const [searchParam, setSearchParam] = useSearchParams();
  const [selectedPegawaiId, setSelectedPegawaiId] = useState<number[]>([]);

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

  const handleSelectedPegawaiId = (pegawaiId: number, checked: boolean) => {
    if (checked) {
      setSelectedPegawaiId((prev) => [...prev, pegawaiId]);
    } else {
      setSelectedPegawaiId((prev) => prev.filter((id) => id !== pegawaiId));
    }
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

  return (
    <div className="w-full mt-10">
      <Form {...form}>
        <form>
          <h1 className="text-2xl font-normal">Pegawai</h1>
          <CustomCard title="Filter">
            <FilterPegawai form={form} />
          </CustomCard>

          <div className="mt-14 flex flex-col lg:flex-row gap-10 justify-between">
            <div className="flex flex-col lg:flex-row gap-5">
              <Select>
                <SelectTrigger className="w-full lg:w-[180px]">
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

              <SearchInput />
            </div>

            <div className="flex flex-col lg:flex-row gap-2">
              <Link to="/admin/pegawai/data-pegawai">
                <Button className="cursor-pointer w-full  bg-green-light-uika hover:bg-[#329C59]">
                  <FaPlus /> Tambah
                </Button>
              </Link>

              {selectedPegawaiId.length > 0 && (
                <Button variant="destructive" className="cursor-pointer">
                  <FaRegTrashAlt /> Hapus {selectedPegawaiId.length} Data
                </Button>
              )}

              <Button className="cursor-pointer min-w-52 bg-green-light-uika flex lg:justify-start lg:items-center hover:bg-[#329C59]">
                <FaCheck /> Set Status
              </Button>
            </div>
          </div>

          <Table className="mt-3 table-auto text-xs lg:text-sm">
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead className="text-center"></TableHead>
                <TableHead className="text-center">NIP</TableHead>
                <TableHead className="text-center">NIDN</TableHead>
                <TableHead className="text-center">Nama Pegawai</TableHead>
                <TableHead className="text-center">Uni Kerja</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-200">
              {data?.data.map((item, index) => (
                <TableRow key={index} className=" even:bg-gray-100">
                  <TableCell className="font-medium">
                    <Checkbox
                      checked={selectedPegawaiId.includes(item.id)}
                      onCheckedChange={(checked) =>
                        handleSelectedPegawaiId(item.id, checked)
                      }
                    />
                  </TableCell>
                  <TableCell className="text-center">{item.nip}</TableCell>
                  <TableCell className="text-center">{item.nidn}</TableCell>
                  <TableCell className="text-center">
                    {item.nama_pegawai}
                  </TableCell>
                  <TableCell className="text-center">
                    {item.unit_kerja}
                  </TableCell>
                  <TableCell className="text-center">{item.status}</TableCell>
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
        </form>
      </Form>
    </div>
  );
};

export default Pegawai;
