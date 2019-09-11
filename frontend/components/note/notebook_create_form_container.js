import {connect} from "react-redux";

import NotebookCreateForm from "./notebook_create_form.jsx";
import {clearErrors} from "../../actions/session_actions.js";
import {createNotebook} from "../../actions/notebook_actions.js";


const mapStateToProps = (state) => ({
  userId: state.session.currentUser.id,
  errors: state.errors.session
})

const mapDispatchToProps = (dispatch) => ({
  createNotebook: (notebook) => dispatch(createNotebook(notebook)),
  clearErrors: () => dispatch(clearErrors())
})

export default connect(mapStateToProps, mapDispatchToProps)(NotebookCreateForm);
