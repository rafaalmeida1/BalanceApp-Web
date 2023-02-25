import axios from "axios";

export const api = axios.create({
  baseURL: "https://balance-app.cyclic.app/api",
  // baseURL: "http://localhost:3333/api",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
  },
});
