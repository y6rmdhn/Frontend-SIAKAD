import CustomCard from "@/components/blocks/Card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MdEdit } from "react-icons/md";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import adminServices from "@/services/admin.services.ts";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput";
import { IoSaveOutline } from "react-icons/io5";
import { RiResetLeftFill } from "react-icons/ri";
import { z } from "zod";
import putReferensiServices from "@/services/put.admin.referensi";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import StatusSettingkehadiran from "@/components/blocks/StatusSettingKehadiran/StatusSettingkehadiran";

export const settingKehadiranSchema = z.object({
  nama_gedung: z
    .string({
      required_error: "Nama gedung tidak boleh kosong.",
    })
    .min(1, "Nama gedung tidak boleh kosong."),

  // DIUBAH MENJADI NUMBER
  latitude: z.coerce.number({
    required_error: "Latitude tidak boleh kosong.",
    invalid_type_error: "Latitude harus berupa angka.",
  }),

  // DIUBAH MENJADI NUMBER
  longitude: z.coerce.number({
    required_error: "Longitude tidak boleh kosong.",
    invalid_type_error: "Longitude harus berupa angka.",
  }),

  radius: z.coerce
    .number({
      required_error: "Radius tidak boleh kosong.",
      invalid_type_error: "Radius harus berupa angka.",
    })
    .positive("Radius harus merupakan angka positif."),

  berlaku_keterlambatan: z.boolean(),

  toleransi_terlambat: z.coerce
    .number({
      invalid_type_error: "Toleransi terlambat harus berupa angka.",
    })
    .int()
    .nonnegative("Toleransi terlambat tidak boleh negatif."),

  berlaku_pulang_cepat: z.boolean(),

  toleransi_pulang_cepat: z.coerce
    .number({
      invalid_type_error: "Toleransi pulang cepat harus berupa angka.",
    })
    .int()
    .nonnegative("Toleransi pulang cepat tidak boleh negatif."),

  wajib_foto: z.boolean(),
  wajib_isi_rencana_kegiatan: z.boolean(),
  wajib_isi_realisasi_kegiatan: z.boolean(),
  wajib_presensi_dilokasi: z.boolean(),
});

export type SettingKehadiranValues = z.infer<typeof settingKehadiranSchema>;

const SettingKehadiran = () => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const form = useForm<SettingKehadiranValues>({
    resolver: zodResolver(settingKehadiranSchema),
    defaultValues: {
      nama_gedung: "",
      latitude: 0,
      longitude: 0,
      radius: 0,
      berlaku_keterlambatan: false,
      toleransi_terlambat: 0,
      berlaku_pulang_cepat: false,
      toleransi_pulang_cepat: 0,
      wajib_foto: false,
      wajib_isi_rencana_kegiatan: false,
      wajib_isi_realisasi_kegiatan: false,
      wajib_presensi_dilokasi: false,
    },
  });

  // get data
  const { data } = useQuery({
    queryKey: ["setting-kehadiran"],
    queryFn: async () => {
      const response = await adminServices.getSettingKehadiran();

      return response.data.data;
    },
  });

  //   tambah data dan update data
  const { mutate: saveData, isPending } = useMutation({
    mutationFn: ({
      values,
    }: {
      values: SettingKehadiranValues;
      id?: number;
    }) => {
      return putReferensiServices.createSettingKehadiran(values);
    },
    onSuccess: () => {
      toast.success("Data berhasil disimpan");
      setIsEditMode(false);
      queryClient.invalidateQueries({ queryKey: ["setting-kehadiran"] });
    },
    onError: (error) => {
      toast.error(error.message || "Gagal menyimpan data");
    },
  });

  const handleCancel = () => {
    if (data) {
      form.reset({
        ...data,
        latitude: data.coordinates.latitude,
        longitude: data.coordinates.longitude,
      });
    }
    setIsEditMode(false);
  };

  const handleSubmitData = (values: SettingKehadiranValues) => {
    saveData({ values, id: data?.id });
  };

  const handleEditMode = () => {
    setIsEditMode(true);
    if (data) {
      form.reset({
        nama_gedung: data.nama_gedung,
        latitude: data.coordinates.latitude,
        longitude: data.coordinates.longitude,
        radius: data.radius,
        berlaku_keterlambatan: data.late_rules.berlaku_keterlambatan,
        toleransi_terlambat: data.late_rules.toleransi_terlambat,
        berlaku_pulang_cepat: data.early_leave_rules.berlaku_pulang_cepat,
        toleransi_pulang_cepat: data.early_leave_rules.toleransi_pulang_cepat,
        wajib_foto: data.attendance_requirements.wajib_foto,
        wajib_isi_rencana_kegiatan:
          data.attendance_requirements.wajib_isi_rencana_kegiatan,
        wajib_isi_realisasi_kegiatan:
          data.attendance_requirements.wajib_isi_realisasi_kegiatan,
        wajib_presensi_dilokasi:
          data.attendance_requirements.wajib_presensi_dilokasi,
      });
    }
  };

  useEffect(() => {
    if (data && !isEditMode) {
      form.reset({
        ...data,
        latitude: data.coordinates.latitude,
        longitude: data.coordinates.longitude,
      });
    }
  }, [data, form, isEditMode]);

  return (
    <div className="mt-10 mb-20">
      <h1 className="sm:text-2xl text-sm font-normal">Setting Kehadiran</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmitData)}>
          <CustomCard
            actions={
              <div className="w-full flex justify-end">
                {isEditMode ? (
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleCancel}
                    >
                      <RiResetLeftFill className="mr-2" /> Batal
                    </Button>
                    <Button
                      type="submit"
                      className="bg-green-light-uika hover:bg-[#329C59]"
                      disabled={isPending}
                    >
                      <IoSaveOutline className="mr-2" />{" "}
                      {isPending ? "Menyimpan..." : "Simpan"}
                    </Button>
                  </div>
                ) : (
                  <Button
                    type="button"
                    onClick={handleEditMode}
                    className="bg-blue-500 hover:bg-blue-600"
                  >
                    <MdEdit /> Edit
                  </Button>
                )}
              </div>
            }
          >
            <div className="sm:flex gap-2 w-full">
              <div className="w-full">
                <StatusSettingkehadiran
                  attendance_requirements={data?.attendance_requirements}
                  early_leave_rules={data?.early_leave_rules}
                  form={form}
                  isEditMode={isEditMode}
                  late_rules={data?.late_rules}
                />
              </div>
            </div>
          </CustomCard>

          <Table className="mt-10 table-auto">
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead className="text-center text-xs sm:text-sm">
                  Nama Gedung
                </TableHead>
                <TableHead className="text-center text-xs sm:text-sm">
                  Latitude
                </TableHead>
                <TableHead className="text-center text-xs sm:text-sm">
                  Langtitude
                </TableHead>
                <TableHead className="text-center text-xs sm:text-sm">
                  Radius Presensi(Meter)
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-200">
              <TableRow>
                <TableCell className="text-center">
                  {isEditMode ? (
                    <FormFieldInput form={form} name="nama_gedung" />
                  ) : (
                    data?.nama_gedung
                  )}
                </TableCell>
                <TableCell className="text-center">
                  {isEditMode ? (
                    <FormFieldInput type="number" form={form} name="latitude" />
                  ) : (
                    data?.coordinates.latitude
                  )}
                </TableCell>
                <TableCell className="text-center">
                  {isEditMode ? (
                    <FormFieldInput
                      type="number"
                      form={form}
                      name="longitude"
                    />
                  ) : (
                    data?.coordinates.longitude
                  )}
                </TableCell>
                <TableCell className="text-center">
                  {isEditMode ? (
                    <FormFieldInput form={form} name="radius" type="number" />
                  ) : (
                    data?.radius
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </form>
      </Form>
    </div>
  );
};

export default SettingKehadiran;
