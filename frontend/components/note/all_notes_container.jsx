import {connect} from "react-redux";
import AllNotes from "./all_notes.jsx";
import {removeCurrentTag} from "../../actions/ui_actions.js";
import {fetchTags} from "../../actions/tag_actions.js";
import {addCurrentTag} from "../../actions/ui_actions.js";


const mapStateToProps = (state) => ({
  currentTag: state.ui.currentTag
})

const mapDispatchToProps = (dispatch) => ({
  removeCurrentTag: () => dispatch(removeCurrentTag()),
  fetchTags: () => dispatch(fetchTags()),
  addCurrentTag: (tagId) => dispatch(addCurrentTag(tagId))
})

export default connect(mapStateToProps, mapDispatchToProps)(AllNotes);
