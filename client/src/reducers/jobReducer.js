import * as JOBCONSTANTS from "../constants/jobConstants";

const initialState = {
  jobs: [],
  job: {},
  isLoading: false,
  searchChange: false,
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
    default:
      return { ...state };
  }
};

export default jobReducer;
