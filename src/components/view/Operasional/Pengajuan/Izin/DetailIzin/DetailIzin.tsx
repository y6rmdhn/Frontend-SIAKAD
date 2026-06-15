import CustomCard from "@/components/blocks/Card";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { IoChevronBackOutline } from "react-icons/io5";
import { MdOutlineFileDownload } from "react-icons/md";
import { Form } from "@/components/ui/form";
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput";
import { useForm } from "react-hook-form";
import Title from "@/components/blocks/Title";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { InfiniteScrollSelect } from "@/components/blocks/InfiniteScrollSelect/InfiniteScrollSelect";
import dosenServices from "@/services/dosen.services";
import { useEffect } from "react";
import axiosInstance from "@/lib/axios/axiosInstance";
import endpoint from "@/services/endpoint.constant";

const izinSchema = z.object({
    jenis_izin_id: z.string().min(1, { message: "Jenis izin harus diisi." }),
    tgl_mulai: z.string().min(1, { message: "Tanggal mulai harus diisi." }),
    tgl_selesai: z.string().min(1, { message: "Tanggal selesai harus diisi." }),
    jumlah_hari: z.string().min(1, { message: "Jumlah hari wajib diisi/dihitung." }),
    keterangan: z.string().optional(),
});

export type IzinSchema = z.infer<typeof izinSchema>;

const TambahIzin = () => {
    const navigate = useNavigate();

    const form = useForm({
        resolver: zodResolver(izinSchema),
        defaultValues: {
            jenis_izin_id: "",
            tgl_mulai: "",
            tgl_selesai: "",
            jumlah_hari: "",
            keterangan: "",
        },
    });

    const { watch, setValue } = form;
    const tglMulai = watch("tgl_mulai");
    const tglSelesai = watch("tgl_selesai");

    useEffect(() => {
        if (tglMulai && tglSelesai) {
            const startDate = new Date(tglMulai);
            const endDate = new Date(tglSelesai);

            if (
                !isNaN(startDate.getTime()) &&
                !isNaN(endDate.getTime()) &&
                endDate >= startDate
            ) {
                const diffTime = endDate.getTime() - startDate.getTime();
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
                setValue("jumlah_hari", String(diffDays));
            } else {
                setValue("jumlah_hari", "");
            }
        }
    }, [tglMulai, tglSelesai, setValue]);

    const { mutate } = useMutation({
        mutationFn: (jsonData: any) =>
            axiosInstance.post(`${endpoint.ABSENSI}/izin`, jsonData),
        onSuccess: (response) => {
            console.log("Server response:", response);
            form.reset();
            toast.success("Data pengajuan izin berhasil ditambahkan");
            navigate("/operasional/pengajuan/izin");
        },
        onError: (error: any) => {
            console.error("Mutation error:", error);
            const errorMessage =
                error.response?.data?.message || "Gagal menambahkan data.";
            toast.error(errorMessage);
        },
    });

    const handleSubmitData = (values: IzinSchema) => {
        const payload = {
            jenis_izin_id: values.jenis_izin_id,
            tgl_mulai: values.tgl_mulai,
            tgl_selesai: values.tgl_selesai,
            jumlah_hari: Number(values.jumlah_hari),
            keterangan: values.keterangan || ""
        };

        mutate(payload);
    };

    return (
        <div className="mt-10 mb-20">
            <Title title="Izin" subTitle="Tambah Permohonan Izin" />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmitData)}>
                    <CustomCard
                        actions={
                            <div className="">
                                <div className="flex w-full md:w-auto gap-2 order-1 md:order-2 md:flex-row flex-col justify-end">
                                    <Link
                                        className="w-full md:w-auto"
                                        to="/operasional/pengajuan/izin"
                                    >
                                        <Button className="bg-green-light-uika w-full md:w-auto hover:bg-hover-green-uika">
                                            <IoChevronBackOutline /> Kembali ke Daftar
                                        </Button>
                                    </Link>
                                    <Button
                                        type="submit"
                                        className="bg-[#FDA31A] w-full md:w-auto text-white cursor-pointer"
                                    >
                                        <MdOutlineFileDownload />
                                        Simpan
                                    </Button>
                                </div>

                                <div className="space-y-4 mt-10">
                                    <div className="border-b-1 border-[#FDA31A]">
                                        <h1 className="text-sm font-normal text-[#FDA31A]">
                                            Data Dokumen
                                        </h1>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="space-y-7">
                                            <InfiniteScrollSelect
                                                form={form}
                                                label="Jenis Izin"
                                                name="jenis_izin_id"
                                                labelStyle="text-[#3F6FA9]"
                                                placeholder="--Pilih Jenis Izin--"
                                                required
                                                queryKey="izin-dosen-select-new"
                                                queryFn={(page) => dosenServices.getPengajuanIzinDosen({ page, is_dropdown: true })}
                                                itemValue="id"
                                                itemLabel="nama"
                                            />
                                            <FormFieldInput
                                                form={form}
                                                label="Tanggal Mulai"
                                                name="tgl_mulai"
                                                type="date"
                                                labelStyle="text-[#3F6FA9]"
                                                required={true}
                                            />

                                            <FormFieldInput
                                                form={form}
                                                label="Tanggal Selesai"
                                                name="tgl_selesai"
                                                type="date"
                                                labelStyle="text-[#3F6FA9]"
                                                required={true}
                                            />

                                            <FormFieldInput
                                                form={form}
                                                label="Jumlah Hari"
                                                name="jumlah_hari"
                                                type="number"
                                                labelStyle="text-[#3F6FA9]"
                                                readOnly
                                            />
                                        </div>

                                        <div className="space-y-7 md:mt-0.5 lg:mt-0">
                                            <FormFieldInput
                                                form={form}
                                                label="Keterangan"
                                                name="keterangan"
                                                type="textarea"
                                                labelStyle="text-[#3F6FA9]"
                                                required={false}
                                            />
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

export default TambahIzin;
