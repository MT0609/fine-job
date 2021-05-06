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
  let index;

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
      newActiveMessageArray = [...state.activeBubbleMessages];
      index = newActiveMessageArray.findIndex(
        (item) => item?.id === action.payload?.id
      );
      if (index === -1) newActiveMessageArray.unshift(action.payload);
      else newActiveMessageArray[index] = action.payload;
      if (newActiveMessageArray.length > 2) newActiveMessageArray.pop();
      return {
        ...state,
        activeBubbleMessages: newActiveMessageArray,
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
      newActiveMessageArray = [...state.activeBubbleMessages];
      index = newActiveMessageArray.findIndex(
        (item) => item?.id === action.payload?.id
      );
      if (index === -1) newActiveMessageArray.push(action.payload);
      else newActiveMessageArray[index] = action.payload;
      return {
        ...state,
        activeBubbleMessages: newActiveMessageArray,
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
      newActiveMessageArray = [...state.activeBubbleMessages];
      index = newActiveMessageArray.findIndex(
        (item) => item?.id === action.payload?.id
      );
      if (index === -1) newActiveMessageArray.push(action.payload);
      else newActiveMessageArray[index] = action.payload;
      return {
        ...state,
        activeBubbleMessages: newActiveMessageArray,
        message: action.payload,
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
        message: action.payload,
        isLoading: false,
      };
    case MESSAGECONSTANTS.MESSAGE_DELETE_CONVERSATION_FAIL:
      return {
        ...state,
        isLoading: false,
      };

    case MESSAGECONSTANTS.MESSAGE_CLOSE_ACTIVE_BUBBLE:
      newActiveMessageArray = [...state.activeBubbleMessages];
      newActiveMessageArray = newActiveMessageArray.filter(
        (item) => item?.id !== action.payload
      );
      return {
        ...state,
        activeBubbleMessages: newActiveMessageArray,
      };

    default:
      return {
        ...state,
      };
  }
};

export default messageReducer;
