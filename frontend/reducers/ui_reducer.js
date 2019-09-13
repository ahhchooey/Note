import {RECEIVE_CURRENT_NOTEBOOK, RECEIVE_CURRENT_NOTE} from "../actions/ui_actions.js";


const uiReducer = (state = {}, action) => {
  Object.freeze(state);

  switch(action.type) {
    case RECEIVE_CURRENT_NOTEBOOK:
      return Object.assign({}, state, {currentNotebook: action.notebook})
    case RECEIVE_CURRENT_NOTE:
      return Object.assign({}, state, {currentNote: action.note})
    default:
      return state;
  }
}

export default uiReducer;
