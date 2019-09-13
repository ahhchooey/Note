import {connect} from "react-redux";
import NoteDropdown from "./note_dropdown.jsx";
import {destroyNote} from "../../actions/note_actions.js";


const mapStateToProps = (state) => ({
  notes: state.entities.notes
})

const mapDispatchToProps = (dispatch) => ({
  destroyNote: (id) => dispatch(destroyNote(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(NoteDropdown);
