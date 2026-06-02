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

const isValidId = (id: any) => {
  if (!id) return false;
  const idStr = String(id);
  return /^\d+$/.test(idStr) || /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(idStr);
};

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

  const selectedProvinceName = watch("provinsi");
  const selectedCityName = watch("kota");
  const prevProvinceName = usePrevious(selectedProvinceName);
  const prevCityName = usePrevious(selectedCityName);

  const [provinceId, setProvinceId] = React.useState<string>("");
  const [cityId, setCityId] = React.useState<string>("");

  // Initial load or background reset logic: match name to ID for cascading calls
  useEffect(() => {
    const getInitialProvince = async () => {
      if (selectedProvinceName && !isValidId(selectedProvinceName)) {
        try {
          const res = await adminServices.getMasterProvinsi({ search: selectedProvinceName, is_dropdown: true });
          const items = res.data?.data?.items || [];
          const matched = items.find((item: any) => item.nama?.toUpperCase() === selectedProvinceName.toUpperCase());
          if (matched) {
            setProvinceId(matched.id);
          }
        } catch (error) {
          console.error("Failed to load initial province ID", error);
        }
      } else if (isValidId(selectedProvinceName)) {
        setProvinceId(selectedProvinceName);
      } else {
        setProvinceId("");
      }
    };
    getInitialProvince();
  }, [selectedProvinceName]);

  useEffect(() => {
    const getInitialCity = async () => {
      if (selectedCityName && !isValidId(selectedCityName) && provinceId) {
        try {
          const res = await adminServices.getMasterKota({ search: selectedCityName, provinsi_id: provinceId, is_dropdown: true });
          const items = res.data?.data?.items || [];
          const matched = items.find((item: any) => item.nama?.toUpperCase() === selectedCityName.toUpperCase());
          if (matched) {
            setCityId(matched.id);
          }
        } catch (error) {
          console.error("Failed to load initial city ID", error);
        }
      } else if (isValidId(selectedCityName)) {
        setCityId(selectedCityName);
      } else {
        setCityId("");
      }
    };
    getInitialCity();
  }, [selectedCityName, provinceId]);

  // Reset dependent fields when parent field changes
  useEffect(() => {
    if (
      !isReadOnly &&
      prevProvinceName !== undefined &&
      prevProvinceName !== selectedProvinceName
    ) {
      setValue("kota", "");
      setValue("kecamatan", "");
      setProvinceId("");
      setCityId("");
    }
  }, [isReadOnly, selectedProvinceName, prevProvinceName, setValue]);

  useEffect(() => {
    if (
      !isReadOnly &&
      prevCityName !== undefined &&
      prevCityName !== selectedCityName
    ) {
      setValue("kecamatan", "");
      setCityId("");
    }
  }, [isReadOnly, selectedCityName, prevCityName, setValue]);

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
          queryFn={(page) => adminServices.getMasterNegara({ page, is_dropdown: true })}
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
          queryFn={(page) => adminServices.getMasterProvinsi({ page, is_dropdown: true })}
          itemValue="nama"
          itemLabel="nama"
          onSelectItem={(item) => setProvinceId(item.id)}
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
          disabled={!provinceId || !isValidId(provinceId)}
          required={true}
          queryKey={`kota-select-${provinceId || ""}`}
          queryFn={(page) => adminServices.getMasterKota({ page, provinsi_id: isValidId(provinceId) ? provinceId : undefined, is_dropdown: true })}
          itemValue="nama"
          itemLabel="nama"
          onSelectItem={(item) => setCityId(item.id)}
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
          disabled={!cityId || !isValidId(cityId)}
          required={true}
          queryKey={`kecamatan-select-${cityId || ""}`}
          queryFn={(page) => adminServices.getMasterKecamatan({ page, kabupaten_id: isValidId(cityId) ? cityId : undefined, is_dropdown: true })}
          itemValue="nama"
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
          queryKey="suku-select"
          queryFn={(page) => adminServices.getSukuParams({ page, is_dropdown: true })}
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
