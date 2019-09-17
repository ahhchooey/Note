import {
  RECEIVE_TRASHES,
  RECEIVE_TRASH,
  REMOVE_TRASH,
  EMPTY_TRASH} from "../actions/trash_actions.js";


const trashesReducer = (state = {}, action) => {
  Object.freeze(state);

  switch(action.type) {
    case RECEIVE_TRASHES:
      return action.trashes;
    case RECEIVE_TRASH:
      return Object.assign({}, state, {[action.trash.id]: action.trash});
    case REMOVE_TRASH:
      let nS = Object.assign({}, state);
      delete nS[action.trash.id];
      return nS;
    case EMPTY_TRASH:
      return {};
    default:
      return state;
  }
}

export default trashesReducer;
