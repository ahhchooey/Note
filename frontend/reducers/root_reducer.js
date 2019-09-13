import {combineReducers} from "redux";

import entitiesReducer from "./entities_reducer.js";
import sessionReducer from "./session_reducer.js";
import errorsReducer from "./errors_reducer.js";
import uiReducer from "./ui_reducer.js";


const rootReducer = combineReducers({
  entities: entitiesReducer,
  session: sessionReducer,
  errors: errorsReducer,
  ui: uiReducer
})

export default rootReducer;
