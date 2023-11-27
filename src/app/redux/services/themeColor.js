import APIEndpoint from "../config/APIEndpoint";
import Rest from "../config/Rest";

export const getThemeColorData = async () => {
  const { data } = await Rest.get(
    APIEndpoint.getThemeColor,
    {},
    false,
    {},
    true
  );

  return data;
};
