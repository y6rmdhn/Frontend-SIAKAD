import Title from "@/components/blocks/Title"
import CustomCard from "@/components/blocks/Card";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { IoIosArrowBack } from "react-icons/io";
import { Label } from "@/components/ui/label";
import {useQuery} from "@tanstack/react-query";
import dosenServices from "@/services/dosen.services.ts";
import {format, parseISO} from "date-fns";

const DetailDataJabatanAkademik = () => {

    const params = useParams();

    // get data
    const {data} = useQuery({
        queryKey: ["detail-jabatan-akademik-dosen"],
        queryFn: async () => {
            const response = await dosenServices.getJabatanAkademikDetail(params.id);
            console.log(response.data)
            return response.data;
        },
    });

    return (
        <div className="mt-10 mb-20">
            <Title title="Data Jabatan Akademik" subTitle="Detail Jabatan Akademik" />

            <CustomCard
                actions={
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-end">
                            <Link
                                className="w-full md:w-auto"
                                to="/data-riwayat/kepegawaian/jabatan-akademik"
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
                                    <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm">Nama Jabatan</Label>
                                    <Label className="text-xs sm:text-sm">{data?.data.jabatan_akademik}</Label>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm">TMT. Jabatan</Label>
                                    <Label className="text-xs sm:text-sm">
                                        {data?.data.tmt_jabatan ? format(parseISO(data?.data.tmt_jabatan), "dd MMMM yyyy")
                                            : "-"}
                                    </Label>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm">No. SK</Label>
                                    <Label className="text-xs sm:text-sm">{data?.data.no_sk}</Label>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm">Tgl.SK</Label>
                                    <Label className="text-xs sm:text-sm">
                                        {data?.data.tgl_sk ? format(parseISO(data?.data.tgl_sk), "dd MMMM yyyy")
                                            : "-"}
                                    </Label>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm">Pejabat Penetap</Label>
                                    <Label className="text-xs sm:text-sm">{data?.data.pejabat_penetap}</Label>
                                </div>
                            </div>

                            {/* KANAN */}
                            <div className="space-y-2">
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className="text-[#2572BE] font-semibold text-xs sm:text-sm">Status Pengajuan</Label>
                                    <Label className="text-xs sm:text-sm">{data?.data.status_pengajuan}</Label>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className="text-[#2572BE] font-semibold text-xs sm:text-sm">Tanggal Diajukan</Label>
                                    <Label className="text-xs sm:text-sm">
                                        {data?.data.timestamps.tgl_diajukan

                                            ? format(parseISO(data?.data.timestamps.tgl_diajukan), "dd MMMM yyyy")
                                            : "-"}
                                    </Label>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className="text-[#2572BE] font-semibold text-xs sm:text-sm">Tanggal Disetujui</Label>
                                    <Label className="text-xs sm:text-sm">
                                        {data?.data.timestamps.tgl_disetujui
                                            ? format(parseISO(data?.data.timestamps.tgl_disetujui), "dd MMMM yyyy")
                                            : "-"}
                                    </Label>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className="text-[#2572BE] font-semibold text-xs sm:text-sm">Dibuat Oleh</Label>
                                    <Label className="text-xs sm:text-sm">-</Label>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            />
        </div>
    )
};

export default DetailDataJabatanAkademik;