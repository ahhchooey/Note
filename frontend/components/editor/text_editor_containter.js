import {connect} from "react-redux";
import {updateNote, destroyNote} from "../../actions/note_actions.js";
import TextEditor from "./text_editor.js";


const mapStateToProps = (state, ownProps) => ({
  note: ownProps.note
})

const mapDispatchToProps = (dispatch) => ({
  updateNote: (note) => dispatch(updateNote(note)),
  destroyNote: (note) => dispatch(destroyNote(note))
})

export default connect(mapStateToProps, mapDispatchToProps)(TextEditor);
