import React from "react";
import {Link} from "react-router-dom";
import {DropTarget} from "react-dnd";

import NotebookUpdateFormContainer from "./notebook_update_form_container.js";
import {formatDateTime} from "../../utils/api_format_time.js";
import NoteDropdownContainer from "./note_dropdown_container.js";


const itemTarget = {
  drop(props, monitor, component) {
    return {
      identity: props.identity
    }
  }
}

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    hovered: monitor.isOver(),
    item: monitor.getItem()
  }
}

class NotebookIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "searching...",
      notes: {}
    }
    this.actionButton = "action-button" + this.props.identity;
    this.dropdown = "dropdown" + this.props.identity;
    this.destroyNotebook = this.destroyNotebook.bind(this);
    this.showModal = this.showModal.bind(this);
    this.notesDropdown = this.notesDropdown.bind(this);
    this.hideNotesDropdown = this.hideNotesDropdown.bind(this);
    this.moveNote = this.moveNote.bind(this);
  }

  componentDidMount() {
    fetchNotebookUser(this.props.author).then(res => {
      let user = res;
      let name = res.username ? res.username : res.email;
      this.setState({name: name})
    }); 
    this.handleInput();
  }

  handleInput() {
    this.dropdown = document.querySelector(`.${this.dropdown}`);
    this.button = document.querySelector(`.${this.actionButton}`);
    if(this.button === null) return;
    this.button.addEventListener("click", (e) => {
      e.stopPropagation();
      if (!this.dropdown.classList.contains("visible")) {
        $(".notebook-show-more-actions-dropdown").each((i, thing) => {
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

  destroyNotebook() {
    this.props.destroyNotebook(this.props.identity);
  }

  showModal() {
    let iden = ".notebook-update-form-modal" + this.props.identity;
    let modal = document.querySelector(iden);
    if (modal) {
      modal.classList.add("notebook-create-form-modal-active");
    }
  }

  notesDropdown(e) {
    e.stopPropagation();
    let nbda = "nbda" + this.props.identity;
    let ndd = "ndd" +this.props.identity;
    e.target.classList.remove("visible");
    $(`.${nbda}`).addClass("visible");
    $(`.${ndd}`).addClass("note-dropdown-active");
  }

  hideNotesDropdown(e) {
    e.stopPropagation();
    let nbra = "nbra" + this.props.identity;
    let ndd = "ndd" + this.props.identity;
    e.target.classList.remove("visible");
    $(`.${nbra}`).addClass("visible");
    $(`.${ndd}`).removeClass("note-dropdown-active");
  }

  moveNote(note, identity) {
    let newNote = Object.assign({}, note);
    newNote.notebook_id = identity;
    this.props.updateNote(newNote);
  }

  render() {
    const {connectDropTarget, hovered, item} = this.props;

    let nbra = "nbra" + this.props.identity;
    let nbda = "nbda" + this.props.identity;
    let ndd = "ndd" +this.props.identity;
    return connectDropTarget(

      <div className="nii-container" style={{
        backgroundColor: hovered ? "lightgreen" : ""
      }}>

        <div className="notebook-index-item">
          <img className={`${nbra} right-arrow ra-nbi visible`} onClick={this.notesDropdown}
            src="https://img.icons8.com/material-rounded/24/000000/sort-right.png"/ >
          <img className={`${nbda} down-arrow da-nbi`} onClick={this.hideNotesDropdown}
            src="https://img.icons8.com/material-rounded/24/000000/sort-down.png" />
          <Link className="ti" to={`/note/notebooks/${this.props.identity}`}>
            <img src="https://img.icons8.com/ios/24/000000/spiral-bound-booklet.png" />  
            <div>
              {this.props.title}
            </div>
          </Link>
          <span className="cr">{this.state.name}</span>
          <span className="up">{formatDateTime(this.props.updatedAt)}</span>
          <span className="sh">Only You</span>
          <span className={`ac ${this.actionButton}`}>•••</span>
          <div className="notebook-dropdown-holder">
            <div className={`notebook-show-more-actions-dropdown ${this.dropdown}`}>
              <p>Notebook Actions</p>
              <div className="notebook-show-dropdown-buttons">
                <div onClick={this.showModal} className="update-notebook-button">
                  Rename Notebook
                </div>
                <br />
                {
                  (this.props.defaultNotebook === this.props.identity)
                    ? <div className="dead-destroy-notebook-button">Cannot Delete</div>
                    : <div onClick={this.destroyNotebook} className="destroy-notebook-button">
                  Delete Notebook
                </div>  
                }
              </div>
            </div>
          </div>
          <NotebookUpdateFormContainer title={this.props.title} identity={this.props.identity} />
        </div>

        <NoteDropdownContainer moveNote={this.moveNote} ndd={`${ndd} note-dropdown`} identity={this.props.identity} />

      </div>
    )
  }
}

const fetchNotebookUser = (id) => {
  return $.ajax({
    url: `api/users/${id}`,
    method: "GET"
  })
}

export default DropTarget("note", itemTarget, collect)(NotebookIndexItem);
