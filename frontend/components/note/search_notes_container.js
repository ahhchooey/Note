import {connect} from "react-redux";
import SearchNotes from "./search_notes.jsx";
import {removeCurrentTag} from "../../actions/ui_actions.js";


const mapStateToProps = (state) => ({
  currentTag: state.ui.currentTag
})

const mapDispatchToProps = (dispatch) => ({
  removeCurrentTag: () => dispatch(removeCurrentTag())
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchNotes);

