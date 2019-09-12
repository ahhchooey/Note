import {connect} from "react-redux";
import NoteIndex from "./note_index.jsx";
import {fetchNotes} from "../../actions/note_actions.js";


const mapStateToProps = (state, ownProps) => ({
  notebookId: ownProps.notebookId,
  notes: state.entities.notes
})

const mapDispatchToProps = (dispatch) => ({
  fetchNotes: () => dispatch(fetchNotes())
})

export default connect(mapStateToProps, mapDispatchToProps)(NoteIndex);
