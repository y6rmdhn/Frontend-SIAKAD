import axiosInstance from "@/lib/axios/axiosInstance.ts";
import endpoint from "@/services/endpoint.constant.ts";
import {IDataPegawai} from "@/types/create.pegawai.ts";

const postPegawaiServices = {
    dataPegawai: (payload: IDataPegawai) =>
        axiosInstance.post(`${endpoint.ADMIN}/pegawai`, payload),
};

export default postPegawaiServices;