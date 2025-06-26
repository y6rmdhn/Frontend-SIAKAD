import Title from "@/components/blocks/Title";
import CustomCard from "@/components/blocks/Card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { IoIosArrowBack } from "react-icons/io";
import { Label } from "@/components/ui/label";

const DetailSertifikasiValidasi = () => {

    return (
        <div className="mt-10 mb-20">
            <Title title="Sertifikasi" subTitle="Detail Sertifikasi" />

            <CustomCard
                actions={
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-end">
                            <Link
                                className="w-full md:w-auto"
                                to="/data-riwayat/kompetensi/sertifikasi"
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
                                    <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-40">
                                        Jenis Sertifikasi
                                    </Label>
                                    <Label className="text-xs sm:text-sm font-semibold">

                                    </Label>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-40">
                                        Nomor Sertifikasi
                                    </Label>
                                    <Label className="text-xs sm:text-sm font-semibold">

                                    </Label>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-40">
                                        Nomor Registrasi
                                    </Label>
                                    <Label className="text-xs sm:text-sm font-semibold">

                                    </Label>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-40">
                                        Tanggal Sertifikasi
                                    </Label>
                                    <Label className="text-xs sm:text-sm font-semibold">

                                    </Label>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-40">
                                        Nomor Peserta
                                    </Label>
                                    <Label className="text-xs sm:text-sm font-semibold">

                                    </Label>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-40">
                                        Penyelenggara
                                    </Label>
                                    <Label className="text-xs sm:text-sm font-semibold">

                                    </Label>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-40">
                                        Lingkup
                                    </Label>
                                    <Label className="text-xs sm:text-sm font-semibold">

                                    </Label>
                                </div>
                            </div>

                            {/* KANAN */}
                            <div className="space-y-2">
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className="text-[#2572BE] font-semibold text-xs sm:text-sm shrink-0 w-40">
                                        Status Pengajuan
                                    </Label>
                                    <Label className="text-xs sm:text-sm font-semibold">

                                    </Label>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className="text-[#2572BE] font-semibold text-xs sm:text-sm shrink-0 w-40">
                                        Tanggal Diajukan
                                    </Label>
                                    <Label className="text-xs sm:text-sm font-semibold">

                                    </Label>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className="text-[#2572BE] font-semibold text-xs sm:text-sm shrink-0 w-40">
                                        Tanggal Disetujui
                                    </Label>
                                    <Label className="text-xs sm:text-sm font-semibold">

                                    </Label>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className="text-[#2572BE] font-semibold text-xs sm:text-sm shrink-0 w-40">
                                        Dibuat Oleh
                                    </Label>
                                    <Label className="text-xs sm:text-sm font-semibold">

                                    </Label>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                    <Label className="font-semibold text-[#2572BE] text-xs sm:text-sm shrink-0 w-40">
                                        File Pendukung
                                    </Label>
                                    <Label className="text-xs sm:text-sm">

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

export default DetailSertifikasiValidasi;
