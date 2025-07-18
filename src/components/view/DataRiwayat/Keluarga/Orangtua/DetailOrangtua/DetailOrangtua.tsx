import {Link, useNavigate} from "react-router-dom";
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
import {useMutation, useQuery} from "@tanstack/react-query";
import {FormFieldSelect} from "@/components/blocks/CustomFormSelect/CustomFormSelect";
import dosenServices from "@/services/dosen.services.ts";
import postDosenServices from "@/services/create.dosen.services.ts";
import {IOrangtuaPost} from "@/types/create.dosen.ts";
import {toast} from "sonner";
import { z } from "zod";
import {zodResolver} from "@hookform/resolvers/zod";

export const orangtuaSchema = z.object({
    nama: z.string().min(1, { message: "Nama Orang Tua tidak boleh kosong." }),
    status_orangtua: z.string().optional(),
    tempat_lahir: z
        .string()
        .min(1, { message: "Tempat Lahir tidak boleh kosong." }),
    tgl_lahir: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "Tanggal Lahir tidak valid.",
    }).refine(val => new Date(val) <= new Date(), {
        message: "Tanggal Lahir tidak boleh di masa depan."
    }),
    alamat: z.string().optional(),
    telepon: z
        .string()
        .optional()
        .refine(
            (val) => val === undefined || val === "" || /^[0-9]+$/.test(val),
            {
                message: "Nomor Telepon hanya boleh berisi angka.",
            }
        ),
    pekerjaan: z.string().optional(),
    keterangan: z.string().optional(),
    submit_type: z.string().optional(),
});

export type OrangtuaFormData = z.infer<typeof orangtuaSchema>;

const DetailOrangtua = () => {
    const form = useForm({
        defaultValues: {
            nama: "",
            status_orangtua: "",
            tempat_lahir: "",
            tgl_lahir: "",
            alamat: "",
            telepon: "",
            pekerjaan: "",
            submit_type: "submit",
            keterangan: "",
        }, resolver: zodResolver(orangtuaSchema)
    });
    const navigate = useNavigate();

    // get data
    const {data} = useQuery({
        queryKey: ["orangtua-detail-dosen"],
        queryFn: async () => {
            const response = await dosenServices.getDataOrangtuaWithoutParam();
            return response.data;
        },
    });

    //   add data
    const {mutate} = useMutation({
        mutationFn: (data: IOrangtuaPost) => postDosenServices.addDataOrangtua(data),
        onSuccess: () => {
            form.reset();
            toast.success("Data berhasil ditambahkan");
            navigate("/data-riwayat/keluarga/orangtua");
        },
        onError: (error: any) => {
            console.error("Mutation error:", error.response.data);
        }
    })


    const handleSubmitOrangtua = (values: OrangtuaFormData) => {
        mutate(values);
    }

    return (
        <div className="mt-10 mb-20">
            <Title title="Orang Tua" subTitle="Daftar Orang Tua"/>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmitOrangtua)}>
                    <CustomCard
                        actions={
                            <div>
                                <div className="flex flex-col md:flex-row justify-end gap-2">
                                    <Link
                                        className="w-full md:w-auto"
                                        to="/data-riwayat/keluarga/orangtua"
                                    >
                                        <Button type="button" className="bg-green-light-uika w-full md:w-auto hover:bg-hover-blue-200">
                                            <IoIosArrowBack/> Kembali ke Daftar
                                        </Button>
                                    </Link>

                                    <Button type="submit" className="bg-[#FDA31A] w-full md:w-auto text-white cursor-pointer">
                                        <MdOutlineFileDownload/>
                                        Simpan
                                    </Button>
                                </div>

                                <InfoList
                                    items={[
                                        {label: "NIP", value: data?.pegawai_info.nip},
                                        {label: "Nama", value: data?.pegawai_info.nama},
                                        {label: "Unit Kerja", value: data?.pegawai_info.unit_kerja},
                                        {label: "Status", value: data?.pegawai_info.status},
                                        {label: "Jab. Akademik", value: data?.pegawai_info.jab_akademik},
                                        {label: "Jab. Fungsional", value: data?.pegawai_info.jab_fungsional},
                                        {label: "Jab. Struktural", value: data?.pegawai_info.jab_struktural},
                                        {label: "Pendidikan", value: data?.pegawai_info.pendidikan},
                                    ]}
                                />


                                <div className="grid md:grid-cols-2 mt-10 gap-10">
                                    {/* Kolom Kiri */}
                                    <div className="space-y-4">
                                        <FormFieldInput
                                            form={form}
                                            label="Nama Orang Tua"
                                            name="nama"
                                            labelStyle="text-[#3F6FA9]"
                                            required={true}
                                        />

                                        <FormFieldSelect
                                            form={form}
                                            label="Jenis Orang Tua"
                                            name="status_orangtua"
                                            placeholder="--Pilih--"
                                            options={[
                                                {label: "Ayah", value: "Ayah"},
                                                {label: "Ibu", value: "Ibu"},
                                            ]}
                                            labelStyle="text-[#3F6FA9]"
                                            required={false}
                                        />

                                        <FormFieldInput
                                            form={form}
                                            label="Tempat Lahir"
                                            name="tempat_lahir"
                                            labelStyle="text-[#3F6FA9]"
                                            required={true}
                                        />

                                        <FormFieldInput
                                            form={form}
                                            label="Tanggal Lahir"
                                            name="tgl_lahir"
                                            type="date"
                                            labelStyle="text-[#3F6FA9]"
                                            required={true}
                                        />

                                        <FormFieldInput
                                            form={form}
                                            label="Alamat"
                                            name="alamat"
                                            labelStyle="text-[#3F6FA9]"
                                            required={false}
                                        />

                                        <FormFieldInput
                                            form={form}
                                            label="Telpon"
                                            name="telepon"
                                            labelStyle="text-[#3F6FA9]"
                                            required={false}
                                        />

                                        <FormFieldSelect
                                            form={form}
                                            label="Keterangan"
                                            name="keterangan"
                                            placeholder="--Keterangan--"
                                            options={[
                                                {label: "Ibu Kandung", value: "Data ibu kandung"},
                                                {label: "Ayah Kandung", value: "Data ayah kandung"},
                                            ]}
                                            labelStyle="text-[#3F6FA9]"
                                            required={false}
                                        />

                                        <FormFieldInput
                                            form={form}
                                            label="Pekerjaan"
                                            name="pekerjaan"
                                            labelStyle="text-[#3F6FA9]"
                                            required={false}
                                        />
                                    </div>

                                    {/* Kolom Kanan */}
                                    <div className="space-y-4">
                                        <div
                                            className="flex flex-col gap-2 bg-white shadow-md p-3 sm:flex-row sm:gap-14 sm:p-4">
                                            <Label className="font-bold w-full text-[#2572BE] sm:w-50">
                                                Tanggal Input
                                            </Label>
                                            <Label className="w-full sm:w-50 text-[#2572BE]">
                                                26 Maret 2026
                                            </Label>
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

export default DetailOrangtua;
