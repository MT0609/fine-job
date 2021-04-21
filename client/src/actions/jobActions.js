import jobApi from "../api/jobApi";
import * as JOBCONSTANTS from "../constants/jobConstants";

export const getJobs = (title) => async (dispatch) => {
  // params: {title, limit, ...}
  try {
    dispatch({
      type: JOBCONSTANTS.JOB_GET_ALL_REQUEST,
    });

    const params = {};
    if (title) params.title = title;

    let result = await jobApi.getAll(params);

    dispatch({
      type: JOBCONSTANTS.JOB_GET_ALL_SUCCESS,
      payload: result.results,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: JOBCONSTANTS.JOB_GET_ALL_FAIL,
    });
  }
};

export const getJobDetail = (id) => async (dispatch) => {
  // params: {title, limit, ...}
  try {
    dispatch({
      type: JOBCONSTANTS.JOB_GET_ONE_REQUEST,
    });

    let result = await jobApi.getOne(id);

    dispatch({
      type: JOBCONSTANTS.JOB_GET_ONE_SUCCESS,
      payload: result,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: JOBCONSTANTS.JOB_GET_ONE_FAIL,
    });
  }
};
