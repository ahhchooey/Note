import {combineReducers} from "redux";

import usersReducer from "./users_reducer.js";
import notebooksReducer from "./notebooks_reducer.js";
import notesReducer from "./notes_reducer.js";
import tagsReducer from "./tags_reducer.js";


const entitiesReducer = combineReducers({
  users: usersReducer,
  notebooks: notebooksReducer,
  notes: notesReducer,
  tags: tagsReducer
})

export default entitiesReducer;
