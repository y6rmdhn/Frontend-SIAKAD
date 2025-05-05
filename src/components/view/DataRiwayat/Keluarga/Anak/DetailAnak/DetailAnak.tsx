import { Link } from "react-router-dom";
import CustomCard from "@/components/blocks/Card";
import Title from "@/components/blocks/Title";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import React, { useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";

const DetailAnak = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [fileName, setFileName] = useState<string>("No file chosen");

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                alert("Ukuran file maksimal 2 MB!");
                event.target.value = ""; // reset input
                setFileName("No file chosen");
            } else {
                setFileName(file.name);
            }
        } else {
            setFileName("No file chosen");
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="mt-10 mb-20">
            <Title title="Anak" subTitle="Daftar Anak" />
            <CustomCard
                actions={
                    <div>
                        <div className="flex justify-end">
                            <Link to="/data-riwayat/keluarga/anak">
                                <Button className="bg-yellow-uika hover:bg-hover-yellow-uika">
                                    <FaPlus /> Tambah Baru
                                </Button>
                            </Link>
                        </div>

                        <div className="w-full border-l-2 border-[#6AAEF1] grid grid-cols-2 gap-96 mt-10 bg-[#D6E8F9] p-4 ">
                            <div className="flex flex-col gap-2 text-[#2572BE] font-semibold">
                                <p>NIP</p>
                                <p>Nama</p>
                                <p>Unit Kerja</p>
                                <p>Status</p>
                            </div>
                            <div className="flex flex-col gap-2 text-[#2572BE] font-semibold">
                                <p>Jab. Akademik</p>
                                <p>Jab. Fungsional</p>
                                <p>Jab. Struktural</p>
                                <p>Pendidikan</p>
                            </div>
                        </div>

                        <div className="space-y-4 mt-20">
                            <div className="grid grid-cols-2 gap-30">
                                {/* Kolom Kiri */}
                                <div className="space-y-4">
                                    <div className="flex gap-14">
                                        <Label className="w-50 text-[#2572BE]">
                                            Nama<span className="text-red-500">*</span>
                                        </Label>
                                        <Input />
                                    </div>

                                    <div className="flex gap-14">
                                        <Label className="w-50 text-[#2572BE]">
                                            Jenis Kelamin
                                        </Label>
                                        <Select>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="- - Laki-laki - - -" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Jenis Kelamin</SelectLabel>
                                                    <SelectItem value="apple">Laki-laki</SelectItem>
                                                    <SelectItem value="banana">Perempuan</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="flex gap-14">
                                        <Label className="w-50 text-[#2572BE]">
                                            Tempat Lahir<span className="text-red-500">*</span>
                                        </Label>
                                        <Input />
                                    </div>

                                    <div className="flex gap-14">
                                        <Label className="w-50 text-[#2572BE]">
                                            Tgl Lahir<span className="text-red-500">*</span>
                                        </Label>
                                        <Input type="date" placeholder="dd - mm - yyyy" />
                                    </div>

                                    <div className="flex gap-14">
                                        <Label className="w-50 text-[#2572BE]">
                                            Umur
                                        </Label>
                                        <Input />
                                    </div>

                                    <div className="flex">
                                        <Label className="w-50 text-[#2572BE]">
                                            File Akte Kelahiran
                                        </Label>
                                        <div>
                                            <div className="flex gap-2">
                                                <Button
                                                    type="button"
                                                    onClick={triggerFileInput}
                                                    className="h-5 bg-gray-200 rounded border text-black border-gray-400 hover:bg-gray-300"
                                                >
                                                    Choose File
                                                </Button>
                                                <span className="text-sm italic text-gray-600">
                                                    {fileName}
                                                </span>
                                                <Input
                                                    ref={fileInputRef}
                                                    type="file"
                                                    accept=".pdf,.jpg,.jpeg"
                                                    className="hidden"
                                                    onChange={handleFileChange}
                                                />
                                            </div>
                                            <span className="text-blue-600 text-xs">
                                                jpg.jpeg pdf (maxsize 2 MB)
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex gap-14">
                                        <Label className="w-50 text-[#2572BE]">
                                            Anak ke
                                        </Label>
                                        <Input />
                                    </div>

                                    <div className="flex gap-14">
                                        <Label className="w-50 text-[#2572BE]">
                                            Pekerjaan Anak
                                        </Label>
                                        <Input />
                                    </div>

                                </div>

                                {/* Kolom Kanan */}
                                <div className="space-y-4">

                                    <div className="flex gap-14 bg-white shadow-md p-4">
                                        <Label className="font-bold w-50 text-[#2572BE]">
                                            Tanggal Input
                                        </Label>
                                        <Label className="font-bold w-50 text-[#2572BE]">
                                            26 Maret 2026
                                        </Label>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                }
            />
        </div>
    );
};

export default DetailAnak;

