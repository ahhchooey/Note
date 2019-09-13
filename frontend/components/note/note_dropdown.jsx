import React from "react";

import {fetchNotes} from "../../utils/api_note_util.js";
import NoteDropDownItem from "./note_dropdown_item.jsx";


export default class NoteDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: {}
    }
  }

  componentDidMount() {
    fetchNotes(this.props.identity).then(res => {
      this.setState({notes: res})
    })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.notes !== this.props.notes) {
      fetchNotes(this.props.identity).then(res => {
        this.setState({notes: res})
      })
    }
  }

  render() {
    return(
      <div className={`${this.props.ndd} note-dropdown`}>
        {
          Object.values(this.state.notes).map(note => (
            <NoteDropDownItem key={note.id} destroyNote={this.props.destroyNote} note={note} />
          ))
        } 
      </div>
    )
  }
}
