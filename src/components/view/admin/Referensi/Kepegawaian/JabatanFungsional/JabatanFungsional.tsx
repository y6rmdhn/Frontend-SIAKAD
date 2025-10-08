import CustomCard from "@/components/blocks/Card";
import { ConfirmDialog } from "@/components/blocks/ConfirmDialog/ConfirmDialog";
import CustomPagination from "@/components/blocks/CustomPagination";
import SearchInput from "@/components/blocks/SearchInput";
import SelectFilter from "@/components/blocks/SelectFilter";
import Title from "@/components/blocks/Title";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import unitKerjaOptions from "@/constant/dummyFilter";
import deleteReferensiServices from "@/services/admin.delete.referensi";
import adminServices from "@/services/admin.services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { useDebounce } from "use-debounce";

const JabatanFungsional = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const [searchData, setSearchData] = useState(searchParam.get("search") || "");
  const [debouncedInput] = useDebounce(searchData, 500);
  const queryClient = useQueryClient();

  // Get data
  const { data } = useQuery({
    queryKey: [
      "jabatan-fungsional-referensi",
      searchParam.get("page"),
      searchParam.get("search"),
    ],
    queryFn: async () => {
      const search = searchParam.get("search") || "";
      const page = searchParam.get("page");

      const response = await adminServices.getJabatanFungsional(page, search);

      return response.data;
    },
  });

  // delete data
  const { mutate: deleteData } = useMutation({
    mutationFn: (id: string) =>
      deleteReferensiServices.deleteJabatanFungsional(id),
    onSuccess: () => {
      toast.success("Data berhasil dihapus");
      queryClient.invalidateQueries({
        queryKey: ["jabatan-fungsional-referensi"],
      });
    },
  });

  const handleDelete = (id: string) => {
    deleteData(id);
  };

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
      <Title title="Jabatan Fungsional" subTitle="Daftar Jabatan Fungsional" />
      <CustomCard
        actions={
          <div className="grid grid-rows-2 sm:flex">
            <Label className="w-32 text-[#FDA31A]">Jabatan Fungsional</Label>
            <SelectFilter
              classname="sm:ml-32 w-full sm:w-45"
              options={unitKerjaOptions}
            />
          </div>
        }
      />

      <div className="w-full flex flex-col sm:flex-row gap-4 justify-between mt-6">
        <div className="w-full flex flex-col sm:flex-row gap-4">
          <SelectFilter options={unitKerjaOptions} classname="w-full md:w-32" />
          <SearchInput
            value={searchData}
            onChange={(e) => setSearchData(e.target.value)}
          />
        </div>

        <div className="flex gap-3">
          <Link to="/admin/referensi/kepegawaian/jabatan-fungsional/detail-jabatan-fungsional">
            <Button className="cursor-pointer bg-green-light-uika hover:bg-[#329C59] w-full md:w-auto">
              <FaPlus /> Tambah
            </Button>
          </Link>
        </div>
      </div>

      <Table className="mt-10 table-auto">
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="text-center text-xs sm:text-sm">
              Kode
            </TableHead>
            <TableHead className="text-center text-xs sm:text-sm">
              Jabatan Fungsional
            </TableHead>
            <TableHead className="text-center text-xs sm:text-sm">
              Golongan/Pangkat
            </TableHead>
            <TableHead className="text-center text-xs sm:text-sm">
              Angka Kredit
            </TableHead>
            <TableHead className="text-center text-xs sm:text-sm">
              Usia Pensiun
            </TableHead>
            <TableHead className="text-center text-xs sm:text-sm">
              Aksi
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-gray-200">
          {data?.data?.map((item: any) => (
            <TableRow key={item.id} className=" even:bg-gray-100">
              <TableCell className="text-center text-xs sm:text-sm">
                {item.kode}
              </TableCell>
              <TableCell className="text-center text-xs sm:text-sm">
                {item.nama_jabatan_fungsional}
              </TableCell>
              <TableCell className="text-center text-xs sm:text-sm">
                {item.pangkat.nama_golongan}
              </TableCell>
              <TableCell className="text-center text-xs sm:text-sm">
                {item.angka_kredit}
              </TableCell>
              <TableCell className="text-center text-xs sm:text-sm">
                {item.usia_pensiun}
              </TableCell>
              <TableCell className="h-full">
                <div className="flex justify-center items-center w-full h-full">
                  <Link
                    to={
                      "/admin/referensi/kepegawaian/jabatan-fungsional/detail-jabatan-fungsional/edit-jabatan-fungsional/" +
                      item.id
                    }
                  >
                    <Button
                      size="icon"
                      variant="ghost"
                      className="cursor-pointer"
                    >
                      <MdEdit className="w-5! h-5! text-[#26A1F4]" />
                    </Button>
                  </Link>
                  <ConfirmDialog
                    title="Hapus Data?"
                    description="Apakah Anda yakin ingin menghapus data ini?"
                    onConfirm={() => handleDelete(item.id)}
                  >
                    <Button
                      size="icon"
                      type="button"
                      variant="ghost"
                      className="cursor-pointer"
                    >
                      <FaRegTrashAlt className="text-red-500" />
                    </Button>
                  </ConfirmDialog>
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
    </div>
  );
};

export default JabatanFungsional;
