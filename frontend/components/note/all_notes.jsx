import React from "react";
import AllNotesIndexContainer from "./all_notes_index_container.js";
import {fetchNotes} from "../../utils/api_note_util.js";

export default class AllNotes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 0
    }
  }

  componentDidMount() {
    this.fetchNumber();
  }

  fetchNumber() {
    fetchNotes().then(notes => this.setState({number: Object.keys(notes).length}));
  }

  render() {
    return (
      <div className="all-notes-box">
        <div className="all-notes-show-box">
          <h3>All Notes</h3>
          <div className="all-notes-show-box-bottom">
            <p>{this.state.number} notes</p>
            <div className="all-notes-show-box-buttons">
              <img src="https://img.icons8.com/ios/50/000000/generic-sorting-2.png" />
              <img src="https://img.icons8.com/ios/50/000000/tags.png" />   
            </div>
          </div>
        </div>
        <AllNotesIndexContainer />
      </div>
    )
  }
}
