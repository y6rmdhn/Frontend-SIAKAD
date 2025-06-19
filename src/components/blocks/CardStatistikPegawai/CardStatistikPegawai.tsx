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
import { cn } from "@/lib/utils";
import { ReactNode } from "react";


interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
  }[];
}

type FungsionalTableRow = (string | number)[];

interface ObjectTableRow {
  kode: number | string;
  jenjang_pendidikan?: string;
  hubungan_kerja?: string;
  jumlah: number;
  [key: string]: any;
}

interface TableData<T> {
  headers: string[];
  rows: T[];
  total?: number | string;
}

interface CardStatistikPegawaiProps {
  staffDistribution: {
    chart_data: ChartData;
    table_data: TableData<FungsionalTableRow>;
  };
  workRelationships: {
    chart_data: ChartData;
    table_data: TableData<ObjectTableRow>;
  };
  academicEducation: {
    chart_data: ChartData;
    table_data: TableData<ObjectTableRow>;
  };
  nonAcademicEducation: {
    chart_data: ChartData;
    table_data: TableData<ObjectTableRow>;
  };
}


const pieConfig = {
  visitors: { label: "Visitors" },
  chrome: { label: "Chrome", color: "#4285F4" },
};

const chartConfigBar = {
  desktop: {
    label: "Hubungan Kerja",
    color: "#46C764",
  },
};

const CardStatistikPegawai = ({
                                academicEducation,
                                nonAcademicEducation,
                                staffDistribution,
                                workRelationships,
                              }: CardStatistikPegawaiProps) => {
  const [aktifBtn, setAktifBtn] = useState<string>("Fungsional");
  const { chart_data: staffData, table_data: tabelStaff } = staffDistribution;
  const { chart_data: hubunganKerjaData, table_data: tabelHubunganKerja } =
      workRelationships;
  const { chart_data: academicChart, table_data: tabelAcademic } =
      academicEducation;
  const { chart_data: nonAcademicChart, table_data: tabelNonAcademic } =
      nonAcademicEducation;

  // pie chart
  const colors = ["#4F46E5", "#10B981"];
  const staffChartData = staffData.labels.map((label: string, index: number) => ({
    name: label,
    values: staffData.datasets[0].data[index],
    fill: colors[index % colors.length],
  }));

  // bar chart hubungan kerja
  const hubunganKerjaChartData = hubunganKerjaData.labels.map(
      (label: string, index: number) => ({
        name: label,
        values: hubunganKerjaData.datasets[0].data[index],
      })
  );

  // bar chart pendidikan
  const pendidikanChartData = academicChart.labels.map(
      (label: string, index: number) => ({
        name: label,
        values: academicChart.datasets[0].data[index],
      })
  );

  // bar chart non akademik
  const nonpendidikanChartData = nonAcademicChart.labels.map(
      (label: string, index: number) => ({
        name: label,
        values: nonAcademicChart.datasets[0].data[index],
      })
  );

  const renderContent = (): ReactNode => {
    switch (aktifBtn) {
      case "Fungsional":
        return (
            <div className="mt-10">
              <ChartLingkaran
                  title="Jabatan Fungsional"
                  data={staffChartData}
                  dataKey="values"
                  nameKey="name"
                  config={pieConfig}
                  valueLabel="Jumlah"
                  titleFooter={
                    <div className="flex flex-wrap gap-5 items-center">
                      {staffChartData.map((item, index) => (
                          <div className="flex gap-2 items-center" key={index}>
                            <FaCircle
                                className={`w-3 h-3 inline-block`}
                                style={{ color: item.fill }}
                            />
                            <span className="text-sm">{item.name}</span>
                          </div>
                      ))}
                    </div>
                  }
              />
              <Table className="mt-3 table-auto border-b-4 border-b-[#056C7A]">
                <TableHeader>
                  <TableRow className="bg-[#056C7A] hover:bg-[#056C7A]">
                    {tabelStaff.headers.map((item: string, index: number) => (
                        <TableHead key={index} className="text-center text-white">
                          {item}
                        </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody className="divide-y divide-gray-200">
                  {tabelStaff.rows.map((row: FungsionalTableRow, rowIndex: number) => (
                      <TableRow key={rowIndex} className="even:bg-gray-100">
                        {row.map((cell: string | number, cellIndex: number) => (
                            <TableCell className="text-center" key={cellIndex}>
                              {cell}
                            </TableCell>
                        ))}
                      </TableRow>
                  ))}

                  {tabelStaff.total && (
                      <TableRow className="border-b-2 border-b-[#056C7A]">
                        <TableCell></TableCell>
                        <TableCell className="text-center">Total</TableCell>
                        <TableCell className="text-center">
                          {tabelStaff.total}
                        </TableCell>
                      </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
        );
      case "Hubungan Kerja":
        return (
            <div className="mt-10">
              <BarChartWithLabel
                  title="Berdasarkan Hubungan Kerja"
                  data={hubunganKerjaChartData} // MEMPERBAIKI: Menggunakan data dari props, bukan data statis
                  dataKey="values"
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
                    {tabelHubunganKerja.headers.map((item: string, index: number) => (
                        <TableHead key={index} className="text-center text-white">{item}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody className="divide-y divide-gray-200">
                  {tabelHubunganKerja.rows.map((item: ObjectTableRow, index: number) => (
                      <TableRow key={index} className=" even:bg-gray-100">
                        {/* MEMPERBAIKI: Menampilkan properti dari objek, bukan objeknya langsung */}
                        <TableCell className="text-center">{item.kode}</TableCell>
                        <TableCell className="text-center">{item.hubungan_kerja}</TableCell>
                        <TableCell className="text-center">{item.jumlah}</TableCell>
                      </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
        );
      case "Pendidikan":
        return (
            <div className="mt-10">
              <BarChartWithLabel
                  title="Berdasarkan Jenjang Pendidikan"
                  data={pendidikanChartData}
                  dataKey="values"
                  config={chartConfigBar}
                  footer={
                    <div className="flex gap-5 items-center justify-center">
                      <div className="flex gap-2 items-center">
                        <FaCircle className="w-3 h-3 text-[#32A14C] inline-block" />
                        <span className="text-sm">
                      {academicChart.datasets[0].label}
                    </span>
                      </div>
                    </div>
                  }
              />
              <Table className="mt-3 table-auto">
                <TableHeader>
                  <TableRow className="bg-[#056C7A] hover:bg-[#056C7A]">
                    {tabelAcademic.headers.map((item: string, index: number) => (
                        <TableHead key={index} className="text-center text-white">
                          {item}
                        </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody className="divide-y divide-gray-200">
                  {tabelAcademic.rows.map((item: ObjectTableRow, index: number) => (
                      <TableRow key={index} className=" even:bg-gray-100">
                        <TableCell className="text-center">{item.kode}</TableCell>
                        <TableCell className="text-center">
                          {item.jenjang_pendidikan}
                        </TableCell>
                        <TableCell className="text-center">{item.jumlah}</TableCell>
                      </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
        );
      case "Pendidikan Non Akademik":
        return (
            <div className="mt-10">
              <BarChartWithLabel
                  title="Berdasarkan Jenjang Pendidikan Non Akademik"
                  data={nonpendidikanChartData}
                  dataKey="values"
                  config={chartConfigBar}
                  footer={
                    <div className="flex gap-5 items-center justify-center">
                      <div>
                        <FaCircle className="w-3 h-3 text-[#32A14C] inline-block" />{" "}
                        <span className="text-sm">
                      {nonAcademicChart.datasets[0].label}
                    </span>
                      </div>
                    </div>
                  }
              />
              <Table className="mt-3 table-auto">
                <TableHeader>
                  <TableRow className="bg-[#056C7A] hover:bg-[#056C7A]">
                    {tabelNonAcademic.headers.map((item: string, index: number) => (
                        <TableHead key={index} className="text-center text-white">
                          {item}
                        </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody className="divide-y divide-gray-200">
                  {tabelNonAcademic.rows.map((item: ObjectTableRow, index: number) => (
                      <TableRow key={index} className=" even:bg-gray-100">
                        <TableCell className="text-center">{item.kode}</TableCell>
                        <TableCell className="text-center">
                          {item.jenjang_pendidikan}
                        </TableCell>
                        <TableCell className="text-center">{item.jumlah}</TableCell>
                      </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
        );
      default:
        return null;
    }
  };

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
          <div className="grid grid-cols-2 gap-1 sm:grid lg:grid-cols-3 lg:grid-flow-row sm:gap-2">
            <Button
                onClick={() => setAktifBtn("Fungsional")}
                className={cn(
                    aktifBtn === "Fungsional"
                        ? "bg-[#FFAC07] hover:bg-[#FFAC07] cursor-pointer"
                        : "bg-[#CDCDCD] hover:bg-[#CDCDCD] cursor-pointer",
                    "w-full lg:w-auto"
                )}
            >
              Fungsional
            </Button>
            <Button
                onClick={() => setAktifBtn("Hubungan Kerja")}
                className={cn(
                    aktifBtn === "Hubungan Kerja"
                        ? "bg-[#FFAC07] hover:bg-[#FFAC07] cursor-pointer"
                        : "bg-[#CDCDCD] hover:bg-[#CDCDCD] cursor-pointer",
                    "w-full lg:w-auto"
                )}
            >
              Hubungan Kerja
            </Button>
            <Button
                onClick={() => setAktifBtn("Pendidikan")}
                className={cn(
                    aktifBtn === "Pendidikan"
                        ? "bg-[#FFAC07] hover:bg-[#FFAC07] cursor-pointer"
                        : "bg-[#CDCDCD] hover:bg-[#CDCDCD] cursor-pointer",
                    "w-full lg:w-auto col-span-2 min-[506px]:col-span-1"
                )}
            >
              Pendidikan
            </Button>
            <Button
                onClick={() => setAktifBtn("Pendidikan Non Akademik")}
                className={cn(
                    aktifBtn === "Pendidikan Non Akademik"
                        ? "bg-[#FFAC07] hover:bg-[#FFAC07] cursor-pointer"
                        : "bg-[#CDCDCD] hover:bg-[#CDCDCD] cursor-pointer",
                    "w-full lg:w-auto col-span-2 min-[506px]:col-span-1"
                )}
            >
              Pendidikan Non Akademik
            </Button>
          </div>

          {renderContent()}
        </CustomCard>
      </div>
  );
};

export default CardStatistikPegawai;