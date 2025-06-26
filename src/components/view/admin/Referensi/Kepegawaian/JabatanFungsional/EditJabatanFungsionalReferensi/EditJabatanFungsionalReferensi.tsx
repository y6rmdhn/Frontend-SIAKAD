import CustomCard from "@/components/blocks/Card";
import Title from "@/components/blocks/Title";
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import SearchInput from "@/components/blocks/SearchInput";
import { IoIosArrowBack } from "react-icons/io";
import { IoSaveSharp } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";
import { BiRefresh } from "react-icons/bi";
import { FormFieldSelect } from "@/components/blocks/CustomFormSelect/CustomFormSelect";
import { Link } from "react-router-dom";

const EditJabatanFungsionalReferensi = () => {
    const form = useForm({})

    return (
        <div className="mt-10 mb-20">
                <Title title="Jabatan Fungsional" subTitle="Edit Detail Jabatan Fungsional" />

            <Form {...form}>
                <form>
                    <CustomCard
                        actions={
                            <div className="w-full flex flex-col gap-4 xl:flex-row justify-between xl:items-center">
                                <div>
                                    <SearchInput />
                                </div>

                                <div className="w-full xl:w-auto flex flex-col xl:flex-row justify-end gap-2">
                                    <div className="flex flex-col xl:flex-row w-full xl:w-auto gap-2">
                                        <Link
                                            className="w-full flex xl:w-auto"
                                            to="/admin/referensi/kepegawaian/jabatan-fungsional"
                                        >
                                            <Button
                                                type="button"
                                                className="bg-[#3ABC67] w-full hover:bg-[#329C59] text-white text-xs sm:text-sm"
                                            >
                                                <IoIosArrowBack /> Kembali ke Daftar
                                            </Button>
                                        </Link>
                                        <Button
                                            type="submit"
                                            className="bg-[#3ABC67] w-full flex xl:w-auto hover:bg-[#329C59] text-white text-xs sm:text-sm"
                                        >
                                            <IoSaveSharp /> Simpan
                                        </Button>
                                    </div>

                                    <div className="flex flex-col md:flex-row w-full xl:w-auto gap-2">
                                        <Button
                                            type="button"
                                            className="bg-[#3ABC67] w-full md:flex-1 xl:w-auto hover:bg-[#329C59] text-white text-xs sm:text-sm"
                                        >
                                            <BiRefresh className="bg-[#FDA31A] rounded-full" /> Batal
                                        </Button>
                                        <Button
                                            type="button"
                                            className="bg-[#F56954] w-full md:flex-1 xl:w-auto hover:bg-[#d45d4b] text-white text-xs sm:text-sm"
                                        >
                                            <FaRegTrashAlt /> Hapus
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        }
                    >
                        <div className="flex flex-col sm:grid sm:grid-rows-5 gap-5 sm:gap-y-0 sm:gap-x-4 grid-flow-col sm:items-center gap-x-4">
                            <FormFieldInput
                                form={form}
                                label="Kode Jabatan"
                                name="kode_jabatan"
                                labelStyle="text-[#3F6FA9]"
                                required={true}
                            />
                            <FormFieldInput
                                form={form}
                                label="Jabatan Fungsional"
                                name="jabatan)fungsional"
                                labelStyle="text-[#3F6FA9]"
                                required={true}
                            />
                            <FormFieldSelect
                                form={form}
                                label="Jabatan Akademik"
                                name="jabatan_akademik"
                                labelStyle="text-[#3F6FA9]"
                                options={[
                                    { label: "Admin", value: "admin" },
                                    { label: "User", value: "user" },
                                    { label: "Guest", value: "guest" },
                                ]}
                                placeholder="--Pilih Jabatan Akademik--"
                                required={true}
                            />
                            <FormFieldSelect
                                form={form}
                                label="Golongan Pangkat"
                                name="golongan_pangkat"
                                labelStyle="text-[#3F6FA9]"
                                options={[
                                    { label: "Admin", value: "admin" },
                                    { label: "User", value: "user" },
                                    { label: "Guest", value: "guest" },
                                ]}
                                placeholder="--Pilih Golongan Pangkat--"
                                required={false}
                            />
                            <FormFieldInput
                                form={form}
                                label="Angka Kredit"
                                name="angka_kredit"
                                labelStyle="text-[#3F6FA9]"
                                required={true}
                            />
                            <FormFieldInput
                                form={form}
                                label="Usia Pensiun"
                                name="usia_pensiun"
                                labelStyle="text-[#3F6FA9]"
                                required={true}
                            />
                            <FormFieldSelect
                                form={form}
                                label="Referensi Sister"
                                name="referensi_sister"
                                labelStyle="text-[#3F6FA9]"
                                options={[
                                    { label: "Admin", value: "admin" },
                                    { label: "User", value: "user" },
                                    { label: "Guest", value: "guest" },
                                ]}
                                placeholder="--Pilih Referensi Sister--"
                                required={false}
                            />
                            <FormFieldInput
                                form={form}
                                label="Keterangan"
                                name="keterangan"
                                labelStyle="text-[#3F6FA9]"
                                required={false}
                                type="textarea"
                            />
                        </div>
                    </CustomCard>
                </form>
            </Form>
        </div>
    );
};

export default EditJabatanFungsionalReferensi;
