import { FormFieldInput } from "../CustomFormInput/CustomFormInput";
import { FormFieldInputFile } from "../CustomFormInputFile/CustomFormInputFile";
import { UseFormReturn } from "react-hook-form";
import { DataPegawaiSchema } from "@/components/view/admin/DataPegawai/DataPegawai.tsx";

// A small helper component for displaying read-only file links
const ReadOnlyFileLink = ({ label, value }: { label: string; value: any }) => (
  <div className="flex flex-col gap-2">
    <label className="text-sm font-medium text-[#3F6FA9]">{label}</label>
    <div className="text-sm">
      {value && typeof value === "string" ? (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          Lihat Dokumen
        </a>
      ) : (
        <p className="text-gray-500">Tidak ada file</p>
      )}
    </div>
  </div>
);

// 1. Add isReadOnly to the props interface
interface DokumenSectionProps {
  form: UseFormReturn<DataPegawaiSchema>;
  isReadOnly?: boolean;
}

const DokumenSection = ({ form, isReadOnly = false }: DokumenSectionProps) => {
  // Watch file values to display links in read-only mode
  const { watch } = form;
  const fileValues = {
    file_kapreg: watch("file_kapreg"),
    file_npwp: watch("file_npwp"),
    file_rekening: watch("file_rekening"),
    file_kk: watch("file_kk"),
    file_ktp: watch("file_ktp"),
    file_sertifikasi_dosen: watch("file_sertifikasi_dosen"),
    file_bpjs: watch("file_bpjs"),
    file_bpjs_ketenagakerjaan: watch("file_bpjs_ketenagakerjaan"),
    file_tanda_tangan: watch("file_tanda_tangan"),
  };

  return (
    <div className="grid lg:grid-rows-8 lg:grid-flow-col gap-y-6 gap-x-4 mt-10 items-start">
      {/* 2. Make all regular inputs read-only based on the prop */}
      <FormFieldInput
        form={form}
        label="KAPREG"
        name="kapreg"
        labelStyle="text-[#3F6FA9]"
        required={false}
        readOnly={isReadOnly}
      />

      {/* 3. Conditionally render file inputs or links */}
      {isReadOnly ? (
        <ReadOnlyFileLink label="File KAPREG" value={fileValues.file_kapreg} />
      ) : (
        <FormFieldInputFile
          label="File KAPREG"
          name="file_kapreg"
          labelStyle="text-[#3F6FA9]"
          required={false}
        />
      )}

      <FormFieldInput
        form={form}
        label="NPWP"
        name="npwp"
        labelStyle="text-[#3F6FA9]"
        required={false}
        readOnly={isReadOnly}
      />

      {isReadOnly ? (
        <ReadOnlyFileLink label="File NPWP" value={fileValues.file_npwp} />
      ) : (
        <FormFieldInputFile
          label="File NPWP"
          name="file_npwp"
          labelStyle="text-[#3F6FA9]"
          required={false}
        />
      )}

      {isReadOnly ? (
        <ReadOnlyFileLink
          label="File Rekening"
          value={fileValues.file_rekening}
        />
      ) : (
        <FormFieldInputFile
          label="File Rekening"
          name="file_rekening"
          labelStyle="text-[#3F6FA9]"
          required={false}
        />
      )}

      {isReadOnly ? (
        <ReadOnlyFileLink label="File KK" value={fileValues.file_kk} />
      ) : (
        <FormFieldInputFile
          label="File KK"
          name="file_kk"
          labelStyle="text-[#3F6FA9]"
          required={false}
        />
      )}

      {isReadOnly ? (
        <ReadOnlyFileLink label="File KTP" value={fileValues.file_ktp} />
      ) : (
        <FormFieldInputFile
          label="File KTP"
          name="file_ktp"
          labelStyle="text-[#3F6FA9]"
          required={false}
        />
      )}

      {isReadOnly ? (
        <ReadOnlyFileLink
          label="File Sertifikasi Dosen"
          value={fileValues.file_sertifikasi_dosen}
        />
      ) : (
        <FormFieldInputFile
          label="File Sertifikasi Dosen"
          name="file_sertifikasi_dosen"
          labelStyle="text-[#3F6FA9]"
          required={false}
        />
      )}

      <FormFieldInput
        form={form}
        label="No BPJS"
        placeholder="Masukan Nomor"
        name="no_bpjs"
        labelStyle="text-[#3F6FA9]"
        required={false}
        readOnly={isReadOnly}
      />

      <FormFieldInput
        form={form}
        label="No BPJS Ketenagakerjaan"
        placeholder="Masukan Nomor"
        name="no_bpjs_ketenagakerjaan"
        labelStyle="text-[#3F6FA9]"
        required={false}
        readOnly={isReadOnly}
      />

      <FormFieldInput
        form={form}
        label="No BPJS Pensiun"
        placeholder="Masukan Nomor"
        name="no_bpjs_pensiun"
        labelStyle="text-[#3F6FA9]"
        required={false}
        readOnly={isReadOnly}
      />

      {isReadOnly ? (
        <ReadOnlyFileLink label="File BPJS" value={fileValues.file_bpjs} />
      ) : (
        <FormFieldInputFile
          label="File BPJS"
          name="file_bpjs"
          labelStyle="text-[#3F6FA9]"
          required={false}
        />
      )}

      {isReadOnly ? (
        <ReadOnlyFileLink
          label="File BPJS Ketenagakerjaan"
          value={fileValues.file_bpjs_ketenagakerjaan}
        />
      ) : (
        <FormFieldInputFile
          label="File BPJS Ketenagakerjaan"
          name="file_bpjs_ketenagakerjaan"
          labelStyle="text-[#3F6FA9]"
          required={false}
        />
      )}

      {isReadOnly ? (
        <ReadOnlyFileLink
          label="File Tanda Tangan"
          value={fileValues.file_tanda_tangan}
        />
      ) : (
        <FormFieldInputFile
          label="File Tanda Tangan"
          name="file_tanda_tangan"
          labelStyle="text-[#3F6FA9]"
          required={false}
        />
      )}
    </div>
  );
};

export default DokumenSection;
