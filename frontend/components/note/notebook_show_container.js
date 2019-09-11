import {connect} from "react-redux";
import NotebookShow from "./notebook_show.jsx";
import {fetchNotebook} from "../../actions/notebook_actions.js";


const mapStateToProps = (state, ownProps) => ({
  id: ownProps.match.params.id,
  notebook: state.entities.notebooks[ownProps.match.params.id]
})

const mapDispatchToProps = (dispatch) => ({ 
  fetchNotebook: (id) => dispatch(fetchNotebook(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(NotebookShow);
