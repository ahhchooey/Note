import React from "react";

import AllNotesIndexItem from "./all_notes_index_item.jsx";
import {fetchNotes} from "../../utils/api_note_util.js";
import {sortNotesByDate} from "../../utils/sorting_util.jsx";


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

  componentDidUpdate(prevProps, nextState) {
    if (this.props.location.pathname != prevProps.location.pathname) {
      fetchNotes(this.props.notebookId).then(notes => {
        this.setState({notes: notes})
      })
    }
    if (this.props.notes !== prevProps.notes) {
      fetchNotes(this.props.notebookId).then(notes => {
        this.setState({notes: notes})
      })
    }
  }

  render() {
    let sortedNotes = sortNotesByDate(Object.values(this.state.notes));
    return (
      <div className="notes-index">
        {
          sortedNotes.map(note => (
            <AllNotesIndexItem key={note.id} note={note} currentNote={this.props.currentNote}
            notebookId={this.props.notebookId} />
          ))
        } 
      </div>
    )
  }
}

