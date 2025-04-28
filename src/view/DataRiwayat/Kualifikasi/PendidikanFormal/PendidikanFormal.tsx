import CustomCard from "@/components/blocks/Card";
import Title from "@/components/blocks/Title";
import { Button } from "@/components/ui/button";
import React from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

const PendidikanFormal = () => {
  return (
    <div className="mt-10 mb-20">
      <Title title="Pendidikan Formal" subTitle="Daftar Pendidikan Formal" />

      <CustomCard
        actions={
          <div className="flex justify-end">
            <Link to="/data-riwayat/kualifikasi/detail-pendidikan-formal">
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

export default PendidikanFormal;
