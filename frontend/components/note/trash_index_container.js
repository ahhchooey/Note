import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import TrashIndex from "./trash_index.jsx";
import {fetchTrashes, restoreTrash, emptyTrash} from "../../actions/trash_actions.js";
import {fetchCurrentNote} from "../../actions/ui_actions.js";


const mapStateToProps = (state) => ({
  trashes: state.entities.trashes
})

const mapDispatchToProps = (dispatch) => ({
  fetchTrashes: () => dispatch(fetchTrashes()),
  restoreTrash: (trash) => dispatch(restoreTrash(trash)),
  emptyTrash: () => dispatch(emptyTrash()),
  fetchCurrentNote: (note) => dispatch(fetchCurrentNote(note))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TrashIndex));
