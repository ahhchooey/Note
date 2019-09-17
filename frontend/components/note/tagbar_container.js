import {connect} from "react-redux";
import TagBar from "./tagbar.jsx";
import {createTag, fetchTags, destroyTag} from "../../actions/tag_actions.js";


const mapStateToProps = (state, ownProps) => ({
  tags: state.entities.tags
})

const mapDispatchToProps = (dispatch) => ({
  createTag: (tag) => dispatch(createTag(tag)),
  fetchTags: (noteId) => dispatch(fetchTags(noteId)),
  destroyTag: (id) => dispatch(destroyTag(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(TagBar);
