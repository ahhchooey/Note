import {connect} from "react-redux";

import SignupForm from "./signup_form.jsx";
import {signup, login} from "../../actions/session_actions.js";


const mapStateToProps = (state) => ({
  errors: state.errors.session
})

const mapDispatchToProps = (dispatch) => ({
  signup: (user) => dispatch(signup(user)),
  login: (user) => dispatch(login(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
