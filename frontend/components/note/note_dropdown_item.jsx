import React from "react";
import {Link} from "react-router-dom";
import {formatDateTime} from "../../utils/api_format_time.js";


export default class NoteDropDownItem extends React.Component {
  constructor(props) {
    super(props)
    this.dropdown = "note-dropdown" + this.props.note.id;
    this.actionButton = "note-action-button" + this.props.note.id;
    this.deleteNote = this.deleteNote.bind(this);
  }

  componentDidMount() {
    this.handleInput();
  }

  handleInput() {
    this.dropdown = document.querySelector(`.${this.dropdown}`);
    this.button = document.querySelector(`.${this.actionButton}`);
    if(this.button === null) return;
    this.button.addEventListener("click", (e) => {
      e.stopPropagation();
      if (!this.dropdown.classList.contains("visible")) {
        $(".note-show-more-actions-dropdown").each((i, thing) => {
          thing.classList.remove("visible")
        });
        this.dropdown.classList.add("visible");
      } else {
        this.dropdown.classList.remove("visible");
      }
    })
    document.addEventListener("click", (e) => {
      if (this.dropdown.classList.contains("visible")) {
        this.dropdown.classList.remove("visible");
      }
    });
  } 

  deleteNote() {
    this.props.destroyNote(this.props.note.id)
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
        <span className={`ac ${this.actionButton}`}>•••</span>

        <div className="note-dropdown-holder">
          <div className={`note-show-more-actions-dropdown ${this.dropdown}`}>
            <p>Note Actions</p>
            <div className="note-show-dropdown-buttons">
              <div onClick={this.deleteNote} className="destroy-note-button">
                Delete Note
              </div>  
            </div>
          </div>
        </div>
      </div>
    )
  }
}
