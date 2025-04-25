import CustomCard from "@/components/commons/card";
import { FaGraduationCap } from "react-icons/fa";
import { IoPersonOutline } from "react-icons/io5";
import { FaUserGroup } from "react-icons/fa6";
import { MdOutlinePersonRemove } from "react-icons/md";
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
import { useState } from "react";
import { IoStatsChart } from "react-icons/io5";
import { RiErrorWarningLine } from "react-icons/ri";
import { HiSpeakerphone } from "react-icons/hi";
import { ChartLingkaran } from "@/components/commons/Charts/PieChart/ChartLingkaran";
import { FaCircle } from "react-icons/fa";
import { BarChartWithLabel } from "@/components/commons/Charts/BarChart/BarChartLabel";
import { TrendingUp } from "lucide-react";
import { BarChartJenjagPendidikan } from "@/components/commons/Charts/BarChart/BarChartJenjangPendidikan";

const pieData = [
  { browser: "akademik", visitors: 275, fill: "#92F1A8" },
  { browser: "non akademik", visitors: 200, fill: "#32A14C" },
];

const pieConfig = {
  visitors: { label: "Visitors" },
  chrome: { label: "Chrome", color: "#4285F4" },
};

const chartDataBar = [
  { month: "H1", desktop: 186 },
  { month: "H2", desktop: 305 },
  { month: "H3", desktop: 237 },
  { month: "H4", desktop: 73 },
  { month: "H5", desktop: 209 },
];

const chartConfigBar = {
  desktop: {
    label: "Hubungan Kerja",
    color: "#46C764",
  },
};

const Dasboard = () => {
  const [aktifBtn, setAktifBtn] = useState("Fungsional");
  return (
    <div className="mt-10 mb-20">
      <h1 className="text-2xl font-normal">Dashboard</h1>
      <CustomCard
        actions={
          <div className="flex gap-30">
            <Label className="text-[#FFAC07]">Unit Kerja</Label>
            <Select>
              <SelectTrigger className="w-96">
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

      <div className="grid grid-cols-4 gap-10 mt-6">
        <div className="bg-[#28BCB7] h-40 rounded-xl text-white flex items-center justify-center relative">
          <div className="relative w-full h-full flex items-center justify-center">
            <h1 className="text-[20px] font-semibold flex flex-col items-center">
              Jumlah Pegawai Aktif
              <p className="text-4xl font-semibold mt-3">611</p>{" "}
            </h1>
            <IoPersonOutline className="w-14 h-14 absolute bottom-0 left-1 " />
          </div>
        </div>

        <div className="bg-[#66D820] h-40 rounded-xl text-white flex items-center justify-center relative">
          <div className="relative w-full h-full flex items-center justify-center">
            <h1 className="text-[20px] text-center font-semibold flex flex-col items-center">
              Jumlah Pegawai (Akademik)
              <p className="text-4xl font-semibold mt-1">655</p>{" "}
            </h1>
            <FaGraduationCap className="w-14 h-14 absolute bottom-0 left-1" />
          </div>
        </div>

        <div className="bg-[#FFAC07] h-40 rounded-xl text-white flex items-center justify-center relative">
          <div className="relative w-full h-full flex items-center justify-center">
            <h1 className="text-[20px] text-center font-semibold flex flex-col items-center">
              Jumlah Pegawai (Non Akademik)
              <p className="text-4xl font-semibold mt-1">319</p>{" "}
            </h1>
            <FaUserGroup className="w-14 h-14 absolute bottom-0 left-1" />
          </div>
        </div>

        <div className="bg-[#D22D17] h-40 rounded-xl text-white flex items-center justify-center relative">
          <div className="relative w-full h-full flex items-center justify-center">
            <h1 className="text-[20px] text-center font-semibold flex flex-col items-center">
              Jumlah Pegawai Tidak Aktif
              <p className="text-4xl font-semibold mt-1">373</p>{" "}
            </h1>
            <MdOutlinePersonRemove className="w-14 h-14 absolute bottom-0 left-1" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5 mt-10">
        <CustomCard
          actions={
            <h1 className="flex gap-3 items-center">
              <IoStatsChart />{" "}
              <span className="text-lg font-semibold">
                Statistik Kepegawaian
              </span>
            </h1>
          }
          cardStyle="border-t-[#106D63]"
        >
          <div className="flex gap-3">
            <Button
              onClick={() => setAktifBtn("Fungsional")}
              className={
                aktifBtn === "Fungsional"
                  ? "bg-[#FFAC07] hover:bg-[#FFAC07] cursor-pointer"
                  : "bg-[#CDCDCD] hover:bg-[#CDCDCD] cursor-pointer"
              }
            >
              Fungsional
            </Button>
            <Button
              onClick={() => setAktifBtn("Hubungan Kerja")}
              className={
                aktifBtn === "Hubungan Kerja"
                  ? "bg-[#FFAC07] hover:bg-[#FFAC07] cursor-pointer"
                  : "bg-[#CDCDCD] hover:bg-[#CDCDCD] cursor-pointer"
              }
            >
              Hubungan Kerja
            </Button>
            <Button
              onClick={() => setAktifBtn("Pendidikan")}
              className={
                aktifBtn === "Pendidikan"
                  ? "bg-[#FFAC07] hover:bg-[#FFAC07] cursor-pointer"
                  : "bg-[#CDCDCD] hover:bg-[#CDCDCD] cursor-pointer"
              }
            >
              Pendidikan
            </Button>
          </div>

          {aktifBtn === "Fungsional" ? (
            <div className="mt-10">
              <ChartLingkaran
                title="Jabatan Fungsional"
                data={pieData}
                dataKey="visitors"
                nameKey="browser"
                config={pieConfig}
                valueLabel="Visitors"
                titleFooter={
                  <div className="flex gap-5 items-center">
                    <div>
                      <FaCircle className="w-3 h-3 text-[#92F1A8] inline-block" />{" "}
                      <span className="text-sm">Akademik</span>
                    </div>
                    <div>
                      <FaCircle className="w-3 h-3 text-[#32A14C] inline-block" />{" "}
                      <span className="text-sm">Non Akademik</span>
                    </div>
                  </div>
                }
              />

              <Table className="mt-3 table-auto">
                <TableHeader>
                  <TableRow className="bg-[#056C7A] hover:bg-[#056C7A]">
                    <TableHead className="text-center text-white">No</TableHead>
                    <TableHead className="text-center text-white">
                      Fungsional
                    </TableHead>
                    <TableHead className="text-center text-white">
                      Jumlah
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="divide-y divide-gray-200">
                  <TableRow className=" even:bg-gray-100">
                    <TableCell className="text-center flex flex-col">
                      1
                    </TableCell>
                    <TableCell className="text-center">1</TableCell>
                    <TableCell className="text-center">Guru Besar</TableCell>
                  </TableRow>
                  <TableRow className=" even:bg-gray-100">
                    <TableCell className="text-center flex flex-col">
                      2
                    </TableCell>
                    <TableCell className="text-center">2</TableCell>
                    <TableCell className="text-center">Guru Besar</TableCell>
                  </TableRow>
                  <TableRow className=" even:bg-gray-100">
                    <TableCell className="text-center flex flex-col"></TableCell>
                    <TableCell className="text-center">Total</TableCell>
                    <TableCell className="text-center">475</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          ) : aktifBtn === "Hubungan Kerja" ? (
            <div className="mt-10">
              <BarChartWithLabel
                title="Berdasarkan Hubungan Kerja"
                data={chartDataBar}
                dataKey="desktop"
                config={chartConfigBar}
                footer={
                  <div className="flex gap-5 items-center justify-center">
                    <div>
                      <FaCircle className="w-3 h-3 text-[#32A14C] inline-block" />{" "}
                      <span className="text-sm">Hubungan Kerja</span>
                    </div>
                  </div>
                }
              />

              <Table className="mt-3 table-auto">
                <TableHeader>
                  <TableRow className="bg-[#056C7A] hover:bg-[#056C7A]">
                    <TableHead className="text-center text-white">No</TableHead>
                    <TableHead className="text-center text-white">
                      Fungsional
                    </TableHead>
                    <TableHead className="text-center text-white">
                      Jumlah
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="divide-y divide-gray-200">
                  <TableRow className=" even:bg-gray-100">
                    <TableCell className="text-center flex flex-col">
                      1
                    </TableCell>
                    <TableCell className="text-center">1</TableCell>
                    <TableCell className="text-center">Guru Besar</TableCell>
                  </TableRow>
                  <TableRow className=" even:bg-gray-100">
                    <TableCell className="text-center flex flex-col">
                      2
                    </TableCell>
                    <TableCell className="text-center">2</TableCell>
                    <TableCell className="text-center">Guru Besar</TableCell>
                  </TableRow>
                  <TableRow className=" even:bg-gray-100">
                    <TableCell className="text-center flex flex-col"></TableCell>
                    <TableCell className="text-center">Total</TableCell>
                    <TableCell className="text-center">475</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="mt-10">
              <BarChartJenjagPendidikan
                title="Berdasarkan Jenjang pendidikan"
                data={chartDataBar}
                dataKey="desktop"
                config={chartConfigBar}
                footer={
                  <div className="flex gap-5 items-center justify-center">
                    <div>
                      <FaCircle className="w-3 h-3 text-[#32A14C] inline-block" />{" "}
                      <span className="text-sm">Hubungan Kerja</span>
                    </div>
                  </div>
                }
              />

              <Table className="mt-3 table-auto">
                <TableHeader>
                  <TableRow className="bg-[#056C7A] hover:bg-[#056C7A]">
                    <TableHead className="text-center text-white">No</TableHead>
                    <TableHead className="text-center text-white">
                      Fungsional
                    </TableHead>
                    <TableHead className="text-center text-white">
                      Jumlah
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="divide-y divide-gray-200">
                  <TableRow className=" even:bg-gray-100">
                    <TableCell className="text-center flex flex-col">
                      1
                    </TableCell>
                    <TableCell className="text-center">1</TableCell>
                    <TableCell className="text-center">Guru Besar</TableCell>
                  </TableRow>
                  <TableRow className=" even:bg-gray-100">
                    <TableCell className="text-center flex flex-col">
                      2
                    </TableCell>
                    <TableCell className="text-center">2</TableCell>
                    <TableCell className="text-center">Guru Besar</TableCell>
                  </TableRow>
                  <TableRow className=" even:bg-gray-100">
                    <TableCell className="text-center flex flex-col"></TableCell>
                    <TableCell className="text-center">Total</TableCell>
                    <TableCell className="text-center">475</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          )}
        </CustomCard>

        <div className="flex flex-col gap-5">
          <CustomCard
            actions={
              <h1 className="flex gap-3 items-center text-[#DA2A21]">
                <RiErrorWarningLine className="w-5! h-5!" />{" "}
                <span className="text-lg font-semibold">Pemberitahuan</span>
              </h1>
            }
            cardStyle="border-t-[#DA2A21]"
          >
            <h1>Pemberitahuan</h1>
          </CustomCard>

          <CustomCard
            actions={
              <h1 className="flex gap-3 items-center">
                <HiSpeakerphone />{" "}
                <span className="text-lg font-semibold text-[#106D63]">
                  Berita
                </span>
              </h1>
            }
            cardStyle="border-t-[#106D63]"
          >
            <h1>Berita</h1>
          </CustomCard>
        </div>
      </div>
    </div>
  );
};

export default Dasboard;
