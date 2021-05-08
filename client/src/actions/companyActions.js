import companyApi from "../api/companyApi";
import * as COMPANYCONSTANTS from "../constants/companyConstants";

export const getCompanies = (name, page = 1, limit = 3) => async (dispatch) => {
  // params: {name, limit, ...}
  try {
    dispatch({
      type: COMPANYCONSTANTS.COMPANY_GET_ALL_REQUEST,
    });

    const params = {};
    if (name) params.name = name;
    if (page) params.page = page;
    if (limit) params.limit = limit;

    let result = await companyApi.getAll(params);

    console.log(result);

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
