import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput";
import { InfiniteScrollSelect } from "@/components/blocks/InfiniteScrollSelect/InfiniteScrollSelect";
import SearchInput from "@/components/blocks/SearchInput";

// Import Icons
import { IoIosArrowBack } from "react-icons/io";
import { IoSaveSharp } from "react-icons/io5";

// --- Zod Schema & Types ---
const fungsionalSchema = z.object({
  kode: z.string().min(1, { message: "Kode Jabatan wajib diisi" }),
  nama_jabatan_fungsional: z
    .string()
    .min(1, { message: "Nama Jabatan Fungsional wajib diisi" }),
  kode_jabatan_akademik: z
    .string()
    .min(1, { message: "Kode Jabatan Akademik wajib diisi" }),
  jabatan_akademik_id: z
    .string()
    .min(1, { message: "Jabatan Akademik wajib diisi" }),
  pangkat_id: z.string().min(1, { message: "Golongan Pangkat wajib diisi" }),
  pangkat: z.string().min(1, { message: "Pangkat wajib diisi" }),
  angka_kredit: z.string().min(1, { message: "Angka Kredit wajib diisi" }),
  usia_pensiun: z.string().min(1, { message: "Usia Pensiun wajib diisi" }),
  keterangan: z.string().optional(),
});

type FungsionalSchema = z.infer<typeof fungsionalSchema>;

type JabatanFungsionalPayload = {
  kode: string;
  nama_jabatan_fungsional: string;
  jabatan_akademik_id: string;
  pangkat_id: string;
  angka_kredit: string;
  usia_pensiun: number;
  keterangan?: string;
  kode_jabatan_akademik: string;
  pangkat: string;
};

// --- Form Component ---
const JabatanFungsionalForm = ({ initialData }: { initialData: any }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const formattedInitialData = React.useMemo(() => {
    if (!initialData) return {};
    return {
      kode: initialData.kode || "",
      nama_jabatan_fungsional: initialData.nama_jabatan_fungsional || "",
      kode_jabatan_akademik: initialData.kode_jabatan_akademik || "",
      jabatan_akademik_id: String(initialData.jabatan_akademik?.id || ""),
      pangkat_id: String(initialData.pangkat?.id || ""),
      pangkat: initialData.pangkat?.pangkat || "",
      angka_kredit: initialData.angka_kredit || "",
      usia_pensiun: String(initialData.usia_pensiun || ""),
      keterangan: initialData.keterangan || "",
    };
  }, [initialData]);

  const form = useForm<FungsionalSchema>({
    resolver: zodResolver(fungsionalSchema),
    defaultValues: formattedInitialData,
  });

  const { mutate: updateMutation, isPending } = useMutation<
    any,
    AxiosError,
    JabatanFungsionalPayload
  >({
    mutationFn: (data) => putReferensiServices.jabatanFungsional(id!, data),
    onSuccess: () => {
      toast.success("Data berhasil diperbarui");
      queryClient.invalidateQueries({
        queryKey: ["jabatan-fungsional-referensi"],
      });
      navigate("/admin/referensi/kepegawaian/jabatan-fungsional");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Gagal memperbarui data");
    },
  });

  const handleSubmitData = (values: FungsionalSchema) => {
    if (!id) return toast.error("ID Jabatan tidak ditemukan!");
    const payload: JabatanFungsionalPayload = {
      ...values,
      jabatan_akademik_id: values.jabatan_akademik_id,
      pangkat_id: values.pangkat_id,
      usia_pensiun: parseInt(values.usia_pensiun, 10),
    };
    updateMutation(payload);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmitData)}>
        <CustomCard
          actions={
            <div className="w-full flex flex-col gap-4 xl:flex-row justify-between xl:items-center">
              <div>
                <SearchInput />
              </div>
              <div className="w-full xl:w-auto flex flex-col xl:flex-row justify-end gap-2">
                <Link to="/admin/referensi/kepegawaian/jabatan-fungsional">
                  <Button type="button" variant="secondary" className="w-full">
                    <IoIosArrowBack className="mr-2" /> Kembali ke Daftar
                  </Button>
                </Link>
                <Button
                  type="submit"
                  className="bg-[#3ABC67] hover:bg-[#329C59] text-white"
                  disabled={isPending}
                >
                  <IoSaveSharp className="mr-2" />
                  {isPending ? "Menyimpan..." : "Simpan"}
                </Button>
              </div>
            </div>
          }
        >
          <div className="flex flex-col sm:grid sm:grid-rows-5 gap-5 sm:gap-y-0 sm:gap-x-4 grid-flow-col sm:items-center">
            <FormFieldInput
              form={form}
              label="Kode"
              name="kode"
              required
              labelStyle="text-[#3F6FA9]"
            />
            <FormFieldInput
              form={form}
              label="Nama Jabatan Fungsional"
              name="nama_jabatan_fungsional"
              required
              labelStyle="text-[#3F6FA9]"
            />
            <FormFieldInput
              form={form}
              label="Kode Jabatan Akademik"
              name="kode_jabatan_akademik"
              required
              labelStyle="text-[#3F6FA9]"
            />
            <InfiniteScrollSelect
              form={form}
              label="Jabatan Akademik"
              name="jabatan_akademik_id"
              labelStyle="text-[#3F6FA9]"
              placeholder="--Pilih Jabatan Akademik--"
              required
              queryKey="jab-akademik-select-referensi"
              queryFn={adminServices.getJabatanAkademik}
              itemValue="id"
              itemLabel="jabatan_akademik"
              initialSelectedItem={initialData?.jabatan_akademik || null}
            />
            <InfiniteScrollSelect
              form={form}
              label="Golongan Pangkat"
              name="pangkat_id"
              labelStyle="text-[#3F6FA9]"
              placeholder="--Pilih Golongan Pangkat--"
              required
              queryKey="pangkat-select-referensi"
              queryFn={adminServices.getMasterPangkatReferensi}
              itemValue="id"
              itemLabel="nama_golongan"
              initialSelectedItem={initialData?.pangkat || null}
            />
            <InfiniteScrollSelect
              form={form}
              label="Pangkat"
              name="pangkat"
              labelStyle="text-[#3F6FA9]"
              placeholder="--Pilih Pangkat--"
              required
              queryKey="pangkat-select-referensi-pangkat"
              queryFn={adminServices.getMasterPangkatReferensi}
              itemValue="pangkat"
              itemLabel="pangkat"
              initialSelectedItem={initialData?.pangkat || null}
            />
            <FormFieldInput
              form={form}
              label="Angka Kredit"
              name="angka_kredit"
              required
              labelStyle="text-[#3F6FA9]"
            />
            <FormFieldInput
              form={form}
              label="Usia Pensiun"
              name="usia_pensiun"
              required
              labelStyle="text-[#3F6FA9]"
            />
            <FormFieldInput
              form={form}
              label="Keterangan"
              name="keterangan"
              type="textarea"
              labelStyle="text-[#3F6FA9]"
            />
          </div>
        </CustomCard>
      </form>
    </Form>
  );
};

// --- Page Component ---
const EditJabatanFungsionalReferensi = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["jabatan-fungsional-referensi", id],
    queryFn: async () => {
      if (!id) return null;
      const response = await adminServices.getJabatanFungsionalSpesifik(id);
      console.log(response.data);
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
        Gagal memuat data. Silakan coba lagi.
      </div>
    );
  }

  if (!data) {
    return <div className="mt-10 text-center">Data tidak ditemukan.</div>;
  }

  return (
    <div className="mt-10 mb-20">
      <Title
        title="Jabatan Fungsional"
        subTitle="Edit Detail Jabatan Fungsional"
      />
      <JabatanFungsionalForm initialData={data} />
    </div>
  );
};

export default EditJabatanFungsionalReferensi;
