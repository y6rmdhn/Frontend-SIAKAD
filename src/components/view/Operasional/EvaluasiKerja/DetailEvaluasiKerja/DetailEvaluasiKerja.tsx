import CustomCard from "@/components/blocks/Card";
import Title from "@/components/blocks/Title";
import { Button } from "@/components/ui/button";
import { MdOutlineFileDownload } from "react-icons/md";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { Form } from "@/components/ui/form";
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput";
import { useForm } from "react-hook-form";

const DetailEvaluasiKerja = () => {
    const form = useForm()
    return (
        <div className="mt-10 mb-20">
            <Title title="Evaluasi Kerja" subTitle="Form Evaluasi Kerja" />

            <CustomCard
                actions={
                    <div>
                        <div className="flex justify-end mt-5">
                            <div className="flex flex-col md:flex-row w-full md:w-auto gap-4">
                                <Link
                                    className="w-full md:w-auto"
                                    to="/operasional/evaluasi-kerja"
                                >
                                    <Button className="bg-[#00C0EF] w-full md:w-auto hover:bg-[#329C59] cursor-pointer flex items-center gap-2">
                                        <IoIosArrowBack />
                                        Kembali ke Daftar
                                    </Button>
                                </Link>

                                <Button className="bg-[#3ABC67] hover:bg-[#329C59] cursor-pointer flex items-center gap-2">
                                    <MdOutlineFileDownload />
                                    Simpan
                                </Button>
                            </div>
                        </div>

                        <Form {...form}>
                            <form className="mt-10">
                                <div className="flex flex-col sm:grid sm:grid-rows-4 grid-flow-col gap-x-5 gap-y-5 sm:gap-y-5 sm:items-center mt-4">
                                    <FormFieldInput
                                        form={form}
                                        label="Kehadiran"
                                        name="kehadiran"
                                        type="text"
                                        required={false}
                                        labelStyle="text-black"
                                    />
                                    <FormFieldInput
                                        form={form}
                                        label="Pendidikan"
                                        name="pendidikan"
                                        type="text"
                                        required={false}
                                        labelStyle="text-black"
                                    />
                                    <FormFieldInput
                                        form={form}
                                        label="Penelitian"
                                        name="penelitian"
                                        type="text"
                                        required={false}
                                        labelStyle="text-black"
                                    />
                                    <FormFieldInput
                                        form={form}
                                        label="Pengabadian"
                                        name="pengabadian"
                                        type="text"
                                        required={false}
                                        labelStyle="text-black"
                                    />

                                    <FormFieldInput
                                        form={form}
                                        label="Penerapan Tridharma"
                                        name="penerapan_tridharma"
                                        required={false}
                                        labelStyle="text-black"
                                    />
                                    <FormFieldInput
                                        form={form}
                                        label="Komitmen dan Disiplin"
                                        name="komitmen_dan_disiplin"
                                        type="text"
                                        required={false}
                                        labelStyle="text-black"
                                    />
                                    <FormFieldInput
                                        form={form}
                                        label="Kepemimpinan dan Kerjasama"
                                        name="kepemimpinan_dan_kerjasama"
                                        type="text"
                                        required={false}
                                        labelStyle="text-black"
                                    />
                                    <FormFieldInput
                                        form={form}
                                        label="Inisiatif, Motivasi dan Integritas"
                                        name="inisiatif_motivasi_dan_integritas"
                                        type="text"
                                        required={false}
                                        labelStyle="text-black"
                                    />
                                </div>
                            </form>
                        </Form>
                    </div>
                }
            />


        </div>
    );
};

export default DetailEvaluasiKerja;
