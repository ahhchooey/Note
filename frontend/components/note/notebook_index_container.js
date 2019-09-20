import {connect} from "react-redux";
import NotebookIndex from "./notebook_index.jsx";
import {fetchNotebooks, createNotebook, destroyNotebook, updateNotebook} from "../../actions/notebook_actions.js";
import {fetchNotes, updateNote} from "../../actions/note_actions.js";


const mapStateToProps = (state) => ({
  notebooks: state.entities.notebooks,
  defaultNotebook: state.session.currentUser.default_notebook
})

const mapDispatchToProps = (dispatch) => ({
  fetchNotebooks: () => dispatch(fetchNotebooks()),
  createNotebook: (notebook) => dispatch(createNotebook(notebook)),
  destroyNotebook: (id) => dispatch(destroyNotebook(id)),
  updateNotebook: (notebook) => dispatch(updateNotebook(notebook)),
  fetchNotes: (id) => dispatch(fetchNotes(id)),
  updateNote: (note) => dispatch(updateNote(note))
})

export default connect(mapStateToProps, mapDispatchToProps)(NotebookIndex);
