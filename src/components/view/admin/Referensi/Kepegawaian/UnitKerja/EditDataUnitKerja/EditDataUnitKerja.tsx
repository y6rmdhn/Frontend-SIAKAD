import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AxiosError } from "axios";
import { toast } from "sonner";

// Import Services
import adminServices from "@/services/admin.services";
import putReferensiServices from "@/services/put.admin.referensi";

// Import Components
import CustomCard from "@/components/blocks/Card";
import Title from "@/components/blocks/Title";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput";
import { FormFieldSelect } from "@/components/blocks/CustomFormSelect/CustomFormSelect";
import { InfiniteScrollSelect } from "@/components/blocks/InfiniteScrollSelect/InfiniteScrollSelect";

// Import Icons
import { FiSearch } from "react-icons/fi";
import { IoIosArrowBack } from "react-icons/io";
import { IoSaveSharp } from "react-icons/io5";

// --- Zod Schema Definition ---
const unitKerjaSchema = z.object({
  kode_unit: z
    .string({ required_error: "Kode Unit wajib diisi." })
    .min(1, "Kode Unit tidak boleh kosong."),
  nama_unit: z
    .string({ required_error: "Nama Unit wajib diisi." })
    .min(1, "Nama Unit tidak boleh kosong."),
  jenis_unit_id: z.coerce.string().optional(),
  tk_pendidikan_id: z.coerce.string().optional(),
  akreditasi_id: z.coerce.string().optional(),
  parent_unit_id: z.string().optional().or(z.literal("")),
  alamat: z.string().optional(),
  telepon: z.string().optional(),
  website: z
    .string()
    .url({ message: "Format URL tidak valid." })
    .or(z.literal(""))
    .optional(),
  alamat_email: z
    .string()
    .email({ message: "Format email tidak valid." })
    .or(z.literal(""))
    .optional(),
  no_sk_akreditasi: z.string().optional(),
  tanggal_akreditasi: z.string().optional(),
  no_sk_pendirian: z.string().optional(),
  tanggal_sk_pendirian: z.string().optional(),
  gedung: z.string().optional(),
});

type UnitKerjaSchema = z.infer<typeof unitKerjaSchema>;

interface UpdateUnitKerjaPayload {
  id: string;
  data: UnitKerjaSchema;
}

const UnitKerjaForm = ({ initialData }: { initialData: any }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return "";
    return dateString.split("T")[0];
  };

  // Gunakan useMemo untuk memformat data awal sekali saja
  const formattedInitialData = React.useMemo(
    () => ({
      kode_unit: initialData.kode_unit || "",
      nama_unit: initialData.nama_unit || "",
      parent_unit_id: initialData.parent_unit_id || "",
      alamat: initialData.alamat || "",
      telepon: initialData.telepon || "",
      website: initialData.website || "",
      alamat_email: initialData.alamat_email || "",
      no_sk_akreditasi: initialData.no_sk_akreditasi || "",
      tanggal_akreditasi: formatDate(initialData.tanggal_akreditasi),
      no_sk_pendirian: initialData.no_sk_pendirian || "",
      tanggal_sk_pendirian: formatDate(initialData.tanggal_sk_pendirian),
      gedung: initialData.gedung || "",
      jenis_unit_id: initialData.jenis_unit_id,
      tk_pendidikan_id: initialData.tk_pendidikan_id,
      akreditasi_id: initialData.akreditasi_id,
    }),
    [initialData]
  );

  const form = useForm<UnitKerjaSchema>({
    resolver: zodResolver(unitKerjaSchema),
    defaultValues: formattedInitialData,
  });

  const { mutate: updateUnitKerja, isPending } = useMutation<
    any,
    AxiosError,
    UpdateUnitKerjaPayload
  >({
    mutationFn: (payload) =>
      putReferensiServices.unitKerja(payload.id, payload.data),
    onSuccess: () => {
      toast.success("Data unit kerja berhasil diperbarui");
      queryClient.invalidateQueries({ queryKey: ["unit-kerja-referensi"] });
      navigate("/admin/referensi/kepegawaian/unit-kerja");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Gagal memperbarui data");
    },
  });

  const handleSubmitData = (values: UnitKerjaSchema) => {
    if (!id) return toast.error("ID Unit Kerja tidak ditemukan!");
    updateUnitKerja({ id, data: values });
  };

  const onFormError = (errors: any) => {
    console.error("Kesalahan Validasi Form:", errors);
    toast.error("Gagal submit, periksa kembali isian form Anda.");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmitData, onFormError)}>
        <CustomCard
          actions={
            <div className="w-full flex flex-col gap-4 lg:flex-row justify-between">
              <div className="w-full lg:w-96 relative">
                <FiSearch className="absolute top-1/2 -translate-y-1/2 right-2" />
                <Input
                  placeholder="Search"
                  className="lg:w-96 w-full pr-8 text-xs sm:text-sm"
                />
              </div>
              <div className=" flex flex-col lg:flex-row justify-end gap-2">
                <Link to="/admin/referensi/kepegawaian/unit-kerja">
                  <Button
                    type="button"
                    className="bg-[#3ABC67] hover:bg-[#329C59] text-white text-xs sm:text-sm"
                  >
                    <IoIosArrowBack /> Kembali Ke Daftar
                  </Button>
                </Link>
                <Button
                  type="submit"
                  disabled={isPending}
                  className="bg-[#3ABC67] hover:bg-[#329C59] text-white text-xs sm:text-sm"
                >
                  <IoSaveSharp /> {isPending ? "Menyimpan..." : "Simpan"}
                </Button>
              </div>
            </div>
          }
        >
          <div className="grid grid-rows-10 md:grid-flow-col items-center gap-x-4 gap-y-4 md:gap-y-0">
            {/* Kolom 1 */}
            <FormFieldInput
              form={form}
              label="Kode Unit"
              name="kode_unit"
              required
              labelStyle="text-[#3F6FA9]"
            />
            <FormFieldInput
              form={form}
              label="Nama Unit"
              name="nama_unit"
              required
              labelStyle="text-[#3F6FA9]"
            />
            <InfiniteScrollSelect
              form={form}
              label="Parent Unit"
              name="parent_unit_id"
              labelStyle="text-[#3F6FA9]"
              placeholder="--Pilih Parent Unit--"
              queryKey="parent-unit-select-referensi-edit"
              queryFn={adminServices.getUnitKerja}
              itemValue="id"
              itemLabel="nama_unit"
              initialSelectedItem={initialData?.parent_unit}
            />
            <FormFieldSelect
              form={form}
              label="Jenis Unit"
              name="jenis_unit_id"
              labelStyle="text-[#3F6FA9]"
              options={[
                { label: "Universitas", value: 1 },
                { label: "Fakultas", value: 2 },
                { label: "Jurusan", value: 3 },
                { label: "Program Studi", value: 4 },
              ]}
              placeholder="--Pilih Jenis Unit--"
            />
            <InfiniteScrollSelect
              form={form}
              label="TK.Pendidikan"
              name="tk_pendidikan_id"
              labelStyle="text-[#3F6FA9]"
              placeholder="--Pilih Tk Pendidikan--"
              queryKey="tk-pendidikan-select-referensi-edit"
              queryFn={adminServices.getJenjangPendidikan}
              itemValue="id"
              itemLabel="jenjang_pendidikan"
              initialSelectedItem={initialData?.tk_pendidikan}
            />
            <FormFieldInput
              form={form}
              label="Alamat"
              name="alamat"
              type="textarea"
              labelStyle="text-[#3F6FA9]"
            />
            <FormFieldInput
              form={form}
              label="Telpon"
              name="telepon"
              labelStyle="text-[#3F6FA9]"
            />
            <FormFieldInput
              form={form}
              label="Website"
              name="website"
              labelStyle="text-[#3F6FA9]"
            />

            {/* Kolom 2 */}
            <FormFieldInput
              form={form}
              label="Alamat Email"
              name="alamat_email"
              labelStyle="text-[#3F6FA9]"
            />
            <FormFieldSelect
              form={form}
              label="Akreditasi"
              name="akreditasi_id"
              labelStyle="text-[#3F6FA9]"
              options={[
                { label: "A", value: 1 },
                { label: "B", value: 2 },
                { label: "C", value: 3 },
                { label: "Unggul", value: 4 },
                { label: "Baik Sekali", value: 5 },
                { label: "Baik", value: 6 },
                { label: "Minimum", value: 7 },
                { label: "Tidak Terakreditasi/ Kadaluwarsa", value: 8 },
              ]}
              placeholder="-Pilih Akreditasi-"
            />
            <FormFieldInput
              form={form}
              label="No.SK Akreditasi"
              name="no_sk_akreditasi"
              labelStyle="text-[#3F6FA9]"
            />
            <FormFieldInput
              form={form}
              label="Tanggal Akreditasi"
              name="tanggal_akreditasi"
              type="date"
              labelStyle="text-[#3F6FA9]"
            />
            <FormFieldInput
              form={form}
              label="No.SK Pendirian"
              name="no_sk_pendirian"
              labelStyle="text-[#3F6FA9]"
            />
            <FormFieldInput
              form={form}
              label="Tanggal SK Pendirian"
              name="tanggal_sk_pendirian"
              type="date"
              labelStyle="text-[#3F6FA9]"
            />
            <FormFieldSelect
              form={form}
              label="Gedung"
              name="gedung"
              labelStyle="text-[#3F6FA9]"
              options={[
                { label: "Gedung A", value: "Gedung A" },
                { label: "Gedung B", value: "Gedung B" },
                { label: "Gedung C", value: "Gedung C" },
              ]}
              placeholder="Pilih Gedung"
            />
          </div>
        </CustomCard>
      </form>
    </Form>
  );
};

const EditDataUnitKerja = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["unit-kerja-edit", id],
    queryFn: async () => {
      if (!id) return null;
      const response = await adminServices.getDetailUnitKerja(id);
      return response.data;
    },
    enabled: !!id, // Query hanya berjalan jika ID ada
  });

  if (isLoading) {
    return <div className="mt-10 text-center">Memuat data unit kerja...</div>;
  }

  if (isError) {
    return (
      <div className="mt-10 text-center text-red-500">
        Gagal memuat data. Silakan coba lagi.
      </div>
    );
  }

  if (!data?.data) {
    return <div className="mt-10 text-center">Data tidak ditemukan.</div>;
  }

  return (
    <div className="mt-10 mb-20">
      <Title title="Unit Kerja" subTitle="Edit Detail Unit Kerja" />
      <UnitKerjaForm initialData={data.data} />
    </div>
  );
};

export default EditDataUnitKerja;
