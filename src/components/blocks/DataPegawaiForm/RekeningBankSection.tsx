import { FormFieldInput } from "../CustomFormInput/CustomFormInput";
import { FormFieldSelect } from "../CustomFormSelect/CustomFormSelect";

const RekeningBankSection = ({ form }) => (
  <div className="grid lg:grid-rows-2 lg:grid-flow-col gap-4 mt-10">
    <FormFieldSelect
      form={form}
      label="Nama BANK"
      name="nama_bank"
      labelStyle="text-[#3F6FA9]"
      options={[
        { label: "Admin", value: "admin" },
        { label: "User", value: "user" },
        { label: "Guest", value: "guest" },
      ]}
      placeholder="--Pilih BANK--"
      required={false}
    />
    <FormFieldInput
      form={form}
      label="Cabang BANK"
      name="cabang_bank"
      labelStyle="text-[#3F6FA9]"
      required={false}
    />
    <FormFieldInput
      form={form}
      label="Atas Nama Rekening"
      name="nama_rekening"
      labelStyle="text-[#3F6FA9]"
      required={false}
    />
    <FormFieldInput
      form={form}
      label="No Rekening"
      name="no_rekening"
      labelStyle="text-[#3F6FA9]"
      required={false}
    />
  </div>
);

export default RekeningBankSection;
