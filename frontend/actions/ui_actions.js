
export const RECEIVE_CURRENT_NOTEBOOK = "RECEIVE_CURRENT_NOTEBOOK";
export const RECEIVE_CURRENT_NOTE = "RECEIVE_CURRENT_NOTE";

const receiveCurrentNotebook = (notebook) => ({
  type: RECEIVE_CURRENT_NOTEBOOK,
  notebook: notebook
})

const receiveCurrentNote = (note) => ({
  type: RECEIVE_CURRENT_NOTE,
  note: note
})

export const fetchCurrentNotebook = (notebook) => dispatch => {
  return dispatch(receiveCurrentNotebook(notebook))
}

export const fetchCurrentNote = (note) => dispatch => {
  return dispatch(receiveCurrentNote(note))
}
