import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, Pencil, Plus, RefreshCw, RotateCcw, Save, Search, Send, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import keuanganServices, {
  ItemSlip,
  PenerimaSlip,
  StatusKirim,
} from "@/services/keuangan.services";

const rupiah = (n: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: Number.isInteger(n) ? 0 : 2,
  }).format(n);

const tgl = (v: string | null) =>
  v
    ? new Date(v).toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" })
    : "-";

const pesanError = (e: unknown, cadangan: string) => {
  const m = (e as { response?: { data?: { message?: string } } })?.response?.data?.message;
  return m || cadangan;
};

const StatusBadge = ({ status, error }: { status: StatusKirim; error?: string | null }) => {
  const map: Record<StatusKirim, { label: string; cls: string }> = {
    pending: { label: "Menunggu", cls: "bg-slate-100 text-slate-700" },
    terkirim: { label: "Terkirim", cls: "bg-green-100 text-green-700" },
    gagal: { label: "Gagal", cls: "bg-red-100 text-red-700" },
    dilewati: { label: "Dilewati", cls: "bg-amber-100 text-amber-700" },
  };
  const m = map[status] ?? map.pending;
  return (
    <Badge variant="outline" className={`border-0 ${m.cls}`} title={error ?? undefined}>
      {m.label}
    </Badge>
  );
};

// ── Pilih penerima + isi nominal/keterangan ──────────────────────────────────
const FormTambah = ({ onDone }: { onDone: () => void }) => {
  const [kata, setKata] = useState("");
  const [q, setQ] = useState("");
  const [dipilih, setDipilih] = useState<Record<string, PenerimaSlip>>({});
  const [nominal, setNominal] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [nomorRekening, setNomorRekening] = useState("");
  const [bankName, setBankName] = useState("");
  const [noRef, setNoRef] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setQ(kata.trim()), 350);
    return () => clearTimeout(t);
  }, [kata]);

  const { data: hasil = [], isFetching } = useQuery({
    queryKey: ["slip-penerima", q],
    queryFn: () => keuanganServices.cariPenerima({ q, limit: 30 }),
  });

  const tambah = useMutation({
    mutationFn: () =>
      keuanganServices.tambahItems(
        Object.keys(dipilih).map((id) => ({
          pegawai_id: id,
          nominal,
          keterangan: keterangan.trim(),
          ...(nomorRekening.trim() && { nomor_rekening: nomorRekening.trim() }),
          ...(bankName.trim() && { bank_name: bankName.trim() }),
          ...(noRef.trim() && { no_ref: noRef.trim() }),
        }))
      ),
    onSuccess: () => {
      toast.success(`${Object.keys(dipilih).length} penerima ditambahkan ke draft.`);
      setDipilih({});
      setNominal("");
      setKeterangan("");
      setNomorRekening("");
      setBankName("");
      setNoRef("");
      onDone();
    },
    onError: (e) => toast.error(pesanError(e, "Gagal menambahkan ke draft.")),
  });

  const jumlah = Object.keys(dipilih).length;
  const siap = jumlah > 0 && nominal.trim() !== "" && keterangan.trim() !== "";

  const toggle = (p: PenerimaSlip) =>
    setDipilih((s) => {
      const n = { ...s };
      if (n[p.id]) delete n[p.id];
      else n[p.id] = p;
      return n;
    });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">1. Pilih penerima (dosen / staf)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            className="pl-9"
            placeholder="Cari nama / NIP / NIDN…"
            value={kata}
            onChange={(e) => setKata(e.target.value)}
          />
        </div>

        <div className="max-h-64 overflow-y-auto rounded-md border">
          {isFetching && (
            <p className="p-3 text-sm text-muted-foreground">Memuat…</p>
          )}
          {!isFetching && hasil.length === 0 && (
            <p className="p-3 text-sm text-muted-foreground">Tidak ada pegawai ditemukan.</p>
          )}
          {hasil.map((p) => (
            <label
              key={p.id}
              className="flex cursor-pointer items-center gap-3 border-b px-3 py-2 last:border-b-0 hover:bg-muted/50"
            >
              <Checkbox checked={!!dipilih[p.id]} onCheckedChange={() => toggle(p)} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{p.nama}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {[p.nip || p.nidn, p.role, p.unit_kerja].filter(Boolean).join(" • ") || "-"}
                </p>
              </div>
              {!p.email && (
                <Badge variant="outline" className="border-0 bg-amber-100 text-amber-700">
                  tanpa email
                </Badge>
              )}
            </label>
          ))}
        </div>

        {jumlah > 0 && (
          <div className="flex flex-wrap gap-2">
            {Object.values(dipilih).map((p) => (
              <Badge key={p.id} variant="secondary" className="gap-1">
                {p.nama}
                <button
                  type="button"
                  aria-label={`Hapus ${p.nama}`}
                  onClick={() => toggle(p)}
                  className="ml-1 text-xs"
                >
                  ×
                </button>
              </Badge>
            ))}
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="nominal">2. Nominal (Rp)</Label>
            <Input
              id="nominal"
              inputMode="decimal"
              placeholder="mis. 1.500.000"
              value={nominal}
              onChange={(e) => setNominal(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="keterangan">3. Keterangan</Label>
            <Textarea
              id="keterangan"
              rows={2}
              maxLength={500}
              placeholder="mis. Honor mengajar semester ganjil"
              value={keterangan}
              onChange={(e) => setKeterangan(e.target.value)}
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="nomor-rekening">Nomor Rekening (opsional)</Label>
            <Input
              id="nomor-rekening"
              placeholder="Kosongkan = pakai data pegawai"
              value={nomorRekening}
              onChange={(e) => setNomorRekening(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bank-name">Nama Bank (opsional)</Label>
            <Input
              id="bank-name"
              placeholder="Kosongkan = pakai data pegawai"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="no-ref">Nomor Referensi (opsional)</Label>
            <Input
              id="no-ref"
              placeholder="mis. no bukti transfer"
              value={noRef}
              onChange={(e) => setNoRef(e.target.value)}
            />
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          Nominal & keterangan yang sama diterapkan ke semua penerima terpilih. Bisa diubah per
          baris di draft. Rekening/bank/referensi kosong akan otomatis memakai data rekening
          pegawai. Ulangi untuk penerima lain dengan nominal berbeda.
        </p>

        <Button disabled={!siap || tambah.isPending} onClick={() => tambah.mutate()}>
          {tambah.isPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Plus className="mr-2 h-4 w-4" />
          )}
          Tambahkan ke draft ({jumlah})
        </Button>
      </CardContent>
    </Card>
  );
};

// ── Draft + tombol kirim ─────────────────────────────────────────────────────
const DraftCard = () => {
  const qc = useQueryClient();
  const [judul, setJudul] = useState("");
  const [edit, setEdit] = useState<ItemSlip | null>(null);
  const [eNominal, setENominal] = useState("");
  const [eKet, setEKet] = useState("");
  const [eRekening, setERekening] = useState("");
  const [eBank, setEBank] = useState("");
  const [eRef, setERef] = useState("");
  const [konfirmasi, setKonfirmasi] = useState(false);
  const [kosongkanOpen, setKosongkanOpen] = useState(false);

  const draftQ = useQuery({
    queryKey: ["slip-draft"],
    queryFn: () => keuanganServices.getDraft(),
  });
  const refresh = () => {
    qc.invalidateQueries({ queryKey: ["slip-draft"] });
    qc.invalidateQueries({ queryKey: ["slip-riwayat"] });
  };

  const hapus = useMutation({
    mutationFn: (id: string) => keuanganServices.hapusItem(id),
    onSuccess: refresh,
    onError: (e) => toast.error(pesanError(e, "Gagal menghapus baris.")),
  });
  const ubah = useMutation({
    mutationFn: () =>
      keuanganServices.ubahItem(edit!.id, {
        nominal: eNominal,
        keterangan: eKet.trim(),
        nomor_rekening: eRekening.trim(),
        bank_name: eBank.trim(),
        no_ref: eRef.trim(),
      }),
    onSuccess: () => {
      setEdit(null);
      refresh();
    },
    onError: (e) => toast.error(pesanError(e, "Gagal menyimpan perubahan.")),
  });
  const kosongkan = useMutation({
    mutationFn: () => keuanganServices.kosongkanDraft(),
    onSuccess: () => {
      setKosongkanOpen(false);
      refresh();
    },
    onError: (e) => toast.error(pesanError(e, "Gagal mengosongkan draft.")),
  });
  const kirim = useMutation({
    mutationFn: () => keuanganServices.kirim(judul.trim() || undefined),
    onSuccess: (r) => {
      setKonfirmasi(false);
      setJudul("");
      refresh();
      const e = r.hasil.email;
      const p = r.hasil.push;
      toast.success(
        `Slip diproses. Email: ${e.terkirim || 0} terkirim, ${e.gagal || 0} gagal. ` +
          `Push UCL: ${p.terkirim || 0} terkirim, ${p.gagal || 0} gagal.`
      );
    },
    onError: (e) => {
      setKonfirmasi(false);
      toast.error(pesanError(e, "Gagal mengirim slip."));
    },
  });

  const draft = draftQ.data;
  const items = draft?.items ?? [];
  const ring = draft?.ringkasan;

  const bukaEdit = (it: ItemSlip) => {
    setEdit(it);
    setENominal(String(it.nominal));
    setEKet(it.keterangan);
    setERekening(it.no_rekening ?? "");
    setEBank(it.nama_bank ?? "");
    setERef(it.no_ref ?? "");
  };

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base">Draft pengiriman</CardTitle>
        {items.length > 0 && (
          <Button variant="ghost" size="sm" onClick={() => setKosongkanOpen(true)}>
            <Trash2 className="mr-1 h-4 w-4" /> Kosongkan
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="overflow-x-auto rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Penerima</TableHead>
                <TableHead className="text-right">Nominal</TableHead>
                <TableHead>Keterangan</TableHead>
                <TableHead>Rekening Tujuan</TableHead>
                <TableHead className="w-24" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {draftQ.isLoading && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground">
                    Memuat…
                  </TableCell>
                </TableRow>
              )}
              {!draftQ.isLoading && items.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground">
                    Draft kosong. Pilih penerima di atas lalu tambahkan.
                  </TableCell>
                </TableRow>
              )}
              {items.map((it) => (
                <TableRow key={it.id}>
                  <TableCell>
                    <p className="font-medium">{it.nama}</p>
                    <p className="text-xs text-muted-foreground">
                      {it.nip || it.nidn || "-"}
                      {!it.email && " • tanpa email"}
                    </p>
                  </TableCell>
                  <TableCell className="text-right whitespace-nowrap">{rupiah(it.nominal)}</TableCell>
                  <TableCell className="max-w-xs whitespace-pre-wrap break-words">
                    {it.keterangan}
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-sm">
                    {it.nama_bank && it.no_rekening ? (
                      <>
                        {it.nama_bank} {it.no_rekening}
                      </>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Ubah"
                        onClick={() => bukaEdit(it)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Hapus"
                        disabled={hapus.isPending}
                        onClick={() => hapus.mutate(it.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {ring && items.length > 0 && (
          <p className="text-sm">
            <b>{ring.jumlah_penerima}</b> penerima • <b>{ring.jumlah_item}</b> baris • total{" "}
            <b>{rupiah(ring.total_nominal)}</b>
          </p>
        )}

        <div className="flex flex-col gap-3 md:flex-row md:items-end">
          <div className="flex-1 space-y-2">
            <Label htmlFor="judul">Judul pengiriman (opsional)</Label>
            <Input
              id="judul"
              maxLength={150}
              placeholder="mis. Honor November 2026"
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
            />
          </div>
          <Button
            disabled={items.length === 0 || kirim.isPending}
            onClick={() => setKonfirmasi(true)}
          >
            {kirim.isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Send className="mr-2 h-4 w-4" />
            )}
            Kirim (email + push UCL)
          </Button>
        </div>
      </CardContent>

      <Dialog open={!!edit} onOpenChange={(o) => !o && setEdit(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ubah baris — {edit?.nama}</DialogTitle>
            <DialogDescription>Perubahan hanya berlaku pada draft ini.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div className="space-y-2">
              <Label>Nominal (Rp)</Label>
              <Input inputMode="decimal" value={eNominal} onChange={(e) => setENominal(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Keterangan</Label>
              <Textarea rows={3} maxLength={500} value={eKet} onChange={(e) => setEKet(e.target.value)} />
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Nomor Rekening</Label>
                <Input value={eRekening} onChange={(e) => setERekening(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Nama Bank</Label>
                <Input value={eBank} onChange={(e) => setEBank(e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Nomor Referensi</Label>
              <Input value={eRef} onChange={(e) => setERef(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEdit(null)}>
              Batal
            </Button>
            <Button disabled={ubah.isPending || !eNominal.trim() || !eKet.trim()} onClick={() => ubah.mutate()}>
              Simpan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={konfirmasi} onOpenChange={setKonfirmasi}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Kirim slip sekarang?</AlertDialogTitle>
            <AlertDialogDescription>
              Slip dikirim ke email dan notifikasi push UCL Mobile untuk{" "}
              {ring?.jumlah_penerima ?? 0} penerima (total {rupiah(ring?.total_nominal ?? 0)}).
              Setelah dikirim, draft tidak dapat diubah.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                kirim.mutate();
              }}
            >
              Ya, kirim
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={kosongkanOpen} onOpenChange={setKosongkanOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Kosongkan draft?</AlertDialogTitle>
            <AlertDialogDescription>Semua baris di draft akan dihapus.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                kosongkan.mutate();
              }}
            >
              Kosongkan
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
};

// ── Riwayat ──────────────────────────────────────────────────────────────────
const Riwayat = () => {
  const qc = useQueryClient();
  const [detailId, setDetailId] = useState<string | null>(null);

  const listQ = useQuery({
    queryKey: ["slip-riwayat"],
    queryFn: () => keuanganServices.getRiwayat({ limit: 50 }),
  });
  const detailQ = useQuery({
    queryKey: ["slip-riwayat", detailId],
    queryFn: () => keuanganServices.getDetailRiwayat(detailId!),
    enabled: !!detailId,
  });
  const ulang = useMutation({
    mutationFn: (id: string) => keuanganServices.kirimUlang(id),
    onSuccess: (r) => {
      toast.success(r.diulang ? `${r.diulang} pengiriman diulang.` : "Tidak ada yang gagal.");
      qc.invalidateQueries({ queryKey: ["slip-riwayat"] });
    },
    onError: (e) => toast.error(pesanError(e, "Gagal mengirim ulang.")),
  });

  const list = listQ.data ?? [];
  const detail = detailQ.data;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Riwayat pengiriman</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Dikirim</TableHead>
                <TableHead>Judul</TableHead>
                <TableHead className="text-right">Penerima</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {!listQ.isLoading && list.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground">
                    Belum ada pengiriman.
                  </TableCell>
                </TableRow>
              )}
              {list.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="whitespace-nowrap">{tgl(r.dikirim_pada)}</TableCell>
                  <TableCell>{r.judul || "-"}</TableCell>
                  <TableCell className="text-right">{r.jumlah_penerima}</TableCell>
                  <TableCell className="text-right whitespace-nowrap">{rupiah(r.total_nominal)}</TableCell>
                  <TableCell>
                    {r.jumlah_gagal > 0 ? (
                      <Badge variant="outline" className="border-0 bg-red-100 text-red-700">
                        {r.jumlah_gagal} gagal
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="border-0 bg-green-100 text-green-700">
                        Selesai
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" onClick={() => setDetailId(r.id)}>
                      Detail
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      <Dialog open={!!detailId} onOpenChange={(o) => !o && setDetailId(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{detail?.judul || "Detail pengiriman"}</DialogTitle>
            <DialogDescription>
              {detail ? `${tgl(detail.dikirim_pada)} • total ${rupiah(detail.ringkasan.total_nominal)}` : "Memuat…"}
            </DialogDescription>
          </DialogHeader>
          <div className="max-h-96 overflow-auto rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Penerima</TableHead>
                  <TableHead className="text-right">Nominal</TableHead>
                  <TableHead>Rekening Tujuan</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Push UCL</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {detail?.items.map((it) => (
                  <TableRow key={it.id}>
                    <TableCell>
                      <p className="font-medium">{it.nama}</p>
                      <p className="text-xs text-muted-foreground">{it.keterangan}</p>
                    </TableCell>
                    <TableCell className="text-right whitespace-nowrap">{rupiah(it.nominal)}</TableCell>
                    <TableCell className="whitespace-nowrap text-sm">
                      {it.nama_bank && it.no_rekening ? `${it.nama_bank} ${it.no_rekening}` : "-"}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={it.email_status} error={it.email_error} />
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={it.push_status} error={it.push_error} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDetailId(null)}>
              Tutup
            </Button>
            {detail && detail.items.some((i) => i.email_status === "gagal" || i.push_status === "gagal") && (
              <Button disabled={ulang.isPending} onClick={() => ulang.mutate(detail.id)}>
                {ulang.isPending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="mr-2 h-4 w-4" />
                )}
                Kirim ulang yang gagal
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

// ── Template pesan (kalimat utama surat, pakai variabel) ─────────────────────
const DATA_CONTOH: Record<string, string> = {
  nama: "Budi Santoso",
  instansi: "UNIVERSITAS IBN KHALDUN BOGOR",
  nominal: "500.000",
  bank: "BSI",
  no_rekening: "7123456789",
  no_ref: "REF-001",
  tanggal: "18 November 2026",
  judul: "Honor November 2026",
  keterangan: "Honor mengajar semester ganjil",
};

const renderPratinjau = (template: string) =>
  template.replace(/\{\{\s*([a-z_]+)\s*\}\}/gi, (full, key) => DATA_CONTOH[key] ?? full);

const TemplatePesan = () => {
  const qc = useQueryClient();
  const [isi, setIsi] = useState("");
  const [dimuat, setDimuat] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const q = useQuery({
    queryKey: ["slip-template"],
    queryFn: () => keuanganServices.getTemplate(),
  });

  useEffect(() => {
    if (q.data && !dimuat) {
      setIsi(q.data.template);
      setDimuat(true);
    }
  }, [q.data, dimuat]);

  const simpan = useMutation({
    mutationFn: () => keuanganServices.simpanTemplate(isi.trim()),
    onSuccess: (r) => {
      toast.success("Template pesan disimpan.");
      qc.setQueryData(["slip-template"], r);
    },
    onError: (e) => toast.error(pesanError(e, "Gagal menyimpan template.")),
  });

  const sisipkan = (key: string) => {
    const token = `{{${key}}}`;
    const el = textareaRef.current;
    if (!el) {
      setIsi((s) => s + token);
      return;
    }
    const start = el.selectionStart ?? isi.length;
    const end = el.selectionEnd ?? isi.length;
    const baru = isi.slice(0, start) + token + isi.slice(end);
    setIsi(baru);
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(start + token.length, start + token.length);
    });
  };

  const berubah = q.data ? isi.trim() !== q.data.template : false;

  if (q.isLoading) {
    return (
      <Card>
        <CardContent className="pt-6 text-center text-muted-foreground">Memuat…</CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Template Pesan Kirim Slip</CardTitle>
          <p className="text-sm text-muted-foreground">
            Kalimat utama yang muncul di email & notifikasi mobile (bagian kop surat, salam, dan
            daftar PENDAPATAN tetap baku). Klik variabel di bawah untuk menyisipkannya ke posisi
            kursor.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {q.data?.variabel.map((v) => (
              <Button
                key={v.key}
                type="button"
                variant="outline"
                size="sm"
                title={v.label}
                onClick={() => sisipkan(v.key)}
              >
                {`{{${v.key}}}`}
              </Button>
            ))}
          </div>

          <Textarea
            ref={textareaRef}
            rows={4}
            maxLength={2000}
            value={isi}
            onChange={(e) => setIsi(e.target.value)}
            placeholder="mis. Bersama ini kami informasikan bahwa {{instansi}} telah mentransfer Dana sebesar Rp {{nominal}} ke Nomor Rekening {{bank}} {{no_rekening}} pada tanggal {{tanggal}}."
          />
          <p className="text-xs text-muted-foreground text-right">{isi.length}/2000 karakter</p>

          <div className="space-y-2">
            <Label>Pratinjau (pakai data contoh)</Label>
            <div className="rounded-md border bg-muted/40 p-4 text-sm leading-relaxed">
              <p className="mb-2 font-medium">Yth. {DATA_CONTOH.nama}</p>
              <p>{renderPratinjau(isi) || "(kosong)"}</p>
              <p className="mt-3 font-semibold">PENDAPATAN</p>
              <p>
                {DATA_CONTOH.keterangan} : {DATA_CONTOH.nominal} (Ref: {DATA_CONTOH.no_ref})
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            {q.data?.updated_at ? (
              <p className="text-xs text-muted-foreground">Terakhir diubah: {tgl(q.data.updated_at)}</p>
            ) : (
              <p className="text-xs text-muted-foreground">Belum pernah diubah (masih bawaan default).</p>
            )}
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => q.data && setIsi(q.data.default)}
              >
                <RotateCcw className="mr-2 h-4 w-4" /> Reset ke Default
              </Button>
              <Button
                size="sm"
                disabled={!berubah || !isi.trim() || simpan.isPending}
                onClick={() => simpan.mutate()}
              >
                {simpan.isPending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}
                Simpan
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// ── Halaman ──────────────────────────────────────────────────────────────────
const KirimSlip = () => {
  const qc = useQueryClient();
  return (
    <div className="mt-6 space-y-4">
      <Tabs defaultValue="draft">
        <TabsList>
          <TabsTrigger value="draft">Kirim Slip</TabsTrigger>
          <TabsTrigger value="riwayat">Riwayat</TabsTrigger>
          <TabsTrigger value="template">Template Pesan</TabsTrigger>
        </TabsList>
        <TabsContent value="draft" className="space-y-4">
          <FormTambah onDone={() => qc.invalidateQueries({ queryKey: ["slip-draft"] })} />
          <DraftCard />
        </TabsContent>
        <TabsContent value="template">
          <TemplatePesan />
        </TabsContent>
        <TabsContent value="riwayat">
          <Riwayat />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default KirimSlip;
