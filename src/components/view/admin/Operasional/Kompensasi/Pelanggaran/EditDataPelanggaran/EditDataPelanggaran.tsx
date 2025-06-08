import CustomCard from "@/components/blocks/Card";
import Title from "@/components/blocks/Title";
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput";
import { FormFieldSelect } from "@/components/blocks/CustomFormSelect/CustomFormSelect";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { FiSearch } from "react-icons/fi";
import { IoIosArrowBack } from "react-icons/io";
import { IoSaveSharp } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";
import { BiRefresh } from "react-icons/bi";
import { Link } from "react-router-dom";
import {FormFieldInputFile} from "@/components/blocks/CustomFormInputFile/CustomFormInputFile.tsx";


const EditDataPelanggaran = () => {
    const form = useForm();

    return (
        <div className="mt-10 mb-20">
            <Title title="Pelanggaran" subTitle="Detail Pelanggaran" />

            <Form {...form}>
                <form>
                    <CustomCard
                        actions={
                            <div className="w-full flex flex-col gap-4 lg:flex-row justify-between">
                                <div className="w-full lg:w-96 relative">
                                    <FiSearch className="absolute top-1/2 -translate-y-1/2 right-2" />
                                    <Input placeholder="Search" className="lg:w-96 w-full pr-8 text-xs sm:text-sm" />
                                </div>

                                <div className="w-full flex flex-col lg:flex-row justify-end gap-2">
                                    <div>
                                        <Link
                                            className="w-full xl:w-auto"
                                            to="/admin/operasional/kompensasi/pelanggaran"
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
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-5">
                            {/* KIRI */}
                            <div className="space-y-2">
                                <FormFieldInput
                                    form={form}
                                    label="Pegawai"
                                    name="pegawai"
                                    required={true}
                                    labelStyle="text-[#3F6FA9]"
                                    placeholder="Cari Pegawai"
                                />
                                <FormFieldInput
                                    form={form}
                                    label="Tgl Pelanggaran"
                                    name="tgl_pelanggaran"
                                    required={true}
                                    labelStyle="text-[#3F6FA9]"
                                    type="date"
                                />
                                <FormFieldSelect
                                    form={form}
                                    label="Jenis Pelanggaran"
                                    name="jenis_pelanggaran"
                                    labelStyle="text-[#3F6FA9]"
                                    options={[
                                        {
                                            value: "1",
                                            label: "Terlambat",
                                        },
                                        {
                                            value: "2",
                                            label: "Alpa",
                                        },
                                        {
                                            value: "3",
                                            label: "lainnya",
                                        },
                                    ]}
                                    required={true}
                                    placeholder="Terlambat atau Alpa"
                                />
                                <FormFieldInput
                                    form={form}
                                    label="No.SK"
                                    name="no_sk"
                                    required={false}
                                    labelStyle="text-[#3F6FA9]"
                                />
                            </div>
                            {/* KANAN */}
                            <div className="space-y-2">
                                <FormFieldInput
                                    form={form}
                                    label="Tgl.SK"
                                    name="tgl_sk"
                                    required={false}
                                    labelStyle="text-[#3F6FA9]"
                                    type="date"
                                />
                                <FormFieldInput
                                    form={form}
                                    label="Keterangan"
                                    name="keterangan"
                                    required={false}
                                    labelStyle="text-[#3F6FA9]"
                                    type="textarea"
                                />
                                <FormFieldInputFile
                                    form={form}
                                    label="File Keterangan"
                                    name="file_keterangan"
                                    required={false}
                                    labelStyle="text-[#3F6FA9]"
                                />
                            </div>
                        </div>
                    </CustomCard>
                </form>
            </Form>
        </div>
    );
};

export default EditDataPelanggaran;
