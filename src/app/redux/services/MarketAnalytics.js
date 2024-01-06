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

  if (payload?.page) {
    queryParams += `?page=${payload?.page}`;
  }

  if (payload?.limit) {
    queryParams += `${queryParams ? "&" : "?"}limit=${payload?.limit}`;
  }

  if (payload?.eventId) {
    queryParams += `${queryParams ? "&" : "?"}eventId=${payload?.eventId}`;
  }

  if (payload?.amount) {
    queryParams += `${queryParams ? "&" : "?"}amount=${payload?.amount}`;
  }

  if (payload?.flag) {
    queryParams += `${queryParams ? "&" : "?"}flag=${payload?.flag}`;
  }

  if (payload?.sportId) {
    queryParams += `${queryParams ? "&" : "?"}sportId=${payload?.sportId}`;
  }

  const { data } = await Rest.get(
    `${APIEndpoint.getBetHistoryData}${queryParams}`
  );

  return data;
};

export const getBetHistoryDetailData = async (payload) => {
  let queryParams = "";

  if (payload?.eventId) {
    queryParams += `${queryParams ? "&" : "?"}eventId=${payload?.eventId}`;
  }

  if (payload?.flag) {
    queryParams += `${queryParams ? "&" : "?"}flag=${payload?.flag}`;
  }

  if (payload?.sportId) {
    queryParams += `${queryParams ? "&" : "?"}sportId=${payload?.sportId}`;
  }

  const { data } = await Rest.get(
    `${APIEndpoint.getBetHistoryDetailData}${queryParams}`
  );

  return data;
};

export const getBetHistoryLPData = async (payload) => {
  let queryParams = "";

  if (payload?.exEventId) {
    queryParams += `${queryParams ? "&" : "?"}eventId=${payload?.exEventId}`;
  }

  if (payload?.sportId) {
    queryParams += `${queryParams ? "&" : "?"}sportId=${payload?.sportId}`;
  }

  const { data } = await Rest.get(
    `${APIEndpoint.getBetHistoryLPData}${queryParams}`
  );

  return data;
};

export const getBetHistoryFancyLPData = async (payload) => {
  let queryParams = "";

  if (payload?.exEventId) {
    queryParams += `${queryParams ? "&" : "?"}eventId=${payload?.exEventId}`;
  }

  if (payload?.sportId) {
    queryParams += `${queryParams ? "&" : "?"}sportId=${payload?.sportId}`;
  }

  const { data } = await Rest.get(
    `${APIEndpoint.getBetHistoryFancyLPData}${queryParams}`
  );

  return data;
};

export const getUserPlByMarketData = async (payload) => {
  let queryParams = "";

  if (payload?.page) {
    queryParams += `${queryParams ? "&" : "?"}page=${payload?.page}`;
  }

  if (payload?.limit) {
    queryParams += `${queryParams ? "&" : "?"}limit=${payload?.limit}`;
  }

  if (payload?.marketId) {
    queryParams += `${queryParams ? "&" : "?"}marketId=${payload?.marketId}`;
  }

  const { data } = await Rest.get(
    `${APIEndpoint.getUserPlByMarket}${queryParams}`
  );

  return data;
};

export const getMarketSpreadexIdData = async (payload) => {
  let queryParams = "";

  if (payload?.eventId) {
    queryParams += `${queryParams ? "&" : "?"}eventId=${payload?.eventId}`;
  }

  const { data } = await Rest.get(
    `${APIEndpoint.getExtraFetchScoreboard}${queryParams}`
  );

  return data;
};
