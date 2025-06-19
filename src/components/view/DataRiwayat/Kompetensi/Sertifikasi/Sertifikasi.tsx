import { Link, useSearchParams } from "react-router-dom";
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
import { FaPlus } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import InfoList from "@/components/blocks/InfoList";
import SelectFilter from "@/components/blocks/SelectFilter";
import unitKerjaOptions from "@/constant/dummyFilter";
import SearchInput from "@/components/blocks/SearchInput";
import dosenServices from "@/services/dosen.services";
import { useQuery } from "@tanstack/react-query";
import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect} from "react";
import {formatDate, parseISO} from "date-fns";
import CustomPagination from "@/components/blocks/CustomPagination";

const Sertifikasi = () => {
    const [searchParam, setSearchParam] = useSearchParams();

    // get data
    const {data} = useQuery({
        queryKey: ["kompetensi-sertifikasi-dosen", searchParam.get("page")],
        queryFn: async () => {
            const response = await dosenServices.getDataSertifikasiDosen(
                searchParam.get("page")
            );
            console.log(response.data);
            return response.data;
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
            <Title title="Sertifikasi" subTitle="Detail Sertifikasi"/>
            <CustomCard
                actions={
                    <div className="flex justify-end">
                        <Link to="/data-riwayat/kompetensi/detail-sertifikasi">
                            <Button className="bg-[#FDA31A] text-xs md:text-sm hover:bg-[#F9A31A]">
                                <FaPlus/> Tambah Baru
                            </Button>
                        </Link>
                    </div>
                }
            />

            <InfoList
                items={[
                    {label: "NIP", value: data?.pegawai_info.nip},
                    {label: "Nama", value: data?.pegawai_info.nama},
                    {label: "Unit Kerja", value: data?.pegawai_info.unit_kerja},
                    {label: "Status", value: data?.pegawai_info.status},
                    {label: "Jab. Akademik", value: data?.pegawai_info.jab_akademik},
                    {
                        label: "Jab. Fungsional",
                        value: data?.pegawai_info.jab_fungsional,
                    },
                    {
                        label: "Jab. Struktural",
                        value: data?.pegawai_info.jab_struktural,
                    },
                    {label: "Pendidikan", value: data?.pegawai_info.pendidikan},
                ]}
            />

            <div className="gap-5 flex flex-col md:flex-row mt-5">
                <SelectFilter
                    classname="w-full md:w-32 "
                    options={unitKerjaOptions}
                    placeholder="--Semua--"
                />
                <SearchInput/>
            </div>

            <Table className="mt-10 table-auto text-xs lg:text-sm">
                <TableHeader>
                    <TableRow className="bg-[#E7ECF2] ">
                        <TableHead className="text-center text-black">
                            Jenis Sertifikasi
                        </TableHead>
                        <TableHead className="text-center text-black">
                            Bidang Studi
                        </TableHead>
                        <TableHead className="text-center text-black">
                            No. Registrasi
                        </TableHead>
                        <TableHead className="text-center text-black">
                            No. Sertifikasi
                        </TableHead>
                        <TableHead className="text-center text-black">
                            Tahun Sertifikasi
                        </TableHead>
                        <TableHead className="text-center text-black">
                            Tgl Sinkron
                        </TableHead>
                        <TableHead className="text-center text-black">
                            Status Pengajuan
                        </TableHead>
                        <TableHead className="text-center text-black">Aksi</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="divide-y divide-gray-200">
                    {data?.data.data.map((item: { id: Key | null | undefined; jenis_sertifikasi: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; bidang_ilmu: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; no_registrasi: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; no_sertifikasi: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; tgl_sertifikasi: string; status_pengajuan: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }) => (
            <TableRow key={item.id} className=" even:bg-[#E7ECF2]">
              <TableCell className="text-center">
                {item.jenis_sertifikasi ? item.jenis_sertifikasi : "-"}
              </TableCell>
              <TableCell className="text-center">
                {item.bidang_ilmu ? item.bidang_ilmu : "-"}
              </TableCell>
              <TableCell className="text-center">
                {item.no_registrasi}
              </TableCell>
              <TableCell className="text-center">
                {item.no_sertifikasi}
              </TableCell>
              <TableCell className="text-center">
                {formatDate(parseISO(item.tgl_sertifikasi), "dd MMM yyyy")}
              </TableCell>
              <TableCell className="text-center"></TableCell>
              <TableCell className="text-center">
                <Button
                  size="sm"
                  className={`w-full text-xs lg:text-sm text-black
                    ${
                      item.status_pengajuan === "draf"
                        ? "bg-[#C4C4C4]/65 hover:bg-[#C4C4C4]/65"
                        : item.status_pengajuan === "diajukan"
                        ? "bg-[#FFC951]/50 hover:bg-[#FFC951]/50"
                        : item.status_pengajuan === "disetujui"
                        ? "bg-[#0EE03C]/50 hover:bg-[#0EE03C]/50"
                        : item.status_pengajuan === "ditolak"
                        ? "bg-red-500 hover:bg-red-500"
                        : "bg-slate-300 hover:bg-slate-300"
                    }
                  `}
                >
                  {item.status_pengajuan}
                </Button>
              </TableCell>
              <TableCell className="h-full">
                <div className="flex justify-center items-center w-full h-full">
                  <Link
                    to={
                      "/data-riwayat/kompetensi/detail-data-sertifikasi/" +
                      item.id
                    }
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

export default Sertifikasi;
