import { Label } from "@/components/ui/label";
import { FormFieldInput } from "../CustomFormInput/CustomFormInput";
import { FaCheck } from "react-icons/fa";
import { HiMiniXMark } from "react-icons/hi2";
import { UseFormReturn } from "react-hook-form";

interface StatusSettingkehadiranProps {
  late_rules?: {
    berlaku_keterlambatan: boolean;
    toleransi_terlambat: number | string;
  };
  early_leave_rules?: {
    berlaku_pulang_cepat: boolean;
    toleransi_pulang_cepat: number | string;
  };
  attendance_requirements?: {
    wajib_foto: boolean;
    wajib_isi_rencana_kegiatan: boolean;
    wajib_isi_realisasi_kegiatan: boolean;
    wajib_presensi_dilokasi: boolean;
  };
  isEditMode: boolean;
  form: UseFormReturn<any>;
}

const StatusSettingkehadiran = ({
  late_rules,
  early_leave_rules,
  attendance_requirements,
  isEditMode,
  form,
}: StatusSettingkehadiranProps) => {
  return (
    <div className="grid md:grid-rows-4 md:grid-flow-col gap-4">
      <div className="flex justify-between items-center bg-white p-2 rounded-md shadow">
        <Label className="text-xs sm:text-sm">Berlaku Keterlambatan</Label>
        {isEditMode ? (
          <FormFieldInput
            type="checkbox"
            form={form}
            name="berlaku_keterlambatan"
          />
        ) : (
          <div
            className={`${
              late_rules?.berlaku_keterlambatan ? "bg-green-100" : "bg-red-100"
            } rounded-md px-2 py-1`}
          >
            {late_rules?.berlaku_keterlambatan ? (
              <FaCheck className="w-4 h-4 text-green-500" />
            ) : (
              <HiMiniXMark className="w-4 h-4 text-[#FF0000]" />
            )}
          </div>
        )}
      </div>
      <div className="flex justify-between items-center bg-white p-2 rounded-md shadow">
        <Label className="text-xs sm:text-sm">Toleransi Terlambat</Label>
        {isEditMode ? (
          <FormFieldInput form={form} name="toleransi_terlambat" />
        ) : (
          <div
            className={`${
              late_rules?.toleransi_terlambat ? "bg-green-100" : "bg-red-100"
            } rounded-md px-2 py-1`}
          >
            {late_rules?.toleransi_terlambat ? (
              <p className="text-sm">
                {late_rules?.toleransi_terlambat} Minutes
              </p>
            ) : (
              <span>-</span>
            )}
          </div>
        )}
      </div>
      <div className="flex justify-between items-center bg-white p-2 rounded-md shadow">
        <Label className="text-xs sm:text-sm">Berlaku Pulang Cepat</Label>
        {isEditMode ? (
          <FormFieldInput
            type="checkbox"
            form={form}
            name="berlaku_pulang_cepat"
          />
        ) : (
          <div
            className={`${
              early_leave_rules?.berlaku_pulang_cepat
                ? "bg-green-100"
                : "bg-red-100"
            } rounded-md px-2 py-1`}
          >
            {early_leave_rules?.berlaku_pulang_cepat ? (
              <FaCheck className="w-4 h-4 text-green-500" />
            ) : (
              <HiMiniXMark className="w-4 h-4 text-[#FF0000]" />
            )}
          </div>
        )}
      </div>
      <div className="flex justify-between items-center bg-white p-2 rounded-md shadow">
        <Label className="text-xs sm:text-sm">Toleransi Pulang Cepat</Label>
        {isEditMode ? (
          <FormFieldInput form={form} name="toleransi_pulang_cepat" />
        ) : (
          <div
            className={`${
              early_leave_rules?.toleransi_pulang_cepat
                ? "bg-green-100"
                : "bg-red-100"
            } rounded-md px-2 py-1`}
          >
            {early_leave_rules?.toleransi_pulang_cepat ? (
              <p className="text-sm">
                {early_leave_rules?.toleransi_pulang_cepat} Minutes
              </p>
            ) : (
              <span>-</span>
            )}
          </div>
        )}
      </div>
      <div className="flex justify-between items-center bg-white p-2 rounded-md shadow">
        <Label className="text-xs sm:text-sm">Wajib Foto</Label>
        {isEditMode ? (
          <FormFieldInput type="checkbox" form={form} name="wajib_foto" />
        ) : (
          <div
            className={`${
              attendance_requirements?.wajib_foto
                ? "bg-green-100"
                : "bg-red-100"
            } rounded-md px-2 py-1`}
          >
            {attendance_requirements?.wajib_foto ? (
              <FaCheck className="w-4 h-4 text-green-500" />
            ) : (
              <HiMiniXMark className="w-4 h-4 text-[#FF0000]" />
            )}
          </div>
        )}
      </div>
      <div className="flex justify-between items-center bg-white p-2 rounded-md shadow">
        <Label className="text-xs sm:text-sm">Wajib Isi Rencana Kegiatan</Label>
        {isEditMode ? (
          <FormFieldInput
            type="checkbox"
            form={form}
            name="wajib_isi_rencana_kegiatan"
          />
        ) : (
          <div
            className={`${
              attendance_requirements?.wajib_isi_rencana_kegiatan
                ? "bg-green-100"
                : "bg-red-100"
            } rounded-md px-2 py-1`}
          >
            {attendance_requirements?.wajib_isi_rencana_kegiatan ? (
              <FaCheck className="w-4 h-4 text-green-500" />
            ) : (
              <HiMiniXMark className="w-4 h-4 text-[#FF0000]" />
            )}
          </div>
        )}
      </div>
      <div className="flex justify-between items-center bg-white p-2 rounded-md shadow">
        <Label className="text-xs sm:text-sm">
          Wajib Isi Realisasi Kegiatan
        </Label>
        {isEditMode ? (
          <FormFieldInput
            type="checkbox"
            form={form}
            name="wajib_isi_realisasi_kegiatan"
          />
        ) : (
          <div
            className={`${
              attendance_requirements?.wajib_isi_realisasi_kegiatan
                ? "bg-green-100"
                : "bg-red-100"
            } rounded-md px-2 py-1`}
          >
            {attendance_requirements?.wajib_isi_realisasi_kegiatan ? (
              <FaCheck className="w-4 h-4 text-green-500" />
            ) : (
              <HiMiniXMark className="w-4 h-4 text-[#FF0000]" />
            )}
          </div>
        )}
      </div>
      <div className="flex justify-between items-center bg-white p-2 rounded-md shadow">
        <Label className="text-xs sm:text-sm">Wajib Presensi dilokasi</Label>
        {isEditMode ? (
          <FormFieldInput
            type="checkbox"
            form={form}
            name="wajib_presensi_dilokasi"
          />
        ) : (
          <div
            className={`${
              attendance_requirements?.wajib_presensi_dilokasi
                ? "bg-green-100"
                : "bg-red-100"
            } rounded-md px-2 py-1`}
          >
            {attendance_requirements?.wajib_presensi_dilokasi ? (
              <FaCheck className="w-4 h-4 text-green-500" />
            ) : (
              <HiMiniXMark className="w-4 h-4 text-[#FF0000]" />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatusSettingkehadiran;
