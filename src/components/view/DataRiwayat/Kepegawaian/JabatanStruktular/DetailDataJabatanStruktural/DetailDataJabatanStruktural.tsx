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

interface JabatanStrukturalDetail {
    jenis_jabatan_struktural: string;
    no_sk: string;
    tgl_sk: string; // ISO string date
    tgl_mulai: string; // ISO string date
    tgl_selesai: string; // ISO string date
    pejabat_penetap: string;
    status_pengajuan: string;
    timestamps: {
        tgl_diajukan: string; // ISO string date
        tgl_disetujui: string | null; // ISO string date or null
    };
}

interface PegawaiInfo {
    nama: string;
}

interface DetailJabatanStrukturalApiResponse {
    data: JabatanStrukturalDetail;
    pegawai: PegawaiInfo;
}

// --- END DEFINISI TIPE ---

const DetailDataJabatanStruktural = () => {
    const params = useParams<{ id: string }>();

    // get data
    const { data, isLoading, isError } = useQuery<DetailJabatanStrukturalApiResponse>({
        queryKey: ["detail-jabatan-struktural-dosen", params.id],
        queryFn: async () => {
            // FIX: Memastikan params.id ada sebelum memanggil service
            if (!params.id) {
                throw new Error("ID Jabatan Struktural tidak ditemukan di URL");
            }
            const response = await dosenServices.getJabatanStrukturalDetail(params.id);
            return response.data;
        },
        // Query hanya akan berjalan jika params.id ada
        enabled: !!params.id,
    });

    // Menampilkan state loading
    if (isLoading) {
        return (
            <div className="mt-10 mb-20">
                <Title title="Data Jabatan Struktural" subTitle="Detail Jabatan Struktural" />
                <CustomCard>
                    <div className="p-6 space-y-4">
                        <Skeleton className="h-10 w-48 self-end" />
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <div className="space-y-4">
                                <Skeleton className="h-8 w-full" />
                                <Skeleton className="h-8 w-full" />
                                <Skeleton className="h-8 w-full" />
                            </div>
                            <div className="space-y-4">
                                <Skeleton className="h-8 w-full" />
                                <Skeleton className="h-8 w-full" />
                                <Skeleton className="h-8 w-full" />
                            </div>
                        </div>
                    </div>
                </CustomCard>
            </div>
        );
    }

    // Menampilkan state error
    if (isError) {
        return (
            <div className="mt-10 mb-20 text-center text-red-500">
                Gagal memuat detail data jabatan struktural.
            </div>
        );
    }

    return (
        <div className="mt-10 mb-20">
            <Title title="Data Jabatan Struktural" subTitle="Detail Jabatan Struktural" />

            <CustomCard
                actions={
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-end">
                            <Link
                                className="w-full md:w-auto"
                                to="/data-riwayat/kepegawaian/jabatan-struktural"
                            >
                                <Button className="bg-[#3ABC67] w-full md:w-auto hover:bg-hover-blue-200">
                                    <IoIosArrowBack /> Kembali ke Daftar
                                </Button>
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 border border-black rounded-lg p-4">
                            {/* KIRI */}
                            <div className="space-y-2">
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-38">
                                        Jabatan Struktural
                                    </Label>
                                    <Label className="text-xs sm:text-sm">
                                        {data?.data.jenis_jabatan_struktural || "-"}
                                    </Label>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-38">
                                        No. SK
                                    </Label>
                                    <Label className="text-xs sm:text-sm">
                                        {data?.data.no_sk || "-"}
                                    </Label>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-38">
                                        Tgl. SK
                                    </Label>
                                    <Label className="text-xs sm:text-sm">
                                        {data?.data.tgl_sk
                                            ? format(parseISO(data.data.tgl_sk), "dd MMMM yyyy")
                                            : "-"}
                                    </Label>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-38">
                                        Tgl. Mulai
                                    </Label>
                                    <Label className="text-xs sm:text-sm">
                                        {data?.data.tgl_mulai
                                            ? format(parseISO(data.data.tgl_mulai), "dd MMMM yyyy")
                                            : "-"}
                                    </Label>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-38">
                                        Tgl. Selesai
                                    </Label>
                                    <Label className="text-xs sm:text-sm">
                                        {data?.data.tgl_selesai
                                            ? format(parseISO(data.data.tgl_selesai), "dd MMMM yyyy")
                                            : "-"}
                                    </Label>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-38">
                                        Pejabat Penetap
                                    </Label>
                                    <Label className="text-xs sm:text-sm">
                                        {data?.data.pejabat_penetap || "-"}
                                    </Label>
                                </div>
                            </div>

                            {/* KANAN */}
                            <div className="space-y-2">
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-38">
                                        Status Pengajuan
                                    </Label>
                                    <Label className="text-xs sm:text-sm">
                                        {data?.data.status_pengajuan || "-"}
                                    </Label>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-38">
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
                                    <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-38">
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
                                    <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-38">
                                        Dibuat Oleh
                                    </Label>
                                    <Label className="text-xs sm:text-sm">
                                        {data?.pegawai.nama || "-"}
                                    </Label>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            />
        </div>
    );
};

export default DetailDataJabatanStruktural;
