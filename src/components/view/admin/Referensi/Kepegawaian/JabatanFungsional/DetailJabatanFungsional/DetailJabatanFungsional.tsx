import CustomCard from "@/components/blocks/Card";
import Title from "@/components/blocks/Title";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { IoSaveSharp } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";
import { useForm } from "react-hook-form";
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput";
import { Link, useNavigate } from "react-router-dom";
import adminServices from "@/services/admin.services";
import { InfiniteScrollSelect } from "@/components/blocks/InfiniteScrollSelect/InfiniteScrollSelect";
import { AxiosError } from "axios";
import potsReferensiServices from "@/services/create.admin.referensi";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Zod validation schema for the form.
// This validates the raw input from the form fields, which are typically strings.
const fungsionalSchema = z.object({
  kode: z.string().min(1, { message: "Kode Jabatan is required" }),
  nama_jabatan_fungsional: z
    .string()
    .min(1, { message: "Nama Jabatan Fungsional is required" }),
  jabatan_akademik_id: z
    .string()
    .min(1, { message: "Jabatan Akademik is required" }),
  pangkat_id: z.string().min(1, { message: "Golongan Pangkat is required" }),
  angka_kredit: z.string().min(1, { message: "Angka Kredit is required" }),
  usia_pensiun: z.string().min(1, { message: "Usia Pensiun is required" }),
  keterangan: z.string().optional(),
});

// Infer the TypeScript type from the Zod schema for form values.
type FungsionalSchema = z.infer<typeof fungsionalSchema>;

// Define the type for the payload that will be sent to the API.
// This matches the structure seen in your Postman request.
type JabatanFungsionalPayload = {
  kode: string;
  nama_jabatan_fungsional: string;
  jabatan_akademik_id: number;
  pangkat_id: number;
  angka_kredit: string; // This was a string in the Postman example "25"
  usia_pensiun: number;
  keterangan?: string;
  // NOTE: Your Postman screenshot includes 'kode_jabatan_akademik' and 'pangkat'.
  // If the API requires them, you must add them to this type
  // and the payload object below.
  kode_jabatan_akademik?: string;
  pangkat?: string;
};

const DetailJabatanFungsional = () => {
  const navigate = useNavigate();

  // Initialize react-hook-form with the zod resolver.
  const form = useForm<FungsionalSchema>({
    resolver: zodResolver(fungsionalSchema),
    defaultValues: {
      kode: "",
      nama_jabatan_fungsional: "",
      jabatan_akademik_id: "",
      pangkat_id: "",
      angka_kredit: "",
      usia_pensiun: "",
      keterangan: "",
    },
  });

  // Setup the mutation hook. Note the type for the data passed to the
  // mutation function is now `JabatanFungsionalPayload`.
  const { mutate: postAdd, isPending } = useMutation<
    any,
    AxiosError,
    JabatanFungsionalPayload // Use the correct payload type here
  >({
    mutationFn: (data) => potsReferensiServices.jabatanFungsional(data),
    onSuccess: () => {
      form.reset();
      toast.success("Data berhasil ditambahkan");
      navigate("/admin/referensi/kepegawaian/jabatan-fungsional");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Gagal menambahkan data");
    },
  });

  // This function now transforms the form data to match the API payload.
  const handleSubmitData = (values: FungsionalSchema) => {
    // Create the payload object with the correct data types.
    const payload: JabatanFungsionalPayload = {
      ...values, // Spread the existing string values
      jabatan_akademik_id: parseInt(values.jabatan_akademik_id, 10), // Convert to number
      pangkat_id: parseInt(values.pangkat_id, 10), // Convert to number
      usia_pensiun: parseInt(values.usia_pensiun, 10), // Convert to number
      // angka_kredit remains a string as per the Postman example.
    };

    // IMPORTANT: The Postman image shows "kode_jabatan_akademik" and "pangkat".
    // If you need to send these, you must get them from your form state
    // (likely from the selected item in InfiniteScrollSelect) and add them
    // to the payload object here. For example:
    // payload.kode_jabatan_akademik = "JB"; // Get actual value
    // payload.pangkat = "I/a"; // Get actual value

    postAdd(payload);
  };

  return (
    <div className="mt-10 mb-20">
      <Title title="Jabatan Fungsional" subTitle="Detail Jabatan Fungsional" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmitData)}>
          <CustomCard
            actions={
              <div className="flex flex-col sm:flex-row justify-end gap-4">
                <Link to="/admin/referensi/kepegawaian/jabatan-fungsional">
                  <Button
                    type="button"
                    className="cursor-pointer bg-green-light-uika hover:bg-[#329C59] text-xs sm:text-sm w-full sm:w-auto"
                  >
                    <IoIosArrowBack /> Kembali
                  </Button>
                </Link>
                <Button
                  type="submit"
                  disabled={isPending}
                  className="text-xs sm:text-sm cursor-pointer bg-green-light-uika hover:bg-[#329C59] w-full md:w-auto"
                >
                  <IoSaveSharp /> {isPending ? "Menyimpan..." : "Simpan"}
                </Button>
              </div>
            }
          >
            <div className="flex flex-col sm:grid sm:grid-rows-5 gap-5 sm:gap-y-0 sm:gap-x-4 grid-flow-col sm:items-center gap-x-4">
              <FormFieldInput
                form={form}
                label="Kode Jabatan"
                name="kode"
                labelStyle="text-[#3F6FA9]"
                required={true}
              />
              <FormFieldInput
                form={form}
                label="Nama Jabatan Fungsional"
                name="nama_jabatan_fungsional"
                labelStyle="text-[#3F6FA9]"
                required={true}
              />
              <InfiniteScrollSelect
                form={form}
                label="Jabatan Akademik"
                name="jabatan_akademik_id"
                labelStyle="text-[#3F6FA9]"
                placeholder="--Pilih Jabatan Akademik--"
                required={true}
                queryKey="jab-akademik-select-referensi"
                queryFn={adminServices.getJabatanAkademik}
                itemValue="id"
                itemLabel="jabatan_akademik"
              />
              <InfiniteScrollSelect
                form={form}
                label="Golongan Pangkat"
                name="pangkat_id"
                labelStyle="text-[#3F6FA9]"
                placeholder="--Pilih Golongan Pangkat--"
                required={true}
                queryKey="pangkat-select-referensi"
                queryFn={adminServices.getMasterPangkatReferensi}
                itemValue="id"
                itemLabel="nama_golongan"
              />
              <FormFieldInput
                form={form}
                label="Angka Kredit"
                name="angka_kredit"
                labelStyle="text-[#3F6FA9]"
                required={true}
              />
              <FormFieldInput
                form={form}
                label="Usia Pensiun"
                name="usia_pensiun"
                labelStyle="text-[#3F6FA9]"
                required={true}
              />
              <FormFieldInput
                form={form}
                label="Keterangan"
                name="keterangan"
                labelStyle="text-[#3F6FA9]"
                required={false}
                type="textarea"
              />
            </div>
          </CustomCard>
        </form>
      </Form>
    </div>
  );
};

export default DetailJabatanFungsional;
