import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

import Sidebar from "./sidebar.jsx";
import {logout} from "../../actions/session_actions.js";
import {fetchNotebooks} from "../../actions/notebook_actions.js";
import {createNote} from "../../actions/note_actions.js";
import {fetchNotes} from "../../actions/note_actions.js";
import {fetchCurrentNotebook, fetchCurrentNote} from "../../actions/ui_actions.js";


const mapStateToProps = (state) => ({
  currentUser: state.session.currentUser,
  defaultNotebook: state.session.currentUser.default_notebook,
  notebook: state.ui.currentNotebook,
  currentNote: state.ui.currentNote,
  notebooks: state.entities.notebooks
})

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
  fetchNotebooks: () => dispatch(fetchNotebooks()),
  fetchNotes: (id) => dispatch(fetchNotes(id)),
  fetchCurrentNotebook: (nb) => dispatch(fetchCurrentNotebook(nb)),
  createNote: (note) => dispatch(createNote(note)),
  fetchCurrentNote: (note) => dispatch(fetchCurrentNote(note))
})

export default withRouter( connect(mapStateToProps, mapDispatchToProps)(Sidebar) );
