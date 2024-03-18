import axios from "axios";

const apiUrl = process.env.API_URL || "http://localhost:3000/api";

if (!apiUrl) {
  throw new Error("API_URL is not defined");
}

export const formApi = axios.create({
  baseURL: process.env.API_URL,
});
