import { Link, useNavigate } from "react-router-dom";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Descendant } from "slate";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import Title from "@/components/blocks/Title";
import CustomCard from "@/components/blocks/Card";
import { Checkbox } from "@/components/ui/checkbox";
import { IoSaveSharp, IoTrashBin } from "react-icons/io5";
import { RichTextEditor } from "@/components/blocks/RichTextEditor/RichtextEditor";
import { IoIosArrowBack } from "react-icons/io";
import { FormFieldInputFile } from "@/components/blocks/CustomFormInputFile/CustomFormInputFile";
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput";
import { Label } from "@/components/ui/label";
import { FaPlus } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import adminServices from "@/services/admin.services";
import { InfiniteScrollSelect } from "@/components/blocks/InfiniteScrollSelect/InfiniteScrollSelect";
import potsReferensiServices from "@/services/create.admin.referensi";
import { toast } from "sonner";

// --- Konstanta ---
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

// --- Skema Validasi Zod ---
const beritaSchema = z.object({
  unit_kerja_id: z
    .array(z.object({ id: z.string().min(1, "Unit kerja harus dipilih.") }))
    .min(1, "Minimal ada satu unit kerja."),
  judul: z.string().min(3, "Judul berita minimal 3 karakter."),
  konten: z.any().refine(
    (value) => {
      if (!value || value.length === 0) return false;
      const firstNode = value[0];
      return !(
        value.length === 1 &&
        firstNode.children.length === 1 &&
        firstNode.children[0].text === ""
      );
    },
    { message: "Isi berita tidak boleh kosong." }
  ),
  tgl_posting: z.string().min(1, "Tanggal posting harus diisi."),
  tgl_expired: z.string().min(1, "Tanggal expired harus diisi."),
  prioritas: z.boolean().default(false),
  gambar_berita: z
    .any()
    .optional()
    .refine(
      (file: File) => !file || file.size <= MAX_FILE_SIZE,
      `Ukuran gambar maksimal 2MB.`
    )
    .refine(
      (file: File) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Format gambar harus .jpg, .jpeg, .png, atau .webp."
    ),
  file_berita: z
    .any()
    .optional()
    .refine(
      (file: File) => !file || file.size <= MAX_FILE_SIZE,
      `Ukuran file maksimal 2MB.`
    ),
  jabatan_akademik_id: z
    .array(z.object({ id: z.string().min(1, "Penerima harus dipilih.") }))
    .min(1, "Minimal ada satu penerima berita."),
});

export type BeritaFormValues = z.infer<typeof beritaSchema>;

const initialSlateValue: Descendant[] = [
  { type: "paragraph", align: "left", children: [{ text: "" }] },
];

const DetailBerita = () => {
  const navigate = useNavigate();

  const form = useForm<BeritaFormValues>({
    resolver: zodResolver(beritaSchema),
    defaultValues: {
      unit_kerja_id: [{ id: "" }],
      judul: "",
      konten: initialSlateValue,
      tgl_posting: new Date().toISOString().split("T")[0],
      tgl_expired: "",
      prioritas: false,
      jabatan_akademik_id: [{ id: "" }],
    },
  });

  const { mutate: postData } = useMutation({
    mutationFn: (data: FormData) =>
      potsReferensiServices.beritaOperasional(data),
    onSuccess: () => {
      form.reset();
      toast.success("Berhasil menambahkan data");
      navigate("/admin/operasional/berita");
    },
    onError: (error) => {
      toast.error(`Gagal menambahkan data: ${error.message}`);
    },
  });

  // Field Array untuk Unit Kerja
  const { fields: unitKerjaFields, remove: removeUnitKerja } = useFieldArray({
    control: form.control,
    name: "unit_kerja_id",
  });

  // Field Array untuk Jabatan Akademik (Penerima)
  const {
    fields: jabatanFields,
    append: appendJabatan,
    remove: removeJabatan,
  } = useFieldArray({
    control: form.control,
    name: "jabatan_akademik_id",
  });

  // Fungsi untuk handle submit
  const handleSubmitData = (values: BeritaFormValues) => {
    const formData = new FormData();

    // Append data ke FormData
    values.unit_kerja_id.forEach((unit) => {
      formData.append("unit_kerja_id[]", unit.id);
    });
    formData.append("judul", values.judul);
    formData.append("konten", JSON.stringify(values.konten));
    formData.append("tgl_posting", values.tgl_posting);
    formData.append("tgl_expired", values.tgl_expired);
    formData.append("prioritas", values.prioritas ? "1" : "0");

    if (values.gambar_berita) {
      formData.append("gambar_berita", values.gambar_berita);
    }
    if (values.file_berita) {
      formData.append("file_berita", values.file_berita);
    }

    values.jabatan_akademik_id.forEach((jabatan) => {
      formData.append("jabatan_akademik_id[]", jabatan.id);
    });

    postData(formData);
  };

  return (
    <div className="mt-10 mb-20">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmitData)}
          className="space-y-6 mt-6"
        >
          <div className="flex justify-between items-center">
            <Title title="Berita" subTitle="Detail Berita" />
            <div className="flex justify-end gap-4">
              <Link to="/admin/operasional/berita">
                <Button type="button" variant="outline">
                  <IoIosArrowBack className="mr-2" /> Kembali
                </Button>
              </Link>
              <Button
                type="submit"
                className="bg-green-light-uika hover:bg-[#329C59]"
              >
                <IoSaveSharp className="mr-2" /> Simpan
              </Button>
            </div>
          </div>

          <CustomCard>
            <div className="space-y-5">
              {/* --- Field Unit Kerja (Dinamis) --- */}
              <div className="flex flex-col md:flex-row">
                <Label className="w-full md:mt-2">
                  Unit<span className="text-red-500">*</span>
                </Label>
                <div className="w-full">
                  <div className="space-y-2">
                    {unitKerjaFields.map((field, index) => (
                      <div key={field.id} className="flex items-start gap-2">
                        <div className="flex-1">
                          <InfiniteScrollSelect
                            form={form}
                            name={`unit_kerja_id.${index}.id`}
                            placeholder="--Pilih Unit--"
                            queryKey="unit-kerja-infinite"
                            queryFn={(page) => adminServices.getUnitKerja(page)}
                            itemValue="id"
                            itemLabel="nama_unit"
                          />
                        </div>
                        {unitKerjaFields.length > 1 && (
                          <Button
                            type="button"
                            size="icon"
                            variant="destructive"
                            onClick={() => removeUnitKerja(index)}
                          >
                            <IoTrashBin />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <FormFieldInput
                form={form}
                name="judul"
                label="Judul"
                required={true}
              />

              <FormField
                control={form.control}
                name="konten"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Isi Berita<span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <RichTextEditor
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormFieldInput
                form={form}
                label="Tgl Posting"
                name="tgl_posting"
                type="date"
                required
              />
              <FormFieldInput
                form={form}
                label="Tgl Expired"
                name="tgl_expired"
                type="date"
                required
              />
              <FormFieldInputFile
                label="Gambar Berita"
                name="gambar_berita"
                accept="image/*"
              />
              <FormFieldInputFile label="File Berita" name="file_berita" />

              {/* --- Field Penerima Berita (Dinamis) --- */}
              <div className="flex flex-col md:flex-row">
                <Label className="w-full md:mt-2">
                  Penerima Berita<span className="text-red-500">*</span>
                </Label>
                <div className="w-full">
                  <div className="space-y-2">
                    {jabatanFields.map((field, index) => (
                      <div key={field.id} className="flex items-start gap-2">
                        <div className="flex-1">
                          <InfiniteScrollSelect
                            form={form}
                            name={`jabatan_akademik_id.${index}.id`}
                            placeholder="--Pilih Penerima--"
                            queryKey="jabatan-akademik-id-infinite"
                            queryFn={(page) =>
                              adminServices.getJabatanAkademik(page)
                            }
                            itemValue="id"
                            itemLabel="jabatan_akademik"
                          />
                        </div>
                        {jabatanFields.length > 1 && (
                          <Button
                            type="button"
                            size="icon"
                            variant="destructive"
                            onClick={() => removeJabatan(index)}
                          >
                            <IoTrashBin />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full mt-2"
                    onClick={() => appendJabatan({ id: "" })}
                  >
                    <FaPlus className="mr-2 h-4 w-4" /> Tambah Penerima
                  </Button>
                  <p className="text-sm font-medium text-destructive mt-2">
                    {form.formState.errors.jabatan_akademik_id?.message}
                  </p>
                </div>
              </div>

              {/* --- Field Prioritas --- */}
              <FormField
                control={form.control}
                name="prioritas"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Jadikan Prioritas</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </CustomCard>
        </form>
      </Form>
    </div>
  );
};

export default DetailBerita;
