import * as USERCONSTANTS from "../constants/userConstants";

const initialState = {
  users: [],
  user: null, // object -> info
  isLoading: false,
  connectStatus: "",
  currentPage: 0,
  totalPages: 0,
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

    case USERCONSTANTS.USER_SEARCH_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case USERCONSTANTS.USER_SEARCH_SUCCESS:
      return {
        ...state,
        users: action.payload?.results,
        currentPage: action.payload?.page,
        totalPages: action.payload?.totalPages,
        isLoading: false,
      };
    case USERCONSTANTS.USER_SEARCH_FAIL:
      return {
        ...state,
        users: null,
        currentPage: 0,
        totalPages: 0,
        isLoading: false,
      };

    case USERCONSTANTS.USER_GET_CONNSTATUS_SUCCESS:
      return {
        ...state,
        connectStatus: action.payload?.result,
      };
    case USERCONSTANTS.USER_GET_CONNSTATUS_FAIL:
      return {
        ...state,
        connectStatus: null,
      };

    case USERCONSTANTS.USER_SEND_REQ_SUCCESS:
      return {
        ...state,
      };
    case USERCONSTANTS.USER_SEND_REQ_FAIL:
      return {
        ...state,
      };

    case USERCONSTANTS.USER_DELETE_REQ_SUCCESS:
      return {
        ...state,
      };

    case USERCONSTANTS.USER_DELETE_FRIEND_FAIL:
      return {
        ...state,
      };
    case USERCONSTANTS.USER_DELETE_FRIEND_SUCCESS:
      return {
        ...state,
      };

    default:
      return { ...state };
  }
};

export default userReducer;
