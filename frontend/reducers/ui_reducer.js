import {RECEIVE_CURRENT_NOTEBOOK} from "../actions/ui_actions.js";


const uiReducer = (state = {}, action) => {
  Object.freeze(state);

  switch(action.type) {
    case RECEIVE_CURRENT_NOTEBOOK:
      return Object.assign({}, state, {currentNotebook: action.notebook})
    default:
      return state;
  }
}

export default uiReducer;
