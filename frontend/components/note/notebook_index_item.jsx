import React from "react";
import {Link} from "react-router-dom";

import NotebookUpdateFormContainer from "./notebook_update_form_container.js";
import {formatDateTime} from "../../utils/api_format_time.js";

export default class NotebookIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "searching..."
    }
    this.actionButton = "action-button" + this.props.identity;
    this.dropdown = "dropdown" + this.props.identity;
    this.destroyNotebook = this.destroyNotebook.bind(this);
    this.showModal = this.showModal.bind(this);
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
      $(".notebook-show-more-actions-dropdown").each((i, thing) => {
        thing.classList.remove("visible")
      });
      if (!this.dropdown.classList.contains("visible")) {
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

  render() {
    return (
    <div className="notebook-index-item">
      <Link className="ti" to={`/note/notebooks/${this.props.identity}`}>{this.props.title}</Link>
      <span className="cr">{this.state.name}</span>
      <span className="up">{formatDateTime(this.props.updatedAt)}</span>
      <span className="sh">Only You</span>
      <span className={`ac ${this.actionButton}`}>•••</span>
      <div className="notebook-dropdown-holder">
        <div className={`notebook-show-more-actions-dropdown ${this.dropdown}`}>
          <p>Actions</p>
          <div className="notebook-show-dropdown-buttons">
            <div onClick={this.showModal} className="update-notebook-button">
              Rename Notebook
            </div>
            <br />
            <div onClick={this.destroyNotebook} className="destroy-notebook-button">
              Delete Notebook
            </div>  
          </div>
        </div>
      </div>
      <NotebookUpdateFormContainer title={this.props.title} identity={this.props.identity} />
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
