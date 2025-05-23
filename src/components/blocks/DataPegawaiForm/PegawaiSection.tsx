import { FormFieldInput } from "../CustomFormInput/CustomFormInput";
import { FormFieldSelect } from "../CustomFormSelect/CustomFormSelect";

const KepegawaianSection = ({ form }) => (
  <div className="grid lg:grid-rows-4 lg:grid-flow-col gap-4 mt-10">
    <FormFieldSelect
      form={form}
      label="Unit Kerja"
      name="unit_kerja_id"
      labelStyle="text-[#3F6FA9]"
      options={[
        { label: "Admin", value: "1" },
        { label: "User", value: "2" },
        { label: "Guest", value: "3" },
      ]}
      placeholder="Universitas Ibn Khaldun"
      required={true}
    />
    <FormFieldSelect
      form={form}
      label="Status Aktif"
      name="status_aktif_id"
      labelStyle="text-[#3F6FA9]"
      options={[
        { label: "Admin", value: "1" },
        { label: "User", value: "2" },
        { label: "Guest", value: "3" },
      ]}
      placeholder="--Pilih Status Aktif--"
      required={true}
    />
    <FormFieldSelect
      form={form}
      label="Hubungan Kerja"
      name="hubungan_kerja"
      labelStyle="text-[#3F6FA9]"
      options={[
        { label: "Admin", value: "admin" },
        { label: "User", value: "user" },
        { label: "Guest", value: "guest" },
      ]}
      placeholder="--Pilih Hubungan Kerja--"
      required={true}
    />
    <FormFieldInput
      form={form}
      label="Email Pegawai"
      name="email_pegawai"
      labelStyle="text-[#3F6FA9]"
      required={false}
    />
    <FormFieldInput
      form={form}
      label="Email Pribadi"
      name="email_pribadi"
      labelStyle="text-[#3F6FA9]"
      required={false}
    />
    <FormFieldSelect
      form={form}
      label="Golongan"
      name="golongan"
      labelStyle="text-[#3F6FA9]"
      options={[
        { label: "Admin", value: "admin" },
        { label: "User", value: "user" },
        { label: "Guest", value: "guest" },
      ]}
      placeholder="--Pilih Golongan--"
      required={false}
    />
    <FormFieldSelect
      form={form}
      label="Jabatan Fungsional"
      name="jabatan_fungsional"
      labelStyle="text-[#3F6FA9]"
      options={[
        { label: "Admin", value: "admin" },
        { label: "User", value: "user" },
        { label: "Guest", value: "guest" },
      ]}
      placeholder="--Pilih Jabatan Fungsional--"
      required={false}
    />
  </div>
);

export default KepegawaianSection;
