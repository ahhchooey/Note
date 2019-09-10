import React from "react";


export default class NotebookIndex extends React.Component {
  
  render() {
    return (
      <h1 className="notebook-index">
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
            <span>Title</span>
            <span>Created By</span>
            <span>Updated</span>
            <span>Shared With</span>
            <span>Actions</span>
          </div>

        </div>
      </h1>
    )
  }
}
