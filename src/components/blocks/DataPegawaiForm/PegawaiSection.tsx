import { useQuery } from "@tanstack/react-query";
import type { UseFormReturn } from "react-hook-form";
import { FormFieldInput } from "../CustomFormInput/CustomFormInput";
import { FormFieldSelect } from "../CustomFormSelect/CustomFormSelect";
import adminServices from "@/services/admin.services.ts";
import type { DataPegawaiSchema } from "@/components/view/admin/DataPegawai/DataPegawai";
interface SelectApiItem {
    id: number | string;
    nama_unit?: string;
    nama_status_aktif?: string;
    nama_hub_kerja?: string;
    nama_golongan?: string;
    [key: string]: any; // Memungkinkan properti lain jika ada
}

// Definisikan interface untuk props komponen
interface KepegawaianSectionProps {
    form: UseFormReturn<DataPegawaiSchema>;
}

const KepegawaianSection = ({ form }: KepegawaianSectionProps) => {
    // Unit Kerja Select
    const { data: unitKerjaData } = useQuery({
        queryKey: ["unit-kerja-select"],
        queryFn: async () => {
            const response = await adminServices.getUnitKerja();
            return response.data.data;
        },
    });

    const unitKerjaOptions =
        unitKerjaData?.data?.map((item: SelectApiItem) => ({
            label: item.nama_unit,
            value: item.id.toString(),
        })) || [];

    // Status Aktif Select
    const { data: statusAktifData } = useQuery({
        queryKey: ["status-aktif-select"],
        queryFn: async () => {
            const response = await adminServices.getStatusAktif();
            return response.data.data;
        },
    });
    const statusAktifOptions =
        statusAktifData?.data?.map((item: SelectApiItem) => ({
            label: item.nama_status_aktif,
            value: item.id.toString(),
        })) || [];

    // Hubungan Kerja Select
    const { data: hubunganKerjaData } = useQuery({
        queryKey: ["hubungan-kerja-select"],
        queryFn: async () => {
            const response = await adminServices.getHubunganKerja();
            return response.data.data;
        },
    });
    const hubunganKerjaOptions =
        hubunganKerjaData?.data?.map((item: SelectApiItem) => ({
            label: item.nama_hub_kerja,
            value: item.id.toString(),
        })) || [];

    // Golongan Select
    const { data: golonganData } = useQuery({
        queryKey: ["golongan-select"],
        queryFn: async () => {
            const response = await adminServices.getMasterPangkatReferensi();
            return response.data.data;
        },
    });
    const golonganOptions =
        golonganData?.data?.map((item: SelectApiItem) => ({
            label: item.nama_golongan,
            value: item.id.toString(),
        })) || [];

    return (
        <div className="grid lg:grid-rows-4 lg:grid-flow-col gap-4 mt-10">
            <FormFieldSelect
                form={form}
                label="Unit Kerja"
                name="unit_kerja_id"
                labelStyle="text-[#3F6FA9]"
                options={unitKerjaOptions}
                placeholder="Pilih Unit Kerja"
                required={true}
            />
            <FormFieldSelect
                form={form}
                label="Status Aktif"
                name="status_aktif_id"
                labelStyle="text-[#3F6FA9]"
                options={statusAktifOptions}
                placeholder="--Pilih Status Aktif--"
                required={true}
            />
            <FormFieldSelect
                form={form}
                label="Hubungan Kerja"
                name="status_kerja"
                labelStyle="text-[#3F6FA9]"
                options={hubunganKerjaOptions}
                placeholder="--Pilih Hubungan Kerja--"
                required={true}
            />
            <FormFieldInput
                form={form}
                label="Email Pegawai"
                name="email_pegawai"
                labelStyle="text-[#3F6FA9]"
                required={true}
            />
            <FormFieldInput
                form={form}
                label="Email Pribadi"
                name="email_pribadi"
                labelStyle="text-[#3F6FA9]"
                required={true}
            />
            <FormFieldSelect
                form={form}
                label="Golongan"
                name="golongan"
                labelStyle="text-[#3F6FA9]"
                options={golonganOptions}
                placeholder="--Pilih Golongan--"
                required={false}
            />
            <FormFieldSelect
                form={form}
                label="Jabatan Fungsional"
                name="jabatan_fungsional"
                labelStyle="text-[#3F6FA9]"
                options={[
                    { label: "Asisten Ahli", value: "1" },
                    { label: "Dosen Praktisi/Industri", value: "2" },
                    { label: "Guru Besar", value: "3" },
                    { label: "Guru Pamong", value: "4" },
                    { label: "Administrasi", value: "5" },
                    { label: "Keamanan", value: "6" },
                    { label: "Laboran", value: "7" },
                    { label: "Pustakawan", value: "8" },
                    { label: "Parkir", value: "9" },
                    { label: "Lektor", value: "10" },
                    { label: "Lektor Kepala", value: "11" },
                    { label: "Dosen", value: "12" },
                    { label: "Rumah Tangga", value: "13" },
                    { label: "Sopir", value: "14" },
                    { label: "Tenaga Ahli", value: "15" },
                    { label: "Tenaga Pengajar", value: "16" },
                ]}
                placeholder="--Pilih Jabatan Fungsional--"
                required={false}
            />
        </div>
    );
};

export default KepegawaianSection;
