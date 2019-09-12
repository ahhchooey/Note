import {connect} from "react-redux";

import NotebookUpdateForm from "./notebook_update_form.jsx";
import {clearErrors} from "../../actions/session_actions.js";
import {updateNotebook} from "../../actions/notebook_actions.js";


const mapStateToProps = (state, ownProps) => ({
  userId: state.session.currentUser.id,
  errors: state.errors.session
})

const mapDispatchToProps = (dispatch) => ({
  updateNotebook: (notebook) => dispatch(updateNotebook(notebook)),
  clearErrors: () => dispatch(clearErrors())
})

export default connect(mapStateToProps, mapDispatchToProps)(NotebookUpdateForm);
