import messageApi from "../api/messageApi";
import * as MESSAGECONSTANTS from "../constants/messageConstants";
import jwt_decode from "jwt-decode";

export const getAllMessages = () => async (dispatch) => {
  try {
    dispatch({
      type: MESSAGECONSTANTS.MESSAGE_GET_ALL_REQUEST,
    });

    const token = localStorage.getItem(process.env.REACT_APP_ACCESS_TOKEN);
    if (!token || !jwt_decode(token)?.sub) {
      dispatch({
        type: MESSAGECONSTANTS.MESSAGE_GET_ALL_FAIL,
      });
      return;
    }

    let result = await messageApi.getAll();

    dispatch({
      type: MESSAGECONSTANTS.MESSAGE_GET_ALL_SUCCESS,
      payload: result,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: MESSAGECONSTANTS.MESSAGE_GET_ALL_FAIL,
    });
  }
};

export const getMessage = (partnerID) => async (dispatch) => {
  try {
    dispatch({
      type: MESSAGECONSTANTS.MESSAGE_GET_ONE_REQUEST,
    });

    const token = localStorage.getItem(process.env.REACT_APP_ACCESS_TOKEN);
    if (!token || !jwt_decode(token)?.sub) {
      dispatch({
        type: MESSAGECONSTANTS.MESSAGE_GET_ONE_FAIL,
      });
      return;
    }

    let result = await messageApi.getOne(partnerID);

    dispatch({
      type: MESSAGECONSTANTS.MESSAGE_GET_ONE_SUCCESS,
      payload: result,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: MESSAGECONSTANTS.MESSAGE_GET_ONE_FAIL,
    });
  }
};

export const sendMessage = (partnerID, message) => async (dispatch) => {
  try {
    dispatch({
      type: MESSAGECONSTANTS.MESSAGE_SEND_ONE_REQUEST,
    });

    let result = await messageApi.send(partnerID, message);

    dispatch({
      type: MESSAGECONSTANTS.MESSAGE_SEND_ONE_SUCCESS,
      payload: result,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: MESSAGECONSTANTS.MESSAGE_SEND_ONE_FAIL,
    });
  }
};

export const deleteMessage = (partnerID, msgID) => async (dispatch) => {
  try {
    dispatch({
      type: MESSAGECONSTANTS.MESSAGE_DELETE_ONE_REQUEST,
    });

    const token = localStorage.getItem(process.env.REACT_APP_ACCESS_TOKEN);
    if (!token || !jwt_decode(token)?.sub) {
      dispatch({
        type: MESSAGECONSTANTS.MESSAGE_DELETE_ONE_FAIL,
      });
      return;
    }

    let result = await messageApi.delete(partnerID, msgID);

    dispatch({
      type: MESSAGECONSTANTS.MESSAGE_DELETE_ONE_SUCCESS,
      payload: result,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: MESSAGECONSTANTS.MESSAGE_DELETE_ONE_FAIL,
    });
  }
};

export const deleteConversation = (partnerID) => async (dispatch) => {
  try {
    dispatch({
      type: MESSAGECONSTANTS.MESSAGE_DELETE_CONVERSATION_REQUEST,
    });

    let result = await messageApi.deleteConversation(partnerID);

    console.log(result);

    dispatch({
      type: MESSAGECONSTANTS.MESSAGE_DELETE_CONVERSATION_SUCCESS,
      payload: result,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: MESSAGECONSTANTS.MESSAGE_DELETE_CONVERSATION_FAIL,
    });
  }
};

export const closeActiveBubbleMessage = (msgID) => (dispatch) => {
  dispatch({
    type: MESSAGECONSTANTS.MESSAGE_CLOSE_ACTIVE_BUBBLE,
    payload: msgID,
  });
};
