import {
  LOGIN_END,
  LOGIN_MODAL_VISIBLE_END,
  LOGIN_MODAL_VISIBLE_START,
  LOGOUT_USER,
  SIGNUP_MODAL_VISIBLE_END,
  SIGNUP_MODAL_VISIBLE_START,
} from "../actions/persistAction";

const initialState = {
  isLoggedIn: true,
  userData: null,
  loginModalVisibleState: false,
  signupModalVisibleState: false,
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
        },
      };

    case LOGOUT_USER:
      return { ...initialState };

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
