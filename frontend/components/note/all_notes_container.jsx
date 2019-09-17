import {connect} from "react-redux";
import AllNotes from "./all_notes.jsx";
import {removeCurrentTag} from "../../actions/ui_actions.js";


const mapStateToProps = (state) => ({
  currentTag: state.ui.currentTag
})

const mapDispatchToProps = (dispatch) => ({
  removeCurrentTag: () => dispatch(removeCurrentTag())
})

export default connect(mapStateToProps, mapDispatchToProps)(AllNotes);
