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
