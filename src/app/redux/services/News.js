import APIEndpoint from "../config/APIEndpoint";
import Rest from "../config/Rest";

export const addNewsData = async (payload) => {
  const { data } = await Rest.post(APIEndpoint.news, payload);

  return data;
};
