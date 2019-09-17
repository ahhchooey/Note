import React from "react";
import {Link} from "react-router-dom";


export default class TagIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tag: {}
    }
    this.addCurrentTag = this.addCurrentTag.bind(this);
  }

  componentDidMount() {
    this.setState({tag: this.props.tag})
  }

  componentDidUpdate() {
    if (this.state.tag != this.props.tag) {
      this.setState({tag: this.props.tag})
    }
  }

  addCurrentTag() {
    this.props.addCurrentTag(this.state.tag)
  }

  render() {
    return (
      <Link className="tag-index-item" to={"/note/notes"}
        onClick={this.addCurrentTag} 
      >
        {this.state.tag.title}
      </Link>
    )
  }
}
