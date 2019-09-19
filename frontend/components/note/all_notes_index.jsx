import React from "react";

import AllNotesIndexItem from "./all_notes_index_item.jsx";
import {fetchNotes} from "../../utils/api_note_util.js";
import {sortNotesByDate, sortNotesByTitle} from "../../utils/sorting_util.jsx";


export default class AllNotesIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: {},
      currentTag: this.props.currentTag || {},
      sortedBy: "time"
    }
  }

  componentDidMount() {
    let thing = this.state.currentTag ? this.state.currentTag.id : null;
    this.props.fetchNotes();
    fetchNotes(null, thing).then(notes => {
      this.setState({notes: notes}, () => {
          let sortedNotes = sortNotesByDate(Object.values(this.state.notes));
          if (this.props.location.pathname.startsWith("/note/notes")) {
            if (sortedNotes.length === 0) {
              this.props.history.push(`/note/notes/`)
            } else {
              this.props.history.push(`/note/notes/${sortedNotes[0].id}`)
            }
          }

      })
    });
  }

  componentDidUpdate(prevProps, nextState) {
    let thing = (this.state.currentTag) ? this.state.currentTag.id : null; 
    let thing2 = (this.props.currentTag) ? this.props.currentTag.id : null;
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
      fetchNotes(null, thing2).then(notes => {
        this.setState({notes: notes})
        this.setState({currentTag: this.props.currentTag})
      })
    }
    if (this.props.sortedBy !== this.state.sortedBy) {
      this.setState({sortedBy: this.props.sortedBy})
    }
  }

  sortBy(array, method) {
    return method(array)
  }

  render() {
    let sortedNotes = Object.values(this.state.notes);
    if (this.state.sortedBy === "time") {
      sortedNotes = sortNotesByDate(sortedNotes)
    } else if (this.state.sortedBy === "title") {
      sortedNotes = sortNotesByTitle(sortedNotes)
    }

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

