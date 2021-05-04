import companyApi from "../api/companyApi";
import * as COMPANYCONSTANTS from "../constants/companyConstants";

export const getCompanies = (name) => async (dispatch) => {
  // params: {name, limit, ...}
  try {
    dispatch({
      type: COMPANYCONSTANTS.COMPANY_GET_ALL_REQUEST,
    });

    const params = {};
    if (name) params.name = name;

    let result = await companyApi.getAll(params);

    dispatch({
      type: COMPANYCONSTANTS.C0MPANY_GET_ALL_SUCCESS,
      payload: result.results,
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
