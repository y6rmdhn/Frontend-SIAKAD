import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useMutation } from "@tanstack/react-query";
import { FaSave } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput";
import { FormFieldSelect } from "@/components/blocks/CustomFormSelect/CustomFormSelect";
import pegawaiDetailMenu from "@/constant/PegawaiDetailMenu";
import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import postPegawaiServices from "@/services/create.pegawai.ts";
import KepegawaianSection from "@/components/blocks/DataPegawaiForm/PegawaiSection";
import DomisiliSection from "@/components/blocks/DataPegawaiForm/Domisilisection";
import RekeningBankSection from "@/components/blocks/DataPegawaiForm/RekeningBankSection";
import DokumenSection from "@/components/blocks/DataPegawaiForm/DokumenSection";
import DetailKendaraanSection from "@/components/blocks/DataPegawaiForm/DetailKendaraanSection";
import { zodResolver } from "@hookform/resolvers/zod";
import SearchInput from "@/components/blocks/SearchInput";
import Title from "@/components/blocks/Title";

const dataPegawaiShcema = z.object({
  nip: z
    .string()
    .min(18, "nip kurang dari 18 digit")
    .max(18, "nip lebih dari 18 digit"),
  nama: z
    .string()
    .min(3, "nama lengkap kurang dari 3 karakter")
    .max(50, "nama lengkap lebih dari 50 karakter"),
  gelar_depan: z
    .string()
    .max(50, "gelar depan lebih dari 50 karakter")
    .optional(),
  gelar_belakang: z
    .string()
    .max(50, "gelar belakang lebih dari 50 karakter")
    .optional(),
  jenis_kelamin: z
    .enum(["lk", "pr"], {
      errorMap: () => ({ message: "Jenis kelamin wajib dipilih" }),
    })
    .optional(),
  agama: z
    .string()
    .min(3, "agama kurang dari 3 karakter")
    .max(50, "agama lebih dari 50 karakter"),
  tempat_lahir: z
    .string()
    .max(50, "tempat lahir lebih dari 50 karakter")
    .optional(),
  tanggal_lahir: z
    .string()
    .min(3, "tanggal lahir kurang dari 3 karakter")
    .max(50, "tanggal lahir lebih dari 50 karakter"),
  kode_status_pernikahan: z.number().optional(),
  golongan_darah: z.string().optional(),

  // kepegawaian
  unit_kerja_id: z
    .string()
    .max(50, "unit kerja lebih dari 50 karakter")
    .optional(),
  status_aktif_id: z
    .string()
    .max(50, "status aktif lebih dari 50 karakter")
    .optional(),
  hubungan_kerja: z
    .string()
    .max(50, "hubungan kerja lebih dari 50 karakter")
    .optional(),
  email_pegawai: z.string().email().optional(),
  email_pribadi: z.string().email().optional(),
  golongan: z.string().optional(),
  jabatan_fungsional: z.string().optional(),

  // domisili
  np_ktp: z.string().max(16, "no.ktp lebih dari 16 digit").optional(),
  no_kk: z.string().max(16, "no.kk lebih dari 16 digit").optional(),
  warga_negara: z
    .string()
    .min(1, "warga negara wajib diisi")
    .max(50, "warga negara lebih dari 50 karakter"),
  provinsi: z.string().max(50, "provinsi lebih dari 50 karakter").optional(),
  kota: z.string().max(50, "kota lebih dari 50 karakter").optional(),
  alamat_domisili: z
    .string()
    .max(50, "alamat lebih dari 50 karakter")
    .optional(),
  kecamatan: z.string().max(50, "kecamatan lebih dari 50 karakter").optional(),
  kode_pos: z.string().max(5, "kode pos lebih dari 5 digit").optional(),
  suku: z.string().max(50, "suku lebih dari 50 karakter").optional(),
  jarak_rumah_domisili: z
    .string()
    .max(50, "jarak rumah lebih dari 50 karakter")
    .optional(),
  no_telepon_domisili_kontak: z
    .string()
    .max(10, "no.whatsapp lebih dari 10 digit")
    .optional(),
  no_handphone: z
    .string()
    .max(10, "no.telpon utama lebih dari 10 digit")
    .optional(),

  // rekening bank
  nama_bank: z.string().max(50, "nama bank lebih dari 50 karakter").optional(),
  cabang_bank: z
    .string()
    .max(50, "cabang bank lebih dari 50 karakter")
    .optional(),
  nama_rekening: z
    .string()
    .max(50, "nama rekening lebih dari 50 karakter")
    .optional(),
  no_rekening: z.string().max(16, "no.rekening lebih dari 16 digit").optional(),

  // dokumen
  kapreg: z.string().max(50, "kapreg lebih dari 50 karakter").optional(),
  file_kapreg: z
    .any()
    .optional()
    .refine((file) => !file || file instanceof File, {
      message: "File tidak valid",
    })
    .refine((file) => !file || file.size <= 2 * 1024 * 1024, {
      message: "Ukuran file maksimal 2MB",
    })
    .refine(
      (file) =>
        !file ||
        ["application/pdf", "image/jpeg", "image/png"].includes(file.type),
      {
        message: "Format file harus PDF, JPG, atau PNG",
      }
    ),
  npwp: z.string().max(15, "npwp lebih dari 15 digit").optional(),
  file_npwp: z
    .any()
    .optional()
    .refine((file) => !file || file instanceof File, {
      message: "File tidak valid",
    })
    .refine((file) => !file || file.size <= 2 * 1024 * 1024, {
      message: "Ukuran file maksimal 2MB",
    })
    .refine(
      (file) =>
        !file ||
        ["application/pdf", "image/jpeg", "image/png"].includes(file.type),
      {
        message: "Format file harus PDF, JPG, atau PNG",
      }
    ),
  file_rekening: z
    .any()
    .optional()
    .refine((file) => !file || file instanceof File, {
      message: "File tidak valid",
    })
    .refine((file) => !file || file.size <= 2 * 1024 * 1024, {
      message: "Ukuran file maksimal 2MB",
    })
    .refine(
      (file) =>
        !file ||
        ["application/pdf", "image/jpeg", "image/png"].includes(file.type),
      {
        message: "Format file harus PDF, JPG, atau PNG",
      }
    ),
  file_kk: z
    .any()
    .optional()
    .refine((file) => !file || file instanceof File, {
      message: "File tidak valid",
    })
    .refine((file) => !file || file.size <= 2 * 1024 * 1024, {
      message: "Ukuran file maksimal 2MB",
    })
    .refine(
      (file) =>
        !file ||
        ["application/pdf", "image/jpeg", "image/png"].includes(file.type),
      {
        message: "Format file harus PDF, JPG, atau PNG",
      }
    ),
  file_ktp: z
    .any()
    .optional()
    .refine((file) => !file || file instanceof File, {
      message: "File tidak valid",
    })
    .refine((file) => !file || file.size <= 2 * 1024 * 1024, {
      message: "Ukuran file maksimal 2MB",
    })
    .refine(
      (file) =>
        !file ||
        ["application/pdf", "image/jpeg", "image/png"].includes(file.type),
      {
        message: "Format file harus PDF, JPG, atau PNG",
      }
    ),
  file_sertifikasi_dosen: z
    .any()
    .optional()
    .refine((file) => !file || file instanceof File, {
      message: "File tidak valid",
    })
    .refine((file) => !file || file.size <= 2 * 1024 * 1024, {
      message: "Ukuran file maksimal 2MB",
    })
    .refine(
      (file) =>
        !file ||
        ["application/pdf", "image/jpeg", "image/png"].includes(file.type),
      {
        message: "Format file harus PDF, JPG, atau PNG",
      }
    ),
  no_bpjs: z.string().max(20, "no.bpjs lebih dari 15 digit").optional(),
  no_bpjs_ketenagakerjaan: z
    .string()
    .max(20, "no.bpjs lebih dari 15 digit")
    .optional(),
  no_bpjs_pensiun: z.string().max(20, "no.bpjs lebih dari 15 digit").optional(),
  file_bpjs: z
    .any()
    .optional()
    .refine((file) => !file || file instanceof File, {
      message: "File tidak valid",
    })
    .refine((file) => !file || file.size <= 2 * 1024 * 1024, {
      message: "Ukuran file maksimal 2MB",
    })
    .refine(
      (file) =>
        !file ||
        ["application/pdf", "image/jpeg", "image/png"].includes(file.type),
      {
        message: "Format file harus PDF, JPG, atau PNG",
      }
    ),
  file_bpjs_ketenagakerjaan: z
    .any()
    .optional()
    .refine((file) => !file || file instanceof File, {
      message: "File tidak valid",
    })
    .refine((file) => !file || file.size <= 2 * 1024 * 1024, {
      message: "Ukuran file maksimal 2MB",
    })
    .refine(
      (file) =>
        !file ||
        ["application/pdf", "image/jpeg", "image/png"].includes(file.type),
      {
        message: "Format file harus PDF, JPG, atau PNG",
      }
    ),
  file_tanda_tangan: z
    .any()
    .optional()
    .refine((file) => !file || file instanceof File, {
      message: "File tidak valid",
    })
    .refine((file) => !file || file.size <= 2 * 1024 * 1024, {
      message: "Ukuran file maksimal 2MB",
    })
    .refine(
      (file) =>
        !file ||
        ["application/pdf", "image/jpeg", "image/png"].includes(file.type),
      {
        message: "Format file harus PDF, JPG, atau PNG",
      }
    ),

  // kendaraan
  nomor_polisi: z
    .string()
    .max(10, "nomor polisi lebih dari 10 digit")
    .optional(),
  jenis_kendaraan: z
    .string()
    .max(1, "jenis kendaraan lebih dari 1 digit")
    .optional(),
  berat_badan: z.number().max(1000, "berat badan lebih dari 1000").optional(),
  tinggi_badan: z.number().max(200, "tinggi badan lebih dari 200").optional(),
});

const DataPegawai = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState<string>("kepegawaian");
  const form = useForm({
    defaultValues: {
      nip: "",
      nama: "",
      gelar_depan: "",
      gelar_belakang: "",
      jenis_kelamin: "lk",
      agama: "",
      tempat_lahir: "",
      tanggal_lahir: "",
      kode_status_pernikahan: 0,
      golongan_darah: "",

      // kepegawaian
      unit_kerja_id: undefined,
      status_aktif_id: undefined,
      hubungan_kerja: "",
      email_pegawai: "",
      email_pribadi: "",
      golongan: "",
      jabatan_fungsional: "",

      // domisili
      np_ktp: "",
      no_kk: "",
      warga_negara: "",
      provinsi: "",
      kota: "",
      alamat_domisili: "",
      kecamatan: "",
      kode_pos: "",
      suku: "",
      jarak_rumah_domisili: "",
      no_telepon_domisili_kontak: "",
      no_handphone: "",

      // rekening bank
      nama_bank: "",
      cabang_bank: "",
      nama_rekening: "",
      no_rekening: "",

      // dokumen
      kapreg: "",
      file_kapreg: null,
      npwp: "",
      file_npwp: null,
      file_rekening: null,
      file_kk: null,
      file_ktp: null,
      file_sertifikasi_dosen: null,
    },
    resolver: zodResolver(dataPegawaiShcema),
  });

  // tambah
  const { mutate: postDataPegawai } = useMutation({
    mutationFn: (data: FormData) => postPegawaiServices.dataPegawai(data),
    onSuccess: () => {
      form.reset();
      toast.success("Data berhasil ditambahkan");
    },
  });

  const handleSubmitDataPegawai = (values) => {
    const formData = new FormData();

    Object.keys(values).forEach((key) => {
      const value = values[key];

      if (value !== null && value !== undefined) {
        // Untuk file
        if (key.startsWith("file_") && value instanceof File) {
          formData.append(key, value);
        }
        // Untuk key tertentu yang harus number
        else if (["unit_kerja_id", "jabatan_id", "role_id"].includes(key)) {
          formData.append(key, Number(value).toString());
        }
        // Untuk lainnya
        else {
          formData.append(key, value);
        }
      }
    });

    postDataPegawai(formData);
  };

  const cardFooterRef = useRef<HTMLDivElement>(null);

  const FormDataPegawai = ({ show, form }) => {
    switch (show) {
      case "kepegawaian":
        return <KepegawaianSection form={form} />;
      case "domisili":
        return <DomisiliSection form={form} />;
      case "rekening-bank":
        return <RekeningBankSection form={form} />;
      case "dokumen":
        return <DokumenSection form={form} />;
      default:
        return <DetailKendaraanSection form={form} />;
    }
  };

  // useEffect(() => {
  //   if (cardFooterRef.current) {
  //     cardFooterRef.current.scrollIntoView({
  //       behavior: "smooth",
  //       block: "end",
  //     });
  //   }
  // }, [show]);

  return (
    <div className="mt-10 mb-10">
      <Title title="Data Pegawai" />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmitDataPegawai)}>
          <Card className="mt-5 border-t-yellow-uika border-t-3">
            <CardHeader>
              <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-4">
                <div className="w-full md:w-auto lg:w-2xs">
                  <SearchInput />
                </div>
                <div className="flex flex-col items-center justify-center md:flex-row gap-2 w-full md:w-auto mt-5 md:mt-0">
                  <Button
                    type="button"
                    onClick={() => navigate("/admin/pegawai")}
                    className="bg-green-light-uika hover:bg-[#329C59] cursor-pointer w-full md:w-auto"
                  >
                    <IoIosArrowBack />
                    Kembali ke Daftar
                  </Button>

                  <Button
                    type="submit"
                    className="bg-green-light-uika hover:bg-[#329C59] cursor-pointer w-full md:w-auto"
                  >
                    <FaSave />
                    Simpan
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="mt-10 flex flex-col md:grid md:grid-rows-5 md:grid-flow-col gap-5">
              <FormFieldInput
                form={form}
                label="NIP"
                name="nip"
                labelStyle="text-[#3F6FA9]"
                required={true}
              />
              <FormFieldInput
                form={form}
                label="Nama Lengkap"
                name="nama"
                labelStyle="text-[#3F6FA9]"
                required={true}
              />
              <FormFieldInput
                form={form}
                label="Gelar Depan"
                name="gelar_depan"
                labelStyle="text-[#3F6FA9]"
                required={false}
              />
              <FormFieldInput
                form={form}
                label="Gelar Belakang"
                name="gelar_belakang"
                labelStyle="text-[#3F6FA9]"
                required={false}
              />
              <FormFieldInput
                label="Jenis Kelamin"
                name="jenis_kelamin"
                form={form}
                required={false}
                type="radio"
                options={[
                  { label: "Lk", value: "lk" },
                  { label: "Pr", value: "pr" },
                ]}
                labelStyle="text-[#3F6FA9]"
              />
              <FormFieldInput
                form={form}
                label="Agama"
                name="agama"
                labelStyle="text-[#3F6FA9]"
                required={true}
              />
              <FormFieldInput
                form={form}
                label="Tempat Lahir"
                name="tempat_lahir"
                labelStyle="text-[#3F6FA9]"
                required={false}
              />
              <FormFieldInput
                form={form}
                label="Tgl Lahir"
                name="tanggal_lahir"
                labelStyle="text-[#3F6FA9]"
                required={true}
              />
              <FormFieldInput
                form={form}
                label="Status Nikah"
                name="kode_status_pernikahan"
                labelStyle="text-[#3F6FA9]"
                required={false}
              />
              <FormFieldSelect
                form={form}
                label="Golongan Darah"
                name="golongan_darah"
                placeholder="--Pilih--"
                options={[
                  { label: "Admin", value: "admin" },
                  { label: "User", value: "user" },
                  { label: "Guest", value: "guest" },
                ]}
                labelStyle="text-[#3F6FA9]"
                required={false}
              />
            </CardContent>
            <CardFooter className="flex flex-col gap-2 w-full">
              <div className="w-full grid grid-cols-2 grid-flow-row  lg:flex gap-2 mt-10">
                {pegawaiDetailMenu.map((item, index) => (
                  <Button
                    key={index}
                    type="button"
                    onClick={() => setShow(item.show)}
                    className={`flex-1 text-xs md:text-sm cursor-pointer bg-[#D5D5D5] text-[#000] hover:bg-[#0A5B4F] hover:text-white lg:rounded-t-2xl lg:rounded-b-none transition-all duration-300 ${
                      show === item.show ? "bg-[#106D63] text-white" : ""
                    }`}
                  >
                    {item.title}
                  </Button>
                ))}
              </div>
              <div ref={cardFooterRef} className="w-full pb-10">
                <FormDataPegawai show={show} form={form} />
              </div>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
};

export default DataPegawai;
