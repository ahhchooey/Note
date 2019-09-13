
export const RECEIVE_CURRENT_NOTEBOOK = "RECEIVE_CURRENT_NOTEBOOK";

export const receiveCurrentNotebook = (notebook) => ({
  type: RECEIVE_CURRENT_NOTEBOOK,
  notebook: notebook
})
