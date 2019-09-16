import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {updateNote, destroyNote} from "../../actions/note_actions.js";
import TextEditor from "./text_editor.js";


const mapStateToProps = (state, ownProps) => ({
  note: ownProps.note,
  notebookTitle: ownProps.notebookTitle
})

const mapDispatchToProps = (dispatch) => ({
  updateNote: (note) => dispatch(updateNote(note)),
  destroyNote: (note) => dispatch(destroyNote(note))
})

export default withRouter( connect(mapStateToProps, mapDispatchToProps)(TextEditor) );
