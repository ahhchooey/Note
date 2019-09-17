import React from "react";
import {unlinkNoteTag} from "../../utils/api_notes_tags_util.js";


export default class TagBarItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tag: {},
      deleted: false
    }
    this.unlinkNoteTag = this.unlinkNoteTag.bind(this);
  }

  componentDidMount() {
    this.setState({tag: this.props.tag})
  }

  unlinkNoteTag(e) {
    e.preventDefault();
    unlinkNoteTag(this.props.noteId, this.state.tag.id).then(res => {
      this.setState({deleted: true})
    })
  }

  render() {
    if (this.state.deleted) {
      return (
        <span></span>
      )
    };
    return (
      <div className="tag-button-ten">
        <span>{this.state.tag.title}</span>
        <div className="remove-current-tag-button" 
          onClick={this.unlinkNoteTag}>
          &#9747;
        </div>
      </div>
    )
  }
}
