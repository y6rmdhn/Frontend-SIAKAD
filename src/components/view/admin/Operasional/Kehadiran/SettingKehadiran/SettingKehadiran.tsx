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
import { MdEdit, MdArrowBack, MdAdd, MdQrCode2 } from "react-icons/md";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import adminServices from "@/services/admin.services.ts";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput";
import { IoSaveOutline } from "react-icons/io5";
import { z } from "zod";
import putReferensiServices from "@/services/put.admin.referensi";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import StatusSettingkehadiran from "@/components/blocks/StatusSettingKehadiran/StatusSettingkehadiran";

// --- SCHEMA VALIDATION ---
export const settingKehadiranSchema = z.object({
  nama_gedung: z
    .string({ required_error: "Nama gedung tidak boleh kosong." })
    .min(1, "Nama gedung tidak boleh kosong."),
  latitude: z.coerce.number({ required_error: "Latitude tidak boleh kosong." }),
  longitude: z.coerce.number({
    required_error: "Longitude tidak boleh kosong.",
  }),
  radius: z.coerce.number().positive("Radius harus positif."),

  // Rules
  berlaku_keterlambatan: z.boolean(),
  toleransi_terlambat: z.coerce.number().int().nonnegative(),
  berlaku_pulang_cepat: z.boolean(),
  toleransi_pulang_cepat: z.coerce.number().int().nonnegative(),

  // Requirements
  wajib_foto: z.boolean(),
  wajib_isi_rencana_kegiatan: z.boolean(),
  wajib_isi_realisasi_kegiatan: z.boolean(),
  wajib_presensi_dilokasi: z.boolean(),

  // Features
  qr_code_enabled: z.boolean(),
  pin_code_enabled: z.boolean(),
});

export type SettingKehadiranValues = z.infer<typeof settingKehadiranSchema>;

const SettingKehadiran = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isCreateMode, setIsCreateMode] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const defaultValues: SettingKehadiranValues = {
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
    qr_code_enabled: false,
    pin_code_enabled: false,
  };

  const form = useForm<SettingKehadiranValues>({
    resolver: zodResolver(settingKehadiranSchema),
    defaultValues: defaultValues,
  });

  // GET DATA
  const { data } = useQuery({
    queryKey: ["setting-kehadiran"],
    queryFn: async () => {
      const response = await adminServices.getSettingKehadiran();
      return response.data.data || [];
    },
  });

  console.log(data);

  const activeItem =
    !isCreateMode && Array.isArray(data)
      ? data.find((item: any) => item.id === selectedId)
      : null;

  // --- MUTATION: EDIT ---
  const { mutate: saveData, isPending: isSaving } = useMutation({
    mutationFn: ({
      values,
      id,
    }: {
      values: SettingKehadiranValues;
      id?: string;
    }) => {
      return putReferensiServices.putSettingKehadiran(values, `${id}`);
    },
    onSuccess: () => {
      toast.success("Data berhasil diperbarui");
      handleCancel();
      queryClient.invalidateQueries({ queryKey: ["setting-kehadiran"] });
    },
    onError: (error) => {
      toast.error(error.message || "Gagal menyimpan data");
    },
  });

  // --- MUTATION: CREATE ---
  const { mutate: createData, isPending: isCreating } = useMutation({
    mutationFn: (values: SettingKehadiranValues) => {
      return putReferensiServices.createSettingKehadiran(values);
    },
    onSuccess: () => {
      toast.success("Data baru berhasil ditambahkan");
      handleCancel();
      queryClient.invalidateQueries({ queryKey: ["setting-kehadiran"] });
    },
    onError: (error) => {
      toast.error(error.message || "Gagal membuat data");
    },
  });

  const handleCreateClick = () => {
    setIsCreateMode(true);
    setSelectedId(null);
    form.reset(defaultValues);
  };

  const handleEditClick = (item: any) => {
    setIsCreateMode(false);
    setSelectedId(item.id);

    form.reset({
      nama_gedung: item.nama_gedung,
      latitude: item?.coordinates?.latitude,
      longitude: item?.coordinates?.longitude,
      radius: item?.radius,
      berlaku_keterlambatan: item?.late_rules?.berlaku_keterlambatan,
      toleransi_terlambat: item?.late_rules?.toleransi_terlambat,
      berlaku_pulang_cepat: item?.early_leave_rules?.berlaku_pulang_cepat,
      toleransi_pulang_cepat: item?.early_leave_rules?.toleransi_pulang_cepat,
      wajib_foto: item?.attendance_requirements?.wajib_foto,
      wajib_isi_rencana_kegiatan:
        item?.attendance_requirements?.wajib_isi_rencana_kegiatan,
      wajib_isi_realisasi_kegiatan:
        item?.attendance_requirements?.wajib_isi_realisasi_kegiatan,
      wajib_presensi_dilokasi:
        item?.attendance_requirements?.wajib_presensi_dilokasi,
      qr_code_enabled: item?.qr_code?.enabled ?? false,
      pin_code_enabled: item?.pin_code?.enabled ?? false,
    });
  };

  const handleCancel = () => {
    setSelectedId(null);
    setIsCreateMode(false);
    form.reset(defaultValues);
  };

  const handleSubmitData = (values: SettingKehadiranValues) => {
    const payload = {
      ...values,
      qr_code: { enabled: values.qr_code_enabled },
      pin_code: { enabled: values.pin_code_enabled },
    };

    if (isCreateMode) {
      createData(payload);
    } else {
      saveData({ values: payload, id: selectedId! });
    }
  };

  const isPending = isSaving || isCreating;

  return (
    <div className="mt-10 mb-20">
      <h1 className="sm:text-2xl text-sm font-normal mb-6">
        {isCreateMode
          ? "Tambah Setting Kehadiran"
          : selectedId
          ? "Edit Setting Kehadiran"
          : "Setting Kehadiran"}
      </h1>

      {/* TAMPILAN TABEL */}
      {!selectedId && !isCreateMode ? (
        <CustomCard
          actions={
            <div className="w-full flex justify-end">
              <Button
                onClick={handleCreateClick}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <MdAdd className="mr-2" /> Tambah Data
              </Button>
            </div>
          }
        >
          <Table className="table-auto">
            <TableHeader>
              <TableRow className="bg-blue-500 hover:bg-blue-500">
                <TableHead className="text-white text-center">
                  Nama Gedung
                </TableHead>
                <TableHead className="text-white text-center">
                  Latitude
                </TableHead>
                <TableHead className="text-white text-center">
                  Longitude
                </TableHead>
                <TableHead className="text-white text-center">
                  Radius (m)
                </TableHead>
                <TableHead className="text-white text-center">
                  QR Code
                </TableHead>
                <TableHead className="text-white text-center">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.isArray(data) &&
                data.map((item: any) => (
                  <TableRow key={item.id}>
                    <TableCell className="text-center font-medium">
                      {item.nama_gedung}
                    </TableCell>
                    <TableCell className="text-center">
                      {item.coordinates?.latitude}
                    </TableCell>
                    <TableCell className="text-center">
                      {item.coordinates?.longitude}
                    </TableCell>
                    <TableCell className="text-center">{item.radius}</TableCell>

                    <TableCell className="text-center">
                      {item.qr_code?.download_url ? (
                        <Button
                          size="sm"
                          variant="ghost"
                          title="Download QR Code"
                          className="hover:bg-slate-100"
                          onClick={() =>
                            window.open(item.qr_code.download_url, "_blank")
                          }
                        >
                          <MdQrCode2 className="h-6 w-6 text-slate-700" />
                        </Button>
                      ) : (
                        <span className="text-xs text-gray-400">-</span>
                      )}
                    </TableCell>

                    <TableCell className="text-center">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditClick(item)}
                        className="bg-yellow-100 hover:bg-yellow-200 text-yellow-700 border-yellow-300"
                      >
                        <MdEdit className="mr-1" /> Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CustomCard>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmitData)}>
            <CustomCard
              actions={
                <div className="w-full flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                  >
                    <MdArrowBack className="mr-2" /> Kembali
                  </Button>
                  <Button
                    type="submit"
                    className="bg-green-light-uika hover:bg-[#329C59]"
                    disabled={isPending}
                  >
                    <IoSaveOutline className="mr-2" />
                    {isPending ? "Menyimpan..." : "Simpan Data"}
                  </Button>
                </div>
              }
            >
              <div className="sm:flex gap-2 w-full mb-6">
                <div className="w-full">
                  <StatusSettingkehadiran
                    attendance_requirements={
                      isCreateMode
                        ? defaultValues
                        : activeItem?.attendance_requirements
                    }
                    early_leave_rules={
                      isCreateMode
                        ? defaultValues
                        : activeItem?.early_leave_rules
                    }
                    form={form}
                    isEditMode={true}
                    late_rules={
                      isCreateMode ? defaultValues : activeItem?.late_rules
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 p-4 border rounded bg-slate-50">
                <FormFieldInput
                  form={form}
                  name="nama_gedung"
                  label="Nama Gedung"
                />
                <FormFieldInput
                  form={form}
                  name="latitude"
                  type="number"
                  label="Latitude"
                />
                <FormFieldInput
                  form={form}
                  name="longitude"
                  type="number"
                  label="Longitude"
                />
                <FormFieldInput
                  form={form}
                  name="radius"
                  type="number"
                  label="Radius"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg bg-white shadow-sm">
                {!isCreateMode && (
                  <div>
                    <h3 className="text-sm font-semibold mb-2">Lokasi Maps</h3>
                    {activeItem?.maps_url ? (
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full sm:w-auto text-blue-600"
                        onClick={() =>
                          window.open(activeItem.maps_url, "_blank")
                        }
                      >
                        📍 Buka Google Maps
                      </Button>
                    ) : (
                      <p className="text-xs text-gray-500">
                        Link Maps tidak tersedia
                      </p>
                    )}
                  </div>
                )}

                <div className={isCreateMode ? "col-span-2" : ""}>
                  <h3 className="text-sm font-semibold mb-2">Fitur Presensi</h3>

                  <div className="space-y-2 pt-2">
                    <p className="text-xs text-gray-500 font-medium">
                      Pengaturan:
                    </p>
                    <div className="flex gap-4">
                      <FormFieldInput
                        form={form}
                        name="qr_code_enabled"
                        label="Aktifkan QR"
                        type="checkbox"
                      />
                      <FormFieldInput
                        form={form}
                        name="pin_code_enabled"
                        label="Aktifkan PIN"
                        type="checkbox"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CustomCard>
          </form>
        </Form>
      )}
    </div>
  );
};

export default SettingKehadiran;
