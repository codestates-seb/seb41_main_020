/* eslint-disable prettier/prettier */
import axios from "axios";

const accessToken = sessionStorage.getItem("accessToken");
const refreshToken = localStorage.getItem("refreshToken");

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URI,
  headers: {
    "Accept": "*/*",
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

instance.interceptors.request.use(
  async (config) => {
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    const res = response.data;
    return res;
  },
  (error) => {
    const { config, response, status } = error;
    if (status === 400) {
      if (response.data.message === "Token Expired") {
        const originalRequest = config; 
        const reissuesResponse  = axios.post(
          `${process.env.REACT_APP_SERVER_URI}members/reissue`,
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
              "Authorization": `Bearer ${accessToken}`,
              "Refresh": refreshToken,
            },
          },
          { withCredentials: true }
        );
        sessionStorage.clear();
        localStorage.removeItem("refreshToken");
        sessionStorage.setItem("accessToken", reissuesResponse.headers.get("Authorization").split(" ")[1]);
        localStorage.setItem("refreshToken", localStorage.setItem(reissuesResponse.headers.get("Refresh")));
        const accessToken = sessionStorage.getItem("accessToken");
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return instance.request(originalRequest);
      } else {
        return Promise.reject(error);
      }
    } else {
      return Promise.reject(error);
    }
  }
);

export default instance;
