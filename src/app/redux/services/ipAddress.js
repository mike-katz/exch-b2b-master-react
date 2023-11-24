import IPRest from "../config/IPRest";

export const getIPAddress = async () => {
  const { data } = await IPRest.get(
    "https://pro.ip-api.com/json/?key=o0ysOZMA2fdBrMT"
  );

  return data;
};
