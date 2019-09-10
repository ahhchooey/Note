import {combineReducers} from "redux";

import usersReducer from "./users_reducer.js";
import notebooksReducer from "./notebooks_reducer.js";


const entitiesReducer = combineReducers({
  users: usersReducer,
  notesbooks: notebooksReducer
})

export default entitiesReducer;
