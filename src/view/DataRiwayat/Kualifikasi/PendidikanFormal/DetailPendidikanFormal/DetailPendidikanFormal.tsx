import CustomCard from "@/components/commons/card";
import Title from "@/components/commons/Title";
import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

const DetailPendidikanFormal = () => {
  return (
    <div className="mt-10 mb-20">
      <Title title="Pendidikan Formal" subTitle="Detail Pendidikan Formal" />

      <CustomCard
        actions={
          <div className="flex justify-end">
            <Link to="/data-riwayat/kualifikasi/pendidikan-formal">
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

export default DetailPendidikanFormal;
