import type { UseFormReturn } from "react-hook-form";
import { FormFieldInput } from "../CustomFormInput/CustomFormInput";
import adminServices from "@/services/admin.services.ts";
import type { DataPegawaiSchema } from "@/components/view/admin/DataPegawai/DataPegawai";
import { InfiniteScrollSelect } from "../InfiniteScrollSelect/InfiniteScrollSelect";

interface KepegawaianSectionProps {
  form: UseFormReturn<DataPegawaiSchema>;
  isReadOnly?: boolean;
  isLecturerEdit?: boolean;
}

const KepegawaianSection = ({
  form,
  isReadOnly = false,
  isLecturerEdit = false,
}: KepegawaianSectionProps) => {
  const showReadOnlyOther = isReadOnly || isLecturerEdit;

  return (
    <div className="grid lg:grid-rows-4 lg:grid-flow-col gap-4 mt-10">
      {/* 3. Terapkan logika kondisional untuk setiap field */}

      {showReadOnlyOther ? (
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
          queryFn={(page) => adminServices.getUnitKerja({ page, is_dropdown: true })}
          itemValue="id"
          itemLabel="nama"
        />
      )}

      {showReadOnlyOther ? (
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
          queryFn={(page) => adminServices.getStatusAktif({ page, is_dropdown: true })}
          itemValue="id"
          itemLabel="nama"
        />
      )}

      {showReadOnlyOther ? (
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
          queryFn={(page) => adminServices.getHubunganKerja({ page, is_dropdown: true })}
          itemValue="id"
          itemLabel="nama"
        />
      )}

      <FormFieldInput
        form={form}
        label="Email Pegawai"
        name="email_pegawai"
        labelStyle="text-[#3F6FA9]"
        required={isLecturerEdit ? true : !isReadOnly}
        readOnly={isLecturerEdit ? false : isReadOnly}
      />
      <FormFieldInput
        form={form}
        label="Email Pribadi"
        name="email_pribadi"
        labelStyle="text-[#3F6FA9]"
        required={isLecturerEdit ? false : !isReadOnly}
        readOnly={isLecturerEdit ? false : isReadOnly}
      />

      {showReadOnlyOther ? (
        <FormFieldInput
          form={form}
          label="Pangkat"
          name="pangkat_id"
          labelStyle="text-[#3F6FA9]"
          readOnly
        />
      ) : (
        <InfiniteScrollSelect
          form={form}
          label="Pangkat"
          name="pangkat_id"
          labelStyle="text-[#3F6FA9]"
          placeholder="--Pilih Pangkat--"
          required={false}
          queryKey="pangkat-pegawai-select"
          queryFn={(page) => adminServices.getMasterPangkatReferensi({ page, is_dropdown: true })}
          itemValue="id"
          itemLabel="nama"
        />
      )}
      {showReadOnlyOther ? (
        <FormFieldInput
          form={form}
          label="Eselon"
          name="eselon_id"
          labelStyle="text-[#3F6FA9]"
          readOnly
        />
      ) : (
        <InfiniteScrollSelect
          form={form}
          label="Eselon"
          name="eselon_id"
          labelStyle="text-[#3F6FA9]"
          placeholder="--Pilih Eselon--"
          required={false}
          queryKey="eselon-pegawai-select"
          queryFn={(page) => adminServices.getMasterEselonReferensi({ page, is_dropdown: true })}
          itemValue="id"
          itemLabel="nama"
        />
      )}

      {/* {showReadOnlyOther ? (
        <FormFieldInput
          form={form}
          label="Jabatan Fungsional"
          name="jabatan_fungsional"
          labelStyle="text-[#3F6FA9]"
          readOnly
        />
      ) : (
        <InfiniteScrollSelect
          form={form}
          label="Jabatan Fungsional"
          name="jabatan_fungsional_id"
          labelStyle="text-[#3F6FA9]"
          placeholder="--Pilih Jabatan Fungsional --"
          required={false}
          queryKey="jabatan-fungsional-select-create-pegawai"
          queryFn={adminServices.getJabatanFungsional}
          itemValue="id"
          itemLabel="nama_jabatan_fungsional"
        />
      )} */}

      {showReadOnlyOther ? (
        <FormFieldInput
          form={form}
          label="Jenis Pegawai"
          name="role_id"
          labelStyle="text-[#3F6FA9]"
          readOnly
        />
      ) : (
        <InfiniteScrollSelect
          form={form}
          label="Jenis Pegawai"
          name="role_id"
          labelStyle="text-[#3F6FA9]"
          placeholder="--Pilih Jenis Pegawai--"
          required={false}
          queryKey="role-id-select"
          queryFn={() => adminServices.getRole()}
          itemValue="id"
          itemLabel="nama"
        />
      )}
    </div>
  );
};

export default KepegawaianSection;
