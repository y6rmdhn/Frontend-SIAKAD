import CustomCard from "@/components/blocks/Card";
import InfoList from "@/components/blocks/InfoList";
import SearchInput from "@/components/blocks/SearchInput";
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
import { useQuery } from "@tanstack/react-query";
import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
  useEffect,
} from "react";
import dosenServices from "@/services/dosen.services.ts";
import { parseISO, format, isValid } from "date-fns";
import CustomPagination from "@/components/blocks/CustomPagination";
import usePegawaiProfile from "@/hooks/usePegawaiProfile";

const formatDate = (dateStr?: string | null) => {
  if (!dateStr || dateStr.trim() === "" || dateStr.startsWith("0000-00-00")) {
    return "-";
  }
  try {
    const parsed = parseISO(dateStr);
    if (isValid(parsed)) {
      return format(parsed, "dd MMMM yyyy");
    }
  } catch (e) {
    // ignore
  }
  return "-";
};

const Pangkat = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const { profile } = usePegawaiProfile();

  // get data
  const { data } = useQuery({
    queryKey: ["anak", searchParam.get("page")],
    queryFn: async () => {
      const response = await dosenServices.getPangkat({
        page: searchParam.get("page")
      });
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
    const totalPages = data?.data?.pagination?.totalPages;
    if (
      totalPages &&
      Number(searchParam.get("page")) > totalPages &&
      totalPages > 0
    ) {
      searchParam.set("page", totalPages.toString());
      setSearchParam(searchParam);
    }
  }, [searchParam, data, setSearchParam]);

  return (
    <div className="mt-10 mb-20">
      <Title title="Pangkat" subTitle="Daftar Pangkat" />
      <CustomCard
        actions={
          <div className="flex justify-end ">
            <Link to="/data-riwayat/kepegawaian/detail-pangkat">
              <Button className="bg-yellow-uika hover:bg-hover-yellow-uika text-xs md:text-sm">
                <FaPlus className="w-3! h-3! md:w-4! h-4!" /> Tambah Baru
              </Button>
            </Link>
          </div>
        }
      />

      <InfoList
        items={[
          { label: "NIP", value: profile?.nip ?? "-" },
          { label: "Nama", value: profile?.nama ?? "-" },
          { label: "Unit Kerja", value: profile?.unit_kerja ?? "-" },
          { label: "Status", value: profile?.status ?? "-" },
          { label: "Jab. Fungsional", value: profile?.jab_fungsional ?? "-" },
          { label: "Jab. Struktural", value: profile?.jab_struktural ?? "-" },
          { label: "Pendidikan", value: profile?.pendidikan ?? "-" },
        ]}
      />

      <div className="lg:gap-5 gap-2 flex flex-col md:flex-row mt-5">
        <SearchInput />
      </div>

      <Table className="mt-10 table-auto text-sm">
        <TableHeader>
          <TableRow className="bg-gray-300 ">
            <TableHead className="text-center text-black">
              TMT Pangkas
            </TableHead>
            <TableHead className="text-center text-black">Jenis SK</TableHead>
            <TableHead className="text-center text-black">
              Nama Pangkat
            </TableHead>
            <TableHead className="text-center text-black">Masa Kerja</TableHead>
            <TableHead className="text-center text-black">
              Status Pengajuan
            </TableHead>
            <TableHead className="text-center text-black">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-gray-200">
          {data?.data?.items?.map(
            (item: any) => {
              const statusVal = item.status || item.status_pengajuan || "-";
              const golonganVal = item.master_pangkat?.nama || item.nama_golongan || "-";
              return (
                <TableRow key={item.id} className=" even:bg-gray-100">
                  <TableCell className="text-center">
                    {formatDate(item.tmt_pangkat)}
                  </TableCell>
                  <TableCell className="text-center">{item.jenis_sk ?? "-"}</TableCell>
                  <TableCell className="text-center">
                    {golonganVal}
                  </TableCell>
                  <TableCell className="text-center">{item.masa_kerja ?? "-"}</TableCell>
                  <TableCell className="text-center">
                    <Button
                      size="sm"
                      className={`w-full text-xs lg:text-sm text-black
      ${statusVal === "draf" || statusVal === "draft"
                          ? "bg-[#C4C4C4]/65 hover:bg-[#C4C4C4]/65"
                          : statusVal === "diajukan"
                            ? "bg-[#FFC951]/50 hover:bg-[#FFC951]/50"
                            : statusVal === "disetujui"
                              ? "bg-[#0EE03C]/50 hover:bg-[#0EE03C]/50"
                              : statusVal === "ditolak"
                                ? "bg-red-500 hover:bg-red-500"
                                : "bg-slate-300 hover:bg-slate-300"
                        }
    `}
                    >
                      {statusVal}
                    </Button>
                  </TableCell>
                  <TableCell className="h-full">
                    <div className="flex justify-center items-center w-full h-full">
                      <Link
                        to={
                          "/data-riwayat/kepegawaian/detail-data-pangkat/" +
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
              );
            }
          )}
        </TableBody>
      </Table>

      <CustomPagination
        pagination={data?.data?.pagination}
        onPageChange={(page) => {
          searchParam.set("page", page.toString());
          setSearchParam(searchParam);
        }}
      />
    </div>
  );
};

export default Pangkat;
