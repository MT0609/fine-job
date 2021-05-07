import * as MESSAGECONSTANTS from "../constants/messageConstants";

const initialState = {
  messages: [],
  message: {},
  isLoading: false,
};

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case MESSAGECONSTANTS.MESSAGE_GET_ONE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case MESSAGECONSTANTS.MESSAGE_GET_ONE_SUCCESS:
      return {
        ...state,
        message: action.payload,
        isLoading: false,
      };
    case MESSAGECONSTANTS.MESSAGE_GET_ONE_FAIL:
      return {
        ...state,
        isLoading: false,
      };

    case MESSAGECONSTANTS.MESSAGE_SEND_ONE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case MESSAGECONSTANTS.MESSAGE_SEND_ONE_SUCCESS:
      return {
        ...state,
        message: action.payload,
        isLoading: false,
      };
    case MESSAGECONSTANTS.MESSAGE_SEND_ONE_FAIL:
      return {
        ...state,
        isLoading: false,
      };

    case MESSAGECONSTANTS.MESSAGE_DELETE_ONE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case MESSAGECONSTANTS.MESSAGE_DELETE_ONE_SUCCESS:
      return {
        ...state,
        message: action.payload,
        isLoading: false,
      };
    case MESSAGECONSTANTS.MESSAGE_DELETE_ONE_FAIL:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return {
        ...state,
      };
  }
};

export default messageReducer;
