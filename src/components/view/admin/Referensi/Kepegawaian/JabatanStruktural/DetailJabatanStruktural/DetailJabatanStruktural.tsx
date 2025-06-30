import CustomCard from "@/components/blocks/Card";
import Title from "@/components/blocks/Title";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { IoSaveSharp } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";
import { useForm } from "react-hook-form";
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput";
import { Link, useNavigate } from "react-router-dom";
import SearchInput from "@/components/blocks/SearchInput";
import potsReferensiServices from "@/services/create.admin.referensi";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import adminServices from "@/services/admin.services";
import { InfiniteScrollSelect } from "@/components/blocks/InfiniteScrollSelect/InfiniteScrollSelect";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const jabatanStrukturalSchema = z.object({
  kode: z.string().min(1, { message: "Kode is required" }),
  jenis_jabatan_struktural_id: z.string().optional(),
  singkatan: z.string().optional(),
  parent_jabatan: z.string().optional(),
  unit_kerja_id: z.string().min(1, { message: "Unit Kerja is required" }),
  alamat_email: z
    .string()
    .email({ message: "Invalid email address" })
    .optional()
    .or(z.literal("")),
  eselon_id: z.string().min(1, { message: "Eselon is required" }),
  pangkat_id: z.string().min(1, { message: "pangkat is required" }),
  beban_sks: z.string().optional(),
  is_pimpinan: z.boolean().optional(),
  aktif: z.boolean().optional(),
});

type JabatanStrukturalFormData = z.infer<typeof jabatanStrukturalSchema>;

const DetailJabatanStruktural = () => {
  const navigate = useNavigate();
  const form = useForm<JabatanStrukturalFormData>({
    resolver: zodResolver(jabatanStrukturalSchema),
    defaultValues: {
      kode: "",
      jenis_jabatan_struktural_id: "",
      singkatan: "",
      parent_jabatan: "",
      unit_kerja_id: "",
      alamat_email: "",
      eselon_id: "",
      pangkat_id: "",
      beban_sks: "",
      is_pimpinan: false,
      aktif: false,
    },
  });

  const { mutate: postAdd, isPending } = useMutation<
    any,
    AxiosError,
    JabatanStrukturalFormData
  >({
    mutationFn: (data) => potsReferensiServices.jabatanStruktural(data),
    onSuccess: () => {
      form.reset();
      toast.success("Data berhasil ditambahkan");
      navigate("/admin/referensi/kepegawaian/jabatan-struktural");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Gagal menambahkan data");
    },
  });

  const handleSubmitData = (values: JabatanStrukturalFormData) => {
    postAdd(values);
  };

  return (
    <div className="mt-10 mb-20">
      <Title title="Jabatan Struktural" subTitle="Detail Jabatan Struktural" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmitData)}>
          <CustomCard
            actions={
              <div className="flex flex-col sm:flex-row justify-between gap-4 ">
                <SearchInput />

                <div className="w-full sm:w-auto flex gap-2">
                  <div className="w-full sm:w-auto">
                    <Link to="/admin/referensi/kepegawaian/jabatan-struktural">
                      <Button
                        type="button"
                        className="sm:w-35 text-xs sm:text-sm sm:w-autocursor-pointer bg-green-light-uika hover:bg-[#329C59] w-full md:w-auto"
                      >
                        <IoIosArrowBack /> Kembali Ke Daftar
                      </Button>
                    </Link>
                  </div>
                  <div className="w-full sm:w-auto">
                    <Button
                      type="submit"
                      disabled={isPending}
                      className="text-xs sm:text-sm cursor-pointer bg-green-light-uika hover:bg-[#329C59] w-full md:w-auto"
                    >
                      <IoSaveSharp /> {isPending ? "Menyimpan..." : "Simpan"}
                    </Button>
                  </div>
                </div>
              </div>
            }
          >
            <div className="grid grid-rows-7 md:grid-flow-col items-center gap-y-2 gap-x-4 gap-y-4 md:gap-y-4">
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
                required={false}
                queryKey="jabatan-struktural-select-referensi"
                queryFn={adminServices.getJenisJabatanStruktural}
                itemValue="id"
                itemLabel="jenis_jabatan_struktural"
              />
              <FormFieldInput
                form={form}
                label="Singkatan"
                name="singkatan"
                labelStyle="text-[#3F6FA9]"
                required={false}
              />
              <InfiniteScrollSelect
                form={form}
                label="Parent Jabatan Struktural"
                name="parent_jabatan"
                labelStyle="text-[#3F6FA9]"
                placeholder="--Pilih Parent Jabatan Struktural--"
                required={false}
                queryKey="parent-jabatan-struktural-select-referensi"
                queryFn={(page) =>
                  adminServices.getJabatanStrukturalReferensi(page, "")
                }
                itemValue="kode"
                itemLabel="singkatan"
              />
              <InfiniteScrollSelect
                form={form}
                label="Unit Kerja"
                name="unit_kerja_id"
                labelStyle="text-[#3F6FA9]"
                placeholder="--Pilih Unit Kerja--"
                required={true}
                queryKey="unit-kerja-referensi-select"
                queryFn={adminServices.getUnitKerja}
                itemValue="id"
                itemLabel="nama_unit"
              />
              <FormFieldInput
                form={form}
                label="Alamat Email"
                name="alamat_email"
                labelStyle="text-[#3F6FA9]"
                required={false}
              />
              <InfiniteScrollSelect
                form={form}
                label="Eselon"
                name="eselon_id"
                labelStyle="text-[#3F6FA9]"
                placeholder="--Pilih Eselon--"
                required={true}
                queryKey="eselon-select-referensi"
                queryFn={adminServices.getEselonReferensi}
                itemValue="id"
                itemLabel="nama_eselon"
              />
              <InfiniteScrollSelect
                form={form}
                label="Pangkat"
                name="pangkat_id"
                labelStyle="text-[#3F6FA9]"
                placeholder="--Pilih Pangkat--"
                required={true}
                queryKey="pangkat-select-referensi"
                queryFn={adminServices.getMasterPangkatReferensi}
                itemValue="id"
                itemLabel="nama_golongan"
              />
              <FormFieldInput
                form={form}
                label="Beban Sks"
                name="beban_sks"
                labelStyle="text-[#3F6FA9]"
                required={false}
              />
              <FormFieldInput
                form={form}
                label="is Pimpinan"
                name="is_pimpinan"
                labelStyle="text-[#3F6FA9]"
                required={false}
                type="checkbox"
              />
              <FormFieldInput
                form={form}
                label="Aktif"
                name="aktif"
                labelStyle="text-[#3F6FA9]"
                required={false}
                type="checkbox"
              />
            </div>
          </CustomCard>
        </form>
      </Form>
    </div>
  );
};

export default DetailJabatanStruktural;
