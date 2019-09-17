import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import TrashShow from "./trash_show.jsx";
import {fetchTrash} from "../../actions/trash_actions.js";


const mapStateToProps = (state, ownProps) => ({
  trashId: parseInt(ownProps.match.params.id)
})

const mapDispatchToProps = (dispatch) => ({
  fetchTrash: (id) => dispatch(fetchTrash(id))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TrashShow));
