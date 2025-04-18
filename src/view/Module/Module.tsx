import CustomCard from "@/components/commons/card";
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
    <div className="w-full h-screen p-40 relative flex justify-center items-center ">
      <div className="w-full bg-white/40 rounded-lg">
        <div className="bg-white m-5 rounded-lg overflow-hidden">
          <div className="relative">
            <div className="h-36 flex overflow-hidden">
              <img
                src="/images/background/image 6.png"
                alt="background-header"
                className="w-70"
              />
              <img
                src="/images/background/image 6.png"
                alt="background-header"
                className="w-70"
              />
              <img
                src="/images/background/image 6.png"
                alt="background-header"
                className="w-70"
              />
              <img
                src="/images/background/image 6.png"
                alt="background-header"
                className="w-70"
              />
              <img
                src="/images/background/image 6.png"
                alt="background-header"
                className="w-70"
              />
            </div>

            <div className="absolute top-0 w-full h-full px-10 flex justify-between items-center">
              <div className="flex gap-6 items-center">
                <img
                  src="/images/logo/uika-logo.jpg"
                  alt="logo-uika"
                  className="w-20 rounded-xl"
                />
                <div className="flex flex-col text-white">
                  <p>Sistem Informasi Akademik</p>
                  <h1 className="font-bold">UNIVERSITAS IBN KHALDUN</h1>
                </div>
              </div>

              <div className="flex gap-3 items-center">
                <Button className="bg-[#00325B]/50 hover:bg-[#00325B]/70 cursor-pointer">
                  <MdPerson className="text-2xl text-white" /> Halaman Profil
                </Button>
                <Button className="bg-[#00325B]/50 hover:bg-[#00325B]/70 cursor-pointer">
                  <IoExit className="text-2xl text-white" /> Keluar
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-[#F4F3F3] h-96">
            <div className="grid grid-cols-[60%_40%] h-full">
              <div className="w-full h-full pt-5">
                <h1 className="font-semibold text-lg pl-4">Daftar Modul</h1>

                <div className="gap-5 mt-3 grid grid-cols-[150px_150px_150px] grid-flow-row px-4">
                  <div
                    onMouseEnter={() => setHovered("adminEnterMouse")}
                    onMouseLeave={() => setHovered("adminLeaveMouse")}
                    onClick={() => {
                      setRole("admin");
                      setSelected("admin");
                    }}
                    className={`bg-white hover:bg-[#DDE4EA] flex items-center justify-center rounded-lg cursor-pointer shadow-sm ${
                      selected === "admin" ? "!bg-[#DDE4EA]" : ""
                    }`}
                  >
                    <div
                      className={`grid grid-rows-2 justify-items-center items-center ${
                        hovered === "adminEnterMouse"
                          ? "scale-105 transition-transform duration-300"
                          : " scale-100 transition-transform duration-300"
                      }`}
                    >
                      <img
                        src="/images/logo/image 10 (1).png"
                        alt="background-header"
                        className="w-14 self-center"
                      />

                      <h1 className="flex flex-col text-muted-foreground font-medium items-center mt-3">
                        Administrasi <span>Aplikasi</span>
                      </h1>
                    </div>
                  </div>

                  <div
                    onMouseEnter={() => setHovered("kepegawaianEnterMouse")}
                    onMouseLeave={() => setHovered("kepegawaianLeaveMouse")}
                    onClick={() => {
                      setRole("kepegawaian");
                      setSelected("kepegawaian");
                    }}
                    className={`bg-white hover:bg-[#DDE4EA] py-5 px-7 rounded-lg cursor-pointer shadow-sm ${
                      selected === "kepegawaian" ? "!bg-[#DDE4EA]" : ""
                    }`}
                  >
                    <div
                      className={`grid grid-rows-2 justify-items-center ${
                        hovered === "kepegawaianEnterMouse"
                          ? "scale-105 transition-transform duration-300"
                          : " scale-100 transition-transform duration-300"
                      }`}
                    >
                      <img
                        src="/images/logo/image 11.png"
                        alt="background-header"
                        className="w-14"
                      />

                      <h1 className="flex flex-col text-muted-foreground font-medium items-center mt-3">
                        SIM <span>Kepegawaian</span>
                      </h1>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full h-full pt-5 px-4 bg-[#EEEEEE]">
                {role && (
                  <div>
                    <h1 className="font-semibold text-lg">Daftar Role</h1>
                    <p>
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
                    <h1 className="font-bold text-[#004680] group-hover:text-white transition-all duration-500">
                      {role === "admin"
                        ? "Administrasi Aplikasi"
                        : "SIM Kepegawaian"}
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
