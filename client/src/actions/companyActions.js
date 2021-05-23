import companyApi from "../api/companyApi";
import * as COMPANYCONSTANTS from "../constants/companyConstants";

export const getCompanies =
  (name, page = 1, limit = 10) =>
  async (dispatch) => {
    try {
      dispatch({
        type: COMPANYCONSTANTS.COMPANY_GET_ALL_REQUEST,
      });

      const params = {};
      params.q = name || "*";
      if (page) params.page = page;
      if (limit) params.limit = limit;

      let result = await companyApi.getAll(params);

      dispatch({
        type: COMPANYCONSTANTS.C0MPANY_GET_ALL_SUCCESS,
        payload: result,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: COMPANYCONSTANTS.COMPANY_GET_ALL_FAIL,
      });
    }
  };

export const getCompanyDetail = (id) => async (dispatch) => {
  // params: {title, limit, ...}
  try {
    dispatch({
      type: COMPANYCONSTANTS.COMPANY_GET_ONE_REQUEST,
    });

    let result = await companyApi.getOne(id);

    dispatch({
      type: COMPANYCONSTANTS.C0MPANY_GET_ONE_SUCCESS,
      payload: result,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: COMPANYCONSTANTS.COMPANY_GET_ONE_FAIL,
    });
  }
};

export const followCompany = (companyID) => async (dispatch) => {
  try {
    let result = await companyApi.follow(companyID);
    if (result) {
      dispatch({
        type: COMPANYCONSTANTS.C0MPANY_FOLLOW_ONE_SUCCESS,
      });
      return COMPANYCONSTANTS.C0MPANY_FOLLOW_ONE_SUCCESS;
    } else {
      dispatch({
        type: COMPANYCONSTANTS.C0MPANY_FOLLOW_ONE_FAIL,
      });
      return COMPANYCONSTANTS.C0MPANY_FOLLOW_ONE_FAIL;
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: COMPANYCONSTANTS.C0MPANY_FOLLOW_ONE_FAIL,
    });
    return COMPANYCONSTANTS.C0MPANY_FOLLOW_ONE_FAIL;
  }
};

export const UnFollowCompany = (companyID) => async (dispatch) => {
  try {
    let result = await companyApi.unFollow(companyID);
    if (result) {
      dispatch({
        type: COMPANYCONSTANTS.C0MPANY_UNFOLLOW_ONE_SUCCESS,
      });
      return COMPANYCONSTANTS.C0MPANY_UNFOLLOW_ONE_SUCCESS;
    } else {
      dispatch({
        type: COMPANYCONSTANTS.C0MPANY_UNFOLLOW_ONE_FAIL,
      });
      return COMPANYCONSTANTS.C0MPANY_UNFOLLOW_ONE_FAIL;
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: COMPANYCONSTANTS.C0MPANY_UNFOLLOW_ONE_FAIL,
    });
    return COMPANYCONSTANTS.C0MPANY_UNFOLLOW_ONE_FAIL;
  }
};
