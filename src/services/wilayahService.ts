// services/wilayahService.ts
import axios from "axios";

export const wilayahServices = {
  // Untuk data negara (international)
  getCountries: () =>
    axios.get("https://restcountries.com/v3.1/all?fields=name,cca2,cca3,idd"),

  // Untuk data wilayah Indonesia
  getProvinces: () =>
    axios.get(
      "https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json"
    ),

  getRegencies: (provinceId: string) =>
    axios.get(
      `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provinceId}.json`
    ),

  getDistricts: (regencyId: string) =>
    axios.get(
      `https://www.emsifa.com/api-wilayah-indonesia/api/districts/${regencyId}.json`
    ),
};

// Format response untuk countries
export const formatCountries = (countries: any[]) => {
  return countries
    .map((country) => ({
      id: country.cca3,
      name: country.name.common,
      code: country.cca2,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
};

// Format response untuk provinces
export const formatProvinces = (provinces: any[]) => {
  return provinces.map((province) => ({
    id: province.id,
    name: province.name,
  }));
};

// Format response untuk regencies/kota
export const formatRegencies = (regencies: any[]) => {
  return regencies.map((regency) => ({
    id: regency.id,
    name: regency.name,
    province_id: regency.province_id,
  }));
};

// Format response untuk districts/kecamatan
export const formatDistricts = (districts: any[]) => {
  return districts.map((district) => ({
    id: district.id,
    name: district.name,
    regency_id: district.regency_id,
  }));
};
