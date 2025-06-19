import { Link, useNavigate } from "react-router-dom";
import CustomCard from "@/components/blocks/Card";
import Title from "@/components/blocks/Title";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { IoIosArrowBack } from "react-icons/io";
import { MdOutlineFileDownload } from "react-icons/md";
import InfoList from "@/components/blocks/InfoList";
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { FormFieldSelect } from "@/components/blocks/CustomFormSelect/CustomFormSelect";
import { useMutation, useQuery } from "@tanstack/react-query";
// import { FormFieldInputFile } from "@/components/blocks/CustomFormInputFile/CustomFormInputFile"; // If you activate file fields
import dosenServices from "@/services/dosen.services.ts";
import { toast } from "sonner";
import postDosenServices from "@/services/create.dosen.services.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const pasanganSchema = z.object({
    pasangan_berkerja_dalam_satu_instansi: z.preprocess(
        (val) => {
            if (val === "ya") return true;
            if (val === "tidak") return false;
            if (typeof val === 'boolean') return val;
            return undefined;
        },
        z.boolean({
            required_error: "Pilihan apakah pasangan bekerja satu instansi diperlukan.",
            invalid_type_error: "Pilihan harus berupa Ya atau Tidak valid.",
        })
    ),
    nama_pasangan: z.string().min(1, "Nama pasangan tidak boleh kosong").nullable().optional(),
    tempat_lahir: z.string().nullable().optional(),
    tgl_lahir: z.string().refine((val) => {
        if (!val) return true;
        return !isNaN(new Date(val).getTime());
    }, "Format tanggal lahir tidak valid").nullable().optional(),
    jenis_pekerjaan: z.string().nullable().optional(),
    status_kepegawaian: z.string().nullable().optional(),
    tempat_nikah: z.string().nullable().optional(),
    no_akta_nikah: z.string().nullable().optional(),
    submit_type: z.string(),
    // If you uncomment KARPEG and file KARPEG fields:
    // karpeg_pasangan: z.string().nullable().optional(),
    // file_karpeg_pasangan: z.instanceof(File).nullable().optional()
    //    .refine(file => !file || file.size <= 5 * 1024 * 1024, `Ukuran file maksimal 5MB.`) // Example size validation
    //    .refine(file => !file || ["image/jpeg", "image/png", "application/pdf"].includes(file.type), `Format file tidak didukung.`), // Example type validation
    // kartu_nikah: z.string().nullable().optional(), // Assuming this is an ID or number
});

// Infer the type for useForm
type PasanganFormData = z.infer<typeof pasanganSchema>;

const DetailPasangan = () => {
    const navigate = useNavigate();
    const form = useForm<PasanganFormData>({
        resolver: zodResolver(pasanganSchema),
        defaultValues: {
            pasangan_berkerja_dalam_satu_instansi: undefined,
            nama_pasangan: "",
            tempat_lahir: "",
            tgl_lahir: "",
            jenis_pekerjaan: "",
            status_kepegawaian: "",
            tempat_nikah: "",
            no_akta_nikah: "",
            submit_type: "submit"
            // karpeg_pasangan: "",
            // file_karpeg_pasangan: undefined,
            // kartu_nikah: "",
        },
    });

    // get data
    const { data: detailData, isLoading: isLoadingDetail } = useQuery({
        queryKey: ["pasangan-detail-dosen"],
        queryFn: async () => {
            const response = await dosenServices.getDataPasanganWithoutParam();

            return response.data;
        },
    });

    // add data
    const { mutate, isPending: isSubmitting } = useMutation({
        mutationFn: (formData: FormData) => postDosenServices.addDataPasangan(formData),
        onSuccess: (response) => {
            console.log("Server response:", response);
            form.reset();
            toast.success("Data berhasil ditambahkan");
            navigate("/data-riwayat/keluarga/pasangan");
        },
        onError: (error: any) => {
            console.error("Mutation error:", error);
            const errorMessage = error.response?.data?.message || "Gagal menambahkan data.";
            toast.error(errorMessage);

        },
    });

    const handleSubmitData = (values: PasanganFormData) => {
        const formData = new FormData();

        (Object.keys(values) as Array<keyof PasanganFormData>).forEach((key) => {
            const value = values[key];

            if (value !== null && value !== undefined) {
                if (key === "pasangan_berkerja_dalam_satu_instansi") {
                    formData.append(key, value ? "1" : "0");
                } else { // @ts-ignore
                    if (value instanceof File) {
                                        formData.append(key, value, value.name);
                                    } else if (key === "tgl_lahir" && value) { // value here is a date string
                                        try {
                                            const dateValue = new Date(value as string);
                                            if (!isNaN(dateValue.getTime())) {
                                                formData.append(key, dateValue.toISOString());
                                            } else {
                                                formData.append(key, value as string);
                                            }
                                        } catch (e) {
                                            console.error("Error converting date:", e);
                                            formData.append(key, value as string);
                                        }
                                    } else if (typeof value === 'string' && value !== "") {
                                        formData.append(key, value);
                                    } else if (typeof value !== 'string') {
                                        formData.append(key, String(value));
                                    }
                }
            }
        });
        mutate(formData);
    };

    return (
        <div className="mt-10 mb-20">
            <Title title="Pasangan" subTitle="Daftar Pasangan" />

            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmitData)}>
                    <CustomCard
                        actions={
                            <div>
                                <div className="flex flex-col md:flex-row justify-end gap-2">
                                    <Link
                                        className="w-full md:w-auto"
                                        to="/data-riwayat/keluarga/pasangan"
                                    >
                                        <Button type="button" className="bg-[#002E5A] w-full md:w-auto hover:bg-hover-blue-200">
                                            <IoIosArrowBack /> Kembali ke Daftar
                                        </Button>
                                    </Link>

                                    <Button
                                        type="submit"
                                        className="bg-[#FDA31A] w-full md:w-auto text-white cursor-pointer"
                                        disabled={isSubmitting} // Disable button while submitting
                                    >
                                        {isSubmitting ? (
                                            "Menyimpan..."
                                        ) : (
                                            <>
                                                <MdOutlineFileDownload />
                                                Simpan
                                            </>
                                        )}
                                    </Button>
                                </div>

                                {isLoadingDetail && <p>Loading detail pegawai...</p>}
                                {detailData?.pegawai_info && (
                                    <InfoList
                                        items={[
                                            { label: "NIP", value: detailData.pegawai_info.nip },
                                            { label: "Nama", value: detailData.pegawai_info.nama },
                                            { label: "Unit Kerja", value: detailData.pegawai_info.unit_kerja },
                                            { label: "Status", value: detailData.pegawai_info.status },
                                            { label: "Jab. Akademik", value: detailData.pegawai_info.jab_akademik },
                                            { label: "Jab. Fungsional", value: detailData.pegawai_info.jab_fungsional },
                                            { label: "Jab. Struktural", value: detailData.pegawai_info.jab_struktural },
                                            { label: "Pendidikan", value: detailData.pegawai_info.pendidikan },
                                        ]}
                                    />
                                )}


                                <div className="grid md:grid-cols-2 mt-10 gap-10 border py-4 px-2">
                                    {/* Kolom Kiri */}
                                    <div className="space-y-4 flex flex-col gap-3">
                                        <FormFieldSelect
                                            form={form}
                                            label="Pasangan Kerja dalam satu Instansi?"
                                            name="pasangan_berkerja_dalam_satu_instansi"
                                            placeholder="Pilih status"
                                            options={[
                                                { label: "Ya", value: "ya" },
                                                { label: "Tidak", value: "tidak" },
                                            ]}
                                            labelStyle="text-[#3F6FA9]"
                                            required={false}
                                        />

                                        <FormFieldInput
                                            form={form}
                                            label="Nama"
                                            name="nama_pasangan"
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
                                            label="Tgl Lahir (YYYY-MM-DD)" // Hint for user
                                            name="tgl_lahir"
                                            type="date" // Consider type="date" for better UX, then Zod schema would be z.coerce.date()
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

                                        <FormFieldInput
                                            form={form}
                                            label="Tempat Nikah"
                                            name="tempat_nikah"
                                            labelStyle="text-[#3F6FA9]"
                                            required={false}
                                        />

                                        <FormFieldInput
                                            form={form}
                                            label="No Akta Nikah"
                                            name="no_akta_nikah"
                                            labelStyle="text-[#3F6FA9]"
                                            required={false}
                                        />
                                    </div>

                                    {/* Kolom Kanan - Display Only Fields */}
                                    <div className="space-y-4 flex flex-col gap-1">
                                        {/* Example if you activate file input fields: */}
                                        {/*
                                        <FormFieldInput
                                            form={form}
                                            control={form.control}
                                            label="KARPEG Pasangan"
                                            name="karpeg_pasangan"
                                            labelStyle="text-[#3F6FA9]"
                                            required={false}
                                        />
                                        <FormFieldInputFile
                                            form={form} // Pass form for RHF integration
                                            control={form.control}
                                            label="File KARPEG Pasangan"
                                            name="file_karpeg_pasangan" // Make sure this matches schema
                                            labelStyle="text-[#3F6FA9]"
                                            required={false}
                                        />
                                        <FormFieldInput
                                            form={form}
                                            control={form.control}
                                            label="Kartu Nikah"
                                            name="kartu_nikah"
                                            labelStyle="text-[#3F6FA9]"
                                            required={false}
                                        />
                                        */}
                                        <div className="flex flex-col gap-3">
                                            <Label className="text-[#3F6FA9] text-xs sm:text-sm">Status Pengajuan</Label>
                                            <Label className="text-[#3F6FA9] text-xs sm:text-sm">Tanggal Input</Label>
                                        </div>
                                        <div className="flex flex-col gap-3">
                                            <Label className="text-[#3F6FA9] text-xs sm:text-sm">Tanggal Diajukan</Label>
                                            <Label className="text-[#3F6FA9] text-xs sm:text-sm">Tanggal Ditolak</Label>
                                        </div>
                                        <div className="flex flex-col gap-3">
                                            <Label className="text-[#3F6FA9] text-xs sm:text-sm">Tanggal Disetujui</Label>
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