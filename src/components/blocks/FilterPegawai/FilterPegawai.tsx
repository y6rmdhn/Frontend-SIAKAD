import { FormFieldSelect } from "../CustomFormSelect/CustomFormSelect";

const FilterPegawai = ({ form }) => {
  return (
    <div className="w-full flex flex-col lg:flex-row gap-3">
      <FormFieldSelect
        form={form}
        name="a"
        labelStyle="text-[#3F6FA9]"
        options={[
          { label: "Admin", value: "admin" },
          { label: "User", value: "user" },
          { label: "Guest", value: "guest" },
        ]}
        placeholder="Unit kerja"
        required={false}
      />
      <FormFieldSelect
        form={form}
        name="b"
        labelStyle="text-[#3F6FA9]"
        options={[
          { label: "Admin", value: "admin" },
          { label: "User", value: "user" },
          { label: "Guest", value: "guest" },
        ]}
        placeholder="Homebase"
        required={false}
      />
      <FormFieldSelect
        form={form}
        name="c"
        labelStyle="text-[#3F6FA9]"
        options={[
          { label: "Admin", value: "admin" },
          { label: "User", value: "user" },
          { label: "Guest", value: "guest" },
        ]}
        placeholder="Hubungan Kerja"
        required={false}
      />
      <FormFieldSelect
        form={form}
        name="d"
        labelStyle="text-[#3F6FA9]"
        options={[
          { label: "Admin", value: "admin" },
          { label: "User", value: "user" },
          { label: "Guest", value: "guest" },
        ]}
        placeholder="Status Pegawai"
        required={false}
      />
      <FormFieldSelect
        form={form}
        name="e"
        labelStyle="text-[#3F6FA9]"
        options={[
          { label: "Admin", value: "admin" },
          { label: "User", value: "user" },
          { label: "Guest", value: "guest" },
        ]}
        placeholder="Jabatan Fungsional"
        required={false}
      />
    </div>
  );
};

export default FilterPegawai;
