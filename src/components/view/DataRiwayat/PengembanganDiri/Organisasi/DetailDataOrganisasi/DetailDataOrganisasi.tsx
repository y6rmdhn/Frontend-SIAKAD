import Title from "@/components/blocks/Title"
import CustomCard from "@/components/blocks/Card";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { IoIosArrowBack } from "react-icons/io";
import { Label } from "@/components/ui/label";
import {useQuery} from "@tanstack/react-query";
import dosenServices from "@/services/dosen.services.ts";

import { format, parseISO } from "date-fns";
import { id } from "date-fns/locale";

const DetailDataOrganisasi = () => {

    const params = useParams();

    const {data, isLoading} = useQuery({
        queryKey: ["detail-organisasi-dosen", params.id],
        queryFn: async () => {
            if (!params.id) return null;
            const response = await dosenServices.getOrganisasiDetail(params.id);
            console.log(response.data)
            return response.data;
        },
        enabled: !!params.id,
    });

    if (isLoading) {
        return (
            <div className="mt-10 mb-20">
                <Title title="Data Organisasi" subTitle="Detail Organisasi" />
                <CustomCard>
                    <div className="flex justify-center items-center p-10">
                        <p>Memuat data...</p>
                    </div>
                </CustomCard>
            </div>
        )
    }

    // --- PERUBAHAN 3: Fungsi helper untuk format tanggal agar lebih rapi ---
    const formatDate = (dateString: string | null | undefined) => {
        if (!dateString) return "-";
        try {
            return format(parseISO(dateString), "dd MMMM yyyy", { locale: id });
        } catch (error) {
            return "Tanggal tidak valid";
        }
    };

    return (
        <div className="mt-10 mb-20">
            <Title title="Data Organisasi" subTitle="Detail Organisasi" />

            <CustomCard
                actions={
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-end">
                            <Link
                                className="w-full md:w-auto"
                                to="/data-riwayat/pengembangan-diri/organisasi"
                            >
                                <Button className="bg-[#3ABC67] w-full md:w-auto hover:bg-[#329C59] text-white">
                                    <IoIosArrowBack /> Kembali ke Daftar
                                </Button>
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 border border-gray-200 rounded-lg p-4">
                            {/* KIRI */}
                            <div className="space-y-2">
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm">Tanggal Mulai</Label>
                                    <Label className="text-xs sm:text-sm font-semibold">{formatDate(data?.data.periode_mulai)}</Label>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm">Tanggal Selesai</Label>
                                    <Label className="text-xs sm:text-sm font-semibold">{formatDate(data?.data.periode_selesai)}</Label>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm">Nama Organisasi</Label>
                                    <Label className="text-xs sm:text-sm font-semibold">{data?.data.nama_organisasi || '-'}</Label>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm">Alamat Organisasi</Label>
                                    <Label className="text-xs sm:text-sm font-semibold">{data?.data.tempat_organisasi || '-'}</Label>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm">Lingkup</Label>
                                    <Label className="text-xs sm:text-sm font-semibold capitalize">{data?.data.jenis_organisasi || '-'}</Label>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm">Jabatan</Label>
                                    <Label className="text-xs sm:text-sm font-semibold">{data?.data.jabatan_dalam_organisasi || '-'}</Label>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm">SK Penunjang</Label>
                                    <Label className="text-xs sm:text-sm font-semibold">-</Label>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm">Refleksi</Label>
                                    <Label className="text-xs sm:text-sm font-semibold">{data?.data.keterangan || '-'}</Label>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm">Website</Label>
                                    <a href={data?.data.website} target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm font-semibold text-blue-600 hover:underline">
                                        {data?.data.website || '-'}
                                    </a>
                                </div>
                            </div>

                            {/* KANAN */}
                            <div className="space-y-2">
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className="text-[#2572BE] font-semibold text-xs sm:text-sm">Status Pengajuan</Label>
                                    <Label className="text-xs sm:text-sm font-semibold">{data?.data.status_info.label || '-'}</Label>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className="text-[#2572BE] font-semibold text-xs sm:text-sm">Tanggal Diajukan</Label>
                                    <Label className="text-xs sm:text-sm font-semibold">{formatDate(data?.data.timestamps.tgl_diajukan)}</Label>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className="text-[#2572BE] font-semibold text-xs sm:text-sm">Tanggal Disetujui</Label>
                                    <Label className="text-xs sm:text-sm font-semibold">{formatDate(data?.data.timestamps.tgl_disetujui)}</Label>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className="text-[#2572BE] font-semibold text-xs sm:text-sm">Dibuat Oleh</Label>
                                    <Label className="text-xs sm:text-sm font-semibold">{data?.pegawai.nama || '-'}</Label>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            />
        </div>
    )
};

export default DetailDataOrganisasi;