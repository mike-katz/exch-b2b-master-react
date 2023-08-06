import {
  LOGIN_END,
  LOGIN_MODAL_VISIBLE_END,
  LOGIN_MODAL_VISIBLE_START,
  LOGOUT_USER,
  SIGNUP_MODAL_VISIBLE_END,
  SIGNUP_MODAL_VISIBLE_START,
} from "../actions/persistAction";

const initialState = {
  isLoggedIn: false,
  userData: null,
  loginModalVisibleState: false,
  signupModalVisibleState: false,
  themeColor: {
    bottomImageContainerBg: "#6D081D",
    faviconUrl:
      "https://exch-s3-react-dev-002.s3.ap-southeast-1.amazonaws.com/Logo/CBTF-logo.png",
    logoUrl:
      "https://exch-s3-react-dev-002.s3.ap-southeast-1.amazonaws.com/Logo/CBTF-logo.png",
    commonActiveColor: "#C10930",
    commonBgColor: "#343435",
    commonHeighLightColor: "#6D081D",
    commonTextColor: "#FFFFFF",
    loginSignupBg: "#005098",
    loginSignupText: "#FFFFFF",
    topHeaderBgColor: "#292525",
    topHeaderTextColor: "#FFFFFF",
  },
};

export default (state = initialState, action) => {
  switch (action?.type) {
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

    default:
      return state;
  }
};
