import React from "react";
import {Link} from "react-router-dom";
import {formatDateTime} from "../../utils/api_format_time.js";


export default class NoteDropDownItem extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="note-dropdown-item">
        <Link to={`/note/notebooks/${this.props.note.notebook_id}/notes/${this.props.note.id}`}
          className="ndd-ti ti">
          <img src="https://img.icons8.com/ios-filled/50/000000/note.png" />
          {this.props.note.title}
        </Link>
        <span className="ndd-cr cr">demo</span>
        <span className="ndd-up up">{formatDateTime(this.props.note.updated_at)}</span>
        <span className="ndd-sh sh">Only You</span>
        <span className={`ac`}>•••</span>
      </div>
    )
  }
}
