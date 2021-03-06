import React from "react";
import {Link} from "react-router-dom";
import {formatDate, formatTime} from "../../utils/api_format_time.js";
import {Value} from "slate";


export default class NoteIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      note: this.props.note
    };
    this.day = formatDate(this.state.note.updated_at).split(" ");
    this.day = this.day[this.day.length - 1];
    this.day = this.day.slice(1, this.day.length -1);
    this.time = formatTime(this.state.note.updated_at);
  }

  componentDidUpdate() {
    if (this.props.note != this.state.note) {
      this.setState({note: this.props.note})
    }
  }

  render() {
    let cn = "notes-index-item";
    if (this.props.currentNote) {
      if (this.props.currentNote.id === this.props.note.id) {
        cn += " notes-index-item-active"
      }
    }
    let bod = Value.fromJSON(JSON.parse(this.state.note.body)).document.text.slice(0, 55);
    if (bod.length > 54) {
      bod += "...";
    }
    return (
      <Link to={`/note/notebooks/${this.props.notebookId}/notes/${this.props.note.id}`}
        className={cn}>
        <h3>{this.state.note.title}</h3>
        <p>{bod}</p>
        <span>{this.day + " " + this.time}</span>
      </Link>
    )
  }
}
