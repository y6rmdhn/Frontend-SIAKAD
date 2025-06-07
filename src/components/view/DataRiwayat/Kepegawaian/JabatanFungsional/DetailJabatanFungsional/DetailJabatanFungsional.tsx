import CustomCard from "@/components/blocks/Card";
import Title from "@/components/blocks/Title";
import {Button} from "@/components/ui/button";
import {Link, useNavigate} from "react-router-dom";
import {IoIosArrowBack} from "react-icons/io";
import {MdOutlineFileDownload} from "react-icons/md";
import {useForm} from "react-hook-form";
import {Form} from "@/components/ui/form";
import {FormFieldSelect} from "@/components/blocks/CustomFormSelect/CustomFormSelect";
import {FormFieldInput} from "@/components/blocks/CustomFormInput/CustomFormInput";
import {FormFieldInputFile} from "@/components/blocks/CustomFormInputFile/CustomFormInputFile";
import InfoList from "@/components/blocks/InfoList";
import {useMutation, useQuery} from "@tanstack/react-query";
import dosenServices from "@/services/dosen.services.ts";
import {toast} from "sonner";
import postDosenServices from "@/services/create.dosen.services.ts";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";


// --- Konfigurasi Validasi File ---
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB dalam bytes
const ACCEPTED_MIME_TYPES = ["application/pdf"];

// --- Skema Validasi Zod ---
const detailJabatanFungsionalSchema = z.object({
    jabatan_fungsional_id: z.string({
        required_error: "Nama Jabatan wajib diisi.",
    }).min(1, "Nama Jabatan wajib diisi."),
    tmt_jabatan: z.string().min(1, "TMT. Jabatan wajib diisi."),
    no_sk: z.string().min(1, "No SK is required."),
    tanggal_sk: z.string().min(1, "Tanggal Sk is required."),
    file_sk_jabatan: z
        .any()
        .optional()
        .refine(
            (files) => !files || files.length === 0 || (files[0] && files[0].size <= MAX_FILE_SIZE),
            `Ukuran file maksimal adalah 5MB.`
        )
        .refine(
            (files) => !files || files.length === 0 || (files[0] && ACCEPTED_MIME_TYPES.includes(files[0].type)),
            "Hanya file dengan format .pdf yang diterima."
        ),
    pejabat_penetap: z.string().min(1, "Pejabat penetap is required."),
    submit_type: z.string(),
});

type DetailJabatanFungsionalSchema = z.infer<typeof detailJabatanFungsionalSchema>;

const DetailJabatanFungsional = () => {
    const navigate = useNavigate();
    const form = useForm({
        defaultValues: {
            jabatan_fungsional_id: "",
            tmt_jabatan: "",
            no_sk: "",
            tanggal_sk: "",
            file_sk_jabatan: undefined,
            pejabat_penetap: "",
            submit_type: "submit"
        }, resolver: zodResolver(detailJabatanFungsionalSchema)
    });


    // get data
    const {data: detailData} = useQuery({
        queryKey: ["jabatan-fungsional-detail-dosen"],
        queryFn: async () => {
            const response = await dosenServices.getDataJabatanakfungsionalWithoutParam();

            return response.data;
        },
    });

    // add data
    const {mutate} = useMutation({
        mutationFn: (formData: FormData) => postDosenServices.addDataJabatanfungsional(formData),
        onSuccess: (response) => {
            console.log("Server response:", response);
            form.reset();
            toast.success("Data berhasil ditambahkan");
            navigate("/data-riwayat/kepegawaian/jabatan-fungsional");
        },
        onError: (error: any) => {
            console.error("Mutation error:", error);
            const errorMessage = error.response?.data?.message || "Gagal menambahkan data.";
            toast.error(errorMessage);
        },
    });

    const handleSubmitJabatanFungsional = (values: DetailJabatanFungsionalSchema) => {
        const formData = new FormData();

        Object.keys(values).forEach(key => {
            const value = values[key as keyof DetailJabatanFungsionalSchema];

            if (key === 'file_sk_jabatan    </Button>') {
                                        if (value instanceof FileList && value.length > 0) {
                                        formData.append(key, value[0]);
                                    }
                                    } else {
                                        if (value !== null && value !== undefined) {
                                        formData.append(key, value as string);
                                    }
                                    }
                                        });

                                        mutate(formData);
                                        };

                                        return (
                                        <div className="mt-10 mb-20">
                                            <Title title="Jabatan Fungsional" subTitle="Detail Jabatan Fungsional"/>
                                            <Form {...form}>
                                                <form onSubmit={form.handleSubmit(handleSubmitJabatanFungsional)}>
                                                    <CustomCard
                                                        actions={
                                                            <div className="flex justify-end w-full mt-10">
                                                                <div className="flex justify-end gap-2 w-full md:w-auto flex-col md:flex-row">
                                                                    <Link
                                                                        className="w-full md:w-auto"
                                                                        to="/data-riwayat/kepegawaian/jabatan-fungsional"
                                                                    >
                                                                        <Button
                                                                            className="bg-green-light-uika w-full md:w-auto hover:bg-[#329C59] cursor-pointer flex items-center gap-2">
                                                                            <IoIosArrowBack/>
                                                                            Kembali ke Daftar

                                                                    </Link>

                                    <Button
                                        className="bg-[#FDA31A] w-full md:w-auto hover:bg-[#329C59] cursor-pointer flex items-center gap-2">
                                        <MdOutlineFileDownload/>
                                        Simpan
                                    </Button>
                                </div>
                            </div>
                        }
                    />

                    <InfoList
                        items={[
                            {label: "NIP", value: detailData?.pegawai_info.nip},
                            {label: "Nama", value: detailData?.pegawai_info.nama},
                            {label: "Unit Kerja", value: detailData?.pegawai_info.unit_kerja},
                            {label: "Status", value: detailData?.pegawai_info.status},
                            {label: "Jab. Akademik", value: detailData?.pegawai_info.jab_akademik},
                            {label: "Jab. Fungsional", value: detailData?.pegawai_info.jab_fungsional},
                            {label: "Jab. Struktural", value: detailData?.pegawai_info.jab_struktural},
                            {label: "Pendidikan", value: detailData?.pegawai_info.pendidikan},
                        ]}
                    />

                    <div className="mt-10 grid md:grid-rows-3 md:grid-flow-col md:items-center gap-6 w-full">
                        <FormFieldSelect
                            form={form}
                            label="Nama Jabatan"
                            name="jabatan_fungsional_id"
                            labelStyle="text-[#3F6FA9]"
                            options={[
                                {value: "2", label: "Asisten Ahli"},
                                {value: "3", label: "Lektor"},
                                {value: "5", label: "Lektor Kepala"},
                                {value: "8", label: "Guru Besar"},
                                {value: "10", label: "Dosen Praktisi"},
                                {value: "11", label: "Dosen Tidak Tetap"},
                                {value: "12", label: "Tenaga Ahli"},

                            ]}
                            required={true}
                            placeholder="-- Pilih Nama Jabatan --"
                        />
                        <FormFieldInput
                            form={form}
                            label="TMT. Jabatan"
                            name="tmt_jabatan"
                            type="date"
                            required={true}
                            labelStyle="text-[#3F6FA9]"
                        />
                        <FormFieldInput
                            form={form}
                            label="No. SK"
                            name="no_sk"
                            required={false}
                            labelStyle="text-[#3F6FA9]"
                        />
                        <FormFieldInput
                            form={form}
                            label="Tgl. SK"
                            name="tanggal_sk"
                            type="date"
                            required={false}
                            labelStyle="text-[#3F6FA9]"
                        />

                        <FormFieldInputFile
                            form={form}
                            label="File Jabatan"
                            name="file_sk_jabatan"
                            classname="border-none shadow-none"
                            labelStyle="text-[#3F6FA9]"
                            required={false}
                        />

                        <FormFieldInput
                            form={form}
                            label="Pejabat Penetap"
                            name="pejabat_penetap"
                            required={false}
                            labelStyle="text-[#3F6FA9]"
                        />
                    </div>
                </form>
            </Form>
            {/*<div className="w-full border-b-2 border-b-green-light-uika mt-4"></div>*/}
            {/*<Form {...form}>*/}
            {/*    <form>*/}
            {/*        <div className="md:w-96 mt-4">*/}
            {/*            <FormFieldInput*/}
            {/*                form={form}*/}
            {/*                label="Tanggal Input"*/}
            {/*                name="tanggal_input"*/}
            {/*                required={false}*/}
            {/*                labelStyle="text-[#3F6FA9]"*/}
            {/*                placeholder="22 April 2025"*/}
            {/*            />*/}
            {/*        </div>*/}
            {/*    </form>*/}
            {/*</Form>*/}
        </div>
    );
};

export default DetailJabatanFungsional;
