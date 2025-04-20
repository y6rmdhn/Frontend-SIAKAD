import { HiUserGroup } from "react-icons/hi2";
import { BsArrowUpRightCircle } from "react-icons/bs";
import { FaMoneyBills } from "react-icons/fa6";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { FaAddressCard } from "react-icons/fa";
import { PiWarningCircle } from "react-icons/pi";
import { ChartLingkaran } from "@/components/commons/Charts/PieChart/ChartLingkaran";
import { ChartPegawai } from "@/components/commons/Charts/ChartPegawai/ChartPegawai";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

const pieData = [
  { browser: "akademik", visitors: 275, fill: "#92F1A8" },
  { browser: "non akademik", visitors: 200, fill: "#32A14C" },
];

const pieConfig = {
  visitors: { label: "Visitors" },
  chrome: { label: "Chrome", color: "#4285F4" },
};
const DasboardUser = () => {
  const [clkBtn, setClkBtn] = useState<string | null>(null);
  const [detail, setDetail] = useState<string | null>(null);
  return (
    <div className="mt-1 flex">
      <div className="w-full mr-7">
        <div className="ml-4 mb-10 flex gap-2 items-center ">
          <HiUserGroup />
          <h1 className=" font-semibold">Pegawai</h1>
        </div>
        <h1 className="ml-4 font-semibold">Selamat Malam</h1>
        <h1 className="ml-4 text-2xl font-bold">Azka Fadilah Rahman</h1>
        <div className="flex mb-7">

          <div className="p-2 w-[60%]">
            <ChartLingkaran
              title="Kehadiran"
              data={pieData}
              dataKey="visitors"
              nameKey="browser"
              config={pieConfig}
              valueLabel="Visitors"
            />
          </div>

          {/* Gaji */}
          <div className="w-[40%] mt-2 pr-4">
            <div className="bg-gradient-to-b from-[#00AF9C] to-[#106D63] h-45 w-full rounded-md text-white p-4">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-medium">Gaji</h1>
                <BsArrowUpRightCircle className="w-6 h-6" />
              </div>
              <div className="flex items-center justify-center gap-4">
                <FaMoneyBills className="w-14 h-14" />
                <div className="text-center">
                  <p className="text-lg">Total Gaji per bulan</p>
                  <p className="text-2xl font-bold mt-1">Rp 2.000.000</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div>
          <h1 className="ml-8 text-xl font-bold">Evaluasi Kerja</h1>
          <div>
            <ChartPegawai />
          </div>
        </div>
      </div>


      <div className="md:w-[40%] w pr-4">
        <div className="flex flex-col gap-5">

          {/* Absen Masuk dan Riwayat Absen */}
          <div className="flex grid-cols-2 gap-5">
            <Button
              onClick={() => setClkBtn("absen")}
              className={clkBtn === "absen"
                ? "h-10 w-40 bg-[#106D63] text-white hover:bg-[#106D63] hover:text-white cursor-pointer flex items-center justify-center gap-2"
                : "h-10 w-40 bg-white border-1 border-[#106D63] text-[#106D63] hover:bg-white cursor-pointer flex items-center justify-center gap-2"}
            >
              <HiOutlineClipboardDocumentList className="text-lg" />
              Absen Masuk
            </Button>
            <Button
              onClick={() => setClkBtn("riwayat")}
              className={clkBtn === "riwayat"
                ? "h-10 w-40 bg-[#106D63] text-white hover:bg-[#106D63] hover:text-white cursor-pointer flex items-center justify-center gap-2"
                : "h-10 w-40 bg-white border-1 border-[#106D63] text-[#106D63] hover:bg-white cursor-pointer flex items-center justify-center gap-2"}
            >
              <FaAddressCard className="text-lg" />
              Riwayat Absen
            </Button>
          </div>

          {/* Informasi dan Status */}
          <div className="drop-shadow-md bg-white p-4 rounded-lg">
            <h1 className="text-xl font-bold mb-2">Informasi dan Status</h1>
            <div className=" p-4">
              <div className="grid grid-cols-3 gap-4 mb-3 text-sm font-medium">
                <span>Hari</span>
                <span>Tanggal</span>
                <span>Status</span>
              </div>
              <div className="flex items-center justify-center gap-2 border-t-2">
                <PiWarningCircle className="bg-orange-400 text-white w-4 h-4 rounded-full" />
                <p className="text-center py-4 text-gray-500">
                  Hari ini anda belum tercatat hadir
                </p>
              </div>
            </div>
          </div>

          {/* Data Riwayat */}
          <div className="drop-shadow-md bg-white p-4 rounded-lg">
            <h1 className="text-xl font-bold mb-2">Data Riwayat</h1>
            <div className="flex items-center justify-center text-center border-t-2 gap-2">
              <div className=" gap-1">
                <p className="text-gray-500 mb-2">Anda Belum Melakukan Pengisian Data Riwayat</p>
                <p className="text-gray-300 mb-2 text-xs">Segera mengisi data riwayat anda</p>
              </div>
              <Button
              onClick={() => setDetail("absen")}
              className={detail === "absen"
                ? " bg-[#106D63] cursor-pointer"
                : " bg-[#106D63] cursor-pointer"}
            >
            Lihat Detail
            </Button>
            </div>
          </div>


          {/* Pemberitahuan */}
          <div className="drop-shadow-md bg-white p-4 rounded-lg">
            <h1 className="text-xl font-bold mb-2 ">Pemberitahuan</h1>
            <div className="flex items-center justify-center gap-2 border-t-2">
              <PiWarningCircle className="bg-orange-400 text-white w-4 h-4 rounded-full" />
              <p className="text-center py-4 text-gray-500">
                Tidak ada pemberitahuan
              </p>
            </div>
          </div>

          {/* News */}
          <div className="drop-shadow-md bg-white p-4 rounded-lg">
            <h1 className="text-xl font-bold mb-2">Berita</h1>
            <div className="flex items-center justify-center gap-2 border-t-2">
              <PiWarningCircle className="bg-orange-400 text-white w-4 h-4 rounded-full " />
              <p className="text-center py-4 text-gray-500">
                Tidak ada berita
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DasboardUser;
