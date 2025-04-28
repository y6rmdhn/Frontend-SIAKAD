import CustomCard from "@/components/blocks/Card";
import Title from "@/components/blocks/Title";
import { Button } from "@/components/ui/button";
import React from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

const RiwayatPekerjaan = () => {
  return (
    <div className="mt-10 mb-20">
      <Title title="Riwayat Pekerjaan" subTitle="Daftar Riwayat Pekerjaan" />

      <CustomCard
        actions={
          <div className="flex justify-end">
            <Link to="/data-riwayat/kualifikasi/detail-riwayat-pekerjaan">
              <Button className="bg-yellow-uika hover:bg-hover-yellow-uika">
                <FaPlus /> Tambah
              </Button>
            </Link>
          </div>
        }
      />
    </div>
  );
};

export default RiwayatPekerjaan;
