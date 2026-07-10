# Panduan Integrasi Frontend: Update Profil Mandiri (Pegawai)

Dokumen ini berisi rangkuman detail endpoint untuk fitur **"Update Profil Mandiri"** (`updateProfilMandiri`), di mana pegawai (Dosen/Tendik) bisa mengubah data profil dasar mereka sendiri tanpa bantuan Admin.

---

## Endpoint: Update Profil Mandiri
Digunakan ketika pegawai yang sedang login ingin meng-update informasi profilnya.

**URL:** `/api/pegawai/profile`
**Method:** `PUT`
**Content-Type:** `multipart/form-data` (Wajib, karena menerima upload file foto)

> [!IMPORTANT]
> Sistem memiliki *Whitelist* keamanan. **Hanya atribut-atribut di bawah ini yang akan diproses dan diubah oleh sistem.** Jika FE mengirimkan atribut lain (seperti NIP, Pangkat, atau Jabatan), data tersebut akan diabaikan oleh backend.

### Payload Data (Key yang diizinkan di FormData)

**1. Kontak & Alamat**
- `alamat_domisili` (string, opsional)
- `no_handphone` (string, opsional)
- `no_whatsapp` (string, opsional)
- `email_pribadi` (string, opsional)

**2. Data Pribadi Non-Sensitif**
- `agama` (string, opsional)
- `golongan_darah` (string, opsional)
- `status_pernikahan_id` (UUID string, opsional) -> *Ambil dari Master Status Pernikahan*

**3. Data Tambahan**
- `npwp` (string, opsional)
- `bpjs` (string, opsional) -> *Di database akan tersimpan sebagai `no_bpjs`*
- `nomor_polisi` (string, opsional)

**4. File Foto**
- `file_foto` (File Image, opsional) -> *Untuk mengubah foto profil/avatar pegawai*

---

### Contoh Implementasi di Frontend (Axios)

Karena endpoint ini menggunakan `multipart/form-data`, data tidak bisa dikirim sebagai JSON biasa. Anda harus menyusunnya menggunakan `FormData`.

```typescript
import endpoint from "@/services/endpoint.constant"; // Sesuaikan path

export const updateProfilPegawai = async (payloadData: any) => {
  const formData = new FormData();

  // Looping untuk memasukkan data teks ke FormData
  Object.keys(payloadData).forEach((key) => {
    // Pastikan tidak memasukkan file null/undefined
    if (payloadData[key] !== null && payloadData[key] !== undefined) {
      formData.append(key, payloadData[key]);
    }
  });

  // Contoh response call:
  return axiosInstance.put(`${endpoint.PEGAWAI}/profile`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
```

> [!TIP]
> **Saran UI:**
> 1. Buat form khusus "Edit Profil" yang dipisah per section (Kontak, Info Tambahan, Data Pribadi).
> 2. Untuk *field* `status_pernikahan_id` dan `agama`, gunakan komponen `<Select>` yang *options*-nya didapat dari Master Data.
> 3. Sediakan fitur *preview* gambar saat pengguna memilih foto baru sebelum menekan tombol Simpan.
