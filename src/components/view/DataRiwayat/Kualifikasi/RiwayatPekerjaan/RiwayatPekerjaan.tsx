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
import { Link, useSearchParams } from "react-router-dom";
import InfoList from "@/components/blocks/InfoList";
import SearchInput from "@/components/blocks/SearchInput";
import { useQuery } from "@tanstack/react-query";
import dosenServices from "../../../../../services/dosen.services";
import {
  JSXElementConstructor,
  ReactElement,
  ReactNode,
  ReactPortal,
  useEffect,
  useState,
} from "react";
import { format, parseISO } from "date-fns";
import CustomPagination from "../../../../blocks/CustomPagination";
import { useDebounce } from "use-debounce";

const RiwayatPekerjaan = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const [searchData, setSearchData] = useState(searchParam.get("search") || "");
  const [debouncedInput] = useDebounce(searchData, 500);

  // get data
  const { data } = useQuery({
    queryKey: [
      "riwayat-pekerjaan-dosen",
      searchParam.get("page"),
      searchParam.get("search"),
    ],
    queryFn: async () => {
      const search = searchParam.get("search") || "";
      const response = await dosenServices.getRiwayatPekerjaan(
        searchParam.get("page"),
        search
      );
      console.log(response.data);
      return response.data;
    },
  });

  useEffect(() => {
    const newSearchParam = new URLSearchParams(searchParam);

    if (debouncedInput.length > 3) {
      newSearchParam.set("search", debouncedInput);
      newSearchParam.set("page", "1");
    } else if (debouncedInput.length === 0) {
      newSearchParam.delete("search");
    }

    if (searchParam.toString() !== newSearchParam.toString()) {
      setSearchParam(newSearchParam);
    }
  }, [debouncedInput, searchParam, setSearchParam]);

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
      <Title title="Riwayat Pekerjaan" subTitle="Daftar Riwayat Pekerjaan" />

      <CustomCard
        actions={
          <div className="flex justify-end">
            <Link to="/data-riwayat/kualifikasi/detail-riwayat-pekerjaan">
              <Button className="bg-[#FDA31A] text-xs md:text-sm hover:bg-[#F9A31A]">
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
        <SearchInput
          value={searchData}
          onChange={(e) => setSearchData(e.target.value)}
          className="w-full"
        />
      </div>

      <Table className="mt-10 table-auto text-xs lg:text-sm">
        <TableHeader>
          <TableRow className="bg-[#E7ECF2] ">
            <TableHead className="text-center text-black">No</TableHead>
            <TableHead className="text-center text-black">
              Bidang Usaha
            </TableHead>
            <TableHead className="text-center text-black">
              Jenis Pekerjaan
            </TableHead>
            <TableHead className="text-center text-black">
              Nama Instansi
            </TableHead>
            <TableHead className="text-center text-black">Jabatan</TableHead>
            <TableHead className="text-center text-black">
              Mulai Bekerja
            </TableHead>
            <TableHead className="text-center text-black">
              Selesai Bekerja
            </TableHead>
            <TableHead className="text-center text-black">
              Status Pengajuan
            </TableHead>
            <TableHead className="text-center text-black">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-gray-200">
          {data?.data.data.map(
            (item: {
              id:
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
              bidang_usaha:
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
              jenis_pekerjaan:
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
              instansi:
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
              jabatan:
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
              mulai_bekerja: string;
              selesai_bekerja: string;
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
            }) => (
              <TableRow className=" even:bg-[#E7ECF2]">
                <TableCell className="text-center">{item.id}</TableCell>
                <TableCell className="text-center">
                  {item.bidang_usaha}
                </TableCell>
                <TableCell className="text-center">
                  {item.jenis_pekerjaan}
                </TableCell>
                <TableCell className="text-center">{item.instansi}</TableCell>
                <TableCell className="text-center">{item.jabatan}</TableCell>
                <TableCell className="text-center">
                  {item.mulai_bekerja
                    ? format(parseISO(item.mulai_bekerja), "dd MMMM yyyy")
                    : "-"}
                </TableCell>
                <TableCell className="text-center">
                  {item.selesai_bekerja
                    ? format(parseISO(item.selesai_bekerja), "dd MMMM yyyy")
                    : "-"}
                </TableCell>
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
                        "/data-riwayat/kualifikasi/detail-data-riwayat-pekerjaan/" +
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

export default RiwayatPekerjaan;
