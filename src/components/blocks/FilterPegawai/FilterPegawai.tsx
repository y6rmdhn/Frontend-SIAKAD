import SelectFilter from "@/components/blocks/SelectFilter"

const FilterPegawai = () => {
  return (
    <div className="w-full flex flex-col lg:flex-row gap-3">
      <SelectFilter
        options={[
          { label: "Admin", value: "admin" },
          { label: "User", value: "user" },
          { label: "Guest", value: "guest" },
        ]}
        placeholder="Unit kerja"
      />
      <SelectFilter
        options={[
          { label: "Admin", value: "admin" },
          { label: "User", value: "user" },
          { label: "Guest", value: "guest" },
        ]}
        placeholder="Homebase"
      />
      <SelectFilter
        options={[
          { label: "Admin", value: "admin" },
          { label: "User", value: "user" },
          { label: "Guest", value: "guest" },
        ]}
        placeholder="Hubungan Kerja"
      />
      <SelectFilter
        options={[
          { label: "Admin", value: "admin" },
          { label: "User", value: "user" },
          { label: "Guest", value: "guest" },
        ]}
        placeholder="Status Pegawai"
      />
      <SelectFilter
        options={[
          { label: "Admin", value: "admin" },
          { label: "User", value: "user" },
          { label: "Guest", value: "guest" },
        ]}
        placeholder="Jabatan Fungsional"
      />
    </div>
  );
};

export default FilterPegawai;
