import * as COMPANYCONSTANTS from "../constants/companyConstants";

const initialState = {
  companies: [],
  company: {},
  currentPage: 0,
  totalPages: 0,
  isLoading: false,
  followStatus: "",
  unFollowStatus: "",
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
        companies: action.payload?.results,
        currentPage: action.payload?.page,
        totalPages: action.payload?.totalPages,
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

    case COMPANYCONSTANTS.COMPANY_MODIFY_ONE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case COMPANYCONSTANTS.COMPANY_MODIFY_ONE_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case COMPANYCONSTANTS.COMPANY_MODIFY_ONE_FAIL:
      return {
        ...state,
        isLoading: false,
      };

    case COMPANYCONSTANTS.C0MPANY_FOLLOW_ONE_SUCCESS:
      return {
        ...state,
        unFollowStatus: "",
        followStatus: COMPANYCONSTANTS.C0MPANY_FOLLOW_ONE_SUCCESS,
      };
    case COMPANYCONSTANTS.C0MPANY_FOLLOW_ONE_FAIL:
      return {
        ...state,
        unFollowStatus: "",
        followStatus: COMPANYCONSTANTS.C0MPANY_FOLLOW_ONE_FAIL,
      };

    case COMPANYCONSTANTS.C0MPANY_UNFOLLOW_ONE_SUCCESS:
      return {
        ...state,
        followStatus: "",
        unFollowStatus: COMPANYCONSTANTS.C0MPANY_UNFOLLOW_ONE_SUCCESS,
      };
    case COMPANYCONSTANTS.C0MPANY_UNFOLLOW_ONE_FAIL:
      return {
        ...state,
        followStatus: "",
        unFollowStatus: COMPANYCONSTANTS.C0MPANY_UNFOLLOW_ONE_FAIL,
      };
    default:
      return {
        ...state,
      };
  }
};

export default companyReducer;
