import CustomCard from "@/components/commons/card";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { MdPerson } from "react-icons/md";
import { IoExit } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Module = () => {
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen p-40 relative flex justify-center items-center ">
      <div className="w-full bg-white/40 rounded-lg">
        <div className="bg-white m-5 rounded-lg overflow-hidden">
          <div className="relative">
            <div className="h-44 flex overflow-hidden">
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
              <div className="w-full h-full pl-4 pt-5">
                <h1 className="font-semibold text-lg">Daftar Modul</h1>

                <div className="flex gap-5 mt-3">
                  <div
                    onClick={() => setRole("admin")}
                    className="bg-white hover:bg-[#f8f8f8] py-5 px-9 rounded-lg grid grid-rows-2 justify-items-center cursor-pointer shadow-sm"
                  >
                    <img
                      src="/images/logo/image 10 (1).png"
                      alt="background-header"
                      className="w-14"
                    />

                    <h1 className="flex flex-col font-semibold items-center mt-3 text-sm">
                      Administrasi <span>Aplikasi</span>
                    </h1>
                  </div>

                  <div
                    onClick={() => setRole("kepegawaian")}
                    className="bg-white hover:bg-[#f8f8f8] p-5 rounded-lg grid grid-rows-2 justify-items-center cursor-pointer shadow-sm"
                  >
                    <img
                      src="/images/logo/image 11.png"
                      alt="background-header"
                      className="w-14"
                    />

                    <h1 className="flex flex-col font-semibold items-center mt-3 text-sm">
                      SIM Kepegawaian
                    </h1>
                  </div>
                </div>
              </div>
              <div className="w-full h-full pt-5 px-4 bg-[#EEEEEE]">
                <h1 className="font-semibold text-lg">Daftar Role</h1>
                <p>Administrasi Aplikasi</p>

                {role && (
                  <div
                    onClick={() =>
                      role === "admin"
                        ? navigate("/admin/dasboard")
                        : navigate("/dasboard")
                    }
                    className="bg-white hover:bg-[#f8f8f8] p-3 rounded-md mt-6 cursor-pointer shadow-sm"
                  >
                    <h1 className="font-bold text-[#004680]">
                      {role === "admin"
                        ? "Administrasi Aplikasi"
                        : "SIM Kepegawaian"}
                    </h1>
                    <p className="text-muted-foreground font-semibold text-sm">
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
