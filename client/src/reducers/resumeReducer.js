import * as RESUMECONSTANTS from "../constants/resumeConstants";

const initialState = {
  cvs: [],
  cv: {},
  isLoading: false,
};

const resumeReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESUMECONSTANTS.RESUME_GET_ALL_REQUEST:
      return {
        ...state,
        initialState,
        isLoading: true,
      };
    case RESUMECONSTANTS.RESUME_GET_ALL_SUCCESS:
      return {
        ...state,
        cvs: action.payload,
        cv: {},
        isLoading: false,
      };
    case RESUMECONSTANTS.RESUME_GET_ALL_FAIL:
      return {
        ...state,
        initialState,
      };

    case RESUMECONSTANTS.RESUME_GET_ONE_REQUEST:
      return {
        ...state,
        cv: {},
        isLoading: true,
      };
    case RESUMECONSTANTS.RESUME_GET_ONE_SUCCESS:
      return {
        ...state,
        cv: action.payload,
        isLoading: false,
      };
    case RESUMECONSTANTS.RESUME_GET_ONE_FAIL:
      return {
        ...state,
        initialState,
      };

    case RESUMECONSTANTS.RESUME_CREATE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case RESUMECONSTANTS.RESUME_CREATE_SUCCESS:
      return {
        ...state,
        initialState,
      };
    case RESUMECONSTANTS.RESUME_CREATE_FAIL:
      return {
        ...state,
        initialState,
      };

    case RESUMECONSTANTS.RESUME_UPDATE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case RESUMECONSTANTS.RESUME_UPDATE_SUCCESS:
      return {
        ...state,
        cv: action.payload,
        isLoading: false,
      };
    case RESUMECONSTANTS.RESUME_UPDATE_FAIL:
      return {
        ...state,
      };
    default:
      return { ...state };
  }
};

export default resumeReducer;
