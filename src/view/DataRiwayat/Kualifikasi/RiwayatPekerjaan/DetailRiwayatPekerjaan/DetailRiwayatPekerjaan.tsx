import CustomCard from "@/components/commons/card";
import Title from "@/components/commons/Title";
import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

const DetailRiwayatPekerjaan = () => {
  return (
    <div className="mt-10 mb-20">
      <Title title="Riwayat Pekerjaan" subTitle="Detail Riwayat Pekerjaan" />

      <CustomCard
        actions={
          <div className="flex justify-end">
            <Link to="/data-riwayat/kualifikasi/riwayat-pekerjaan">
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

export default DetailRiwayatPekerjaan;
