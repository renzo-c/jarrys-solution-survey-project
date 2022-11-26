import axios from "axios";

export const openAPI = axios.create({
  baseURL: "/",
});
