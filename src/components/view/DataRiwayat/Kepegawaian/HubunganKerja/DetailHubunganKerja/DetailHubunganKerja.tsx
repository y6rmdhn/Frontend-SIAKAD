import CustomCard from "@/components/blocks/Card";
import Title from "@/components/blocks/Title";
import {Button} from "@/components/ui/button";
import {Link, useNavigate} from "react-router-dom";
import {IoIosArrowBack} from "react-icons/io";
import {MdOutlineFileDownload} from "react-icons/md";
import {useForm} from "react-hook-form";
import {Form} from "@/components/ui/form";
import {FormFieldInput} from "@/components/blocks/CustomFormInput/CustomFormInput";
import {FormFieldSelect} from "@/components/blocks/CustomFormSelect/CustomFormSelect";
import {FormFieldInputFile} from "@/components/blocks/CustomFormInputFile/CustomFormInputFile";
import InfoList from "@/components/blocks/InfoList";
import {useMutation, useQuery} from "@tanstack/react-query";
import dosenServices from "@/services/dosen.services.ts";
import {toast} from "sonner";
import postDosenServices from "@/services/create.dosen.services.ts";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_MIME_TYPES = ["application/pdf"];

const detailHubunganKerjaSchema = z.object({
    hubungan_kerja_id: z.string().min(1, "Hubungan Kerja wajib diisi."),
    status_aktif_id: z.string().min(1, "Status Aktif wajib diisi."),
    tgl_awal: z.string().min(1, "Tanggal mulai wajib diisi."),
    no_sk: z.string().min(1, "No SK wajib diisi."),
    tgl_sk: z.string().min(1, "Tanggal SK wajib diisi."),
    pejabat_penetap: z.string().min(1, "Pejabat penetap wajib diisi."),
    file_hubungan_kerja: z
        .any()
        .optional()
        .refine(
            (files) => !files || files.length === 0 || (files[0] && files[0].size <= MAX_FILE_SIZE),
            `Ukuran file maksimal 5MB.`
        )
        .refine(
            (files) => !files || files.length === 0 || (files[0] && ACCEPTED_MIME_TYPES.includes(files[0].type)),
            "Hanya file format .pdf yang diterima."
        ),
    tgl_akhir: z.string().optional(),
    keterangan: z.string().optional(),
})
    .refine(
        (data) => {
            if (!data.tgl_akhir || !data.tgl_awal) {
                return true;
            }
            return new Date(data.tgl_akhir) > new Date(data.tgl_awal);
        },
        {
            message: "Tanggal akhir harus setelah tanggal mulai.",
            path: ["tgl_akhir"],
        }
    );

type DetailHubunganKerjaSchema = z.infer<typeof detailHubunganKerjaSchema>;

const DetailHubunganKerja = () => {
    const navigate = useNavigate();
    const form = useForm({
        defaultValues: {
            hubungan_kerja_id: "",
            status_aktif_id: "",
            tgl_awal: "",
            no_sk: "",
            tgl_sk: "",
            pejabat_penetap: "",
            tgl_akhir: "",
            file_hubungan_kerja: undefined,
            keterangan: "",
        }, resolver: zodResolver(detailHubunganKerjaSchema)
    });

    // get data
    const {data: detailData} = useQuery({
        queryKey: ["hubungan-kerja-detail-dosen"],
        queryFn: async () => {
            const response = await dosenServices.getDataHubunganKerjaWithoutParam();

            return response.data;
        },
    });

    // add data
    const {mutate} = useMutation({
        mutationFn: (formData: FormData) => postDosenServices.addDataHubungankerja(formData),
        onSuccess: (response) => {
            console.log("Server response:", response);
            form.reset();
            toast.success("Data berhasil ditambahkan");
            navigate("/data-riwayat/kepegawaian/hubungan-kerja");
        },
        onError: (error: any) => {
            console.error("Mutation error:", error);
            const errorMessage = error.response?.data?.message || "Gagal menambahkan data.";
            toast.error(errorMessage);
        },
    });

    const handleSubmitHubungankerja = (values: DetailHubunganKerjaSchema) => {
        const formData = new FormData();

        Object.keys(values).forEach(key => {
            const valueKey = key as keyof DetailHubunganKerjaSchema;
            const value = values[valueKey];

            if (key === 'file_hubungan_kerja') {
                if (value instanceof FileList && value.length > 0) {
                    formData.append(key, value[0]);
                }
            } else {
                if (value !== null && value !== undefined && value !== "") {
                    formData.append(key, value as string);
                }
            }
        });

        // 4. Panggil 'mutate' dengan FormData yang sudah disiapkan
        mutate(formData);
    };

    return (
        <div className="mt-10 mb-20">
            <Title title="Data Hubungan Kerja" subTitle="Detail Hubungan Kerja"/>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmitHubungankerja)}>
                    <CustomCard
                        actions={
                            <div className="flex justify-end w-full mt-10">
                                <div className="flex justify-end gap-2 w-full md:w-auto flex-col md:flex-row">
                                    <Link
                                        className="w-full md:w-auto"
                                        to="/data-riwayat/kepegawaian/hubungan-kerja"
                                    >
                                        <Button
                                            className="bg-green-light-uika w-full md:w-auto hover:bg-[#329C59] cursor-pointer flex items-center gap-2">
                                            <IoIosArrowBack/>
                                            Kembali ke Daftar
                                        </Button>
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

                    <div className="mt-10 grid md:grid-rows-5 md:grid-flow-col md:items-center gap-6 w-full">
                        <FormFieldSelect
                            form={form}
                            label="Hubungan Kerja"
                            name="hubungan_kerja_id"
                            labelStyle="text-[#3F6FA9]"
                            options={[
                                {value: "1", label: "Tetap Yayasan Dosen"},
                                {value: "2", label: "Tetap Yayasan Karyawan"},
                                {value: "3", label: "PNS/DPK"},
                                {value: "4", label: "Dosen Tidak Tetap"},
                                {value: "5", label: "Kontrak"},
                                {value: "6", label: "Kontrak Fakultas"},
                            ]}
                            required={false}
                            placeholder="-- Pilih Hubungan Kerja --"
                        />
                        <FormFieldInput
                            form={form}
                            label="No SK"
                            name="no_sk"
                            required={false}
                            labelStyle="text-[#3F6FA9]"
                        />
                        <FormFieldInput
                            form={form}
                            label="Tgl. SK"
                            name="tgl_sk"
                            type="date"
                            required={false}
                            labelStyle="text-[#3F6FA9]"
                        />
                        <FormFieldInputFile
                            form={form}
                            label="File Hubungan Kerja"
                            name="file_hubungan_kerja"
                            classname="border-none shadow-none"
                            labelStyle="text-[#3F6FA9]"
                            required={false}
                        />

                        {/*<FormFieldInput*/}
                        {/*    form={form}*/}
                        {/*    label="Keterangan"*/}
                        {/*    name="keterangan"*/}
                        {/*    type="textarea"*/}
                        {/*    required={false}*/}
                        {/*    labelStyle="text-[#3F6FA9]"*/}
                        {/*    placeholder="Pegawai Administrasi dengan jam kerja penuh waktu, sesuai ketentuan Universitas"*/}
                        {/*/>*/}

                        <FormFieldInput
                            form={form}
                            label="Tgl. Mulai"
                            name="tgl_awal"
                            type="date"
                            required={false}
                            labelStyle="text-[#3F6FA9]"
                        />
                        <FormFieldInput
                            form={form}
                            label="Tgl. Selesai"
                            name="tgl_akhir"
                            type="date"
                            required={false}
                            labelStyle="text-[#3F6FA9]"
                        />
                        <FormFieldInput
                            form={form}
                            label="Pejabat Penetap"
                            name="pejabat_penetap"
                            required={false}
                            labelStyle="text-[#3F6FA9]"
                        />
                        <FormFieldSelect
                            form={form}
                            label="Status Aktif"
                            name="status_aktif_id"
                            labelStyle="text-[#3F6FA9]"
                            options={[
                                {value: "1", label: "Aktif"},
                                {value: "2", label: "Cuti Luar Tanggungan"},
                                {value: "3", label: "Kontrak Habis"},
                                {value: "4", label: "Wafat"},
                                {value: "5", label: "Mangkir 5 Kali Berturut-turut"},
                                {value: "6", label: "Mengundurkan diri"},
                                {value: "7", label: "Pensiun Dini"},
                                {value: "8", label: "PHK"},
                                {value: "9", label: "Pelanggaran"},
                                {value: "10", label: "Pensiun Normal"},
                                {value: "11", label: "Pernikahan Sesama Karyawan"},
                                {value: "12", label: "Kesalahan Berat"},
                                {value: "13", label: "Sakit Berkepanjangan"},
                                {value: "14", label: "Tidak Aktif"},
                                {value: "15", label: "Tugas Belajar"},
                                {value: "16", label: "Ditahan Pihak Berwajib"},
                            ]}
                            required={false}
                            placeholder="-- Pilih Status Aktif --"
                        />
                        {/*<FormFieldInput*/}
                        {/*    form={form}*/}
                        {/*    label="Tanggal Input"*/}
                        {/*    name="tanggal_input"*/}
                        {/*    required={false}*/}
                        {/*    labelStyle="text-[#3F6FA9]"*/}
                        {/*    placeholder="22 April 2025"*/}
                        {/*/>*/}
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default DetailHubunganKerja;
