import {RECEIVE_NOTE_ERRORS, RECEIVE_NOTE, REMOVE_NOTE_ERRORS} from "../actions/note_actions.js";


const notesErrorsReducer = (state = [], action) => {
  Object.freeze(state);

  switch(action.type) {
    case RECEIVE_NOTE_ERRORS:
      return Object.assign([], state, actions.errors);
    case RECEIVE_NOTE:
      return [];
    case REMOVE_NOTE_ERRORS:
      return [];
    default:
      return state;
  }
}

export default notesErrorsReducer;
