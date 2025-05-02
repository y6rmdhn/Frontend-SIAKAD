import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { MdPerson } from "react-icons/md";
import { IoExit } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Module = () => {
  const [role, setRole] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const navigate = useNavigate();

  return (
    <div className="w-full md:px-20 pt-10 pb-6 font-roboto min-h-[100vh] relative flex justify-center items-start">
      <div className="w-full max-w-[1000px] md:bg-white/40 rounded-lg sm:mx-4">
        <div className="bg-white md:m-5 rounded-lg overflow-hidden lg:max-h-[550px]">
          <div className="relative">
            <div className="h-44 md:h-36 flex overflow-hidden">
              {Array(4)
                .fill("/images/background/image 6.png")
                .map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt="background-header"
                    className="w-72 flex-shrink-0"
                  />
                ))}
            </div>

            <div className="absolute flex-col py-5 md:py-0 md:flex-row top-0 w-full h-full px-4 sm:px-10 flex justify-between items-center">
              <div className="flex gap-4 items-center">
                <div className="bg-white p-2 rounded-2xl sm:rounded-3xl overflow-hidden">
                  <img
                    src="/images/logo/uika-logo.jpg"
                    alt="logo-uika"
                    className="w-10 md:w-14 lg:w-16"
                  />
                </div>
                <div className="flex flex-col text-white">
                  <p className="text-sm">Sistem Informasi Akademik</p>
                  <h1 className="text-sm font-bold">UNIVERSITAS IBN KHALDUN</h1>
                </div>
              </div>

              <div className="flex gap-3 items-center md:flex-col md:items-end lg:flex-row lg:items-center">
                <Button className="bg-[#00325B]/50 hover:bg-[#00325B]/70 cursor-pointer">
                  <MdPerson className="text-2xl text-white" /> Halaman Profil
                </Button>
                <Button className="bg-[#00325B]/50 hover:bg-[#00325B]/70 cursor-pointer">
                  <IoExit className="text-2xl text-white" /> Keluar
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-[#F4F3F3] h-full">
            <div className="grid grid-rows-[auto_auto] mb-10 lg:mb-0 lg:grid-cols-[60%_40%] h-full">
              <div className="w-full h-full pt-5 order-2 lg:order-1">
                <h1 className="font-medium text-xl pl-8">Daftar Modul</h1>

                <div className="gap-5 mt-3 grid grid-rows-3 grid-flow-col lg:grid-cols-3 lg:grid-flow-row md:grid-cols-2 md:grid-flow-row px-8">
                  <div
                    onMouseEnter={() => setHovered("adminEnterMouse")}
                    onMouseLeave={() => setHovered("adminLeaveMouse")}
                    onClick={() => {
                      setRole("admin");
                      setSelected("admin");
                    }}
                    className={`bg-white hover:bg-[#cfd6db] flex items-center justify-center h-36 rounded-xl cursor-pointer shadow-sm ${
                      selected === "admin" ? "!bg-[#cfd6db]" : ""
                    }`}
                  >
                    <div
                      className={`bg-white/50 w-full h-full rounded-xl ${
                        hovered === "adminEnterMouse"
                          ? "scale-110 transition-transform duration-500"
                          : "scale-100 transition-transform duration-300"
                      }`}
                    >
                      <div className="flex flex-col items-center justify-center p-5 h-full">
                        <img
                          src="/images/logo/image 10 (1).png"
                          alt="background-header"
                          className="w-10 h-10 mb-2"
                        />
                        <h1 className="text-[#585858] font-medium text-sm text-center leading-snug min-h-[32px]">
                          Administrasi Aplikasi
                        </h1>
                      </div>
                    </div>
                  </div>

                  <div
                    onMouseEnter={() => setHovered("kepegawaianEnterMouse")}
                    onMouseLeave={() => setHovered("kepegawaianLeaveMouse")}
                    onClick={() => {
                      setRole("kepegawaian");
                      setSelected("kepegawaian");
                    }}
                    className={`bg-white hover:bg-[#cfd6db] flex items-center justify-center h-36 rounded-xl cursor-pointer shadow-sm ${
                      selected === "kepegawaian" ? "!bg-[#cfd6db]" : ""
                    }`}
                  >
                    <div
                      className={`bg-white/50 w-full h-full rounded-xl ${
                        hovered === "kepegawaianEnterMouse"
                          ? "scale-110 transition-transform duration-500"
                          : "scale-100 transition-transform duration-300"
                      }`}
                    >
                      <div className="flex flex-col items-center justify-center p-5 h-full">
                        <img
                          src="/images/logo/image 11.png"
                          alt="background-header"
                          className="w-10 h-10 mb-2"
                        />
                        <h1 className="text-[#585858] font-medium text-sm text-center leading-snug min-h-[32px]">
                          SIM Kepegawaian
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={`${
                  role ? "flex flex-col" : "hidden lg:flex lg:flex-col"
                } w-full lg:h-[1000px] pt-5 px-8 bg-[#EEEEEE] order-1 lg:order-2`}
              >
                {role && (
                  <div>
                    <h1 className="font-medium text-xl">Daftar Role</h1>
                    <p className="text-sm">
                      {role === "admin"
                        ? "Administrasi Aplikasi"
                        : "SIM Kepegawaian"}{" "}
                    </p>
                  </div>
                )}

                {role && (
                  <div
                    onClick={() =>
                      role === "admin"
                        ? navigate("/admin/dasboard")
                        : navigate("/dasboard")
                    }
                    className="group bg-white p-3 rounded-md mt-6 cursor-pointer shadow-sm hover:bg-[#00325B] transition-all duration-300"
                  >
                    <h1 className="font-semibold text-[#004680] group-hover:text-white transition-all duration-500">
                      {role === "admin"
                        ? "Administrasi Aplikasi"
                        : "Kepegawaian"}
                    </h1>
                    <p className="text-muted-foreground font-semibold text-sm group-hover:text-white transition-all duration-700">
                      UIKA
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Module;
