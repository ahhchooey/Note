import React from "react";

import NotebookIndexItem from "./notebook_index_item.jsx";


export default class NotebookIndex extends React.Component {

  componentDidMount() {
    this.props.fetchNotebooks();
  }
  
  render() {
    let nbs = Object.values(this.props.notebooks);
    let cow = nbs.map(notebook => <NotebookIndexItem
      key={notebook.id}
      title={notebook.title}
      author={notebook.user_id}
      updatedAt={notebook.updated_at} 
      identity={notebook.id}
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
              <div className="new-notebook-button">
                New Notebook 
              </div>
              <div className="sort-button">
                Sort  
              </div>
            </div>
        </div>
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
