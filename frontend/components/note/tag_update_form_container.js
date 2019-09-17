import {connect} from "react-redux";

import TagUpdateForm from "./tag_update_form.jsx";
import {clearTagErrors, updateTag} from "../../actions/tag_actions.js";


const mapStateToProps = (state, ownProps) => ({
  errors: state.errors.tags
})

const mapDispatchToProps = (dispatch) => ({
  updateTag: (tag) => dispatch(updateTag(tag)),
  clearTagErrors: () => dispatch(clearTagErrors())
})

export default connect(mapStateToProps, mapDispatchToProps)(TagUpdateForm);
