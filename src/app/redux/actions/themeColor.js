export const GET_THEME_COLOR_REQUEST = "GET_THEME_COLOR_REQUEST";
export const GET_THEME_COLOR_RESPONSE = "GET_THEME_COLOR_RESPONSE";

export const getThemeColor = (payload) => ({
  type: GET_THEME_COLOR_REQUEST,
  payload,
});
