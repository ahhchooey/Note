import {connect} from "react-redux";
import NotebookShow from "./notebook_show.jsx";
import {fetchNotebook, destroyNotebook} from "../../actions/notebook_actions.js";
import {fetchCurrentNotebook} from "../../actions/ui_actions.js";
import {fetchTags} from "../../actions/tag_actions.js";
import {addCurrentTag, removeCurrentTag} from "../../actions/ui_actions.js";


const mapStateToProps = (state, ownProps) => ({
  id: parseInt(ownProps.match.params.id),
  notebook: state.entities.notebooks[ownProps.match.params.id],
  currentTag: state.ui.currentTag
})

const mapDispatchToProps = (dispatch) => ({ 
  fetchNotebook: (id) => dispatch(fetchNotebook(id)),
  destroyNotebook: (id) => dispatch(destroyNotebook(id)),
  fetchCurrentNotebook: (nb) => dispatch(fetchCurrentNotebook(nb)),
  fetchTags: () => dispatch(fetchTags()),
  addCurrentTag: (tag) => dispatch(addCurrentTag(tag)),
  removeCurrentTag: () => dispatch(removeCurrentTag())
})

export default connect(mapStateToProps, mapDispatchToProps)(NotebookShow);
