import React from "react";


export default class NotebookShow extends React.Component {
  constructor(props) {
    super(props);
    this.mounted = false;
  }

  componentDidMount() {
    this.mounted = true;
    this.props.fetchNotebook(this.props.id);
    console.log(this.props.notebook);
  }

  

  render() {
    if (!this.mounted) return(
      <p>loading...</p>
    );
    return (
      <div className="notebook-show">
        <div className="notebook-show-title">{this.props.notebook.title}</div>
      </div>
    )
  }
}
