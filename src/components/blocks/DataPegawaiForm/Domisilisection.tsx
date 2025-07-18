import React, { useEffect, useRef } from "react";
import type { UseFormReturn } from "react-hook-form";
import { FormFieldInput } from "../CustomFormInput/CustomFormInput";
import { FormFieldSelect } from "../CustomFormSelect/CustomFormSelect";
import { InfiniteScrollSelect } from "@/components/blocks/InfiniteScrollSelect/InfiniteScrollSelect.tsx";
import { COUNTRIES } from "@/constant/countries/countries.ts";
import adminServices from "@/services/admin.services.ts";
import type { DataPegawaiSchema } from "@/components/view/admin/DataPegawai/DataPegawai";

type SelectOption = {
  label: string;
  value: string;
};

// Custom hook to get the previous value of a state or prop
function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

// Props interface supporting both interactive and read-only modes
interface DomisiliSectionProps {
  form: UseFormReturn<DataPegawaiSchema>;
  isReadOnly?: boolean;
  provinceOptions?: SelectOption[];
  cityOptions?: SelectOption[];
  kecamatanOptions?: SelectOption[];
  isProvincesLoading?: boolean;
  isCitiesLoading?: boolean;
  isKecamatanLoading?: boolean;
}

const DomisiliSection = ({
  form,
  isReadOnly = false,
  provinceOptions = [],
  cityOptions = [],
  kecamatanOptions = [],
  isProvincesLoading = false,
  isCitiesLoading = false,
  isKecamatanLoading = false,
}: DomisiliSectionProps) => {
  const { watch, setValue } = form;

  const selectedProvinceId = watch("provinsi");
  const selectedCityId = watch("kota");
  const prevProvinceId = usePrevious(selectedProvinceId);
  const prevCityId = usePrevious(selectedCityId);

  useEffect(() => {
    if (
      !isReadOnly &&
      prevProvinceId !== undefined &&
      prevProvinceId !== selectedProvinceId
    ) {
      setValue("kota", "");
      setValue("kecamatan", "");
    }
  }, [isReadOnly, selectedProvinceId, prevProvinceId, setValue]);

  useEffect(() => {
    if (
      !isReadOnly &&
      prevCityId !== undefined &&
      prevCityId !== selectedCityId
    ) {
      setValue("kecamatan", "");
    }
  }, [isReadOnly, selectedCityId, prevCityId, setValue]);

  return (
    <div className="grid lg:grid-rows-6 lg:grid-flow-col gap-y-4 lg:gap-y-0 gap-x-5 mt-10 items-center">
      <FormFieldInput
        form={form}
        label="No.KTP"
        name="no_ktp"
        labelStyle="text-[#3F6FA9]"
        required={!isReadOnly}
        readOnly={isReadOnly}
      />
      <FormFieldInput
        form={form}
        label="No KK"
        name="no_kk"
        labelStyle="text-[#3F6FA9]"
        required={!isReadOnly}
        readOnly={isReadOnly}
      />
      <FormFieldSelect
        form={form}
        label="Warga Negara"
        name="warga_negara"
        labelStyle="text-[#3F6FA9]"
        options={COUNTRIES}
        placeholder="--Pilih Warga Negara--"
        required={!isReadOnly}
        disabled={isReadOnly}
      />

      {/* Conditionally render Input or Select for Provinsi */}
      {isReadOnly ? (
        <FormFieldInput
          form={form}
          label="Provinsi"
          name="provinsi"
          labelStyle="text-[#3F6FA9]"
          readOnly
        />
      ) : (
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
      )}

      {/* Conditionally render Input or Select for Kota */}
      {isReadOnly ? (
        <FormFieldInput
          form={form}
          label="Kota"
          name="kota"
          labelStyle="text-[#3F6FA9]"
          readOnly
        />
      ) : (
        <FormFieldSelect
          form={form}
          label="Kota"
          name="kota"
          labelStyle="text-[#3F6FA9]"
          options={cityOptions}
          placeholder={isCitiesLoading ? "Memuat kota..." : "--Pilih Kota--"}
          disabled={!watch("provinsi") || isCitiesLoading}
          required={true}
        />
      )}

      {/* Conditionally render Input or Select for Kecamatan */}
      {isReadOnly ? (
        <FormFieldInput
          form={form}
          label="Kecamatan"
          name="kecamatan"
          labelStyle="text-[#3F6FA9]"
          readOnly
        />
      ) : (
        <FormFieldSelect
          form={form}
          label="Kecamatan"
          name="kecamatan"
          labelStyle="text-[#3F6FA9]"
          options={kecamatanOptions}
          placeholder={
            isKecamatanLoading ? "Memuat kecamatan..." : "--Pilih Kecamatan--"
          }
          disabled={!watch("kota") || isKecamatanLoading}
          required={true}
        />
      )}

      <FormFieldInput
        form={form}
        label="Alamat / Jalan"
        name="alamat_domisili"
        labelStyle="text-[#3F6FA9]"
        required={!isReadOnly}
        type="textarea"
        readOnly={isReadOnly}
      />
      <FormFieldInput
        form={form}
        label="Kode Pos"
        name="kode_pos"
        labelStyle="text-[#3F6FA9]"
        required={!isReadOnly}
        readOnly={isReadOnly}
      />

      {/* Conditionally render Input or InfiniteScrollSelect for Suku */}
      {isReadOnly ? (
        <FormFieldInput
          form={form}
          label="Suku"
          name="suku"
          labelStyle="text-[#3F6FA9]"
          readOnly
        />
      ) : (
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
      )}

      <FormFieldInput
        form={form}
        label="Jarak Rumah (KM)"
        name="jarak_rumah_domisili"
        labelStyle="text-[#3F6FA9]"
        placeholder="Tuliskan Jarak dalam KM"
        required={false}
        readOnly={isReadOnly}
      />
      <FormFieldInput
        form={form}
        label="No. Whatsapp"
        name="no_whatsapp"
        labelStyle="text-[#3F6FA9]"
        required={!isReadOnly}
        readOnly={isReadOnly}
      />
      <FormFieldInput
        form={form}
        label="No.Telpon Utama"
        name="no_handphone"
        labelStyle="text-[#3F6FA9]"
        required={!isReadOnly}
        readOnly={isReadOnly}
      />
    </div>
  );
};

export default React.memo(DomisiliSection);
