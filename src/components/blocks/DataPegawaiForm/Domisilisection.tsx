import { FormFieldInput } from "../CustomFormInput/CustomFormInput";
import { FormFieldSelect } from "../CustomFormSelect/CustomFormSelect";

const DomisiliSection = ({ form }) => (
  <div className="grid lg:grid-rows-6 lg:grid-flow-col gap-y-4 lg:gap-y-0 gap-x-5 mt-10 items-center">
    <FormFieldInput
      form={form}
      label="No.KTP"
      name="np_ktp"
      labelStyle="text-[#3F6FA9]"
      required={false}
    />
    <FormFieldInput
      form={form}
      label="No KK"
      name="no_kk"
      labelStyle="text-[#3F6FA9]"
      required={false}
    />
    <FormFieldSelect
      form={form}
      label="Warga Negara"
      name="warga_negara"
      labelStyle="text-[#3F6FA9]"
      options={[
        { label: "Admin", value: "admin" },
        { label: "User", value: "user" },
        { label: "Guest", value: "guest" },
      ]}
      placeholder="--Pilih Warga Negara--"
      required={true}
    />
    <FormFieldSelect
      form={form}
      label="Provinsi"
      name="provinsi"
      labelStyle="text-[#3F6FA9]"
      options={[
        { label: "Admin", value: "admin" },
        { label: "User", value: "user" },
        { label: "Guest", value: "guest" },
      ]}
      placeholder="--Pilih Provinsi--"
      required={false}
    />
    <FormFieldSelect
      form={form}
      label="Kota"
      name="kota"
      labelStyle="text-[#3F6FA9]"
      options={[
        { label: "Admin", value: "admin" },
        { label: "User", value: "user" },
        { label: "Guest", value: "guest" },
      ]}
      placeholder="--Pilih Kota--"
      required={false}
    />
    <FormFieldInput
      form={form}
      label="Alamat / Jalan"
      name="alamat_domisili"
      labelStyle="text-[#3F6FA9]"
      required={false}
      type="textarea"
    />
    <FormFieldSelect
      form={form}
      label="Kecamatan"
      name="kecamatan"
      labelStyle="text-[#3F6FA9]"
      options={[
        { label: "Admin", value: "admin" },
        { label: "User", value: "user" },
        { label: "Guest", value: "guest" },
      ]}
      placeholder="--Pilih Kecamatan--"
      required={false}
    />
    <FormFieldInput
      form={form}
      label="Kode Pos"
      name="kode_pos"
      labelStyle="text-[#3F6FA9]"
      required={false}
    />
    <FormFieldSelect
      form={form}
      label="Suku"
      name="suku"
      labelStyle="text-[#3F6FA9]"
      options={[
        { label: "Admin", value: "admin" },
        { label: "User", value: "user" },
        { label: "Guest", value: "guest" },
      ]}
      placeholder="--Pilih Suku--"
      required={false}
    />
    <FormFieldInput
      form={form}
      label="Jarak Rumah (KM)"
      name="jarak_rumah_domisili"
      labelStyle="text-[#3F6FA9]"
      placeholder="Tuliskan Jarak dalam KM"
      required={false}
    />
    <FormFieldInput
      form={form}
      label="No. Whatsapp"
      name="no_telepon_domisili_kontak"
      labelStyle="text-[#3F6FA9]"
      required={false}
    />
    <FormFieldInput
      form={form}
      label="No.Telpon Utama"
      name="no_handphone"
      labelStyle="text-[#3F6FA9]"
      required={false}
    />
  </div>
);

export default DomisiliSection;
