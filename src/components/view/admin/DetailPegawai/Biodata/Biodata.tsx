import DetailPegawai from "@/components/blocks/BiodataDetailPegawai/DetailPegawai";
import { Button } from "@/components/ui/button";
import biodataMenu from "@/constant/biodataMenu/biodataMenu";
import DetailPegawaiLayout from "@/layouts/DetailPegawaiLayout";
import adminServices from "@/services/admin.services";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import menuDetail from "@/constant/detailPegawaiMenu/index";
import DetailPegawaiSidebar from "../../../../blocks/PegawaiDetailSidebar/PegawaiDetailSidebar";
import accordionContent from "../../../../../constant/arccodionContent/arccodionContent";
import { Skeleton } from "@/components/ui/skeleton";

// --- START DEFINISI TIPE ---

// Tipe untuk data detail pegawai dari API
interface PegawaiDetail {
  id: number;
  nip: string;
  nuptk: string;
  nama: string;
  gelar_depan: string | null;
  gelar_belakang: string | null;
  jenis_kelamin: "L" | "P";
  agama: string;
  tempat_lahir: string;
  tanggal_lahir: string; // ISO string date
  kode_status_pernikahan: number;
  unit_kerja: UnitKerja;
  status_aktif: boolean;
  hubungan_kerja: string;
  email_pt: string;
  no_akun_finger: string | null;
  jabatan_atasan: string | null;
  jabatan_akademik: string;
  jabatan_fungsional: string;
  bidang_keahlian: string | null;
  homebase: string;
  orchid_id: string | null;
  scopus_id: string | null;
  nidn: string;
  nidk: string | null;
  nupn: string | null;
  nbm: string | null;
  rumpun_bidang: string | null;
  tanggal_sertifikasi_dosen: string | null; // ISO string date
  file_sertifikasi_dosen: string | null;
  provinsi: string;
  kota: string;
  kecamatan: string;
  alamat_domisili: string;
  kode_pos: string;
  jarak_rumah_domisili: string | null;
  no_telepon_domisili_kontak: string;
  no_telephone_kantor: string | null;
  no_handphone: string;
  kepemilikan_nohp_utama: string | null;
  email_pribadi: string;
  no_ktp: string;
  no_kk: string;
  warga_negara: string;
  alamat_kependudukan: string;
  suku_id: number;
  file_ktp: string | null;
  file_kk: string | null;
  nama_bank: string;
  no_rekening: string;
  file_rekening: string | null;
  cabang_bank: string;
  karpeg: string | null;
  file_karpeg: string | null;
  npwp: string | null;
  file_npwp: string | null;
  no_bpjs: string | null;
  no_bpjs_ketenagakerjaan: string | null;
}

// Tipe untuk data suku
interface Suku {
  nama_suku: string;
}

interface UnitKerja{
  id: String;
  kode_unit: String;
  nama_unit: String;
}

// --- END DEFINISI TIPE ---

const Biodata = () => {
  const [show, setShow] = useState("kepegawaian");
  const params = useParams<{ id: string }>(); // Menambahkan tipe pada params

  const { data, isLoading } = useQuery<PegawaiDetail>({
    queryKey: ["detail-pegawai", params.id],
    queryFn: async () => {
      // FIX: Memastikan params.id ada dan mengonversinya ke number
      if (!params.id) {
        throw new Error("ID Pegawai tidak ditemukan");
      }
      const response = await adminServices.getPegawaiDetailAdminPage(
        Number(params.id)
      );
      return response.data.data;
    },
    enabled: !!params.id, // Query hanya akan berjalan jika params.id ada
  });

  const { data: getSuku } = useQuery<Suku>({
    queryKey: ["suku", data?.suku_id],
    queryFn: async () => {
      if (!data?.suku_id) return { nama_suku: "-" }; // Return default jika tidak ada suku_id
      const response = await adminServices.getSuku(data.suku_id);
      return response.data.data;
    },
    enabled: !!data?.suku_id, // Query hanya berjalan jika data dan suku_id ada
  });

  // biodata
  const datasLeft = [
    data?.nip || "-",
    data?.nuptk || "-",
    data?.nama || "-",
    data?.gelar_depan || "-",
    data?.gelar_belakang || "-",
  ];
  const datasRight = [
    data?.jenis_kelamin === "L"
      ? "Laki-laki"
      : data?.jenis_kelamin === "P"
      ? "Perempuan"
      : "-",
    data?.agama || "-",
    data?.tempat_lahir || "-",
    data?.tanggal_lahir
      ? new Date(data.tanggal_lahir).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : "-",
    data?.kode_status_pernikahan === 1
      ? "Belum Menikah"
      : data?.kode_status_pernikahan === 2
      ? "Menikah"
      : data?.kode_status_pernikahan === 3
      ? "Cerai"
      : "-",
  ];

  //unit kerja dan status aktif
  const unitKerja =  || "-";

  // kepegawaian
  const dataKepegawaianLeft = [
    data?.unit_kerja?.nama_unit || "-",
    data?.status_aktif ? "Aktif" : "Tidak Aktif",
    data?.hubungan_kerja || "-",
    data?.email_pt || "-",
    data?.no_akun_finger || "-",
  ];

  const dataKepegawaianRight = [
    data?.jabatan_atasan || "-",
    data?.jabatan_akademik || "-",
    data?.jabatan_fungsional || "-",
  ];

  // dosen
  const dataDosenLeft = [
    data?.bidang_keahlian || "-",
    data?.homebase || "-",
    data?.orchid_id || "-",
    data?.scopus_id || "-",
    data?.nidn || "-",
  ];

  const dataDosenRight = [
    data?.nidk || "-",
    data?.nupn || "-",
    data?.nbm || "-",
    data?.rumpun_bidang || "-",
    data?.tanggal_sertifikasi_dosen
      ? new Date(data.tanggal_sertifikasi_dosen).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : "-",
  ];

  // alamat
  const dataAlamatLeft = [
    data?.file_sertifikasi_dosen ? (
      <a
        href={`http://103.158.196.106/storage/${data.file_sertifikasi_dosen}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline"
      >
        Lihat Sertifikat
      </a>
    ) : (
      "-"
    ),
    data?.provinsi || "-",
    data?.kota || "-",
    data?.kecamatan || "-",
    data?.alamat_domisili || "-",
    data?.kode_pos || "-",
  ];

  const dataAlamatRight = [
    data?.jarak_rumah_domisili || "-",
    data?.no_telepon_domisili_kontak || "-",
    data?.no_telephone_kantor || "-",
    data?.no_handphone || "-",
    data?.kepemilikan_nohp_utama || "-",
  ];

  // kependudukan
  const dataKependudukanLeft = [
    data?.email_pribadi || "-",
    data?.no_ktp || "-",
    data?.no_kk || "-",
    data?.warga_negara || "-",
    data?.provinsi || "-",
    data?.kota || "-",
  ];

  const dataKependudukanRight = [
    data?.kecamatan || "-",
    data?.alamat_kependudukan || "-",
    data?.kode_pos || "-",
    getSuku?.nama_suku || "-",
    data?.file_ktp ? (
      <a
        href={`http://103.158.196.106/storage/${data.file_ktp}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline"
      >
        Lihat File KTP
      </a>
    ) : (
      "-"
    ),
  ];

  // rekening bank
  const dataRekeningLeft = [
    data?.file_kk ? (
      <a
        href={`http://103.158.196.106/storage/${data.file_kk}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline"
      >
        Lihat File KK
      </a>
    ) : (
      "-"
    ),
    data?.nama_bank || "-",
    data?.no_rekening || "-",
  ];

  const dataRekeningRight = [
    data?.file_rekening ? (
      <a
        href={`http://103.158.196.106/storage/${data.file_rekening}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline"
      >
        Lihat File Rekening
      </a>
    ) : (
      "-"
    ),
    data?.cabang_bank || "-",
  ];

  // lain lain (dokumen)
  const dataLainLainLeft = [
    data?.karpeg || "-",
    data?.file_karpeg ? (
      <a
        href={`http://103.158.196.106/storage/${data.file_karpeg}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline"
      >
        Lihat File Karpeg
      </a>
    ) : (
      "-"
    ),
    data?.npwp || "-",
    data?.file_npwp ? (
      <a
        href={`http://103.158.196.106/storage/${data.file_npwp}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline"
      >
        Lihat File NPWP
      </a>
    ) : (
      "-"
    ),
  ];

  const dataLainLainRight = [
    data?.no_bpjs || "-",
    data?.no_bpjs_ketenagakerjaan || "-",
  ];

  if (isLoading) {
    return (
      <DetailPegawaiLayout title="Biodata Pegawai" subTitile="Data Pegawai">
        <Skeleton className="w-64 h-full" />
        <div className="w-full space-y-6">
          <Skeleton className="w-full h-48" />
          <Skeleton className="w-full h-64" />
        </div>
      </DetailPegawaiLayout>
    );
  }

  return (
    <DetailPegawaiLayout title="Biodata Pegawai" subTitile="Data Pegawai">
      <DetailPegawaiSidebar
        currentPegawaiId={params.id}
        accordionData={accordionContent}
      />
      <div className="flex flex-col gap-20 w-full">
        <DetailPegawai
          datasLeft={datasLeft}
          datasRight={datasRight}
          leftColumn={menuDetail.biodataLeftColumn}
          rightColumn={menuDetail.biodataRightColumn}
        />

        <div>
          <div className="w-full grid grid-cols-2 grid-flow-row min-[1313px]:flex gap-2 mt-10">
            {biodataMenu.map((item, index) => (
              <Button
                key={index}
                type="button"
                onClick={() => setShow(item.show)}
                className={`${
                  item.title === "Alamat Domisili & Kontak"
                    ? "col-span-2 min-[506px]:col-span-1"
                    : ""
                } flex-1 text-xs md:text-sm cursor-pointer bg-[#D5D5D5] text-[#000] hover:bg-[#0A5B4F] hover:text-white lg:rounded-t-2xl lg:rounded-b-none transition-all duration-300 ${
                  show === item.show ? "bg-[#106D63] text-white" : ""
                }`}
              >
                {item.title}
              </Button>
            ))}
          </div>

          <div className="border-2 border-[#000]/20 rounded-lg w-full mt-5 lg:mt-0">
            {show === "kepegawaian" ? (
              <div className="flex w-full p-4">
                <DetailPegawai
                  datasLeft={dataKepegawaianLeft}
                  datasRight={dataKepegawaianRight}
                  leftColumn={menuDetail.kepegawaianLeftColumn}
                  rightColumn={menuDetail.kepegawaianRightColumn}
                />
              </div>
            ) : show === "dosen" ? (
              <div className="flex w-full p-4">
                <DetailPegawai
                  datasLeft={dataDosenLeft}
                  datasRight={dataDosenRight}
                  leftColumn={menuDetail.dosenLeftColumn}
                  rightColumn={menuDetail.dosenRightColumn}
                />
              </div>
            ) : show === "domisili" ? (
              <div className="flex w-full p-4">
                <DetailPegawai
                  datasLeft={dataAlamatLeft}
                  datasRight={dataAlamatRight}
                  leftColumn={menuDetail.alamatLeftColumn}
                  rightColumn={menuDetail.alamatRightColumn}
                />
              </div>
            ) : show === "kependudukan" ? (
              <div className="flex w-full p-4">
                <DetailPegawai
                  datasLeft={dataKependudukanLeft}
                  datasRight={dataKependudukanRight}
                  leftColumn={menuDetail.kependudukanLeftColumn}
                  rightColumn={menuDetail.kependudukanRightColumn}
                />
              </div>
            ) : show === "rekening-bank" ? (
              <div className="flex w-full p-4">
                <DetailPegawai
                  datasLeft={dataRekeningLeft}
                  datasRight={dataRekeningRight}
                  leftColumn={menuDetail.rekeningLeftColumn}
                  rightColumn={menuDetail.rekeningRightColumn}
                />
              </div>
            ) : (
              // Default to "lain-lain" atau "dokumen"
              <div className="flex w-full p-4">
                <DetailPegawai
                  datasLeft={dataLainLainLeft}
                  datasRight={dataLainLainRight}
                  leftColumn={menuDetail.lainLainLeftColumn}
                  rightColumn={menuDetail.lainLainRightColumn}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </DetailPegawaiLayout>
  );
};

export default Biodata;
