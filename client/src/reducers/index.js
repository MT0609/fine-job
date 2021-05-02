import authReducer from "./authReducer";
import userReducer from "./userReducer";
import jobReducer from "./jobReducer";
import companyReducer from "./companyReducer";
import resumeReducer from "./resumeReducer";
import messageReducer from "./messageReducer";
import { combineReducers } from "redux";

const reducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  job: jobReducer,
  company: companyReducer,
  resume: resumeReducer,
  message: messageReducer,
});

export default reducer;
