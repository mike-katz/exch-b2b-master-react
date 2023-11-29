import APIEndpoint from "../config/APIEndpoint";
import Rest from "../config/Rest";

export const getReportSportTotalPLData = async (payload) => {
  let queryString = "";

  if (payload?.from) {
    queryString += `${queryString ? "&" : "?"}from=${payload?.from}`;
  }

  if (payload?.to) {
    queryString += `${queryString ? "&" : "?"}to=${payload?.to}`;
  }

  if (payload?.timeZone) {
    queryString += `${queryString ? "&" : "?"}timeZone=${payload?.timeZone}`;
  }

  const { data } = await Rest.get(
    `${APIEndpoint.getReportSportTotalPL}${queryString}`
  );

  return data;
};

export const getReportCasinoTotalPLData = async (payload) => {
  let queryString = "";

  if (payload?.from) {
    queryString += `${queryString ? "&" : "?"}from=${payload?.from}`;
  }

  if (payload?.to) {
    queryString += `${queryString ? "&" : "?"}to=${payload?.to}`;
  }

  if (payload?.timeZone) {
    queryString += `${queryString ? "&" : "?"}timeZone=${payload?.timeZone}`;
  }

  const { data } = await Rest.get(
    `${APIEndpoint.getReportCasinoTotalPL}${queryString}`
  );

  return data;
};

export const apiReportIntCasinoTotalPLData = async (payload) => {
  let queryString = "";

  if (payload?.from) {
    queryString += `${queryString ? "&" : "?"}from=${payload?.from}`;
  }

  if (payload?.to) {
    queryString += `${queryString ? "&" : "?"}to=${payload?.to}`;
  }

  if (payload?.timeZone) {
    queryString += `${queryString ? "&" : "?"}timeZone=${payload?.timeZone}`;
  }

  const { data } = await Rest.get(
    `${APIEndpoint.apiReportIntCasinoTotalPL}${queryString}`
  );

  return data;
};

export const getReportAviatorTotalPLData = async (payload) => {
  let queryString = "";

  if (payload?.from) {
    queryString += `${queryString ? "&" : "?"}from=${payload?.from}`;
  }

  if (payload?.to) {
    queryString += `${queryString ? "&" : "?"}to=${payload?.to}`;
  }

  if (payload?.timeZone) {
    queryString += `${queryString ? "&" : "?"}timeZone=${payload?.timeZone}`;
  }

  const { data } = await Rest.get(
    `${APIEndpoint.getReportAviatorTotalPL}${queryString}`
  );

  return data;
};

export const getReportSportListData = async (payload) => {
  let queryString = "";

  if (payload?.limit) {
    queryString += `${queryString ? "&" : "?"}limit=${payload?.limit}`;
  }

  if (payload?.page) {
    queryString += `${queryString ? "&" : "?"}page=${payload?.page}`;
  }

  if (payload?.sportName) {
    queryString += `${queryString ? "&" : "?"}sportName=${payload?.sportName}`;
  }

  if (payload?.exEventId) {
    queryString += `${queryString ? "&" : "?"}exEventId=${payload?.exEventId}`;
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

  const { data } = await Rest.get(
    `${APIEndpoint.getReportSportList}${queryString}`
  );

  return data;
};

export const getReportAviatorListData = async (payload) => {
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

  const { data } = await Rest.get(
    `${APIEndpoint.getReportAviatorList}${queryString}`
  );

  return data;
};

export const getReportIntCasinoListData = async (payload) => {
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

  if (payload?.developerCode) {
    queryString += `${queryString ? "&" : "?"}developerCode=${
      payload?.developerCode
    }`;
  }

  const { data } = await Rest.get(
    `${APIEndpoint.getReportIntCasinoList}${queryString}`
  );

  return data;
};

export const getReportUserListData = async (payload) => {
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

  if (payload?.userName) {
    queryString += `${queryString ? "&" : "?"}userName=${payload?.userName}`;
  }

  const { data } = await Rest.get(
    `${APIEndpoint.getReportUserList}${queryString}`
  );

  return data;
};
