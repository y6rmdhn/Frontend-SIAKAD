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


const EditDataUnitKerja = () => {
    const form = useForm();

    return (
        <div className="mt-10 mb-20">
            <Title title="Unit Kerja" subTitle="Detail Unit kerja" />

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
                                            to="/admin/referensi/kepegawaian/unit-kerja"
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
                        <div className="grid grid-rows-10 md:grid-flow-col items-center gap-x-4 gap-y-4 md:gap-y-0">
                            <FormFieldInput
                                form={form}
                                label="Kode Unit"
                                name="kodeUnit"
                                labelStyle="text-[#3F6FA9]"
                                required={true}
                            />
                            <FormFieldInput
                                form={form}
                                label="Nama Unit"
                                name="namaUnit"
                                labelStyle="text-[#3F6FA9]"
                                required={true}
                            />
                            <FormFieldInput
                                form={form}
                                label="Nama Unit(EN)"
                                name="namaUnitEn"
                                labelStyle="text-[#3F6FA9]"
                                required={false}
                            />
                            <FormFieldInput
                                form={form}
                                label="Nama Singkat"
                                name="namaSingkat"
                                labelStyle="text-[#3F6FA9]"
                                required={false}
                            />
                            <FormFieldSelect
                                form={form}
                                label="Parent Unit"
                                name="parentUnit"
                                labelStyle="text-[#3F6FA9]"
                                options={[
                                    { label: "Admin", value: "admin" },
                                    { label: "User", value: "user" },
                                    { label: "Guest", value: "guest" },
                                ]}
                                placeholder="--Pilih Parent Unit--"
                                required={false}
                            />
                            <FormFieldSelect
                                form={form}
                                label="Jenis Unit"
                                name="jenisUnit"
                                labelStyle="text-[#3F6FA9]"
                                options={[
                                    { label: "Admin", value: "admin" },
                                    { label: "User", value: "user" },
                                    { label: "Guest", value: "guest" },
                                ]}
                                placeholder="--Pilih Jenis Unit--"
                                required={false}
                            />
                            <FormFieldSelect
                                form={form}
                                label="TK.Pendidikan"
                                name="tkPendidikan"
                                labelStyle="text-[#3F6FA9]"
                                options={[
                                    { label: "Admin", value: "admin" },
                                    { label: "User", value: "user" },
                                    { label: "Guest", value: "guest" },
                                ]}
                                placeholder="--Pilih Tk.Pendidikan--"
                                required={false}
                            />
                            <FormFieldInput
                                form={form}
                                label="Alamat"
                                name="alamat"
                                labelStyle="text-[#3F6FA9]"
                                required={false}
                                type="textarea"
                            />
                            <FormFieldInput
                                form={form}
                                label="Telpon"
                                name="telpon"
                                labelStyle="text-[#3F6FA9]"
                                required={false}
                            />
                            <FormFieldInput
                                form={form}
                                label="Website"
                                name="website"
                                labelStyle="text-[#3F6FA9]"
                                required={false}
                            />
                            <FormFieldInput
                                form={form}
                                label="Alamat Email"
                                name="alamatEmail"
                                labelStyle="text-[#3F6FA9]"
                                required={false}
                            />
                            <FormFieldSelect
                                form={form}
                                label="Akreditasi"
                                name="akreditasi"
                                labelStyle="text-[#3F6FA9]"
                                options={[
                                    { label: "Admin", value: "admin" },
                                    { label: "User", value: "user" },
                                    { label: "Guest", value: "guest" },
                                ]}
                                placeholder="-Pilih Akreditasi-"
                                required={false}
                            />
                            <FormFieldInput
                                form={form}
                                label="No.SK Akreditasi"
                                name="noSkAkreditasi"
                                labelStyle="text-[#3F6FA9]"
                                required={false}
                            />
                            <FormFieldInput
                                form={form}
                                label="Tanggal Akreditasi"
                                name="noSkAkreditasi"
                                labelStyle="text-[#3F6FA9]"
                                required={false}
                                type="date"
                            />
                            <FormFieldInput
                                form={form}
                                label="No.SK Pendirian"
                                name="noSkPendirian"
                                labelStyle="text-[#3F6FA9]"
                                required={false}
                            />
                            <FormFieldInput
                                form={form}
                                label="Tanggal Sk Pendirian"
                                name="tanggalSkPendirian"
                                labelStyle="text-[#3F6FA9]"
                                required={false}
                                type="date"
                            />
                            <FormFieldSelect
                                form={form}
                                label="Gedung"
                                name="gedung"
                                labelStyle="text-[#3F6FA9]"
                                options={[
                                    { label: "Admin", value: "admin" },
                                    { label: "User", value: "user" },
                                    { label: "Guest", value: "guest" },
                                ]}
                                placeholder="Pilih Gedung"
                                required={false}
                            />
                            <FormFieldInput
                                form={form}
                                label="Akademik"
                                name="akademik"
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
                        </div>
                    </CustomCard>
                </form>
            </Form>
        </div>
    );
};

export default EditDataUnitKerja;
