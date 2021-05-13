import * as MESSAGECONSTANTS from "../constants/messageConstants";

const initialState = {
  messages: [],
  message: {},
  activeBubbleMessages: [],
  isMessagesLoading: false,
  isLoading: false,
};

const messageReducer = (state = initialState, action) => {
  let newActiveMessageArray = [];

  switch (action.type) {
    case MESSAGECONSTANTS.MESSAGE_GET_ALL_REQUEST:
      return {
        ...state,
        isMessagesLoading: true,
      };
    case MESSAGECONSTANTS.MESSAGE_GET_ALL_SUCCESS:
      return {
        ...state,
        messages: action.payload,
        isMessagesLoading: false,
      };
    case MESSAGECONSTANTS.MESSAGE_GET_ALL_FAIL:
      return {
        ...state,
        isMessagesLoading: false,
      };

    case MESSAGECONSTANTS.MESSAGE_GET_ONE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case MESSAGECONSTANTS.MESSAGE_GET_ONE_SUCCESS:
      return {
        ...state,
        message: action.payload?.message,
        activeBubbleMessages: action.payload?.activeBubbleMessages,
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
        message: action.payload?.message,
        activeBubbleMessages: action.payload?.activeBubbleMessages,
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
        activeBubbleMessages: action.payload?.activeBubbleMessages,
        message: action.payload?.message,
        isLoading: false,
      };
    case MESSAGECONSTANTS.MESSAGE_DELETE_ONE_FAIL:
      return {
        ...state,
        isLoading: false,
      };

    case MESSAGECONSTANTS.MESSAGE_DELETE_CONVERSATION_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case MESSAGECONSTANTS.MESSAGE_DELETE_CONVERSATION_SUCCESS:
      newActiveMessageArray = [...state.activeBubbleMessages];
      newActiveMessageArray = newActiveMessageArray.filter(
        (item) => item?.id !== action.payload?.id
      );
      return {
        ...state,
        activeBubbleMessages: newActiveMessageArray,
        message: {},
        isLoading: false,
      };
    case MESSAGECONSTANTS.MESSAGE_DELETE_CONVERSATION_FAIL:
      return {
        ...state,
        isLoading: false,
      };

    case MESSAGECONSTANTS.MESSAGE_CLOSE_ACTIVE_BUBBLE:
      return {
        ...state,
        activeBubbleMessages: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
};

export default messageReducer;
