import React from "react";
import {Editor} from "slate-react";
import {Value} from "slate";
import Icon from "react-icons-kit";


const initialValue = Value.fromJSON({
  document: {
    nodes: [
      {
        object: "block",
        type: "paragraph",
        nodes: [
          {
            object: "text",
            text: "Hello, I am Slate.",
          }
        ]
      }
    ]
  }
});

export default class TextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: initialValue,
      note: {}
    }
    this.updateTitle = this.updateTitle.bind(this);

    this.ref = (editor) => {
      this.editor = editor
    }
    this.onChange = (editor) => {
      this.setState({value: editor.value})
    } 
  }

  componentDidMount() {
    this.setState({note: this.props.note})
  }

  componentDidUpdate(prevProps) {
    if (Object.keys(prevProps.note).length !== Object.keys(this.props.note).length) {
      this.setState({note: this.props.note})
    }
    if (prevProps.note !== this.props.note) {
      this.setState({note: this.props.note})
    }
  }

  updateTitle(e) {
    let nt = this.state.note;
    nt.title = e.target.value;
    this.setState({note: nt}, () => {
      this.props.updateNote(this.state.note);
    });
  }

  render() {
    return (
      <React.Fragment>

        <input type="text" onChange={this.updateTitle} value={this.state.note.title || ""} />
        <Editor
          autoFocus
          spellCheck
          className="text-editor"
          ref={this.ref}
          value={this.state.value}
          onChange={this.onChange}
        />

      </React.Fragment>
    )
  }
}
