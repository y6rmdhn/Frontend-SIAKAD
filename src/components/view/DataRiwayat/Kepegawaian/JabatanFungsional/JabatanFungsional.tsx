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
import { ReactNode, useEffect } from "react";
import dosenServices from "@/services/dosen.services.ts";
import CustomPagination from "@/components/blocks/CustomPagination";
import { parseISO, format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton"; // Import skeleton for loading state

const JabatanFungsional = () => {
  const [searchParam, setSearchParam] = useSearchParams();

  // get data with proper loading state
  const { data, isLoading, isError } = useQuery({
    queryKey: ["jabatan-fungsional-dosen", searchParam.get("page")],
    queryFn: async () => {
      const response = await dosenServices.getJabatanFungsional(
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

  // Loading state
  if (isLoading) {
    return (
      <div className="mt-10 mb-20">
        <Title
          title="Jabatan Fungsional"
          subTitle="Daftar Jabatan Fungsional"
        />
        <CustomCard
          actions={
            <div className="flex justify-end">
              <Skeleton className="h-10 w-32" />
            </div>
          }
        />

        {/* Skeleton for InfoList */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-6 w-full" />
            </div>
          ))}
        </div>

        <div className="gap-5 flex flex-col md:flex-row mt-5">
          <Skeleton className="h-10 w-full md:w-96" />
        </div>

        {/* Skeleton for Table */}
        <div className="mt-10 border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                {[...Array(7)].map((_, i) => (
                  <TableHead key={i}>
                    <Skeleton className="h-5 w-full" />
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...Array(5)].map((_, i) => (
                <TableRow key={i}>
                  {[...Array(7)].map((_, j) => (
                    <TableCell key={j}>
                      <Skeleton className="h-5 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="mt-10 mb-20">
        <Title
          title="Jabatan Fungsional"
          subTitle="Daftar Jabatan Fungsional"
        />
        <div className="flex flex-col items-center justify-center h-64">
          <p className="text-red-600">Gagal memuat data.</p>
          <p className="text-sm text-muted-foreground">
            Silakan coba lagi beberapa saat lagi.
          </p>
        </div>
      </div>
    );
  }

  // Safe access to pegawai_info with fallback
  const pegawaiInfo = data?.pegawai_info || {};

  return (
    <div className="mt-10 mb-20">
      <Title title="Jabatan Fungsional" subTitle="Daftar Jabatan Fungsional" />
      <CustomCard
        actions={
          <div className="flex justify-end">
            <Link to="/data-riwayat/kepegawaian/detail-jabatan-fungsional">
              <Button className="bg-[#FDA31A] text-xs md:text-sm hover:bg-[#F9A31A]">
                <FaPlus /> Tambah Baru
              </Button>
            </Link>
          </div>
        }
      />

      <InfoList
        items={[
          { label: "NIP", value: pegawaiInfo.nip || "-" },
          { label: "Nama", value: pegawaiInfo.nama || "-" },
          { label: "Unit Kerja", value: pegawaiInfo.unit_kerja || "-" },
          { label: "Status", value: pegawaiInfo.status || "-" },
          { label: "Jab. Akademik", value: pegawaiInfo.jab_akademik || "-" },
          {
            label: "Jab. Fungsional",
            value: pegawaiInfo.jab_fungsional || "-",
          },
          {
            label: "Jab. Struktural",
            value: pegawaiInfo.jab_struktural || "-",
          },
          { label: "Pendidikan", value: pegawaiInfo.pendidikan || "-" },
        ]}
      />

      <div className="gap-5 flex flex-col md:flex-row mt-5">
        <SearchInput />
      </div>

      <Table className="mt-10 table-auto text-xs lg:text-sm">
        <TableHeader>
          <TableRow className="bg-gray-300 ">
            {data?.table_columns?.map(
              (item: { label: ReactNode }, index: any) => (
                <TableHead key={index} className="text-center text-black">
                  {item.label}
                </TableHead>
              )
            )}
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-gray-200">
          {data?.data?.data?.length ? (
            data.data.data.map((item: any) => (
              <TableRow key={item.id} className=" even:bg-gray-100">
                <TableCell className="text-center">
                  {item.no_sk || "-"}
                </TableCell>
                <TableCell className="text-center">
                  {item.tanggal_sk
                    ? format(parseISO(item.tanggal_sk), "dd MMMM yyyy")
                    : "-"}
                </TableCell>
                <TableCell className="text-center">
                  {item.tmt_jabatan
                    ? format(parseISO(item.tmt_jabatan), "dd MMMM yyyy")
                    : "-"}
                </TableCell>
                <TableCell className="text-center">
                  {item.nama_jabatan_fungsional || "-"}
                </TableCell>
                <TableCell className="text-center">
                  {item.pejabat_penetap || "-"}
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
                    {item.status_pengajuan || "-"}
                  </Button>
                </TableCell>
                <TableCell className="h-full">
                  <div className="flex justify-center items-center w-full h-full">
                    <Link
                      to={
                        "/data-riwayat/kepegawaian/detail-data-jabatan-fungsional/" +
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
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={data?.table_columns?.length || 7}
                className="text-center h-48"
              >
                Data tidak ditemukan.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {data?.data?.data?.length > 0 && (
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
      )}
    </div>
  );
};

export default JabatanFungsional;
