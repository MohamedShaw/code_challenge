import { combineReducers } from "redux";
import lang from "./lang";
import network from "./network";
import list from "./list";
import cat from "./catReducer";
import cart from "./cartReducer";
import authReducer from "./authReducer";
import location from "./location";

export default combineReducers({
  lang,
  network,
  list,
  cat,
  cart,
  auth: authReducer,
  location
});
