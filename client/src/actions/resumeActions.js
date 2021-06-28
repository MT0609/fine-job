import resumeApi from "../api/resumeApi";
import * as RESUMECONSTANTS from "../constants/resumeConstants";

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

export const downloadResume = (data) => async (dispatch) => {
  try {
    dispatch({
      type: RESUMECONSTANTS.RESUME_DOWNLOAD_ONE_REQUEST,
    });

    const result = await resumeApi.download(data);
    if (result) {
      const url = window.URL.createObjectURL(new Blob([result]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${data.title}.pdf`); //or any other extension
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);

      dispatch({
        type: RESUMECONSTANTS.RESUME_DOWNLOAD_ONE_DONE,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: RESUMECONSTANTS.RESUME_DOWNLOAD_ONE_DONE,
    });
  }
};

export const deleteResume =
  (cvId, body = {}) =>
  async (dispatch) => {
    // body: {education, ...}
    try {
      let result = await resumeApi.delete(cvId, body);

      if (!result) {
        return {};
      }

      if (Object.keys(body).length > 0) dispatch(getResume(cvId));
      else dispatch(getAllResume());
      return {
        result: {},
      };
    } catch (error) {
      return {};
    }
  };
