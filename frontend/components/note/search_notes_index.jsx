import React from "react";

import SearchNotesIndexItem from "./search_notes_index_item.jsx";
import {fetchNotes} from "../../utils/api_note_util.js";
import {sortNotesByDate} from "../../utils/sorting_util.jsx";
import {Value} from "slate";


export default class SearchNotesIndex extends React.Component {
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
  }

  render() {
    let sortedNotes = sortNotesByDate(Object.values(this.state.notes));
    if (sortedNotes.length > 0) {
      sortedNotes = sortedNotes.filter(note => {
        let parsed = note.title + Value.fromJSON(JSON.parse(note.body)).document.text;
        return parsed.toLowerCase().includes(this.props.match.params.search)  
      })
    }
    
    return (
      <div className="notes-index">
        <p className="search-notes-count">{sortedNotes.length} notes</p>
        {
          sortedNotes.map(note => (
            <SearchNotesIndexItem key={note.id} note={note} currentNote={this.props.currentNote}
            notebookId={this.props.notebookId} />
          ))
        } 
      </div>
    )
  }
}

