// components/DomisiliSection.tsx
import React, { useEffect, useRef } from "react";
import type { UseFormReturn } from "react-hook-form";
import { FormFieldInput } from "../CustomFormInput/CustomFormInput";
import { FormFieldSelect } from "../CustomFormSelect/CustomFormSelect";
import { InfiniteScrollSelect } from "@/components/blocks/InfiniteScrollSelect/InfiniteScrollSelect.tsx";
import adminServices from "@/services/admin.services.ts";
import type { DataPegawaiSchema } from "@/components/view/admin/DataPegawai/DataPegawai";
import { formatCountries, wilayahServices } from "@/services/wilayahService";
import { SimpleSelect } from "../SimpleSelect/SimpleSelect";
import { useWilayahData } from "@/hooks/useWilayah";

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
}

const DomisiliSection = ({
  form,
  isReadOnly = false,
}: DomisiliSectionProps) => {
  const { watch, setValue } = form;

  const selectedProvinceId = watch("provinsi");
  const selectedCityId = watch("kota");
  const prevProvinceId = usePrevious(selectedProvinceId);
  const prevCityId = usePrevious(selectedCityId);

  // Use the custom hook for wilayah data
  const {
    provinces,
    regencies,
    districts,
    isProvincesLoading,
    isRegenciesLoading,
    isDistrictsLoading,
  } = useWilayahData(selectedProvinceId, selectedCityId);

  // Convert to SelectOption format
  const provinceOptions: SelectOption[] = provinces.map((province) => ({
    label: province.name,
    value: province.id,
  }));

  const cityOptions: SelectOption[] = regencies.map((regency) => ({
    label: regency.name,
    value: regency.id,
  }));

  const kecamatanOptions: SelectOption[] = districts.map((district) => ({
    label: district.name,
    value: district.id,
  }));

  // Reset dependent fields when parent field changes
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

      {/* Countries Select */}
      <SimpleSelect
        form={form}
        label="Warga Negara"
        name="warga_negara"
        placeholder="--Pilih Warga Negara--"
        required={true}
        queryKey="countries"
        queryFn={async () => {
          try {
            const response = await wilayahServices.getCountries();
            const formatted = formatCountries(response.data);
            return formatted;
          } catch (error) {
            console.error("Error fetching countries:", error);
            return [];
          }
        }}
        itemValue="id"
        itemLabel="name"
      />

      {/* Provinsi Select */}
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
          placeholder={
            isProvincesLoading ? "Memuat provinsi..." : "--Pilih Provinsi--"
          }
          disabled={isProvincesLoading}
          required={true}
        />
      )}

      {/* Kota/Kabupaten Select */}
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
          placeholder={isRegenciesLoading ? "Memuat kota..." : "--Pilih Kota--"}
          disabled={!selectedProvinceId || isRegenciesLoading}
          required={true}
        />
      )}

      {/* Kecamatan Select */}
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
            isDistrictsLoading ? "Memuat kecamatan..." : "--Pilih Kecamatan--"
          }
          disabled={!selectedCityId || isDistrictsLoading}
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

      {/* Suku Select */}
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
