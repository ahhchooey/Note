import React from "react";
import TextEditorContainer from "../editor/text_editor_containter.js";
import {fetchTrash} from "../../utils/api_trash_util.js";


export default class TrashShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trash: {},
      notebookTitle: "Trash"
    }
  }

  componentDidMount() {
    fetchTrash(this.props.trashId).then(trash => {
      this.setState({trash: trash})
    })
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname != prevProps.location.pathname) {
      fetchTrash(this.props.trashId).then(trash => {
        this.setState({trash: trash})
      })
    }
  }

  render() {
    return (
      <div className="note-show">
        <div className="trash-cover"></div>
        <TextEditorContainer notebookTitle={this.state.notebookTitle} note={this.state.trash} /> 
      </div>
    )
  }
}
