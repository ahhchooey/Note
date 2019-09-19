import {connect} from "react-redux";
import TagIndex from "./tag_index.jsx";
import {fetchTags, createTag, destroyTag, updateTag} from "../../actions/tag_actions.js";
import {addCurrentTag} from "../../actions/ui_actions.js";
import {fetchCurrentNote} from "../../actions/ui_actions.js";


const mapStateToProps = (state) => ({
  tags: state.entities.tags,
})

const mapDispatchToProps = (dispatch) => ({
  fetchTags: () => dispatch(fetchTags()),
  createTag: (tag) => dispatch(createTag(tag)),
  destroyTag: (id) => dispatch(destroyTag(id)),
  updateTag: (tag) => dispatch(updateTag(tag)),
  addCurrentTag: (tagId) => dispatch(addCurrentTag(tagId)),
  fetchCurrentNote: (note) => dispatch(fetchCurrentNote(note))
})

export default connect(mapStateToProps, mapDispatchToProps)(TagIndex);
