import * as ApiTagUtil from "../utils/api_tag_util.js";

export const RECEIVE_TAGS = "RECEIVE_TAGS";
export const RECEIVE_TAG = "RECEIVE_TAG";
export const REMOVE_TAG = "REMOVE_TAG";
export const RECEIVE_TAG_ERRORS = "RECEIVE_TAG_ERRORS";
export const REMOVE_TAG_ERRORS = "RECEIVE_TAG_ERRORS";

const receiveTags = (tags) => ({
  type: RECEIVE_TAGS,
  tags: tags
})

const receiveTag = (tag) => ({
  type: RECEIVE_TAG,
  tag: tag
})

const removeTag = (tag) => ({
  type: REMOVE_TAG,
  tag: tag
})

const receiveTagErrors = (errors) => ({
  type: RECEIVE_TAG_ERRORS,
  errors: errors
})

const removeTagErrors = () => ({
  type: REMOVE_TAG_ERRORS
})

export const fetchTags = (noteId) => dispatch => {
  return ApiTagUtil.fetchTags(noteId)
    .then(tags => dispatch(receiveTags(tags)))
    .fail(errors => dispatch(receiveTagErrors(errors)))
}

export const createTag = (tag) => dispatch => {
  return ApiTagUtil.createTag(tag)
    .then(tag => dispatch(receiveTag(tag)))
    .fail(errors => dispatch(receiveTagErrors(errors)))
}

export const updateTag = (tag) => dispatch => {
  return ApiTagUtil.updateTag(tag)
    .then(tag => dispatch(receiveTag(tag)))
    .fail(errors => dispatch(receiveTagErrors(errors)))
}

export const destroyTag = (id) => dispatch => {
  return ApiTagUtil.destroyTag(id)
    .then(tag => dispatch(removeTag(tag)))
    .fail(errors => dispatch(receiveTagErrors(errors)))
}

export const clearTagErrors = () => dispatch => {
  return dispatch(removeTagErrors())
}
