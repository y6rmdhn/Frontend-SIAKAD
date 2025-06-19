import { FormFieldInput } from "../CustomFormInput/CustomFormInput";
import { FormFieldInputFile } from "../CustomFormInputFile/CustomFormInputFile";
import {UseFormReturn} from "react-hook-form";
import {DataPegawaiSchema} from "@/components/view/admin/DataPegawai/DataPegawai.tsx";

interface DokumenSectionProps {
    form: UseFormReturn<DataPegawaiSchema>;
}

const DokumenSection = ({ form }: DokumenSectionProps) => (
  <div className="grid lg:grid-rows-8 lg:grid-flow-col gap-4 mt-10 items-center">
    <FormFieldInput
      form={form}
      label="KAPREG"
      name="kapreg"
      labelStyle="text-[#3F6FA9]"
      required={false}
    />
    <FormFieldInputFile
      label="File KAPREG"
      name="file_kapreg"
      classname="border-none shadow-none"
      labelStyle="text-[#3F6FA9]"
      required={false}
    />
    <FormFieldInput
      form={form}
      label="NPWP"
      name="npwp"
      labelStyle="text-[#3F6FA9]"
      required={false}
    />
    <FormFieldInputFile
      label="File NPWP"
      name="file_npwp"
      classname="border-none shadow-none"
      labelStyle="text-[#3F6FA9]"
      required={false}
    />
    <FormFieldInputFile
      label="File Rekening"
      name="file_rekening"
      classname="border-none shadow-none"
      labelStyle="text-[#3F6FA9]"
      required={false}
    />
    <FormFieldInputFile
      label="File KK"
      name="file_kk"
      classname="border-none shadow-none"
      labelStyle="text-[#3F6FA9]"
      required={false}
    />
    <FormFieldInputFile
      label="File KTP"
      name="file_ktp"
      classname="border-none shadow-none"
      labelStyle="text-[#3F6FA9]"
      required={false}
    />
    <FormFieldInputFile
      label="File Sertifikasi Dosen"
      name="file_sertifikasi_dosen"
      classname="border-none shadow-none"
      labelStyle="text-[#3F6FA9]"
      required={false}
    />
    <FormFieldInput
      form={form}
      label="No BPJS"
      placeholder="Masukan Nomor"
      name="no_bpjs"
      labelStyle="text-[#3F6FA9]"
      required={false}
    />
    <FormFieldInput
      form={form}
      label="No BPJS Ketenagakerjaan"
      placeholder="Masukan Nomor"
      name="no_bpjs_ketenagakerjaan"
      labelStyle="text-[#3F6FA9]"
      required={false}
    />
    <FormFieldInput
      form={form}
      label="No BPJS Pensiun"
      placeholder="Masukan Nomor"
      name="no_bpjs_pensiun"
      labelStyle="text-[#3F6FA9]"
      required={false}
    />
    <FormFieldInputFile
      label="File BPJS"
      name="file_bpjs"
      classname="border-none shadow-none"
      labelStyle="text-[#3F6FA9]"
      required={false}
    />
    <FormFieldInputFile
      label="File BPJS Ketenagakerjaan"
      classname="border-none shadow-none"
      name="file_bpjs_ketenagakerjaan"
      labelStyle="text-[#3F6FA9]"
      required={false}
    />
    <FormFieldInputFile
      label="File Tanda Tangan"
      name="file_tanda_tangan"
      classname="border-none shadow-none"
      labelStyle="text-[#3F6FA9]"
      required={false}
    />
  </div>
);

export default DokumenSection;