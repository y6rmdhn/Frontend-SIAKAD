import { useState } from "react";
import CustomCard from "../Card/CustomCard";
import { IoStatsChart } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { ChartLingkaran } from "@/components/commons/Charts/PieChart/ChartLingkaran";
import { FaCircle } from "react-icons/fa";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BarChartWithLabel } from "@/components/commons/Charts/BarChart/BarChartLabel";
import { BarChartJenjagPendidikan } from "@/components/commons/Charts/BarChart/BarChartJenjangPendidikan";
import { BarChartPendidikanNonAkademik } from "@/components/commons/Charts/BarChart/BarChartPendidikanNonAkademik";

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

const CardStatistikPegawai = () => {
  const [aktifBtn, setAktifBtn] = useState<string>("Fungsional");
  return (
    <div>
      <CustomCard
        actions={
          <h1 className="flex gap-3 items-center">
            <IoStatsChart />{" "}
            <span className="text-lg font-semibold">Statistik Kepegawaian</span>
          </h1>
        }
        cardStyle="border-t-[#106D63]"
      >
        <div className="flex gap-2">
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
          <Button
            onClick={() => setAktifBtn("Pendidikan Non Akademik")}
            className={
              aktifBtn === "Pendidikan Non Akademik"
                ? "bg-[#FFAC07] hover:bg-[#FFAC07] cursor-pointer"
                : "bg-[#CDCDCD] hover:bg-[#CDCDCD] cursor-pointer"
            }
          >
            Pendidikan Non Akademik
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
                  <TableCell className="text-center flex flex-col">1</TableCell>
                  <TableCell className="text-center">1</TableCell>
                  <TableCell className="text-center">Guru Besar</TableCell>
                </TableRow>
                <TableRow className=" even:bg-gray-100">
                  <TableCell className="text-center flex flex-col">2</TableCell>
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
                  <TableCell className="text-center flex flex-col">1</TableCell>
                  <TableCell className="text-center">1</TableCell>
                  <TableCell className="text-center">Guru Besar</TableCell>
                </TableRow>
                <TableRow className=" even:bg-gray-100">
                  <TableCell className="text-center flex flex-col">2</TableCell>
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
        ) : aktifBtn === "Pendidikan" ? (
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
                    <span className="text-sm">Jenjang Pendidikan</span>
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
                  <TableCell className="text-center flex flex-col">1</TableCell>
                  <TableCell className="text-center">1</TableCell>
                  <TableCell className="text-center">Guru Besar</TableCell>
                </TableRow>
                <TableRow className=" even:bg-gray-100">
                  <TableCell className="text-center flex flex-col">2</TableCell>
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
            <BarChartPendidikanNonAkademik
              title="Berdasarkan Jenjang pendidikan"
              data={chartDataBar}
              dataKey="desktop"
              config={chartConfigBar}
              footer={
                <div className="flex gap-5 items-center justify-center">
                  <div>
                    <FaCircle className="w-3 h-3 text-[#32A14C] inline-block" />{" "}
                    <span className="text-sm">Jenjang Pendidikan</span>
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
                  <TableCell className="text-center flex flex-col">1</TableCell>
                  <TableCell className="text-center">1</TableCell>
                  <TableCell className="text-center">Guru Besar</TableCell>
                </TableRow>
                <TableRow className=" even:bg-gray-100">
                  <TableCell className="text-center flex flex-col">2</TableCell>
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
    </div>
  );
};

export default CardStatistikPegawai;
