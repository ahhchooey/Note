import * as ApiTrashUtil from "../utils/api_trash_util.js";

export const RECEIVE_TRASHES = "RECEIVE_TRASHES";
export const RECEIVE_TRASH = "RECEIVE_TRASH";
export const REMOVE_TRASH = "REMOVE_TRASH";
export const EMPTY_TRASH = "EMPTY_TRASH";

const receiveTrashes = (trashes) => ({
  type: RECEIVE_TRASHES,
  trashes: trashes
})

const receiveTrash = (trash) => ({
  type: RECEIVE_TRASH,
  trash: trash
})

const removeTrash = (trash) => ({
  type: REMOVE_TRASH,
  trash: trash
})

const dumpTrash = () => ({
  type: EMPTY_TRASH
})

export const fetchTrashes = () => dispatch => {
  return ApiTrashUtil.fetchTrashes()
    .then(trashes => dispatch(receiveTrashes(trashes)))
}

export const fetchTrash = (id) => dispatch => {
  return ApiTrashUtil.fetchTrash(id)
    .then(trash => dispatch(receiveTrash(trash)))
}

export const createTrash = (trash) => dispatch => {
  return ApiTrashUtil.createTrash(trash)
    .then(trash => dispatch(receiveTrash(trash)))
}

export const restoreTrash = (trash) => dispatch => {
  return ApiTrashUtil.restoreTrash(trash)
    .then(trash => dispatch(removeTrash(trash)))
}

export const emptyTrash = () => dispatch => {
  return ApiTrashUtil.emptyTrash()
    .then(() => dispatch(dumpTrash()))
}
