import * as AUTHCONSTANTS from "../constants/authConstants";

const initialState = {
  isAuth: false,
  user: null, // object -> info
  isLoading: false,
  error: "",
  signUpStatus: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTHCONSTANTS.USER_LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: "",
        signUpStatus: "",
      };
    case AUTHCONSTANTS.USER_LOGIN_SUCCESS:
      const user = action.payload.user;
      const token = action.payload.tokens.access.token;
      const refreshToken = action.payload.tokens.refresh.token;
      localStorage.setItem(process.env.REACT_APP_ACCESS_TOKEN, token);
      localStorage.setItem(process.env.REACT_APP_REFRESH_TOKEN, refreshToken);

      return {
        ...state,
        user,
        isAuth: true,
        isLoading: false,
        error: "",
      };
    case AUTHCONSTANTS.USER_LOGIN_FAIL:
      return {
        ...state,
        isAuth: false,
        isLoading: false,
        error: AUTHCONSTANTS.USER_LOGIN_FAIL,
      };

    case AUTHCONSTANTS.USER_REGISTER_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: "",
        signUpStatus: "",
      };
    case AUTHCONSTANTS.USER_REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: "",
        signUpStatus: AUTHCONSTANTS.USER_REGISTER_SUCCESS,
      };
    case AUTHCONSTANTS.USER_REGISTER_FAIL:
      return {
        ...state,
        isLoading: false,
        error: AUTHCONSTANTS.USER_REGISTER_FAIL,
      };

    case AUTHCONSTANTS.USER_LOGOUT:
      localStorage.removeItem(process.env.REACT_APP_ACCESS_TOKEN);
      localStorage.removeItem(process.env.REACT_APP_REFRESH_TOKEN);
      return {
        ...state,
        user: null,
        isLoading: false,
        isAuth: false,
      };

    case AUTHCONSTANTS.USER_INFO_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case AUTHCONSTANTS.USER_INFO_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        isAuth: true,
      };
    case AUTHCONSTANTS.USER_INFO_FAIL:
      return {
        ...state,
        user: null,
        isLoading: false,
        isAuth: false,
      };

    default:
      return { ...state };
  }
};

export default authReducer;
