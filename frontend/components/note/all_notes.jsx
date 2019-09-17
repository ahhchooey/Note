import React from "react";
import AllNotesIndexContainer from "./all_notes_index_container.js";
import {fetchNotes} from "../../utils/api_note_util.js";

export default class AllNotes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 0
    }
    this.removeCurrentTag = this.removeCurrentTag.bind(this);
  }

  componentDidMount() {
    this.fetchNumber();
  }

  componentDidUpdate(nextProps) {
    if (this.props.location.pathname != nextProps.location.pathname) {
      this.fetchNumber();
    }
  }

  fetchNumber() {
    fetchNotes().then(notes => this.setState({number: Object.keys(notes).length}));
  }

  removeCurrentTag() {
    this.props.removeCurrentTag();
  }

  render() {
    let cow = "";
    if (this.props.currentTag) {
      cow = (
        <div className="current-tag-button">
          <span>{this.props.currentTag.title}</span>
          <div className="remove-current-tag-button" 
            onClick={this.removeCurrentTag}>
            &#9747;
          </div>
        </div>
      )
    }

    return (
      <div className="all-notes-box">
        <div className="all-notes-show-box">
          <h3>All Notes</h3>

          <div className="all-notes-show-box-bottom">
            <p>{this.state.number} notes</p>
            {cow}
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
