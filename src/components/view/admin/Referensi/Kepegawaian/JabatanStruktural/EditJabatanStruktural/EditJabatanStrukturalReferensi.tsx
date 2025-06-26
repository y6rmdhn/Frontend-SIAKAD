import CustomCard from "@/components/blocks/Card";
import Title from "@/components/blocks/Title";
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { IoIosArrowBack } from "react-icons/io";
import { IoSaveSharp } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";
import { BiRefresh } from "react-icons/bi";
import { FormFieldSelect } from "@/components/blocks/CustomFormSelect/CustomFormSelect";
import { Link } from "react-router-dom";
import SearchInput from "@/components/blocks/SearchInput";

const EditJabatanStrukturalReferensi = () => {
    const form = useForm({})

    return (
        <div className="mt-10 mb-20">
            <Title title="Jabatan Struktural" subTitle="Edit Detail Jabatan Struktural" />

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
                                            to="/admin/referensi/kepegawaian/jabatan-struktural"
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
                        <div className="grid grid-rows-7 md:grid-flow-col items-center gap-x-4 gap-y-4 md:gap-y-0">
                            <FormFieldInput
                                form={form}
                                label="Kode"
                                name="kode"
                                labelStyle="text-[#3F6FA9]"
                                required={true}
                            />
                            <FormFieldInput
                                form={form}
                                label="Nama Jabatan Struktural"
                                name="nama_jabatan_struktural"
                                labelStyle="text-[#3F6FA9]"
                                required={true}
                            />
                            <FormFieldSelect
                                form={form}
                                label="Jenis Jabatan Struktural"
                                name="jenis_jabatan_struktural"
                                labelStyle="text-[#3F6FA9]"
                                options={[
                                    { label: "Admin", value: "admin" },
                                    { label: "User", value: "user" },
                                    { label: "Guest", value: "guest" },
                                ]}
                                placeholder="--Pilih Jabatan Struktural--"
                                required={false}
                            />
                            <FormFieldInput
                                form={form}
                                label="Singkatan"
                                name="singkatan"
                                labelStyle="text-[#3F6FA9]"
                                required={false}
                            />
                            <FormFieldSelect
                                form={form}
                                label="Parenet Jabatan Struktural"
                                name="parenet_jabatan_struktural"
                                labelStyle="text-[#3F6FA9]"
                                options={[
                                    { label: "Admin", value: "admin" },
                                    { label: "User", value: "user" },
                                    { label: "Guest", value: "guest" },
                                ]}
                                placeholder="-Pilih Parent Jabatan-"
                                required={false}
                            />
                            <FormFieldSelect
                                form={form}
                                label="Unit Kerja"
                                name="unit_kerja"
                                labelStyle="text-[#3F6FA9]"
                                options={[
                                    { label: "Admin", value: "admin" },
                                    { label: "User", value: "user" },
                                    { label: "Guest", value: "guest" },
                                ]}
                                placeholder="Universitas Ibn Khaldun"
                                required={false}
                            />
                            <FormFieldInput
                                form={form}
                                label="Alamat Email"
                                name="alamat_email"
                                labelStyle="text-[#3F6FA9]"
                                required={false}
                            />
                            <FormFieldSelect
                                form={form}
                                label="Eselon"
                                name="eselon"
                                labelStyle="text-[#3F6FA9]"
                                options={[
                                    { label: "Admin", value: "admin" },
                                    { label: "User", value: "user" },
                                    { label: "Guest", value: "guest" },
                                ]}
                                placeholder="--Pilih Eselon--"
                                required={false}
                            />
                            <FormFieldSelect
                                form={form}
                                label="Pangkat Min"
                                name="pangkat_min"
                                labelStyle="text-[#3F6FA9]"
                                options={[
                                    { label: "Admin", value: "admin" },
                                    { label: "User", value: "user" },
                                    { label: "Guest", value: "guest" },
                                ]}
                                placeholder="--Pilih Pangkat Min--"
                                required={false}
                            />
                            <FormFieldSelect
                                form={form}
                                label="Pangkat Max"
                                name="pangkat_max"
                                labelStyle="text-[#3F6FA9]"
                                options={[
                                    { label: "Admin", value: "admin" },
                                    { label: "User", value: "user" },
                                    { label: "Guest", value: "guest" },
                                ]}
                                placeholder="--Pilih Pangkat Max--"
                                required={false}
                            />
                            <FormFieldInput
                                form={form}
                                label="Beban Sks"
                                name="beban_sks"
                                labelStyle="text-[#3F6FA9]"
                                required={false}
                            />
                            <FormFieldInput
                                form={form}
                                label="is Pimpinan"
                                name="is_pimpinan"
                                labelStyle="text-[#3F6FA9]"
                                required={false}
                                type="checkbox"
                            />
                            <FormFieldInput
                                form={form}
                                label="Aktif"
                                name="aktif"
                                labelStyle="text-[#3F6FA9]"
                                required={false}
                                type="checkbox"
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

export default EditJabatanStrukturalReferensi;
