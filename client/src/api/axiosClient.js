import axios from "axios";
import queryString from "query-string";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  const token =
    localStorage.getItem(process.env.REACT_APP_ACCESS_TOKEN) || null;
  config.headers["authorization"] = `Bearer ${token}`;
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401) {
      if (originalRequest.url === "/users/login/refresh") {
        localStorage.removeItem(process.env.REACT_APP_ACCESS_TOKEN);
        localStorage.removeItem(process.env.REACT_APP_REFRESH_TOKEN);
        return;
      }
      axiosClient
        .post("/users/login/refresh", {
          refreshToken: localStorage.getItem(
            process.env.REACT_APP_REFRESH_TOKEN
          ),
        })
        .then((res) => {
          if (res && res.msg === "success") {
            localStorage.setItem("token", res.token);
            axios.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${res.token}`;
            axiosClient(originalRequest);
          }
        })
        .catch((error) => {
          localStorage.removeItem(process.env.REACT_APP_ACCESS_TOKEN);
          localStorage.removeItem(process.env.REACT_APP_REFRESH_TOKEN);
        });
    }
  }
);

export default axiosClient;
