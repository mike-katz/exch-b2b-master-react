import { showToastMessage } from "../../utils/helper";
import APIEndpoint from "../config/APIEndpoint";
import Rest from "../config/Rest";

export const getLogin = async (payload) => {
  const { data } = await Rest.post(APIEndpoint.login, payload, false, {}, true);

  if (!data?.accessToken) {
    showToastMessage(data, 500);
  }

  return data;
};

export const verifyRegisterOTP = async (payload) => {
  const { data } = await Rest.post(
    APIEndpoint.verifyOTP,
    payload,
    false,
    {},
    true
  );

  if (data) {
    showToastMessage(data?.message, 200);
  }

  return data;
};

export const getBalanceData = async (payload) => {
  const { data } = await Rest.post(APIEndpoint.getBalance, payload);

  return data;
};

export const changePasswordData = async (payload) => {
  const { data } = await Rest.post(APIEndpoint.changePassword, payload);

  if (data) {
    showToastMessage(data?.message, 200);
  }

  return data;
};

export const findUserGenerateOTPData = async (payload) => {
  const { data } = await Rest.post(
    APIEndpoint.findUserGenerateOTP,
    payload,
    false,
    {},
    true
  );

  if (data) {
    showToastMessage(data?.message, 200);
  }

  return data;
};

export const findUserVerifyOTPData = async (payload) => {
  const { data } = await Rest.post(
    APIEndpoint.findUserVerifyOTP,
    payload,
    false,
    {},
    true
  );

  return data;
};

export const forgotGenerateOTPData = async (payload) => {
  const { data } = await Rest.post(
    APIEndpoint.forgotGenerateOTP,
    payload,
    false,
    {},
    true
  );

  if (data) {
    showToastMessage(data?.message, 200);
  }

  return data;
};

export const forgotVerifyOTPData = async (payload) => {
  const { data } = await Rest.post(
    APIEndpoint.forgotVerifyOTP,
    payload,
    false,
    {},
    true
  );

  if (data) {
    showToastMessage(data?.message, 200);
  }

  return data;
};

export const forgotChangePasswordData = async (payload) => {
  const { data } = await Rest.post(
    APIEndpoint.forgotChangePassword,
    payload,
    false,
    {},
    true
  );

  if (data) {
    showToastMessage(data?.message, 200);
  }

  return data;
};
