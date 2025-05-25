import CustomCard from "@/components/blocks/Card";
import Title from "@/components/blocks/Title";
import { Button } from "@/components/ui/button";
import { MdOutlineFileDownload } from "react-icons/md";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { Form } from "@/components/ui/form";
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput";
import { FormFieldSelect } from "@/components/blocks/CustomFormSelect/CustomFormSelect";
import { FormFieldInputFile } from "@/components/blocks/CustomFormInputFile/CustomFormInputFile";
import { useForm } from "react-hook-form";

const DetailOrganisasi = () => {
    const form = useForm()
    return (
        <div className="mt-10 mb-20">
            <Title title="Organisasi" subTitle="Detail Organisasi" />

            <CustomCard
                actions={
                    <div>
                        <div className="w-full flex flex-col sm:flex-row justify-end gap-4">
                            <Link to="/data-riwayat/pengembangan-diri/organisasi">
                                <Button className="bg-green-light-uika hover:bg-[#329C59] cursor-pointer w-full sm:w-auto">
                                    <IoIosArrowBack />
                                    Kembali ke Daftar
                                </Button>
                            </Link>

                            <Button className="bg-[#FDA31A] hover:bg-[#329C59] cursor-pointer w-full sm:w-auto">
                                <MdOutlineFileDownload />
                                Simpan
                            </Button>
                        </div>
                    </div>
                }
            />

            <div className="w-full border-l-2 border-[#6AAEF1] flex flex-col gap-2 sm:grid sm:grid-cols-2 mt-10 bg-[#D6E8F9] p-4 ">
                <div className="flex flex-col gap-2 text-[#2572BE]">
                    <p className="text-sm sm:text-base">NIP</p>
                    <p className="text-sm sm:text-base">Nama</p>
                    <p className="text-sm sm:text-base">Unit Kerja</p>
                    <p className="text-sm sm:text-base">Status</p>
                </div>
                <div className="flex flex-col gap-2 text-[#2572BE]">
                    <p className="text-sm sm:text-base">Jab. Akademik</p>
                    <p className="text-sm sm:text-base">Jab. Fungsional</p>
                    <p className="text-sm sm:text-base">Jab. Struktural</p>
                    <p className="text-sm sm:text-base">Pendidikan</p>
                </div>
            </div>

            <Form {...form}>
                <form className="mt-10">
                    <div className="flex flex-col sm:grid sm:grid-rows-6 grid-flow-col gap-x-5 gap-y-5 sm:items-center mt-4">
                        <FormFieldInput
                            form={form}
                            label="Tgl.Mulai"
                            name="tgl_mulai"
                            type="date"
                            required={true}
                            labelStyle="text-[#3F6FA9]"
                        />
                        <FormFieldInput
                            form={form}
                            label="Nama Organisasi"
                            name="nama_organisasi"
                            type="text"
                            required={true}
                            labelStyle="text-[#3F6FA9]"
                        />
                        <FormFieldSelect
                            form={form}
                            label="Linkup"
                            name="linkup"
                            labelStyle="text-[#3F6FA9]"
                            options={[
                                { value: "1", label: "lokal" },
                                { value: "2", label: "Nasional" },
                                { value: "3", label: "Internasional" },
                            ]}
                            required={false}
                            placeholder="-- Pilih Lingkup --"
                        />
                        <FormFieldInput
                            form={form}
                            label="SK Penugasan"
                            name="sk_penugasan"
                            placeholder="--Pilih SK Penugasan--"
                            type="text"
                            required={true}
                            labelStyle="text-[#3F6FA9]"
                        />
                        <FormFieldInput
                            form={form}
                            label="Website"
                            name="website"
                            type="text"
                            required={false}
                            labelStyle="text-[#3F6FA9]"
                        />
                        <FormFieldInput
                            form={form}
                            label="Tanggal Input"
                            name="tanggal_input"
                            required={false}
                            labelStyle="text-[#3F6FA9]"
                            placeholder="22 April 2025"
                        />

                        <FormFieldInput
                            form={form}
                            label="Tgl.Selesai"
                            name="tgl_selesai"
                            type="date"
                            required={true}
                            labelStyle="text-[#3F6FA9]"
                        />
                        <FormFieldInput
                            form={form}
                            label="Alamat Organisasi"
                            name="alamat_organisasi"
                            type="text"
                            required={true}
                            labelStyle="text-[#3F6FA9]"
                        />
                        <FormFieldInput
                            form={form}
                            label="Jabatan"
                            name="jabatan"
                            type="text"
                            required={false}
                            labelStyle="text-[#3F6FA9]"
                        />
                        <FormFieldInput
                            form={form}
                            label="Refleksi"
                            name="refleksi"
                            type="text"
                            required={false}
                            labelStyle="text-[#3F6FA9]"
                        />
                        <FormFieldInputFile
                            form={form}
                            label="File Pendukung"
                            name="file_pendukung"
                            classname="border-none shadow-none"
                            labelStyle="text-[#3F6FA9]"
                            required={false}
                        />
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default DetailOrganisasi;
