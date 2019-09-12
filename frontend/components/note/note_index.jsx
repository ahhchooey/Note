import React from "react";


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
    console.log(this.state)
    return (
      <div className="notes-index">
        {
          Object.values(this.state.notes).map(note => note.title)
        } 
      </div>
    )
  }
}
