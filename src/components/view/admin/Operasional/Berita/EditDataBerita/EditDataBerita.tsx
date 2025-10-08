import { Link, useNavigate, useParams } from "react-router-dom";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Descendant } from "slate";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react"; // Import React for useMemo
import { toast } from "sonner";
import { AxiosError } from "axios";

// Import Services
import adminServices from "@/services/admin.services";
import putReferensiServices from "@/services/put.admin.referensi"; // Service for PUT requests

// Import Components
import { Button } from "@/components/ui/button";
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
import { RichTextEditor } from "@/components/blocks/RichTextEditor/RichtextEditor";
import { FormFieldInputFile } from "@/components/blocks/CustomFormInputFile/CustomFormInputFile";
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput";
import { Label } from "@/components/ui/label";
import { InfiniteScrollSelect } from "@/components/blocks/InfiniteScrollSelect/InfiniteScrollSelect";
import { Skeleton } from "@/components/ui/skeleton";

// Import Icons
import { IoSaveSharp, IoTrashBin } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";
import { FaPlus } from "react-icons/fa";

// --- Constants ---
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

// --- Zod Validation Schema ---
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
      (file: File) =>
        !file || !(file instanceof File) || file.size <= MAX_FILE_SIZE,
      `Ukuran gambar maksimal 2MB.`
    )
    .refine(
      (file: File) =>
        !file ||
        !(file instanceof File) ||
        ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Format gambar harus .jpg, .jpeg, .png, atau .webp."
    ),
  file_berita: z
    .any()
    .optional()
    .refine(
      (file: File) =>
        !file || !(file instanceof File) || file.size <= MAX_FILE_SIZE,
      `Ukuran file maksimal 2MB.`
    ),
  jabatan_akademik_id: z
    .array(z.object({ id: z.string().min(1, "Penerima harus dipilih.") }))
    .min(1, "Minimal ada satu penerima berita."),
});

type BeritaFormValues = z.infer<typeof beritaSchema>;

// --- Helper Functions ---
const formatDateForInput = (dateStr?: string) => {
  if (!dateStr) return "";
  return dateStr.split("T")[0];
};

const initialSlateValue: Descendant[] = [
  { type: "paragraph", align: "left", children: [{ text: "" }] },
];

// --- Form Component ---
const BeritaForm = ({ initialData }: { initialData: any }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Memformat data awal menggunakan useMemo
  const formattedInitialData = React.useMemo(() => {
    if (!initialData) {
      return {
        unit_kerja_id: [{ id: "" }],
        judul: "",
        konten: initialSlateValue,
        tgl_posting: "",
        tgl_expired: "",
        prioritas: false,
        jabatan_akademik_id: [{ id: "" }],
        gambar_berita: null,
        file_berita: null,
      };
    }

    let parsedUnitKerjaIds = [];
    try {
      const ids = JSON.parse(initialData.unit_kerja_id || "[]");
      parsedUnitKerjaIds = ids.map((unitId: number | string) => ({
        id: String(unitId),
      }));
    } catch (e) {
      console.error("Failed to parse unit_kerja_id:", e);
    }

    let parsedKonten: Descendant[];
    try {
      parsedKonten = JSON.parse(initialData.konten);
    } catch {
      parsedKonten =
        typeof initialData.konten === "string"
          ? [
              {
                type: "paragraph",
                align: "left",
                children: [{ text: initialData.konten }],
              },
            ]
          : initialSlateValue;
    }

    return {
      ...initialData,
      unit_kerja_id:
        parsedUnitKerjaIds.length > 0 ? parsedUnitKerjaIds : [{ id: "" }],
      tgl_posting: formatDateForInput(initialData.tgl_posting),
      tgl_expired: formatDateForInput(initialData.tgl_expired),
      konten: parsedKonten,
      jabatan_akademik_id: initialData.jabatan_akademik?.map(
        (jabatan: any) => ({
          id: String(jabatan.id),
        })
      ) || [{ id: "" }],
      gambar_berita: initialData.gambar_berita,
      file_berita: initialData.file_berita,
    };
  }, [initialData]);

  const form = useForm<BeritaFormValues>({
    resolver: zodResolver(beritaSchema),
    defaultValues: formattedInitialData,
  });

  const { mutate: updateBerita, isPending } = useMutation({
    mutationFn: (payload: { id: string; data: FormData }) =>
      putReferensiServices.berita(payload.id, payload.data),
    onSuccess: () => {
      toast.success("Berhasil memperbarui data berita");
      queryClient.invalidateQueries({ queryKey: ["berita-operasional"] });
      navigate("/admin/operasional/berita");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error?.response?.data?.message || "Gagal memperbarui data");
    },
  });

  const { fields: unitKerjaFields, remove: removeUnitKerja } = useFieldArray({
    control: form.control,
    name: "unit_kerja_id",
  });

  const {
    fields: jabatanFields,
    append: appendJabatan,
    remove: removeJabatan,
  } = useFieldArray({
    control: form.control,
    name: "jabatan_akademik_id",
  });

  const handleSubmitData = (values: BeritaFormValues) => {
    if (!id) return;

    const formData = new FormData();
    formData.append("_method", "PUT");

    values.unit_kerja_id.forEach((unit) =>
      formData.append("unit_kerja_id[]", unit.id)
    );
    formData.append("judul", values.judul);
    formData.append("konten", JSON.stringify(values.konten));
    formData.append("tgl_posting", values.tgl_posting);
    formData.append("tgl_expired", values.tgl_expired);
    formData.append("prioritas", values.prioritas ? "1" : "0");

    if (values.gambar_berita instanceof File) {
      formData.append("gambar_berita", values.gambar_berita);
    }
    if (values.file_berita instanceof File) {
      formData.append("file_berita", values.file_berita);
    }

    values.jabatan_akademik_id.forEach((jabatan) =>
      formData.append("jabatan_akademik_id[]", jabatan.id)
    );

    updateBerita({ id, data: formData });
  };

  const onError = (errors: any) => {
    console.error(errors);
    toast.error("Terdapat kesalahan pada form, silakan periksa kembali");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmitData, onError)}
        className="space-y-6 mt-6"
      >
        <div className="flex justify-between items-center">
          <Title title="Berita" subTitle="Edit Data Berita" />
          <div className="flex justify-end gap-4">
            <Link to="/admin/operasional/berita">
              <Button type="button" variant="outline">
                <IoIosArrowBack className="mr-2" /> Kembali
              </Button>
            </Link>
            <Button
              type="submit"
              className="bg-green-light-uika hover:bg-[#329C59]"
              disabled={isPending}
            >
              <IoSaveSharp className="mr-2" />{" "}
              {isPending ? "Menyimpan..." : "Simpan Perubahan"}
            </Button>
          </div>
        </div>

        <CustomCard>
          <div className="space-y-5">
            <div className="flex flex-col md:flex-row">
              <Label className="w-full md:w-1/4 md:mt-2">
                Unit<span className="text-red-500">*</span>
              </Label>
              <div className="w-full">
                <div className="space-y-2">
                  {unitKerjaFields.map((field, index) => (
                    <div key={field.id} className="flex items-start gap-2">
                      <div className="flex-1">
                        <FormField
                          control={form.control}
                          name={`unit_kerja_id.${index}.id`}
                          render={({ field: formField }) => (
                            <InfiniteScrollSelect
                              form={form}
                              name={formField.name}
                              placeholder="--Pilih Unit--"
                              queryKey="unit-kerja-infinite"
                              queryFn={(page) =>
                                adminServices.getUnitKerja(page)
                              }
                              itemValue="id"
                              itemLabel="nama_unit"
                            />
                          )}
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
              labelStyle="w-70"
              form={form}
              name="judul"
              label="Judul"
              required
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
              labelStyle="w-70"
              label="Tgl Posting"
              name="tgl_posting"
              type="date"
              required
            />
            <FormFieldInput
              form={form}
              labelStyle="w-70"
              label="Tgl Expired"
              name="tgl_expired"
              type="date"
              required
            />

            <FormFieldInputFile
              label="Gambar Berita"
              name="gambar_berita"
              labelStyle="w-70"
              accept="image/*"
            />
            <FormFieldInputFile
              labelStyle="w-70"
              label="File Berita"
              name="file_berita"
            />

            <div className="flex flex-col md:flex-row">
              <Label className="w-full md:w-1/4 md:mt-2">
                Penerima Berita<span className="text-red-500">*</span>
              </Label>
              <div className="w-full">
                <div className="space-y-2">
                  {jabatanFields.map((field, index) => (
                    <div key={field.id} className="flex items-start gap-2">
                      <div className="flex-1">
                        <FormField
                          control={form.control}
                          name={`jabatan_akademik_id.${index}.id`}
                          render={({ field: formField }) => (
                            <InfiniteScrollSelect
                              form={form}
                              name={formField.name}
                              placeholder="--Pilih Penerima--"
                              queryKey="jabatan-akademik-id-infinite"
                              queryFn={(page) =>
                                adminServices.getJabatanAkademik(page)
                              }
                              itemValue="id"
                              itemLabel="jabatan_akademik"
                              initialSelectedItem={initialData?.jabatan_akademik?.find(
                                (j: any) =>
                                  String(j.id) ===
                                  form.getValues(
                                    `jabatan_akademik_id.${index}.id`
                                  )
                              )}
                            />
                          )}
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
                <FormMessage>
                  {form.formState.errors.jabatan_akademik_id?.root?.message}
                </FormMessage>
              </div>
            </div>

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
  );
};

// --- Page Component (Loader) ---
const EditDataBerita = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["detail-berita-operasional", id],
    queryFn: async () => {
      if (!id) throw new Error("ID tidak valid");
      const response = await adminServices.getBeritaSelectwithParams(
        Number(id)
      );
      return response.data.data;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="mt-10 mb-20">
        <Title title="Berita" subTitle="Edit Data Berita" />
        <CustomCard>
          <div className="p-6 space-y-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="flex gap-4 items-center">
                <Skeleton className="h-8 w-36" />
                <Skeleton className="h-8 flex-1" />
              </div>
            ))}
          </div>
        </CustomCard>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="mt-10 text-center text-red-500">
        Gagal memuat data berita atau data tidak ditemukan.
      </div>
    );
  }

  return <BeritaForm initialData={data} />;
};

export default EditDataBerita;
