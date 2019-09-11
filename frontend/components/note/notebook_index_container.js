import {connect} from "react-redux";
import NotebookIndex from "./notebook_index.jsx";
import {fetchNotebooks, createNotebook, destroyNotebook, updateNotebook} from "../../actions/notebook_actions.js";


const mapStateToProps = (state) => ({
  notebooks: state.entities.notebooks
})

const mapDispatchToProps = (dispatch) => ({
  fetchNotebooks: () => dispatch(fetchNotebooks()),
  createNotebook: (notebook) => dispatch(createNotebook(notebook)),
  destroyNotebook: (id) => dispatch(destroyNotebook(id)),
  updateNotebook: (notebook) => dispatch(updateNotebook(notebook))
})

export default connect(mapStateToProps, mapDispatchToProps)(NotebookIndex);
