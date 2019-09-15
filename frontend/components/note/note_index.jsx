import React from "react";

import NoteIndexItem from "./note_index_item.jsx";
import {fetchNotes} from "../../utils/api_note_util.js";
import {sortNotesByDate} from "../../utils/sorting_util.jsx";


export default class NoteIndex extends React.Component {
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
    if (this.props.currentNote !== prevProps.currentNote) {
      let nt = this.props.currentNote;
      let nts = this.state.notes;
      nts[nt.id] = nt;
      this.setState({notes: nts})
    }
  }

  render() {
    let sortedNotes = sortNotesByDate(Object.values(this.state.notes));
    return (
      <div className="notes-index">
        {
          sortedNotes.map(note => (
            <NoteIndexItem key={note.id} note={note} currentNote={this.props.currentNote}
            notebookId={this.props.notebookId} />
          ))
        } 
      </div>
    )
  }
}
