import CustomCard from "@/components/blocks/Card";
import Title from "@/components/blocks/Title";
import {Button} from "@/components/ui/button";
import {MdOutlineFileDownload} from "react-icons/md";
import {Link, useNavigate} from "react-router-dom";
import {IoIosArrowBack} from "react-icons/io";
import {Form} from "@/components/ui/form";
import {FormFieldInput} from "@/components/blocks/CustomFormInput/CustomFormInput";
import {FormFieldSelect} from "@/components/blocks/CustomFormSelect/CustomFormSelect";
import InfoList from "@/components/blocks/InfoList";
import {FormFieldInputFile} from "@/components/blocks/CustomFormInputFile/CustomFormInputFile";
import {useForm} from "react-hook-form";
import {useMutation, useQuery} from "@tanstack/react-query";
import dosenServices from "@/services/dosen.services.ts";
import {toast} from "sonner";
import postDosenServices from "@/services/create.dosen.services.ts";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";

// --- Konfigurasi Validasi ---
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_MIME_TYPES = ["application/pdf", "image/jpeg", "image/png"];

// --- Skema Zod untuk Form Organisasi ---
const organisasiSchema = z.object({
    periode_mulai: z.string().min(1, "Tanggal mulai wajib diisi."),
    nama_organisasi: z.string().min(1, "Nama organisasi wajib diisi."),
    periode_selesai: z.string().min(1, "Tanggal selesai wajib diisi."),
    tempat_organisasi: z.string().min(1, "Alamat organisasi wajib diisi."),

    jenis_organisasi: z.string().optional(),
    website: z.string().url("URL website tidak valid.").optional().or(z.literal('')), // Validasi URL jika diisi
    keterangan: z.string().optional(),
    jabatan_dalam_organisasi: z.string().optional(),

    file_dokumen: z.any()
        .optional()
        .refine(
            (files) => !files || files.length === 0 || (files[0] && files[0].size <= MAX_FILE_SIZE),
            `Ukuran file maksimal 5MB.`
        )
        .refine(
            (files) => !files || files.length === 0 || (files[0] && ACCEPTED_MIME_TYPES.includes(files[0].type)),
            "Hanya format .pdf, .jpg, .png yang diterima."
        ),
    submit_type: z.string(),
})
    // Validasi perbandingan tanggal
    .refine(data => new Date(data.periode_selesai) > new Date(data.periode_mulai), {
        message: "Tanggal selesai harus setelah tanggal mulai.",
        path: ["periode_selesai"], // Tampilkan error pada field tanggal selesai
    });

// --- Tipe TypeScript dari Skema ---
type OrganisasiSchema = z.infer<typeof organisasiSchema>;

const DetailOrganisasi = () => {
    const navigate = useNavigate();
    const form = useForm<OrganisasiSchema>({
        resolver: zodResolver(organisasiSchema),
        defaultValues: {
            periode_mulai: "",
            nama_organisasi: "",
            periode_selesai: "",
            tempat_organisasi: "",
            jenis_organisasi: "",
            website: "",
            keterangan: "",
            jabatan_dalam_organisasi: "",
            submit_type: "submit",
            file_dokumen: undefined,
        },
    });

    // get data
    const {data: detailData} = useQuery({
        queryKey: ["organisasi-detail-dosen"],
        queryFn: async () => {
            const response = await dosenServices.getDataOrganisasiWithoutParam();

            return response.data;
        },
    });

    // add data
    const {mutate} = useMutation({
        mutationFn: (formData: FormData) => postDosenServices.addDataOrganisasi(formData),
        onSuccess: (response) => {
            console.log("Server response:", response);
            form.reset();
            toast.success("Data berhasil ditambahkan");
            navigate("/data-riwayat/pengembangan-diri/organisasi");
        },
        onError: (error: any) => {
            console.error("Mutation error:", error);
            const errorMessage = error.response?.data?.message || "Gagal menambahkan data.";
            toast.error(errorMessage);
        },
    });

    const handleSubmitOrganisasi = (values: OrganisasiSchema) => {
        const formData = new FormData();

        Object.keys(values).forEach(key => {
            const valueKey = key as keyof OrganisasiSchema;
            const value = values[valueKey];

            if (key === 'file_dokumen') {
                if (value instanceof FileList && value.length > 0) {
                    formData.append(key, value[0]);
                }
            } else {
                if (value !== null && value !== undefined && value !== "") {
                    formData.append(key, value as string);
                }
            }
        });

        mutate(formData);
    };

    return (
        <div className="mt-10 mb-20">
            <Title title="Data Organisasi" subTitle="Detail Organisasi"/>

            <Form {...form}>
                <form className="mt-10" onSubmit={form.handleSubmit(handleSubmitOrganisasi)}>
                    <CustomCard
                        actions={
                            <div>
                                <div className="w-full flex flex-col sm:flex-row justify-end gap-4">
                                    <Link to="/data-riwayat/pengembangan-diri/organisasi">
                                        <Button
                                            className="bg-green-light-uika hover:bg-[#329C59] cursor-pointer w-full sm:w-auto">
                                            <IoIosArrowBack/>
                                            Kembali ke Daftar
                                        </Button>
                                    </Link>

                                    <Button className="bg-[#FDA31A] hover:bg-[#329C59] cursor-pointer w-full sm:w-auto">
                                        <MdOutlineFileDownload/>
                                        Simpan
                                    </Button>
                                </div>

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

                                <div
                                    className="flex flex-col sm:grid sm:grid-rows-6 grid-flow-col gap-x-5 gap-y-5 sm:gap-y-0 sm:items-center mt-4">
                                    <FormFieldInput
                                        form={form}
                                        label="Tgl. Mulai"
                                        name="periode_mulai"
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
                                        label="Lingkup"
                                        name="jenis_organisasi"
                                        labelStyle="text-[#3F6FA9]"
                                        options={[
                                            {value: "lokal", label: "lokal"},
                                            {value: "nasional", label: "Nasional"},
                                            {value: "internasional", label: "Internasional"},
                                        ]}
                                        required={false}
                                        placeholder="-- Pilih Lingkup --"
                                    />
                                    {/*<FormFieldInput*/}
                                    {/*    form={form}*/}
                                    {/*    label="SK Penugasan"*/}
                                    {/*    name="sk_penugasan"*/}
                                    {/*    placeholder="--Pilih SK Penugasan--"*/}
                                    {/*    type="text"*/}
                                    {/*    required={true}*/}
                                    {/*    labelStyle="text-[#3F6FA9]"*/}
                                    {/*/>*/}
                                    <FormFieldInput
                                        form={form}
                                        label="Website"
                                        name="website"
                                        type="text"
                                        required={false}
                                        labelStyle="text-[#3F6FA9]"
                                    />
                                    {/*<FormFieldInput*/}
                                    {/*    form={form}*/}
                                    {/*    label="Tanggal Input"*/}
                                    {/*    name="tanggal_input"*/}
                                    {/*    required={false}*/}
                                    {/*    labelStyle="text-[#3F6FA9]"*/}
                                    {/*    placeholder="22 April 2025"*/}
                                    {/*/>*/}

                                    <FormFieldInput
                                        form={form}
                                        label="Tgl. Selesai"
                                        name="periode_selesai"
                                        type="date"
                                        required={true}
                                        labelStyle="text-[#3F6FA9]"
                                    />
                                    <FormFieldInput
                                        form={form}
                                        label="Alamat Organisasi"
                                        name="tempat_organisasi"
                                        type="text"
                                        required={true}
                                        labelStyle="text-[#3F6FA9]"
                                    />
                                    <FormFieldInput
                                        form={form}
                                        label="Keterangan"
                                        name="keterangan"
                                        type="text"
                                        required={false}
                                        labelStyle="text-[#3F6FA9]"
                                    />
                                    <FormFieldInput
                                        form={form}
                                        label="Jabatan"
                                        name="jabatan_dalam_organisasi"
                                        type="text"
                                        required={false}
                                        labelStyle="text-[#3F6FA9]"
                                    />
                                    {/*<FormFieldInput*/}
                                    {/*    form={form}*/}
                                    {/*    label="Refleksi"*/}
                                    {/*    name="refleksi"*/}
                                    {/*    type="text"*/}
                                    {/*    required={false}*/}
                                    {/*    labelStyle="text-[#3F6FA9]"*/}
                                    {/*/>*/}
                                    <FormFieldInputFile
                                        form={form}
                                        label="File Pendukung"
                                        name="file_dokumen"
                                        classname="border-none shadow-none"
                                        labelStyle="text-[#3F6FA9]"
                                        required={false}
                                    />
                                </div>

                            </div>
                        }
                    />
                </form>
            </Form>

        </div>
    );
};

export default DetailOrganisasi;
