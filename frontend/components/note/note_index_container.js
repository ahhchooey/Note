import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import NoteIndex from "./note_index.jsx";
import {fetchNotes} from "../../actions/note_actions.js";
import {fetchCurrentNote} from "../../actions/ui_actions.js";


const mapStateToProps = (state, ownProps) => ({
  notebookId: ownProps.notebookId,
  notes: state.entities.notes,
  currentNote: state.ui.currentNote,
  currentTag: state.ui.currentTag
})

const mapDispatchToProps = (dispatch) => ({
  fetchNotes: () => dispatch(fetchNotes()),
  fetchCurrentNote: (note) => dispatch(fetchCurrentNote(note))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NoteIndex));
