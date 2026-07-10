import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { toast } from "sonner";

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
import { MdEdit, MdDelete } from "react-icons/md";

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

interface EvaluasiTransaction {
  id: string;
  pegawai_dinilai_id: string;
  pegawai_penilai_id: string;
  pegawai_atasan_id: string;
  template_id: string;
  total_skor: number | null;
  periode_start: string;
  periode_end: string;
  pegawaiDinilai?: {
    id: string;
    nama: string;
    nip: string;
  };
  pegawaiPenilai?: {
    id: string;
    nama: string;
    nip: string;
  };
  pegawaiAtasan?: {
    id: string;
    nama: string;
    nip: string;
  };
  EvaluasiTemplate?: {
    id: string;
    name: string;
  };
}

interface EvaluasiApiResponse {
  success: boolean;
  evaluator?: Evaluator;
  data: EvaluasiTransaction[];
  pagination?: {
    current_page: number;
    last_page: number;
  };
}

const formatIndonesianDate = (dateStr: string) => {
  if (!dateStr) return "-";
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    const months = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  } catch (error) {
    return dateStr;
  }
};

const EvaluasiKerja = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const queryClient = useQueryClient();

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
      return response.data;
    },
    placeholderData: keepPreviousData,
  });

  // --- Delete Mutation ---
  const { mutate: deleteEval } = useMutation({
    mutationFn: (id: string) => dosenServices.deleteEvaluasiKinerja(id),
    onSuccess: () => {
      toast.success("Evaluasi berhasil dihapus.");
      queryClient.invalidateQueries({ queryKey: ["evaluasi-kinerja-dosen"] });
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Gagal menghapus evaluasi.");
    },
  });

  const handleDelete = (id: string) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus evaluasi ini?")) {
      deleteEval(id);
    }
  };

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

  // Handle both dynamic list shapes
  const transactions = Array.isArray(data?.data) ? data.data : [];

  return (
    <div className="mt-10 mb-20">
      <Title title="Evaluasi Kinerja" subTitle="Data Evaluasi Kinerja" />

      {evaluatorInfo.length > 0 && (
        <>
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Informasi Evaluator
            </h2>
          </div>
          <InfoList items={evaluatorInfo} />
        </>
      )}

      <div className="mt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="w-full md:w-80">
          <SearchInput
            value={searchData}
            onChange={(e) => setSearchData(e.target.value)}
            placeholder="Cari NIP atau Nama Pegawai..."
          />
        </div>
        <Link to="/operasional/evaluasi-kerja/penilaian">
          <Button className="bg-[#FDA31A] hover:bg-[#e08c10] text-white">
            Evaluasi Pegawai
          </Button>
        </Link>
      </div>

      <div className="mt-5 border rounded-lg">
        <Table className="table-auto text-xs lg:text-sm">
          <TableHeader>
            <TableRow className="bg-[#004680]">
              <TableHead className="text-center text-white">NIP</TableHead>
              <TableHead className="text-white">Nama Pegawai</TableHead>
              <TableHead className="text-white">Jenis Template</TableHead>
              <TableHead className="text-center text-white">Periode</TableHead>
              <TableHead className="text-center text-white">Status / Skor</TableHead>
              <TableHead className="text-center text-white">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.length > 0 ? (
              transactions.map((item) => {
                const isDosen = item.EvaluasiTemplate?.name?.toLowerCase().includes("dosen");
                const evaluationUrl = isDosen
                  ? `/operasional/evaluasi-kerja/form-evaluasi-kerja-dosen/${item.id}`
                  : `/operasional/evaluasi-kerja/form-evaluasi-kerja-pegawai/${item.id}`;

                return (
                  <TableRow key={item.id} className="even:bg-gray-50">
                    <TableCell className="text-center">{item.pegawaiDinilai?.nip || "-"}</TableCell>
                    <TableCell>{item.pegawaiDinilai?.nama || "-"}</TableCell>
                    <TableCell>{item.EvaluasiTemplate?.name || "-"}</TableCell>
                    <TableCell className="text-center text-xs">
                      {formatIndonesianDate(item.periode_start)} s/d {formatIndonesianDate(item.periode_end)}
                    </TableCell>
                    <TableCell className="text-center">
                      {item.total_skor !== null ? (
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                          Selesai ({item.total_skor})
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">
                          Draft
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center items-center gap-2 w-full h-full">
                        <Link to={evaluationUrl}>
                          <Button size="icon" variant="ghost" title="Input Nilai">
                            <MdEdit className="w-5 h-5 text-yellow-500" />
                          </Button>
                        </Link>
                        {item.total_skor === null && (
                          <Button
                            size="icon"
                            variant="ghost"
                            title="Hapus Penilaian"
                            onClick={() => handleDelete(item.id)}
                          >
                            <MdDelete className="w-5 h-5 text-red-500" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center h-48">
                  Tidak ada data untuk dievaluasi.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {data?.pagination && data.pagination.last_page > 1 && (
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
