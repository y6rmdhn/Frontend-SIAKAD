import Title from "@/components/blocks/Title";
import { Button } from "@/components/ui/button";
import CustomCard from "@/components/blocks/Card";
import { Label } from "@/components/ui/label";
import { MdEdit } from "react-icons/md";
import { useState } from "react";
import { Link } from "react-router-dom";

const TahapanDataRiwayat = () => {
    const [progress] = useState(0); 

    const steps = [
        {
            title: "Keluarga",
            items: [
                {
                    title: "Pasangan",
                    desc: "Silahkan melengkapi data Pasangan dengan benar dan ajukan data untuk disetujui oleh admin.",
                },
                {
                    title: "Anak",
                    desc: "Silahkan menambahkan data Anak kondisi saat ini. Data Anak bisa ditambahkan lebih dari 1 data.",
                },
                {
                    title: "Orang Tua",
                    desc: "Silahkan melengkapi data Orang Tua dengan benar dan ajukan data untuk disetujui oleh admin.",
                },
            ],
        },
        {
            title: "Kepegawaian",
            items: [
                {
                    title: "Homebase",
                    desc: "Silahkan melengkapi data Homebase sesuai dengan Homebase dosen saat ini. Pastikan mengisi data Hombase dengan benar akan berpengaruh pada role user saat ini menggunakan SIM Kepegawaian.",
                },
                {
                    title: "Pangkat",
                    desc: "Silahkan mengisi data Pangkat sesuai yang tersedia.",
                },
                {
                    title: "Jabatan Akademik",
                    desc: "Silahkan melengkapi data Jabatan Akademik dengan benar sesuai dengan pilihan yang tersedia kemudian silahkan ajukan data untuk disetuji oleh admin.",
                },
                {
                    title: "Jabatan Fungsional",
                    desc: "Silahkan melengkapi data Jabatan Fungsional beserta dengan TMT (Terhitung Mulai Tanggal) Jabatan.",
                },
                {
                    title: "Jabatan Struktural",
                    desc: "Silahkan melengkapi data Jabatan Struktural dengan benar, kemudian ajukan data untuk disetujui oleh admin.",
                },
                {
                    title: "Hubungan Kerja",
                    desc: "Pastikan data Hubungan Kerja diisi dengan benar dan ajukan data untuk disetujui oleh admin.",
                },
            ],
        },
        {
            title: "Kualifikasi",
            items: [],
        },
    ];

    return (
        <div className="mt-10 mb-10">
            <Title title="Tahapan Data Riwayat" />
            <CustomCard
                cardStyle="bg-[#D22D17] text-white rounded-md shadow p-0 pt-3"
                actions={
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start">
                            <div className="relative w-16 h-16 sm:w-20 sm:h-20 lg:w-16 lg:h-16 shrink-0">
                                <svg className="w-full h-full" viewBox="0 0 36 36">
                                    <path
                                        className="text-red-400"
                                        strokeWidth="3.6"
                                        stroke="currentColor"
                                        fill="none"
                                        d="M18 2.0845
                                            a 15.9155 15.9155 0 0 1 0 31.831
                                            a 15.9155 15.9155 0 0 1 0 -31.831"
                                    />
                                    <path
                                        className="text-white"
                                        strokeWidth="3.6"
                                        strokeDasharray={`${progress}, 100`}
                                        stroke="currentColor"
                                        fill="none"
                                        strokeLinecap="round"
                                        d="M18 2.0845
                                            a 15.9155 15.9155 0 0 1 0 31.831
                                            a 15.9155 15.9155 0 0 1 0 -31.831"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center text-xl font-bold">
                                    {progress}%
                                </div>
                            </div>

                            <div className="flex flex-col gap-5 sm:gap-2">
                                <Label className="font-semibold text-sm lg:text-base">
                                    Anda Belum Memulai Tahapan Data Riwayat
                                </Label>

                                <div className="text-xs lg:text-sm text-justify sm:text-start">
                                    Saat ini Anda harus mengisi data riwayat Anda, cukup tekan tombol{" "}
                                    <strong className="text-xs lg:text-sm">Mulai Setting</strong>{" "}
                                    Anda bisa mengatur semuanya sesuai petunjuk di bawah ini.
                                </div>
                            </div>

                        </div>

                        <div className="w-full md:w-auto">
                            <Link to="/data-riwayat/keluarga/pasangan">
                            <Button className="w-full md:w-auto bg-[#E7E7E7] text-[#D22D17]">
                                Mulai Setting
                            </Button>
                            </Link>
                        </div>
                    </div>
                }
            />

            <Label className="text-[#0B73B9] font-semibold text-sm sm:text-lg mb-2 mt-5">
                Tahapan Data Riwayat
            </Label>
            <Label className="mb-6 text-xs sm:text-sm text-gray-600">
                Silahkan perhatikan dan ikuti semua langkah yang ada dibawah ini untuk dapat melakukan Tahapan Data Riwayat dengan baik dan benar.
            </Label>

            {steps.map((section, idx) => (
                <div className="mb-6" key={idx}>
                    <div className="flex items-center gap-3 mb-5">
                        <div className="border-1 border-[#0B73B9] p-3 rounded-full">
                        <div className="w-6 h-6 flex items-center justify-center bg-blue-500 text-white rounded-full text-sm">
                            <MdEdit />
                        </div>
                        </div>
                        <Label className="text-lg font-semibold text-gray-800">{section.title}</Label>
                    </div>

                    {section.items.length > 0 ? (
                        <ol className="space-y-4 pl-16">
                            {section.items.map((item, index) => (
                                <li key={index}>
                                    <div className="flex gap-2 items-start">
                                        <div className="text-sm">{index + 1}.</div>
                                        <div>
                                            <div className="text-sm">{item.title}</div>
                                            <div className="text-xs text-gray-600 text-justify sm:text-start">{item.desc}</div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    ) : null}
                </div>
            ))}
        </div>
    );
};

export default TahapanDataRiwayat;
