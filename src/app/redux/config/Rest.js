import axios from "axios";
import { store } from "../store";
import { showToastMessage } from "../../utils/helper";
import { logoutUser } from "../actions/persistAction";

axios.defaults.timeout = 1000 * 60;
axios.defaults.headers = {
  pragma: "no-cache",
  Accept: "application/json",
};

export default class Rest {
  static async get(url, publicToken = false) {
    const { persist } = store.getState();

    const token = persist?.token;

    const instance = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      headers: {
        Authorization: publicToken
          ? process.env.REACT_APP_API_TOKEN
          : `Bearer ${token}`,
      },
    });

    return await instance
      .get(url)
      .then((res) => {
        return res;
      })
      .catch((error) => {
        console.log({ error });
        if (error?.response?.status === 401) {
          console.clear();
          store.dispatch(logoutUser());
          return false;
        } else if (error?.response?.data?.message) {
          console.clear();
          showToastMessage(error?.response?.data?.message, 500);
          return false;
        } else {
          // console.clear();
          return false;
        }
      });
  }

  static async post(
    url,
    payload = {},
    formData = false,
    headers = {},
    publicToken = false
  ) {
    const { persist } = store.getState();

    const token = persist?.token;

    const instance = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      headers: {
        Authorization: publicToken
          ? process.env.REACT_APP_API_TOKEN
          : `Bearer ${token}`,
        "Content-Type": formData ? "multipart/form-data" : "application/json",
        ...headers,
      },
    });

    return await instance
      .post(url, payload)
      .then((res) => {
        return res;
      })
      .catch((error) => {
        if (error?.response?.status === 401) {
          // console.clear();
          store.dispatch(logoutUser());
          return false;
        } else if (error?.response?.data?.message) {
          // console.clear();
          showToastMessage(error?.response?.data?.message, 500);
          return false;
        } else {
          // console.clear();
          return false;
        }
      });
  }

  static async delete(
    url,
    formData = false,
    headers = {},
    publicToken = false
  ) {
    const { persist } = store.getState();

    const token = persist?.token;

    const instance = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      headers: {
        Authorization: publicToken
          ? process.env.REACT_APP_API_TOKEN
          : `Bearer ${token}`,
        "Content-Type": formData ? "multipart/form-data" : "application/json",
        ...headers,
      },
    });

    return await instance
      .delete(url)
      .then((res) => {
        return res;
      })
      .catch((error) => {
        if (error?.response?.status === 401) {
          console.clear();
          store.dispatch(logoutUser());
          return false;
        } else if (error?.response?.data?.message) {
          console.clear();
          showToastMessage(error?.response?.data?.message, 500);
          return false;
        } else {
          console.clear();
          return false;
        }
      });
  }
}
