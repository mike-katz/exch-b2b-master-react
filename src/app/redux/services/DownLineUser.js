import { showToastMessage } from "../../utils/helper";
import APIEndpoint from "../config/APIEndpoint";
import Rest from "../config/Rest";

export const registerUser = async (payload) => {
  const { data } = await Rest.post(APIEndpoint.register, payload);

  if (data) {
    showToastMessage(data?.message, 200);
  }

  return data;
};

export const getDownLineUserData = async (payload) => {
  const queryParams = `?page=${payload?.page || ""}&limit=${
    payload?.limit || ""
  }&search=${payload?.search || ""}&status=${payload?.status || ""}`;
  const { data } = await Rest.get(
    `${APIEndpoint.getDownLineUser}${queryParams}`
  );

  return data;
};

export const getMyBalanceData = async () => {
  const { data } = await Rest.get(APIEndpoint.getMyBalance);

  return data;
};
