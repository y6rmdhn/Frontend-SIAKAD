import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import React from "react"; // Import React for useMemo

// Import Services
import adminServices from "@/services/admin.services";
import putReferensiServices from "@/services/put.admin.referensi";

// Import Components
import Title from "@/components/blocks/Title";
import CustomCard from "@/components/blocks/Card";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput";
import { InfiniteScrollSelect } from "@/components/blocks/InfiniteScrollSelect/InfiniteScrollSelect";
import SearchInput from "@/components/blocks/SearchInput"; // Assuming this is the desired search component

// Import Icons
import { IoIosArrowBack } from "react-icons/io";
import { IoSaveSharp } from "react-icons/io5";

// --- Zod Schema Definition ---
export const jabatanStrukturalSchema = z.object({
  kode: z.string().min(1, { message: "Kode wajib diisi" }),
  jenis_jabatan_struktural_id: z.string().optional(),
  singkatan: z.string().optional(),
  parent_jabatan: z.string().nullable().optional().or(z.literal("")),
  unit_kerja_id: z.string().min(1, { message: "Unit Kerja wajib diisi" }),
  alamat_email: z
    .string()
    .email({ message: "Alamat email tidak valid" })
    .optional()
    .or(z.literal("")),
  // eselon_id: z.string().min(1, { message: "Eselon wajib diisi" }),
  // pangkat_id: z.string().min(1, { message: "Pangkat wajib diisi" }),
  tunjangan: z.string().min(1, { message: "tunjangan is required" }),
  beban_sks: z.string().optional(),
  is_pimpinan: z.boolean().optional(),
  aktif: z.boolean().optional(),
});

type JabatanStrukturalFormData = z.infer<typeof jabatanStrukturalSchema>;

interface UpdateJabatanStrukturalPayload {
  id: string;
  data: JabatanStrukturalFormData;
}

const JabatanStrukturalForm = ({ initialData }: { initialData: any }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const formattedInitialData = React.useMemo(
    () => ({
      kode: initialData.kode || "",
      jenis_jabatan_struktural_id:
        String(initialData.jenis_jabatan_struktural_id) || "",
      singkatan: initialData.singkatan || "",
      parent_jabatan: initialData.parent_jabatan || "",
      unit_kerja_id: String(initialData.unit_kerja_id) || "",
      alamat_email: initialData.alamat_email || "",
      // eselon_id: String(initialData.eselon_id) || "",
      // pangkat_id: String(initialData.pangkat_id) || "",
      tunjangan: initialData.tunjangan || "",
      beban_sks: String(initialData.beban_sks) || "",
      is_pimpinan: initialData.is_pimpinan || false,
      aktif: initialData.aktif || false,
    }),
    [initialData]
  );

  const form = useForm<JabatanStrukturalFormData>({
    resolver: zodResolver(jabatanStrukturalSchema),
    defaultValues: formattedInitialData,
  });

  const { mutate: updateJabatanStruktural, isPending } = useMutation<
    any,
    AxiosError,
    UpdateJabatanStrukturalPayload
  >({
    mutationFn: (payload) =>
      putReferensiServices.jabatanStruktural(payload.id, payload.data),
    onSuccess: () => {
      toast.success("Data berhasil diperbarui");
      queryClient.invalidateQueries({
        queryKey: ["jabatan-struktural-referensi"],
      });
      navigate("/admin/referensi/kepegawaian/jabatan-struktural");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Gagal memperbarui data");
    },
  });

  const handleSubmitData = (values: JabatanStrukturalFormData) => {
    if (!id) return toast.error("ID Jabatan tidak ditemukan!");
    updateJabatanStruktural({ id, data: values });
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
            <div className="w-full flex flex-col gap-4 xl:flex-row justify-between xl:items-center">
              <div>
                <SearchInput />
              </div>
              <div className="w-full xl:w-auto flex flex-col xl:flex-row justify-end gap-2">
                <Link
                  className="w-full flex xl:w-auto"
                  to="/admin/referensi/kepegawaian/jabatan-struktural"
                >
                  <Button
                    type="button"
                    className="bg-[#3ABC67] w-full hover:bg-[#329C59] text-white text-xs sm:text-sm"
                  >
                    <IoIosArrowBack /> Kembali ke Daftar
                  </Button>
                </Link>
                <Button
                  type="submit"
                  disabled={isPending}
                  className="bg-[#3ABC67] w-full flex xl:w-auto hover:bg-[#329C59] text-white text-xs sm:text-sm"
                >
                  <IoSaveSharp /> {isPending ? "Menyimpan..." : "Simpan"}
                </Button>
                {/* <Button
                  type="button"
                  onClick={() => form.reset(formattedInitialData)}
                  className="bg-[#3ABC67] w-full xl:w-auto hover:bg-[#329C59] text-white text-xs sm:text-sm"
                >
                  <BiRefresh className="bg-[#FDA31A] rounded-full" /> Batal
                </Button> */}
                {/* <Button
                  type="button"
                  className="bg-[#F56954] w-full md:flex-1 xl:w-auto hover:bg-[#d45d4b] text-white text-xs sm:text-sm"
                >
                  <FaRegTrashAlt /> Hapus
                </Button> */}
              </div>
            </div>
          }
        >
          <div className="grid grid-rows-7 md:grid-flow-col items-center gap-x-4 gap-y-4 md:gap-y-4">
            <FormFieldInput
              form={form}
              label="Kode"
              name="kode"
              labelStyle="text-[#3F6FA9]"
              required={true}
            />
            <InfiniteScrollSelect
              form={form}
              label="Jenis Jabatan Struktural"
              name="jenis_jabatan_struktural_id"
              labelStyle="text-[#3F6FA9]"
              placeholder="--Pilih Jabatan Struktural--"
              queryKey="jenis-jabatan-struktural-select-referensi-edit"
              queryFn={adminServices.getJenisJabatanStruktural}
              itemValue="id"
              itemLabel="jenis_jabatan_struktural"
              initialSelectedItem={initialData?.jenis_jabatan_struktural}
            />
            <FormFieldInput
              form={form}
              label="Singkatan"
              name="singkatan"
              labelStyle="text-[#3F6FA9]"
            />
            <InfiniteScrollSelect
              form={form}
              label="Parent Jabatan Struktural"
              name="parent_jabatan"
              labelStyle="text-[#3F6FA9]"
              placeholder="--Pilih Parent Jabatan Struktural--"
              queryKey="parent-jabatan-struktural-select-referensi-edit"
              queryFn={(page) =>
                adminServices.getJabatanStrukturalReferensi(page, "")
              }
              itemValue="kode"
              itemLabel="singkatan"
              initialSelectedItem={initialData?.parent}
            />
            <InfiniteScrollSelect
              form={form}
              label="Unit Kerja"
              name="unit_kerja_id"
              labelStyle="text-[#3F6FA9]"
              placeholder="--Pilih Unit Kerja--"
              required={true}
              queryKey="unit-kerja-referensi-select-edit"
              queryFn={adminServices.getUnitKerja}
              itemValue="id"
              itemLabel="nama_unit"
              initialSelectedItem={initialData?.unit_kerja}
            />
            <FormFieldInput
              form={form}
              label="Alamat Email"
              name="alamat_email"
              labelStyle="text-[#3F6FA9]"
            />
            {/* <InfiniteScrollSelect
              form={form}
              label="Eselon"
              name="eselon_id"
              labelStyle="text-[#3F6FA9]"
              placeholder="--Pilih Eselon--"
              required={true}
              queryKey="eselon-select-referensi-edit"
              queryFn={adminServices.getEselonReferensi}
              itemValue="id"
              itemLabel="nama_eselon"
              initialSelectedItem={initialData?.eselon}
            />
            <InfiniteScrollSelect
              form={form}
              label="Pangkat"
              name="pangkat_id"
              labelStyle="text-[#3F6FA9]"
              placeholder="--Pilih Pangkat--"
              required={true}
              queryKey="pangkat-select-referensi-edit"
              queryFn={adminServices.getMasterPangkatReferensi}
              itemValue="id"
              itemLabel="nama_golongan"
              initialSelectedItem={initialData?.pangkat}
            /> */}
            <FormFieldInput
              form={form}
              label="Tunjangan"
              name="tunjangan"
              labelStyle="text-[#3F6FA9]"
              required={false}
            />
            <FormFieldInput
              form={form}
              label="Beban Sks"
              name="beban_sks"
              labelStyle="text-[#3F6FA9]"
              type="number"
            />
            <FormFieldInput
              form={form}
              label="Is Pimpinan"
              name="is_pimpinan"
              labelStyle="text-[#3F6FA9]"
              type="checkbox"
            />
            <FormFieldInput
              form={form}
              label="Aktif"
              name="aktif"
              labelStyle="text-[#3F6FA9]"
              type="checkbox"
            />
          </div>
        </CustomCard>
      </form>
    </Form>
  );
};

const EditJabatanStrukturalReferensi = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["jabatan-struktural-edit", id],
    queryFn: async () => {
      if (!id) return null;
      const response = await adminServices.getJabatanStrukturalById(id);
      return response.data;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return <div className="mt-10 text-center">Memuat data...</div>;
  }

  if (isError) {
    console.error(error);
    return (
      <div className="mt-10 text-center text-red-500">
        Gagal memuat data. Silakan coba lagi nanti.
      </div>
    );
  }

  if (!data?.data) {
    return (
      <div className="mt-10 text-center">
        Data jabatan struktural tidak ditemukan.
      </div>
    );
  }

  return (
    <div className="mt-10 mb-20">
      <Title
        title="Jabatan Struktural"
        subTitle="Edit Detail Jabatan Struktural"
      />
      <JabatanStrukturalForm initialData={data.data} />
    </div>
  );
};

export default EditJabatanStrukturalReferensi;
