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
import { FormFieldInputFile } from "@/components/blocks/CustomFormInputFile/CustomFormInputFile.tsx";


const EditDataDokumenInternal = () => {
    const form = useForm();

    return (
        <div className="mt-10 mb-20">
            <Title title="Dokumen Internal" subTitle="Detail Dokumen Internal" />

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
                                            to="/admin/operasional/kompensasi/dokumen-internal"
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
                                    label="No Dokumen"
                                    name="no_dokumen"
                                    required={true}
                                    labelStyle="text-[#3F6FA9]"
                                />
                                <FormFieldInput
                                    form={form}
                                    label="Nama Dokumen"
                                    name="nama_dokumen"
                                    required={true}
                                    labelStyle="text-[#3F6FA9]"
                                />
                                <FormFieldInput
                                    form={form}
                                    label="Uraian Singkat"
                                    name="uraian_singkat"
                                    required={false}
                                    labelStyle="text-[#3F6FA9]"
                                    type="textarea"
                                />
                                <FormFieldInput
                                    form={form}
                                    label="Url Dokumen"
                                    name="url_dokumen"
                                    required={false}
                                    labelStyle="text-[#3F6FA9]"
                                />
                                <FormFieldInput
                                    form={form}
                                    label="Tgl Dokumen"
                                    name="nama_dokumen"
                                    required={true}
                                    labelStyle="text-[#3F6FA9]"
                                    type="date"
                                />
                                <FormFieldSelect
                                    form={form}
                                    label="Jenis Dokumen"
                                    name="jenis_dokumen"
                                    labelStyle="text-[#3F6FA9]"
                                    options={[
                                        {
                                            value: "1",
                                            label: "Pelanggaran Ringan",
                                        },
                                        {
                                            value: "2",
                                            label: "Pelanggaran Sedang",
                                        },
                                        {
                                            value: "3",
                                            label: "Pelanggaran Berat",
                                        },
                                    ]}
                                    required={true}
                                    placeholder="Surat Keputusan"
                                />
                            </div>
                            {/* KANAN */}
                            <div className="space-y-2">
                                <FormFieldSelect
                                    form={form}
                                    label="Menu Referensi"
                                    name="menu_referensi"
                                    labelStyle="text-[#3F6FA9]"
                                    options={[
                                        {
                                            value: "1",
                                            label: "Pelanggaran Ringan",
                                        },
                                        {
                                            value: "2",
                                            label: "Pelanggaran Sedang",
                                        },
                                        {
                                            value: "3",
                                            label: "Pelanggaran Berat",
                                        },
                                    ]}
                                    required={false}
                                    placeholder="Pengajaran"
                                />
                                <FormFieldInputFile
                                    form={form}
                                    label="File"
                                    name="file"
                                    required={false}
                                    labelStyle="text-[#3F6FA9]"
                                />
                                <FormFieldSelect
                                    form={form}
                                    label="Status Dokumen"
                                    name="Barun"
                                    labelStyle="text-[#3F6FA9]"
                                    options={[
                                        {
                                            value: "1",
                                            label: "Pelanggaran Ringan",
                                        },
                                        {
                                            value: "2",
                                            label: "Pelanggaran Sedang",
                                        },
                                        {
                                            value: "3",
                                            label: "Pelanggaran Berat",
                                        },
                                    ]}
                                    required={false}
                                    placeholder="Baru"
                                />
                                <FormFieldSelect
                                    form={form}
                                    label="Tingkat"
                                    name="tingkat"
                                    labelStyle="text-[#3F6FA9]"
                                    options={[
                                        {
                                            value: "1",
                                            label: "Pelanggaran Ringan",
                                        },
                                        {
                                            value: "2",
                                            label: "Pelanggaran Sedang",
                                        },
                                        {
                                            value: "3",
                                            label: "Pelanggaran Berat",
                                        },
                                    ]}
                                    required={true}
                                    placeholder="--Pilih Tingkat--"
                                />
                                <FormFieldInput
                                    form={form}
                                    label="Nama Pejabat Penetep"
                                    name="nama_pejabat_penetep"
                                    required={false}
                                    labelStyle="text-[#3F6FA9]"
                                    placeholder="Cari Nama Pejabat Penetap"
                                />
                                <FormFieldInput
                                    form={form}
                                    label="Nama Validator"
                                    name="nama_validator"
                                    required={false}
                                    labelStyle="text-[#3F6FA9]"
                                    placeholder="Cari Nama Validator"
                                />
                            </div>
                        </div>
                    </CustomCard>
                </form>
            </Form>
        </div>
    );
};

export default EditDataDokumenInternal;
