# Agent Instructions: Refactor Validasi Data Pages

## Context
This project is a HRIS (Human Resource Information System) built with:
- **Frontend**: React + TypeScript, TanStack Query, React Hook Form + Zod, shadcn/ui, Tailwind CSS, React Router DOM, Axios
- **Backend**: Node.js + Express + Sequelize (PostgreSQL)

---

## Reference Implementation (ALREADY CORRECT — DO NOT MODIFY)
`HubunganKerjaKepegawaian.tsx` (admin list page) is the gold standard.
`TambahHubunganKerja.tsx` (admin tambah page) is the gold standard for form creation.
`DetailHubunganKerja.tsx` (admin detail page) is the gold standard for detail view.

Study these three files carefully before touching anything else.

---

## Core Rules (Apply to ALL pages)

### 1. API Response Shape
Every paginated endpoint returns:
```json
{
  "success": true,
  "data": {
    "items": [],
    "pagination": {
      "total": 10,
      "page": 1,
      "limit": 10,
      "totalPages": 1,
      "hasNextPage": true,
      "hasPrevPage": false
    }
  }
}
```

Axios wraps this in `.data`, so in queryFn always do:
```typescript
const response = await someService.getData(params);
return response.data.data; // returns { items, pagination }
```

Then type the query as `useQuery<PaginatedData>` where:
```typescript
interface PaginatedData {
  items: YourItemType[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}
```

Access data as:
```typescript
const items = rawData?.items ?? [];
const pagination = rawData?.pagination;
```

### 2. CustomPagination — New API
The `CustomPagination` component has been refactored. Use ONLY this props signature:
```tsx
<CustomPagination
  pagination={rawData?.pagination}
  onPageChange={(page) => handleUrlChange("page", String(page))}
/>
```

NEVER use the old props: `links`, `hasNextPage`, `hasPrevPage`, `totalPages`, `currentPage`.
If you see these old props anywhere, replace them with the new `pagination` prop.

### 3. URL-based Filters
All filters must be stored in URL search params (not local state) so they survive refresh and are shareable.
```typescript
const handleUrlChange = useCallback((paramName: string, value: string) => {
  const next = new URLSearchParams(searchParam);
  if (value && value !== "semua") {
    next.set(paramName, value);
  } else {
    next.delete(paramName);
  }
  if (paramName !== "page") next.set("page", "1"); // reset page on filter change
  setSearchParam(next);
}, [searchParam, setSearchParam]);
```

Every active filter must be in the `queryKey` array so React Query refetches automatically.

### 4. Status Filter — "Semua" handling
```typescript
// Read from URL — empty string means "all"
const statusFilter = searchParam.get("status") ?? "";

// In queryFn — only send if has value
if (statusFilter && statusFilter !== "semua") params.status = statusFilter;

// In Select component
<Select
  value={statusFilter || "semua"}
  onValueChange={(v) => handleUrlChange("status", v)}
>
  <SelectItem value="semua">Semua Status</SelectItem>
  ...
</Select>
```

Do NOT set a default status via useEffect. Let empty = semua.

### 5. active_mode Header (Critical for Admin acting as Pegawai)
The axios interceptor already sends `X-Active-Mode` header from localStorage.
Backend reads this via `req.activeMode` (set by `attachActiveMode` middleware).
Service checks:
```javascript
const isActingAsPegawai = activeMode === 'pegawai';
if (!isAdminRole || isActingAsPegawai) {
  extra.pegawai_id = userSession.pegawai_id; // scope to own data
}
```

### 6. Params — only send non-empty values
```typescript
const params: Record<string, string> = {
  page: currentPage,
  limit: "10",
};
if (statusFilter && statusFilter !== "semua") params.status = statusFilter;
if (debouncedInput) params.search = debouncedInput;
if (startDate) params.start_date = startDate;
if (endDate) params.end_date = endDate;
if (unitKerjaId) params.unit_kerja_id = unitKerjaId;
```

Never send empty string params to backend.

### 7. Service functions — no nested params
```typescript
// WRONG — causes page[is_dropdown]=true
params: { page: { is_dropdown: true } }

// CORRECT
params: { is_dropdown: true }

// CORRECT — dropdown endpoint
getStatusAktif: () =>
  axiosInstance.get(`${endpoint.ADMIN}/status-aktif`, {
    params: { is_dropdown: true }
  }),
```

---

## Standard Filters for Admin Validasi Pages
Every admin validasi page should have these filters unless the data type doesn't support it:
1. **Status** — dropdown: semua / diajukan / disetujui / ditolak / draft
2. **Unit Kerja** — dropdown fetched from `getMasterUnitKerja({ is_dropdown: true })`
3. **Tanggal Mulai Pengajuan** — `start_date`, filters by `created_at` on the record
4. **Tanggal Akhir Pengajuan** — `end_date`, filters by `created_at` on the record
5. **Search** — searches pegawai nama via debounced input (500ms), sent as `search` param

---

## Standard Admin Validasi Page Structure
```tsx
const SomePage = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const queryClient = useQueryClient();

  const [searchData, setSearchData] = useState(searchParam.get("search") || "");
  const [debouncedInput] = useDebounce(searchData, 500);
  const [selectedItem, setSelectedItem] = useState<string[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isFileDialogOpen, setIsFileDialogOpen] = useState(false);
  const [selectedDokumen, setSelectedDokumen] = useState<Dokumen[]>([]);
  const [pendingAction, setPendingAction] = useState<ActionType | null>(null);

  // Read all filters from URL
  const currentPage = searchParam.get("page") || "1";
  const statusFilter = searchParam.get("status") ?? "";
  const startDate = searchParam.get("start_date") || "";
  const endDate = searchParam.get("end_date") || "";
  const unitKerjaId = searchParam.get("unit_kerja_id") || "";

  // Query with ALL filters in queryKey
  const { data: rawData, isLoading, isError, error } = useQuery<PaginatedData>({
    queryKey: ["some-key", currentPage, debouncedInput, statusFilter, startDate, endDate, unitKerjaId],
    queryFn: async () => {
      const params: Record<string, string> = { page: currentPage, limit: "10" };
      if (statusFilter && statusFilter !== "semua") params.status = statusFilter;
      if (debouncedInput) params.search = debouncedInput;
      if (startDate) params.start_date = startDate;
      if (endDate) params.end_date = endDate;
      if (unitKerjaId) params.unit_kerja_id = unitKerjaId;
      const response = await adminServices.getSomeData(params);
      return response.data.data;
    },
    placeholderData: (prev) => prev,
  });

  // Unit kerja dropdown
  const { data: unitKerjaOptions } = useQuery<{ id: string; nama: string }[]>({
    queryKey: ["master-unit-kerja"],
    queryFn: async () => {
      const response = await adminServices.getUnitKerja({ is_dropdown: true });
      return response.data.data.items ?? [];
    },
  });

  const items = rawData?.items ?? [];
  const pagination = rawData?.pagination;

  const handleUrlChange = useCallback((paramName: string, value: string) => {
    const next = new URLSearchParams(searchParam);
    if (value && value !== "semua") next.set(paramName, value);
    else next.delete(paramName);
    if (paramName !== "page") next.set("page", "1");
    setSearchParam(next);
  }, [searchParam, setSearchParam]);

  useEffect(() => {
    handleUrlChange("search", debouncedInput);
  }, [debouncedInput, handleUrlChange]);

  // ... approve/reject mutations same pattern as HubunganKerja

  return (
    <div className="mt-10 mb-20">
      <Title title="..." />

      {/* Filters */}
      <CustomCard title="Filter Data" actions={
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Status */}
          <div className="flex flex-col gap-2">
            <Label>Status Pengajuan</Label>
            <Select value={statusFilter || "semua"} onValueChange={(v) => handleUrlChange("status", v)}>
              <SelectTrigger><SelectValue placeholder="--Pilih Status--" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="semua">Semua Status</SelectItem>
                <SelectItem value="diajukan">Diajukan</SelectItem>
                <SelectItem value="disetujui">Disetujui</SelectItem>
                <SelectItem value="ditolak">Ditolak</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Unit Kerja */}
          <div className="flex flex-col gap-2">
            <Label>Unit Kerja</Label>
            <Select value={unitKerjaId || "semua"} onValueChange={(v) => handleUrlChange("unit_kerja_id", v)}>
              <SelectTrigger><SelectValue placeholder="--Pilih Unit Kerja--" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="semua">Semua Unit Kerja</SelectItem>
                {unitKerjaOptions?.map((uk) => (
                  <SelectItem key={uk.id} value={uk.id}>{uk.nama}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Start Date */}
          <div className="flex flex-col gap-2">
            <Label>Tanggal Mulai Pengajuan</Label>
            <input type="date" className="border rounded-md px-3 py-2 text-sm"
              value={startDate} onChange={(e) => handleUrlChange("start_date", e.target.value)} />
          </div>

          {/* End Date */}
          <div className="flex flex-col gap-2">
            <Label>Tanggal Akhir Pengajuan</Label>
            <input type="date" className="border rounded-md px-3 py-2 text-sm"
              value={endDate} max={new Date().toISOString().split("T")[0]}
              onChange={(e) => handleUrlChange("end_date", e.target.value)} />
          </div>
        </div>
      } />

      {/* Search + Action Buttons */}
      <div className="flex flex-col md:flex-row md:justify-between mt-10 gap-4">
        <SearchInput value={searchData} onChange={(e) => setSearchData(e.target.value)}
          className="w-full md:w-80" placeholder="Cari NIP atau nama pegawai..." />
        <div className="flex gap-2 items-center">
          {selectedItem.length > 0 && (
            <>
              <Button onClick={() => handleOpenDialog("approve")} className="bg-green-600 hover:bg-green-700">
                <FaCheck className="mr-2" /> Setujui ({selectedItem.length})
              </Button>
              <Button onClick={() => handleOpenDialog("reject")} variant="destructive">
                <IoClose className="mr-2" /> Tolak ({selectedItem.length})
              </Button>
            </>
          )}
          <Link to="/admin/validasi-data/.../tambah-...">
            <Button className="bg-green-600 hover:bg-green-700"><FaPlus className="mr-2" /> Tambah Data</Button>
          </Link>
        </div>
      </div>

      {/* Table */}
      <div className="mt-5 border rounded-lg overflow-x-auto">
        <Table className="text-xs lg:text-sm">
          {/* ... */}
        </Table>
      </div>

      {/* Pagination — NEW API */}
      <CustomPagination
        pagination={pagination}
        onPageChange={(page) => handleUrlChange("page", String(page))}
      />

      {/* File Dialog */}
      {/* Approve/Reject Dialog */}
    </div>
  );
};
```

---

## Standard Tambah Data Page (Admin)

Based on `TambahHubunganKerja.tsx`. Key patterns:
```tsx
// 1. Schema with zod
const tambahSchema = z.object({
  pegawai_id: z.string().min(1, "Pegawai wajib dipilih."),
  // ... other fields
});

// 2. Pegawai search via Combobox (Command + Popover)
// Always use this pattern for pegawai selection — never a plain input

// 3. Master data dropdowns via InfiniteScrollSelect
<InfiniteScrollSelect
  form={form}
  label="..."
  name="..."
  queryKey="unique-key"
  queryFn={(page) => dosenServices.getSomeSelect({ page, is_dropdown: true })}
  itemValue="id"
  itemLabel="nama"
/>

// 4. File upload via FormFieldInputFile
<FormFieldInputFile label="File" name="file_field" />

// 5. Submit as FormData (because of file upload)
const onSubmit = (values: TambahSchema) => {
  const formData = new FormData();
  formData.append("field_name", values.field_name);
  // ... append all fields
  if (values.file instanceof FileList && values.file.length > 0) {
    formData.append("file", values.file[0]);
  }
  mutate(formData);
};

// 6. After success, navigate back to list
onSuccess: () => {
  toast.success("Data berhasil ditambahkan.");
  navigate("/admin/validasi-data/.../list-page");
}
```

---

## Standard Detail Page (Admin)

Based on `DetailHubunganKerja.tsx`. Key patterns:
```tsx
// 1. Get id from useParams
const { id } = useParams<{ id: string }>();

// 2. Single item query — response shape is { data: { ...item } }
const { data, isLoading, isError } = useQuery({
  queryKey: ["some-detail", id],
  queryFn: async () => {
    const response = await adminServices.getSomeDetail(id!);
    return response.data; // { success, data: { ...item } }
  },
  enabled: !!id,
});

// 3. Access data as data?.data?.field_name

// 4. Always show Loading skeleton and Error state

// 5. File documents rendered as links
{data?.data?.dokumen?.map((doc: any) => (
  <a key={doc.id} href={doc.url} target="_blank" rel="noreferrer">
    📄 {doc.file_name}
  </a>
))}
```

---

## Backend Patterns

### buildWhereClause utility
Located at `src/shared/utils/buildFilter.js`:
```javascript
const whereClause = buildWhereClause({
  status,
  start_date,
  end_date,
  date_field: 'created_at', // default, override if needed
  extra: { pegawai_id }     // any additional conditions
});
```

### buildPegawaiInclude utility
```javascript
const pegawaiInclude = buildPegawaiInclude(models, {
  search,          // searches pegawai.nama
  unit_kerja_id,   // filters via nested MasterUnitKerja include
  attributes: ['nama', 'nip', 'unit_kerja_id']
});
```

### Service scope pattern
```javascript
export const getAllSomeData = async (userSession, options = {}) => {
  const { page, limit, search, is_export, start_date, end_date, status, unit_kerja_id, activeMode } = options;

  const roleName = userSession?.role?.nama || userSession?.role;
  const isAdminRole = roleName === 'Admin';
  const isActingAsPegawai = activeMode === 'pegawai';

  const extra = {};
  if (!isAdminRole || isActingAsPegawai) {
    if (!userSession.pegawai_id) return { items: [], pagination: null };
    extra.pegawai_id = userSession.pegawai_id;
  }

  const whereClause = buildWhereClause({ status, start_date, end_date, extra });
  // ...
};
```

### Controller pattern
```javascript
export const getSomeData = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', is_export, start_date, end_date, status, unit_kerja_id } = req.query;
    const options = { page, limit, search, is_export, start_date, end_date, status, unit_kerja_id, activeMode: req.activeMode };
    const result = await someService.getAllSomeData(req.user, options);
    return response.success(res, result, 'Data berhasil diambil');
  } catch (error) {
    return response.error(res, error, 'Gagal mengambil data');
  }
};
```

### Middleware — always apply to routes
```javascript
router.get('/', authenticate, attachActiveMode, getController);
```

### formatDokumenUrl — always guard against undefined
```javascript
const formatDokumenUrl = (dataArray) => {
  if (!Array.isArray(dataArray)) return [];
  return dataArray.map(item => {
    const jsonItem = item.toJSON ? item.toJSON() : item;
    if (jsonItem.dokumen && Array.isArray(jsonItem.dokumen)) {
      jsonItem.dokumen = jsonItem.dokumen.map(doc => ({
        ...doc,
        url: getFileUrl(doc.file_path)
      }));
    }
    return jsonItem;
  });
};
```

---

## Pages That Need Updating

Apply all patterns above to these pages (in order of priority):

### 1. JabatanStruktural (admin list) — `JabatanStruktural.tsx`
- Fix response shape: `tableData.data` → `rawData?.items`
- Fix CustomPagination to new props
- Add standard 4 filters (status, unit_kerja, start_date, end_date)
- Remove `filterOptions` from response — filters are now standalone
- Fix checkbox: `tableData.data?.map` → `items.map`

### 2. DetailJabatanStruktural — `DetailJabatanStruktural.tsx`
- Already mostly correct structure
- Verify `data?.data?.field` access matches actual BE response shape

### 3. TambahJabatanStruktural — CREATE THIS FILE
- Same pattern as `TambahHubunganKerja.tsx`
- Fields: pegawai_id (combobox), jabatan_struktural_id (InfiniteScrollSelect), no_sk, tgl_sk, tgl_mulai, tgl_selesai, pejabat_penetap, file
- POST to admin jabatan struktural endpoint

### 4. Every other validasi data page not yet refactored
- Apply same list page pattern
- Create Tambah page if missing
- Verify Detail page response access

---

## Things to NEVER Do
- Never use old CustomPagination props (`links`, `hasNextPage`, `hasPrevPage`, `totalPages` as separate props)
- Never access `rawData?.data?.data` or `rawData?.data?.items` — always return `response.data.data` in queryFn so rawData IS the `{ items, pagination }` object
- Never send empty string params to backend (`if (value) params.key = value`)
- Never put filter state in useState — always URL search params
- Never forget to add all active filters to queryKey
- Never mutate searchParam directly — always `new URLSearchParams(searchParam)` first
- Never use `page[is_dropdown]` — keep params flat
- Never skip the `Array.isArray` guard in `formatDokumenUrl`
- Never rely on role alone to scope data — always check `activeMode` too