import authApi from "../api/authApi";
import * as USERCONSTANTS from "../constants/userConstants";

export const signIn = (data) => async (dispatch) => {
  try {
    dispatch({
      type: USERCONSTANTS.USER_LOGIN_REQUEST,
    });

    let result = await authApi.signIn(data);

    dispatch({
      type: USERCONSTANTS.USER_LOGIN_SUCCESS,
      payload: result.user,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: USERCONSTANTS.USER_LOGIN_FAIL,
    });
  }
};

export const signUp = (data) => async (dispatch) => {
  console.log(data);
  try {
    dispatch({
      type: USERCONSTANTS.USER_REGISTER_REQUEST,
    });

    let result = await authApi.signUp(data);
    console.log(result);
    dispatch({
      type: USERCONSTANTS.USER_REGISTER_SUCCESS,
      payload: result.user,
    });
  } catch (error) {
    console.log("err", error);
    dispatch({
      type: USERCONSTANTS.USER_REGISTER_FAIL,
    });
  }
};

export const signOut = () => {
  return {
    type: USERCONSTANTS.USER_LOGOUT,
  };
};

export const getUserData = () => async (dispatch) => {
  try {
    // call api

    if (localStorage.getItem("token"))
      dispatch({
        type: USERCONSTANTS.USER_INFO_SUCCESS,
        // payload: data,
      });
    else dispatch({ type: USERCONSTANTS.USER_INFO_FAIL });
  } catch (error) {
    dispatch({ type: USERCONSTANTS.USER_INFO_FAIL });
  }
};
