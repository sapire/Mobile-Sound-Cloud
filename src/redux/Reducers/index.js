import { combineReducers } from "redux";
import MusicReducer from "./MusicReducer";

const RootReducer = combineReducers({
  MusicReducer,
});

export default RootReducer;
