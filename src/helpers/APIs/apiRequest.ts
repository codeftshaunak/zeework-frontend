import axios from "axios";
import { clearAuthData } from "../../redux/authSlice/authSlice";
import store from "../../redux/store";
import { BASE_URL } from "./proxy";
import { handleApiError } from "./common";

export const API = axios.create({
  baseURL: BASE_URL,
});

API.interceptors.request.use(function (config) {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const authtoken = user.authtoken || "";

  config.headers.Authorization = authtoken ? `Bearer ${authtoken}` : "";
  return config;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    handleApiError(error);
    // if (error?.response?.status === 401) {
    //   localStorage.removeItem("user");
    //   localStorage.removeItem("authtoken");
    //   store.dispatch(clearAuthData());
    //   setTimeout(() => {
    //     window.location.replace("/login");
    //   }, 500);
    // }
    return Promise.reject(error);
  }
);

export const signUp = async (data) => {
  try {
    const response = await API.post("/register", data, {
      headers: { "Access-Control-Allow-Credentials": true },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

export const signIn = async (data) => {
  try {
    const response = await API.post("/login", data, {
      headers: { "Access-Control-Allow-Credentials": true },
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const verifyMail = async (data) => {
  try {
    const response = await API.post("/email/verification", data, {
      headers: { "Access-Control-Allow-Credentials": true },
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export default API;
