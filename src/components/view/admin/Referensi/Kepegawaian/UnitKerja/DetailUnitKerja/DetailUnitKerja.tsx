import CustomCard from "@/components/blocks/Card";
import Title from "@/components/blocks/Title";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { IoSaveSharp } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";
import { useForm } from "react-hook-form";
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput";
import { FormFieldSelect } from "@/components/blocks/CustomFormSelect/CustomFormSelect";
import { Link, useNavigate } from "react-router-dom";
import SearchInput from "@/components/blocks/SearchInput";
import { useMutation } from "@tanstack/react-query";
import potsReferensiServices from "@/services/create.admin.referensi";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import { useAllUnitKerja } from "@/hooks/useAllUnitKerja";
import { AxiosError } from "axios";

// --- START DEFINISI TIPE ---

// Tipe data yang diharapkan oleh API service, sesuai yang Anda berikan
interface UnitKerja {
  kode_unit: string;
  nama_unit: string;
  jenis_unit_id?: number;
  tk_pendidikan_id: number;
  akreditasi_id: number;
  parent_unit_id?: string;
  alamat?: string;
  telepon?: string;
  website?: string;
  alamat_email?: string;
  no_sk_akreditasi?: string;
  tanggal_akreditasi?: string;
  no_sk_pendirian?: string;
  tanggal_sk_pendirian?: string;
  gedung?: string;
}

// Tipe data dari hook useAllUnitKerja
interface UnitKerjaFromHook {
  id: number;
  nama_unit: string;
  parent_unit_id: string | null;
  kode_unit: string;
}

const unitKerjaSchema = z.object({
  kode_unit: z
      .string({ required_error: "Kode Unit wajib diisi." })
      .min(1, "Kode Unit tidak boleh kosong."),
  nama_unit: z
      .string({ required_error: "Nama Unit wajib diisi." })
      .min(1, "Nama Unit tidak boleh kosong."),
  jenis_unit_id: z.coerce.number().optional(),
  tk_pendidikan_id: z.coerce.number().optional(),
  akreditasi_id: z.coerce.number().optional(),
  parent_unit_id: z.string().optional(),
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

// --- END DEFINISI TIPE ---

const DetailUnitKerja = () => {
  const navigate = useNavigate();
  const form = useForm<UnitKerjaSchema>({
    resolver: zodResolver(unitKerjaSchema),
    defaultValues: {
      kode_unit: "",
      nama_unit: "",
      parent_unit_id: "",
      alamat: "",
      telepon: "",
      website: "",
      alamat_email: "",
      no_sk_akreditasi: "",
      no_sk_pendirian: "",
      gedung: "",
      // default untuk field number
      jenis_unit_id: undefined,
      tk_pendidikan_id: undefined,
      akreditasi_id: undefined,
    },
  });

  // FIX: Menggunakan tipe data 'UnitKerja' yang lebih ketat untuk mutasi
  const { mutate: postAdd } = useMutation<any, AxiosError, UnitKerja>({
    mutationFn: (data) => potsReferensiServices.unitKerja(data),
    onSuccess: () => {
      form.reset();
      toast.success("Data berhasil ditambahkan");
      navigate("/admin/referensi/kepegawaian/unit-kerja");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Gagal menambahkan data");
    }
  });

  const {
    data: dataParentUnit,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useAllUnitKerja();

  useEffect(() => {
    if (hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetching, fetchNextPage]);

  const parentUnitOptions = useMemo(() => {
    if (!dataParentUnit) {
      return [];
    }
    return dataParentUnit.pages
        .flatMap((page) => page.data.data)
        .filter(
            (unit) =>
                unit.parent_unit_id === "041001" || unit.parent_unit_id === null
        )
        .map((unit: UnitKerjaFromHook) => ({
          label: unit.nama_unit,
          value: unit.kode_unit,
        }));
  }, [dataParentUnit]);

  // FIX: Mengubah data form agar sesuai dengan tipe yang diharapkan API
  const handleSubmitDetailUnitKerja = (values: UnitKerjaSchema) => {
    const payload: UnitKerja = {
      ...values,
      // Memberikan nilai default 0 jika field yang WAJIB tidak diisi
      tk_pendidikan_id: values.tk_pendidikan_id ?? 0,
      akreditasi_id: values.akreditasi_id ?? 0,
      // jenis_unit_id bisa undefined karena opsional di interface UnitKerja
      jenis_unit_id: values.jenis_unit_id,
    };

    console.log("Data yang dikirim ke API:", payload);
    postAdd(payload);
  };

  return (
      <div className="mt-10 mb-20">
        <Title title="Unit Kerja" subTitle="Detail Unit kerja" />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmitDetailUnitKerja)}>
            <CustomCard
                actions={
                  <div className="flex flex-col sm:flex-row justify-between gap-4 ">
                    <SearchInput />
                    <div className="w-full sm:w-auto flex gap-2">
                      <div className="w-full sm:w-auto">
                        <Link to="/admin/referensi/kepegawaian/unit-kerja">
                          <Button
                              type="button"
                              className="cursor-pointer bg-green-light-uika hover:bg-[#329C59] w-full md:w-auto"
                          >
                            <IoIosArrowBack /> Kembali Ke Daftar
                          </Button>
                        </Link>
                      </div>
                      <div className="w-full sm:w-auto">
                        <Button
                            type="submit"
                            className="cursor-pointer bg-green-light-uika hover:bg-[#329C59] w-full md:w-auto"
                        >
                          <IoSaveSharp /> Simpan
                        </Button>
                      </div>
                    </div>
                  </div>
                }
            >
              <div className="grid grid-rows-10 md:grid-flow-col items-center gap-x-4 gap-y-4 md:gap-y-0">
                <FormFieldInput
                    form={form}
                    label="Kode Unit"
                    name="kode_unit"
                    labelStyle="text-[#3F6FA9]"
                    required={true}
                />
                <FormFieldInput
                    form={form}
                    label="Nama Unit"
                    name="nama_unit"
                    labelStyle="text-[#3F6FA9]"
                    required={true}
                />
                <FormFieldSelect
                    form={form}
                    label="Parent Unit"
                    name="parent_unit_id"
                    labelStyle="text-[#3F6FA9]"
                    options={parentUnitOptions}
                    placeholder="--Pilih Parent Unit--"
                />
                <FormFieldSelect
                    form={form}
                    label="Jenis Unit"
                    name="jenis_unit_id"
                    labelStyle="text-[#3F6FA9]"
                    options={[
                      { label: "Universitas", value: "1" },
                      { label: "Fakultas", value: "2" },
                      { label: "Jurusan", value: "3" },
                      { label: "Program Studi", value: "4" },
                    ]}
                    placeholder="--Pilih Jenis Unit--"
                />
                <FormFieldSelect
                    form={form}
                    label="TK.Pendidikan"
                    name="tk_pendidikan_id"
                    labelStyle="text-[#3F6FA9]"
                    options={[
                      { label: "D3 - Diploma 3", value: "1" },
                      { label: "D4 - Diploma 4", value: "2" },
                      { label: "S1 - Strata 1", value: "3" },
                      { label: "Prof - Profesi", value: "4" },
                      { label: "S2 - Strata 2", value: "5" },
                      { label: "S3 - Strata 3", value: "6" },
                    ]}
                    placeholder="--Pilih Tk.Pendidikan--"
                />
                <FormFieldInput
                    form={form}
                    label="Alamat"
                    name="alamat"
                    labelStyle="text-[#3F6FA9]"
                    type="textarea"
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
                      { label: "A", value: "1" },
                      { label: "B", value: "2" },
                      { label: "C", value: "3" },
                      { label: "Unggul", value: "4" },
                      { label: "Baik Sekali", value: "5" },
                      { label: "Baik", value: "6" },
                      { label: "Minimum", value: "7" },
                      { label: "Tidak Terakreditasi/ Kadaluwarsa", value: "8" },
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
                    labelStyle="text-[#3F6FA9]"
                    type="date"
                />
                <FormFieldInput
                    form={form}
                    label="No.SK Pendirian"
                    name="no_sk_pendirian"
                    labelStyle="text-[#3F6FA9]"
                />
                <FormFieldInput
                    form={form}
                    label="Tanggal Sk Pendirian"
                    name="tanggal_sk_pendirian"
                    labelStyle="text-[#3F6FA9]"
                    type="date"
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
      </div>
  );
};

export default DetailUnitKerja;
