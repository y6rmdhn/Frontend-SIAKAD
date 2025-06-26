import CustomCard from "@/components/blocks/Card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DetailPegawaiLayout from "@/layouts/DetailPegawaiLayout";
import { IoEyeOutline } from "react-icons/io5";
import { Link, useParams, useSearchParams } from "react-router-dom";
import DetailPegawaiSidebar from "../../../../../blocks/PegawaiDetailSidebar/PegawaiDetailSidebar";
import accordionContent from "../../../../../../constant/arccodionContent/arccodionContent";
import SelectFilter from "@/components/blocks/SelectFilter";
import unitKerjaOptions from "@/constant/dummyFilter";
import SearchInput from "@/components/blocks/SearchInput";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { useQuery } from "@tanstack/react-query";
import adminServices from "@/services/admin.services";
import InfoList from "@/components/blocks/InfoList";
import CustomPagination from "@/components/blocks/CustomPagination";

const HubunganKerja = () => {
  const params = useParams();
  const [searchParam, setSearchParam] = useSearchParams();
  const [searchData, setSearchData] = useState(searchParam.get("search") || "");
  const [debouncedInput] = useDebounce(searchData, 500);

  // get data
  const { data, isLoading } = useQuery({
    queryKey: [
      "hubungan-kerja-detail-pegawai",
      params.id,
      searchParam.get("page"),
      searchParam.get("search"),
    ],
    queryFn: async () => {
      const response = await adminServices.getHubunganKerjaDetailPegawai(
        searchParam.get("page") || 1,
        params.id,
        searchParam.get("search") || ""
      );
      return response.data;
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
    <DetailPegawaiLayout
      title="Hubungan Kerja"
      subTitile="Daftar Hubungan Kerja"
    >
      {/*Sidebar*/}
      <DetailPegawaiSidebar
        currentPegawaiId={params.id}
        accordionData={accordionContent}
      />
      <div className="flex flex-col w-full">
        <div className="flex flex-col gap-4 w-full">
          <InfoList
            items={[
              { label: "NIP", value: data?.pegawai_info.nip },
              { label: "Nama", value: data?.pegawai_info.nama },
              { label: "Unit Kerja", value: data?.pegawai_info.unit_kerja },
              { label: "Status", value: data?.pegawai_info.status },
              {
                label: "Jab. Akademik",
                value: data?.pegawai_info.jab_akademik,
              },
              {
                label: "Jab. Fungsional",
                value: data?.pegawai_info.jab_fungsional,
              },
              {
                label: "Jab. Struktural",
                value: data?.pegawai_info.jab_struktural,
              },
              { label: "Pendidikan", value: data?.pegawai_info.pendidikan },
            ]}
          />

          {/* Start (Ini di copy) */}
          <CustomCard
            actions={
              <div className="flex gap-4 flex-col md:flex-row">
                <Label className="md:pr-30 text-[#FDA31A]">
                  Status Pengajuan
                </Label>
                <SelectFilter
                  classname="w-full md:w-80"
                  options={unitKerjaOptions}
                  placeholder="--Semua Pengajuan--"
                />
              </div>
            }
          />
          {/* end (Ini di copy) */}

          {/* Start (Ini di copy) */}
          <div className="gap-5 flex flex-col md:flex-row">
            <SelectFilter
              classname="w-full md:w-32 "
              options={unitKerjaOptions}
              placeholder="--Semua--"
            />

            <SearchInput
              value={searchData}
              onChange={(e) => setSearchData(e.target.value)}
            />
          </div>
          {/* end (Ini di copy) */}
        </div>

        <Table className="mt-10 table-auto border-separate border-spacing-x-[1px]">
          <TableHeader>
            <TableRow className="bg-[#004680]">
              <TableHead className="text-center text-white rounded-tl-lg"></TableHead>
              <TableHead className="text-center text-white">
                Tgl.Mulai
              </TableHead>
              <TableHead className="text-center text-white">
                Tgl.Selesai
              </TableHead>
              <TableHead className="text-center text-white">
                Hubungan Kerja
              </TableHead>
              <TableHead className="text-center text-white">
                Status Pengajuan
              </TableHead>
              <TableHead className="text-center text-white rounded-tr-lg">
                Aksi
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-[#E7ECF2]">
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  Memuat data...
                </TableCell>
              </TableRow>
            ) : data?.data.data.length > 0 ? (
              data.data.data.map((item: any) => (
                <TableRow key={item.id}>
                  <TableCell className="flex justify-items-center">
                    <Checkbox className="bg-gray-100 border-gray-300 data-[state=checked]:bg-green-light-uika data-[state=checked]:border-green-light-uika cursor-pointer" />
                  </TableCell>
                  <TableCell className="text-center">
                    {item.tgl_awal_formatted}
                  </TableCell>
                  <TableCell className="text-center">
                    {item.tgl_akhir_formatted}
                  </TableCell>
                  <TableCell className="text-center">
                    {item.hubungan_kerja}
                  </TableCell>
                  <TableCell className="text-center capitalize">
                    {item.status_pengajuan}
                  </TableCell>
                  <TableCell className="h-full">
                    <div className="flex justify-center items-center w-full h-full">
                      <Link
                        to={`/admin/operasional/hubungan-kerja/detail/${item.id}`}
                      >
                        <Button
                          size="icon"
                          variant="ghost"
                          className="cursor-pointer"
                        >
                          <IoEyeOutline className="w-5! h-5! text-[#26A1F4]" />
                        </Button>
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  Data Kosong
                </TableCell>
              </TableRow>
            )}
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
    </DetailPegawaiLayout>
  );
};

export default HubunganKerja;
