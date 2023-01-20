/* eslint-disable prettier/prettier */
import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URI,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const accessToken = sessionStorage.getItem("accessToken");

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
    if (status === 401) {
      if (response.data.message === "뭐가올까요,,") {
        const originalRequest = config; 
        const reissuesResponse  = axios.post(
          `${process.env.REACT_APP_SERVER_URI}members/reisuess`,
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
              "Authorization": `Bearer ${accessToken}`,
            },
          },
          { withCredentials: true }
        );
        const newAccessTokenData = reissuesResponse.headers.get("Authorization").split(" ")[1];
        sessionStorage.clear();
        sessionStorage.setItem("accessToken", newAccessTokenData);
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
