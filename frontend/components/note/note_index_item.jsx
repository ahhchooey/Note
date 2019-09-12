import React from "react";
import {formatDate, formatTime} from "../../utils/api_format_time.js";


export default class NoteIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.note;
    this.body = this.state.body.slice(0,55);
    this.day = formatDate(this.props.note.updated_at).split(" ");
    this.day = this.day[this.day.length - 1];
    this.day = this.day.slice(1, this.day.length -1);
    this.time = formatTime(this.props.note.updated_at);
  }

  render() {
    return (
      <div className="notes-index-item">
        <h3>{this.state.title}</h3>
        <p>{this.body}</p>
        <span>{this.day + " " + this.time}</span>
      </div>
    )
  }
}
