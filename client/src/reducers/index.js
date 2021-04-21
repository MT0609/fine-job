import authReducer from "./authReducer";
import jobReducer from "./jobReducer";
import { combineReducers } from "redux";

const reducer = combineReducers({
  auth: authReducer,
  job: jobReducer,
});

export default reducer;
