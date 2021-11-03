import axios from "axios";

const api = axios.create({
    baseURL: process.env.THIRD_PARY_URL
});

export default api;
