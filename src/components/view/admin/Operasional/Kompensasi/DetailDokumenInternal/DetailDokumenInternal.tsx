import CustomCard from "@/components/blocks/Card";
import { FormFieldInput } from "@/components/blocks/CustomFormInput/CustomFormInput";
import { FormFieldInputFile } from "@/components/blocks/CustomFormInputFile/CustomFormInputFile.tsx";
import { FormFieldSelect } from "@/components/blocks/CustomFormSelect/CustomFormSelect";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { FaPlus, FaRegTrashAlt, FaSave } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";

const DetailDokumenInternal = () => {
  const form = useForm();

  return (
    <div className="mt-10 mb-20">
      <h1 className="text-lg sm:text-2xl font-normal">
        Dokumen Internal{" "}
        <span className="text-muted-foreground font-normal text-[12px] sm:text-[16px]">
          Detail Dokumen Internal
        </span>
      </h1>

      <Form {...form}>
        <form>
          <CustomCard
            actions={
              <div className="w-full flex flex-col gap-4 lg:flex-row justify-between mt-6">
                <div className="w-full lg:w-96 relative">
                  <FiSearch className="absolute top-1/2 -translate-y-1/2 right-2" />
                  <Input placeholder="Search" className="lg:w-96 w-full pr-8 text-xs sm:text-sm" />
                </div>

                <div className="w-full flex flex-col lg:justify-end sm:flex-row gap-4">
                  <div className="w-full lg:w-auto">
                    <Link to="/admin/operasional/kompensasi/dokumen-internal">
                      <Button className="bg-green-light-uika hover:bg-[#329C59] cursor-pointer w-full lg:w-auto text-xs sm:text-sm">
                        <IoIosArrowBack />
                        Kembali ke Daftar
                      </Button>
                    </Link>
                  </div>

                  <div className="w-full lg:w-auto">
                    <Button className="bg-green-light-uika hover:bg-[#329C59] cursor-pointer w-full lg:w-auto text-xs sm:text-sm">
                      <FaSave />
                      Simpan
                    </Button>
                  </div>
                </div>
              </div>
            }
          >
            <div className="w-full border-b-2 border-b-green-light-uika mt-4">
              <h1 className="text-xl font-normal text-green-light-uika">
                Data Dokumen
              </h1>
            </div>

            <div className="flex flex-col sm:gap-y-0 gap-4 sm:grid sm:grid-rows-6 grid-flow-col gap-x-5 sm:items-center mt-5">
              <FormFieldInput
                form={form}
                label="No Dokumen"
                name="no_dokumen"
                required={true}
                labelStyle="text-[#3F6FA9]"
              />
              <FormFieldInput
                form={form}
                label="Nama Dokumen"
                name="nama_dokumen"
                required={true}
                labelStyle="text-[#3F6FA9]"
              />
              <FormFieldInput
                form={form}
                label="Uraian Singkat"
                name="uraian_singkat"
                required={false}
                labelStyle="text-[#3F6FA9]"
                type="textarea"
              />
              <FormFieldInput
                form={form}
                label="Url Dokumen"
                name="url_dokumen"
                required={false}
                labelStyle="text-[#3F6FA9]"
              />
              <FormFieldInput
                form={form}
                label="Tgl Dokumen"
                name="nama_dokumen"
                required={true}
                labelStyle="text-[#3F6FA9]"
                type="date"
              />
              <FormFieldSelect
                form={form}
                label="Jenis Dokumen"
                name="jenis_dokumen"
                labelStyle="text-[#3F6FA9]"
                options={[
                  {
                    value: "1",
                    label: "Pelanggaran Ringan",
                  },
                  {
                    value: "2",
                    label: "Pelanggaran Sedang",
                  },
                  {
                    value: "3",
                    label: "Pelanggaran Berat",
                  },
                ]}
                required={true}
                placeholder="Surat Keputusan"
              />
              <FormFieldSelect
                form={form}
                label="Menu Referensi"
                name="menu_referensi"
                labelStyle="text-[#3F6FA9]"
                options={[
                  {
                    value: "1",
                    label: "Pelanggaran Ringan",
                  },
                  {
                    value: "2",
                    label: "Pelanggaran Sedang",
                  },
                  {
                    value: "3",
                    label: "Pelanggaran Berat",
                  },
                ]}
                required={false}
                placeholder="Pengajaran"
              />
              <FormFieldInputFile
                form={form}
                label="File"
                name="file"
                required={false}
                labelStyle="text-[#3F6FA9]"
              />
              <FormFieldSelect
                form={form}
                label="Status Dokumen"
                name="Barun"
                labelStyle="text-[#3F6FA9]"
                options={[
                  {
                    value: "1",
                    label: "Pelanggaran Ringan",
                  },
                  {
                    value: "2",
                    label: "Pelanggaran Sedang",
                  },
                  {
                    value: "3",
                    label: "Pelanggaran Berat",
                  },
                ]}
                required={false}
                placeholder="Baru"
              />
              <FormFieldSelect
                form={form}
                label="Tingkat"
                name="tingkat"
                labelStyle="text-[#3F6FA9]"
                options={[
                  {
                    value: "1",
                    label: "Pelanggaran Ringan",
                  },
                  {
                    value: "2",
                    label: "Pelanggaran Sedang",
                  },
                  {
                    value: "3",
                    label: "Pelanggaran Berat",
                  },
                ]}
                required={true}
                placeholder="--Pilih Tingkat--"
              />
              <FormFieldInput
                form={form}
                label="Nama Pejabat Penetep"
                name="nama_pejabat_penetep"
                required={false}
                labelStyle="text-[#3F6FA9]"
                placeholder="Cari Nama Pejabat Penetap"
              />
              <FormFieldInput
                form={form}
                label="Nama Validator"
                name="nama_validator"
                required={false}
                labelStyle="text-[#3F6FA9]"
                placeholder="Cari Nama Validator"
              />
            </div>

            <div className="w-full border-b-2 border-b-green-light-uika mt-4">
              <h1 className="text-xl font-normal text-green-light-uika">
                Penerima
              </h1>
            </div>

            <div className="flex flex-col mt-4">
              <div className="bg-[#E7ECF2] w-full p-1 sm:p-3 flex justify-between items-center">
                <div />
                <h1 className="text-sm sm:text-lg font-normal">Pegawai</h1>
                <Button
                  size="icon"
                  className="bg-green-light-uika hover:bg-[#329C59]"
                >
                  <FaPlus className="w-3 h-3" />
                </Button>
              </div>

              <div className="w-full p-3 flex justify-between gap-4 items-center">
                <Input placeholder="Cari Pegawai" className="w-full" />
                <Button size="icon" variant="destructive">
                  <FaRegTrashAlt className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </CustomCard>
        </form>
      </Form>
    </div>
  );
};

export default DetailDokumenInternal;
