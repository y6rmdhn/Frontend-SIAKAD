import { FormFieldInput } from "../CustomFormInput/CustomFormInput";
import { FormFieldInputFile } from "../CustomFormInputFile/CustomFormInputFile";
import { UseFormReturn } from "react-hook-form";
import { DataPegawaiSchema } from "@/components/view/admin/DataPegawai/DataPegawai.tsx";

// Helper function for resolving URL and file name from object, string, or File instance
const getDocInfo = (value: any) => {
  if (!value) return null;
  if (typeof value === "string" && value.trim() !== "") {
    const fileName = value.split("/").pop() || "Lihat Dokumen";
    return { url: value, fileName };
  }
  if (typeof value === "object") {
    if (value instanceof File) {
      return { url: URL.createObjectURL(value), fileName: value.name };
    }
    const url = value.url || value.file_path;
    const fileName =
      value.file_name || (url ? url.split("/").pop() : "Lihat Dokumen");
    if (url) return { url, fileName };
  }
  return null;
};

// Component for displaying read-only file links
const ReadOnlyFileLink = ({ label, value }: { label: string; value: any }) => {
  const docInfo = getDocInfo(value);
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-[#3F6FA9]">{label}</label>
      <div className="text-sm">
        {docInfo ? (
          <a
            href={docInfo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline inline-flex items-center gap-1 font-medium"
          >
            📄 {docInfo.fileName}
          </a>
        ) : (
          <p className="text-gray-500 text-xs italic">Tidak ada file</p>
        )}
      </div>
    </div>
  );
};

// Component for showing existing file preview when editing form
const ExistingFilePreview = ({ value }: { value: any }) => {
  const docInfo = getDocInfo(value);
  if (!docInfo) return null;
  return (
    <div className="text-xs mt-1">
      <span className="text-gray-500">File tersimpan: </span>
      <a
        href={docInfo.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline font-medium"
      >
        {docInfo.fileName}
      </a>
    </div>
  );
};

interface DokumenSectionProps {
  form: UseFormReturn<DataPegawaiSchema>;
  isReadOnly?: boolean;
}

const DokumenSection = ({ form, isReadOnly = false }: DokumenSectionProps) => {
  const { watch } = form;
  const dokumenList = watch("dokumen" as any);

  const getDoc = (fieldName: string, categoryName: string) => {
    const fieldVal = watch(fieldName as any);
    if (fieldVal) return fieldVal;
    if (Array.isArray(dokumenList)) {
      return (
        dokumenList.find(
          (d: any) =>
            d.kategori_dokumen?.toUpperCase() === categoryName.toUpperCase()
        ) || null
      );
    }
    return null;
  };

  const fileValues = {
    file_karpeg:
      getDoc("file_karpeg", "FILE KARPEG") ||
      getDoc("file_kapreg", "FILE KARPEG"),
    file_npwp: getDoc("file_npwp", "FILE NPWP"),
    file_rekening: getDoc("file_rekening", "FILE REKENING"),
    file_kk: getDoc("file_kk", "FILE KK"),
    file_ktp: getDoc("file_ktp", "FILE KTP"),
    file_sertifikasi_dosen: getDoc(
      "file_sertifikasi_dosen",
      "FILE SERTIFIKASI DOSEN"
    ),
    file_bpjs: getDoc("file_bpjs", "FILE BPJS"),
    file_bpjs_ketenagakerjaan: getDoc(
      "file_bpjs_ketenagakerjaan",
      "FILE BPJS KETENAGA KERJAAN"
    ),
    file_tanda_tangan: getDoc("file_tanda_tangan", "FILE TANDA TANGAN"),
  };

  return (
    <div className="grid lg:grid-rows-8 lg:grid-flow-col gap-y-6 gap-x-4 mt-10 items-start">
      <FormFieldInput
        form={form}
        label="KAPREG"
        name="kapreg"
        labelStyle="text-[#3F6FA9]"
        required={false}
        readOnly={isReadOnly}
      />

      {isReadOnly ? (
        <ReadOnlyFileLink label="File KARPEG" value={fileValues.file_karpeg} />
      ) : (
        <div>
          <FormFieldInputFile
            label="File KARPEG"
            name="file_karpeg"
            labelStyle="text-[#3F6FA9]"
            required={false}
          />
          <ExistingFilePreview value={fileValues.file_karpeg} />
        </div>
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
        <div>
          <FormFieldInputFile
            label="File NPWP"
            name="file_npwp"
            labelStyle="text-[#3F6FA9]"
            required={false}
          />
          <ExistingFilePreview value={fileValues.file_npwp} />
        </div>
      )}

      {isReadOnly ? (
        <ReadOnlyFileLink
          label="File Rekening"
          value={fileValues.file_rekening}
        />
      ) : (
        <div>
          <FormFieldInputFile
            label="File Rekening"
            name="file_rekening"
            labelStyle="text-[#3F6FA9]"
            required={false}
          />
          <ExistingFilePreview value={fileValues.file_rekening} />
        </div>
      )}

      {isReadOnly ? (
        <ReadOnlyFileLink label="File KK" value={fileValues.file_kk} />
      ) : (
        <div>
          <FormFieldInputFile
            label="File KK"
            name="file_kk"
            labelStyle="text-[#3F6FA9]"
            required={false}
          />
          <ExistingFilePreview value={fileValues.file_kk} />
        </div>
      )}

      {isReadOnly ? (
        <ReadOnlyFileLink label="File KTP" value={fileValues.file_ktp} />
      ) : (
        <div>
          <FormFieldInputFile
            label="File KTP"
            name="file_ktp"
            labelStyle="text-[#3F6FA9]"
            required={false}
          />
          <ExistingFilePreview value={fileValues.file_ktp} />
        </div>
      )}

      {isReadOnly ? (
        <ReadOnlyFileLink
          label="File Sertifikasi Dosen"
          value={fileValues.file_sertifikasi_dosen}
        />
      ) : (
        <div>
          <FormFieldInputFile
            label="File Sertifikasi Dosen"
            name="file_sertifikasi_dosen"
            labelStyle="text-[#3F6FA9]"
            required={false}
          />
          <ExistingFilePreview value={fileValues.file_sertifikasi_dosen} />
        </div>
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
        <div>
          <FormFieldInputFile
            label="File BPJS"
            name="file_bpjs"
            labelStyle="text-[#3F6FA9]"
            required={false}
          />
          <ExistingFilePreview value={fileValues.file_bpjs} />
        </div>
      )}

      {isReadOnly ? (
        <ReadOnlyFileLink
          label="File BPJS Ketenagakerjaan"
          value={fileValues.file_bpjs_ketenagakerjaan}
        />
      ) : (
        <div>
          <FormFieldInputFile
            label="File BPJS Ketenagakerjaan"
            name="file_bpjs_ketenagakerjaan"
            labelStyle="text-[#3F6FA9]"
            required={false}
          />
          <ExistingFilePreview value={fileValues.file_bpjs_ketenagakerjaan} />
        </div>
      )}

      {isReadOnly ? (
        <ReadOnlyFileLink
          label="File Tanda Tangan"
          value={fileValues.file_tanda_tangan}
        />
      ) : (
        <div>
          <FormFieldInputFile
            label="File Tanda Tangan"
            name="file_tanda_tangan"
            labelStyle="text-[#3F6FA9]"
            required={false}
          />
          <ExistingFilePreview value={fileValues.file_tanda_tangan} />
        </div>
      )}
    </div>
  );
};

export default DokumenSection;
