import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import AllNotesIndex from "./all_notes_index.jsx";
import {fetchNotes} from "../../actions/note_actions.js";


const mapStateToProps = (state, ownProps) => ({
  notes: state.entities.notes,
  currentNote: state.ui.currentNote,
  currentTag: state.ui.currentTag
})

const mapDispatchToProps = (dispatch) => ({
  fetchNotes: () => dispatch(fetchNotes())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllNotesIndex));

