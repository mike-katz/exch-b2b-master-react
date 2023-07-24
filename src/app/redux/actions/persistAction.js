export const DETAIL_START = "DETAIL_START";
export const LOGIN_START = "LOGIN_START";
export const LOGIN_END = "LOGIN_END";
export const LOGOUT_USER = "LOGOUT_USER";
export const LOGIN_MODAL_VISIBLE_START = "LOGIN_MODAL_VISIBLE_START";
export const LOGIN_MODAL_VISIBLE_END = "LOGIN_MODAL_VISIBLE_END";
export const SIGNUP_MODAL_VISIBLE_START = "SIGNUP_MODAL_VISIBLE_START";
export const SIGNUP_MODAL_VISIBLE_END = "SIGNUP_MODAL_VISIBLE_END";

export const detailStart = (payload, callback) => ({
  type: DETAIL_START,
  payload,
  callback,
});

export const loginStart = (payload, callback, successCallback) => ({
  type: LOGIN_START,
  payload,
  callback,
  successCallback,
});

export const loginEnd = (data) => ({
  type: LOGIN_END,
  data,
});

export const logoutUser = () => ({
  type: LOGOUT_USER,
});

export const loginModalVisible = () => ({
  type: LOGIN_MODAL_VISIBLE_START,
});

export const loginModalHide = () => ({
  type: LOGIN_MODAL_VISIBLE_END,
});

export const signupModalVisible = () => ({
  type: SIGNUP_MODAL_VISIBLE_START,
});

export const signupModalHide = () => ({
  type: SIGNUP_MODAL_VISIBLE_END,
});
