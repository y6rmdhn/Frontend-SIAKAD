import CustomCard from "@/components/commons/card";
import Title from "@/components/commons/Title";
import { Button } from "@/components/ui/button";
import React from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

const JabatanAkademik = () => {
  return (
    <div className="mt-10 mb-20">
      <Title title="Jabatan Akademik" subTitle="Daftar Jabatan Akademik" />

      <CustomCard
        actions={
          <div className="flex justify-end">
            <Link to="/data-riwayat/kepegawaian/detail-pangkat">
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

export default JabatanAkademik;
