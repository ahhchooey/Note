import React from "react";
import TagIndexItem from "./tag_index_item.jsx";


export default class TagIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: {}
    }
    this.showModal = this.showModal.bind(this);
  }

  componentDidMount() {
    this.props.fetchTags().then(res => {
      this.setState({tags: res.tags})
    })
  }

  showModal() {

  }

  render() {
    return (
      <div className="tag-index">

        <div className="tag-index-head">
          <h2>Tags</h2>
          <input type="text" placeholder="Find Tags..." />
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

        <div className="tag-index-break-bar"></div>

        <div>i am real tag index</div>

      </div>
    )
  }
}
