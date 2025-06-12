import {FormFieldInput} from "../CustomFormInput/CustomFormInput";
import {FormFieldSelect} from "../CustomFormSelect/CustomFormSelect";
import {UIKA_WORK_UNITS} from "@/constant/unitkerja/unitKerja.ts";

const KepegawaianSection = ({form}) => (
    <div className="grid lg:grid-rows-4 lg:grid-flow-col gap-4 mt-10">
        <FormFieldSelect
            form={form}
            label="Unit Kerja"
            name="unit_kerja_id"
            labelStyle="text-[#3F6FA9]"
            options={UIKA_WORK_UNITS}
            placeholder="Pilih Unit Kerja"
            required={true}
        />
        <FormFieldSelect
            form={form}
            label="Status Aktif"
            name="status_aktif_id"
            labelStyle="text-[#3F6FA9]"
            options={[
                {label: "Aktif", value: "1"},
                {label: "Cuti Luar Tanggungan", value: "2"},
                {label: "Kontrak Habis", value: "3"},
                {label: "Wafat", value: "4"},
                {label: "Mangkir 5 Kali Berturut-turut", value: "5"},
                {label: "Mengundurkan diri", value: "6"},
                {label: "Pensiun Dini", value: "7"},
                {label: "PHK", value: "8"},
                {label: "Pelanggaran", value: "9"},
                {label: "Pensiun Normal", value: "10"},
                {label: "Pernikahan Sesama Karyawan", value: "11"},
                {label: "Kesalahan Berat", value: "12"},
                {label: "Sakit Berkepanjangan", value: "13"},
                {label: "Tidak Aktif", value: "14"},
                {label: "Tugas Belajar", value: "15"},
                {label: "Ditahan Pihak Berwajib", value: "16"},
            ]}
            placeholder="--Pilih Status Aktif--"
            required={true}
        />
        <FormFieldSelect
            form={form}
            label="Hubungan Kerja"
            name="status_kerja"
            labelStyle="text-[#3F6FA9]"
            options={[
                {label: "Dosen Tetap Yayasan", value: "1"},
                {label: "Karyawan Tetap Yayasan", value: "2"},
                {label: "PNS/DPK", value: "3"},
                {label: "Dosen Tidak Tetap", value: "4"},
                {label: "Kontrak", value: "5"},
                {label: "Kontrak Fakultas", value: "6"},
            ]}
            placeholder="--Pilih Hubungan Kerja--"
            required={true}
        />
        <FormFieldInput
            form={form}
            label="Email Pegawai"
            name="email_pegawai"
            labelStyle="text-[#3F6FA9]"
            required={true}
        />
        <FormFieldInput
            form={form}
            label="Email Pribadi"
            name="email_pribadi"
            labelStyle="text-[#3F6FA9]"
            required={true}
        />
        <FormFieldSelect
            form={form}
            label="Golongan"
            name="golongan"
            labelStyle="text-[#3F6FA9]"
            options={[
                {label: "Admin", value: "admin"},
                {label: "User", value: "user"},
                {label: "Guest", value: "guest"},
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
                {label: "Asisten Ahli", value: "1"},
                {label: "Dosen Praktisi/Industri", value: "2"},
                {label: "Guru Besar", value: "3"},
                {label: "Guru Pamong", value: "4"},
                {label: "Administrasi", value: "5"},
                {label: "Keamanan", value: "6"},
                {label: "Laboran", value: "7"},
                {label: "Pustakawan", value: "8"},
                {label: "Parkir", value: "9"},
                {label: "Lektor", value: "10"},
                {label: "Lektor Kepala", value: "11"},
                {label: "Dosen", value: "12"},
                {label: "Rumah Tangga", value: "13"},
                {label: "Sopir", value: "14"},
                {label: "Tenaga Ahli", value: "15"},
                {label: "Tenaga Pengajar", value: "16"},
            ]}
            placeholder="--Pilih Jabatan Fungsional--"
            required={false}
        />
    </div>
);

export default KepegawaianSection;
