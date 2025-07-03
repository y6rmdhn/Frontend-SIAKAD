import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

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

// Icons
import { Printer } from "lucide-react";

// Services
import dosenServices from "@/services/dosen.services";

// Tipe Data
interface GajiKomponen {
  id: number;
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

const Penggajian = () => {
  const { id } = useParams<{ id: string }>();

  // --- Data Fetching ---
  const {
    data: slipGaji,
    isLoading,
    isError,
    error,
  } = useQuery<SlipGajiDetail>({
    queryKey: ["slip-gaji-detail", id],
    queryFn: async () => {
      if (!id) throw new Error("ID slip gaji tidak ditemukan");
      const response = await dosenServices.getSlipGajiDetail(id);
      return response.data; // Asumsi data utama ada di response.data
    },
    enabled: !!id,
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
      window.location.reload(); // Untuk mengembalikan event listener, dll.
    }
  };

  // --- Loading & Error States ---
  if (isLoading) {
    return (
      <div className="mt-10 mb-20">
        <Title title="Penggajian" subTitle="Detail Penggajian" />
        <div className="flex justify-end">
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
      <Title
        title="Penggajian"
        subTitle={slipGaji?.periode.nama_periode || "Detail Penggajian"}
      />

      <div className="flex justify-end">
        <Button
          onClick={handlePrint}
          variant="outline"
          className="flex items-center gap-2"
        >
          <Printer className="w-4 h-4" /> Cetak
        </Button>
      </div>

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
    </div>
  );
};

export default Penggajian;
