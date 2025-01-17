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

export const searchUsers =
  (q, page = 1, limit = 10) =>
  async (dispatch) => {
    try {
      dispatch({ type: USERCONSTANTS.USER_SEARCH_REQUEST });

      if (!q) q = "";
      let result = await userApi.search(q, limit, page);

      if (!result) {
        dispatch({ type: USERCONSTANTS.USER_SEARCH_FAIL });
        return;
      }

      dispatch({
        type: USERCONSTANTS.USER_SEARCH_SUCCESS,
        payload: result,
      });
    } catch (error) {
      dispatch({ type: USERCONSTANTS.USER_SEARCH_FAIL });
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

export const modifyEducation = (data) => async (dispatch) => {
  try {
    const token = localStorage.getItem(process.env.REACT_APP_ACCESS_TOKEN);
    const userID = jwt_decode(token)?.sub;

    let result = await userApi.modifyEducation(userID, data);

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

export const deleteEducation = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem(process.env.REACT_APP_ACCESS_TOKEN);
    const userID = jwt_decode(token)?.sub;

    let result = await userApi.deleteEducation(userID, id);

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

export const modifyAccomplishment = (data) => async (dispatch) => {
  try {
    const token = localStorage.getItem(process.env.REACT_APP_ACCESS_TOKEN);
    const userID = jwt_decode(token)?.sub;

    let result = await userApi.modifyAccomplishment(userID, data);

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

export const deleteAccomplishment = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem(process.env.REACT_APP_ACCESS_TOKEN);
    const userID = jwt_decode(token)?.sub;

    let result = await userApi.deleteAccomplishment(userID, id);

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

export const getConnectionStatus = (userID) => async (dispatch) => {
  try {
    let result = await userApi.getConnStatus(userID);

    if (!result) {
      dispatch({ type: USERCONSTANTS.USER_GET_CONNSTATUS_FAIL });
      return;
    }

    dispatch({
      type: USERCONSTANTS.USER_GET_CONNSTATUS_SUCCESS,
      payload: result,
    });

    return result;
  } catch (error) {
    dispatch({ type: USERCONSTANTS.USER_GET_CONNSTATUS_FAIL });
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

    const result2 = await dispatch(getConnectionStatus(receiverID));
    return result2;
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

    const result2 = await dispatch(getConnectionStatus(receiverID));
    return result2;
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

    const result2 = await dispatch(getConnectionStatus(receiverID));
    return result2;
  } catch (error) {
    dispatch({ type: USERCONSTANTS.USER_DELETE_REQ_FAIL });
  }
};

export const deleteFriend = (receiverID) => async (dispatch) => {
  try {
    const result = await userApi.deleteFriend(receiverID);

    if (!result) {
      dispatch({ type: USERCONSTANTS.USER_DELETE_FRIEND_FAIL });
      return;
    }

    dispatch({
      type: USERCONSTANTS.USER_DELETE_FRIEND_SUCCESS,
      payload: result,
    });

    const result2 = await dispatch(getConnectionStatus(receiverID));
    return result2;
  } catch (error) {
    dispatch({ type: USERCONSTANTS.USER_DELETE_FRIEND_FAIL });
  }
};
