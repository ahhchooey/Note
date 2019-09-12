import React from "react";
import {fetchNote} from "../../utils/api_note_util.js";


export default class NoteShow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      note: {}
    }
  }

  componentDidMount() {
    this.props.fetchNotes();
    fetchNote(this.props.noteId).then(note => {
      this.setState({note: note})
    })
  }

  componentDidUpdate(nextProps, nextState) {
    if (this.props.location.pathname != nextProps.location.pathname) {
      fetchNote(this.props.noteId).then(note => {
        this.setState({note: note})
      })
    }
  }

  render() {
    return (
      <div className="note-show">
        <h1>{this.state.note.title}</h1>
      </div>
    )
  }
}
