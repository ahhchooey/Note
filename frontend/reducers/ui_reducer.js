import {
  RECEIVE_CURRENT_NOTEBOOK,
  RECEIVE_CURRENT_NOTE,
  RECEIVE_UI_TAG,
  REMOVE_UI_TAG
} from "../actions/ui_actions.js";


const uiReducer = (state = {}, action) => {
  Object.freeze(state);

  switch(action.type) {
    case RECEIVE_CURRENT_NOTEBOOK:
      return Object.assign({}, state, {currentNotebook: action.notebook})
    case RECEIVE_CURRENT_NOTE:
      return Object.assign({}, state, {currentNote: action.note})
    case RECEIVE_UI_TAG:
      return Object.assign({}, state, {currentTag: action.tagId})
    case REMOVE_UI_TAG:
      return Object.assign({}, state, {currentTag: null})
    default:
      return state;
  }
}

export default uiReducer;
