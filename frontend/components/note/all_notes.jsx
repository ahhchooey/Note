import React from "react";
import AllNotesIndexContainer from "./all_notes_index_container.js";
import {fetchNotes} from "../../utils/api_note_util.js";

export default class AllNotes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 0,
      tags: {}
    }
    this.removeCurrentTag = this.removeCurrentTag.bind(this);
    this.handleTagDropdownClick = this.handleTagDropdownClick.bind(this);
    this.setCurrentTag = this.setCurrentTag.bind(this);
  }

  componentDidMount() {
    this.fetchNumber();
    this.props.fetchTags().then(res => {
      this.setState({tags: res.tags})
    })
    this.handleTagDropdownClick();
  }

  handleTagDropdownClick() {
    $(".tag-dropdown-button").on("click", (e) => {
      e.stopPropagation();
      $(".tag-filter-dropdown").toggleClass("visible")
    })
    document.addEventListener("click", (e) => {
      if ($(".tag-filter-dropdown").hasClass("visible")) {
        $(".tag-filter-dropdown").removeClass("visible")
      }
    }) 
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

  setCurrentTag(tag) {
    return (e) => {
      e.preventDefault();
      this.props.addCurrentTag(tag);
    }
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
    let frog = Object.values(this.state.tags);
    frog = frog.map(tag => {
      return (
        <div className="tag-filter-index-item" key={tag.id} onClick={this.setCurrentTag(tag)}>
          {tag.title}
        </div>
      )
    })

    return (
      <div className="all-notes-box">
        <div className="all-notes-show-box">
          <h3>All Notes</h3>

          <div className="all-notes-show-box-bottom">
            <p>{this.state.number} notes</p>
            {cow}
            <div className="all-notes-show-box-buttons">
              <img src="https://img.icons8.com/ios/50/000000/generic-sorting-2.png" />
              <img className="tag-dropdown-button" src="https://img.icons8.com/ios/50/000000/tags.png" />   
              <div className="tag-filter-dropdown">
                <p>Filter By Tag</p>
                <div className="tag-filter-index">
                  {frog} 
                </div>
              </div>
            </div>
          </div>

        </div>
        <AllNotesIndexContainer />
      </div>
    )
  }
}
