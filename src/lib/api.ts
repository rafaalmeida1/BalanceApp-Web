import axios from "axios";

export const api = axios.create({
    baseURL: "https://balance-app.cyclic.app/api",
    // baseURL: "http://localhost:3333/api",
})