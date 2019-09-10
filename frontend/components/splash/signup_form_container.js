import {connect} from "react-redux";

import SignupForm from "./signup_form.jsx";
import {signup, login, clearErrors} from "../../actions/session_actions.js";


const mapStateToProps = (state) => ({
  errors: state.errors.session
})

const mapDispatchToProps = (dispatch) => ({
  signup: (user) => dispatch(signup(user)),
  login: (user) => dispatch(login(user)),
  clearErrors: () => dispatch(clearErrors())
})

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
