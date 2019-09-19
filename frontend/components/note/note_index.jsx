import React from "react";

import NoteIndexItem from "./note_index_item.jsx";
import {fetchNotes} from "../../utils/api_note_util.js";
import {sortNotesByDate} from "../../utils/sorting_util.jsx";


export default class NoteIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: {},
      currentTag: this.props.currentTag || {}
    }
  }

  componentDidMount() {
    this.props.fetchNotes();
    fetchNotes(this.props.notebookId, this.state.currentTag.id).then(notes => {
      this.setState({notes: notes})
    });
  }

  componentDidUpdate(prevProps, nextState) {
    let thing = (this.state.currentTag) ? this.state.currentTag.id : null; 
    let thing2 = (this.props.currentTag) ? this.props.currentTag.id : null;
    console.log("change")
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
      console.log("tag changed", this.props.currentTag)
      fetchNotes(this.props.notebookId, thing2).then(notes => {
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
            <NoteIndexItem key={note.id} note={note} currentNote={this.props.currentNote}
            notebookId={this.props.notebookId} />
          ))
        } 
      </div>
    )
  }
}

