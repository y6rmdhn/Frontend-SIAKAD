import React, { useState } from "react";
import {
  Printer,
  Download,
  CheckSquare,
  Square,
  // Search,
  Filter,
  Eye,
  X,
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

// Interface untuk data
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

// interface PeriodeResponse {
//   current_page: number;
//   data: Periode[];
//   first_page_url: string;
//   from: number;
//   last_page: number;
//   last_page_url: string;
//   links: any[];
//   next_page_url: string | null;
//   path: string;
//   per_page: number;
//   prev_page_url: string | null;
//   to: number;
//   total: number;
// }

export default function PrintSlipGaji() {
  const [selectedPeriode, setSelectedPeriode] = useState("");
  const [searchQuery] = useState("");
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

  // PERBAIKAN: Extract data periode dengan benar
  const periodeList: Periode[] = periodeData?.data?.data || [];

  console.log("Periode Data Full:", periodeData);
  console.log("Periode List:", periodeList);

  // Fetch data slip gaji berdasarkan periode
  const {
    data: slipGajiData,
    isLoading: isLoadingSlip,
    error: errorSlip,
  } = useQuery({
    queryKey: ["slip-gaji", selectedPeriode],
    queryFn: () => adminServices.getSlipGajiByPeriode(selectedPeriode),
    enabled: !!selectedPeriode,
  });

  // PERBAIKAN: Extract data dari response periode by ID
  const slipGajiList: PenggajianPegawai[] =
    slipGajiData?.data?.penggajian_pegawai || [];

  console.log("Slip Gaji Data:", slipGajiData);
  console.log("Slip Gaji List:", slipGajiList);

  // Filter slips berdasarkan search query dan selected pegawai
  const filteredSlips = slipGajiList.filter((slip) => {
    const matchesSearch =
      slip.pegawai.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      slip.pegawai.nip.includes(searchQuery);

    const matchesSelectedPegawai =
      selectedPegawai.length === 0 ||
      selectedPegawai.some((p) => p.id === slip.pegawai_id);

    return matchesSearch && matchesSelectedPegawai;
  });

  const toggleSlipSelection = (slipId: string) => {
    if (selectedSlips.includes(slipId)) {
      setSelectedSlips(selectedSlips.filter((id) => id !== slipId));
    } else {
      setSelectedSlips([...selectedSlips, slipId]);
    }
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
      // Panggil API untuk print
      // @ts-ignore
      const response = await adminServices.printSlipGaji({
        slip_ids: selectedSlips,
        format: format,
      });

      toast.success(`Berhasil mencetak ${selectedSlips.length} slip gaji`);

      // Handle download jika format PDF
      if (format === "pdf" && response.data?.download_url) {
        window.open(response.data.download_url, "_blank");
      }
    } catch (error) {
      console.error("Error printing slips:", error);
      toast.error("Gagal mencetak slip gaji");
    }
  };

  const handlePrintBulk = async (format: string) => {
    if (!selectedPeriode) {
      toast.error("Pilih periode terlebih dahulu!");
      return;
    }

    try {
      // Panggil API untuk print bulk
      // @ts-ignore
      const response = await adminServices.printSlipGajiBulk({
        periode_id: selectedPeriode,
        format: format,
      });

      toast.success("Berhasil mencetak semua slip gaji periode terpilih");

      // Handle download jika format PDF
      if (format === "pdf" && response.data?.download_url) {
        window.open(response.data.download_url, "_blank");
      }
    } catch (error) {
      console.error("Error printing bulk slips:", error);
      toast.error("Gagal mencetak slip gaji");
    }
  };

  const handlePreview = async (slip: PenggajianPegawai) => {
    try {
      // Fetch detail slip gaji untuk preview
      const response = await adminServices.getDetailSlipGaji(slip.id);
      setPreviewSlip(response.data);
      setShowPreview(true);
    } catch (error) {
      console.error("Error fetching slip detail:", error);
      toast.error("Gagal memuat preview slip gaji");
    }
  };

  const togglePegawai = (pegawai: Pegawai) => {
    const exists = selectedPegawai.find((p) => p.id === pegawai.id);
    if (exists) {
      setSelectedPegawai(selectedPegawai.filter((p) => p.id !== pegawai.id));
    } else {
      setSelectedPegawai([...selectedPegawai, pegawai]);
    }
  };

  const isPegawaiSelected = (pegawaiId: string) => {
    return selectedPegawai.some((p) => p.id === pegawaiId);
  };

  const removePegawaiFromSelected = (pegawaiId: string) => {
    setSelectedPegawai(selectedPegawai.filter((p) => p.id !== pegawaiId));
  };

  const clearPegawaiSelection = () => {
    setSelectedPegawai([]);
  };

  // Fungsi untuk mendapatkan nama lengkap dengan gelar
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
              Filter Periode
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
                  <SelectTrigger id="periode">
                    <SelectValue
                      placeholder={
                        isLoadingPeriode ? "Loading..." : "-- Pilih Periode --"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {isLoadingPeriode ? (
                      <SelectItem value="loading" disabled>
                        Loading...
                      </SelectItem>
                    ) : errorPeriode ? (
                      <SelectItem value="error" disabled>
                        Error loading data
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
                <div className="text-xs text-muted-foreground mt-1">
                  {Array.isArray(periodeList) &&
                    `${periodeList.length} periode ditemukan`}
                  {isLoadingPeriode && "Loading..."}
                  {errorPeriode && "Error loading data"}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="search-pegawai">Cari Pegawai</Label>
                <PegawaiSearchSection
                  selectedPegawai={selectedPegawai}
                  onTogglePegawai={togglePegawai}
                  onRemovePegawai={removePegawaiFromSelected}
                  onClearSelection={clearPegawaiSelection}
                  isPegawaiSelected={isPegawaiSelected}
                  excludedPegawai={[]}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Print Options */}
        <Card className="bg-gradient-to-r from-blue-600 to-blue-700 border-0">
          <CardContent className="pt-6 text-white">
            <CardTitle className="text-white mb-4">Opsi Cetak</CardTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Bulk Print */}
              <div className="bg-white/10 rounded-lg p-4">
                <h4 className="font-medium mb-2">Cetak Semua Pegawai</h4>
                <p className="text-blue-100 text-sm mb-3">
                  Cetak seluruh slip gaji dalam periode terpilih
                </p>
                <div className="flex gap-2">
                  <Button
                    onClick={() => handlePrintBulk("pdf")}
                    disabled={!selectedPeriode || isLoadingSlip}
                    variant="secondary"
                    className="flex-1"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    PDF
                  </Button>
                  <Button
                    onClick={() => handlePrintBulk("html")}
                    disabled={!selectedPeriode || isLoadingSlip}
                    variant="secondary"
                    className="flex-1"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                </div>
              </div>

              {/* Selected Print */}
              <div className="bg-white/10 rounded-lg p-4">
                <h4 className="font-medium mb-2">
                  Cetak Pegawai Terpilih ({selectedSlips.length})
                </h4>
                <p className="text-blue-100 text-sm mb-3">
                  Cetak slip gaji pegawai yang di-check
                </p>
                <div className="flex gap-2">
                  <Button
                    onClick={() => handlePrintSelected("pdf")}
                    disabled={selectedSlips.length === 0}
                    variant="secondary"
                    className="flex-1"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    PDF
                  </Button>
                  <Button
                    onClick={() => handlePrintSelected("html")}
                    disabled={selectedSlips.length === 0}
                    variant="secondary"
                    className="flex-1"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Slip Gaji Table */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle>Daftar Slip Gaji</CardTitle>
            <div className="flex items-center gap-2">
              {selectedPegawai.length > 0 && (
                <div className="text-sm text-muted-foreground">
                  Filter: {selectedPegawai.length} pegawai terpilih
                </div>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={selectAllSlips}
                className="flex items-center gap-2"
                disabled={isLoadingSlip || filteredSlips.length === 0}
              >
                {selectedSlips.length === filteredSlips.length ? (
                  <>
                    <CheckSquare className="h-4 w-4" />
                    Unselect All
                  </>
                ) : (
                  <>
                    <Square className="h-4 w-4" />
                    Select All
                  </>
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {isLoadingSlip ? (
              <div className="text-center py-8 text-muted-foreground">
                Loading data slip gaji...
              </div>
            ) : errorSlip ? (
              <div className="text-center py-8 text-red-600">
                Error loading data slip gaji
              </div>
            ) : (
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
                  {filteredSlips.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={7}
                        className="text-center py-8 text-muted-foreground"
                      >
                        {selectedPeriode
                          ? selectedPegawai.length > 0
                            ? "Tidak ada slip gaji untuk pegawai terpilih"
                            : "Tidak ada data slip gaji untuk periode ini"
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
            )}
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
                {/* Header */}
                <div className="text-center mb-6 border-b-2 pb-4">
                  <h2 className="text-2xl font-bold text-gray-800">
                    SLIP GAJI
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    {previewSlip.periode.nama_periode}
                  </p>
                </div>

                {/* Info Pegawai */}
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

                {/* Pendapatan */}
                <div className="mb-4">
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
                      {parseFloat(previewSlip.total_pendapatan).toLocaleString(
                        "id-ID"
                      )}
                    </span>
                  </div>
                </div>

                {/* Potongan */}
                <div className="mb-4">
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

                {/* Gaji Bersih */}
                <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-500">
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
              <Button
                onClick={() => {
                  if (previewSlip) {
                    setSelectedSlips([previewSlip.id]);
                    handlePrintSelected("pdf");
                  }
                }}
                className="flex items-center gap-2"
              >
                <Printer className="h-4 w-4" />
                Cetak Slip Ini
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

// Komponen PegawaiSearchSection
function PegawaiSearchSection({
  selectedPegawai,
  onTogglePegawai,
  onRemovePegawai,
  onClearSelection,
  isPegawaiSelected,
  excludedPegawai,
}: any) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: pegawaiData,
    isLoading,
    error,
  } = useQuery<any>({
    queryKey: ["pegawai-payroll", searchQuery],
    queryFn: () => adminServices.getPegawaiPayrollParams(searchQuery),
    enabled: searchQuery.length >= 2,
    staleTime: 5 * 60 * 1000,
  });

  const availablePegawai = React.useMemo(() => {
    const apiData = pegawaiData?.data?.data?.data || [];

    return apiData
      .filter(
        (pegawai: any) =>
          pegawai?.id &&
          !excludedPegawai.some((ex: any) => ex.id === pegawai.id)
      )
      .map((pegawai: any) => ({
        id: pegawai.id,
        nama: pegawai.nama_pegawai,
        nip: pegawai.nip,
      }));
  }, [pegawaiData, excludedPegawai]);

  return (
    <div className="space-y-4">
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
              : "Pilih pegawai..."}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Command shouldFilter={false}>
            <CommandInput
              placeholder="Ketik nama atau NIP pegawai (min. 2 karakter)..."
              value={searchQuery}
              onValueChange={setSearchQuery}
            />
            <CommandList>
              {isLoading && (
                <CommandEmpty>
                  <div className="py-6 text-center text-sm">
                    Mencari pegawai...
                  </div>
                </CommandEmpty>
              )}

              {error && (
                <CommandEmpty>
                  <div className="py-6 text-center text-sm text-red-600">
                    Error saat memuat data pegawai
                  </div>
                </CommandEmpty>
              )}

              {!isLoading &&
                !error &&
                availablePegawai.length === 0 &&
                searchQuery.length >= 2 && (
                  <CommandEmpty>
                    Tidak ditemukan pegawai dengan kata kunci "{searchQuery}"
                  </CommandEmpty>
                )}

              {!isLoading && !error && searchQuery.length < 2 && (
                <CommandEmpty>
                  Ketik minimal 2 karakter untuk mencari
                </CommandEmpty>
              )}

              {!isLoading && !error && availablePegawai.length > 0 && (
                <CommandGroup>
                  {availablePegawai.map((pegawai: any) => (
                    <CommandItem
                      key={pegawai.id}
                      value={pegawai.id}
                      onSelect={() => {
                        onTogglePegawai(pegawai);
                        setSearchQuery("");
                      }}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <Checkbox
                        checked={isPegawaiSelected(pegawai.id)}
                        onCheckedChange={() => onTogglePegawai(pegawai)}
                      />
                      <div className="flex-1">
                        <div className="font-medium">{pegawai.nama}</div>
                        <div className="text-sm text-muted-foreground">
                          NIP: {pegawai.nip}
                        </div>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {selectedPegawai.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">
                {selectedPegawai.length} Pegawai Terpilih
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={onClearSelection}>
                <X className="h-4 w-4 mr-1" />
                Clear All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {selectedPegawai.map((pegawai: any) => (
                <div
                  key={pegawai.id}
                  className="bg-secondary px-3 py-1 rounded-full text-sm flex items-center gap-1"
                >
                  {pegawai.nama}
                  <button
                    onClick={() => onRemovePegawai(pegawai.id)}
                    className="text-muted-foreground hover:text-foreground ml-1"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
