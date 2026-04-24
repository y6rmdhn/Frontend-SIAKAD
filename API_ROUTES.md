# 📘 SIMPEG Backend — API Route Documentation

> **Base URL:** `http://localhost:3000/api`
>
> **Authentication:** Semua endpoint kecuali `/auth/login`, `/auth/refresh` membutuhkan header:
> ```
> Authorization: Bearer <accessToken>
> ```
>
> **Role yang tersedia:** `Admin`, `Dosen`

---

## 🔐 AUTH — `/api/auth`

| Method | Endpoint | Auth | Role | Keterangan |
|--------|----------|------|------|------------|
| POST | `/auth/login` | ❌ | - | Login, mendapatkan accessToken & refreshToken |
| POST | `/auth/logout` | ❌ | - | Logout, hapus refreshToken |
| POST | `/auth/refresh` | ❌ | - | Refresh accessToken menggunakan refreshToken |

### Request Body Login
```json
{
  "username": "string (NIP pegawai)",
  "password": "string (default: DDMMYYYY tanggal lahir)"
}
```

### Response Login
```json
{
  "accessToken": "string",
  "refreshToken": "string",
  "user": {
    "id": "uuid",
    "username": "string",
    "pegawai_id": "uuid",
    "nama": "string",
    "nip": "string",
    "role": "string"
  }
}
```

---

## 👤 USER — `/api/auth/user`

> Membutuhkan autentikasi. Hanya untuk manajemen akun user.

| Method | Endpoint | Auth | Role | Keterangan |
|--------|----------|------|------|------------|
| GET | `/auth/user` | ✅ | - | Get semua user |
| GET | `/auth/user/:id` | ✅ | - | Get user by ID |
| POST | `/auth/user` | ✅ | - | Buat user baru |
| PUT | `/auth/user/:id` | ✅ | - | Update user |
| DELETE | `/auth/user/:id` | ✅ | - | Hapus user |

---

## 🧑‍💼 PEGAWAI — `/api/pegawai`

| Method | Endpoint | Auth | Role | Keterangan |
|--------|----------|------|------|------------|
| GET | `/pegawai` | ✅ | Admin | Get semua data pegawai |
| POST | `/pegawai` | ✅ | Admin | Tambah pegawai baru (multipart: `file_foto`) |
| GET | `/pegawai/profile` | ✅ | Admin, Dosen | Get profil pegawai yang sedang login |
| PUT | `/pegawai/profile` | ✅ | Admin, Dosen | Update profil mandiri (multipart: `file_foto`) |
| GET | `/pegawai/:id` | ✅ | Admin | Get pegawai by ID |
| PUT | `/pegawai/:id` | ✅ | Admin | Update pegawai by Admin (multipart: `file_foto`) |
| DELETE | `/pegawai/:id` | ✅ | Admin | Hapus pegawai |

### Sub-route: Dokumen Pegawai `/api/pegawai/dokumen-pegawai`

| Method | Endpoint | Auth | Role | Keterangan |
|--------|----------|------|------|------------|
| GET | `/pegawai/dokumen-pegawai` | ✅ | - | Get semua dokumen pegawai |
| GET | `/pegawai/dokumen-pegawai/:id` | ✅ | - | Get dokumen by ID |
| POST | `/pegawai/dokumen-pegawai` | ✅ | - | Upload dokumen (multipart: `files[]` — multiple) |
| PUT | `/pegawai/dokumen-pegawai/:id` | ✅ | - | Update dokumen (multipart: `file` — single) |
| DELETE | `/pegawai/dokumen-pegawai/:id` | ✅ | - | Hapus dokumen |

---

## 📋 VALIDASI (Data Riwayat Pegawai) — `/api/validasi`

> Semua endpoint membutuhkan autentikasi. Endpoint dengan **bulk action** hanya untuk Admin.

### Pattern Umum Semua Sub-module Validasi

| Method | Endpoint | Auth | Role | Keterangan |
|--------|----------|------|------|------------|
| GET | `/{resource}` | ✅ | - | Get semua data |
| GET | `/{resource}/:id` | ✅ | - | Get by ID |
| POST | `/{resource}` | ✅ | - | Tambah data baru |
| PUT | `/{resource}/:id` | ✅ | - | Update data |
| PUT | `/{resource}/bulk-approve` | ✅ | Admin | Approve banyak data sekaligus |
| PUT | `/{resource}/bulk-reject` | ✅ | Admin | Reject banyak data sekaligus |
| DELETE | `/{resource}/bulk-delete` | ✅ | Admin | Hapus banyak data sekaligus |

### Daftar Sub-module Validasi

| Resource | Base Path | Upload Field | Keterangan |
|----------|-----------|-------------|------------|
| Data Pangkat | `/api/validasi/data-pangkat` | `file_pangkat` | Riwayat kepangkatan |
| Data Pendidikan Formal | `/api/validasi/data-pendidikan-formal` | - | Riwayat pendidikan |
| Data Dokumen | `/api/validasi/data-dokumen` | - | Dokumen pegawai |
| Data Hubungan Kerja | `/api/validasi/data-hubungan-kerja` | - | Data hubungan kerja / kontrak |
| Data Jabatan Fungsional | `/api/validasi/data-jabatan-fungsional` | `file_jabatan_fungsional` | Riwayat jabatan fungsional |
| Data Jabatan Struktural | `/api/validasi/data-jabatan-struktural` | `file_jabatan_struktural` | Riwayat jabatan struktural |
| Data Keluarga | `/api/validasi/data-keluarga` | - | Data keluarga pegawai |
| Data Riwayat Pekerjaan | `/api/validasi/data-riwayat-pekerjaan` | - | Riwayat pekerjaan sebelumnya |
| Data Test | `/api/validasi/data-test` | - | Data hasil test |
| Data Sertifikasi | `/api/validasi/data-sertifikasi` | - | Data sertifikasi |
| Data Penelitian | `/api/validasi/data-penelitian` | - | Data penelitian |
| Data Publikasi | `/api/validasi/data-publikasi` | - | Data publikasi ilmiah |
| Data Paten | `/api/validasi/data-paten` | - | Data paten |
| Data Anggota Profesi | `/api/validasi/data-anggota-profesi` | - | Keanggotaan profesi |
| Data Penghargaan | `/api/validasi/data-penghargaan` | - | Data penghargaan |
| Data Penunjang Lainnya | `/api/validasi/data-penunjang-lainnya` | - | Data penunjang lainnya |
| Data Organisasi | `/api/validasi/data-organisasi` | - | Keikutsertaan organisasi |
| Data Kemampuan Bahasa | `/api/validasi/data-kemampuan-bahasa` | - | Kemampuan bahasa asing |
| Data Pelanggaran | `/api/validasi/data-pelanggaran` | - | Riwayat pelanggaran |

---

## 🕐 ABSENSI — `/api/absensi`

### Absensi Record — `/api/absensi/absensi`

| Method | Endpoint | Auth | Role | Keterangan |
|--------|----------|------|------|------------|
| GET | `/absensi/absensi` | ✅ | ADMIN | Get semua absensi (query: `tgl_mulai`, `tgl_selesai`, `bulan`, `tahun`, `pegawai_id`) |
| GET | `/absensi/absensi/today` | ✅ | ADMIN, PEGAWAI | Get status absensi hari ini (user yg login) |
| GET | `/absensi/absensi/me` | ✅ | ADMIN, PEGAWAI | Get history absensi sendiri (query: `tgl_mulai`, `tgl_selesai`, `bulan`, `tahun`) |
| GET | `/absensi/absensi/:id` | ✅ | ADMIN, PEGAWAI | Get absensi by ID |
| POST | `/absensi/absensi/masuk` | ✅ | ADMIN, PEGAWAI | Clock-in (multipart: `foto_masuk`) |
| POST | `/absensi/absensi/keluar` | ✅ | ADMIN, PEGAWAI | Clock-out (multipart: `foto_keluar`) |

### Pengajuan Cuti — `/api/absensi/cuti`

| Method | Endpoint | Auth | Role | Keterangan |
|--------|----------|------|------|------------|
| GET | `/absensi/cuti` | ✅ | ADMIN, PEGAWAI | Get data cuti (scoped by role) |
| GET | `/absensi/cuti/:id` | ✅ | - | Get cuti by ID |
| POST | `/absensi/cuti` | ✅ | - | Pengajuan cuti baru |
| PUT | `/absensi/cuti/:id/approve` | ✅ | ADMIN, PEGAWAI | Approve pengajuan cuti |
| PUT | `/absensi/cuti/:id/reject` | ✅ | ADMIN, PEGAWAI | Reject pengajuan cuti |
| DELETE | `/absensi/cuti/:id` | ✅ | - | Hapus data cuti |

### Pengajuan Izin — `/api/absensi/izin`

| Method | Endpoint | Auth | Role | Keterangan |
|--------|----------|------|------|------------|
| GET | `/absensi/izin` | ✅ | ADMIN, PEGAWAI | Get data izin (scoped by role) |
| GET | `/absensi/izin/:id` | ✅ | - | Get izin by ID |
| POST | `/absensi/izin` | ✅ | - | Pengajuan izin baru |
| PUT | `/absensi/izin/:id/approve` | ✅ | ADMIN, PEGAWAI | Approve pengajuan izin |
| PUT | `/absensi/izin/:id/reject` | ✅ | ADMIN, PEGAWAI | Reject pengajuan izin |
| DELETE | `/absensi/izin/:id` | ✅ | - | Hapus data izin |

### Setting Absensi — `/api/absensi/setting-absensi`

| Method | Endpoint | Auth | Role | Keterangan |
|--------|----------|------|------|------------|
| GET | `/absensi/setting-absensi` | ✅ | ADMIN | Get semua setting absensi |
| GET | `/absensi/setting-absensi/:id` | ✅ | - | Get setting by ID |
| POST | `/absensi/setting-absensi` | ✅ | ADMIN | Buat setting absensi baru |
| PUT | `/absensi/setting-absensi/:id` | ✅ | ADMIN | Update setting absensi |
| POST | `/absensi/setting-absensi/:id/regenerate-qr` | ✅ | ADMIN | Regenerate QR Code absensi |
| DELETE | `/absensi/setting-absensi/:id` | ✅ | ADMIN | Hapus setting absensi |

---

## 🗄️ MASTER DATA — `/api/master`

> Pola umum: GET (semua & by ID) bisa diakses siapa saja yang login. POST, PUT, DELETE hanya **Admin**.

| Method | Endpoint | Auth | Role | Keterangan |
|--------|----------|------|------|------------|
| GET | `/{resource}` | ✅ | - | Get semua data master |
| GET | `/{resource}/:id` | ✅ | - | Get by ID |
| POST | `/{resource}` | ✅ | Admin | Tambah data master |
| PUT | `/{resource}/:id` | ✅ | Admin | Update data master |
| DELETE | `/{resource}/:id` | ✅ | Admin | Hapus data master |

### Daftar Sub-module Master Data

| Resource | Base Path | Catatan |
|----------|-----------|---------|
| Agama | `/api/master/agama` | |
| Bahasa | `/api/master/bahasa` | |
| Bank | `/api/master/bank` | |
| Jenis Cuti | `/api/master/cuti` | |
| Daftar Hari Libur | `/api/master/daftar-hari-libur` | |
| Gelar Pendidikan | `/api/master/gelar-pendidikan` | |
| Golongan Darah | `/api/master/golongan-darah` | |
| Hubungan Kerja | `/api/master/hubungan-kerja` | |
| Jabatan Fungsional | `/api/master/jabatan-fungsional` | |
| Jabatan Struktural | `/api/master/jabatan-struktural` | |
| Jenis Hari | `/api/master/jenis-hari` | |
| Jenis Izin | `/api/master/jenis-izin` | |
| Jenis Jabatan Struktural | `/api/master/jenis-jabatan-struktural` | |
| Jenis Kehadiran | `/api/master/jenis-kehadiran` | |
| **Jenis Kenaikan Pangkat** | `/api/master/jenis-kenaikan-pangkat` | 🆕 |
| **Jenis Luaran** | `/api/master/jenis-luaran` | 🆕 body: `kode`, `jenis_luaran` |
| Jenis Pelanggaran | `/api/master/jenis-pelanggaran` | |
| Jenis Penghargaan | `/api/master/jenis-penghargaan` | |
| Jenis Publikasi | `/api/master/jenis-publikasi` | |
| Jenis Sertifikasi | `/api/master/jenis-sertifikasi` | |
| Jenis SK | `/api/master/jenis-sk` | |
| Jenis Test | `/api/master/jenis-test` | |
| Jenjang Pendidikan | `/api/master/jenjang-pendidikan` | |
| **Output Penelitian** | `/api/master/output-penelitian` | 🆕 |
| Pangkat | `/api/master/pangkat` | |
| Pekerjaan | `/api/master/pekerjaan` | |
| Role | `/api/master/role` | |
| Rumpun Bidang Ilmu | `/api/master/rumpun-bidang-ilmu` | |
| Status Aktif | `/api/master/status-aktif` | |
| **Status Pernikahan** | `/api/master/status-pernikahan` | 🆕 |
| **Suku** | `/api/master/suku` | 🆕 body: `nama` saja (tidak ada `kode`) |
| Unit Kerja | `/api/master/unit-kerja` | |
| Universitas | `/api/master/universitas` | |
| Universitas Prodi | `/api/master/universitas-prodi` | |

---

## 📌 Catatan Penting untuk Frontend

### 1. Format Request Multipart/Form-Data
Untuk endpoint yang menerima file upload, gunakan `Content-Type: multipart/form-data`. Contoh dengan `fetch`:
```js
const formData = new FormData();
formData.append('nama', 'John Doe');
formData.append('file_foto', fileInput.files[0]);

fetch('/api/pegawai', {
  method: 'POST',
  headers: { Authorization: `Bearer ${token}` },
  body: formData
});
```

### 2. Format Response Standar
Semua endpoint mengembalikan format response yang konsisten:
```json
{
  "status": 200,
  "message": "string",
  "data": {},
  "errors": null
}
```

### 3. Error Codes
| Code | Keterangan |
|------|------------|
| 400 | Bad Request — validasi input gagal |
| 401 | Unauthorized — token tidak ada atau tidak valid |
| 403 | Forbidden — role tidak memiliki akses |
| 404 | Not Found — data tidak ditemukan |
| 500 | Internal Server Error |

### 4. Bulk Action Request Body
Untuk endpoint bulk-approve / bulk-reject / bulk-delete:
```json
{
  "ids": ["uuid1", "uuid2", "uuid3"]
}
```

### 5. Cara Refresh Token
Ketika menerima error 401, lakukan refresh token:
```js
const res = await fetch('/api/auth/refresh', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ refreshToken: '<refreshToken>' })
});
const { accessToken } = await res.json();
```
