import {FormFieldInput} from "../CustomFormInput/CustomFormInput";
import {FormFieldSelect} from "../CustomFormSelect/CustomFormSelect";
import {COUNTRIES} from "@/constant/countries/countries.ts";
import React, {useEffect, useRef} from 'react';
import {useQuery} from "@tanstack/react-query";
import wilayahIdServices from "@/services/binderByte.services.ts";

const DomisiliSection = ({form}) => {

    function usePrevious(value) {
        const ref = useRef();
        useEffect(() => {
            ref.current = value;
        });
        return ref.current;
    }

    const { watch, setValue } = form;
    const selectedProvinceId = watch('provinsi');
    const selectedCityId = watch('kota');
    const prevProvinceId = usePrevious(selectedProvinceId);
    const prevCityId = usePrevious(selectedCityId);



    const {
        data: provincesData,
        isLoading: isProvincesLoading
    } = useQuery({
        queryKey: ['provinsi-wilayah-id'], // Gunakan key baru
        queryFn: wilayahIdServices.getProvinsi,
    });

    const {
        data: citiesData,
        isLoading: isCitiesLoading
    } = useQuery({
        queryKey: ['kota-wilayah-id', selectedProvinceId],
        queryFn: () => wilayahIdServices.getKota(selectedProvinceId),
        enabled: !!selectedProvinceId,
    });

    const {
        data: kecamatanData,
        isLoading: isKecamatanLoading
    } = useQuery({
        queryKey: ['kecamatan-wilayah-id', selectedCityId],
        queryFn: () => wilayahIdServices.getKecamatan(selectedCityId),
        enabled: !!selectedCityId,
    });

    const provinceOptions = provincesData?.data?.map(prov => ({
        label: prov.name,
        value: prov.code,
    })) || [];

    const cityOptions = citiesData?.data?.map(city => ({
        label: city.name,
        value: city.code,
    })) || [];

    const kecamatanOptions = kecamatanData?.data?.map(kec => ({
        label: kec.name,
        value: kec.code,
    })) || [];

    useEffect(() => {
        if (prevProvinceId !== undefined && prevProvinceId !== selectedProvinceId) {
            setValue('kota', '');
            setValue('kecamatan', '');
        }
    }, [selectedProvinceId, prevProvinceId, setValue]);

    useEffect(() => {
        if (prevCityId !== undefined && prevCityId !== selectedCityId) {
            setValue('kecamatan', '');
        }
    }, [selectedCityId, prevCityId, setValue]);

    return(
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
                placeholder={isKecamatanLoading ? "Memuat kecamatan..." : "--Pilih Kecamatan--"}
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
            <FormFieldSelect
                form={form}
                label="Suku"
                name="suku"
                labelStyle="text-[#3F6FA9]"
                options={[
                    {label: "Admin", value: "admin"},
                    {label: "User", value: "user"},
                    {label: "Guest", value: "guest"},
                ]}
                placeholder="--Pilih Suku--"
                required={false}
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
                name="no_telepon_domisili_kontak"
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
}

export default React.memo(DomisiliSection);
