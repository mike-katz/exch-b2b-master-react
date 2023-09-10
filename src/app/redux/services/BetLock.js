import { showToastMessage } from "../../utils/helper";
import APIEndpoint from "../config/APIEndpoint";
import Rest from "../config/Rest";

export const getBetLockData = async () => {
  const { data } = await Rest.get(APIEndpoint.getBetLockData);

  return data;
};

export const betLockData = async (payload) => {
  const { data } = await Rest.post(APIEndpoint.betLockData, payload);

  if (data) {
    showToastMessage(data?.message, 200);
  }

  return data;
};
