import * as JOBCONSTANTS from "../constants/jobConstants";

const initialState = {
  jobs: [],
  job: {},
  isLoading: false,
  searchChange: false,
  postStatus: "",
};

const jobReducer = (state = initialState, action) => {
  switch (action.type) {
    case JOBCONSTANTS.JOB_GET_ALL_REQUEST:
      return {
        ...state,
        isLoading: true,
        job: {},
        searchChange: true,
      };
    case JOBCONSTANTS.JOB_GET_ALL_SUCCESS:
      return {
        ...state,
        jobs: action.payload,
        job: {},
        isLoading: false,
        searchChange: false,
      };

    case JOBCONSTANTS.JOB_GET_ONE_REQUEST:
      return {
        ...state,
        job: {},
        isLoading: true,
      };
    case JOBCONSTANTS.JOB_GET_ONE_SUCCESS:
      return {
        ...state,
        job: action.payload,
        isLoading: false,
      };
    case JOBCONSTANTS.JOB_GET_ONE_FAIL:
      return {
        ...state,
        job: {},
        isLoading: false,
      };

    case JOBCONSTANTS.JOB_POST_REQUEST:
      return {
        ...state,
        isLoading: true,
        postStatus: "",
      };
    case JOBCONSTANTS.JOB_POST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        postStatus: JOBCONSTANTS.JOB_POST_SUCCESS,
      };
    case JOBCONSTANTS.JOB_POST_FAIL:
      return {
        ...state,
        isLoading: false,
        postStatus: JOBCONSTANTS.JOB_POST_FAIL,
      };

    case JOBCONSTANTS.JOB_UPDATE_REQUEST:
      return {
        ...state,
        isLoading: true,
        postStatus: "",
      };
    case JOBCONSTANTS.JOB_UPDATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        postStatus: JOBCONSTANTS.JOB_UPDATE_SUCCESS,
      };
    case JOBCONSTANTS.JOB_UPDATE_FAIL:
      return {
        ...state,
        isLoading: false,
        postStatus: JOBCONSTANTS.JOB_UPDATE_FAIL,
      };

    case JOBCONSTANTS.JOB_DELETE_REQUEST:
      return {
        ...state,
        isLoading: true,
        postStatus: "",
      };
    case JOBCONSTANTS.JOB_DELETE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        postStatus: JOBCONSTANTS.JOB_DELETE_SUCCESS,
      };
    case JOBCONSTANTS.JOB_DELETE_FAIL:
      return {
        ...state,
        isLoading: false,
        postStatus: JOBCONSTANTS.JOB_DELETE_SUCCESS,
      };

    default:
      return { ...state };
  }
};

export default jobReducer;
