import jobApi from "../api/jobApi";
import * as JOBCONSTANTS from "../constants/jobConstants";
import { getUserData } from "./authActions";
import jwt_decode from "jwt-decode";

export const getJobs =
  (title, page = 1, limit = 10) =>
  async (dispatch) => {
    try {
      dispatch({
        type: JOBCONSTANTS.JOB_GET_ALL_REQUEST,
      });

      if (!title) title = "*";

      // const params = {};
      // if (title) params.q = title;
      // if (limit) params.limit = limit;
      // if (page) params.page = +page;

      let result = await jobApi.get(title, page, limit);
      console.log(result);
      dispatch({
        type: JOBCONSTANTS.JOB_GET_ALL_SUCCESS,
        payload: result,
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

    let myJobs = result.results.filter(
      (job) => job.creator === jwt_decode(token)?.sub
    );
    result.results = myJobs;

    dispatch({
      type: JOBCONSTANTS.JOB_GET_ALL_SUCCESS,
      payload: result,
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

export const saveJob = (id) => async (dispatch) => {
  try {
    let result = await jobApi.save(id);

    if (!result) {
      dispatch({
        type: JOBCONSTANTS.JOB_SAVE_FAIL,
      });

      return JOBCONSTANTS.JOB_SAVE_FAIL;
    } else {
      dispatch({
        type: JOBCONSTANTS.JOB_SAVE_SUCCESS,
      });

      dispatch(getUserData());

      return JOBCONSTANTS.JOB_SAVE_SUCCESS;
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: JOBCONSTANTS.JOB_SAVE_FAIL,
    });

    return JOBCONSTANTS.JOB_SAVE_FAIL;
  }
};

export const unSaveJob = (id) => async (dispatch) => {
  try {
    let result = await jobApi.unSave(id);

    if (!result) {
      dispatch({
        type: JOBCONSTANTS.JOB_UNSAVE_FAIL,
      });

      return JOBCONSTANTS.JOB_UNSAVE_FAIL;
    } else {
      dispatch({
        type: JOBCONSTANTS.JOB_UNSAVE_SUCCESS,
      });

      dispatch(getUserData());

      return JOBCONSTANTS.JOB_UNSAVE_SUCCESS;
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: JOBCONSTANTS.JOB_UNSAVE_FAIL,
    });

    return JOBCONSTANTS.JOB_UNSAVE_FAIL;
  }
};
