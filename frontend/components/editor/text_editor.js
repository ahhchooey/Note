import React from "react";
import {Editor} from "slate-react";
import {Value} from "slate";
import Icon from "react-icons-kit";

import {CodeBlock, HighlightBlock, OrderedList, UnorderedList} from "./blocks.js";
import Toolbar from "./toolbar.js";
import {ic_format_bold} from 'react-icons-kit/md/ic_format_bold'


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
    this.ref = (editor) => {
      this.editor = editor
    }
    this.onChange = (editor) => {
      this.setState({value: editor.value})
    } 

    this.updateTitle = this.updateTitle.bind(this);
    this.renderMark = this.renderMark.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onMarkClick = this.onMarkClick.bind(this);
  }

  componentDidMount() {
    this.setState({note: this.props.note})
  }

  renderMark(props, _editor, next) {
    switch(props.mark.type) {
      case "bold":
        return <strong {...props.attributes}>{props.children}</strong> 
      case "italic":
        return <em {...props.attributes}>{props.children}</em>
      case "underline":
        return <u {...props.attributes}>{props.children}</u>
      case "strike":
        return <strike {...props.attributes}>{props.children}</strike>

      case "code":
        return <CodeBlock {...props} />
      case "highlight":
        return <HighlightBlock {...props} />
      case "ordered":
        return <OrderedList {...props} />
      case "unordered":
        return <UnorderedList {...props} />

      default:
        return next();
    }
  }

  onKeyDown(e, editor, next) {
    if (!e.metaKey) {return};
    
    switch(e.key) {
      case "b":
        editor.toggleMark("bold");
        return true;
      case "i":
        editor.toggleMark("italic");
        return true;
      case "u":
        editor.toggleMark("underline");
        return true;
      case "`":
        console.log("hi")
        editor.toggleMark("code");
        return true;

      default:
        return next();
    }
  }

  onMarkClick(e, type) {
    e.preventDefault();
    this.editor.toggleMark(type);
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

        <div>this is a thing</div>
        <Toolbar>
          <button className="tooltip-icon-button"
            onPointerDown={(e) => this.onMarkClick(e, "bold")}>
            <Icon icon={ic_format_bold} />   
          </button>
        </Toolbar>

        <div className="editor">
          <input className="editor-title-input" placeholder="Title"
            type="text" onChange={this.updateTitle} value={this.state.note.title || ""} />
          <Editor
            autoFocus
            spellCheck
            className="text-editor"
            ref={this.ref}
            value={this.state.value}
            onChange={this.onChange}
            renderMark={this.renderMark}
            onKeyDown={this.onKeyDown}
          />
        </div>

      </React.Fragment>
    )
  }
}
