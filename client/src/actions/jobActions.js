import jobApi from "../api/jobApi";
import * as JOBCONSTANTS from "../constants/jobConstants";
import jwt_decode from "jwt-decode";

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

export const getMyPostingJobs = (title) => async (dispatch) => {
  // params: {title, limit, ...}
  try {
    dispatch({
      type: JOBCONSTANTS.JOB_GET_ALL_REQUEST,
    });

    const params = {};
    if (title) params.title = title;

    let result = await jobApi.getAll(params);

    const token = localStorage.getItem(process.env.REACT_APP_ACCESS_TOKEN);

    let myJobs = result.results;
    myJobs = myJobs.filter((job) => job.creator === jwt_decode(token)?.sub);

    dispatch({
      type: JOBCONSTANTS.JOB_GET_ALL_SUCCESS,
      payload: myJobs,
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

export const postJob = (data) => async (dispatch) => {
  // params: {title, limit, ...}
  try {
    dispatch({
      type: JOBCONSTANTS.JOB_POST_REQUEST,
    });

    let result = await jobApi.post(data);

    console.log(result);

    if (!result) {
      dispatch({
        type: JOBCONSTANTS.JOB_POST_FAIL,
      });
      return {
        status: JOBCONSTANTS.JOB_POST_FAIL,
      };
    }

    dispatch({
      type: JOBCONSTANTS.JOB_POST_SUCCESS,
    });

    return {
      result,
      status: JOBCONSTANTS.JOB_POST_SUCCESS,
    };
  } catch (error) {
    console.log(error);
    dispatch({
      type: JOBCONSTANTS.JOB_POST_FAIL,
    });

    return {
      status: JOBCONSTANTS.JOB_POST_FAIL,
    };
  }
};

export const updateJob = (id, data) => async (dispatch) => {
  // params: {title, limit, ...}
  try {
    dispatch({
      type: JOBCONSTANTS.JOB_UPDATE_REQUEST,
    });

    let result = await jobApi.update(id, data);

    if (!result) {
      dispatch({
        type: JOBCONSTANTS.JOB_UPDATE_FAIL,
      });

      return {
        status: JOBCONSTANTS.JOB_UPDATE_FAIL,
      };
    }

    dispatch({
      type: JOBCONSTANTS.JOB_UPDATE_SUCCESS,
    });

    return {
      result,
      status: JOBCONSTANTS.JOB_UPDATE_SUCCESS,
    };
  } catch (error) {
    console.log(error);
    dispatch({
      type: JOBCONSTANTS.JOB_UPDATE_FAIL,
    });

    return {
      status: JOBCONSTANTS.JOB_UPDATE_FAIL,
    };
  }
};

export const deleteJob = (id) => async (dispatch) => {
  // params: {title, limit, ...}
  try {
    dispatch({
      type: JOBCONSTANTS.JOB_DELETE_REQUEST,
    });

    let result = await jobApi.delete(id);

    console.log(result);

    if (!result) {
      dispatch({
        type: JOBCONSTANTS.JOB_DELETE_FAIL,
      });

      return {
        status: JOBCONSTANTS.JOB_DELETE_FAIL,
      };
    }

    dispatch({
      type: JOBCONSTANTS.JOB_DELETE_SUCCESS,
    });

    return {
      result,
      status: JOBCONSTANTS.JOB_DELETE_SUCCESS,
    };
  } catch (error) {
    console.log(error);
    dispatch({
      type: JOBCONSTANTS.JOB_DELETE_FAIL,
    });

    return {
      status: JOBCONSTANTS.JOB_DELETE_FAIL,
    };
  }
};
