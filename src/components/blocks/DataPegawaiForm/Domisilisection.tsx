import { FormFieldInput } from "../CustomFormInput/CustomFormInput";
import { FormFieldSelect } from "../CustomFormSelect/CustomFormSelect";
import { COUNTRIES } from "@/constant/countries/countries.ts";
import React, { useEffect, useRef } from "react";
import adminServices from "@/services/admin.services.ts";
import { InfiniteScrollSelect } from "@/components/blocks/InfiniteScrollSelect/InfiniteScrollSelect.tsx";

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const DomisiliSection = ({
  form,
  provinceOptions,
  cityOptions,
  kecamatanOptions,
  isProvincesLoading,
  isCitiesLoading,
  isKecamatanLoading,
}) => {
  const { watch, setValue } = form;
  const selectedProvinceId = watch("provinsi");
  const selectedCityId = watch("kota");
  const prevProvinceId = usePrevious(selectedProvinceId);
  const prevCityId = usePrevious(selectedCityId);

  useEffect(() => {
    if (prevProvinceId !== undefined && prevProvinceId !== selectedProvinceId) {
      setValue("kota", "");
      setValue("kecamatan", "");
    }
  }, [selectedProvinceId, prevProvinceId, setValue]);

  useEffect(() => {
    if (prevCityId !== undefined && prevCityId !== selectedCityId) {
      setValue("kecamatan", "");
    }
  }, [selectedCityId, prevCityId, setValue]);

  return (
    <div className="grid lg:grid-rows-6 lg:grid-flow-col gap-y-4 lg:gap-y-0 gap-x-5 mt-10 items-center">
      <FormFieldInput
        form={form}
        label="No.KTP"
        name="no_ktp"
        labelStyle="text-[#3F6FA9]"
        required={true}
      />
      <FormFieldInput
        form={form}
        label="No KK"
        name="no_kk"
        labelStyle="text-[#3F6FA9]"
        required={true}
      />
      <FormFieldSelect
        form={form}
        label="Warga Negara"
        name="warga_negara"
        labelStyle="text-[#3F6FA9]"
        options={COUNTRIES}
        placeholder="--Pilih Warga Negara--"
        required={true}
      />
      <FormFieldSelect
        form={form}
        label="Provinsi"
        name="provinsi"
        labelStyle="text-[#3F6FA9]"
        options={provinceOptions}
        placeholder={isProvincesLoading ? "Memuat..." : "--Pilih Provinsi--"}
        disabled={isProvincesLoading}
        required={true}
      />
      <FormFieldSelect
        form={form}
        label="Kota"
        name="kota"
        labelStyle="text-[#3F6FA9]"
        options={cityOptions}
        placeholder={isCitiesLoading ? "Memuat kota..." : "--Pilih Kota--"}
        disabled={!selectedProvinceId || isCitiesLoading}
        required={true}
      />
      <FormFieldSelect
        form={form}
        label="Kecamatan"
        name="kecamatan"
        labelStyle="text-[#3F6FA9]"
        options={kecamatanOptions}
        placeholder={
          isKecamatanLoading ? "Memuat kecamatan..." : "--Pilih Kecamatan--"
        }
        disabled={!selectedCityId || isKecamatanLoading}
        required={true}
      />
      <FormFieldInput
        form={form}
        label="Alamat / Jalan"
        name="alamat_domisili"
        labelStyle="text-[#3F6FA9]"
        required={true}
        type="textarea"
      />
      <FormFieldInput
        form={form}
        label="Kode Pos"
        name="kode_pos"
        labelStyle="text-[#3F6FA9]"
        required={true}
      />
      <InfiniteScrollSelect
        form={form}
        label="Suku"
        name="suku"
        labelStyle="text-[#3F6FA9]"
        placeholder="--Pilih Suku--"
        required={false}
        queryKey="suku"
        queryFn={adminServices.getSukuParams}
        itemValue="id"
        itemLabel="nama_suku"
      />
      <FormFieldInput
        form={form}
        label="Jarak Rumah (KM)"
        name="jarak_rumah_domisili"
        labelStyle="text-[#3F6FA9]"
        placeholder="Tuliskan Jarak dalam KM"
        required={false}
      />
      <FormFieldInput
        form={form}
        label="No. Whatsapp"
        name="no_whatsapp"
        labelStyle="text-[#3F6FA9]"
        required={true}
      />
      <FormFieldInput
        form={form}
        label="No.Telpon Utama"
        name="no_handphone"
        labelStyle="text-[#3F6FA9]"
        required={true}
      />
    </div>
  );
};

export default React.memo(DomisiliSection);
