import Title from "@/components/blocks/Title";
import CustomCard from "@/components/blocks/Card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { IoIosArrowBack } from "react-icons/io";
import { Label } from "@/components/ui/label";

const DetailPendidikanFormalValidasi = () => {

    return (
        <div className="mt-10 mb-20">
            <div className="flex flex-col md:flex-row justify-between gap-2">
                <Title title="Pendidikan Formal" subTitle="Detail Pendidikan Formal" />
                <Link className="w-full md:w-auto" to="/admin/validasi-data/kualifikasi/pendidikan-formal">
                    <Button className="bg-[#00C0EF] w-full md:w-auto hover:bg-hover-blue-200">
                        <IoIosArrowBack /> Kembali ke Daftar
                    </Button>
                </Link>
            </div>

            <CustomCard
                actions={
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 border border-black rounded-lg p-4">
                        {/* KIRI */}
                        <div className="space-y-2">
                            <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                <Label className="font-semibold text-[#3F6FA9] text-xs sm:text-sm shrink-0 w-40">
                                    Lokasi Studi
                                </Label>
                                <Label className="text-xs sm:text-sm sm:text-right"></Label>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                <Label className="font-semibold text-[#3F6FA9] text-xs sm:text-sm shrink-0 w-40">
                                    Jenis Studi
                                </Label>
                                <Label className="text-xs sm:text-sm sm:text-right">

                                </Label>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                <Label className="font-semibold text-[#3F6FA9] text-xs sm:text-sm shrink-0 w-40">
                                    Perguruan Tinggi
                                </Label>
                                <Label className="text-xs sm:text-sm sm:text-right">

                                </Label>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                <Label className="font-semibold text-[#3F6FA9] text-xs sm:text-sm shrink-0 w-40">
                                    Program Studi
                                </Label>
                                <Label className="text-xs sm:text-sm sm:text-right">

                                </Label>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                <Label className="font-semibold text-[#3F6FA9] text-xs sm:text-sm shrink-0 w-40">
                                    Bidang Studi
                                </Label>
                                <Label className="text-xs sm:text-sm sm:text-right"></Label>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                <Label className="font-semibold text-[#3F6FA9] text-xs sm:text-sm shrink-0 w-40">
                                    Gelar Akademik
                                </Label>
                                <Label className="text-xs sm:text-sm sm:text-right">

                                </Label>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                <Label className="font-semibold text-[#3F6FA9] text-xs sm:text-sm shrink-0 w-40">
                                    IPK Kelulusan
                                </Label>
                                <Label className="text-xs sm:text-sm sm:text-right">

                                </Label>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                <div className="flex sm:flex-col gap-2 sm:gap-0">
                                    <Label className="font-semibold text-[#3F6FA9] text-xs sm:text-sm shrink-0 sm:w-40">
                                        Judul
                                    </Label>
                                    <Label className="text-gray-400 text-xs sm:text-sm sm:w-40 shrink-0 font-semibold">
                                        Tugas Akhir/Skripsi /Tesis/Disertas
                                    </Label>
                                </div>
                                <Label className="text-xs sm:text-sm sm:text-right">
                                    
                                </Label>
                            </div>
                        </div>

                        {/* KANAN */}
                        <div className="space-y-2">
                            <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                <Label className="text-[#3F6FA9] font-semibold text-xs sm:text-sm shrink-0 w-40">
                                    Nomor Induk
                                </Label>
                                <Label className="text-xs sm:text-sm sm:text-right">

                                </Label>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                <Label className="text-[#3F6FA9] font-semibold text-xs sm:text-sm shrink-0 w-40">
                                    Nomor Ijazah
                                </Label>
                                <Label className="text-xs sm:text-sm sm:text-right">

                                </Label>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                <Label className="font-semibold text-[#3F6FA9] text-xs sm:text-sm shrink-0 w-40">
                                    Tahun Masuk
                                </Label>
                                <Label className="text-xs sm:text-sm sm:text-right">

                                </Label>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                <Label className="font-semibold text-[#3F6FA9] text-xs sm:text-sm shrink-0 w-40">
                                    Tahun Lulus
                                </Label>
                                <Label className="text-xs sm:text-sm sm:text-right">

                                </Label>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                <Label className="text-[#3F6FA9] font-semibold text-xs sm:text-sm shrink-0 w-40">
                                    Status Pengajuan
                                </Label>
                                <Label className="text-xs sm:text-sm sm:text-right">

                                </Label>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                <Label className="font-semibold text-[#3F6FA9] text-xs sm:text-sm shrink-0 w-40">
                                    Tanggal Diajukan
                                </Label>
                                <Label className="text-xs sm:text-sm sm:text-right">

                                </Label>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                <Label className="font-semibold text-[#3F6FA9] text-xs sm:text-sm shrink-0 w-40">
                                    Tanggal Disetujui
                                </Label>
                                <Label className="text-xs sm:text-sm sm:text-right">

                                </Label>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2 justify-between border-b p-2">
                                <Label className="text-[#3F6FA9] font-semibold text-xs sm:text-sm shrink-0 w-40">
                                    Dibuat Oleh
                                </Label>
                                <Label className="text-xs sm:text-sm sm:text-right">

                                </Label>
                            </div>
                        </div>
                    </div>
                }
            />
        </div>
    );
};

export default DetailPendidikanFormalValidasi;
