import Title from "@/components/blocks/Title";
import { Button } from "@/components/ui/button";
import CustomCard from "@/components/blocks/Card";
import { Label } from "@/components/ui/label";
import { MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import dosenServices from "@/services/dosen.services.ts";
import { Skeleton } from "@/components/ui/skeleton";
import { FiCheckCircle, FiXCircle, FiArrowRight } from "react-icons/fi";

// --- Tipe Data ---
interface TahapanRiwayatDetail {
    key: string;
    label: string;
    sudah_diisi: boolean;
    jumlah_record: number;
}

interface TahapanRiwayat {
    is_lengkap: boolean;
    persentase: number;
    total_kategori: number;
    total_terisi: number;
    pesan: string;
    detail: TahapanRiwayatDetail[];
}

// --- Peta key API → route dan grup ---
const KEY_TO_ROUTE: Record<string, string> = {
    data_hubungan_kerja: "/data-riwayat/kepegawaian/hubungan-kerja",
    data_jabatan_fungsional: "/data-riwayat/kepegawaian/jabatan-fungsional",
    data_jabatan_struktural: "/data-riwayat/kepegawaian/jabatan-struktural",
    data_keluarga: "/data-riwayat/keluarga/pasangan",
    data_pangkat: "/data-riwayat/kepegawaian/pangkat",
    data_pendidikan_formal: "/data-riwayat/kualifikasi/pendidikan-formal",
    data_sertifikasi: "/data-riwayat/kompetensi/sertifikasi",
    data_riwayat_pekerjaan: "/data-riwayat/kualifikasi/riwayat-pekerjaan",
};

// Grup statis untuk menampilkan kategori section
interface StepSection {
    title: string;
    keys: string[];
}

const STEP_SECTIONS: StepSection[] = [
    {
        title: "Keluarga",
        keys: ["data_keluarga"],
    },
    {
        title: "Kepegawaian",
        keys: [
            "data_pangkat",
            "data_jabatan_fungsional",
            "data_jabatan_struktural",
            "data_hubungan_kerja",
        ],
    },
    {
        title: "Kualifikasi",
        keys: [
            "data_pendidikan_formal",
            "data_riwayat_pekerjaan",
        ],
    },
    {
        title: "Kompetensi",
        keys: ["data_sertifikasi"],
    },
];

// --- Komponen utama ---
const TahapanDataRiwayat = () => {
    const { data: tahapanRiwayat, isLoading } = useQuery<TahapanRiwayat>({
        queryKey: ["tahapan-riwayat"],
        queryFn: () =>
            dosenServices
                .getTahapanRiwayat()
                .then((res) => res.data.data.persentase_riwayat),
    });

    const progress = tahapanRiwayat?.persentase ?? 0;
    const isLengkap = tahapanRiwayat?.is_lengkap ?? false;

    // Buat map key → detail untuk lookup cepat
    const detailMap = new Map<string, TahapanRiwayatDetail>(
        (tahapanRiwayat?.detail ?? []).map((d) => [d.key, d])
    );

    return (
        <div className="mt-10 mb-10">
            <Title title="Tahapan Data Riwayat" />

            {/* Banner progress */}
            <CustomCard
                cardStyle={`${isLengkap ? "bg-[#106D63]" : "bg-[#D22D17]"} text-white rounded-md shadow p-0 pt-3`}
                actions={
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start">
                            {/* Circular progress */}
                            <div className="relative w-16 h-16 sm:w-20 sm:h-20 lg:w-16 lg:h-16 shrink-0">
                                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                                    <path
                                        strokeWidth="3.6"
                                        stroke="rgba(255,255,255,0.3)"
                                        fill="none"
                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    />
                                    <path
                                        strokeWidth="3.6"
                                        strokeDasharray={`${progress}, 100`}
                                        stroke="white"
                                        fill="none"
                                        strokeLinecap="round"
                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center text-xl font-bold">
                                    {isLoading ? "..." : `${progress}%`}
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <Label className="font-semibold text-sm lg:text-base">
                                    {isLoading
                                        ? "Memuat data..."
                                        : isLengkap
                                            ? "Data Riwayat Anda Sudah Lengkap 🎉"
                                            : "Anda Belum Menyelesaikan Tahapan Data Riwayat"}
                                </Label>
                                {!isLoading && tahapanRiwayat && (
                                    <>
                                        <div className="text-xs lg:text-sm text-white/90">
                                            {tahapanRiwayat.total_terisi} dari {tahapanRiwayat.total_kategori} kategori telah terisi.
                                        </div>
                                        <div className="text-xs text-white/80 text-justify sm:text-start max-w-md">
                                            {tahapanRiwayat.pesan}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {!isLengkap && (
                            <div className="w-full md:w-auto">
                                <Link to="/data-riwayat/keluarga/pasangan">
                                    <Button className="w-full md:w-auto bg-[#E7E7E7] text-[#D22D17]">
                                        Mulai Setting
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>
                }
            />

            <Label className="text-[#0B73B9] font-semibold text-sm sm:text-lg mb-2 mt-5 block">
                Tahapan Data Riwayat
            </Label>
            <Label className="mb-6 text-xs sm:text-sm text-gray-600 block">
                Silahkan perhatikan dan ikuti semua langkah yang ada di bawah ini untuk dapat melakukan Tahapan Data Riwayat dengan baik dan benar.
            </Label>

            {isLoading ? (
                <div className="space-y-4 mt-4">
                    {[...Array(4)].map((_, i) => (
                        <Skeleton key={i} className="h-16 w-full rounded-xl" />
                    ))}
                </div>
            ) : (
                STEP_SECTIONS.map((section, idx) => {
                    // Ambil item detail dari API yang masuk ke section ini
                    const sectionItems = section.keys
                        .map((key) => detailMap.get(key))
                        .filter(Boolean) as TahapanRiwayatDetail[];

                    return (
                        <div className="mb-6" key={idx}>
                            {/* Section header */}
                            <div className="flex items-center gap-3 mb-5">
                                <div className="border border-[#0B73B9] p-3 rounded-full">
                                    <div className="w-6 h-6 flex items-center justify-center bg-blue-500 text-white rounded-full text-sm">
                                        <MdEdit />
                                    </div>
                                </div>
                                <Label className="text-lg font-semibold text-gray-800">{section.title}</Label>
                            </div>

                            {sectionItems.length > 0 ? (
                                <ol className="space-y-3 pl-16">
                                    {sectionItems.map((item, index) => {
                                        const route = KEY_TO_ROUTE[item.key];
                                        return (
                                            <li key={item.key}>
                                                <Link
                                                    to={route ?? "#"}
                                                    className="flex items-start gap-3 group hover:bg-gray-50 rounded-lg p-2 -ml-2 transition-colors"
                                                >
                                                    {/* Number + icon */}
                                                    <div className="flex items-center gap-2 shrink-0 mt-0.5">
                                                        <span className="text-sm text-gray-500">{index + 1}.</span>
                                                        {item.sudah_diisi ? (
                                                            <FiCheckCircle className="w-4 h-4 text-green-500" />
                                                        ) : (
                                                            <FiXCircle className="w-4 h-4 text-red-400" />
                                                        )}
                                                    </div>

                                                    {/* Label + record count */}
                                                    <div className="flex-1">
                                                        <div className="flex items-center justify-between gap-2">
                                                            <span className={`text-sm font-medium group-hover:text-[#106D63] transition-colors ${item.sudah_diisi ? "text-gray-800" : "text-red-500"}`}>
                                                                {item.label}
                                                            </span>
                                                            <div className="flex items-center gap-1 text-xs shrink-0">
                                                                {item.sudah_diisi ? (
                                                                    <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                                                                        {item.jumlah_record} data
                                                                    </span>
                                                                ) : (
                                                                    <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-medium">
                                                                        Belum diisi
                                                                    </span>
                                                                )}
                                                                <FiArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#106D63] transition-colors" />
                                                            </div>
                                                        </div>
                                                        <div className="text-xs text-gray-500 mt-0.5">
                                                            Klik untuk mengisi atau melihat data {item.label}
                                                        </div>
                                                    </div>
                                                </Link>
                                            </li>
                                        );
                                    })}
                                    {/* Fallback jika section ada tapi tidak ada key di response API */}
                                    {sectionItems.length === 0 && (
                                        <li className="text-xs text-gray-400 pl-6">Data belum tersedia</li>
                                    )}
                                </ol>
                            ) : (
                                <p className="text-xs text-gray-400 pl-16">Data belum tersedia dari server.</p>
                            )}
                        </div>
                    );
                })
            )}
        </div>
    );
};

export default TahapanDataRiwayat;
