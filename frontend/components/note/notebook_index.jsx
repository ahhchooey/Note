import React from "react";
import {Link} from "react-router-dom";

import NotebookIndexItem from "./notebook_index_item.jsx";
import NotebookCreateFormContainer from "./notebook_create_form_container.js";


export default class NotebookIndex extends React.Component {
  constructor(props) {
    super(props);
    this.showModal = this.showModal.bind(this);
  }

  componentDidMount() {
    this.props.fetchNotebooks();
  }

  showModal() {
    let modal = document.querySelector(".notebook-create-form-modal");
    if (modal) {
      modal.classList.add("notebook-create-form-modal-active");
    }
  }
  
  render() {
    let nbs = Object.values(this.props.notebooks);
    let cow = nbs.map(notebook => <NotebookIndexItem
      key={notebook.id}
      title={notebook.title}
      author={notebook.user_id}
      updatedAt={notebook.updated_at} 
      identity={notebook.id}
      destroyNotebook={this.props.destroyNotebook}
      defaultNotebook={this.props.defaultNotebook}
    />)
    return (
      <div className="notebook-index">
        <div className="notebook-index-head">
          <h2>Notebooks</h2>
          <input type="text" placeholder="Find Notebooks..." />
        </div>
        <div className="notebook-index-table-head">
          <h3>My Notebook List</h3>
          <div className="notebook-index-table-head-buttons">
            <div onClick={this.showModal} className="new-notebook-button">
              <img src="https://img.icons8.com/wired/64/000000/spiral-bound-booklet.png" />
              + New Notebook 
            </div>
            <div className="sort-button">
              <img src="https://img.icons8.com/ios/50/000000/generic-sorting-2.png" />
            </div>
          </div>
        </div>
        <NotebookCreateFormContainer />
        <div className="notebook-table">
          <div className="table-labels">
            <span className="ti">Title</span>
            <span className="cr">Created By</span>
            <span className="up">Updated</span>
            <span className="sh">Shared With</span>
            <span className="ac">Actions</span>
          </div>
        </div>
        {cow}
      </div>
    )
  }
}
