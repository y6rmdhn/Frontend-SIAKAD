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
import { IoIosArrowBack } from "react-icons/io";
import { MdOutlineFileDownload } from "react-icons/md";

const DetailOrangtua = () => {
    return (
        <div className="mt-10 mb-20">
            <Title title="Orang Tua" subTitle="Daftar Orang Tua" />
            <CustomCard
                actions={
                    <div>
                        <div className="flex justify-end gap-2">
                            <Link to="/data-riwayat/keluarga/orangtua">
                                <Button className="bg-[#002E5A] hover:bg-hover-blue-200">
                                    <IoIosArrowBack /> Kembali ke Daftar
                                </Button>
                            </Link>
                            <Link to="">
                                <Button className="bg-[#FDA31A] text-white cursor-pointer">
                                    <MdOutlineFileDownload />
                                    Simpan
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
                                            Nama Orang Tua<span className="text-red-500">*</span>
                                        </Label>
                                        <Input />
                                    </div>

                                    <div className="flex gap-14">
                                        <Label className="w-50 text-[#2572BE]">
                                            Jenis Orang Tua
                                        </Label>
                                        <Select>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="- - ayah - -" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="sk">Ayah</SelectItem>
                                                <SelectItem value="sk">Ibu</SelectItem>
                                                <SelectItem value="lain">Lainnya</SelectItem>
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
                                            Alamat
                                        </Label>
                                        <Input />
                                    </div>

                                    <div className="flex gap-14">
                                        <Label className="w-50 text-[#2572BE]">
                                            Telepon
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

export default DetailOrangtua;

