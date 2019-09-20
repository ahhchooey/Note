import React from "react";

import NoteIndexItem from "./note_index_item.jsx";
import {fetchNotes} from "../../utils/api_note_util.js";
import {sortNotesByDate, sortNotesByTitle} from "../../utils/sorting_util.jsx";


export default class NoteIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: {},
      currentTag: this.props.currentTag || {},
      sortedBy: "time"
    }
  }

  componentDidMount() {
    this.props.fetchNotes();
    fetchNotes(this.props.notebookId, this.state.currentTag.id).then(notes => {
      this.setState({notes: notes}, () => {
        let sortedNotes = sortNotesByDate(Object.values(this.state.notes));
        this.props.fetchCurrentNote(sortedNotes[0])
        if (this.props.location.pathname.startsWith("/note/notebooks")) {
          if (sortedNotes.length === 0) {
            this.props.history.push(`/note/notebooks/${this.props.notebookId}`)
          } else {
            this.props.history.push(`/note/notebooks/${this.props.notebookId}/notes/${sortedNotes[0].id}`)
          }
        }
      })
    });
  }

  componentDidUpdate(prevProps, nextState) {
    let thing = (this.state.currentTag) ? this.state.currentTag.id : null; 
    let thing2 = (this.props.currentTag) ? this.props.currentTag.id : null;
    if (this.props.location.pathname != prevProps.location.pathname) {
      fetchNotes(this.props.notebookId, thing).then(notes => {
        this.setState({notes: notes})
        this.setState({currentTag: this.props.currentTag})
      })
    }
    if (this.props.notes !== prevProps.notes) {
      fetchNotes(this.props.notebookId, thing).then(notes => {
        this.setState({notes: notes})
        this.setState({currentTag: this.props.currentTag})
      })
    }
    if (this.props.currentTag != this.state.currentTag) {
      fetchNotes(this.props.notebookId, thing2).then(notes => {
        this.setState({notes: notes})
        this.setState({currentTag: this.props.currentTag})
      })
    }
    if (this.props.sortedBy !== this.state.sortedBy) {
      this.setState({sortedBy: this.props.sortedBy})
    }
    if (this.props.match.params.id !== prevProps.match.params.id) {
      let thing3 = this.state.currentTag ? this.state.currentTag.id : null;
      fetchNotes(this.props.notebookId, thing3).then(notes => {
        this.setState({notes: notes}, () => {
          let sortedNotes = sortNotesByDate(Object.values(this.state.notes));
          this.props.fetchCurrentNote(sortedNotes[0])
          if (this.props.location.pathname.startsWith("/note/notebooks")) {
            if (sortedNotes.length === 0) {
              this.props.history.push(`/note/notebooks/${this.props.notebookId}`)
            } else {
              this.props.history.push(`/note/notebooks/${this.props.notebookId}/notes/${sortedNotes[0].id}`)
            }
          }
        })
      });
    }
  }

  render() {
    let sortedNotes = sortNotesByDate(Object.values(this.state.notes));
    if (this.state.sortedBy === "time") {
      sortedNotes = sortNotesByDate(sortedNotes)
    } else if (this.state.sortedBy === "title") {
      sortedNotes = sortNotesByTitle(sortedNotes)
    }

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

