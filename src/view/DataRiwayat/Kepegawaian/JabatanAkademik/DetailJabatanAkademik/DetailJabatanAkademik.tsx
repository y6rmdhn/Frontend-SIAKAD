import CustomCard from "@/components/commons/card";
import Title from "@/components/commons/Title";
import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

const DetailJabatanAkademik = () => {
  return (
    <div className="mt-10 mb-20">
      <Title title="Jabatan Akademik" subTitle="Detail Jabatan Akademik" />

      <CustomCard
        actions={
          <div className="flex justify-end">
            <Link to="/data-riwayat/kepegawaian/jabatan-akademik">
              <Button className="bg-green-light-uika hover:bg-hover-green-uika">
                <IoIosArrowBack /> Kembali
              </Button>
            </Link>
          </div>
        }
      />
    </div>
  );
};

export default DetailJabatanAkademik;
