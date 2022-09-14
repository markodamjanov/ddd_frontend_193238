import axios from "axios";

const productAxios = axios.create({
  baseURL: "http://localhost:9090/api",
  headers: {
    "Access-Control-Allow-Origins": "*",
  },
});

const orderAxios = axios.create({
  baseURL: "http://localhost:9091/api",
});

export { productAxios, orderAxios };
