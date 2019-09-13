import React from "react";

import AllNotesIndexItem from "./all_notes_index_item.jsx";
import {fetchNotes} from "../../utils/api_note_util.js";


export default class AllNotesIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: {}
    }
  }

  componentDidMount() {
    this.props.fetchNotes();
    fetchNotes(this.props.notebookId).then(notes => {
      this.setState({notes: notes})
    });
  }

  componentDidUpdate(nextProps, nextState) {
    if (this.props.location.pathname != nextProps.location.pathname) {
      fetchNotes(this.props.notebookId).then(notes => {
        this.setState({notes: notes})
      })
    }
  }

  render() {
    return (
      <div className="notes-index">
        {
          Object.values(this.state.notes).map(note => (
            <AllNotesIndexItem key={note.id} note={note} notebookId={this.props.notebookId} />
          ))
        } 
      </div>
    )
  }
}

