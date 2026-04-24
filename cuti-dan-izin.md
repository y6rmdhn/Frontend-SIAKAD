# Agent Migration: Cuti → Pola HubunganKerja

> Dokumen ini mendeskripsikan setiap perubahan yang harus dilakukan pada halaman `Cuti.tsx`
> agar strukturnya seragam dengan `HubunganKerja.tsx` yang sudah benar.
> Tujuan akhir: pagination berfungsi, profil pegawai tidak re-fetch, filter tersambung,
> dan tidak ada error `undefined` variable di dalam `queryFn`.

---

## 1. Pagination — ganti props lama ke props baru

### Masalah
`CustomPagination` di Cuti masih menggunakan props pola Laravel lama:
```tsx
// ❌ SEBELUM — props Laravel paginate
<CustomPagination
  currentPage={Number(searchParam.get("page") || 1)}
  links={data?.links || []}
  onPageChange={(page) => { ... }}
  hasNextPage={!!data?.next_page_url}
  hasPrevPage={!!data?.prev_page_url}
  totalPages={data?.last_page}
/>
```

### Solusi
Ikuti pola HubunganKerja — `CustomPagination` sekarang hanya menerima `pagination` (object) dan `onPageChange`:
```tsx
// ✅ SESUDAH — props baru sesuai BE
const handlePageChange = (page: number) => {
  const next = new URLSearchParams(searchParam);
  next.set("page", String(page));
  setSearchParam(next);
};

<CustomPagination
  pagination={data?.data?.pagination}
  onPageChange={handlePageChange}
/>
```

**Field yang dipakai dari object `pagination`:**
```ts
pagination: {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}
```

---

## 2. InfoList / profil pegawai — pisahkan ke hook terpisah

### Masalah
Cuti mengambil `pegawai_info` dari response data utama (`data?.pegawai_info`).
Akibatnya, profil ikut re-fetch setiap kali filter atau halaman berubah.

### Solusi
Pindahkan ke `usePegawaiProfile()` persis seperti HubunganKerja:
```tsx
// ✅ Tambahkan import
import usePegawaiProfile from "@/hooks/usePegawaiProfile";

// ✅ Di dalam komponen
const { profile } = usePegawaiProfile();

// ✅ InfoList pakai profile, bukan data?.pegawai_info
<InfoList
  items={[
    { label: "NIP",            value: profile?.nip            ?? "-" },
    { label: "Nama",           value: profile?.nama           ?? "-" },
    { label: "Unit Kerja",     value: profile?.unit_kerja     ?? "-" },
    { label: "Status",         value: profile?.status         ?? "-" },
    { label: "Jab. Akademik",  value: profile?.jab_akademik   ?? "-" },
    { label: "Jab. Fungsional",value: profile?.jab_fungsional ?? "-" },
    { label: "Jab. Struktural",value: profile?.jab_struktural ?? "-" },
    { label: "Pendidikan",     value: profile?.pendidikan     ?? "-" },
  ]}
/>
```

---

## 3. Query key & queryFn — hapus variabel undefined

### Masalah
`queryFn` Cuti mereferensikan variabel yang tidak pernah dideklarasikan:
```tsx
// ❌ SEBELUM — variabel hantu
const params: Record<string, string> = {
  page: currentPage,        // currentPage belum dideklarasikan di titik ini
  limit: "10",
  status: statusFilter,     // ❌ tidak ada
  start_date: startDate,    // ❌ tidak ada
  end_date: endDate,        // ❌ tidak ada
  unit_kerja_id: unitKerjaId, // ❌ tidak ada
};
```

### Solusi
Deklarasikan `currentPage` dari `searchParam`, dan bangun params hanya dari filter yang ada di URL:
```tsx
// ✅ SESUDAH
const currentPage = Number(searchParam.get("page") || 1);

const { data, isLoading } = useQuery({
  queryKey: [
    "pengajuan-cuti-dosen",
    searchParam.get("page"),
    searchParam.get("search"),
    searchParam.get("jenis_cuti"),
    searchParam.get("jumlah_cuti"),
    searchParam.get("status_pengajuan"),
  ],
  queryFn: async () => {
    const params: Record<string, string> = {
      page: String(currentPage),
      limit: "10",
    };

    const search      = searchParam.get("search");
    const jenisCuti   = searchParam.get("jenis_cuti");
    const jumlahCuti  = searchParam.get("jumlah_cuti");
    const statusPengajuan = searchParam.get("status_pengajuan");

    if (search)           params.search             = search;
    if (jenisCuti)        params.jenis_cuti         = jenisCuti;
    if (jumlahCuti)       params.jumlah_cuti        = jumlahCuti;
    if (statusPengajuan)  params.status_pengajuan   = statusPengajuan;

    const response = await dosenServices.getDataCuti(params);
    return response.data;
  },
});
```

---

## 4. Struktur response — sesuaikan accessor

### Masalah
Cuti mengakses data dengan tiga tingkat (`data?.data?.data`) karena masih mengasumsi
struktur Laravel Resource Paginate lama.

### Solusi
Sesuaikan dengan struktur baru dari BE. Pertama, tentukan di mana pagination dan items berada
berdasarkan response aktual `dosenServices.getDataCuti`. Pola yang disarankan (sesuaikan jika BE berbeda):

```tsx
// Asumsikan response.data memiliki struktur:
// { items: CutiItem[], pagination: PaginatedMeta, filter_options: {...}, pegawai_info: {...} }

const items = data?.items ?? [];
const pagination = data?.pagination;
```

Jika BE mengembalikan struktur `{ data: { items, pagination }, filter_options, pegawai_info }`,
maka:
```tsx
const items = data?.data?.items ?? [];
const pagination = data?.data?.pagination;
```

**Pastikan** satu sumber kebenaran — jangan campur `data?.data?.data` (lama) dengan
`data?.items` (baru) dalam satu file.

---

## 5. Filter options — sambungkan ke params

### Masalah
Filter options sudah diambil dari `data?.filter_options`, tapi nilai yang dipilih user
(dari `searchParam`) tidak ikut dikirim ke BE karena queryFn tidak membacanya.

### Solusi
Sudah diatasi di poin 3 (queryFn baru membaca `searchParam.get("jenis_cuti")`, dll.).
Pastikan `handleFilterChange` juga tetap ada dan benar:

```tsx
const handleFilterChange = (filterName: string, value: string) => {
  const next = new URLSearchParams(searchParam);
  if (value && value !== "semua") {
    next.set(filterName, value);
  } else {
    next.delete(filterName);
  }
  next.set("page", "1");
  setSearchParam(next);
};
```

---

## 6. Kolom tabel — pertimbangkan hardcode

### Masalah
Header tabel Cuti dibuat dari `data?.table_columns.map(...)` yang bergantung pada response BE.
Jika BE lambat atau gagal, header tidak muncul dan kolom body tidak sejajar.

### Rekomendasi
Sama seperti HubunganKerja, hardcode `<TableHead>` agar UI tidak bergantung pada response:

```tsx
// ✅ Hardcode — tidak perlu nunggu data
<TableHeader>
  <TableRow className="bg-[#002E5A]">
    <TableHead className="text-center text-white">No. Urut</TableHead>
    <TableHead className="text-center text-white">Jenis Cuti</TableHead>
    <TableHead className="text-center text-white">Tgl. Mulai</TableHead>
    <TableHead className="text-center text-white">Tgl. Selesai</TableHead>
    <TableHead className="text-center text-white">Jumlah</TableHead>
    <TableHead className="text-center text-white">Alasan</TableHead>
    <TableHead className="text-center text-white">Status</TableHead>
    <TableHead className="text-center text-white">Aksi</TableHead>
  </TableRow>
</TableHeader>
```

---

## 7. useEffect guards — sederhanakan

### Masalah
Cuti memiliki 4 `useEffect` terpisah untuk page guard, yang saling berpotensi konflik.

### Solusi
Satukan menjadi satu `useEffect` seperti pola HubunganKerja:

```tsx
// ✅ Satu useEffect untuk inisialisasi page
useEffect(() => {
  if (!searchParam.get("page")) {
    const next = new URLSearchParams(searchParam);
    next.set("page", "1");
    setSearchParam(next);
  }
}, [searchParam, setSearchParam]);
```

Guard `last_page` (efek ke-4) bisa dipertahankan jika diperlukan, tapi pastikan
variabel `data?.last_page` diganti ke `data?.pagination?.totalPages`.

---

## Checklist ringkas

| # | Yang diubah | File |
|---|---|---|
| 1 | Ganti props `CustomPagination` ke `{ pagination, onPageChange }` | `Cuti.tsx` |
| 2 | Pakai `usePegawaiProfile()` untuk InfoList | `Cuti.tsx` |
| 3 | Deklarasikan `currentPage`, hapus variabel undefined dari `queryFn` | `Cuti.tsx` |
| 4 | Sesuaikan accessor response dengan struktur BE baru | `Cuti.tsx` |
| 5 | Verifikasi filter params tersambung ke `queryFn` | `Cuti.tsx` |
| 6 | Hardcode `<TableHead>` (opsional tapi disarankan) | `Cuti.tsx` |
| 7 | Sederhanakan `useEffect` guards | `Cuti.tsx` |

---

## Catatan untuk halaman lain

Halaman yang masih menggunakan pola lama (props `links[]`, `last_page`, `pegawai_info` dari response)
perlu migrasi yang sama. Urutan prioritas:

1. Perbaiki **Cuti.tsx** dulu sebagai pilot.
2. Gunakan file ini sebagai template checklist untuk halaman berikutnya.
3. Setelah `CustomPagination` props-nya stabil, pastikan semua halaman menggunakan
   signature yang sama agar tidak ada inkonsistensi.