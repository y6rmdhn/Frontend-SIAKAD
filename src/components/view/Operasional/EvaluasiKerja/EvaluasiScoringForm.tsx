import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { IoIosArrowBack } from "react-icons/io";
import { MdOutlineSave, MdCheckCircle } from "react-icons/md";

// UI Components
import CustomCard from "@/components/blocks/Card";
import Title from "@/components/blocks/Title";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import InfoList from "@/components/blocks/InfoList";

// Services
import dosenServices from "@/services/dosen.services";

interface EvaluasiScoringFormProps {
  evaluasiId: string;
  title: string;
}

interface EvaluasiDetailResponse {
  id: string;
  pegawai_dinilai_id: string;
  pegawai_penilai_id: string;
  pegawai_atasan_id: string;
  template_id: string;
  total_skor: number | null;
  periode_start: string;
  periode_end: string;
  pegawaiDinilai?: { nama: string; nip: string };
  pegawaiPenilai?: { nama: string; nip: string };
  pegawaiAtasan?: { nama: string; nip: string };
  EvaluasiTemplate?: { name: string };
  details: any[];
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

export default function EvaluasiScoringForm({ evaluasiId, title }: EvaluasiScoringFormProps) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [localScores, setLocalScores] = useState<Record<string, string>>({});

  // --- Fetch Detail Evaluasi ---
  const { data: detail, isLoading, isError, error } = useQuery<EvaluasiDetailResponse>({
    queryKey: ["evaluasi-kinerja-detail", evaluasiId],
    queryFn: async () => {
      const res = await dosenServices.getEvaluasiKinerjaDetail(evaluasiId);
      return res.data?.data ?? res.data;
    },
    enabled: !!evaluasiId,
  });

  // --- Mutation to Update Manual Score ---
  const { mutate: updateScore } = useMutation({
    mutationFn: (variables: { itemId: string; nilai: number }) =>
      dosenServices.updateNilaiManual(evaluasiId, variables.itemId, variables.nilai),
    onSuccess: () => {
      toast.success("Nilai berhasil diupdate.");
      queryClient.invalidateQueries({ queryKey: ["evaluasi-kinerja-detail", evaluasiId] });
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Gagal mengupdate nilai.");
    },
  });

  if (isLoading) {
    return (
      <div className="mt-10 mb-20 space-y-6">
        <Title title="Evaluasi Kerja" subTitle={title} />
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (isError || !detail) {
    return (
      <div className="mt-10 mb-20 text-center">
        <Title title="Evaluasi Kerja" subTitle={title} />
        <p className="mt-10 text-red-500">
          Gagal memuat detail evaluasi: {(error as Error)?.message || "Data tidak ditemukan"}
        </p>
      </div>
    );
  }

  const isFinalized = detail.total_skor !== null;

  const infoItems = [
    { label: "Pegawai Dinilai", value: `${detail.pegawaiDinilai?.nip || "-"} — ${detail.pegawaiDinilai?.nama || "-"}` },
    { label: "Evaluator / Penilai", value: `${detail.pegawaiPenilai?.nip || "-"} — ${detail.detailPegawaiPenilai?.nama || detail.pegawaiPenilai?.nama || "-"}` },
    { label: "Atasan Penilai", value: `${detail.pegawaiAtasan?.nip || "-"} — ${detail.pegawaiAtasan?.nama || "-"}` },
    { label: "Periode Evaluasi", value: `${formatIndonesianDate(detail.periode_start)} s/d ${formatIndonesianDate(detail.periode_end)}` },
    { label: "Template Digunakan", value: detail.EvaluasiTemplate?.name || "-" },
  ];

  // --- Handle local input change ---
  const handleScoreChange = (itemId: string, value: string) => {
    setLocalScores((prev) => ({ ...prev, [itemId]: value }));
  };

  // --- Handle input blur / submit ---
  const handleScoreBlur = (itemId: string, currentValue: number | null) => {
    const valStr = localScores[itemId];
    if (valStr === undefined) return; // No change made locally

    const parsed = parseFloat(valStr);
    if (isNaN(parsed) || parsed < 0 || parsed > 100) {
      toast.error("Nilai harus berupa angka antara 0 - 100.");
      // Revert local input value to current value
      setLocalScores((prev) => ({ ...prev, [itemId]: currentValue !== null ? String(currentValue) : "" }));
      return;
    }

    if (parsed !== currentValue) {
      updateScore({ itemId, nilai: parsed });
    }
  };

  // --- Render Recursive Nodes ---
  const renderItemNode = (node: any, depth = 0) => {
    const hasChildren = node.children && node.children.length > 0;
    const isLeaf = !hasChildren;

    // Display value: if parent, use backend calculated average. If leaf, editable input.
    const currentValue = node.nilai !== null ? parseFloat(node.nilai) : null;
    const inputValue = localScores[node.item_id] !== undefined
      ? localScores[node.item_id]
      : (currentValue !== null ? String(currentValue) : "");

    return (
      <div
        key={node.id}
        className="border-b last:border-b-0 py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-gray-50 transition-colors"
        style={{ paddingLeft: `${depth * 1.5}rem` }}
      >
        <div className="flex-1 padding-10">
          <div className="flex items-center gap-2">
            <span className={`font-semibold text-gray-800 ${depth === 0 ? 'text-base' : 'text-sm'}`}>
              {node.item?.name}
            </span>
            {node.item?.bobot_persen !== null && (
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-medium">
                Bobot: {node.item?.bobot_persen}%
              </span>
            )}
            {node.item?.sumber_nilai === "otomatis" && (
              <span className="text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full font-medium">
                Otomatis
              </span>
            )}
          </div>
          {node.item?.keterangan && (
            <p className="text-xs text-gray-500 mt-0.5">{node.item?.keterangan}</p>
          )}
        </div>

        <div className="flex items-center gap-3">
          {isLeaf ? (
            <div className="flex items-center gap-2">
              <input
                type="number"
                disabled={false}
                min="0"
                max="100"
                value={inputValue}
                onChange={(e) => handleScoreChange(node.item_id, e.target.value)}
                onBlur={() => handleScoreBlur(node.item_id, currentValue)}
                placeholder="N/A"
                className={`w-20 px-3 py-1.5 border rounded-md text-center text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${node.item?.sumber_nilai === "otomatis"
                  ? "bg-purple-50 border-purple-200 text-purple-900"
                  : "bg-white border-gray-300 text-gray-900"
                  }`}
              />
              <span className="text-xs text-gray-400">/ 100</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-md border border-blue-100 min-w-16 text-center">
                {currentValue !== null ? currentValue.toFixed(2) : "Draft"}
              </span>
              <span className="text-xs text-gray-400 font-medium">Rata-rata</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderTree = (items: any[], depth = 0) => {
    return items.map((item) => (
      <div key={item.id}>
        {renderItemNode(item, depth)}
        {item.children && item.children.length > 0 && renderTree(item.children, depth + 1)}
      </div>
    ));
  };

  return (
    <div className="mt-10 mb-20 space-y-8">
      <div className="flex justify-between items-center">
        <Title title="Evaluasi Kerja" subTitle={title} />
        {isFinalized && (
          <div className="flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full font-semibold text-sm shadow-sm border border-green-200 animate-pulse">
            <MdCheckCircle className="text-lg text-green-600" />
            Evaluasi Selesai (Skor: {Number(detail.total_skor).toFixed(2)})
          </div>
        )}
      </div>

      {/* --- Informasi Evaluasi --- */}
      <CustomCard>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Informasi Transaksi Evaluasi
          </h2>
        </div>
        <InfoList items={infoItems} />
      </CustomCard>

      {/* --- Tree Scoring Form --- */}
      <CustomCard>
        <div className="mb-6 pb-4 border-b">
          <h3 className="text-lg font-bold text-gray-900">Form Penilaian KPI</h3>
          <p className="text-sm text-gray-500 mt-1">
            Inputkan nilai manual untuk item kriteria di bawah. Nilai rata-rata dan total bobot akan dihitung secara otomatis.
          </p>
        </div>

        <div className="divide-y border rounded-lg bg-white overflow-hidden shadow-sm">
          {renderTree(detail.details)}
        </div>

        <div className="flex justify-between items-center mt-8 pt-6 border-t">
          <Link to="/operasional/evaluasi-kerja">
            <Button variant="outline" className="flex items-center gap-2">
              <IoIosArrowBack />
              Kembali ke List
            </Button>
          </Link>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs text-gray-500 font-medium">TOTAL SKOR AKHIR</p>
              <p className={`text-2xl font-black ${detail.total_skor !== null ? 'text-green-600' : 'text-yellow-600'}`}>
                {detail.total_skor !== null ? Number(detail.total_skor).toFixed(2) : "Belum Lengkap"}
              </p>
            </div>
          </div>
        </div>
      </CustomCard>
    </div>
  );
}
