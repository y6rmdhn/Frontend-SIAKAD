import Title from "@/components/blocks/Title";
import CustomCard from "@/components/blocks/Card";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { IoIosArrowBack } from "react-icons/io";
import { Label } from "@/components/ui/label";
import { useQuery } from "@tanstack/react-query";
import dosenServices from "@/services/dosen.services.ts";
import { parseISO, format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

// --- START DEFINISI TIPE ---

interface AnakDetail {
    nama: string;
    tempat_lahir: string;
    tgl_lahir: string; // ISO string date
    jenis_kelamin: "Laki-Laki" | "Perempuan";
    anak_ke: number;
    pekerjaan_anak: string | null;
    status_pengajuan: string;
    timestamps: {
        tgl_diajukan: string; // ISO string date
        tgl_disetujui: string | null; // ISO string date or null
    };
}

interface PegawaiInfo {
    nama: string;
}

interface DetailAnakApiResponse {
    data: AnakDetail;
    pegawai: PegawaiInfo;
}

// --- END DEFINISI TIPE ---

const DetailDataAnak = () => {
    const params = useParams<{ id: string }>();

    // get data
    const { data, isLoading, isError } = useQuery<DetailAnakApiResponse>({
        queryKey: ["detail-anak-dosen", params.id],
        queryFn: async () => {
            // FIX: Memastikan params.id ada sebelum memanggil service
            if (!params.id) {
                throw new Error("ID Anak tidak ditemukan di URL");
            }
            const response = await dosenServices.getDataAnakDetail(params.id);
            return response.data;
        },
        // Query hanya akan berjalan jika params.id ada
        enabled: !!params.id,
    });

    // Menampilkan state loading
    if (isLoading) {
        return (
            <div className="mt-10 mb-20">
                <Title title="Data Anak" subTitle="Detail Anak" />
                <CustomCard>
                    <div className="p-6 space-y-4">
                        <Skeleton className="h-8 w-full" />
                        <Skeleton className="h-8 w-full" />
                        <Skeleton className="h-8 w-full" />
                        <Skeleton className="h-8 w-full" />
                    </div>
                </CustomCard>
            </div>
        )
    }

    // Menampilkan state error
    if(isError) {
        return (
            <div className="mt-10 mb-20 text-center text-red-500">
                Gagal memuat detail data anak.
            </div>
        )
    }

    return (
        <div className="mt-10 mb-20">
            <div className="flex flex-col md:flex-row justify-between gap-2">
                <Title title="Data Anak" subTitle="Detail Anak" />
                <Link className="w-full md:w-auto" to="/data-riwayat/keluarga/anak">
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
                                <Label className="font-medium text-[#3F6FA9] text-xs sm:text-sm shrink-0 w-38">
                                    Nama
                                </Label>
                                <Label className="text-xs sm:text-sm">{data?.data.nama || '-'}</Label>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                <Label className="font-medium text-[#3F6FA9] text-xs sm:text-sm shrink-0 w-38">
                                    Tempat Lahir
                                </Label>
                                <Label className="text-xs sm:text-sm">
                                    {data?.data.tempat_lahir || '-'}
                                </Label>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                <Label className="font-medium text-[#3F6FA9] text-xs sm:text-sm shrink-0 w-38">
                                    Tgl Lahir
                                </Label>
                                <Label className="text-xs sm:text-sm">
                                    {data?.data.tgl_lahir
                                        ? format(parseISO(data.data.tgl_lahir), "dd MMMM yyyy")
                                        : "-"}
                                </Label>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                <Label className="font-medium text-[#3F6FA9] text-xs sm:text-sm shrink-0 w-38">
                                    Jenis Kelamin
                                </Label>
                                <Label className="text-xs sm:text-sm">
                                    {data?.data.jenis_kelamin || '-'}
                                </Label>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                <Label className="font-medium text-[#3F6FA9] text-xs sm:text-sm shrink-0 w-38">
                                    Anak Ke
                                </Label>
                                <Label className="text-xs sm:text-sm">{data?.data.anak_ke || '-'}</Label>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                <Label className="font-medium text-[#3F6FA9] text-xs sm:text-sm shrink-0 w-38">
                                    Pekerjaan Anak
                                </Label>
                                <Label className="text-xs sm:text-sm">
                                    {data?.data.pekerjaan_anak || '-'}
                                </Label>
                            </div>
                        </div>

                        {/* KANAN */}
                        <div className="space-y-2">
                            <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                <Label className="text-[#3F6FA9] font-medium text-xs sm:text-sm shrink-0 w-38">
                                    File Akte Kelahiran
                                </Label>
                                <Label className="italic text-gray-400 text-xs sm:text-sm">
                                    [Nullable]
                                </Label>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                <Label className="text-[#3F6FA9] font-medium text-xs sm:text-sm shrink-0 w-38">
                                    Status Pengajuan
                                </Label>
                                <Label className="text-xs sm:text-sm">
                                    {data?.data.status_pengajuan || '-'}
                                </Label>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                <Label className="font-medium text-[#3F6FA9] text-xs sm:text-sm shrink-0 w-38">
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
                                <Label className="font-medium text-[#3F6FA9] text-xs sm:text-sm shrink-0 w-38">
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
                                <Label className="text-[#3F6FA9] font-medium text-xs sm:text-sm shrink-0 w-38">
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

export default DetailDataAnak;
