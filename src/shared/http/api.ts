import axios from "axios";

const api = axios.create({
    baseURL: 'https://ev5uwiczj6.execute-api.eu-central-1.amazonaws.com/test/supply-chain'
});

export default api;