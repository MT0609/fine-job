import * as USERCONSTANTS from "../constants/userConstants";

const initialState = {
  user: null, // object -> info
  isLoading: false,
  connectStatus: "",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USERCONSTANTS.USER_INFO_REQUEST:
      return {
        ...state,
        // user: null,
        isLoading: true,
      };
    case USERCONSTANTS.USER_INFO_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isLoading: false,
      };
    case USERCONSTANTS.USER_INFO_FAIL:
      return {
        ...state,
        initialState,
      };

    case USERCONSTANTS.USER_SEND_REQ_SUCCESS:
      return {
        ...state,
        connectStatus: USERCONSTANTS.USER_SEND_REQ_SUCCESS,
      };
    case USERCONSTANTS.USER_SEND_REQ_FAIL:
      return {
        ...state,
        connectStatus: USERCONSTANTS.USER_SEND_REQ_FAIL,
      };

    case USERCONSTANTS.USER_DELETE_REQ_SUCCESS:
      return {
        ...state,
        connectStatus: USERCONSTANTS.USER_DELETE_REQ_SUCCESS,
      };

    case USERCONSTANTS.USER_DELETE_FRIEND_FAIL:
      return {
        ...state,
        connectStatus: USERCONSTANTS.USER_DELETE_FRIEND_FAIL,
      };
    case USERCONSTANTS.USER_DELETE_FRIEND_SUCCESS:
      return {
        ...state,
        connectStatus: USERCONSTANTS.USER_DELETE_FRIEND_SUCCESS,
      };

    default:
      return { ...state };
  }
};

export default userReducer;
