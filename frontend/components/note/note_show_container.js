import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import NoteShow from "./note_show.jsx";
import {fetchNote, fetchNotes} from "../../actions/note_actions.js";


const mapStateToProps = (state, ownProps) => ({
  noteId: parseInt(ownProps.match.params.id)
})

const mapDispatchToProps = (dispatch) => ({
  fetchNotes: (id) => dispatch(fetchNotes(id)),
  fetchNote: (id) => dispatch(fetchNote(id))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NoteShow));
