import authReducer from "./authReducer";
import jobReducer from "./jobReducer";
import companyReducer from "./companyReducer";
import { combineReducers } from "redux";

const reducer = combineReducers({
  auth: authReducer,
  job: jobReducer,
  company: companyReducer,
});

export default reducer;
