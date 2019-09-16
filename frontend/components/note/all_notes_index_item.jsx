import React from "react";
import {Link} from "react-router-dom";
import {formatDate, formatTime} from "../../utils/api_format_time.js";
import {Value} from "slate";


export default class AllNotesIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.note;
    this.body = Value.fromJSON(JSON.parse(this.state.body)).document.text.slice(0, 55);
    this.day = formatDate(this.props.note.updated_at).split(" ");
    this.day = this.day[this.day.length - 1];
    this.day = this.day.slice(1, this.day.length -1);
    this.time = formatTime(this.props.note.updated_at);
  }


  render() {
    let cn = "notes-index-item";
    if (this.props.currentNote.id === this.props.note.id) {
      cn += " notes-index-item-active"
    }
    return (
      <Link to={`/note/notes/${this.props.note.id}`}
        className={cn}>
        <h3>{this.state.title}</h3>
        <p>{this.body}</p>
        <span>{this.day + " " + this.time}</span>
      </Link>
    )
  }
}
