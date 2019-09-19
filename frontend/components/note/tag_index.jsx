import React from "react";
import TagIndexItem from "./tag_index_item.jsx";
import {sortTagsByTitle} from "../../utils/sorting_util.jsx";
import TagCreateFormContainer from "./tag_create_form_container.js";


export default class TagIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: {},
      search: ""
    }
    this.showModal = this.showModal.bind(this);
    this.search = this.search.bind(this);
  }

  componentDidMount() {
    this.props.fetchTags().then(res => {
      this.setState({tags: res.tags})
    })
  }

  componentDidUpdate(prevProps) {
    if (Object.keys(this.props.tags).length !== Object.keys(prevProps.tags).length) {
      this.props.fetchTags().then(res => {
        this.setState({tags: res.tags})
      })
    }
    let a = Object.values(this.props.tags).map(tag => tag.title).sort();
    let b = Object.values(prevProps.tags).map(tag => tag.title).sort()
    if (JSON.stringify(a) !== JSON.stringify(b)) {
      this.props.fetchTags().then(res => {
        this.setState({tags: res.tags})
      })
    }
  }

  showModal() {
    let modal = document.querySelector(".notebook-create-form-modal");
    if (modal) {
      modal.classList.add("notebook-create-form-modal-active");
    }
  }

  search(e) {
    this.setState({search: e.target.value})
  }

  render() {
    let sortedTags = sortTagsByTitle(Object.values(this.state.tags));
    if (sortedTags.length > 0) {
      sortedTags = sortedTags.filter(tag => tag.title.toLowerCase().includes(this.state.search.toLowerCase()))
    }
    let lastChar;
    let tags;
    if (sortedTags.length > 0) {
      tags = sortedTags.map(tag => {
        let thing;
        if (lastChar != tag.title[0].toUpperCase()) {
          lastChar = tag.title[0].toUpperCase();
          thing = (
            <React.Fragment key={lastChar + "frag"}>
              <div className="tag-head-letter" key={lastChar}>{tag.title[0].toUpperCase()}</div>
              <TagIndexItem addCurrentTag={this.props.addCurrentTag} key={tag.id} tag={tag} 
                updateTag={this.props.updateTag} destroyTag={this.props.destroyTag}
              />
            </React.Fragment>
          )
        } else {
          thing = <TagIndexItem addCurrentTag={this.props.addCurrentTag} key={tag.id} tag={tag} 
            destroyTag={this.props.destroyTag} updateTag={this.props.updateTag} 
          />
        }
        return thing;
      })
    }
    return (
      <div className="tag-index">

        <div className="tag-index-head">
          <h2>Tags</h2>
          <input type="text" placeholder="Find Tags..." onChange={this.search} value={this.state.search} />
        </div>

        <div className="tag-index-table-head">
          <h3>My Tags List</h3>
          <div className="tag-index-table-head-buttons">
            <div onClick={this.showModal} className="new-tag-button">
              <img src="https://img.icons8.com/ios/50/000000/tags.png" />
              + New Tag 
            </div>
          </div>
        </div>
        <TagCreateFormContainer />
        <div className="tag-index-break-bar"></div>

        <div className="tag-table">
          {tags} 
        </div>

      </div>
    )
  }
}
