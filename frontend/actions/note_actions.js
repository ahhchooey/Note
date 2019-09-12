import * as ApiNoteUtil from "../utils/api_note_util.js";

export const RECEIVE_NOTES = "RECEIVE_NOTES";
export const RECEIVE_NOTE = "RECEIVE_NOTE";
export const REMOVE_NOTE = "REMOVE_NOTE";
export const RECEIVE_NOTE_ERRORS = "RECEIVE_NOTE_ERRORS";
export const REMOVE_NOTE_ERRORS = "REMOVE_NOTE_ERRORS";

const receiveNotes = (notes) => ({
  type: RECEIVE_NOTES,
  notes: notes
})

const receiveNote = (note) => ({
  type: RECEIVE_NOTE,
  note: note
})

const removeNote = (note) => ({
  type: REMOVE_NOTE,
  note: note
})

const receiveNoteErrors = (errors) => ({
  type: RECEIVE_NOTE_ERRORS,
  errors: errors
})

const removeNoteErrors = () => ({
  type: REMOVE_NOTE_ERRORS
})

export const fetchNotes = (notebook_id) => dispatch => {
  return ApiNoteUtil.fetchNotes(notebook_id)
    .then(notes => dispatch(receiveNotes(notes)))
    .fail(errors => dispatch(receiveNoteErrors(errors)))
}

export const fetchNote = (id) => dispatch => {
  return ApiNoteUtil.fetchNote(id)
    .then(note => dispatch(receiveNote(note)))
    .fail(errors => dispatch(receiveNoteErrors(errors)))
}

export const createNote = (note) => dispatch => {
  return ApiNoteUtil.createNote(note)
    .then(note => dispatch(receiveNote(note)))
    .fail(errors => dispatch(receiveNoteErrors(errors)))
}

export const updateNote = (note) => dispatch => {
  return ApiNoteUtil.updateNote(note)
    .then(note => dispatch(receiveNote(note)))
    .fail(errors => dispatch(receiveNoteErrors(errors)))
}

export const destroyNote = (id) => dispatch => {
  return ApiNoteUtil.destroyNote(id)
    .then(note => dispatch(removeNote(note)))
    .fail(errors => dispatch(receiveNoteErrors(errors)))
}

const clearNoteErrors = () => dispatch => {
  return dispatch(removeNoteErrors())
}
