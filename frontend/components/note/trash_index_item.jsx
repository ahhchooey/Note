import React from "react";
import {Link} from "react-router-dom";
import {formatDate, formatTime} from "../../utils/api_format_time.js";
import {Value} from "slate";


export default class TrashIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trash: this.props.trash
    };
    this.day = formatDate(this.state.trash.updated_at).split(" ");
    this.day = this.day[this.day.length -1];
    this.day = this.day.slice(1, this.day.length -1);
    this.time = formatTime(this.state.trash.updated_at);
    this.restoreNote = this.restoreNote.bind(this);
  }

  componentDidUpdate() {
    if (this.props.trash != this.state.trash) {
      this.setState({trash: this.props.trash})
    }
  }

  restoreNote(e) {
    e.preventDefault();
    this.props.restoreTrash(this.state.trash).then(() => {
      this.props.history.push("/note/notes")
    })
  }

  render() {
    let bod = Value.fromJSON(JSON.parse(this.state.trash.body)).document.text.slice(0, 55);
    return (
      <Link to={`/note/trash/${this.state.trash.id}`} className="trash-index-item">
        <h3>{this.state.trash.title}</h3>
        <p>{bod}</p>
        <span>{this.day + " " + this.time}</span>
        <div className="restore-note-button" onClick={this.restoreNote}>Restore Note</div>
      </Link>
    )
  }
}
