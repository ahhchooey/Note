import * as ApiNotebookUtil from "../utils/api_notebook_util.js";

export const RECEIVE_NOTEBOOKS = "RECEIVE_NOTEBOOKS";
export const RECEIVE_NOTEBOOK = "RECEIVE_NOTEBOOK";
export const REMOVE_NOTEBOOK = "REMOVE_NOTEBOOK";
export const RECEIVE_ERRORS = "RECEIVE_ERRORS";

const receiveNotebooks = (notebooks) => ({
  type: RECEIVE_NOTEBOOKS,
  notebooks: notebooks
})

const receiveNotebook = (notebook) => ({
  type: RECEIVE_NOTEBOOK,
  notebook: notebook
})

const removeNotebook = (notebook) => ({
  type: REMOVE_NOTEBOOK,
  notebook: notebook
})

const receiveErrors = (errors) => ({
  type: RECEIVE_ERRORS,
  errors: errors
})

export const fetchNotebooks = () => dispatch => {
  return ApiNotebookUtil.fetchNotebooks()
    .then(notebooks => dispatch(receiveNotebooks(notebooks)))
    .fail(errors => dispatch(receiveErrors(errors)))
}

export const fetchNotebook = (id) => dispatch => {
  return ApiNotebookUtil.fetchNotebook(id)
    .then(notebook => dispatch(receiveNotebook(notebook)))
    .fail(errors => dispatch(receiveErrors(errors)))
}

export const createNotebook = (notebook) => dispatch => {
  return ApiNotebookUtil.createNotebook(notebook)
    .then(notebook => dispatch(receiveNotebook(notebook)))
    .fail(errors => dispatch(receiveErrors(errors)))
}

export const updateNotebook = (notebook) => dispatch => {
  return ApiNotebookUtil.updateNotebook(notebook)
    .then(notebook => dispatch(receiveNotebook(notebook)))
    .fail(errors => dispatch(receiveErrors(errors)))
}

export const destroyNotebook = (id) => dispatch => {
  return ApiNotebookUtil.destroyNotebook(id)
    .then(notebook => dispatch(removeNotebook(notebook)))
    .fail(errors => dispatch(receiveErrors(errors)))
}

