import {Link, useNavigate} from "react-router-dom";
import CustomCard from "@/components/blocks/Card";
import Title from "@/components/blocks/Title";
import InfoList from "@/components/blocks/InfoList";
import {FormFieldInput} from "@/components/blocks/CustomFormInput/CustomFormInput";
import {FormFieldInputFile} from "@/components/blocks/CustomFormInputFile/CustomFormInputFile";
import {FormFieldSelect} from "@/components/blocks/CustomFormSelect/CustomFormSelect";
import {Form} from "@/components/ui/form";
import {useForm} from "react-hook-form";
import {Button} from "@/components/ui/button";
import {IoIosArrowBack} from "react-icons/io";
import {MdOutlineFileDownload} from "react-icons/md";
import {useMutation, useQuery} from "@tanstack/react-query";
import dosenServices from "@/services/dosen.services.ts";
import {toast} from "sonner";
import postDosenServices from "@/services/create.dosen.services.ts";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_MIME_TYPES = ["application/pdf", "image/jpeg", "image/png"];

const kemampuanBahasaSchema = z.object({
    tahun: z.string()
        .min(4, "Tahun harus 4 digit.")
        .max(4, "Tahun harus 4 digit."),
    bahasa_id: z.string().min(1, "Bahasa wajib dipilih."),

    nama_lembaga: z.string().optional(),
    kemampuan_bicara: z.string().optional(),
    kemampuan_mendengar: z.string().optional(),
    kemampuan_menulis: z.string().optional(),
    submit_type: z.string(),

    file_pendukung: z.any()
        .optional()
        .refine(
            (files) => !files || files.length === 0 || (files[0] && files[0].size <= MAX_FILE_SIZE),
            `Ukuran file maksimal 5MB.`
        )
        .refine(
            (files) => !files || files.length === 0 || (files[0] && ACCEPTED_MIME_TYPES.includes(files[0].type)),
            "Hanya format .pdf, .jpg, .png yang diterima."
        ),
});

type KemampuanBahasaSchema = z.infer<typeof kemampuanBahasaSchema>;

const DetailKemampuanBahasa = () => {
    const navigate = useNavigate();
    const form = useForm<KemampuanBahasaSchema>({
        resolver: zodResolver(kemampuanBahasaSchema),
        defaultValues: {
            tahun: "",
            bahasa_id: "",
            nama_lembaga: "",
            kemampuan_bicara: "",
            kemampuan_mendengar: "",
            kemampuan_menulis: "",
            submit_type: "submit",
            file_pendukung: undefined,
        },
    });

    // get data
    const {data: detailData} = useQuery({
        queryKey: ["kemampuan-bahasa-detail-dosen"],
        queryFn: async () => {
            const response = await dosenServices.getDataKemampuanBahasaWithoutParam();

            return response.data;
        },
    });

    // add data
    const {mutate} = useMutation({
        mutationFn: (formData: FormData) => postDosenServices.addDataKemampuanbahasa(formData),
        onSuccess: (response) => {
            console.log("Server response:", response);
            form.reset();
            toast.success("Data berhasil ditambahkan");
            navigate("/data-riwayat/pengembangan-diri/kemampuan-bahasa");
        },
        onError: (error: any) => {
            console.error("Mutation error:", error);
            const errorMessage = error.response?.data?.message || "Gagal menambahkan data.";
            toast.error(errorMessage);
        },
    });


    const handleSubmitKemampuanBahasa = (values: KemampuanBahasaSchema) => {
        const formData = new FormData();

        Object.keys(values).forEach(key => {
            const valueKey = key as keyof KemampuanBahasaSchema;
            const value = values[valueKey];

            if (key === 'file_pendukung') {
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
            <Title title="Kemampuan Bahasa" subTitle="Detail Kemampuan Bahasa"/>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmitKemampuanBahasa)}>
                    <CustomCard
                        actions={
                            <div>
                                <div className="w-full flex flex-col sm:flex-row justify-end gap-2">
                                    <Link to="/data-riwayat/pengembangan-diri/kemampuan-bahasa">
                                        <Button
                                            className="bg-green-light-uika hover:bg-hover-green-uika w-full sm:w-auto">
                                            <IoIosArrowBack/> Kembali ke Daftar
                                        </Button>
                                    </Link>
                                    <Button className="bg-[#FDA31A] text-white cursor-pointer w-full sm:w-auto">
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

                            </div>
                        }
                    >
                        <div
                            className="sm:mt-10 grid grid-rows-4 md:grid-flow-col items-center gap-x-4 gap-y-4 md:gap-y-0">
                            <FormFieldInput
                                form={form}
                                label="Tahun"
                                name="tahun"
                                placeholder="2025"
                                labelStyle="text-[#3F6FA9]"
                                required={true}
                            />
                            <FormFieldInput
                                form={form}
                                label="Nama Lembaga"
                                name="nama_lembaga"
                                placeholder="Cari Nama Lembaga"
                                labelStyle="text-[#3F6FA9]"
                                required={false}
                            />
                            <FormFieldInput
                                form={form}
                                label="Kemampuan Berbicara"
                                name="kemampuan_bicara"
                                placeholder="Baik"
                                labelStyle="text-[#3F6FA9]"
                                required={false}
                            />
                            <FormFieldInputFile
                                form={form}
                                label="File Pendukung"
                                name="file_pendukung"
                                classname="border-none shadow-none"
                                labelStyle="text-[#3F6FA9]"
                                required={false}
                            />
                            <FormFieldSelect
                                form={form}
                                label="Bahasa"
                                name="bahasa_id"
                                labelStyle="text-[#3F6FA9]"
                                options={[
                                    { value: "1", label: "Bahasa Arab" },
                                    { value: "2", label: "Bahasa Bengali" },
                                    { value: "3", label: "Bahasa Jerman" },
                                    { value: "4", label: "Bahasa Yunani" },
                                    { value: "5", label: "Bahasa Inggris" },
                                    { value: "6", label: "Bahasa Spanyol" },
                                    { value: "7", label: "Bahasa Persia" },
                                    { value: "8", label: "Bahasa Prancis" },
                                    { value: "9", label: "Bahasa Hindi" },
                                    { value: "10", label: "Bahasa Indonesia" },
                                    { value: "11", label: "Bahasa Jepang" },
                                    { value: "12", label: "Bahasa Jawa" },
                                    { value: "13", label: "Bahasa Melayu" },
                                    { value: "14", label: "Bahasa Belanda" },
                                    { value: "15", label: "Bahasa Portugis" },
                                    { value: "16", label: "Bahasa Rusia" },
                                    { value: "17", label: "Bahasa Thailand" },
                                    { value: "18", label: "Bahasa Tionghoa/Mandarin" },
                                ]}
                                placeholder="--Pilih Bahasa--"
                                required={true}
                            />
                            <FormFieldInput
                                form={form}
                                label="Kemampuan Mendengar"
                                name="kemampuan_mendengar"
                                placeholder="Baik"
                                labelStyle="text-[#3F6FA9]"
                                required={false}
                            />
                            <FormFieldInput
                                form={form}
                                label="Kemampuan Menulis"
                                name="kemampuan_menulis"
                                placeholder="Baik"
                                labelStyle="text-[#3F6FA9]"
                                required={false}
                            />
                            {/*<FormFieldInput*/}
                            {/*    form={form}*/}
                            {/*    label="Tanggal Input"*/}
                            {/*    name="tanggal_input"*/}
                            {/*    labelStyle="text-[#3F6FA9]"*/}
                            {/*    placeholder="22 April 2025"*/}
                            {/*    required={false}*/}
                            {/*/>*/}
                        </div>
                    </CustomCard>
                </form>
            </Form>
        </div>
    );
};

export default DetailKemampuanBahasa;
