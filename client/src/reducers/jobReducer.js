import * as JOBCONSTANTS from "../constants/jobConstants";

const initialState = {
  jobs: [],
  job: {},
  isLoading: false,
  postStatus: "",
  limit: 2,
  totalPages: 1,
  page: 1,
  saveStatus: "",
  unSaveStatus: "",
};

const jobReducer = (state = initialState, action) => {
  switch (action.type) {
    case JOBCONSTANTS.JOB_GET_ALL_REQUEST:
      return {
        ...state,
        isLoading: true,
        jobs: [],
        job: {},
      };
    case JOBCONSTANTS.JOB_GET_ALL_SUCCESS:
      return {
        ...state,
        jobs: action.payload?.results,
        job: {},
        isLoading: false,
        page: action.payload?.page,
        totalPages: action.payload?.totalPages,
        limit: action.payload?.limit,
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

    case JOBCONSTANTS.JOB_SAVE_SUCCESS:
      return {
        ...state,
        unSaveStatus: "",
        saveStatus: JOBCONSTANTS.JOB_SAVE_SUCCESS,
      };
    case JOBCONSTANTS.JOB_SAVE_FAIL:
      return {
        ...state,
        unSaveStatus: "",
        saveStatus: JOBCONSTANTS.JOB_SAVE_FAIL,
      };

    case JOBCONSTANTS.JOB_UNSAVE_SUCCESS:
      return {
        ...state,
        saveStatus: "",
        unSaveStatus: JOBCONSTANTS.JOB_UNSAVE_SUCCESS,
      };
    case JOBCONSTANTS.JOB_UNSAVE_FAIL:
      return {
        ...state,
        saveStatus: "",
        unSaveStatus: JOBCONSTANTS.JOB_UNSAVE_FAIL,
      };
    default:
      return { ...state };
  }
};

export default jobReducer;
