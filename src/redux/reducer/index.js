import { combineReducers } from "redux"; //combinReducers用于合并各模块的reducers;
import counter from "./counter";

const reducers = combineReducers({
  counter,
});

export default reducers;
