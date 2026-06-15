import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

// UI Components
// @ts-ignore
import Title from "@/components/blocks/Title";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Icons
import { Printer } from "lucide-react";

// Services
import dosenServices from "@/services/dosen.services";

// Tipe Data
interface BackendGajiDetailKomponen {
  id: string;
  penggajian_id: string;
  nama_komponen: string;
  jenis: "TUNJANGAN" | "POTONGAN";
  nominal: string;
  created_at: string;
  updated_at: string;
}

interface BackendGajiRecord {
  id: string;
  pegawai_id: string;
  periode_bulan: number;
  periode_tahun: number;
  total_kehadiran: number;
  total_tunjangan_tetap: string;
  total_tunjangan_variabel: string;
  total_potongan: string;
  gaji_bersih: string;
  created_at: string;
  updated_at: string;
  pegawai: {
    id: string;
    nama: string;
    nip: string;
  };
  detail_komponen: BackendGajiDetailKomponen[];
}

const Penggajian = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedPeriodeId, setSelectedPeriodeId] = useState<string>("");

  // --- Data Fetching untuk Daftar Riwayat ---
  const { data: listGaji, isLoading, isError, error } =
    useQuery<BackendGajiRecord[]>({
      queryKey: ["daftar-riwayat-gaji", id],
      queryFn: async () => {
        const response = await dosenServices.getSlipGaji();
        return response.data?.data || [];
      },
    });

  // Set selectedPeriodeId otomatis ketika listGaji berhasil di-fetch
  useEffect(() => {
    if (listGaji && listGaji.length > 0 && !selectedPeriodeId) {
      const match = listGaji.find((slip) => slip.id === id);
      if (match) {
        setSelectedPeriodeId(match.id);
      } else {
        setSelectedPeriodeId(listGaji[0].id);
      }
    }
  }, [listGaji, selectedPeriodeId, id]);

  const activeSlip = listGaji?.find((slip) => slip.id === selectedPeriodeId);

  const getNamaPeriode = (bulan: number, tahun: number) => {
    const namaBulan = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];
    return `${namaBulan[bulan - 1]} ${tahun}`;
  };

  const activePeriodeName = activeSlip
    ? getNamaPeriode(activeSlip.periode_bulan, activeSlip.periode_tahun)
    : "";

  const komponenPendapatan = activeSlip
    ? activeSlip.detail_komponen.filter((k) => k.jenis === "TUNJANGAN")
    : [];

  const komponenPotongan = activeSlip
    ? activeSlip.detail_komponen.filter((k) => k.jenis === "POTONGAN")
    : [];

  const totalPendapatan = activeSlip
    ? (parseFloat(activeSlip.total_tunjangan_tetap) || 0) + (parseFloat(activeSlip.total_tunjangan_variabel) || 0)
    : 0;

  // --- Helper Functions ---
  const formatRupiah = (angka: string | number | undefined) => {
    if (angka === undefined || angka === null) return "Rp 0";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(Number(angka));
  };

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

  // --- Loading & Error States ---
  if (isLoading) {
    return (
      <div className="mt-10 mb-20">
        <Title title="Penggajian" subTitle="Detail Penggajian" />
        <div className="flex justify-between items-center mb-4">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-10 w-24" />
        </div>
        <div className="mt-10 space-y-2">
          {[...Array(10)].map((_, i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mt-10 mb-20 text-center">
        <Title title="Penggajian" subTitle="Detail Penggajian" />
        <p className="text-red-500 mt-10">
          Gagal memuat data: {(error as Error).message}
        </p>
      </div>
    );
  }

  return (
    <div className="mt-10 mb-20">
      <div className="flex justify-between items-center mb-4">
        <Title
          title="Penggajian"
          subTitle={activePeriodeName || "Pilih Periode"}
        />

        <div className="flex items-center gap-4">
          {/* Filter Periode */}
          <Select
            value={selectedPeriodeId}
            onValueChange={setSelectedPeriodeId}
          >
            <SelectTrigger className="w-64">
              <SelectValue placeholder="Pilih Periode" />
            </SelectTrigger>
            <SelectContent>
              {listGaji?.map((slip) => (
                <SelectItem key={slip.id} value={slip.id}>
                  {getNamaPeriode(slip.periode_bulan, slip.periode_tahun)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Tombol Cetak */}
          <Button
            onClick={handlePrint}
            variant="outline"
            className="flex items-center gap-2"
            disabled={!activeSlip}
          >
            <Printer className="w-4 h-4" /> Cetak
          </Button>
        </div>
      </div>

      {!selectedPeriodeId ? (
        <div className="text-center py-8 border rounded-lg">
          <p className="text-gray-500">
            Silakan pilih periode untuk melihat slip gaji
          </p>
        </div>
      ) : (
        <div id="printArea" className="border rounded-lg mt-4 p-4 bg-white">
          <h2 className="text-xl font-bold text-center mb-2">Slip Gaji</h2>
          <p className="text-center text-md mb-6">
            {activePeriodeName}
          </p>

          <Table className="table-auto text-xs md:text-sm">
            <TableHeader>
              <TableRow className="bg-gray-200 hover:bg-gray-200">
                <TableHead className="text-center text-black font-semibold">
                  No
                </TableHead>
                <TableHead colSpan={2} className="text-black font-semibold">
                  Komponen Gaji / Tunjangan
                </TableHead>
                <TableHead className="text-right text-black font-semibold">
                  Nominal
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Bagian Pendapatan */}
              <TableRow className="bg-gray-100 font-bold">
                <TableCell colSpan={4} className="py-2">
                  A. Pendapatan
                </TableCell>
              </TableRow>
              {komponenPendapatan.map((item, index) => (
                <TableRow
                  key={`pendapatan-${item.id}`}
                  className="hover:bg-gray-50"
                >
                  <TableCell className="text-center">{index + 1}</TableCell>
                  <TableCell colSpan={2}>{item.nama_komponen}</TableCell>
                  <TableCell className="text-right">
                    {formatRupiah(item.nominal)}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow className="bg-gray-100 font-semibold">
                <TableCell colSpan={3} className="text-right">
                  Total Pendapatan
                </TableCell>
                <TableCell className="text-right">
                  {formatRupiah(totalPendapatan)}
                </TableCell>
              </TableRow>

              {/* Bagian Potongan */}
              <TableRow className="bg-red-100 font-bold">
                <TableCell colSpan={4} className="py-2 text-red-800">
                  B. Potongan
                </TableCell>
              </TableRow>
              {komponenPotongan.map((item, index) => (
                <TableRow
                  key={`potongan-${item.id}`}
                  className="hover:bg-gray-50"
                >
                  <TableCell className="text-center">{index + 1}</TableCell>
                  <TableCell colSpan={2}>{item.nama_komponen}</TableCell>
                  <TableCell className="text-right text-red-600">
                    ({formatRupiah(item.nominal)})
                  </TableCell>
                </TableRow>
              ))}
              <TableRow className="bg-red-100 font-semibold">
                <TableCell colSpan={3} className="text-right text-red-800">
                  Total Potongan
                </TableCell>
                <TableCell className="text-right text-red-600">
                  ({formatRupiah(activeSlip?.total_potongan)})
                </TableCell>
              </TableRow>

              {/* Total Gaji Bersih */}
              <TableRow className="bg-green-100 text-green-800 font-bold text-base">
                <TableCell colSpan={3} className="text-right">
                  Gaji Bersih (Take Home Pay)
                </TableCell>
                <TableCell className="text-right">
                  {formatRupiah(activeSlip?.gaji_bersih)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default Penggajian;
