// components/DomisiliSection.tsx
import React, { useEffect, useRef } from "react";
import type { UseFormReturn } from "react-hook-form";
import { FormFieldInput } from "../CustomFormInput/CustomFormInput";
import { InfiniteScrollSelect } from "@/components/blocks/InfiniteScrollSelect/InfiniteScrollSelect";
import adminServices from "@/services/admin.services";
import type { DataPegawaiSchema } from "@/components/view/admin/DataPegawai/DataPegawai";

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

  // Diganti untuk langsung menggunakan API backend via InfiniteScrollSelect

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

      {/* Warga Negara Select */}
      {isReadOnly ? (
        <FormFieldInput
          form={form}
          label="Warga Negara"
          name="warga_negara"
          labelStyle="text-[#3F6FA9]"
          readOnly
        />
      ) : (
        <InfiniteScrollSelect
          form={form}
          label="Warga Negara"
          name="warga_negara"
          labelStyle="text-[#3F6FA9]"
          placeholder="--Pilih Warga Negara--"
          required={true}
          queryKey="warga-negara-select"
          queryFn={(page) => adminServices.getWilayahNegara({ page, is_dropdown: true })}
          itemValue="id"
          itemLabel="nama"
        />
      )}

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
        <InfiniteScrollSelect
          form={form}
          label="Provinsi"
          name="provinsi"
          labelStyle="text-[#3F6FA9]"
          placeholder="--Pilih Provinsi--"
          required={true}
          queryKey="provinsi-select"
          queryFn={(page) => adminServices.getProvinsi({ page, is_dropdown: true })}
          itemValue="id"
          itemLabel="nama"
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
        <InfiniteScrollSelect
          form={form}
          label="Kota"
          name="kota"
          labelStyle="text-[#3F6FA9]"
          placeholder="--Pilih Kota--"
          disabled={!selectedProvinceId}
          required={true}
          queryKey={`kota-select-${selectedProvinceId || ""}`}
          queryFn={(page) => adminServices.getKota({ page, provinsi_id: selectedProvinceId, is_dropdown: true })}
          itemValue="id"
          itemLabel="nama"
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
        <InfiniteScrollSelect
          form={form}
          label="Kecamatan"
          name="kecamatan"
          labelStyle="text-[#3F6FA9]"
          placeholder="--Pilih Kecamatan--"
          disabled={!selectedCityId}
          required={true}
          queryKey={`kecamatan-select-${selectedCityId || ""}`}
          queryFn={(page) => adminServices.getKecamatan({ page, kabupaten_id: selectedCityId, is_dropdown: true })}
          itemValue="id"
          itemLabel="nama"
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
          name="suku_id"
          labelStyle="text-[#3F6FA9]"
          readOnly
        />
      ) : (
        <InfiniteScrollSelect
          form={form}
          label="Suku"
          name="suku_id"
          labelStyle="text-[#3F6FA9]"
          placeholder="--Pilih Suku--"
          required={false}
          // 👇 1. Ganti nama key agar cache lama yang nyangkut langsung terbuang
          queryKey="master-suku-dropdown"
          queryFn={async (page) => {
            const response = await adminServices.getSukuParams({ page, is_dropdown: true });

            // 👇 2. Tembak langsung ke array intinya (data.data.data)
            // Jika ada error/kosong, pastikan dia me-return array kosong []
            return response?.data?.data?.data || [];
          }}
          itemValue="id"
          itemLabel="nama"
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
