import {RECEIVE_TAGS, RECEIVE_TAG, REMOVE_TAG} from "../actions/tag_actions.js";


const tagsReducer = (state = {}, action) => {
  Object.freeze(state);

  switch(action.type) {
    case RECEIVE_TAGS:
      return action.tags
    case RECEIVE_TAG:
      return Object.assign({}, state, {[action.tag.id]: action.tag})
    case REMOVE_TAG:
      let nextState = Object.assign({}, state);
      delete nextState[action.tag.id];
      return nextState;
    default:
      return state;
  }
}

export default tagsReducer;
