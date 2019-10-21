import React from "react";
import TagBarItem from "./tagbar_item.jsx";
import {fetchTags} from "../../utils/api_tag_util.js";
import {linkNoteTag} from "../../utils/api_notes_tags_util.js";


export default class TagBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      noteId: null,
      tags: {},
      input: "",
      allTags: {}
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({noteId: this.props.noteId})
    fetchTags().then(res => {
      this.setState({allTags: res})
    })
  }

  componentDidUpdate(prevProps) {
    if (this.state.noteId != this.props.noteId) {
      this.setState({noteId: this.props.noteId})
      fetchTags(this.props.noteId).then(res => {
        this.setState({tags: res})
      })
    }
  }

  handleChange(e) {
    this.setState({input: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault();
    let allTagsArray = Object.values(this.state.allTags);
    if (allTagsArray.some(tag => tag.title === this.state.input)) {
      let tag = allTagsArray.find(tag => tag.title === this.state.input);
      linkNoteTag(this.props.noteId, tag.id).then(() => {
        fetchTags(this.props.noteId).then(res => {
          this.setState({tags: res})
        })
      })
      this.setState({input: ""})
    } else {
      this.props.createTag({title: this.state.input}).then(res => {
        linkNoteTag(this.props.noteId, res.tag.id).then(() => {
          fetchTags().then(res => {
            this.setState({allTags: res})
          })
          fetchTags(this.props.noteId).then(res => {
            this.setState({tags: res})
          })
        })
      })
      this.setState({input: ""})
    }
  }

  render() {
    let tagsArray = Object.values(this.state.tags);
    let tags = "";
    tags = tagsArray.map(tag => {
      return <TagBarItem key={tag.id} noteId={this.props.noteId} tag={tag} />
    }) 
    return (
      <React.Fragment>
        {tags}
        <form onSubmit={this.handleSubmit}>
          <input maxLength="10" type="text" placeholder="Enter New Tag..." value={this.state.input}
            onChange={this.handleChange}
          />
        </form>
      </React.Fragment>
    )
  }
}
