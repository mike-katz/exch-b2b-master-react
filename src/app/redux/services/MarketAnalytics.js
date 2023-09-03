import APIEndpoint from "../config/APIEndpoint";
import Rest from "../config/Rest";

export const getMarketData = async () => {
  const { data } = await Rest.get(APIEndpoint.getMarketData);

  return data;
};

export const getMarketDetailData = async (eventId) => {
  const { data } = await Rest.get(
    `${APIEndpoint.marketDetails}?eventId=${eventId}`
  );

  return data;
};

export const getChannelData = async (eventId) => {
  const data = await Rest.get(
    `${APIEndpoint.getChannelData}?eventId=${eventId}`
  );

  if (data) {
    return data?.data;
  }
};

export const getBetHistoryData = async (payload) => {
  let queryParams = "";

  if (payload?.exEventId) {
    queryParams += `${queryParams ? "&" : "?"}eventId=${payload?.exEventId}`;
  }

  const { data } = await Rest.get(
    `${APIEndpoint.getBetHistoryData}${queryParams}`
  );

  return data;
};

export const getBetHistoryLPData = async (payload) => {
  let queryParams = "";

  if (payload?.exEventId) {
    queryParams += `${queryParams ? "&" : "?"}eventId=${payload?.exEventId}`;
  }

  const { data } = await Rest.get(
    `${APIEndpoint.getBetHistoryLPData}${queryParams}`
  );

  return data;
};
