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

const Biodata = () => {
  const [show, setShow] = useState("kepegawaian");
  const params = useParams();

  const { data } = useQuery({
    queryKey: ["detail-pegawai"],
    queryFn: async () => {
      const response = await adminServices.getPegawaiDetailAdminPage(
        params.id
      );

      return response.data.data;
    },
  });

  const { data: getSuku } = useQuery({
    queryKey: ["suku"],
    queryFn: async () => {
      if (!data?.suku_id) return;

      const response = await adminServices.getSuku(data?.suku_id);

      return response.data.data;
    },
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
    data?.jenis_kelamin === "L" ? "Laki-laki" : "Perempuan",
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

  // kepegawaian
  const dataKepegawaianLeft = [
    data?.unit_kerja || "-",
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
    data?.suku_id ? getSuku?.nama_suku : "-",
    data?.file_ktp ? (
      <a
        href={`http://103.158.196.106/storage/${data.file_ktp}`}
        target="_blank"
        rel="noopener noreferrer"
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
      >
        Lihat File Rekening
      </a>
    ) : (
      "-"
    ),
    data?.cabang_bank || "-",
  ];

  // dokumen

  // lain lain
  const dataLainLainLeft = [
    data?.file_rekening || "-",
    data?.karpeg || "-",
    data?.file_karpeg ? (
      <a
        href={`http://103.158.196.106/storage/${data.file_rekening}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Lihat File Rekening
      </a>
    ) : (
      "-"
    ),
    data?.npwp || "-",
    data?.file_npwp ? (
      <a
        href={`http://103.158.196.106/storage/${data.file_rekening}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Lihat File Rekening
      </a>
    ) : (
      "-"
    ),
  ];

  const dataLainLainRight = [
    data?.no_bpjs || "-",
    data?.no_bpjs_ketenagakerjaan ? (
      <a
        href={`http://103.158.196.106/storage/${data.file_rekening}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Lihat File Rekening
      </a>
    ) : (
      "-"
    ),
  ];

  return (
    <DetailPegawaiLayout title="Biodata Pegawai" subTitile="Data Pegawai">
      {/*sidebar*/}
      <DetailPegawaiSidebar currentPegawaiId={params.id} accordionData={accordionContent} />
      <div className="flex flex-col gap-20 w-full">
        <DetailPegawai
          datasLeft={datasLeft}
          datasRight={datasRight}
          leftColumn={menuDetail.biodataLeftColumn}
          rightColumn={menuDetail.biodataRightColumn}
        />

        <div>
          <div className="flex gap-2 justify-center">
            {biodataMenu.map((item, index) => (
              <Button
                key={index}
                type="button"
                onClick={() => setShow(item.show)}
                className={`bg-[#D5D5D5] text-[#000] hover:bg-[#0A5B4F] hover:text-white rounded-t-2xl rounded-b-none transition-all duration-300 ${
                  show === item.show ? "bg-[#106D63] text-white" : ""
                }`}
              >
                {item.title}
              </Button>
            ))}
          </div>

          <div className="border-2 border-[#000]/20 rounded-lg w-full">
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
            ) : show === "dokumen" ? (
              <h1>fff</h1>
            ) : (
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
