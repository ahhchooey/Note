import React from "react";
import TagBarItem from "./tagbar_item.jsx";
import {fetchTags} from "../../utils/api_tag_util.js";


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

  componentDidUpdate() {
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
    console.log(this.state)
  }

  render() {
    let tagsArray = Object.values(this.state.tags);
    let tags = "";
    tags = tagsArray.map(tag => {
      return <TagBarItem key={tag.id} tag={tag} />
    }) 
    return (
      <React.Fragment>
        {tags}
        <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="Add Tag..." value={this.state.input}
            onChange={this.handleChange}
          />
        </form>
      </React.Fragment>
    )
  }
}
