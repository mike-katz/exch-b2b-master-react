import { combineReducers } from "redux";
import PersistReducer from "./persistReducer";

const reducers = {
  persist: PersistReducer,
};

export default combineReducers(reducers);
