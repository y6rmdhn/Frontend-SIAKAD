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
    },
  });

  // add data
  const { mutate: postAdd } = useMutation({
    mutationFn: (data: UnitKerjaSchema) =>
      potsReferensiServices.unitKerja(data),
    onSuccess: () => {
      form.reset();
      toast.success("Data berhasil ditambahkan");
      navigate("/admin/referensi/kepegawaian/unit-kerja");
    },
  });

  const {
    data: dataParentUnit,
    fetchNextPage,
    hasNextPage,
    isLoading,
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
      .map((unit) => ({
        label: unit.nama_unit,
        value: unit.kode_unit,
      }));
  }, [dataParentUnit]);

  console.log(parentUnitOptions);

  const handleSubmitDetailUnitKerja = (values: UnitKerjaSchema) => {
    console.log("Data yang dikirim ke API:", values);

    postAdd(values);
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
              {/* <FormFieldInput
                form={form}
                label="Nama Unit(EN)"
                name="namaUnitEn"
                labelStyle="text-[#3F6FA9]"
                required={false}
              /> */}
              {/* <FormFieldInput
                form={form}
                label="Nama Singkat"
                name="namaSingkat"
                labelStyle="text-[#3F6FA9]"
                required={false}
              /> */}
              <FormFieldSelect
                form={form}
                label="Parent Unit"
                name="parent_unit_id"
                labelStyle="text-[#3F6FA9]"
                options={parentUnitOptions}
                placeholder="--Pilih Parent Unit--"
                required={false}
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
                required={false}
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
                required={false}
              />
              <FormFieldInput
                form={form}
                label="Alamat"
                name="alamat"
                labelStyle="text-[#3F6FA9]"
                required={false}
                type="textarea"
              />
              <FormFieldInput
                form={form}
                label="Telpon"
                name="telepon"
                labelStyle="text-[#3F6FA9]"
                required={false}
              />
              <FormFieldInput
                form={form}
                label="Website"
                name="website"
                labelStyle="text-[#3F6FA9]"
                required={false}
              />
              <FormFieldInput
                form={form}
                label="Alamat Email"
                name="alamat_email"
                labelStyle="text-[#3F6FA9]"
                required={false}
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
                  {
                    label: "Tidak Terakreditasi/ Kadaluwarsa",
                    value: "8",
                  },
                ]}
                placeholder="-Pilih Akreditasi-"
                required={false}
              />
              <FormFieldInput
                form={form}
                label="No.SK Akreditasi"
                name="no_sk_akreditasi"
                labelStyle="text-[#3F6FA9]"
                required={false}
              />
              <FormFieldInput
                form={form}
                label="Tanggal Akreditasi"
                name="tanggal_akreditasi"
                labelStyle="text-[#3F6FA9]"
                required={false}
                type="date"
              />
              <FormFieldInput
                form={form}
                label="No.SK Pendirian"
                name="no_sk_pendirian"
                labelStyle="text-[#3F6FA9]"
                required={false}
              />
              <FormFieldInput
                form={form}
                label="Tanggal Sk Pendirian"
                name="tanggal_sk_pendirian"
                labelStyle="text-[#3F6FA9]"
                required={false}
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
                required={false}
              />
              {/* <FormFieldInput
                form={form}
                label="Akademik"
                name="akademik"
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
              /> */}
            </div>
          </CustomCard>
        </form>
      </Form>
    </div>
  );
};

export default DetailUnitKerja;
