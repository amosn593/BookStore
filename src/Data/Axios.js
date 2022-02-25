import axios from "axios";

const BaseUrl = "http://127.0.0.1:8000";

const BaseAxios = axios.create({
  baseURL: BaseUrl,
  timeout: 3000,
});

export { BaseAxios };
