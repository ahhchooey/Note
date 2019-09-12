import React from "react";

import NoteIndexContainer from "./note_index_container.js";


export default class NotebookShow extends React.Component {
  constructor(props) {
    super(props);
    this.mounted = false;
    this.destroyNotebook = this.destroyNotebook.bind(this);
  }

  componentDidMount() {
    this.mounted = true;
    this.props.fetchNotebook(this.props.id);
    this.handleInput();
  }

  handleInput() {
    this.dropdown = document.querySelector(".notebook-show-more-actions-dropdown");
    this.button = document.querySelector(".notebook-more-actions-button");
    this.button.addEventListener("click", (e) => {
      e.stopPropagation();
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
    this.props.destroyNotebook(this.props.id).then(() => this.props.history.push("/note/notebooks"))
  }

  render() {
    return (
      <div className="notebook-show">
        <div className="notebook-show-box">
          <h3>{this.props.notebook ? this.props.notebook.title : "loading..."}</h3>
          <div className="notebook-show-box-bottom">
            <p># notes</p>
            <div className="notebook-show-box-buttons">
              <img src="https://img.icons8.com/ios/50/000000/generic-sorting-2.png" />
              <img src="https://img.icons8.com/ios/50/000000/tags.png" />   
              <div className="notebook-more-actions-button">•••</div>
              <div className="notebook-show-more-actions-dropdown">
                <p>Actions</p>
                <div className="notebook-show-dropdown-buttons">
                  <div onClick={this.destroyNotebook} className="destroy-notebook-button">
                    Delete Notebook
                  </div>  
                </div>
              </div>
            </div>
          </div>
        </div>

        <NoteIndexContainer notebookId={this.props.id}/>
      </div>
    )
  }
}
