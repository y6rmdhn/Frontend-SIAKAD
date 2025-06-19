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

interface DiklatDetail {
    jenis_diklat: string;
    kategori_diklat: string;
    tingkat_diklat: string;
    nama_diklat: string;
    penyelenggara: string;
    peran: string;
    jumlah_jam: number;
    no_sertifikat: string;
    tahun_penyelenggaraan: number;
    tempat: string;
    tgl_mulai: string; // ISO string date
    tgl_selesai: string; // ISO string date
    sk_penugasan: string | null;
    status_pengajuan: string;
    timestamps: {
        tgl_diajukan: string; // ISO string date
        tgl_disetujui: string | null; // ISO string date or null
    };
}

interface PegawaiInfo {
    nama: string;
}

interface DetailDiklatApiResponse {
    data: DiklatDetail;
    pegawai: PegawaiInfo;
}

// --- END DEFINISI TIPE ---

const DetailDataDiklat = () => {
    const params = useParams<{ id: string }>();

    // get data
    const { data, isLoading, isError } = useQuery<DetailDiklatApiResponse>({
        queryKey: ["detail-diklat-dosen", params.id],
        queryFn: async () => {
            // FIX: Memastikan params.id ada sebelum memanggil service
            if (!params.id) {
                throw new Error("ID Diklat tidak ditemukan di URL");
            }
            const response = await dosenServices.getDiklatDetail(params.id);
            return response.data;
        },
        // Query hanya akan berjalan jika params.id ada
        enabled: !!params.id,
    });

    // Menampilkan state loading
    if (isLoading) {
        return (
            <div className="mt-10 mb-20">
                <Title title="Riwayat Diklat" subTitle="Detail Riwayat Diklat" />
                <CustomCard>
                    <div className="p-6 space-y-4">
                        <Skeleton className="h-10 w-48 self-end" />
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <div className="space-y-4">
                                {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-8 w-full" />)}
                            </div>
                            <div className="space-y-4">
                                {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-8 w-full" />)}
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
                Gagal memuat detail data diklat.
            </div>
        );
    }

    return (
        <div className="mt-10 mb-20">
            <Title title="Riwayat Diklat" subTitle="Detail Riwayat Diklat" />

            <CustomCard
                actions={
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-end">
                            <Link
                                className="w-full md:w-auto"
                                to="/data-riwayat/kualifikasi/diklat"
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
                                    <Label className="text-[#2572BE] text-xs sm:text-sm">
                                        Jenis Diklat
                                    </Label>
                                    <Label className="text-xs sm:text-sm">
                                        {data?.data.jenis_diklat || "-"}
                                    </Label>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className="text-[#2572BE] text-xs sm:text-sm">
                                        Kategori Kegiatan
                                    </Label>
                                    <Label className="text-xs sm:text-sm">
                                        {data?.data.kategori_diklat || "-"}
                                    </Label>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className=" text-[#2572BE] text-xs sm:text-sm">
                                        Tingkat Diklat
                                    </Label>
                                    <Label className="text-xs sm:text-sm">
                                        {data?.data.tingkat_diklat || "-"}
                                    </Label>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className="text-[#2572BE] text-xs sm:text-sm">
                                        Nama Diklat
                                    </Label>
                                    <Label className="text-xs sm:text-sm ">
                                        {data?.data.nama_diklat || "-"}
                                    </Label>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className=" text-[#2572BE] text-xs sm:text-sm">
                                        Penyelenggara
                                    </Label>
                                    <Label className="text-xs sm:text-sm ">
                                        {data?.data.penyelenggara || "-"}
                                    </Label>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className="text-[#2572BE] text-xs sm:text-sm">
                                        Peran
                                    </Label>
                                    <Label className="text-xs sm:text-sm">
                                        {data?.data.peran || "-"}
                                    </Label>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className="text-[#2572BE] text-xs sm:text-sm">
                                        Jumlah Jam
                                    </Label>
                                    <Label className="text-xs sm:text-sm">
                                        {data?.data.jumlah_jam} Jam
                                    </Label>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className="text-[#2572BE] text-xs sm:text-sm">
                                        Nomor Sertifikat
                                    </Label>
                                    <Label className="text-xs sm:text-sm">
                                        {data?.data.no_sertifikat || "-"}
                                    </Label>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className="text-[#2572BE] text-xs sm:text-sm">
                                        Tahun Penyelenggara
                                    </Label>
                                    <Label className="text-xs sm:text-sm">
                                        {data?.data.tahun_penyelenggaraan || "-"}
                                    </Label>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className="text-[#2572BE] text-xs sm:text-sm">
                                        Tempat
                                    </Label>
                                    <Label className="text-xs sm:text-sm">
                                        {data?.data.tempat || "-"}
                                    </Label>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className=" text-[#2572BE] text-xs sm:text-sm">
                                        Tanggal Mulai
                                    </Label>
                                    <Label className="text-xs sm:text-sm">
                                        {data?.data.tgl_mulai
                                            ? format(parseISO(data.data.tgl_mulai), "dd MMMM yyyy")
                                            : "-"}
                                    </Label>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className="text-[#2572BE] text-xs sm:text-sm">
                                        Tanggal Selesai
                                    </Label>
                                    <Label className="text-xs sm:text-sm">
                                        {data?.data.tgl_selesai
                                            ? format(parseISO(data.data.tgl_selesai), "dd MMMM yyyy")
                                            : "-"}
                                    </Label>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className="text-[#2572BE] text-xs sm:text-sm">
                                        SK Penugasan
                                    </Label>
                                    <Label className="text-xs sm:text-sm ">
                                        {data?.data.sk_penugasan || "-"}
                                    </Label>
                                </div>
                            </div>

                            {/* KANAN */}
                            <div className="space-y-2">
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className="text-[#2572BE] text-xs sm:text-sm">
                                        Status Pengajuan
                                    </Label>
                                    <Label className="text-xs sm:text-sm">
                                        {data?.data.status_pengajuan || "-"}
                                    </Label>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className="text-[#2572BE] text-xs sm:text-sm">
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
                                    <Label className="text-[#2572BE] text-xs sm:text-sm">
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
                                    <Label className="text-[#2572BE] text-xs sm:text-sm">
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

export default DetailDataDiklat;

