import { Button } from "@/components/ui/button";
import biodataDummy from "@/constant/biodataDummy/biodataDummy";
import biodataMenu from "@/constant/biodataMenu/biodataMenu";
import DetailPegawaiLayout from "@/layouts/DetailPegawaiLayout";
import React, { useState } from "react";

const Biodata = () => {
  const [show, setShow] = useState("kepegawaian");

  return (
    <DetailPegawaiLayout title="Biodata Pegawai" subTitile="Data Pegawai">
      <div className="flex flex-col gap-20 w-full">
        <div className="flex w-full">
          <div className="flex flex-col w-full">
            {biodataDummy.leftColumn.map((item, index) => (
              <div
                key={index}
                className="border-b flex justify-between items-center py-2 pl-2"
              >
                <h1 className="text-[#3F6FA9]">{item.label}</h1>
                <h1>{item.value}</h1>
              </div>
            ))}
          </div>
          <div className="flex flex-col w-full">
            {biodataDummy.rightColumn.map((item, index) => (
              <div
                key={index}
                className="border-b flex justify-between items-center py-2 pl-5"
              >
                <h1 className="text-[#3F6FA9]">{item.label}</h1>
                <h1>{item.value}</h1>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex gap-2 justify-center">
            {biodataMenu.map((item, index) => (
              <Button
                key={index}
                type="button"
                onClick={() => setShow(item.show)}
                className={`bg-[#D5D5D5] text-[#000] hover:bg-[#0A5B4F] hover:text-white rounded-t-2xl rounded-b-none transition-all duration-300 ${
                  show === item.show ? "bg-[#106D63] text-white" : ""
                }`}
              >
                {item.title}
              </Button>
            ))}
          </div>

          <div className="border-2 border-[#000]/20 rounded-lg w-full">
            {show === "kepegawaian" ? (
              <div className="flex w-full p-4">
                <div className="flex flex-col w-full">
                  {biodataDummy.leftColumn.map((item, index) => (
                    <div
                      key={index}
                      className="border-b flex justify-between items-center py-2 pl-2"
                    >
                      <h1 className="text-[#3F6FA9]">{item.label}</h1>
                      <h1>{item.value}</h1>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col w-full">
                  {biodataDummy.rightColumn.map((item, index) => (
                    <div
                      key={index}
                      className="border-b flex justify-between items-center py-2 pl-5"
                    >
                      <h1 className="text-[#3F6FA9]">{item.label}</h1>
                      <h1>{item.value}</h1>
                    </div>
                  ))}
                </div>
              </div>
            ) : show === "dosen" ? (
              <h1>bbb</h1>
            ) : show === "domisili" ? (
              <h1>ccc</h1>
            ) : show === "kependudukan" ? (
              <h1>ddd</h1>
            ) : show === "rekening-bank" ? (
              <h1>eee</h1>
            ) : show === "dokumen" ? (
              <h1>fff</h1>
            ) : (
              <h1>ggg</h1>
            )}
          </div>
        </div>
      </div>
    </DetailPegawaiLayout>
  );
};

export default Biodata;
