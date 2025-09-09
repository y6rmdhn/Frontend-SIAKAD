import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useQuery, keepPreviousData } from "@tanstack/react-query"; // Diperbarui
import { useDebounce } from "use-debounce";

// UI & Custom Components
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
import { Skeleton } from "@/components/ui/skeleton";
import CustomPagination from "@/components/blocks/CustomPagination";
import SearchInput from "@/components/blocks/SearchInput";
import InfoList from "@/components/blocks/InfoList";

// Icons
import { MdEdit } from "react-icons/md";

// Services
import dosenServices from "@/services/dosen.services";

// --- Tipe Data ---
interface Evaluator {
  nama_lengkap: string;
  unit_kerja: string;
  status: string;
  jab_akademik: string;
  job_fungsional: string;
  jab_struktural: string;
  pendidikan: string;
}

interface EvaluasiItem {
  id: string;
  nip: string;
  nama_pegawai: string;
  unit_kerja: string;
  fungsional: string;
  aksi: {
    add: boolean;
    edit: boolean;
    delete: boolean;
    evaluation_id: string | null;
  };
}

// PERBAIKAN: Tipe ini sekarang mencerminkan seluruh objek response dari API
interface EvaluasiApiResponse {
  success: boolean;
  evaluator: Evaluator;
  data: EvaluasiItem[];
  pagination: {
    current_page: number;
    last_page: number;
  };
}

const EvaluasiKerja = () => {
  const [searchParam, setSearchParam] = useSearchParams();

  // --- State & URL Params ---
  const [searchData, setSearchData] = useState(searchParam.get("search") || "");
  const [debouncedSearch] = useDebounce(searchData, 500);
  const currentPage = searchParam.get("page") || "1";

  // --- Data Fetching ---
  const { data, isLoading, isError, error } = useQuery<EvaluasiApiResponse>({
    queryKey: ["evaluasi-kinerja-dosen", currentPage, debouncedSearch],
    queryFn: async () => {
      const response = await dosenServices.getEvaluasiKinerja({
        page: currentPage,
        search: debouncedSearch,
      });
      // PERBAIKAN: Mengembalikan `response.data` agar cocok dengan tipe `EvaluasiApiResponse`
      return response.data;
    },
    // PERBAIKAN: Menggunakan `placeholderData` untuk TanStack Query v5
    placeholderData: keepPreviousData,
  });

  // --- Event Handlers ---
  const handleUrlChange = (paramName: string, value: string) => {
    const newSearchParams = new URLSearchParams(searchParam);
    if (value) {
      newSearchParams.set(paramName, value);
    } else {
      newSearchParams.delete(paramName);
    }
    if (paramName !== "page") newSearchParams.set("page", "1");
    setSearchParam(newSearchParams);
  };

  // --- Effects ---
  useEffect(() => {
    handleUrlChange("search", debouncedSearch);
  }, [debouncedSearch]);

  useEffect(() => {
    if (!searchParam.has("page")) {
      handleUrlChange("page", "1");
    }
  }, []);

  const evaluatorInfo = useMemo(() => {
    if (!data?.evaluator) return [];
    const {
      nama_lengkap,
      unit_kerja,
      status,
      jab_akademik,
      job_fungsional,
      jab_struktural,
      pendidikan,
    } = data.evaluator;
    return [
      { label: "Nama", value: nama_lengkap },
      { label: "Unit Kerja", value: unit_kerja },
      { label: "Status", value: status },
      { label: "Jab. Akademik", value: jab_akademik },
      { label: "Jab. Fungsional", value: job_fungsional },
      { label: "Jab. Struktural", value: jab_struktural },
      { label: "Pendidikan", value: pendidikan },
    ];
  }, [data?.evaluator]);

  if (isLoading && !data) {
    return (
      <div className="mt-10 mb-20 space-y-6">
        <Title title="Evaluasi Kinerja" subTitle="Data Evaluasi Kinerja" />
        <Skeleton className="h-40 w-full" />
        <div className="mt-10 space-y-2">
          <Skeleton className="h-10 w-80" />
          <Skeleton className="h-12 w-full" />
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mt-10 mb-20 text-center">
        <Title title="Evaluasi Kinerja" subTitle="Data Evaluasi Kinerja" />
        <p className="mt-10 text-red-500">
          Gagal memuat data: {(error as Error).message}
        </p>
      </div>
    );
  }

  return (
    <div className="mt-10 mb-20">
      <Title title="Evaluasi Kinerja" subTitle="Data Evaluasi Kinerja" />

      {/* PERBAIKAN: 'title' prop dihapus dari InfoList */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Informasi Evaluator
        </h2>
      </div>
      <InfoList items={evaluatorInfo} />

      <div className="mt-6 w-full md:w-80">
        <SearchInput
          value={searchData}
          onChange={(e) => setSearchData(e.target.value)}
          placeholder="Cari NIP atau Nama Pegawai..."
        />
      </div>

      <div className="mt-5 border rounded-lg">
        <Table className="table-auto text-xs lg:text-sm">
          <TableHeader>
            <TableRow className="bg-[#004680]">
              <TableHead className="text-center text-white">NIP</TableHead>
              <TableHead className="text-white">Nama Pegawai</TableHead>
              <TableHead className="text-white">Unit Kerja</TableHead>
              <TableHead className="text-center text-white">
                Fungsional
              </TableHead>
              <TableHead className="text-center text-white">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* PERBAIKAN: Path data disesuaikan menjadi data.data */}
            {
              // @ts-ignore
              data?.data?.length > 0 ? (
                data?.data.map((item) => {
                  const evaluationUrl =
                    item.fungsional === "Dosen"
                      ? `/operasional/evaluasi-kerja/form-evaluasi-kerja-dosen/${item.id}`
                      : `/operasional/evaluasi-kerja/form-evaluasi-kerja-pegawai/${item.id}`;

                  return (
                    <TableRow key={item.id} className="even:bg-gray-50">
                      <TableCell className="text-center">{item.nip}</TableCell>
                      <TableCell>{item.nama_pegawai}</TableCell>
                      <TableCell>{item.unit_kerja}</TableCell>
                      <TableCell className="text-center">
                        {item.fungsional}
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-center items-center w-full h-full">
                          <Link to={evaluationUrl}>
                            <Button size="icon" variant="ghost">
                              <MdEdit className="w-5 h-5 text-yellow-500" />
                            </Button>
                          </Link>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center h-48">
                    Tidak ada data untuk dievaluasi.
                  </TableCell>
                </TableRow>
              )
            }
          </TableBody>
        </Table>
      </div>

      {/* PERBAIKAN: Path pagination disesuaikan */}
      {data?.data && data.data.length > 0 && (
        <CustomPagination
          currentPage={data.pagination.current_page}
          totalPages={data.pagination.last_page}
          onPageChange={(page) => handleUrlChange("page", String(page))}
          hasNextPage={data.pagination.current_page < data.pagination.last_page}
          hasPrevPage={data.pagination.current_page > 1}
        />
      )}
    </div>
  );
};

export default EvaluasiKerja;
