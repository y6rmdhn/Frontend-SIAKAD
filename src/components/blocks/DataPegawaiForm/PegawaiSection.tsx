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
  [key: string]: any;
}

// 1. Tambahkan prop isReadOnly ke interface
interface KepegawaianSectionProps {
  form: UseFormReturn<DataPegawaiSchema>;
  isReadOnly?: boolean;
}

const KepegawaianSection = ({
  form,
  isReadOnly = false,
}: KepegawaianSectionProps) => {
  // 2. Buat API call untuk dropdown menjadi kondisional.
  //    Hook `useQuery` hanya akan berjalan jika tidak dalam mode read-only.
  //    Ini akan mencegah network request yang tidak perlu.
  const { data: unitKerjaData } = useQuery({
    queryKey: ["unit-kerja-select"],
    queryFn: async () => {
      const response = await adminServices.getUnitKerja();
      return response.data.data;
    },
    enabled: !isReadOnly, // Kunci efisiensi
  });

  const { data: statusAktifData } = useQuery({
    queryKey: ["status-aktif-select"],
    queryFn: async () => {
      const response = await adminServices.getStatusAktif();
      return response.data.data;
    },
    enabled: !isReadOnly,
  });

  const { data: hubunganKerjaData } = useQuery({
    queryKey: ["hubungan-kerja-select"],
    queryFn: async () => {
      const response = await adminServices.getHubunganKerja();
      return response.data.data;
    },
    enabled: !isReadOnly,
  });

  const { data: golonganData } = useQuery({
    queryKey: ["golongan-select"],
    queryFn: async () => {
      const response = await adminServices.getMasterPangkatReferensi();
      return response.data.data;
    },
    enabled: !isReadOnly,
  });

  // Bagian ini tidak akan error karena jika data tidak ada, ia akan menghasilkan array kosong
  const unitKerjaOptions =
    unitKerjaData?.data?.map((item: SelectApiItem) => ({
      label: item.nama_unit,
      value: item.id.toString(),
    })) || [];
  const statusAktifOptions =
    statusAktifData?.data?.map((item: SelectApiItem) => ({
      label: item.nama_status_aktif,
      value: item.id.toString(),
    })) || [];
  const hubunganKerjaOptions =
    hubunganKerjaData?.data?.map((item: SelectApiItem) => ({
      label: item.nama_hub_kerja,
      value: item.id.toString(),
    })) || [];
  const golonganOptions =
    golonganData?.data?.map((item: SelectApiItem) => ({
      label: item.nama_golongan,
      value: item.id.toString(),
    })) || [];

  return (
    <div className="grid lg:grid-rows-4 lg:grid-flow-col gap-4 mt-10">
      {/* 3. Terapkan logika kondisional untuk setiap field */}

      {isReadOnly ? (
        <FormFieldInput
          form={form}
          label="Unit Kerja"
          name="unit_kerja_id"
          labelStyle="text-[#3F6FA9]"
          readOnly
        />
      ) : (
        <FormFieldSelect
          form={form}
          label="Unit Kerja"
          name="unit_kerja_id"
          labelStyle="text-[#3F6FA9]"
          options={unitKerjaOptions}
          placeholder="Pilih Unit Kerja"
          required={true}
        />
      )}

      {isReadOnly ? (
        <FormFieldInput
          form={form}
          label="Status Aktif"
          name="status_aktif_id"
          labelStyle="text-[#3F6FA9]"
          readOnly
        />
      ) : (
        <FormFieldSelect
          form={form}
          label="Status Aktif"
          name="status_aktif_id"
          labelStyle="text-[#3F6FA9]"
          options={statusAktifOptions}
          placeholder="--Pilih Status Aktif--"
          required={true}
        />
      )}

      {isReadOnly ? (
        <FormFieldInput
          form={form}
          label="Hubungan Kerja"
          name="status_kerja"
          labelStyle="text-[#3F6FA9]"
          readOnly
        />
      ) : (
        <FormFieldSelect
          form={form}
          label="Hubungan Kerja"
          name="status_kerja"
          labelStyle="text-[#3F6FA9]"
          options={hubunganKerjaOptions}
          placeholder="--Pilih Hubungan Kerja--"
          required={true}
        />
      )}

      <FormFieldInput
        form={form}
        label="Email Pegawai"
        name="email_pegawai"
        labelStyle="text-[#3F6FA9]"
        required={!isReadOnly}
        readOnly={isReadOnly}
      />
      <FormFieldInput
        form={form}
        label="Email Pribadi"
        name="email_pribadi"
        labelStyle="text-[#3F6FA9]"
        required={!isReadOnly}
        readOnly={isReadOnly}
      />

      {isReadOnly ? (
        <FormFieldInput
          form={form}
          label="Golongan"
          name="golongan"
          labelStyle="text-[#3F6FA9]"
          readOnly
        />
      ) : (
        <FormFieldSelect
          form={form}
          label="Golongan"
          name="golongan"
          labelStyle="text-[#3F6FA9]"
          options={golonganOptions}
          placeholder="--Pilih Golongan--"
          required={false}
        />
      )}

      {isReadOnly ? (
        <FormFieldInput
          form={form}
          label="Jabatan Fungsional"
          name="jabatan_fungsional"
          labelStyle="text-[#3F6FA9]"
          readOnly
        />
      ) : (
        <FormFieldSelect
          form={form}
          label="Jabatan Fungsional"
          name="jabatan_fungsional"
          labelStyle="text-[#3F6FA9]"
          options={[
            { label: "Asisten Ahli", value: "1" },
            { label: "Dosen Praktisi/Industri", value: "2" },
            // ...opsi lainnya
          ]}
          placeholder="--Pilih Jabatan Fungsional--"
          required={false}
        />
      )}
    </div>
  );
};

export default KepegawaianSection;
