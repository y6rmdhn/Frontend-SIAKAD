import { useState, useMemo } from "react";
import {
  Printer,
  Download,
  CheckSquare,
  Square,
  Filter,
  Eye,
  X,
  ChevronDown,
} from "lucide-react";
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
import { Checkbox } from "@/components/ui/checkbox";
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
import { Label } from "@/components/ui/label";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import adminServices from "@/services/admin.services";
import potsReferensiServices from "@/services/create.admin.referensi"; // Pastikan path ini benar

// --- INTERFACE UNTUK DATA ---
interface Pegawai {
  id: string;
  nama: string;
  nip: string;
  gelar_depan: string | null;
  gelar_belakang: string | null;
}

interface Periode {
  id: string;
  tahun: number;
  bulan: number;
  nama_periode: string;
  status: string;
  keterangan: string | null;
  created_at: string;
  updated_at: string;
  penggajian_pegawai: PenggajianPegawai[];
}

interface PenggajianPegawai {
  id: string;
  periode_id: string;
  pegawai_id: string;
  total_pendapatan: string;
  total_potongan: string;
  gaji_bersih: string;
  created_at: string;
  updated_at: string;
  pegawai: Pegawai;
}

interface KomponenGajiDetail {
  id: string;
  penggajian_pegawai_id: string;
  kode_komponen: string;
  deskripsi: string;
  nominal: string;
  created_at: string;
  updated_at: string;
}

interface DetailSlipGaji {
  id: string;
  periode_id: string;
  pegawai_id: string;
  total_pendapatan: string;
  total_potongan: string;
  gaji_bersih: string;
  created_at: string;
  updated_at: string;
  pegawai: Pegawai;
  periode: Periode;
  komponen_pendapatan: KomponenGajiDetail[];
  komponen_potongan: KomponenGajiDetail[];
}

// --- KOMPONEN UTAMA ---
export default function PrintSlipGaji() {
  const [selectedPeriode, setSelectedPeriode] = useState("");
  const [selectedSlips, setSelectedSlips] = useState<string[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [previewSlip, setPreviewSlip] = useState<DetailSlipGaji | null>(null);
  const [selectedPegawai, setSelectedPegawai] = useState<Pegawai[]>([]);

  // Fetch data periode dari API
  const {
    data: periodeData,
    isLoading: isLoadingPeriode,
    error: errorPeriode,
  } = useQuery({
    queryKey: ["periode-payroll"],
    queryFn: () => adminServices.getPeriodePayroll(),
  });

  const periodeList: Periode[] = periodeData?.data?.data || [];

  // Fetch data slip gaji berdasarkan periode
  const { data: slipGajiData, isLoading: isLoadingSlip } = useQuery({
    queryKey: ["slip-gaji", selectedPeriode],
    queryFn: () => adminServices.getSlipGajiByPeriode(selectedPeriode),
    enabled: !!selectedPeriode,
  });

  const slipGajiList: PenggajianPegawai[] =
    slipGajiData?.data?.penggajian_pegawai || [];

  // Filter slips berdasarkan pegawai yang dipilih
  const filteredSlips = slipGajiList.filter((slip) => {
    const matchesSelectedPegawai =
      selectedPegawai.length === 0 ||
      selectedPegawai.some((p) => p.id === slip.pegawai_id);
    return matchesSelectedPegawai;
  });

  const toggleSlipSelection = (slipId: string) => {
    setSelectedSlips((prev) =>
      prev.includes(slipId)
        ? prev.filter((id) => id !== slipId)
        : [...prev, slipId]
    );
  };

  const selectAllSlips = () => {
    if (selectedSlips.length === filteredSlips.length) {
      setSelectedSlips([]);
    } else {
      setSelectedSlips(filteredSlips.map((slip) => slip.id));
    }
  };

  const handlePrintSelected = async (format: string) => {
    if (selectedSlips.length === 0) {
      toast.error("Pilih minimal 1 slip gaji!");
      return;
    }

    try {
      const response = await potsReferensiServices.printSlipGaji(
        selectedSlips,
        format
      );
      toast.success(`Berhasil memproses ${selectedSlips.length} slip gaji`);
      if (format === "pdf") {
        const fileBlob = new Blob([response.data], { type: "application/pdf" });
        const fileUrl = URL.createObjectURL(fileBlob);
        window.open(fileUrl, "_blank");
        setTimeout(() => URL.revokeObjectURL(fileUrl), 1000);
      }
    } catch (error) {
      console.error("Error printing selected slips:", error);
      toast.error("Gagal mencetak slip gaji terpilih");
    }
  };

  const handlePrintBulk = async (format: string) => {
    if (!selectedPeriode) {
      toast.error("Pilih periode terlebih dahulu!");
      return;
    }

    try {
      const response = await adminServices.printSlipGajiBulk(
        selectedPeriode,
        format
      );
      toast.success("Berhasil memproses semua slip gaji");
      if (format === "pdf") {
        const fileBlob = new Blob([response.data], { type: "application/pdf" });
        const fileUrl = URL.createObjectURL(fileBlob);
        window.open(fileUrl, "_blank");
        setTimeout(() => URL.revokeObjectURL(fileUrl), 1000);
      }
    } catch (error) {
      console.error("Error printing bulk slips:", error);
      toast.error("Gagal mencetak semua slip gaji");
    }
  };

  const handlePreview = async (slip: PenggajianPegawai) => {
    try {
      const response = await adminServices.getDetailSlipGaji(slip.id);
      setPreviewSlip(response.data);
      setShowPreview(true);
    } catch (error) {
      console.error("Error fetching slip detail:", error);
      toast.error("Gagal memuat preview slip gaji");
    }
  };

  const togglePegawai = (pegawai: Pegawai) => {
    setSelectedPegawai((prev) => {
      const exists = prev.find((p) => p.id === pegawai.id);
      if (exists) {
        return prev.filter((p) => p.id !== pegawai.id);
      } else {
        return [...prev, pegawai];
      }
    });
  };

  const removePegawaiFromSelected = (pegawaiId: string) => {
    setSelectedPegawai((prev) => prev.filter((p) => p.id !== pegawaiId));
  };

  const clearPegawaiSelection = () => {
    setSelectedPegawai([]);
  };

  const getNamaLengkap = (pegawai: Pegawai) => {
    const gelarDepan = pegawai.gelar_depan ? `${pegawai.gelar_depan} ` : "";
    const gelarBelakang = pegawai.gelar_belakang
      ? `, ${pegawai.gelar_belakang}`
      : "";
    return `${gelarDepan}${pegawai.nama}${gelarBelakang}`;
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">
              Cetak Slip Gaji
            </h1>
            <p className="text-muted-foreground">
              Kelola dan cetak slip gaji pegawai untuk periode tertentu
            </p>
          </div>
          <div className="flex items-center gap-2 text-blue-600">
            <Printer className="h-8 w-8" />
          </div>
        </div>

        {/* Filter Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filter Data
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="periode">Pilih Periode</Label>
                <Select
                  value={selectedPeriode}
                  onValueChange={setSelectedPeriode}
                  disabled={isLoadingPeriode}
                >
                  <SelectTrigger id="periode" className="w-full">
                    <SelectValue
                      placeholder={
                        isLoadingPeriode ? "Loading..." : "-- Pilih Periode --"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent position="popper" sideOffset={5}>
                    {isLoadingPeriode ? (
                      <SelectItem value="loading" disabled>
                        Loading...
                      </SelectItem>
                    ) : errorPeriode ? (
                      <SelectItem value="error" disabled>
                        Error memuat data
                      </SelectItem>
                    ) : Array.isArray(periodeList) && periodeList.length > 0 ? (
                      periodeList.map((periode) => (
                        <SelectItem key={periode.id} value={periode.id}>
                          {periode.nama_periode}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="no-data" disabled>
                        Tidak ada data periode
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="search-pegawai">
                  Filter Pegawai (Opsional)
                </Label>
                <PegawaiSearchSection
                  selectedPegawai={selectedPegawai}
                  onTogglePegawai={togglePegawai}
                  onRemovePegawai={removePegawaiFromSelected}
                  onClearSelection={clearPegawaiSelection}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Slip Gaji Table */}
        <Card>
          <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle>Daftar Slip Gaji</CardTitle>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <Button
                onClick={() => handlePrintSelected("pdf")}
                disabled={selectedSlips.length === 0}
                variant="outline"
                size="sm"
                className="flex-1 sm:flex-none"
              >
                <Download className="h-4 w-4 mr-2" />
                Cetak Terpilih ({selectedSlips.length})
              </Button>
              <Button
                onClick={() => handlePrintBulk("pdf")}
                disabled={!selectedPeriode || isLoadingSlip}
                variant="default"
                size="sm"
                className="flex-1 sm:flex-none"
              >
                <Printer className="h-4 w-4 mr-2" />
                Cetak Semua
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={selectAllSlips}
                className="flex items-center justify-center gap-2 flex-1 sm:flex-none"
                disabled={isLoadingSlip || filteredSlips.length === 0}
              >
                {selectedSlips.length === filteredSlips.length &&
                filteredSlips.length > 0 ? (
                  <CheckSquare className="h-4 w-4" />
                ) : (
                  <Square className="h-4 w-4" />
                )}
                <span>
                  {selectedSlips.length === filteredSlips.length &&
                  filteredSlips.length > 0
                    ? "Batal Pilih"
                    : "Pilih Semua"}
                </span>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={
                        selectedSlips.length === filteredSlips.length &&
                        filteredSlips.length > 0
                      }
                      onCheckedChange={selectAllSlips}
                      disabled={filteredSlips.length === 0}
                    />
                  </TableHead>
                  <TableHead>NIP</TableHead>
                  <TableHead>Nama Pegawai</TableHead>
                  <TableHead className="text-right">Pendapatan</TableHead>
                  <TableHead className="text-right">Potongan</TableHead>
                  <TableHead className="text-right">Gaji Bersih</TableHead>
                  <TableHead className="text-center">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoadingSlip ? (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="text-center py-8 text-muted-foreground"
                    >
                      Memuat data slip gaji...
                    </TableCell>
                  </TableRow>
                ) : filteredSlips.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="text-center py-8 text-muted-foreground"
                    >
                      {selectedPeriode
                        ? "Tidak ada data slip gaji untuk filter yang dipilih"
                        : "Pilih periode terlebih dahulu"}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredSlips.map((slip) => (
                    <TableRow key={slip.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedSlips.includes(slip.id)}
                          onCheckedChange={() => toggleSlipSelection(slip.id)}
                        />
                      </TableCell>
                      <TableCell className="font-mono text-sm">
                        {slip.pegawai.nip}
                      </TableCell>
                      <TableCell className="font-medium">
                        {slip.pegawai.nama}
                      </TableCell>
                      <TableCell className="text-right text-green-600 font-medium">
                        Rp{" "}
                        {parseFloat(slip.total_pendapatan).toLocaleString(
                          "id-ID"
                        )}
                      </TableCell>
                      <TableCell className="text-right text-red-600 font-medium">
                        Rp{" "}
                        {parseFloat(slip.total_potongan).toLocaleString(
                          "id-ID"
                        )}
                      </TableCell>
                      <TableCell className="text-right text-blue-600 font-bold">
                        Rp{" "}
                        {parseFloat(slip.gaji_bersih).toLocaleString("id-ID")}
                      </TableCell>
                      <TableCell className="text-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handlePreview(slip)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Preview
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Preview Dialog */}
        <Dialog open={showPreview} onOpenChange={setShowPreview}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Preview Slip Gaji</DialogTitle>
              <DialogDescription>
                {previewSlip && getNamaLengkap(previewSlip.pegawai)} -{" "}
                {previewSlip?.periode.nama_periode}
              </DialogDescription>
            </DialogHeader>
            {previewSlip && (
              <div className="border-2 border-gray-300 rounded-lg p-6 bg-white">
                <div className="text-center mb-6 border-b-2 pb-4">
                  <h2 className="text-2xl font-bold text-gray-800">
                    SLIP GAJI
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    {previewSlip.periode.nama_periode}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-sm text-gray-600">NIP</p>
                    <p className="font-semibold">{previewSlip.pegawai.nip}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Nama</p>
                    <p className="font-semibold">
                      {getNamaLengkap(previewSlip.pegawai)}
                    </p>
                  </div>
                </div>
                {/* Pendapatan & Potongan */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-green-700 mb-2 border-b pb-1">
                      Pendapatan
                    </h4>
                    {previewSlip.komponen_pendapatan.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between py-1 text-sm"
                      >
                        <span>{item.deskripsi}</span>
                        <span className="font-medium">
                          Rp {parseFloat(item.nominal).toLocaleString("id-ID")}
                        </span>
                      </div>
                    ))}
                    <div className="flex justify-between py-2 font-semibold border-t mt-2">
                      <span>Total Pendapatan</span>
                      <span className="text-green-700">
                        Rp{" "}
                        {parseFloat(
                          previewSlip.total_pendapatan
                        ).toLocaleString("id-ID")}
                      </span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-700 mb-2 border-b pb-1">
                      Potongan
                    </h4>
                    {previewSlip.komponen_potongan.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between py-1 text-sm"
                      >
                        <span>{item.deskripsi}</span>
                        <span className="font-medium">
                          Rp {parseFloat(item.nominal).toLocaleString("id-ID")}
                        </span>
                      </div>
                    ))}
                    <div className="flex justify-between py-2 font-semibold border-t mt-2">
                      <span>Total Potongan</span>
                      <span className="text-red-700">
                        Rp{" "}
                        {parseFloat(previewSlip.total_potongan).toLocaleString(
                          "id-ID"
                        )}
                      </span>
                    </div>
                  </div>
                </div>
                {/* Gaji Bersih */}
                <div className="bg-blue-50 rounded-lg p-4 mt-6 border-2 border-blue-500">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">GAJI BERSIH</span>
                    <span className="text-2xl font-bold text-blue-600">
                      Rp{" "}
                      {parseFloat(previewSlip.gaji_bersih).toLocaleString(
                        "id-ID"
                      )}
                    </span>
                  </div>
                </div>
              </div>
            )}
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setShowPreview(false)}>
                Tutup
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

// --- KOMPONEN PENCARIAN PEGAWAI ---
function PegawaiSearchSection({
  selectedPegawai,
  onTogglePegawai,
  onRemovePegawai,
  onClearSelection,
}: {
  selectedPegawai: Pegawai[];
  onTogglePegawai: (pegawai: Pegawai) => void;
  onRemovePegawai: (pegawaiId: string) => void;
  onClearSelection: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: pegawaiData,
    isLoading,
    error,
  } = useQuery<any>({
    queryKey: ["pegawai-payroll-search", searchQuery],
    queryFn: () => adminServices.getPegawaiPayrollParams(searchQuery),
    enabled: searchQuery.length >= 2,
    staleTime: 5 * 60 * 1000,
  });

  const availablePegawai = useMemo(() => {
    const apiData = pegawaiData?.data?.data?.data || [];
    return apiData.map((pegawai: any) => ({
      id: pegawai.id,
      nama: pegawai.nama_pegawai,
      nip: pegawai.nip,
    }));
  }, [pegawaiData]);

  const isPegawaiSelected = (pegawaiId: string) =>
    selectedPegawai.some((p) => p.id === pegawaiId);

  return (
    <div className="space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {selectedPegawai.length > 0
              ? `${selectedPegawai.length} pegawai terpilih`
              : "Pilih pegawai untuk filter..."}
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-[var(--radix-popover-trigger-width)] p-0"
          align="start"
        >
          <Command shouldFilter={false}>
            <CommandInput
              placeholder="Ketik nama/NIP (min. 2 huruf)..."
              value={searchQuery}
              onValueChange={setSearchQuery}
            />
            <CommandList>
              {isLoading && <CommandEmpty>Mencari pegawai...</CommandEmpty>}
              {error && (
                <CommandEmpty className="text-red-600">
                  Gagal memuat data
                </CommandEmpty>
              )}
              {!isLoading &&
                !error &&
                availablePegawai.length === 0 &&
                searchQuery.length >= 2 && (
                  <CommandEmpty>Tidak ada pegawai ditemukan</CommandEmpty>
                )}
              <CommandGroup>
                {availablePegawai.map((pegawai: any) => (
                  <CommandItem
                    key={pegawai.id}
                    onSelect={() => {
                      onTogglePegawai(pegawai);
                    }}
                  >
                    <Checkbox
                      checked={isPegawaiSelected(pegawai.id)}
                      className="mr-2"
                    />
                    <span>
                      {pegawai.nama} ({pegawai.nip})
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {selectedPegawai.length > 0 && (
        <div className="p-3 bg-muted rounded-md">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium">
              {selectedPegawai.length} Pegawai Terpilih
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearSelection}
              className="text-xs"
            >
              <X className="h-3 w-3 mr-1" />
              Bersihkan
            </Button>
          </div>
          <div className="flex flex-wrap gap-1">
            {selectedPegawai.map((pegawai: any) => (
              <div
                key={pegawai.id}
                className="bg-background px-2 py-1 rounded-full text-xs flex items-center gap-1 border"
              >
                {pegawai.nama}
                <button
                  onClick={() => onRemovePegawai(pegawai.id)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
