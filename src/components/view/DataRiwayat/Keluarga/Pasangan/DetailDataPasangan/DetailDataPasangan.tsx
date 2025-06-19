import Title from "@/components/blocks/Title";
import CustomCard from "@/components/blocks/Card";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { IoIosArrowBack } from "react-icons/io";
import { Label } from "@/components/ui/label";
import { useQuery } from "@tanstack/react-query";
import dosenServices from "@/services/dosen.services.ts";
import { format, parseISO } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

// --- START DEFINISI TIPE ---

interface PasanganDetail {
    pasangan_berkerja_dalam_satu_instansi: boolean;
    nama_pasangan: string;
    tempat_lahir: string;
    tgl_lahir: string; // ISO string date
    jenis_pekerjaan: string | null;
    status_pengajuan: string;
    timestamps: {
        tgl_diajukan: string; // ISO string date
        tgl_disetujui: string | null; // ISO string date or null
    };
}

interface PegawaiInfo {
    nama: string;
}

interface DetailPasanganApiResponse {
    data: PasanganDetail;
    pegawai: PegawaiInfo;
}

// --- END DEFINISI TIPE ---

const DetailDataPasangan = () => {
    const params = useParams<{ id: string }>();

    // get data
    const { data, isLoading, isError } = useQuery<DetailPasanganApiResponse>({
        queryKey: ["detail-pasangan-dosen", params.id],
        queryFn: async () => {
            // FIX: Memastikan params.id ada sebelum memanggil service
            if (!params.id) {
                throw new Error("ID Pasangan tidak ditemukan di URL");
            }
            const response = await dosenServices.getDataPasanganDetail(params.id);
            return response.data;
        },
        // Query hanya akan berjalan jika params.id ada
        enabled: !!params.id,
    });

    // Menampilkan state loading
    if (isLoading) {
        return (
            <div className="mt-10 mb-20">
                <Title title="Data Pasangan" subTitle="Detail Pasangan" />
                <CustomCard>
                    <div className="p-6 space-y-4">
                        <Skeleton className="h-8 w-full" />
                        <Skeleton className="h-8 w-full" />
                        <Skeleton className="h-8 w-full" />
                        <Skeleton className="h-8 w-full" />
                    </div>
                </CustomCard>
            </div>
        );
    }

    // Menampilkan state error
    if (isError) {
        return (
            <div className="mt-10 mb-20 text-center text-red-500">
                Gagal memuat detail data pasangan.
            </div>
        );
    }

    return (
        <div className="mt-10 mb-20">
            <div className="flex flex-col md:flex-row justify-between gap-2">
                <Title title="Data Pasangan" subTitle="Detail Pasangan" />
                <Link
                    className="w-full md:w-auto"
                    to="/data-riwayat/keluarga/pasangan"
                >
                    <Button className="bg-[#00C0EF] w-full md:w-auto hover:bg-hover-blue-200">
                        <IoIosArrowBack /> Kembali ke Daftar
                    </Button>
                </Link>
            </div>

            <CustomCard
                actions={
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 border-3 rounded-lg p-4">
                        {/* KIRI */}
                        <div className="space-y-2">
                            <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                <Label className="font-semibold text-[#3F6FA9] text-xs sm:text-sm">
                                    Pasangan Kerja Dalam Satu Instansi?
                                </Label>
                                <Label className="text-xs sm:text-sm">
                                    {data?.data.pasangan_berkerja_dalam_satu_instansi
                                        ? "Ya"
                                        : "Tidak"}
                                </Label>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                <Label className="font-semibold text-[#3F6FA9] text-xs sm:text-sm shrink-0 w-38">
                                    Nama
                                </Label>
                                <Label className="text-xs sm:text-sm">
                                    {data?.data.nama_pasangan || "-"}
                                </Label>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                <Label className="font-semibold text-[#3F6FA9] text-xs sm:text-sm shrink-0 w-38">
                                    Tempat Lahir
                                </Label>
                                <Label className="text-xs sm:text-sm">
                                    {data?.data.tempat_lahir || "-"}
                                </Label>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                <Label className="font-semibold text-[#3F6FA9] text-xs sm:text-sm shrink-0 w-38">
                                    Tgl Lahir
                                </Label>
                                <Label className="text-xs sm:text-sm">
                                    {data?.data.tgl_lahir
                                        ? format(parseISO(data.data.tgl_lahir), "dd MMMM yyyy")
                                        : "-"}
                                </Label>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                <Label className="font-semibold text-[#3F6FA9] text-xs sm:text-sm shrink-0 w-38">
                                    Pekerjaan
                                </Label>
                                <Label className="italic text-gray-400 text-xs sm:text-sm">
                                    {data?.data.jenis_pekerjaan || "-"}
                                </Label>
                            </div>
                        </div>

                        {/* KANAN */}
                        <div className="space-y-2">
                            <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                <Label className="font-semibold text-[#3F6FA9] text-xs sm:text-sm shrink-0 w-38">
                                    Kartu Nikah
                                </Label>
                                <Label className="italic text-gray-400 text-xs sm:text-sm">
                                    [Nullable]
                                </Label>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                <Label className="font-semibold text-[#3F6FA9] text-xs sm:text-sm shrink-0 w-38">
                                    Status Pengajuan
                                </Label>
                                <Label className="text-xs sm:text-sm">
                                    {data?.data.status_pengajuan || "-"}
                                </Label>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                <Label className="font-semibold text-[#3F6FA9] text-xs sm:text-sm shrink-0 w-38">
                                    Tanggal Diajukan
                                </Label>
                                <Label className="text-xs sm:text-sm">
                                    {data?.data.timestamps.tgl_diajukan
                                        ? format(
                                            parseISO(data.data.timestamps.tgl_diajukan),
                                            "dd MMMM yyyy"
                                        )
                                        : "-"}
                                </Label>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                <Label className="font-semibold text-[#3F6FA9] text-xs sm:text-sm shrink-0 w-38">
                                    Tanggal Disetujui
                                </Label>
                                <Label className="text-xs sm:text-sm">
                                    {data?.data.timestamps.tgl_disetujui
                                        ? format(
                                            parseISO(data.data.timestamps.tgl_disetujui),
                                            "dd MMMM yyyy"
                                        )
                                        : "-"}
                                </Label>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                <Label className="font-semibold text-[#3F6FA9] text-xs sm:text-sm shrink-0 w-38">
                                    Dibuat Oleh
                                </Label>
                                <Label className="text-xs sm:text-sm">
                                    {data?.pegawai.nama || "-"}
                                </Label>
                            </div>
                        </div>
                    </div>
                }
            />
        </div>
    );
};

export default DetailDataPasangan;
