import {connect} from "react-redux";

import TagCreateForm from "./tag_create_form.jsx";
import {createTag, clearTagErrors} from "../../actions/tag_actions.js";


const mapStateToProps = (state) => ({
  errors: state.errors.tags
})

const mapDispatchToProps = (dispatch) => ({
  createTag: (tag) => dispatch(createTag(tag)),
  clearTagErrors: () => dispatch(clearTagErrors())
})

export default connect(mapStateToProps, mapDispatchToProps)(TagCreateForm);
