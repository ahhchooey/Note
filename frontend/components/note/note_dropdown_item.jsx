import React from "react";
import {Link} from "react-router-dom";
import {formatDateTime} from "../../utils/api_format_time.js";
import {DragSource} from "react-dnd";

const itemSource = {
  beginDrag(props) {
    return props.note
  },
  endDrag(props, monitor, component) {
    if (!monitor.didDrop()) {
      return;
    }
    const identity = monitor.getDropResult().identity

    return props.handleDrop(props.note, identity);
  }
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  }
}


class NoteDropDownItem extends React.Component {
  constructor(props) {
    super(props)
    this.dropdown = "note-dropdown" + this.props.note.id;
    this.actionButton = "note-action-button" + this.props.note.id;
    this.deleteNote = this.deleteNote.bind(this);
    this.state = {
      name: "searching..."
    }
  }

  componentDidMount() {
    fetchNoteUser(this.props.note.user_id).then(res => {
      let user = res;
      let name = res.username ? res.username : res.email;
      this.setState({name: name})
    })
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
    const {isDragging, connectDragSource, item} = this.props;

    let title = this.props.note.title;
    if (this.props.note.title.length > 25) {
      title = title.slice(0, 22) + "..."
    }
    return connectDragSource(
      <div className="note-dropdown-item" style={{
        opacity: isDragging ? 0 : 1,
      }}>
        <Link to={`/note/notebooks/${this.props.note.notebook_id}/notes/${this.props.note.id}`}
          className="ndd-ti ti">
          <img src="https://img.icons8.com/ios-filled/50/000000/note.png" />
          {title}
        </Link>
        <span className="ndd-cr cr">{this.state.name}</span>
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

const fetchNoteUser = (id) => {
  return $.ajax({
    url: `api/users/${id}`,
    method: "GET"
  })
}

export default DragSource("note", itemSource, collect)(NoteDropDownItem);
