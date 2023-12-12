import APIEndpoint from "../config/APIEndpoint";
import Rest from "../config/Rest";

export const getSportPlData = async (payload) => {
  let queryString = "";

  if (payload?.limit) {
    queryString += `${queryString ? "&" : "?"}limit=${payload?.limit}`;
  }

  if (payload?.page) {
    queryString += `${queryString ? "&" : "?"}page=${payload?.page}`;
  }

  if (payload?.from) {
    queryString += `${queryString ? "&" : "?"}from=${payload?.from}`;
  }

  if (payload?.to) {
    queryString += `${queryString ? "&" : "?"}to=${payload?.to}`;
  }

  if (payload?.timeZone) {
    queryString += `${queryString ? "&" : "?"}timeZone=${payload?.timeZone}`;
  }

  if (payload?.userId) {
    queryString += `${queryString ? "&" : "?"}userId=${payload?.userId}`;
  }

  const { data } = await Rest.get(`${APIEndpoint.getSportPl}${queryString}`);

  return data;
};

export const getEventPlData = async (payload) => {
  let queryString = "";

  if (payload?.limit) {
    queryString += `${queryString ? "&" : "?"}limit=${payload?.limit}`;
  }

  if (payload?.page) {
    queryString += `${queryString ? "&" : "?"}page=${payload?.page}`;
  }

  if (payload?.from) {
    queryString += `${queryString ? "&" : "?"}from=${payload?.from}`;
  }

  if (payload?.to) {
    queryString += `${queryString ? "&" : "?"}to=${payload?.to}`;
  }

  if (payload?.sportId) {
    queryString += `${queryString ? "&" : "?"}sportId=${payload?.sportId}`;
  }

  if (payload?.timeZone) {
    queryString += `${queryString ? "&" : "?"}timeZone=${payload?.timeZone}`;
  }

  if (payload?.userId) {
    queryString += `${queryString ? "&" : "?"}userId=${payload?.userId}`;
  }

  const { data } = await Rest.get(`${APIEndpoint.getMarketPl}${queryString}`);

  return data;
};

export const getMarketPlData = async (payload) => {
  let queryString = "";

  if (payload?.limit) {
    queryString += `${queryString ? "&" : "?"}limit=${payload?.limit}`;
  }

  if (payload?.page) {
    queryString += `${queryString ? "&" : "?"}page=${payload?.page}`;
  }

  if (payload?.from) {
    queryString += `${queryString ? "&" : "?"}from=${payload?.from}`;
  }

  if (payload?.to) {
    queryString += `${queryString ? "&" : "?"}to=${payload?.to}`;
  }

  if (payload?.eventId) {
    queryString += `${queryString ? "&" : "?"}eventId=${payload?.eventId}`;
  }

  if (payload?.timeZone) {
    queryString += `${queryString ? "&" : "?"}timeZone=${payload?.timeZone}`;
  }

  if (payload?.userId) {
    queryString += `${queryString ? "&" : "?"}userId=${payload?.userId}`;
  }

  const { data } = await Rest.get(`${APIEndpoint.getEventPl}${queryString}`);

  return data;
};

export const getBetListData = async (payload) => {
  let queryString = "";

  if (payload?.limit) {
    queryString += `${queryString ? "&" : "?"}limit=${payload?.limit}`;
  }

  if (payload?.page) {
    queryString += `${queryString ? "&" : "?"}page=${payload?.page}`;
  }

  if (payload?.from) {
    queryString += `${queryString ? "&" : "?"}from=${payload?.from}`;
  }

  if (payload?.to) {
    queryString += `${queryString ? "&" : "?"}to=${payload?.to}`;
  }

  if (payload?.sportId) {
    queryString += `${queryString ? "&" : "?"}sportId=${payload?.sportId}`;
  }

  if (payload?.marketId) {
    queryString += `${queryString ? "&" : "?"}marketId=${payload?.marketId}`;
  }

  if (payload?.timeZone) {
    queryString += `${queryString ? "&" : "?"}timeZone=${payload?.timeZone}`;
  }

  if (payload?.userId) {
    queryString += `${queryString ? "&" : "?"}userId=${payload?.userId}`;
  }

  const { data } = await Rest.get(`${APIEndpoint.getBetListPl}${queryString}`);

  return data;
};

export const getAviatorSportData = async (payload) => {
  let queryString = "";

  if (payload?.limit) {
    queryString += `${queryString ? "&" : "?"}limit=${payload?.limit}`;
  }

  if (payload?.page) {
    queryString += `${queryString ? "&" : "?"}page=${payload?.page}`;
  }

  if (payload?.from) {
    queryString += `${queryString ? "&" : "?"}from=${payload?.from}`;
  }

  if (payload?.to) {
    queryString += `${queryString ? "&" : "?"}to=${payload?.to}`;
  }

  if (payload?.timeZone) {
    queryString += `${queryString ? "&" : "?"}timeZone=${payload?.timeZone}`;
  }

  if (payload?.userId) {
    queryString += `${queryString ? "&" : "?"}userId=${payload?.userId}`;
  }

  const { data } = await Rest.get(
    `${APIEndpoint.getAviatorSport}${queryString}`
  );

  return data;
};

export const getAviatorPlData = async (payload) => {
  let queryString = "";

  if (payload?.limit) {
    queryString += `${queryString ? "&" : "?"}limit=${payload?.limit}`;
  }

  if (payload?.page) {
    queryString += `${queryString ? "&" : "?"}page=${payload?.page}`;
  }

  if (payload?.from) {
    queryString += `${queryString ? "&" : "?"}from=${payload?.from}`;
  }

  if (payload?.to) {
    queryString += `${queryString ? "&" : "?"}to=${payload?.to}`;
  }

  if (payload?.timeZone) {
    queryString += `${queryString ? "&" : "?"}timeZone=${payload?.timeZone}`;
  }

  if (payload?.userId) {
    queryString += `${queryString ? "&" : "?"}userId=${payload?.userId}`;
  }

  const { data } = await Rest.get(`${APIEndpoint.getAviatorPl}${queryString}`);

  return data;
};

export const getCategoryTotalPLData = async (payload) => {
  let queryString = "";

  if (payload?.limit) {
    queryString += `${queryString ? "&" : "?"}limit=${payload?.limit}`;
  }

  if (payload?.page) {
    queryString += `${queryString ? "&" : "?"}page=${payload?.page}`;
  }

  if (payload?.from) {
    queryString += `${queryString ? "&" : "?"}from=${payload?.from}`;
  }

  if (payload?.to) {
    queryString += `${queryString ? "&" : "?"}to=${payload?.to}`;
  }

  if (payload?.timeZone) {
    queryString += `${queryString ? "&" : "?"}timeZone=${payload?.timeZone}`;
  }

  if (payload?.userId) {
    queryString += `${queryString ? "&" : "?"}userId=${payload?.userId}`;
  }

  const { data } = await Rest.get(
    `${APIEndpoint.getSt8CategoryTotalPL}${queryString}`
  );

  return data;
};

export const getSt8CategoriesData = async (payload) => {
  let queryString = "";

  if (payload?.limit) {
    queryString += `${queryString ? "&" : "?"}limit=${payload?.limit}`;
  }

  if (payload?.page) {
    queryString += `${queryString ? "&" : "?"}page=${payload?.page}`;
  }

  if (payload?.from) {
    queryString += `${queryString ? "&" : "?"}from=${payload?.from}`;
  }

  if (payload?.to) {
    queryString += `${queryString ? "&" : "?"}to=${payload?.to}`;
  }

  if (payload?.timeZone) {
    queryString += `${queryString ? "&" : "?"}timeZone=${payload?.timeZone}`;
  }

  if (payload?.userId) {
    queryString += `${queryString ? "&" : "?"}userId=${payload?.userId}`;
  }

  const { data } = await Rest.get(
    `${APIEndpoint.getSt8Categories}${queryString}`
  );

  return data;
};

export const getSt8GameListData = async (payload) => {
  let queryString = "";

  if (payload?.limit) {
    queryString += `${queryString ? "&" : "?"}limit=${payload?.limit}`;
  }

  if (payload?.page) {
    queryString += `${queryString ? "&" : "?"}page=${payload?.page}`;
  }

  if (payload?.from) {
    queryString += `${queryString ? "&" : "?"}from=${payload?.from}`;
  }

  if (payload?.to) {
    queryString += `${queryString ? "&" : "?"}to=${payload?.to}`;
  }

  if (payload?.category) {
    queryString += `${queryString ? "&" : "?"}category=${payload?.category}`;
  }

  if (payload?.timeZone) {
    queryString += `${queryString ? "&" : "?"}timeZone=${payload?.timeZone}`;
  }

  if (payload?.userId) {
    queryString += `${queryString ? "&" : "?"}userId=${payload?.userId}`;
  }

  const { data } = await Rest.get(
    `${APIEndpoint.getSt8GameList}${queryString}`
  );

  return data;
};

export const getAuraSportPlData = async (payload) => {
  let queryString = "";

  if (payload?.limit) {
    queryString += `${queryString ? "&" : "?"}limit=${payload?.limit}`;
  }

  if (payload?.page) {
    queryString += `${queryString ? "&" : "?"}page=${payload?.page}`;
  }

  if (payload?.from) {
    queryString += `${queryString ? "&" : "?"}from=${payload?.from}`;
  }

  if (payload?.to) {
    queryString += `${queryString ? "&" : "?"}to=${payload?.to}`;
  }

  if (payload?.timeZone) {
    queryString += `${queryString ? "&" : "?"}timeZone=${payload?.timeZone}`;
  }

  if (payload?.userId) {
    queryString += `${queryString ? "&" : "?"}userId=${payload?.userId}`;
  }

  const { data } = await Rest.get(
    `${APIEndpoint.getAuraSportPl}${queryString}`
  );
  // const { data } = await Rest.get(APIEndpoint.getAuraSportPl);

  return data;
};

export const getAuraEventPlData = async (payload) => {
  let queryString = "";

  if (payload?.limit) {
    queryString += `${queryString ? "&" : "?"}limit=${payload?.limit}`;
  }

  if (payload?.page) {
    queryString += `${queryString ? "&" : "?"}page=${payload?.page}`;
  }

  if (payload?.from) {
    queryString += `${queryString ? "&" : "?"}from=${payload?.from}`;
  }

  if (payload?.to) {
    queryString += `${queryString ? "&" : "?"}to=${payload?.to}`;
  }

  if (payload?.timeZone) {
    queryString += `${queryString ? "&" : "?"}timeZone=${payload?.timeZone}`;
  }

  if (payload?.userId) {
    queryString += `${queryString ? "&" : "?"}userId=${payload?.userId}`;
  }

  const { data } = await Rest.get(
    `${APIEndpoint.getAuraEventPl}${queryString}`
  );
  // const { data } = await Rest.get(APIEndpoint.getAuraEventPl);

  return data;
};

export const getAuraMarketPlData = async (payload) => {
  let queryString = "";

  if (payload?.limit) {
    queryString += `${queryString ? "&" : "?"}limit=${payload?.limit}`;
  }

  if (payload?.page) {
    queryString += `${queryString ? "&" : "?"}page=${payload?.page}`;
  }

  if (payload?.from) {
    queryString += `${queryString ? "&" : "?"}from=${payload?.from}`;
  }

  if (payload?.to) {
    queryString += `${queryString ? "&" : "?"}to=${payload?.to}`;
  }

  if (payload?.matchName) {
    const encodedMatchName = encodeURIComponent(payload?.matchName);
    queryString += `${queryString ? "&" : "?"}matchName=${encodedMatchName}`;
  }

  if (payload?.timeZone) {
    queryString += `${queryString ? "&" : "?"}timeZone=${payload?.timeZone}`;
  }

  if (payload?.userId) {
    queryString += `${queryString ? "&" : "?"}userId=${payload?.userId}`;
  }

  const { data } = await Rest.get(
    `${APIEndpoint.getAuraMarketPl}${queryString}`
  );
  // const { data } = await Rest.get(APIEndpoint.getAuraMarketPl);

  return data;
};

export const getAuraBetListPlData = async (payload) => {
  let queryString = "";

  if (payload?.limit) {
    queryString += `${queryString ? "&" : "?"}limit=${payload?.limit}`;
  }

  if (payload?.page) {
    queryString += `${queryString ? "&" : "?"}page=${payload?.page}`;
  }

  if (payload?.from) {
    queryString += `${queryString ? "&" : "?"}from=${payload?.from}`;
  }

  if (payload?.to) {
    queryString += `${queryString ? "&" : "?"}to=${payload?.to}`;
  }

  if (payload?.to) {
    queryString += `${queryString ? "&" : "?"}roundId=${payload?.roundId}`;
  }

  if (payload?.timeZone) {
    queryString += `${queryString ? "&" : "?"}timeZone=${payload?.timeZone}`;
  }

  if (payload?.userId) {
    queryString += `${queryString ? "&" : "?"}userId=${payload?.userId}`;
  }

  const { data } = await Rest.get(
    `${APIEndpoint.getAuraBetListPl}${queryString}`
  );
  // const { data } = await Rest.get(APIEndpoint.getAuraBetListPl);

  return data;
};
