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

export const sendConnReq = (receiverID) => async (dispatch, getState) => {
  try {
    const senderID = getState().auth?.user?.id;

    const urlBody = {
      senderUrl: `${window.location.protocol}//${window.location.host}/profile/${senderID}`,
      receiverUrl: window.location.href,
    };

    let result = await userApi.sendConnReq(receiverID, urlBody);

    if (!result) {
      dispatch({ type: USERCONSTANTS.USER_SEND_REQ_FAIL });
      return;
    }

    dispatch({
      type: USERCONSTANTS.USER_SEND_REQ_SUCCESS,
      payload: result,
    });

    dispatch(getProfileData(receiverID));
  } catch (error) {
    dispatch({ type: USERCONSTANTS.USER_SEND_REQ_FAIL });
  }
};

export const acceptConnReq = (receiverID) => async (dispatch, getState) => {
  try {
    const notificationID = getState().auth.user?.notifications[0]._id;

    let result = await userApi.acceptConnReq(receiverID, notificationID);

    if (!result) {
      dispatch({ type: USERCONSTANTS.USER_ACCEPT_FAIL });
      return;
    }

    dispatch({
      type: USERCONSTANTS.USER_ACCEPT_SUCCESS,
      payload: result,
    });

    dispatch(getProfileData(receiverID));
  } catch (error) {
    dispatch({ type: USERCONSTANTS.USER_ACCEPT_FAIL });
  }
};

export const deleteConnReq = (receiverID) => async (dispatch, getState) => {
  try {
    const notifications = getState().auth.user?.notifications;

    const notification = notifications.find(
      (noti) =>
        noti.type === "sendConnReq" && noti.info.sender.id === receiverID
    );

    let result = await userApi.deleteConnReq(receiverID, notification?._id);

    if (!result) {
      dispatch({ type: USERCONSTANTS.USER_DELETE_REQ_FAIL });
      return;
    }

    dispatch({
      type: USERCONSTANTS.USER_DELETE_REQ_SUCCESS,
      payload: result,
    });

    dispatch(getProfileData(receiverID));
  } catch (error) {
    dispatch({ type: USERCONSTANTS.USER_DELETE_REQ_FAIL });
  }
};

export const deleteFriend = (receiverID) => async (dispatch) => {
  try {
    let result = await userApi.deleteFriend(receiverID);

    if (!result) {
      dispatch({ type: USERCONSTANTS.USER_DELETE_FRIEND_FAIL });
      return;
    }

    dispatch({
      type: USERCONSTANTS.USER_DELETE_FRIEND_SUCCESS,
      payload: result,
    });

    dispatch(getProfileData(receiverID));
  } catch (error) {
    dispatch({ type: USERCONSTANTS.USER_DELETE_FRIEND_FAIL });
  }
};
