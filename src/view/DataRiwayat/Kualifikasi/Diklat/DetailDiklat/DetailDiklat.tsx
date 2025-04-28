import CustomCard from "@/components/blocks/Card";
import Title from "@/components/blocks/Title";
import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

const DetailDiklat = () => {
  return (
    <div className="mt-10 mb-20">
      <Title title="Riwayat Diklat" subTitle="Detail Riwayat Diklat" />

      <CustomCard
        actions={
          <div className="flex justify-end">
            <Link to="/data-riwayat/kualifikasi/diklat">
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

export default DetailDiklat;
