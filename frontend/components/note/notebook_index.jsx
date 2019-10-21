import React from "react";
import {Link} from "react-router-dom";

import NotebookIndexItem from "./notebook_index_item.jsx";
import NotebookCreateFormContainer from "./notebook_create_form_container.js";


export default class NotebookIndex extends React.Component {
  constructor(props) {
    super(props);
    this.showModal = this.showModal.bind(this);
    this.state = {
      search: ""
    }
    this.search = this.search.bind(this);
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

  search(e) {
    this.setState({search: e.target.value})
  }
  
  render() {
    let nbs = Object.values(this.props.notebooks);
    if (nbs.length > 0) {
      nbs = nbs.filter(nb => nb.title.toLowerCase().includes(this.state.search.toLowerCase()))
    }
    let cow = nbs.map(notebook => <NotebookIndexItem
      key={notebook.id}
      title={notebook.title}
      author={notebook.user_id}
      updatedAt={notebook.updated_at} 
      identity={notebook.id}
      destroyNotebook={this.props.destroyNotebook}
      defaultNotebook={this.props.defaultNotebook}
      updateNote={this.props.updateNote}
    />)
    return (
      <div className="notebook-index">
        <div className="notebook-index-head">
          <h2>Notebooks</h2>
          <input type="text" onChange={this.search} value={this.state.search} placeholder="Find Notebooks..." />
        </div>
        <div className="notebook-index-table-head">
          <h3>My Notebook List 
            <font style={{color: "lightgray"}}>- Drag Notes Between Notebooks to Organize</font>
          </h3>
          <div className="notebook-index-table-head-buttons">
            <div onClick={this.showModal} className="new-notebook-button">
              <img src="https://img.icons8.com/wired/64/000000/spiral-bound-booklet.png" />
              + New Notebook 
            </div>
          </div>
        </div>
        <NotebookCreateFormContainer />
        <div className="notebook-table">
          <div className="table-labels">
            <span className="ti tii">Title</span>
            <span className="cr">Created By</span>
            <span className="up">Updated</span>
            <span className="sh">Shared With</span>
            <span className="ac acc">Actions</span>
          </div>
        </div>
        {cow}
      </div>
    )
  }
}
