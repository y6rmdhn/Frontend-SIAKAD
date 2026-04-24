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

// Skema disesuaikan dengan DB backend baru
interface Dokumen {
    id: string;
    file_name: string;
    kategori_dokumen: string;
    url: string;
}

interface HubunganKerjaDetail {
    hubungan_kerja?: { id: string; nama: string };
    nama_hubungan_kerja?: string; // fallback flat field
    no_sk: string;
    tgl_sk: string;
    tgl_mulai: string;
    tgl_selesai: string;
    pejabat_penetap?: string | null;
    status: string;          // 'draft' | 'diajukan' | 'disetujui' | 'ditolak'
    tgl_disetujui?: string | null;
    tgl_ditolak?: string | null;
    pegawai: { nip: string; nama: string; }
    dokumen?: Dokumen[];
}

interface PegawaiInfo {
    nama: string;
}

interface DetailHubunganKerjaApiResponse {
    data: HubunganKerjaDetail;
    pegawai?: PegawaiInfo;
}

const DetailDataHubunganKerja = () => {
    const params = useParams<{ id: string }>();

    // get data
    const { data, isLoading, isError } = useQuery<DetailHubunganKerjaApiResponse>({
        queryKey: ["detail-hubungan-kerja-dosen", params.id],
        queryFn: async () => {
            // FIX: Memastikan params.id ada sebelum memanggil service
            if (!params.id) {
                throw new Error("ID Hubungan Kerja tidak ditemukan di URL");
            }
            const response = await dosenServices.getHubunganKerjaDetail(params.id);
            // response.data bisa berupa { data: {...}, pegawai: {...} }
            return response.data?.data ? response.data : { data: response.data };
        },
        // Query hanya akan berjalan jika params.id ada
        enabled: !!params.id,
    });

    // Menampilkan state loading
    if (isLoading) {
        return (
            <div className="mt-10 mb-20">
                <Title title="Data Hubungan Kerja" subTitle="Detail Hubungan Kerja" />
                <CustomCard>
                    <div className="p-6 space-y-4">
                        <Skeleton className="h-8 w-1/3" />
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
        )
    }

    // Menampilkan state error
    if (isError) {
        return (
            <div className="mt-10 mb-20 text-center text-red-500">
                Gagal memuat detail data hubungan kerja.
            </div>
        )
    }

    return (
        <div className="mt-10 mb-20">
            <Title title="Data Hubungan Kerja" subTitle="Detail Hubungan Kerja" />

            <CustomCard
                actions={
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-end">
                            <Link
                                className="w-full md:w-auto"
                                to="/data-riwayat/kepegawaian/hubungan-kerja"
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
                                        Hubungan Kerja
                                    </Label>
                                    <Label className="text-xs sm:text-sm">
                                        {data?.data?.hubungan_kerja?.nama || data?.data?.nama_hubungan_kerja || "-"}
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
                                {/*
                                  Pejabat Penetap — sekarang ada di DB baru (allowNull: true)
                                */}
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-38">
                                        Pejabat Penetap
                                    </Label>
                                    <Label className="text-xs sm:text-sm">
                                        {data?.data.pejabat_penetap || "-"}
                                    </Label>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-38">
                                        Status Aktif
                                    </Label>
                                    <Label className="text-xs sm:text-sm">
                                        {data?.data.status || "-"}
                                    </Label>
                                </div>
                            </div>

                            {/* KANAN */}
                            <div className="space-y-2">
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className="text-[#2572BE] font-semibold text-xs sm:text-sm shrink-0 w-38">
                                        Status Pengajuan
                                    </Label>
                                    <Label className="text-xs sm:text-sm">
                                        {data?.data.status || "-"}
                                    </Label>
                                </div>
                                {/* Tanggal Disetujui */}
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className="text-[#2572BE] font-semibold text-xs sm:text-sm shrink-0 w-38">
                                        Tanggal Disetujui
                                    </Label>
                                    <Label className="text-xs sm:text-sm">
                                        {data?.data.tgl_disetujui
                                            ? format(parseISO(data.data.tgl_disetujui), "dd MMMM yyyy")
                                            : "-"}
                                    </Label>
                                </div>
                                {/* Tanggal Ditolak */}
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className="text-[#2572BE] font-semibold text-xs sm:text-sm shrink-0 w-38">
                                        Tanggal Ditolak
                                    </Label>
                                    <Label className="text-xs sm:text-sm">
                                        {data?.data.tgl_ditolak
                                            ? format(parseISO(data.data.tgl_ditolak), "dd MMMM yyyy")
                                            : "-"}
                                    </Label>
                                </div>
                                {/* Dibuat oleh */}
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className="text-[#2572BE] font-semibold text-xs sm:text-sm shrink-0 w-38">
                                        Dibuat Oleh
                                    </Label>
                                    <Label className="text-xs sm:text-sm">
                                        {data?.data?.pegawai?.nama || "-"}
                                    </Label>
                                </div>
                                {/* Dokumen — struktur baru dari API */}
                                {data?.data.dokumen && data.data.dokumen.length > 0 && (
                                    <div className="flex flex-col gap-2 border-b p-2">
                                        <Label className="text-[#2572BE] font-semibold text-xs sm:text-sm">
                                            Dokumen
                                        </Label>
                                        <div className="flex flex-col gap-1">
                                            {data.data.dokumen.map((doc) => (
                                                <a
                                                    key={doc.id}
                                                    href={doc.url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="text-blue-600 hover:underline text-xs sm:text-sm flex items-center gap-1"
                                                >
                                                    📄 {doc.file_name}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                }
            />
        </div>
    );
};

export default DetailDataHubunganKerja;
