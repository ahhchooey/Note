import {combineReducers} from "redux";
import sessionErrorsReducer from "./session_errors_reducer.js";
import notesErrorsReducer from "./notes_errors_reducer.js";


const errorsReducer = combineReducers({
  session: sessionErrorsReducer,
  notes: notesErrorsReducer
})

export default errorsReducer;
