
export const RECEIVE_CURRENT_NOTEBOOK = "RECEIVE_CURRENT_NOTEBOOK";
export const RECEIVE_CURRENT_NOTE = "RECEIVE_CURRENT_NOTE";
export const RECEIVE_UI_TAG = "RECEIVE_UI_TAG";
export const REMOVE_UI_TAG = "REMOVE_UI_TAG";

const receiveCurrentNotebook = (notebook) => ({
  type: RECEIVE_CURRENT_NOTEBOOK,
  notebook: notebook
})

const receiveCurrentNote = (note) => ({
  type: RECEIVE_CURRENT_NOTE,
  note: note
})

const receiveUiTag = (tagId) => ({
  type: RECEIVE_UI_TAG,
  tagId: tagId
})

const removeUiTag = () => ({
  type: REMOVE_UI_TAG,
})

export const fetchCurrentNotebook = (notebook) => dispatch => {
  return dispatch(receiveCurrentNotebook(notebook))
}

export const fetchCurrentNote = (note) => dispatch => {
  return dispatch(receiveCurrentNote(note))
}

export const addCurrentTag = (tagId) => dispatch => {
  return dispatch(receiveUiTag(tagId))
}

export const removeCurrentTag = () => dispatch => {
  return dispatch(removeUiTag())
}
