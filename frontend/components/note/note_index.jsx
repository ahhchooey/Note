import React from "react";

import NoteIndexItem from "./note_index_item.jsx";
import {fetchNotes} from "../../utils/api_note_util.js";


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

  render() {
    return (
      <div className="notes-index">
        {
          Object.values(this.state.notes).map(note => (
            <NoteIndexItem key={note.id} note={note} />
          ))
        } 
      </div>
    )
  }
}
