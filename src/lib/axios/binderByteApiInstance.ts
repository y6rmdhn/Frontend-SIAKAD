import axios from "axios";

export const wilayahApi = axios.create({
    baseURL: "/api-wilayah/api/",
});
