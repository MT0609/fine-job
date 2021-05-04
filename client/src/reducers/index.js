import authReducer from "./authReducer";
import jobReducer from "./jobReducer";
import companyReducer from "./companyReducer";
import resumeReducer from "./resumeReducer";
import { combineReducers } from "redux";

const reducer = combineReducers({
  auth: authReducer,
  job: jobReducer,
  company: companyReducer,
  resume: resumeReducer,
});

export default reducer;
