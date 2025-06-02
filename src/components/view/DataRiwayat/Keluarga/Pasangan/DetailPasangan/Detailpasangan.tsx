import {Link} from "react-router-dom";
import CustomCard from "@/components/blocks/Card";
import Title from "@/components/blocks/Title";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {IoIosArrowBack} from "react-icons/io";
import {MdOutlineFileDownload} from "react-icons/md";
import InfoList from "@/components/blocks/InfoList";
import {FormFieldInput} from "@/components/blocks/CustomFormInput/CustomFormInput";
import {Form} from "@/components/ui/form";
import {useForm} from "react-hook-form";
import {FormFieldSelect} from "@/components/blocks/CustomFormSelect/CustomFormSelect";
import {useMutation, useQuery} from "@tanstack/react-query";
import {FormFieldInputFile} from "@/components/blocks/CustomFormInputFile/CustomFormInputFile";
import dosenServices from "@/services/dosen.services.ts";

const DetailPasangan = () => {
    const form = useForm();

    // get data
    const {data} = useQuery({
        queryKey: ["pasangan-detail-dosen"],
        queryFn: async () => {
            const response = await dosenServices.getDataPasanganWithoutParam();
            return response.data;
        },
    });

    return (
        <div className="mt-10 mb-20">
            <Title title="Pasangan" subTitle="Daftar Pasangan"/>

            <Form {...form}>
                <form>
                    <CustomCard
                        actions={
                            <div>
                                <div className="flex flex-col md:flex-row justify-end gap-2">
                                    <Link
                                        className="w-full md:w-auto"
                                        to="/data-riwayat/keluarga/pasangan"
                                    >
                                        <Button className="bg-[#002E5A] w-full md:w-auto hover:bg-hover-blue-200">
                                            <IoIosArrowBack/> Kembali ke Daftar
                                        </Button>
                                    </Link>

                                    <Button className="bg-[#FDA31A] w-full md:w-auto text-white cursor-pointer">
                                        <MdOutlineFileDownload/>
                                        Simpan
                                    </Button>
                                </div>

                                <InfoList
                                    items={[
                                        "NIP",
                                        "Nama",
                                        "Unit Kerja",
                                        "Status",
                                        "Jab. Akademik",
                                        "Jab. Fungsional",
                                        "Jab. Struktural",
                                        "Pendidikan",
                                    ]}
                                />


                                <div className="grid md:grid-cols-2 mt-10 gap-10 border py-4 px-2">
                                    {/* Kolom Kiri */}
                                    <div className="space-y-4 flex flex-col gap-3">
                                        <FormFieldSelect
                                            form={form}
                                            label="Pasangan Kerja dalam satu Instansi?"
                                            name="pasangan_kerja_dalam_satu_instansi"
                                            placeholder="Ya"
                                            options={[
                                                {label: "Ya", value: "ya"},
                                                {label: "Tidak", value: "tidak"},
                                            ]}
                                            labelStyle="text-[#3F6FA9]"
                                            required={false}
                                        />

                                        <FormFieldInput
                                            form={form}
                                            label="Nama"
                                            name="nama"
                                            labelStyle="text-[#3F6FA9]"
                                            placeholder="Cari nama Pasangan"
                                            required={false}
                                        />

                                        <FormFieldInput
                                            form={form}
                                            label="Tempat Lahir"
                                            name="tempat_lahir"
                                            labelStyle="text-[#3F6FA9]"
                                            required={false}
                                        />

                                        <FormFieldInput
                                            form={form}
                                            label="Tgl Lahir"
                                            name="tanggal_lahir"
                                            type="text"
                                            labelStyle="text-[#3F6FA9]"
                                            required={false}
                                        />

                                        <FormFieldInput
                                            form={form}
                                            label="Jenis Pekerjaan"
                                            name="jenis_pekerjaan"
                                            labelStyle="text-[#3F6FA9]"
                                            required={false}
                                        />

                                        <FormFieldInput
                                            form={form}
                                            label="Status Kepegawaian"
                                            name="status_kepegawaian"
                                            labelStyle="text-[#3F6FA9]"
                                            required={false}
                                        />
                                    </div>

                                    {/* Kolom Kanan */}
                                    <div className="space-y-4 flex flex-col gap-1">
                                        <FormFieldInput
                                            form={form}
                                            label="KARPEG Pasangan"
                                            name="karpeg_pasangan"
                                            labelStyle="text-[#3F6FA9]"
                                            required={false}
                                        />
                                        <FormFieldInputFile
                                            form={form}
                                            label="File KARPEG Pasangan"
                                            name="file_karpeg_pasangan"
                                            classname="border-none shadow-none"
                                            labelStyle="text-[#3F6FA9]"
                                            required={false}
                                        />
                                        <FormFieldInput
                                            form={form}
                                            label="Kartu Nikah"
                                            name="kartu_nikah"
                                            labelStyle="text-[#3F6FA9]"
                                            required={false}
                                        />
                                        <div className="flex flex-col gap-3">
                                            <Label className="text-[#3F6FA9] text-xs sm:text-sm">Status
                                                Pengajuan</Label>
                                            <Label className="text-[#3F6FA9] text-xs sm:text-sm">Tanggal Input</Label>
                                        </div>
                                        <div className="flex flex-col gap-3">
                                            <Label className="text-[#3F6FA9] text-xs sm:text-sm">Tanggal
                                                Diajukan</Label>
                                            <Label className="text-[#3F6FA9] text-xs sm:text-sm">Tanggal Ditolak</Label>
                                        </div>
                                        <div className="flex flex-col gap-3">
                                            <Label className="text-[#3F6FA9] text-xs sm:text-sm">Tanggal
                                                Disetujui</Label>
                                            <Label className="text-[#3F6FA9] text-xs sm:text-sm">Keterangan</Label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    />
                </form>
            </Form>
        </div>
    );
};

export default DetailPasangan;
