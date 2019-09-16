import {connect} from "react-redux";
import TagIndex from "./tag_index.jsx";
import {fetchTags, createTag, destroyTag, updateTag} from "../../actions/tag_actions.js";


const mapStateToProps = (state) => ({
  tags: state.entities.tags,
})

const mapDispatchToProps = (dispatch) => ({
  fetchTags: () => dispatch(fetchTags()),
  createTag: (tag) => dispatch(createTag(tag)),
  destroyTag: (id) => dispatch(destroyTag(id)),
  updateTag: (tag) => dispatch(updateTag(tag))
})

export default connect(mapStateToProps, mapDispatchToProps)(TagIndex);
