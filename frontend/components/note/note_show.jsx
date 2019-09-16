import React from "react";
import {fetchNote} from "../../utils/api_note_util.js";
import {fetchNotebook} from "../../utils/api_notebook_util.js";

import TextEditorContainer from "../editor/text_editor_containter.js";


export default class NoteShow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      note: {},
      notebookTitle: ""
    }
  }

  componentDidMount() {
    this.props.fetchNotes();
    fetchNote(this.props.noteId).then(note => {
      this.setState({note: note},
        () => {
          this.props.fetchCurrentNote(this.state.note);
          fetchNotebook(this.state.note.notebook_id).then(res => {
            this.setState({notebookTitle: res.title})
          })
        } 
      )
    })
  }

  componentDidUpdate(nextProps, nextState) {
    if (this.props.location.pathname != nextProps.location.pathname) {
      fetchNote(this.props.noteId).then(note => {
        this.setState({note: note},
          () => {
            this.props.fetchCurrentNote(this.state.note);
          } 
        )
      })
    }
  }

  render() {
    return (
      <div className="note-show">
        <TextEditorContainer notebookTitle={this.state.notebookTitle} note={this.state.note} />
      </div>
    )
  }
}
