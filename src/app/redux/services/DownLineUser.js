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
  let queryParams = "";

  if (payload?.page) {
    queryParams += `?page=${payload?.page}`;
  }

  if (payload?.limit) {
    queryParams += `${queryParams ? "&" : "?"}limit=${payload?.limit}`;
  }

  if (payload?.status) {
    queryParams += `${queryParams ? "&" : "?"}status=${payload?.status}`;
  }

  if (payload?.search) {
    queryParams += `${queryParams ? "&" : "?"}search=${payload?.search}`;
  }

  if (payload?.userId) {
    queryParams += `${queryParams ? "&" : "?"}userId=${payload?.userId}`;
  }
  const { data } = await Rest.get(
    `${APIEndpoint.getDownLineUser}${queryParams}`
  );

  return data;
};

export const getDownLineMasterData = async (payload) => {
  let queryParams = "";

  if (payload?.page) {
    queryParams += `?page=${payload?.page}`;
  }

  if (payload?.limit) {
    queryParams += `${queryParams ? "&" : "?"}limit=${payload?.limit}`;
  }

  if (payload?.status) {
    queryParams += `${queryParams ? "&" : "?"}status=${payload?.status}`;
  }

  if (payload?.search) {
    queryParams += `${queryParams ? "&" : "?"}search=${payload?.search}`;
  }

  if (payload?.userId) {
    queryParams += `${queryParams ? "&" : "?"}userId=${payload?.userId}`;
  }

  const { data } = await Rest.get(
    `${APIEndpoint.getDownLineMaster}${queryParams}`
  );

  return data;
};

export const getMyBalanceData = async () => {
  const { data } = await Rest.get(APIEndpoint.getMyBalance);

  return data;
};

export const getUserDetailData = async (payload) => {
  let queryParams = "";
  if (payload?.userId) {
    queryParams += `?userId=${payload?.userId}`;
  }

  const { data } = await Rest.get(`${APIEndpoint.getUserDetail}${queryParams}`);

  return data;
};

export const getActivityLogData = async (payload) => {
  let queryParams = "";
  if (payload?.userId) {
    queryParams += `?userId=${payload?.userId}`;
  }

  const { data } = await Rest.get(
    `${APIEndpoint.getActivityLog}${queryParams}`
  );

  return data;
};

export const editCreditRefData = async (payload) => {
  const { data } = await Rest.post(APIEndpoint.editCreditRef, payload);

  if (data) {
    showToastMessage(data?.message, 200);
  }

  return data;
};

export const creditRefListData = async (payload) => {
  let queryParams = "";
  if (payload?.userId) {
    queryParams += `?userId=${payload?.userId}`;
  }

  const { data } = await Rest.get(`${APIEndpoint.creditRefList}${queryParams}`);

  return data;
};

export const changeStatusData = async (payload) => {
  const { data } = await Rest.post(APIEndpoint.updateStatus, payload);

  if (data) {
    showToastMessage(data?.message, 200);
  }

  return data;
};

export const editExposureLimitData = async (payload) => {
  const { data } = await Rest.post(APIEndpoint.editExposureLimit, payload);

  if (data) {
    showToastMessage(data?.message, 200);
  }

  return data;
};

export const exportCSVFileData = async (payload) => {
  const { data } = await Rest.post(APIEndpoint.exportCSVFile, payload);

  if (data) {
    showToastMessage(data?.message, 200);
  }

  return data;
};

export const addBankTransactionData = async (payload) => {
  const { data } = await Rest.post(APIEndpoint.bankingTransaction, payload);

  if (data) {
    showToastMessage(data?.message, 200);
  }

  return data;
};

export const getBankTransactionData = async (payload) => {
  let queryParams = "";

  if (payload?.page) {
    queryParams += `?page=${payload?.page}`;
  }

  if (payload?.limit) {
    queryParams += `${queryParams ? "&" : "?"}limit=${payload?.limit}`;
  }

  if (payload?.userId) {
    queryParams += `${queryParams ? "&" : "?"}userId=${payload?.userId}`;
  }

  const { data } = await Rest.get(
    `${APIEndpoint.bankingTransactionHistory}${queryParams}`
  );

  return data;
};
