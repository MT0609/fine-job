import * as USERCONSTANTS from "../constants/userConstants";

const initialState = {
  user: null, // object -> info
  isLoading: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USERCONSTANTS.USER_INFO_REQUEST:
      return {
        ...state,
        user: null,
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

    default:
      return { ...state };
  }
};

export default userReducer;
