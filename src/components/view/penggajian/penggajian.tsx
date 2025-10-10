import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

// UI Components
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
interface GajiKomponen {
  id: string;
  kode_komponen: string;
  deskripsi: string;
  nominal: string;
}

interface SlipGajiDetail {
  total_pendapatan: string;
  total_potongan: string;
  gaji_bersih: string;
  periode: {
    nama_periode: string;
  };
  komponen_pendapatan: GajiKomponen[];
  komponen_potongan: GajiKomponen[];
}

interface PeriodeGaji {
  id: string;
  nama_periode: string;
}

interface SlipGajiListItem {
  id: string;
  periode_id: string;
  pegawai_id: string;
  total_pendapatan: string;
  total_potongan: string;
  gaji_bersih: string;
  created_at: string;
  updated_at: string;
  periode: PeriodeGaji;
}

interface SlipGajiListResponse {
  data: SlipGajiListItem[];
  current_page: number;
  total: number;
}

const Penggajian = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedPeriodeId, setSelectedPeriodeId] = useState<string>("");

  // --- Data Fetching untuk Daftar Periode ---
  const { data: daftarPeriode, isLoading: isLoadingPeriode } =
    useQuery<SlipGajiListResponse>({
      queryKey: ["daftar-periode-gaji"],
      queryFn: async () => {
        if (!id) throw new Error("ID pegawai tidak ditemukan");
        const response = await dosenServices.getPeriodeDosen();
        return response.data;
      },
    });

  // --- Data Fetching untuk Detail Slip Gaji ---
  const {
    data: slipGaji,
    isLoading: isLoadingDetail,
    isError,
    error,
  } = useQuery<SlipGajiDetail>({
    queryKey: ["slip-gaji-detail", selectedPeriodeId],
    queryFn: async () => {
      if (!selectedPeriodeId) throw new Error("Periode belum dipilih");
      const response = await dosenServices.getSlipGajiDetail(selectedPeriodeId);
      return response.data;
    },
    enabled: !!selectedPeriodeId,
  });

  // Set selectedPeriodeId otomatis ketika daftarPeriode berhasil di-fetch
  useState(() => {
    if (
      daftarPeriode?.data &&
      daftarPeriode.data.length > 0 &&
      !selectedPeriodeId
    ) {
      setSelectedPeriodeId(daftarPeriode.data[0].id);
    }
  });

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
  if (isLoadingPeriode) {
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
          subTitle={slipGaji?.periode.nama_periode || "Pilih Periode"}
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
              {daftarPeriode?.data.map((periode) => (
                <SelectItem key={periode.id} value={periode.id}>
                  {periode.periode.nama_periode}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Tombol Cetak */}
          <Button
            onClick={handlePrint}
            variant="outline"
            className="flex items-center gap-2"
            disabled={!slipGaji}
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
      ) : isLoadingDetail ? (
        <div className="border rounded-lg mt-4 p-4">
          <div className="space-y-2">
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        </div>
      ) : (
        <div id="printArea" className="border rounded-lg mt-4 p-4">
          <h2 className="text-xl font-bold text-center mb-2">Slip Gaji</h2>
          <p className="text-center text-md mb-6">
            {slipGaji?.periode.nama_periode}
          </p>

          <Table className="table-auto text-xs md:text-sm">
            <TableHeader>
              <TableRow className="bg-gray-200 hover:bg-gray-200">
                <TableHead className="text-center text-black font-semibold">
                  No
                </TableHead>
                <TableHead className="text-black font-semibold">Kode</TableHead>
                <TableHead className="text-black font-semibold">
                  Deskripsi
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
              {slipGaji?.komponen_pendapatan.map((item, index) => (
                <TableRow
                  key={`pendapatan-${item.id}`}
                  className="hover:bg-gray-50"
                >
                  <TableCell className="text-center">{index + 1}</TableCell>
                  <TableCell>{item.kode_komponen}</TableCell>
                  <TableCell>{item.deskripsi}</TableCell>
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
                  {formatRupiah(slipGaji?.total_pendapatan)}
                </TableCell>
              </TableRow>

              {/* Bagian Potongan */}
              <TableRow className="bg-red-100 font-bold">
                <TableCell colSpan={4} className="py-2 text-red-800">
                  B. Potongan
                </TableCell>
              </TableRow>
              {slipGaji?.komponen_potongan.map((item, index) => (
                <TableRow
                  key={`potongan-${item.id}`}
                  className="hover:bg-gray-50"
                >
                  <TableCell className="text-center">{index + 1}</TableCell>
                  <TableCell>{item.kode_komponen}</TableCell>
                  <TableCell>{item.deskripsi}</TableCell>
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
                  ({formatRupiah(slipGaji?.total_potongan)})
                </TableCell>
              </TableRow>

              {/* Total Gaji Bersih */}
              <TableRow className="bg-green-100 text-green-800 font-bold text-base">
                <TableCell colSpan={3} className="text-right">
                  Gaji Bersih (Take Home Pay)
                </TableCell>
                <TableCell className="text-right">
                  {formatRupiah(slipGaji?.gaji_bersih)}
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
