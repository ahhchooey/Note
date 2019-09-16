import {RECEIVE_TAG_ERRORS, RECEIVE_TAG, REMOVE_TAG_ERRORS} from "../actions/tag_actions.js";


const tagsErrorsReducer = (state = [], action) => {
  Object.freeze(state);

  switch(action.type) {
    case RECEIVE_TAG_ERRORS:
      return Object.assign([], state, action.errors);
    case RECEIVE_TAG:
      return [];
    case REMOVE_TAG_ERRORS:
      return [];
    default:
      return state;
  }
}

export default tagsErrorsReducer;
