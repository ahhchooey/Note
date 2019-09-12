import React from "react";

import NoteIndexItem from "./note_index_item.jsx";


export default class NoteIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: {}
    }
  }

  componentDidMount() {
    this.props.fetchNotes().then(res => {
      this.setState({notes: res.notes})
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
