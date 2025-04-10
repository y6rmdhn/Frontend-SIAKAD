import CustomCard from "@/components/commons/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Dasboard = () => {
  return (
    <div className="mt-10">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <CustomCard
        actions={
          <div>
            <Label>Unit Kerja</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="04101-Universitas Ibn Khaldun Bogor" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Semua</SelectLabel>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        }
      />

      <div className="grid grid-cols-4 gap-10">
        <div className="bg-[#28BCB7] h-40 rounded-md ">
          <h1 className="text-2xl font-semibold">Jumlah Pegawai Aktif</h1>
        </div>
        <div className="bg-[#66D820] h-40 rounded-md">
          <h1 className="text-2xl font-semibold">
            Jumlah Pegawai Pendidik (Akademik)
          </h1>
        </div>
        <div className="bg-[#FFAC07] h-40 rounded-md">
          <h1 className="text-2xl font-semibold">
            Jumlah Pegawai Kependidikan (Non Akademik)
          </h1>
        </div>
        <div className="bg-[#D22D17] h-40 rounded-md">
          <h1 className="text-2xl font-semibold">
            Jumlah Pegawai Tidak Aktif{" "}
          </h1>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-5 mt-10">
        <CustomCard>
          <h1>Statistik Kepegawaian</h1>
          <div className="flex gap-3">
            <Button>Fungsional</Button>
            <Button>Fungsional</Button>
            <Button>Fungsional</Button>
          </div>
          <Table className="mt-3 table-auto">
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead className="text-center">No</TableHead>
                <TableHead className="text-center">Fungsional</TableHead>
                <TableHead className="text-center">Jumlah</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-200">
              <TableRow className=" even:bg-gray-100">
                <TableCell className="text-center flex flex-col">1</TableCell>
                <TableCell className="text-center">PNS/DPK</TableCell>
                <TableCell className="text-center">Guru Besar</TableCell>
              </TableRow>
              <TableRow className=" even:bg-gray-100">
                <TableCell className="text-center flex flex-col">2</TableCell>
                <TableCell className="text-center">PNS/DPK</TableCell>
                <TableCell className="text-center">Guru Besar</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CustomCard>
        <div className="flex flex-col gap-5">
          <CustomCard>
            <h1>Pemberitahuan</h1>
          </CustomCard>
          <CustomCard>
            <h1>Berita</h1>
          </CustomCard>
        </div>
      </div>
    </div>
  );
};

export default Dasboard;
