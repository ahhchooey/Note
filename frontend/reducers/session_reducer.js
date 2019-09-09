import {RECEIVE_USER, LOGOUT_USER, RECEIVE_ERRORS} from "../actions/session_actions.js";

const _nullSession = {
  currentUser: null
}

const sessionReducer = (state = _nullSession, action) => {
  Object.freeze(state);

  switch(action.type) {
    case RECEIVE_USER:
      return Object.assign({}, {currentUser: action.user})
    case LOGOUT_USER:
      return _nullSession;
    default: 
      return state;
  }
}

export default sessionReducer;

