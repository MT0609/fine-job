import resumeApi from "../api/resumeApi";
import * as RESUMECONSTANTS from "../constants/resumeConstants";
import jwt_decode from "jwt-decode";

export const getAllResume = () => async (dispatch) => {
  // params: {title, limit, ...}
  try {
    dispatch({
      type: RESUMECONSTANTS.RESUME_GET_ALL_REQUEST,
    });

    let result = await resumeApi.getAll();

    dispatch({
      type: RESUMECONSTANTS.RESUME_GET_ALL_SUCCESS,
      payload: result,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: RESUMECONSTANTS.RESUME_GET_ALL_FAIL,
    });
  }
};

export const getResume = (cvId) => async (dispatch) => {
  // params: {title, limit, ...}
  try {
    dispatch({
      type: RESUMECONSTANTS.RESUME_GET_ONE_REQUEST,
    });

    const result = await resumeApi.getOne(cvId);

    dispatch({
      type: RESUMECONSTANTS.RESUME_GET_ONE_SUCCESS,
      payload: result,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: RESUMECONSTANTS.RESUME_GET_ONE_FAIL,
    });
  }
};

export const createResume = (data) => async (dispatch) => {
  // data: {title: "...""}
  try {
    dispatch({
      type: RESUMECONSTANTS.RESUME_CREATE_REQUEST,
    });

    let result = await resumeApi.create(data);

    if (!result) {
      dispatch({
        type: RESUMECONSTANTS.RESUME_CREATE_FAIL,
      });
      return;
    }

    dispatch({
      type: RESUMECONSTANTS.RESUME_CREATE_SUCCESS,
      payload: result,
    });

    return {
      result,
      status: RESUMECONSTANTS.RESUME_CREATE_SUCCESS,
    };
  } catch (error) {
    console.log(error);
    dispatch({
      type: RESUMECONSTANTS.RESUME_CREATE_FAIL,
    });
  }
};

export const updateResume = (cvId, data) => async (dispatch) => {
  // data: {title: "...""}
  try {
    dispatch({
      type: RESUMECONSTANTS.RESUME_UPDATE_REQUEST,
    });

    let result = await resumeApi.update(cvId, data);

    if (!result) {
      dispatch({
        type: RESUMECONSTANTS.RESUME_UPDATE_REQUEST,
      });
      return;
    }

    dispatch({
      type: RESUMECONSTANTS.RESUME_UPDATE_SUCCESS,
      payload: result,
    });

    return {
      result,
      status: RESUMECONSTANTS.RESUME_UPDATE_SUCCESS,
    };
  } catch (error) {
    console.log(error);
    dispatch({
      type: RESUMECONSTANTS.RESUME_UPDATE_FAIL,
    });
  }
};
