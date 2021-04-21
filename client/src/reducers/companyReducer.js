import * as COMPANYCONSTANTS from "../constants/companyConstants";

const initialState = {
  companies: [],
  company: {},
  isLoading: false,
};

const companyReducer = (state = initialState, action) => {
  switch (action.type) {
    case COMPANYCONSTANTS.COMPANY_GET_ALL_REQUEST:
      return {
        ...state,
        companies: [],
        isLoading: true,
      };
    case COMPANYCONSTANTS.C0MPANY_GET_ALL_SUCCESS:
      return {
        ...state,
        companies: action.payload,
        isLoading: false,
      };
    case COMPANYCONSTANTS.COMPANY_GET_ALL_FAIL:
      return {
        ...state,
        companies: [],
        isLoading: false,
      };

    case COMPANYCONSTANTS.COMPANY_GET_ONE_REQUEST:
      return {
        ...state,
        company: {},
        isLoading: true,
      };
    case COMPANYCONSTANTS.C0MPANY_GET_ONE_SUCCESS:
      return {
        ...state,
        company: action.payload,
        isLoading: false,
      };
    case COMPANYCONSTANTS.COMPANY_GET_ONE_FAIL:
      return {
        ...state,
        company: {},
        isLoading: false,
      };
    default:
      return {
        ...state,
      };
  }
};

export default companyReducer;
