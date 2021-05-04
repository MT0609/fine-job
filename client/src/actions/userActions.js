import userApi from "../api/userApi";
import * as USERCONSTANTS from "../constants/userConstants";
import jwt_decode from "jwt-decode";

export const getProfileData = (userID) => async (dispatch) => {
  try {
    let result = await userApi.getOne(userID);

    if (!result) {
      dispatch({ type: USERCONSTANTS.USER_INFO_FAIL });
      return;
    }

    dispatch({
      type: USERCONSTANTS.USER_INFO_SUCCESS,
      payload: result,
    });
  } catch (error) {
    dispatch({ type: USERCONSTANTS.USER_INFO_FAIL });
  }
};

export const updateUser = (data) => async (dispatch) => {
  try {
    const token = localStorage.getItem(process.env.REACT_APP_ACCESS_TOKEN);
    const userID = jwt_decode(token)?.sub;

    let result = await userApi.update(userID, data);

    if (!result) {
      dispatch({ type: USERCONSTANTS.USER_INFO_FAIL });
      return;
    }

    dispatch({
      type: USERCONSTANTS.USER_INFO_SUCCESS,
      payload: result,
    });

    return {
      result,
      status: USERCONSTANTS.USER_INFO_SUCCESS,
    };
  } catch (error) {
    dispatch({ type: USERCONSTANTS.USER_INFO_FAIL });
  }
};
