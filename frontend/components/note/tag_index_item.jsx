import React from "react";


export default class TagIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tag: {}
    }
  }

  render() {
    return (
      <h3>i am a tag index item</h3>
    )
  }
}
