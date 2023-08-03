import IPRest from "../config/IPRest";

export const getIPAddress = async () => {
  const { data } = await IPRest.get(
    "https://pro.ip-api.com/json/?key=qSA5ctYZHdWsx04"
  );

  return data;
};
