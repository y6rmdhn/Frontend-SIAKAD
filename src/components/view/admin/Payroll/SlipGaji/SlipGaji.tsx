import { useState, useMemo } from "react";
import { Eye, Filter, ChevronDown, X, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import adminServices from "@/services/admin.services";

// ─── Interfaces ───────────────────────────────────────────────────────────────

interface PegawaiInfo {
  id: string;
  nama: string;
  nip: string;
}

interface DetailKomponen {
  nama_komponen: string;
  jenis: "TUNJANGAN" | "POTONGAN";
  nominal: string;
}

interface RiwayatPenggajian {
  id: string;
  pegawai_id: string;
  periode_bulan: number;
  periode_tahun: number;
  total_kehadiran: number;
  total_tunjangan_tetap: number;
  total_tunjangan_variabel: number;
  total_potongan: number;
  gaji_bersih: number;
  pegawai: PegawaiInfo;
  detail_komponen: DetailKomponen[];
}

// ─── Helper Functions ─────────────────────────────────────────────────────────

const BULAN_NAMES = [
  "", "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];

const formatRp = (value: number | string) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(Number(value));

const currentYear = new Date().getFullYear();
const yearOptions = Array.from({ length: 5 }, (_, i) => currentYear - i);

// ─── Komponen Utama ───────────────────────────────────────────────────────────

export default function SlipGaji() {
  const [filterTahun, setFilterTahun] = useState<string>(
    String(currentYear)
  );
  const [filterPegawaiId, setFilterPegawaiId] = useState<string>("");
  const [filterPegawaiLabel, setFilterPegawaiLabel] = useState<string>("");
  const [openPegawaiPicker, setOpenPegawaiPicker] = useState(false);
  const [pegawaiSearch, setPegawaiSearch] = useState("");
  const [selectedSlip, setSelectedSlip] = useState<RiwayatPenggajian | null>(
    null
  );

  const handlePrint = () => {
    const printContents = document.getElementById("printArea")?.innerHTML;
    const originalContents = document.body.innerHTML;
    if (printContents) {
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload();
    }
  };

  // ─── Fetch riwayat penggajian ───────────────────────────────────────────
  const { data: riwayatData, isLoading } = useQuery({
    queryKey: ["riwayat-penggajian", filterTahun, filterPegawaiId],
    queryFn: async () => {
      const params: Record<string, string> = {};
      if (filterTahun) params.periode_tahun = filterTahun;
      if (filterPegawaiId) params.pegawai_id = filterPegawaiId;
      const res = await adminServices.getRiwayatPenggajian(params);
      return res.data;
    },
  });

  const riwayatList: RiwayatPenggajian[] = useMemo(() => {
    const raw = riwayatData?.data ?? riwayatData;
    if (Array.isArray(raw)) return raw;
    return [];
  }, [riwayatData]);

  // ─── Fetch pegawai for filter ────────────────────────────────────────────
  const { data: pegawaiRaw, isLoading: isLoadingPegawai } = useQuery<any>({
    queryKey: ["pegawai-slip-search", pegawaiSearch],
    queryFn: () => adminServices.getPegawaiPayrollParams(pegawaiSearch),
    enabled: pegawaiSearch.length >= 2,
    staleTime: 5 * 60 * 1000,
  });

  const pegawaiOptions = useMemo(() => {
    const list = pegawaiRaw?.data?.data?.data ?? [];
    return list.map((p: any) => ({
      id: p.id,
      nama: p.nama_pegawai ?? p.nama,
      nip: p.nip,
    }));
  }, [pegawaiRaw]);

  // ─── Detail komponen split ────────────────────────────────────────────────
  const tunjanganList = selectedSlip?.detail_komponen.filter(
    (k) => k.jenis === "TUNJANGAN"
  ) ?? [];
  const potonganList = selectedSlip?.detail_komponen.filter(
    (k) => k.jenis === "POTONGAN"
  ) ?? [];

  const handleClearPegawai = () => {
    setFilterPegawaiId("");
    setFilterPegawaiLabel("");
    setPegawaiSearch("");
  };

  return (
    <div className="mt-10 mb-20 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-lg sm:text-2xl font-normal">Riwayat Slip Gaji</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Lihat dan cetak slip gaji pegawai berdasarkan periode.
        </p>
      </div>

      {/* Filter Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Filter className="h-4 w-4" />
            Filter Data
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Filter Tahun */}
            <div className="space-y-2">
              <Label>Tahun</Label>
              <Select value={filterTahun} onValueChange={setFilterTahun}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih Tahun" />
                </SelectTrigger>
                <SelectContent>
                  {yearOptions.map((y) => (
                    <SelectItem key={y} value={String(y)}>
                      {y}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Filter Pegawai */}
            <div className="space-y-2">
              <Label>Filter Pegawai (Opsional)</Label>
              <div className="flex gap-2">
                <Popover
                  open={openPegawaiPicker}
                  onOpenChange={setOpenPegawaiPicker}
                >
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      className="flex-1 justify-between"
                    >
                      {filterPegawaiLabel || "Pilih pegawai..."}
                      <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-[var(--radix-popover-trigger-width)] p-0"
                    align="start"
                  >
                    <Command shouldFilter={false}>
                      <CommandInput
                        placeholder="Ketik nama/NIP (min. 2 huruf)..."
                        value={pegawaiSearch}
                        onValueChange={setPegawaiSearch}
                      />
                      <CommandList>
                        {isLoadingPegawai && (
                          <CommandEmpty>Mencari pegawai...</CommandEmpty>
                        )}
                        {!isLoadingPegawai &&
                          pegawaiOptions.length === 0 &&
                          pegawaiSearch.length >= 2 && (
                            <CommandEmpty>
                              Tidak ada pegawai ditemukan
                            </CommandEmpty>
                          )}
                        <CommandGroup>
                          {pegawaiOptions.map((p: any) => (
                            <CommandItem
                              key={p.id}
                              onSelect={() => {
                                setFilterPegawaiId(p.id);
                                setFilterPegawaiLabel(`${p.nama} (${p.nip})`);
                                setOpenPegawaiPicker(false);
                              }}
                            >
                              <Checkbox
                                checked={filterPegawaiId === p.id}
                                className="mr-2"
                              />
                              {p.nama} — {p.nip}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                {filterPegawaiId && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleClearPegawai}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabel Riwayat */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Daftar Riwayat Penggajian</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead className="text-center">Bulan</TableHead>
                <TableHead className="text-center">Tahun</TableHead>
                <TableHead className="text-center">NIP</TableHead>
                <TableHead>Nama Pegawai</TableHead>
                <TableHead className="text-center">Kehadiran</TableHead>
                <TableHead className="text-right">Total Tunjangan</TableHead>
                <TableHead className="text-right">Total Potongan</TableHead>
                <TableHead className="text-right">Gaji Bersih</TableHead>
                <TableHead className="text-center">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell
                    colSpan={9}
                    className="text-center py-10 text-muted-foreground"
                  >
                    Memuat data...
                  </TableCell>
                </TableRow>
              ) : riwayatList.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={9}
                    className="text-center py-10 text-muted-foreground"
                  >
                    Tidak ada data penggajian untuk filter yang dipilih.
                  </TableCell>
                </TableRow>
              ) : (
                riwayatList.map((item) => {
                  const totalTunjangan =
                    Number(item.total_tunjangan_tetap) +
                    Number(item.total_tunjangan_variabel);
                  return (
                    <TableRow key={item.id} className="even:bg-gray-50">
                      <TableCell className="text-center text-sm font-medium">
                        {BULAN_NAMES[item.periode_bulan] ?? item.periode_bulan}
                      </TableCell>
                      <TableCell className="text-center text-sm">
                        {item.periode_tahun}
                      </TableCell>
                      <TableCell className="text-center text-sm font-mono">
                        {item.pegawai?.nip ?? "-"}
                      </TableCell>
                      <TableCell className="text-sm">
                        {item.pegawai?.nama ?? "-"}
                      </TableCell>
                      <TableCell className="text-center text-sm">
                        {item.total_kehadiran} hari
                      </TableCell>
                      <TableCell className="text-right text-sm text-green-600 font-medium">
                        {formatRp(totalTunjangan)}
                      </TableCell>
                      <TableCell className="text-right text-sm text-red-600 font-medium">
                        {formatRp(item.total_potongan)}
                      </TableCell>
                      <TableCell className="text-right text-sm text-blue-700 font-bold">
                        {formatRp(item.gaji_bersih)}
                      </TableCell>
                      <TableCell className="text-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedSlip(item)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Lihat Slip
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modal Slip Gaji */}
      <Dialog open={!!selectedSlip} onOpenChange={() => setSelectedSlip(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Slip Gaji</DialogTitle>
            <DialogDescription>
              {selectedSlip && (
                <>
                  {selectedSlip.pegawai?.nama} —{" "}
                  {BULAN_NAMES[selectedSlip.periode_bulan]}{" "}
                  {selectedSlip.periode_tahun}
                </>
              )}
            </DialogDescription>
          </DialogHeader>

          {selectedSlip && (
            <div id="printArea" className="border-2 border-gray-300 rounded-lg p-6 bg-white space-y-5">
              {/* Header Slip */}
              <div className="text-center border-b-2 pb-4">
                <h2 className="text-2xl font-bold text-gray-800">SLIP GAJI</h2>
                <p className="text-sm text-gray-500 mt-1">
                  {BULAN_NAMES[selectedSlip.periode_bulan]}{" "}
                  {selectedSlip.periode_tahun}
                </p>
              </div>

              {/* Info Pegawai */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-gray-500">NIP</p>
                  <p className="font-semibold font-mono">
                    {selectedSlip.pegawai?.nip ?? "-"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Nama</p>
                  <p className="font-semibold">
                    {selectedSlip.pegawai?.nama ?? "-"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Kehadiran</p>
                  <p className="font-semibold">
                    {selectedSlip.total_kehadiran} hari
                  </p>
                </div>
              </div>

              {/* Komponen Gaji */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Tunjangan */}
                <div>
                  <h4 className="font-semibold text-green-700 border-b pb-1 mb-2">
                    Daftar Tunjangan
                  </h4>
                  {tunjanganList.length === 0 ? (
                    <p className="text-xs text-muted-foreground">
                      Tidak ada tunjangan
                    </p>
                  ) : (
                    tunjanganList.map((k, i) => (
                      <div
                        key={i}
                        className="flex justify-between py-1 text-sm border-b border-dashed border-gray-100 last:border-0"
                      >
                        <span>{k.nama_komponen}</span>
                        <span className="font-medium text-green-700">
                          {formatRp(k.nominal)}
                        </span>
                      </div>
                    ))
                  )}
                  <div className="flex justify-between py-2 font-semibold border-t mt-2 text-sm">
                    <span>Total Tunjangan</span>
                    <span className="text-green-700">
                      {formatRp(
                        Number(selectedSlip.total_tunjangan_tetap) +
                          Number(selectedSlip.total_tunjangan_variabel)
                      )}
                    </span>
                  </div>
                </div>

                {/* Potongan */}
                <div>
                  <h4 className="font-semibold text-red-700 border-b pb-1 mb-2">
                    Daftar Potongan
                  </h4>
                  {potonganList.length === 0 ? (
                    <p className="text-xs text-muted-foreground">
                      Tidak ada potongan
                    </p>
                  ) : (
                    potonganList.map((k, i) => (
                      <div
                        key={i}
                        className="flex justify-between py-1 text-sm border-b border-dashed border-gray-100 last:border-0"
                      >
                        <span>{k.nama_komponen}</span>
                        <span className="font-medium text-red-700">
                          {formatRp(k.nominal)}
                        </span>
                      </div>
                    ))
                  )}
                  <div className="flex justify-between py-2 font-semibold border-t mt-2 text-sm">
                    <span>Total Potongan</span>
                    <span className="text-red-700">
                      {formatRp(selectedSlip.total_potongan)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Gaji Bersih */}
              <div className="bg-blue-50 border-2 border-blue-500 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">GAJI BERSIH</span>
                  <span className="text-2xl font-bold text-blue-600">
                    {formatRp(selectedSlip.gaji_bersih)}
                  </span>
                </div>
              </div>

              {/* Badge tunjangan tetap / variabel */}
              <div className="flex flex-wrap gap-2 text-xs">
                <Badge variant="outline" className="border-green-400 text-green-700">
                  Tunjangan Tetap: {formatRp(selectedSlip.total_tunjangan_tetap)}
                </Badge>
                <Badge variant="outline" className="border-emerald-400 text-emerald-700">
                  Tunjangan Variabel: {formatRp(selectedSlip.total_tunjangan_variabel)}
                </Badge>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <Button
              onClick={handlePrint}
              className="flex items-center gap-2 bg-[#106D63] hover:bg-[#0c524a] text-white"
            >
              <Printer className="w-4 h-4" /> Cetak
            </Button>
            <Button variant="outline" onClick={() => setSelectedSlip(null)}>
              Tutup
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
