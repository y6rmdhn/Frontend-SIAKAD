import CustomCard from "@/components/blocks/Card";
import Title from "@/components/blocks/Title";
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput";
import { FormFieldSelect } from "@/components/blocks/CustomFormSelect/CustomFormSelect";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { useForm } from "react-hook-form";
import SearchInput from "@/components/blocks/SearchInput";
import { IoIosArrowBack, IoMdAdd } from "react-icons/io";
import { IoSaveSharp } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";
import { BiRefresh } from "react-icons/bi";
import { Link } from "react-router-dom";
import {FormFieldInputFile} from "@/components/blocks/CustomFormInputFile/CustomFormInputFile.tsx";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";



const EditDataBerita = () => {
    const form = useForm();

    return (
        <div className="mt-10 mb-20">
            <Title title="Berita" subTitle="Detail Berita" />

            <Separator className="w-full bg-green-500" />

            <Form {...form}>
                <form>
                    <CustomCard
                        actions={
                            <div className="w-full flex flex-col gap-4 lg:flex-row justify-between">
                                <div className="w-full lg:w-96 relative">
                                    <SearchInput />
                                </div>

                                <div className="w-full flex flex-col lg:flex-row justify-end gap-2">
                                    <div>
                                        <Link
                                            className="w-full xl:w-auto"
                                            to="/admin/operasional/berita"
                                        >
                                            <Button className="bg-[#3ABC67] w-full xl:w-auto hover:bg-hover-blue-200 text-xs sm:text-sm">
                                                <IoIosArrowBack /> Kembali ke Daftar
                                            </Button>
                                        </Link>
                                    </div>
                                    <div>
                                        <Button className="bg-[#3ABC67] w-full xl:w-auto hover:bg-hover-blue-200 text-xs sm:text-sm">
                                            <IoSaveSharp /> Simpan
                                        </Button>
                                    </div>
                                    <div>
                                        <Button className="bg-[#3ABC67] w-full xl:w-auto hover:bg-hover-blue-200 text-xs sm:text-sm">
                                            <BiRefresh className="bg-[#FDA31A] rounded-full" /> Batal
                                        </Button>
                                    </div>
                                    <div>
                                        <Button className="bg-[#F56954] w-full xl:w-auto hover:bg-hover-blue-200 text-xs sm:text-sm">
                                            <FaRegTrashAlt /> Hapus
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        }
                    />
                    <div className="space-y-5 mt-5">
            {/* Unit */}
            <div>
              <Label className="text-sm font-semibold text-[#2572BE]">Unit<span className="text-red-500">*</span></Label>
              <Input value="Universitas Ibn Khaldun" disabled />
            </div>

            {/* Judul */}
            <div>
              <Label className="text-sm font-semibold text-[#2572BE]">Judul<span className="text-red-500">*</span></Label>
              <Input placeholder="Masukkan judul berita" />
            </div>

            {/* Isi Berita */}
            <div>
              <Label className="text-sm font-semibold text-[#2572BE]">Isi Berita<span className="text-red-500">*</span></Label>
              <div className="border p-2 rounded-md">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <select className="border px-2 py-1 rounded text-sm">
                    <option>Normal text</option>
                  </select>
                  <button className="text-sm font-bold">Bold</button>
                  <button className="italic text-sm">Italic</button>
                  <button className="underline text-sm">Underline</button>
                  {/* Simbol list / align */}
                  <div className="hidden ml-auto md:flex gap-1">
                    <div className="w-5 h-5 bg-gray-300 rounded-sm" />
                    <div className="w-5 h-5 bg-gray-300 rounded-sm" />
                  </div>
                </div>
                <Textarea placeholder="Tulis isi berita di sini..." rows={6} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-semibold text-[#2572BE]">Tgl. Posting<span className="text-red-500">*</span></Label>
                <div className="relative">
                  <Input type="date" />
                </div>
              </div>
              <div>
                <Label className="text-sm font-semibold text-[#2572BE]">Tgl. Expired<span className="text-red-500">*</span></Label>
                <div className="relative">
                  <Input type="date" />
                </div>
              </div>
            </div>

            {/* Prioritas */}
            <div>
              <FormFieldInput
                form={form}
                label="Prioritas"
                name="prioritas"
                type="checkbox"
                labelStyle="font-semibold"
                inputStyle="mt-2"
              />
            </div>

            {/* Gambar Berita */}
            <div>
              <FormFieldInputFile
                label="Gambar Berita"
                name="gambar_berita"
                required={false}
                labelStyle="font-semibold"
              />
            </div>

            {/* File Berita */}
            <div>
              <FormFieldInputFile
                label="File Berita"
                name="file_berita"
                required={false}
                labelStyle="font-semibold"
              />
            </div>

            {/* Penerima Berita */}
            <div className="flex items-center gap-2">
              <select className="w-full border px-2 py-2 rounded text-sm">
                <option>-- Pilih Penerima --</option>
              </select>
              <Button size="icon" className="bg-blue-500 text-white hover:bg-blue-600">
                <IoMdAdd />
              </Button>
            </div>
          </div>
                </form>
            </Form>
        </div>
    );
};

export default EditDataBerita;
