import React from "react";
import {Editor} from "slate-react";
import {Value} from "slate";
import Icon from "react-icons-kit";

import {CodeBlock, HighlightBlock, OrderedList, UnorderedList} from "./blocks.js";
import Toolbar from "./toolbar.js";
import {ic_format_bold} from 'react-icons-kit/md/ic_format_bold';
import {ic_format_italic} from 'react-icons-kit/md/ic_format_italic';
import {ic_format_underlined} from 'react-icons-kit/md/ic_format_underlined';
import {ic_strikethrough_s} from 'react-icons-kit/md/ic_strikethrough_s';
import {ic_code} from 'react-icons-kit/md/ic_code';
import {ic_highlight} from 'react-icons-kit/md/ic_highlight';
import {ic_format_list_bulleted} from 'react-icons-kit/md/ic_format_list_bulleted';
import {ic_format_list_numbered} from 'react-icons-kit/md/ic_format_list_numbered';


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
        return <u className="underline" {...props.attributes}>{props.children}</u>
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
          <button className="tooltip-icon-button"
            onPointerDown={(e) => this.onMarkClick(e, "italic")}>
            <Icon icon={ic_format_italic} />   
          </button>
          <button className="tooltip-icon-button"
            onPointerDown={(e) => this.onMarkClick(e, "underline")}>
            <Icon icon={ic_format_underlined} />   
          </button>
          <button className="tooltip-icon-button"
            onPointerDown={(e) => this.onMarkClick(e, "strike")}>
            <Icon icon={ic_strikethrough_s} />   
          </button>

          <button className="tooltip-icon-button"
            onPointerDown={(e) => this.onMarkClick(e, "code")}>
            <Icon icon={ic_code} />   
          </button>
          <button className="tooltip-icon-button"
            onPointerDown={(e) => this.onMarkClick(e, "highlight")}>
            <Icon icon={ic_highlight} />   
          </button>
          <button className="tooltip-icon-button"
            onPointerDown={(e) => this.onMarkClick(e, "unordered")}>
            <Icon icon={ic_format_list_bulleted} />   
          </button>
          <button className="tooltip-icon-button"
            onPointerDown={(e) => this.onMarkClick(e, "ordered")}>
            <Icon icon={ic_format_list_numbered} />   
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
