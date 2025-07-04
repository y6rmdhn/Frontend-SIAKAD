import { Link, useSearchParams } from "react-router-dom";
import Title from "@/components/blocks/Title";
import CustomCard from "@/components/blocks/Card";
import { Button } from "@/components/ui/button";
import InfoList from "@/components/blocks/InfoList";
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
import { useQuery } from "@tanstack/react-query";
import dosenServices from "../../../../../services/dosen.services";
import {
  JSXElementConstructor,
  ReactElement,
  ReactNode,
  ReactPortal,
  useEffect,
} from "react";
import CustomPagination from "../../../../blocks/CustomPagination";
import SearchInput from "../../../../blocks/SearchInput";
import { format, parseISO } from "date-fns";

const Organisasi = () => {
  const [searchParam, setSearchParam] = useSearchParams();

  // get data
  const { data } = useQuery({
    queryKey: ["organisasi-dosen", searchParam.get("page")],
    queryFn: async () => {
      const response = await dosenServices.getOrganisasi(
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
      <Title title="Organisasi" subTitle="Daftar Organisasi" />
      <CustomCard
        actions={
          <div className="flex justify-end">
            <Link to="/data-riwayat/pengembangan-diri/detail-organisasi">
              <Button className="bg-yellow-uika hover:bg-hover-yellow-uika w-full sm:w-auto">
                <FaPlus /> Tambah Baru
              </Button>
            </Link>
          </div>
        }
      />
      <InfoList
        items={[
          { label: "NIP", value: data?.pegawai_info.nip },
          { label: "Nama", value: data?.pegawai_info.nama },
          { label: "Unit Kerja", value: data?.pegawai_info.unit_kerja },
          { label: "Status", value: data?.pegawai_info.status },
          { label: "Jab. Akademik", value: data?.pegawai_info.jab_akademik },
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
      <div className="gap-5 flex flex-col md:flex-row mt-5">
        <SearchInput />
      </div>
      <Table className="mt-10 table-auto text-xs md:text-sm">
        <TableHeader>
          <TableRow className="bg-[#E7ECF2] ">
            <TableHead className="text-center text-black text-xs sm:text-sm">
              Nama Organisasi
            </TableHead>
            <TableHead className="text-center text-black text-xs sm:text-sm">
              Jabatan
            </TableHead>
            <TableHead className="text-center text-black text-xs sm:text-sm">
              Jenis Organisasi
            </TableHead>
            <TableHead className="text-center text-black text-xs sm:text-sm">
              Tgl Mulai
            </TableHead>
            <TableHead className="text-center text-black text-xs sm:text-sm">
              Tgl Selesai
            </TableHead>
            <TableHead className="text-center text-black text-xs sm:text-sm">
              Tempat
            </TableHead>
            <TableHead className="text-center text-black text-xs sm:text-sm">
              Status Pengajuan
            </TableHead>
            <TableHead className="text-center text-black text-xs sm:text-sm">
              Aksi
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-gray-200">
          {data?.data.data.map(
            (item: {
              nama_organisasi:
                | string
                | number
                | bigint
                | boolean
                | ReactElement<unknown, string | JSXElementConstructor<any>>
                | Iterable<ReactNode>
                | ReactPortal
                | Promise<
                    | string
                    | number
                    | bigint
                    | boolean
                    | ReactPortal
                    | ReactElement<unknown, string | JSXElementConstructor<any>>
                    | Iterable<ReactNode>
                    | null
                    | undefined
                  >
                | null
                | undefined;
              jabatan_dalam_organisasi:
                | string
                | number
                | bigint
                | boolean
                | ReactElement<unknown, string | JSXElementConstructor<any>>
                | Iterable<ReactNode>
                | ReactPortal
                | Promise<
                    | string
                    | number
                    | bigint
                    | boolean
                    | ReactPortal
                    | ReactElement<unknown, string | JSXElementConstructor<any>>
                    | Iterable<ReactNode>
                    | null
                    | undefined
                  >
                | null
                | undefined;
              jenis_organisasi:
                | string
                | number
                | bigint
                | boolean
                | ReactElement<unknown, string | JSXElementConstructor<any>>
                | Iterable<ReactNode>
                | ReactPortal
                | Promise<
                    | string
                    | number
                    | bigint
                    | boolean
                    | ReactPortal
                    | ReactElement<unknown, string | JSXElementConstructor<any>>
                    | Iterable<ReactNode>
                    | null
                    | undefined
                  >
                | null
                | undefined;
              periode_mulai: string;
              periode_selesai: string;
              tempat_organisasi:
                | string
                | number
                | bigint
                | boolean
                | ReactElement<unknown, string | JSXElementConstructor<any>>
                | Iterable<ReactNode>
                | ReactPortal
                | Promise<
                    | string
                    | number
                    | bigint
                    | boolean
                    | ReactPortal
                    | ReactElement<unknown, string | JSXElementConstructor<any>>
                    | Iterable<ReactNode>
                    | null
                    | undefined
                  >
                | null
                | undefined;
              status_pengajuan:
                | string
                | number
                | bigint
                | boolean
                | ReactElement<unknown, string | JSXElementConstructor<any>>
                | Iterable<ReactNode>
                | Promise<
                    | string
                    | number
                    | bigint
                    | boolean
                    | ReactPortal
                    | ReactElement<unknown, string | JSXElementConstructor<any>>
                    | Iterable<ReactNode>
                    | null
                    | undefined
                  >
                | null
                | undefined;
              id: string;
            }) => (
              <TableRow className=" even:bg-[#E7ECF2]">
                <TableCell className="text-center text-xs sm:text-sm">
                  {item.nama_organisasi}
                </TableCell>
                <TableCell className="text-center text-xs sm:text-sm">
                  {item.jabatan_dalam_organisasi}
                </TableCell>
                <TableCell className="text-center text-xs sm:text-sm">
                  {item.jenis_organisasi}
                </TableCell>
                <TableCell className="text-center text-xs sm:text-sm">
                  {item.periode_mulai
                    ? format(parseISO(item.periode_mulai), "dd MMMM yyyy")
                    : "-"}
                </TableCell>
                <TableCell className="text-center text-xs sm:text-sm">
                  {item.periode_selesai
                    ? format(parseISO(item.periode_selesai), "dd MMMM yyyy")
                    : "-"}
                </TableCell>
                <TableCell className="text-center text-xs sm:text-sm">
                  {item.tempat_organisasi}
                </TableCell>
                <TableCell className="text-center text-xs sm:text-sm">
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
                        "/data-riwayat/pengembangan-diri/detail-data-organisasi/" +
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
            )
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
  );
};

export default Organisasi;
