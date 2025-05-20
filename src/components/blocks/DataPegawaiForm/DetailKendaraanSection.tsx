import { FormFieldInput } from "../CustomFormInput/CustomFormInput";
import { FormFieldSelect } from "../CustomFormSelect/CustomFormSelect";

const DetailKendaraanSection = ({ form }) => (
  <div className="grid grid-rows-3 grid-flow-col gap-4 mt-10 items-center">
    <FormFieldInput
      form={form}
      label="Nomor Polisi"
      name="nomor_polisi"
      labelStyle="text-[#3F6FA9]"
      required={false}
    />
    <FormFieldSelect
      form={form}
      label="Jenis Kendaraan"
      name="jenis_kendaraan"
      labelStyle="text-[#3F6FA9]"
      options={[
        { label: "Admin", value: "admin" },
        { label: "User", value: "user" },
        { label: "Guest", value: "guest" },
      ]}
      placeholder="--Pilih Jenis Kendaraan--"
      required={false}
    />
    <FormFieldInput
      form={form}
      label="Merk Kendaraan"
      name="merk_kendaraan"
      labelStyle="text-[#3F6FA9]"
      required={false}
    />
    <FormFieldInput
      form={form}
      label="Berat Badan (kg)"
      name="file_berat_badan"
      labelStyle="text-[#3F6FA9]"
      required={false}
    />
    <FormFieldInput
      form={form}
      label="Tinggi Badan (cm)"
      name="file_tinggi_badan"
      labelStyle="text-[#3F6FA9]"
      required={false}
    />
  </div>
);

export default DetailKendaraanSection;
