import React, { useState, useEffect } from "react";
import { Plus, Trash2, Send, X, UserX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
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
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import adminServices from "@/services/admin.services";
import { z } from "zod";
import potsReferensiServices from "@/services/create.admin.referensi";

// Zod Schema untuk validasi
const payrollGenerateSchema = z.object({
  tahun: z
    .number()
    .min(2000, "Tahun harus valid")
    .max(2100, "Tahun harus valid"),
  bulan: z
    .number()
    .min(1, "Bulan harus antara 1-12")
    .max(12, "Bulan harus antara 1-12"),
  allowances: z.array(
    z.object({
      pegawai_id: z.string().uuid("ID pegawai harus valid"),
      kode: z.string().min(1, "Kode tidak boleh kosong"),
      deskripsi: z.string().min(1, "Deskripsi tidak boleh kosong"),
      nominal: z.number().min(0, "Nominal tidak boleh negatif"),
    })
  ),
  deductions: z.array(
    z.object({
      pegawai_id: z.string().uuid("ID pegawai harus valid"),
      kode: z.string().min(1, "Kode tidak boleh kosong"),
      deskripsi: z.string().min(1, "Deskripsi tidak boleh kosong"),
      nominal: z.number().min(0, "Nominal tidak boleh negatif"),
    })
  ),
  excluded_pegawai_ids: z.array(z.string().uuid()).optional(),
});

type PayrollGenerateForm = z.infer<typeof payrollGenerateSchema>;

// Interface untuk data pegawai
interface Pegawai {
  id: string;
  nama: string;
  nip: string;
}

export default function PayrollGenerator() {
  const [periode, setPeriode] = useState({ tahun: 2025, bulan: 9 });
  const [activeTab, setActiveTab] = useState("allowance");

  const [selectedPegawai, setSelectedPegawai] = useState<Pegawai[]>([]);
  const [allowances, setAllowances] = useState<any[]>([]);
  const [deductions, setDeductions] = useState<any[]>([]);
  const [excludedPegawai, setExcludedPegawai] = useState<Pegawai[]>([]);

  const [formData, setFormData] = useState({
    kode: "",
    deskripsi: "",
    nominal: 0,
  });

  // TanStack Mutation untuk generate payroll
  const generatePayrollMutation = useMutation({
    mutationFn: (data: PayrollGenerateForm) =>
      potsReferensiServices.payrollGenerate(data),
    onSuccess: () => {
      toast.success("Payroll berhasil digenerate!");
      // Reset form setelah sukses
      setAllowances([]);
      setDeductions([]);
      setExcludedPegawai([]);
      setSelectedPegawai([]);
      setFormData({ kode: "", deskripsi: "", nominal: 0 });
    },
    onError: (error: any) => {
      console.error("Error generating payroll:", error);
      toast.error("Gagal generate payroll. Silakan coba lagi.");
    },
  });

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

  const clearSelection = () => {
    setSelectedPegawai([]);
  };

  const addItemsForSelectedPegawai = () => {
    if (selectedPegawai.length === 0) {
      toast.error("Pilih minimal 1 pegawai!");
      return;
    }

    if (!formData.kode || !formData.deskripsi || formData.nominal <= 0) {
      toast.error("Lengkapi kode, deskripsi, dan nominal!");
      return;
    }

    const newItems = selectedPegawai.map((pegawai) => ({
      id: `${Date.now()}-${pegawai.id}`,
      pegawai_id: pegawai.id,
      pegawai_nama: pegawai.nama,
      pegawai_nip: pegawai.nip,
      kode: formData.kode,
      deskripsi: formData.deskripsi,
      nominal: parseFloat(formData.nominal.toString()),
    }));

    if (activeTab === "allowance") {
      setAllowances([...allowances, ...newItems]);
    } else {
      setDeductions([...deductions, ...newItems]);
    }

    setFormData({ kode: "", deskripsi: "", nominal: 0 });
    clearSelection();
    toast.success(`Berhasil menambahkan ${newItems.length} item`);
  };

  const removeFromExclusion = (pegawaiId: string) => {
    setExcludedPegawai(excludedPegawai.filter((p) => p.id !== pegawaiId));
    toast.success("Pegawai dihapus dari daftar pengecualian");
  };

  const removeItem = (id: string, type: "allowance" | "deduction") => {
    if (type === "allowance") {
      setAllowances(allowances.filter((item) => item.id !== id));
    } else {
      setDeductions(deductions.filter((item) => item.id !== id));
    }
    toast.success("Item berhasil dihapus");
  };

  const handleGeneratePayroll = () => {
    const payload: PayrollGenerateForm = {
      tahun: periode.tahun,
      bulan: periode.bulan,
      allowances: allowances.map(
        ({ id, pegawai_nama, pegawai_nip, ...rest }) => rest
      ),
      deductions: deductions.map(
        ({ id, pegawai_nama, pegawai_nip, ...rest }) => rest
      ),
      excluded_pegawai_ids: excludedPegawai.map((p) => p.id),
    };

    console.log("Payload untuk generate payroll:", payload);

    // Validasi dengan Zod schema
    const validationResult = payrollGenerateSchema.safeParse(payload);

    if (!validationResult.success) {
      const errors = validationResult.error.errors;
      console.error("Validation errors:", errors);
      toast.error("Data tidak valid. Silakan periksa kembali input Anda.");
      return;
    }

    generatePayrollMutation.mutate(payload);
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Generate Payroll
          </h1>
          <p className="text-muted-foreground">
            Kelola tunjangan, potongan, dan pengecualian payroll untuk periode
            tertentu
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Periode Penggajian</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tahun">Tahun</Label>
                <Input
                  id="tahun"
                  type="number"
                  value={periode.tahun}
                  onChange={(e) =>
                    setPeriode({ ...periode, tahun: parseInt(e.target.value) })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bulan">Bulan</Label>
                <Select
                  value={periode.bulan.toString()}
                  onValueChange={(value) =>
                    setPeriode({ ...periode, bulan: parseInt(value) })
                  }
                >
                  <SelectTrigger className="w-full" id="bulan">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                      <SelectItem key={m} value={m.toString()}>
                        {new Date(2025, m - 1).toLocaleString("id-ID", {
                          month: "long",
                        })}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Kelola Data Payroll</CardTitle>
            <CardDescription>
              Tambahkan tunjangan, potongan, atau kecualikan pegawai dari
              payroll
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="space-y-6"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger
                  value="allowance"
                  className="flex items-center gap-2 data-[state=active]:bg-green-600 data-[state=active]:text-white"
                >
                  <Plus className="h-4 w-4" />
                  Tunjangan
                </TabsTrigger>
                <TabsTrigger
                  value="deduction"
                  className="flex items-center gap-2 data-[state=active]:bg-red-600 data-[state=active]:text-white"
                >
                  <Trash2 className="h-4 w-4" />
                  Potongan
                </TabsTrigger>
              </TabsList>

              <TabsContent value="allowance" className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-green-700">
                    Tambah Tunjangan
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Pilih pegawai dan isi detail tunjangan yang akan ditambahkan
                  </p>
                </div>

                <PegawaiSearchSection
                  selectedPegawai={selectedPegawai}
                  onTogglePegawai={togglePegawai}
                  onRemovePegawai={removePegawaiFromSelected}
                  onClearSelection={clearSelection}
                  isPegawaiSelected={isPegawaiSelected}
                  excludedPegawai={excludedPegawai}
                />

                {selectedPegawai.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="kode-tunjangan">Kode</Label>
                      <Input
                        id="kode-tunjangan"
                        type="text"
                        value={formData.kode}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            kode: e.target.value.toUpperCase(),
                          })
                        }
                        placeholder="BONUS_PROYEK"
                        className="border-green-200 focus:border-green-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="deskripsi-tunjangan">Deskripsi</Label>
                      <Input
                        id="deskripsi-tunjangan"
                        type="text"
                        value={formData.deskripsi}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            deskripsi: e.target.value,
                          })
                        }
                        placeholder="Bonus penyelesaian proyek"
                        className="border-green-200 focus:border-green-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nominal-tunjangan">Nominal</Label>
                      <Input
                        id="nominal-tunjangan"
                        type="number"
                        value={formData.nominal}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            nominal: parseFloat(e.target.value) || 0,
                          })
                        }
                        placeholder="1500000"
                        className="border-green-200 focus:border-green-500"
                      />
                    </div>
                  </div>
                )}

                <div className="flex gap-4">
                  <Button
                    onClick={addItemsForSelectedPegawai}
                    disabled={selectedPegawai.length === 0}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Tambahkan untuk {selectedPegawai.length} Pegawai
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="deduction" className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-red-700">
                    Tambah Potongan
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Pilih pegawai dan isi detail potongan yang akan ditambahkan
                  </p>
                </div>

                <PegawaiSearchSection
                  selectedPegawai={selectedPegawai}
                  onTogglePegawai={togglePegawai}
                  onRemovePegawai={removePegawaiFromSelected}
                  onClearSelection={clearSelection}
                  isPegawaiSelected={isPegawaiSelected}
                  excludedPegawai={excludedPegawai}
                />

                {selectedPegawai.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="kode-potongan">Kode</Label>
                      <Input
                        id="kode-potongan"
                        type="text"
                        value={formData.kode}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            kode: e.target.value.toUpperCase(),
                          })
                        }
                        placeholder="POTONGAN_KETERLAMBATAN"
                        className="border-red-200 focus:border-red-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="deskripsi-potongan">Deskripsi</Label>
                      <Input
                        id="deskripsi-potongan"
                        type="text"
                        value={formData.deskripsi}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            deskripsi: e.target.value,
                          })
                        }
                        placeholder="Potongan keterlambatan"
                        className="border-red-200 focus:border-red-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nominal-potongan">Nominal</Label>
                      <Input
                        id="nominal-potongan"
                        type="number"
                        value={formData.nominal}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            nominal: parseFloat(e.target.value) || 0,
                          })
                        }
                        placeholder="50000"
                        className="border-red-200 focus:border-red-500"
                      />
                    </div>
                  </div>
                )}

                <div className="flex gap-4">
                  <Button
                    onClick={addItemsForSelectedPegawai}
                    disabled={selectedPegawai.length === 0}
                    className="flex-1 bg-red-600 hover:bg-red-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Tambahkan untuk {selectedPegawai.length} Pegawai
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {excludedPegawai.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-600">
                <UserX className="h-5 w-5" />
                Daftar Pegawai Dikecualikan ({excludedPegawai.length} orang)
              </CardTitle>
              <CardDescription>
                Pegawai berikut tidak akan menerima gaji di periode{" "}
                {periode.bulan}/{periode.tahun}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>No</TableHead>
                    <TableHead>Nama Pegawai</TableHead>
                    <TableHead>NIP</TableHead>
                    <TableHead className="text-center">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {excludedPegawai.map((pegawai, index) => (
                    <TableRow key={pegawai.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell className="font-medium">
                        {pegawai.nama}
                      </TableCell>
                      <TableCell>{pegawai.nip}</TableCell>
                      <TableCell className="text-center">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeFromExclusion(pegawai.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Batalkan
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {allowances.length > 0 && (
          <ItemsTable
            title={`Daftar Tunjangan Tambahan (${allowances.length} item)`}
            items={allowances}
            onRemoveItem={(id: string) => removeItem(id, "allowance")}
            type="allowance"
          />
        )}

        {deductions.length > 0 && (
          <ItemsTable
            title={`Daftar Potongan Tambahan (${deductions.length} item)`}
            items={deductions}
            onRemoveItem={(id: string) => removeItem(id, "deduction")}
            type="deduction"
          />
        )}

        <Button
          onClick={handleGeneratePayroll}
          className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700"
          size="lg"
          disabled={generatePayrollMutation.isPending}
        >
          {generatePayrollMutation.isPending ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
              Generating...
            </>
          ) : (
            <>
              <Send className="h-5 w-5 mr-2" />
              Generate Payroll{" "}
              {new Date(2025, periode.bulan - 1).toLocaleString("id-ID", {
                month: "long",
              })}{" "}
              {periode.tahun}
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

// Sub-components untuk modularitas - VERSION FIXED
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

  // Use TanStack Query untuk fetch data pegawai
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

  // Extract data pegawai dari response API - langsung handle triple nested structure
  const availablePegawai = React.useMemo(() => {
    // Langsung akses struktur triple nested berdasarkan response Anda
    const apiData = pegawaiData?.data?.data?.data || [];

    console.log("Available pegawai data:", apiData); // Debug log

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

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.length >= 2) {
        // Query akan otomatis di-refetch
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Fungsi untuk handle toggle pegawai tanpa menutup popover
  const handleTogglePegawai = (pegawai: any) => {
    onTogglePegawai(pegawai);
    // Tidak menutup popover di sini
  };

  // Fungsi untuk handle select dari CommandItem (enter/click pada item)
  const handleSelectPegawai = (pegawai: any) => {
    onTogglePegawai(pegawai);
    setSearchQuery(""); // Reset search query tapi tidak menutup popover
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="search-pegawai">
          Cari & Pilih Pegawai (Multi-Select)
        </Label>
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
          <PopoverContent
            className="w-full p-0"
            align="start"
            // Mencegah penutupan otomatis ketika berinteraksi dengan konten
            // @ts-ignore
            onInteractOutside={(e) => {
              // Biarkan penutupan normal ketika klik di luar
              // Tidak perlu melakukan apa-apa khusus di sini
            }}
          >
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
                        onSelect={() => handleSelectPegawai(pegawai)}
                        className="flex items-center space-x-2 cursor-pointer"
                      >
                        <div
                          className="flex items-center space-x-2 w-full"
                          onClick={(e) => {
                            e.stopPropagation(); // Mencegah event bubble ke CommandItem
                            handleTogglePegawai(pegawai);
                          }}
                        >
                          <Checkbox
                            checked={isPegawaiSelected(pegawai.id)}
                            onCheckedChange={() => handleTogglePegawai(pegawai)}
                            // Mencegah event bubble
                            onClick={(e) => e.stopPropagation()}
                          />
                          <div className="flex-1">
                            <div className="font-medium">{pegawai.nama}</div>
                            <div className="text-sm text-muted-foreground">
                              NIP: {pegawai.nip}
                            </div>
                          </div>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}
              </CommandList>
            </Command>

            {/* Tombol untuk menutup popover secara manual */}
            <div className="p-2 border-t">
              <Button
                onClick={() => setOpen(false)}
                variant="outline"
                size="sm"
                className="w-full"
              >
                Tutup
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>

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
                <Badge
                  key={pegawai.id}
                  variant="secondary"
                  className="px-3 py-1"
                >
                  {pegawai.nama}
                  <button
                    onClick={() => onRemovePegawai(pegawai.id)}
                    className="ml-2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function ItemsTable({ title, items, onRemoveItem, type }: any) {
  const total = items.reduce((sum: number, item: any) => sum + item.nominal, 0);
  const isAllowance = type === "allowance";

  return (
    <Card>
      <CardHeader>
        <CardTitle className={isAllowance ? "text-green-600" : "text-red-600"}>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pegawai</TableHead>
              <TableHead>NIP</TableHead>
              <TableHead>Kode</TableHead>
              <TableHead>Deskripsi</TableHead>
              <TableHead className="text-right">Nominal</TableHead>
              <TableHead className="text-center">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item: any) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">
                  {item.pegawai_nama}
                </TableCell>
                <TableCell>{item.pegawai_nip}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      isAllowance
                        ? "bg-green-50 text-green-700 border-green-200"
                        : "bg-red-50 text-red-700 border-red-200"
                    }
                  >
                    {item.kode}
                  </Badge>
                </TableCell>
                <TableCell>{item.deskripsi}</TableCell>
                <TableCell
                  className={`text-right font-medium ${
                    isAllowance ? "text-green-600" : "text-red-600"
                  }`}
                >
                  Rp {item.nominal.toLocaleString("id-ID")}
                </TableCell>
                <TableCell className="text-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveItem(item.id)}
                    className={
                      isAllowance
                        ? "text-green-600 hover:text-green-700 hover:bg-green-50"
                        : "text-red-600 hover:text-red-700 hover:bg-red-50"
                    }
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            <TableRow className={isAllowance ? "bg-green-50" : "bg-red-50"}>
              <TableCell colSpan={4} className="text-right font-semibold">
                Total {isAllowance ? "Tunjangan" : "Potongan"}:
              </TableCell>
              <TableCell
                className={`text-right font-semibold ${
                  isAllowance ? "text-green-600" : "text-red-600"
                }`}
              >
                Rp {total.toLocaleString("id-ID")}
              </TableCell>
              <TableCell />
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
