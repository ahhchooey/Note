import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

import Sidebar from "./sidebar.jsx";
import {logout} from "../../actions/session_actions.js";
import {fetchNotebooks} from "../../actions/notebook_actions.js";


const mapStateToProps = (state) => ({
  currentUser: state.session.currentUser
})

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
  fetchNotebooks: () => dispatch(fetchNotebooks())
})

export default withRouter( connect(mapStateToProps, mapDispatchToProps)(Sidebar) );
