import authReducer from "./authReducer";
import { combineReducers } from "redux";

const reducer = combineReducers({
  auth: authReducer,
});

export default reducer;
