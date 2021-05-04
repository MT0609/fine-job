import messageApi from "../api/messageApi";
import * as MESSAGECONSTANTS from "../constants/messageConstants";
import jwt_decode from "jwt-decode";

export const getMessage = (receiptID) => async (dispatch) => {
  // params: {title, limit, ...}
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

    const senderID = jwt_decode(token).sub;

    console.log(senderID, receiptID);

    let result = await messageApi.getOne(senderID, receiptID);

    console.log(result);

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

export const sendMessage = (msg, receiptID) => async (dispatch) => {
  // params: {title, limit, ...}
  try {
    dispatch({
      type: MESSAGECONSTANTS.MESSAGE_SEND_ONE_REQUEST,
    });

    const token = localStorage.getItem(process.env.REACT_APP_ACCESS_TOKEN);
    if (!token || !jwt_decode(token)?.sub) {
      dispatch({
        type: MESSAGECONSTANTS.MESSAGE_SEND_ONE_FAIL,
      });
      return;
    }

    const senderID = jwt_decode(token).sub;

    console.log(senderID, receiptID);

    let result = await messageApi.send(senderID, receiptID, msg);

    console.log(result);

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

export const deleteMessage = (msgID, receiptID) => async (dispatch) => {
  // params: {title, limit, ...}
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

    const senderID = jwt_decode(token).sub;

    console.log(senderID, receiptID);

    let result = await messageApi.delete(senderID, receiptID, msgID);

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
