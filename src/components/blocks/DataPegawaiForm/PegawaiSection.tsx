import type { UseFormReturn } from "react-hook-form";
import { FormFieldInput } from "../CustomFormInput/CustomFormInput";
import { FormFieldSelect } from "../CustomFormSelect/CustomFormSelect";
import adminServices from "@/services/admin.services.ts";
import type { DataPegawaiSchema } from "@/components/view/admin/DataPegawai/DataPegawai";
import { InfiniteScrollSelect } from "../InfiniteScrollSelect/InfiniteScrollSelect";

// 1. Tambahkan prop isReadOnly ke interface
interface KepegawaianSectionProps {
  form: UseFormReturn<DataPegawaiSchema>;
  isReadOnly?: boolean;
}

const KepegawaianSection = ({
  form,
  isReadOnly = false,
}: KepegawaianSectionProps) => {
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
        <InfiniteScrollSelect
          form={form}
          label="Unit Kerja"
          name="unit_kerja_id"
          labelStyle="text-[#3F6FA9]"
          placeholder="--Pilih Unit Kerja--"
          required={true}
          queryKey="unit-kerja-pegawai-select"
          queryFn={adminServices.getUnitKerja}
          itemValue="id"
          itemLabel="nama_unit"
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
        <InfiniteScrollSelect
          form={form}
          label="Status Aktif"
          name="status_aktif_id"
          labelStyle="text-[#3F6FA9]"
          placeholder="--Pilih Status Aktif--"
          required={true}
          queryKey="status-aktif-pegawai-select"
          queryFn={adminServices.getStatusAktif}
          itemValue="id"
          itemLabel="nama_status_aktif"
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
        <InfiniteScrollSelect
          form={form}
          label="Hubungan Kerja"
          name="status_kerja"
          labelStyle="text-[#3F6FA9]"
          placeholder="--Pilih Hubungan Kerja--"
          required={true}
          queryKey="hubungan-kerja-pegawai-select"
          queryFn={adminServices.getHubunganKerja}
          itemValue="id"
          itemLabel="nama_hub_kerja"
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
        <InfiniteScrollSelect
          form={form}
          label="Golongan"
          name="golongan"
          labelStyle="text-[#3F6FA9]"
          placeholder="--Pilih Golongan--"
          required={false}
          queryKey="hubungan-kerja-pegawai-select"
          queryFn={adminServices.getMasterPangkatReferensi}
          itemValue="id"
          itemLabel="nama_golongan"
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
