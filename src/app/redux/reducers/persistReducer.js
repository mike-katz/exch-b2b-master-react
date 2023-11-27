import {
  LOGIN_END,
  LOGIN_MODAL_VISIBLE_END,
  LOGIN_MODAL_VISIBLE_START,
  LOGOUT_USER,
  SIGNUP_MODAL_VISIBLE_END,
  SIGNUP_MODAL_VISIBLE_START,
  UPDATE_BALANCE_START,
} from "../actions/persistAction";
import { GET_THEME_COLOR_RESPONSE } from "../actions/themeColor";

const initialState = {
  isLoggedIn: false,
  userData: null,
  themeColor: {
    faviconUrl:
      "https://bx-s3-dev-001.s3.ap-southeast-1.amazonaws.com/theme-logo/1700899864608.png",
    logoUrl:
      "https://bx-s3-dev-001.s3.ap-southeast-1.amazonaws.com/Logo/CBTF-logo.png",
    headerBgColor: "linear-gradient(rgb(53, 53, 53), rgb(17, 17, 17))",
    headerTextColor: "#ecad17",
    menuBgColor:
      "linear-gradient(rgb(255, 204, 46) 0%, rgb(255, 189, 20) 100%)",
    subMenuBgColor: "#ffbd14",
    subMenuTextColor: "#000000",
    subHoverBgColor: "rgba(255,255,255,.2)",
    menuTextColor: "#000000",
    activeMenuBgColor: "#ffdc7a",
    activeMenuTextColor: "#000000",
  },
};

export default (state = initialState, action) => {
  switch (action?.type) {
    case GET_THEME_COLOR_RESPONSE:
      console.log({ action });
      return {
        ...state,
        themeColor: action?.data || {},
      };

    case LOGIN_END:
      return {
        ...state,
        isLoggedIn: true,
        token: action.data?.accessToken,
        userData: {
          username: action.data?.username,
          mobile: action.data?.mobile,
          balance: action.data?.balance,
          roles: action.data?.roles,
          status: action.data?.status,
          commission: action.data?.commission,
        },
      };

    case LOGOUT_USER:
      return { ...state, isLoggedIn: false, token: false, userData: null };

    case LOGIN_MODAL_VISIBLE_START:
      return { ...state, loginModalVisibleState: true };

    case LOGIN_MODAL_VISIBLE_END:
      return { ...state, loginModalVisibleState: false };

    case SIGNUP_MODAL_VISIBLE_START:
      return { ...state, signupModalVisibleState: true };

    case SIGNUP_MODAL_VISIBLE_END:
      return { ...state, signupModalVisibleState: false };

    case UPDATE_BALANCE_START:
      return {
        ...state,
        userData: {
          ...state?.userData,
          balance: action.data?.balance,
        },
      };

    default:
      return state;
  }
};
