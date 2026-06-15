import CustomCard from "@/components/blocks/Card";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MdEdit } from "react-icons/md";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import adminServices from "@/services/admin.services.ts";
import { toast } from "sonner";
import CustomPagination from "@/components/blocks/CustomPagination";
import { z } from "zod";
import potsReferensiServices from "@/services/create.admin.referensi.ts";
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput.tsx";
import { IoSaveOutline } from "react-icons/io5";
import { RiResetLeftFill } from "react-icons/ri";
import { zodResolver } from "@hookform/resolvers/zod";
import putReferensiServices from "@/services/put.admin.referensi.ts";
import { FormFieldSelect } from "@/components/blocks/CustomFormSelect/CustomFormSelect";

// ─── Interfaces ───────────────────────────────────────────────────────────────

interface KomponenGajiItem {
  id: string;
  nama: string;
  jenis: "TUNJANGAN" | "POTONGAN";
  tipe_komponen:
  | "FLAT_BULANAN"
  | "FLAT_PER_KEHADIRAN"
  | "PERSENTASE_GAJI_POKOK"
  | "DINAMIS_THRESHOLD";
  nilai: number | string;
  kondisi_threshold: number | string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface KomponenGajiResponse {
  current_page: number;
  data: KomponenGajiItem[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: any[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

// ─── Schema Validation ────────────────────────────────────────────────────────

const komponenGajiSchema = z.object({
  id: z.string().optional(),
  nama: z.string().min(1, "Nama komponen tidak boleh kosong"),
  jenis: z.enum(["TUNJANGAN", "POTONGAN"], {
    required_error: "Jenis wajib dipilih",
  }),
  tipe_komponen: z.enum(
    [
      "FLAT_BULANAN",
      "FLAT_PER_KEHADIRAN",
      "PERSENTASE_GAJI_POKOK",
      "DINAMIS_THRESHOLD",
    ],
    { required_error: "Tipe komponen wajib dipilih" }
  ),
  nilai: z
    .string()
    .min(1, "Nilai tidak boleh kosong")
    .refine((v) => !isNaN(Number(v)), "Nilai harus berupa angka"),
  kondisi_threshold: z.string().optional(),
  is_active: z.boolean().default(true),
});

type KomponenGajiFormValue = z.infer<typeof komponenGajiSchema>;

// ─── Options ──────────────────────────────────────────────────────────────────

const jenisOptions = [
  { label: "Tunjangan", value: "TUNJANGAN" },
  { label: "Potongan", value: "POTONGAN" },
];

const tipeKomponenOptions = [
  { label: "Flat Bulanan (Nominal Tetap/Bulan)", value: "FLAT_BULANAN" },
  {
    label: "Flat Per Kehadiran (Nominal × Hari Masuk)",
    value: "FLAT_PER_KEHADIRAN",
  },
  {
    label: "Persentase Gaji Pokok (%)",
    value: "PERSENTASE_GAJI_POKOK",
  },
  {
    label: "Dinamis Threshold (Persentase jika melewati batas)",
    value: "DINAMIS_THRESHOLD",
  },
];

// ─── Helper Functions ─────────────────────────────────────────────────────────

const formatNilai = (
  tipe: KomponenGajiItem["tipe_komponen"],
  nilai: number | string
) => {
  const num = Number(nilai);
  if (tipe === "PERSENTASE_GAJI_POKOK" || tipe === "DINAMIS_THRESHOLD") {
    return `${num}%`;
  }
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(num);
};

const formatThreshold = (threshold: number | string | null) => {
  if (!threshold) return "-";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(Number(threshold));
};

const getTipeLabel = (tipe: KomponenGajiItem["tipe_komponen"]) => {
  const opt = tipeKomponenOptions.find((o) => o.value === tipe);
  return opt ? opt.label : tipe;
};

// ─── Komponen Utama ───────────────────────────────────────────────────────────

const PotongGaji = () => {
  const form = useForm<KomponenGajiFormValue>({
    defaultValues: {
      nama: "",
      jenis: undefined,
      tipe_komponen: undefined,
      nilai: "",
      kondisi_threshold: "",
      is_active: true,
    },
    resolver: zodResolver(komponenGajiSchema),
  });

  const [searchParam, setSearchParam] = useSearchParams();
  const [isAddData, setIsAddData] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(
    Number(searchParam.get("page") || 1)
  );
  const queryClient = useQueryClient();

  // ─ Watch tipe untuk conditional UI ─
  const watchedTipe = form.watch("tipe_komponen");

  // ─── Fetch Data ───────────────────────────────────────────────────────────

  const { data } = useQuery<KomponenGajiResponse>({
    queryKey: ["master-komponen-gaji", searchParam.get("page")],
    queryFn: async () => {
      const response = await adminServices.getMasterKomponenGaji();
      console.log("Komponen Gaji:", response.data);
      return response.data?.data?.data ?? response.data;
    },
  });

  // ─── Mutations ────────────────────────────────────────────────────────────

  const { mutate: postKomponenGaji } = useMutation({
    mutationFn: (data: KomponenGajiFormValue) => {
      const payload = {
        nama: data.nama,
        jenis: data.jenis,
        tipe_komponen: data.tipe_komponen,
        nilai: Number(data.nilai),
        kondisi_threshold: data.kondisi_threshold
          ? Number(data.kondisi_threshold)
          : null,
        is_active: data.is_active,
      };
      return potsReferensiServices.komponenGaji(payload);
    },
    onSuccess: () => {
      form.reset();
      toast.success("Komponen gaji berhasil ditambahkan");
      setIsAddData(false);
      queryClient.invalidateQueries({ queryKey: ["master-komponen-gaji"] });
    },
    onError: (error: any) => {
      console.error("Error adding komponen gaji:", error);
      toast.error(
        error.response?.data?.message ?? "Gagal menambahkan komponen gaji"
      );
    },
  });

  const { mutate: putKomponenGaji } = useMutation({
    mutationFn: (data: KomponenGajiFormValue) => {
      const payload = {
        nama: data.nama,
        jenis: data.jenis,
        tipe_komponen: data.tipe_komponen,
        nilai: Number(data.nilai),
        kondisi_threshold: data.kondisi_threshold
          ? Number(data.kondisi_threshold)
          : null,
        is_active: data.is_active,
      };
      return putReferensiServices.komponenGaji(data.id!, payload);
    },
    onSuccess: () => {
      form.reset();
      toast.success("Komponen gaji berhasil diperbarui");
      setIsAddData(false);
      setIsEditMode(false);
      setEditingItemId(null);
      queryClient.invalidateQueries({ queryKey: ["master-komponen-gaji"] });
    },
    onError: (error: any) => {
      console.error("Error editing komponen gaji:", error);
      toast.error(
        error.response?.data?.message ?? "Gagal memperbarui komponen gaji"
      );
    },
  });

  // ─── Handlers ─────────────────────────────────────────────────────────────

  const handleSubmit = (values: KomponenGajiFormValue) => {
    if (isEditMode && editingItemId) {
      putKomponenGaji(values);
    } else {
      postKomponenGaji(values);
    }
  };

  const handleEditItem = (item: KomponenGajiItem) => {
    form.reset({
      id: item.id,
      nama: item.nama,
      jenis: item.jenis,
      tipe_komponen: item.tipe_komponen,
      nilai: String(item.nilai),
      kondisi_threshold: item.kondisi_threshold
        ? String(item.kondisi_threshold)
        : "",
      is_active: item.is_active,
    });
    setIsEditMode(true);
    setEditingItemId(item.id);
    setIsAddData(true);
    if (Number(searchParam.get("page")) !== 1) {
      searchParam.set("page", "1");
      setSearchParam(searchParam);
    }
  };

  const handleCancel = () => {
    form.reset();
    setIsEditMode(false);
    setEditingItemId(null);
    setIsAddData(false);
  };

  // ─── Effects ──────────────────────────────────────────────────────────────

  useEffect(() => {
    const page = Number(searchParam.get("page") || 1);
    if (page !== currentPage) setCurrentPage(page);
  }, [searchParam]);

  useEffect(() => {
    if (!searchParam.get("page")) {
      searchParam.set("page", "1");
      setSearchParam(searchParam);
    }
  }, [searchParam, setSearchParam]);

  useEffect(() => {
    if (Number(searchParam.get("page")) < 1) {
      searchParam.set("page", "1");
      setSearchParam(searchParam);
    }
  }, [searchParam, setSearchParam]);

  useEffect(() => {
    if (
      data?.last_page &&
      Number(searchParam.get("page")) > data.last_page &&
      data.last_page > 0
    ) {
      searchParam.set("page", data.last_page.toString());
      setSearchParam(searchParam);
    }
  }, [searchParam, data, setSearchParam]);

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="mt-10 mb-20">
      <h1 className="text-lg sm:text-2xl font-normal mb-2">
        Master Komponen Gaji
      </h1>
      <p className="text-sm text-muted-foreground mb-6">
        Kelola komponen tunjangan dan potongan yang digunakan dalam kalkulasi
        penggajian pegawai.
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <CustomCard
            actions={
              <div className="flex justify-end">
                <Button
                  type="button"
                  onClick={() => {
                    if (!isEditMode) {
                      form.reset({
                        nama: "",
                        jenis: undefined,
                        tipe_komponen: undefined,
                        nilai: "",
                        kondisi_threshold: "",
                        is_active: true,
                      });
                      setIsAddData(true);
                      searchParam.set("page", "1");
                      setSearchParam(searchParam);
                    }
                  }}
                  className={`cursor-pointer ${isEditMode
                      ? "bg-gray-400"
                      : "bg-green-light-uika hover:bg-[#329C59]"
                    }`}
                  disabled={isEditMode}
                >
                  <FaPlus className="w-4! h-4! text-white" />
                  Tambah Komponen
                </Button>
              </div>
            }
          >
            <div className="overflow-x-auto">
              <Table className="mt-5 table-auto min-w-[900px]">
                <TableHeader>
                  <TableRow className="bg-gray-100">
                    <TableHead className="text-center text-xs sm:text-sm">
                      Nama Komponen
                    </TableHead>
                    <TableHead className="text-center text-xs sm:text-sm">
                      Jenis
                    </TableHead>
                    <TableHead className="text-center text-xs sm:text-sm">
                      Tipe
                    </TableHead>
                    <TableHead className="text-center text-xs sm:text-sm">
                      Nilai
                    </TableHead>
                    <TableHead className="text-center text-xs sm:text-sm">
                      Threshold
                    </TableHead>
                    <TableHead className="text-center text-xs sm:text-sm">
                      Status
                    </TableHead>
                    <TableHead className="text-center text-xs sm:text-sm">
                      Aksi
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="divide-y divide-gray-200">
                  {/* ── Input Row ── */}
                  {(isAddData || isEditMode) && currentPage === 1 && (
                    <TableRow className="even:bg-gray-100">
                      <TableCell className="text-center text-xs sm:text-sm">
                        <FormFieldInput
                          inputStyle="w-full"
                          position={true}
                          form={form}
                          name="nama"
                          required={false}
                          placeholder="Zakat Profesi"
                        />
                      </TableCell>
                      <TableCell className="text-center text-xs sm:text-sm">
                        <FormFieldSelect
                          form={form}
                          name="jenis"
                          labelStyle="text-[#3F6FA9]"
                          options={jenisOptions}
                          placeholder="--Pilih Jenis--"
                          required={false}
                        />
                      </TableCell>
                      <TableCell className="text-center text-xs sm:text-sm">
                        <FormFieldSelect
                          form={form}
                          name="tipe_komponen"
                          labelStyle="text-[#3F6FA9]"
                          options={tipeKomponenOptions}
                          placeholder="--Pilih Tipe--"
                          required={false}
                        />
                      </TableCell>
                      <TableCell className="text-center text-xs sm:text-sm">
                        <FormFieldInput
                          inputStyle="w-full"
                          position={true}
                          form={form}
                          name="nilai"
                          required={false}
                          placeholder={
                            watchedTipe === "PERSENTASE_GAJI_POKOK" ||
                              watchedTipe === "DINAMIS_THRESHOLD"
                              ? "2.5 (persen)"
                              : "500000"
                          }
                        />
                      </TableCell>
                      <TableCell className="text-center text-xs sm:text-sm">
                        <FormFieldInput
                          inputStyle="w-full"
                          position={true}
                          form={form}
                          name="kondisi_threshold"
                          required={false}
                          placeholder={
                            watchedTipe === "DINAMIS_THRESHOLD"
                              ? "5000000"
                              : "-"
                          }
                        />
                      </TableCell>
                      <TableCell className="text-center text-xs sm:text-sm">
                        <FormFieldInput
                          inputStyle="w-full"
                          position={true}
                          form={form}
                          name="is_active"
                          type="checkbox"
                          required={false}
                        />
                      </TableCell>
                      <TableCell className="h-full">
                        <div className="flex justify-center items-center w-full h-full">
                          <Button
                            type="submit"
                            size="icon"
                            variant="ghost"
                            className="cursor-pointer"
                          >
                            <IoSaveOutline className="w-5! h-5!" />
                          </Button>
                          <Button
                            size="icon"
                            type="button"
                            variant="ghost"
                            className="cursor-pointer"
                            onClick={handleCancel}
                          >
                            <RiResetLeftFill className="text-yellow-uika" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}

                  {/* ── Data Rows ── */}
                  {data?.data?.map((item) => (
                    <TableRow key={item.id} className="even:bg-gray-100">
                      <TableCell className="text-xs sm:text-sm font-medium">
                        {item.nama}
                      </TableCell>
                      <TableCell className="text-center text-xs sm:text-sm">
                        <Badge
                          variant="outline"
                          className={
                            item.jenis === "TUNJANGAN"
                              ? "border-green-500 text-green-700 bg-green-50"
                              : "border-red-500 text-red-700 bg-red-50"
                          }
                        >
                          {item.jenis}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center text-xs sm:text-sm">
                        <span className="text-xs text-muted-foreground">
                          {getTipeLabel(item.tipe_komponen)}
                        </span>
                      </TableCell>
                      <TableCell
                        className={`text-center text-xs sm:text-sm font-medium ${item.jenis === "TUNJANGAN"
                            ? "text-green-600"
                            : "text-red-600"
                          }`}
                      >
                        {formatNilai(item.tipe_komponen, item.nilai)}
                      </TableCell>
                      <TableCell className="text-center text-xs sm:text-sm text-muted-foreground">
                        {formatThreshold(item.kondisi_threshold)}
                      </TableCell>
                      <TableCell className="text-center text-xs sm:text-sm">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${item.is_active
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                            }`}
                        >
                          {item.is_active ? "Aktif" : "Non-Aktif"}
                        </span>
                      </TableCell>
                      <TableCell className="h-full">
                        <div className="flex justify-center items-center w-full h-full">
                          <Button
                            size="icon"
                            type="button"
                            variant="ghost"
                            className="cursor-pointer"
                            onClick={() => handleEditItem(item)}
                            disabled={isEditMode && editingItemId !== item.id}
                          >
                            <MdEdit className="w-5! h-5! text-[#26A1F4]" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}

                  {/* ── Empty State ── */}
                  {!data?.data?.length && !isAddData && (
                    <TableRow>
                      <TableCell
                        colSpan={7}
                        className="text-center py-8 text-muted-foreground text-sm"
                      >
                        Belum ada komponen gaji. Klik "Tambah Komponen" untuk
                        menambahkan.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            <CustomPagination
              currentPage={Number(searchParam.get("page") || 1)}
              links={data?.links || []}
              onPageChange={(page) => {
                if (isEditMode) {
                  toast.warning("Selesaikan edit data terlebih dahulu");
                  return;
                }
                searchParam.set("page", page.toString());
                setSearchParam(searchParam);
              }}
              hasNextPage={!!data?.next_page_url}
              hasPrevPage={!!data?.prev_page_url}
              totalPages={data?.last_page}
            />
          </CustomCard>
        </form>
      </Form>

      {/* ── Info Box ── */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800 space-y-1">
        <p className="font-semibold">Keterangan Tipe Komponen:</p>
        <ul className="list-disc list-inside space-y-1 text-xs">
          <li>
            <strong>Flat Bulanan</strong> — Nominal tetap per bulan (mis. Rp
            500.000)
          </li>
          <li>
            <strong>Flat Per Kehadiran</strong> — Nominal dikali jumlah hari
            masuk (mis. Rp 40.000/hari)
          </li>
          <li>
            <strong>Persentase Gaji Pokok</strong> — Persentase dari Gaji Pokok
            (Pangkat + Jabatan). Isi nilai dalam persen (mis. 2.5)
          </li>
          <li>
            <strong>Dinamis Threshold</strong> — Hanya aktif jika Gaji Bersih
            ≥ nilai Threshold. Isi nilai dalam persen dan threshold dalam rupiah
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PotongGaji;
