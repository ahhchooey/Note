import React from "react";

import AllNotesIndexItem from "./all_notes_index_item.jsx";
import {fetchNotes} from "../../utils/api_note_util.js";
import {sortNotesByDate} from "../../utils/sorting_util.jsx";


export default class AllNotesIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: {},
      currentTag: this.props.currentTag || {}
    }
  }

  componentDidMount() {
    this.props.fetchNotes();
    fetchNotes(null, this.state.currentTag.id).then(notes => {
      this.setState({notes: notes})
    });
  }

  componentDidUpdate(prevProps, nextState) {
    let thing;
    thing = (this.state.currentTag) ? this.state.currentTag.id : null; 
    if (this.props.location.pathname != prevProps.location.pathname) {
      fetchNotes(null, thing).then(notes => {
        this.setState({notes: notes})
        this.setState({currentTag: this.props.currentTag})
      })
    }
    if (this.props.notes !== prevProps.notes) {
      fetchNotes(null, thing).then(notes => {
        this.setState({notes: notes})
        this.setState({currentTag: this.props.currentTag})
      })
    }
    if (this.props.currentTag != this.state.currentTag) {
      fetchNotes(null, null).then(notes => {
        this.setState({notes: notes})
        this.setState({currentTag: this.props.currentTag})
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

