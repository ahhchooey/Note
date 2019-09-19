import {connect} from "react-redux";
import SearchNotes from "./search_notes.jsx";
import {removeCurrentTag} from "../../actions/ui_actions.js";
import {fetchTags} from "../../actions/tag_actions.js";
import {addCurrentTag} from "../../actions/ui_actions.js";


const mapStateToProps = (state) => ({
  currentTag: state.ui.currentTag
})

const mapDispatchToProps = (dispatch) => ({
  removeCurrentTag: () => dispatch(removeCurrentTag()),
  fetchTags: () => dispatch(fetchTags()),
  addCurrentTag: (tag) => dispatch(addCurrentTag(tag))
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchNotes);

