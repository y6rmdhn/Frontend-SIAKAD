import { useQuery } from "@tanstack/react-query";
import adminServices from "@/services/admin.services";

/**
 * Tipe data profil pegawai yang dipetakan dari response API `/pegawai/profile`
 */
export interface PegawaiProfile {
  nip: string;
  nama: string;
  unit_kerja: string;
  status: string;
  jab_fungsional: string;
  jab_struktural: string;
  pendidikan: string;
  file_foto_url?: string | null; // untuk avatar di Header & AvatarMobile
}

/**
 * Hook untuk mendapatkan data profil pegawai yang sedang login.
 * Endpoint: GET /pegawai/profile
 *
 * Data di-cache oleh react-query dengan key "pegawai-profile",
 * sehingga seluruh halaman yang menggunakan hook ini hanya hit API sekali
 * selama sesi yang sama (staleTime 5 menit).
 */
const usePegawaiProfile = () => {
  const { data, isLoading, isError } = useQuery<PegawaiProfile | null>({
    queryKey: ["pegawai-profile"],
    staleTime: 5 * 60 * 1000, // Cache selama 5 menit
    queryFn: async () => {
      const response = await adminServices.getProfilePegawai();
      const d = response.data?.data;
      if (!d) return null;

      // Mapping dari struktur API ke format InfoList
      return {
        nip: d.nip ?? "-",
        nama: d.nama ?? "-",
        unit_kerja: d.unit_kerja_id?.nama ?? "-",
        status: d.status_aktif_id?.nama ?? "-",
        jab_fungsional: d.jabatan_fungsional_id?.nama ?? "-",
        jab_struktural: d.jabatan_struktural_id?.nama ?? "-",
        pendidikan: d.jenjang_pendidikan_id?.nama ?? "-",
        file_foto_url: d.file_foto ?? null,
      };
    },
  });

  return { profile: data, isLoading, isError };
};

export default usePegawaiProfile;
