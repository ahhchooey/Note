
export const RECEIVE_CURRENT_NOTEBOOK = "RECEIVE_CURRENT_NOTEBOOK";

const receiveCurrentNotebook = (notebook) => ({
  type: RECEIVE_CURRENT_NOTEBOOK,
  notebook: notebook
})

export const fetchCurrentNotebook = (notebook) => dispatch => {
  return dispatch(receiveCurrentNotebook(notebook))
}
