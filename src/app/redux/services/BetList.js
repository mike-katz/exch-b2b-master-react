import APIEndpoint from "../config/APIEndpoint";
import Rest from "../config/Rest";

export const getBetListData = async (payload) => {
  let queryParams = "";

  if (payload?.page) {
    queryParams += `?page=${payload?.page}`;
  }

  if (payload?.limit) {
    queryParams += `${queryParams ? "&" : "?"}limit=${payload?.limit}`;
  }

  if (payload?.sportName) {
    queryParams += `${queryParams ? "&" : "?"}sportName=${payload?.sportName}`;
  }

  if (payload?.status) {
    queryParams += `${queryParams ? "&" : "?"}status=${payload?.status}`;
  }

  if (payload?.marketType) {
    queryParams += `${queryParams ? "&" : "?"}marketType=${
      payload?.marketType
    }`;
  }

  if (payload?.from) {
    queryParams += `${queryParams ? "&" : "?"}from=${payload?.from}`;
  }

  if (payload?.to) {
    queryParams += `${queryParams ? "&" : "?"}to=${payload?.to}`;
  }

  const { data } = await Rest.get(`${APIEndpoint.getBetList}${queryParams}`);

  return data;
};
