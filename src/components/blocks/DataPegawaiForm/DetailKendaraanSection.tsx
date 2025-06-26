import { FormFieldInput } from "../CustomFormInput/CustomFormInput";
import { FormFieldSelect } from "../CustomFormSelect/CustomFormSelect";
import { DataPegawaiSchema } from "@/components/view/admin/DataPegawai/DataPegawai.tsx";
import { UseFormReturn } from "react-hook-form";

// 1. Add isReadOnly to the props interface
interface DetailKendaraanSectionProps {
  form: UseFormReturn<DataPegawaiSchema>;
  isReadOnly?: boolean;
}

const DetailKendaraanSection = ({
  form,
  isReadOnly = false,
}: DetailKendaraanSectionProps) => (
  <div className="grid lg:grid-rows-3 lg:grid-flow-col gap-4 mt-10 items-center">
    {/* 2. Add readOnly prop to standard inputs */}
    <FormFieldInput
      form={form}
      label="Nomor Polisi"
      name="nomor_polisi"
      labelStyle="text-[#3F6FA9]"
      required={false}
      readOnly={isReadOnly}
    />

    {/* 3. Conditionally render Input or Select */}
    {isReadOnly ? (
      <FormFieldInput
        form={form}
        label="Jenis Kendaraan"
        name="jenis_kendaraan"
        labelStyle="text-[#3F6FA9]"
        readOnly
      />
    ) : (
      <FormFieldSelect
        form={form}
        label="Jenis Kendaraan"
        name="jenis_kendaraan"
        labelStyle="text-[#3F6FA9]"
        options={[
          { label: "Mobil", value: "Mobil" },
          { label: "Motor", value: "Motor" },
        ]}
        placeholder="--Pilih Jenis Kendaraan--"
        required={false}
      />
    )}

    <FormFieldInput
      form={form}
      label="Merk Kendaraan"
      name="merk_kendaraan"
      labelStyle="text-[#3F6FA9]"
      required={false}
      readOnly={isReadOnly}
    />

    <FormFieldInput
      form={form}
      label="Berat Badan (kg)"
      name="berat_badan" // Corrected from 'file_berat_badan'
      labelStyle="text-[#3F6FA9]"
      required={false}
      readOnly={isReadOnly}
      type="number"
    />

    <FormFieldInput
      form={form}
      label="Tinggi Badan (cm)"
      name="tinggi_badan" // Corrected from 'file_tinggi_badan
      labelStyle="text-[#3F6FA9]"
      required={false}
      readOnly={isReadOnly}
      type="number"
    />
  </div>
);

export default DetailKendaraanSection;
