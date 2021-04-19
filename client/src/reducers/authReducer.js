import * as USERCONSTANTS from "../constants/userConstants";

const initialState = {
  isAuth: false,
  user: null, // object -> info
  isLoading: false,
  error: "",
  signUpStatus: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case USERCONSTANTS.USER_LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: "",
        signUpStatus: "",
      };
    case USERCONSTANTS.USER_LOGIN_SUCCESS:
      localStorage.setItem(process.env.REACT_APP_ACCESS_TOKEN, 123456);
      return {
        ...state,
        user: action.payload,
        isAuth: true,
        isLoading: false,
        error: "",
      };
    case USERCONSTANTS.USER_LOGIN_FAIL:
      return {
        ...state,
        isLoading: false,
        error: USERCONSTANTS.USER_LOGIN_FAIL,
      };

    case USERCONSTANTS.USER_REGISTER_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: "",
        signUpStatus: "",
      };
    case USERCONSTANTS.USER_REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: "",
        signUpStatus: USERCONSTANTS.USER_REGISTER_SUCCESS,
      };
    case USERCONSTANTS.USER_REGISTER_FAIL:
      return {
        ...state,
        isLoading: false,
        error: USERCONSTANTS.USER_REGISTER_FAIL,
      };

    case USERCONSTANTS.USER_LOGOUT:
      localStorage.removeItem(process.env.REACT_APP_ACCESS_TOKEN);
      localStorage.removeItem(process.env.REACT_APP_REFRESH_TOKEN);
      return {
        ...state,
        user: null,
        isLoading: false,
        isAuth: false,
      };

    case USERCONSTANTS.USER_INFO_SUCCESS:
      return {
        ...state,
        user: null,
        isLoading: false,
        isAuth: true,
      };

    default:
      return { ...state };
  }
};

export default authReducer;
