import React from "react";
import {Link} from "react-router-dom";
import {Editor} from "slate-react";
import {Value} from "slate";
import {isKeyHotkey} from "is-hotkey";
import {Button, Icon, Toolbar} from "./comps.js";
import IconIcon from "react-icons-kit";
import {ic_format_bold} from 'react-icons-kit/md/ic_format_bold';
import {ic_format_italic} from 'react-icons-kit/md/ic_format_italic';
import {ic_format_underlined} from 'react-icons-kit/md/ic_format_underlined';
import {ic_strikethrough_s} from 'react-icons-kit/md/ic_strikethrough_s';
import {ic_code} from 'react-icons-kit/md/ic_code';
import {ic_highlight} from 'react-icons-kit/md/ic_highlight';
import {ic_format_list_bulleted} from 'react-icons-kit/md/ic_format_list_bulleted';
import {ic_format_list_numbered} from 'react-icons-kit/md/ic_format_list_numbered';
import {ic_more_vert} from 'react-icons-kit/md/ic_more_vert';

const DEFAULT_NODE = "paragraph";
const isBoldHotkey = isKeyHotkey('mod+b')
const isItalicHotkey = isKeyHotkey('mod+i')
const isUnderlinedHotkey = isKeyHotkey('mod+u')
const isCodeHotkey = isKeyHotkey('mod+`')
const initialValue = ({
  document: {
    nodes: [
      {
        object: "block",
        type: "paragraph",
        nodes: [
          {
            object: "text",
            text: "",
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
      value: Value.fromJSON(initialValue),
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
    this.renderBlock = this.renderBlock.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onClickMark = this.onClickMark.bind(this);
    this.onClickBlock = this.onClickBlock.bind(this);
    this.hasMark = this.hasMark.bind(this);
    this.hasBlock = this.hasBlock.bind(this);
    this.renderMarkButton = this.renderMarkButton.bind(this);
    this.renderBlockButton = this.renderBlockButton.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
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

  hasMark(type) {
    return this.state.value.activeMarks.some(mark => (
      mark.type === type
    ))
  }

  hasBlock(type) {
    return this.state.value.blocks.some(thing => (
      thing.type === type
    ))
  }

  onClickMark(event, type) {
    event.preventDefault()
    this.editor.toggleMark(type)
  }

  onClickBlock(event, type) {
    event.preventDefault()

    const { editor } = this
    const { value } = editor
    const { document } = value

    // Handle everything but list buttons.
    if (type !== 'bulleted-list' && type !== 'numbered-list') {
      const isActive = this.hasBlock(type)
      const isList = this.hasBlock('list-item')

      if (isList) {
        editor
          .setBlocks(isActive ? DEFAULT_NODE : type)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list')
      } else {
        editor.setBlocks(isActive ? DEFAULT_NODE : type)
      }
    } else {
      // Handle the extra wrapping required for list buttons.
      const isList = this.hasBlock('list-item')
      const isType = value.blocks.some(block => {
        return !!document.getClosest(block.key, parent => parent.type === type)
      })

      if (isList && isType) {
        editor
          .setBlocks(DEFAULT_NODE)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list')
      } else if (isList) {
        editor
          .unwrapBlock(
            type === 'bulleted-list' ? 'numbered-list' : 'bulleted-list'
          )
          .wrapBlock(type)
      } else {
        editor.setBlocks('list-item').wrapBlock(type)
      }
    }
  }

  onKeyDown(event, editor, next) {
    let mark;

    if (isBoldHotkey(event)) {
      mark = 'bold'
    } else if (isItalicHotkey(event)) {
      mark = 'italic'
    } else if (isUnderlinedHotkey(event)) {
      mark = 'underlined'
    } else if (isCodeHotkey(event)) {
      mark = 'code'
    } else {
      return next()
    }

    event.preventDefault()
    editor.toggleMark(mark)
  }

  renderMark(props, editor, next) {
    const { children, mark, attributes } = props

    switch (mark.type) {
      case 'bold':
        return <strong {...attributes}>{children}</strong>
      case 'code':
        return <code {...attributes}>{children}</code>
      case 'italic':
        return <em {...attributes}>{children}</em>
      case 'underlined':
        return <u {...attributes}>{children}</u>
      default:
        return next()
    }
  }

  renderBlock(props, editor, next) {
    const { attributes, children, node } = props

    switch (node.type) {
      case 'bulleted-list':
        return <ul {...attributes}>{children}</ul>
      case 'heading-one':
        return <h1 {...attributes}>{children}</h1>
      case 'heading-two':
        return <h2 {...attributes}>{children}</h2>
      case 'list-item':
        return <li {...attributes}>{children}</li>
      case 'numbered-list':
        return <ol {...attributes}>{children}</ol>
      default:
        return next()
    }
  }

  renderMarkButton(type, icon) {
    let isActive = this.hasMark(type);
    let thing;
    switch(icon) {
      case "ic_format_bold":
        thing = ic_format_bold;
        break;
      case "ic_format_italic":
        thing = ic_format_italic;
        break;
      case "ic_format_underlined":
        thing = ic_format_underlined;
        break;
      case "ic_code":
        thing = ic_code;
        break;
      default:
        thing = ic_format_bold;
        break;
    }

    return (
      <Button
        active={isActive}
        onMouseDown={event => this.onClickMark(event, type)}
      >
        <IconIcon icon={thing} />
      </Button>
    )
  }

  renderBlockButton(type, icon) {
    let isActive = this.hasBlock(type)
    let thing;
    switch(icon) {
      case "ic_format_list_numbered":
        thing = ic_format_list_numbered;
        break;
      case "ic_format_list_bulleted":
        thing = ic_format_list_bulleted;
        break;
      default:
        thing = undefined;
        break;
    }

    if (['numbered-list', 'bulleted-list'].includes(type)) {
      const { value: { document, blocks } } = this.state

      if (blocks.size > 0) {
        const parent = document.getParent(blocks.first().key)
        isActive = this.hasBlock('list-item') && parent && parent.type === type
      }
    }

    return (
      <Button
        active={isActive}
        onMouseDown={event => this.onClickBlock(event, type)}
      >
        {(thing) ? <IconIcon icon={thing} /> : <Icon>{icon}</Icon>}
      </Button>
    )
  }

  deleteNote() {
    this.props.destroyNote(this.state.note.id);
  }

  render() {
    return (
      <React.Fragment>

        <div className="note-show-topbar">
          <Link className="note-show-notebook-link"
            to={`/note/notebooks/${this.state.note.notebook_id}/notes/${this.state.note.id}`}>
            {this.props.notebookTitle}
          </Link>
          <IconIcon className="note-show-more-actions-button" icon={ic_more_vert} />
          
          <div className="note-dropdown-holder">
            <div className={`note-show-more-actions-dropdown`}>
              <p>Note Actions</p>
              <div className="note-show-dropdown-buttons">
                <div onClick={this.deleteNote} className="destroy-note-button">
                  Delete Note
                </div>  
              </div>
            </div>
          </div>
        </div>

        <Toolbar>
          {this.renderBlockButton('heading-one', 'h1')}
          {this.renderBlockButton('heading-two', 'h2')}
          {this.renderMarkButton('bold', "ic_format_bold")}
          {this.renderMarkButton('italic', 'ic_format_italic')}
          {this.renderMarkButton('underlined', 'ic_format_underlined')}
          {this.renderMarkButton('code', 'ic_code')}
          {this.renderBlockButton('numbered-list', 'ic_format_list_numbered')}
          {this.renderBlockButton('bulleted-list', 'ic_format_list_bulleted')}
        </Toolbar>

        <div className="editor">
          <input className="editor-title-input" placeholder="Title"
            type="text" onChange={this.updateTitle} value={this.state.note.title || ""} />
          <Editor
            autoFocus
            spellCheck
            placeholder="Start typing here..."
            className="text-editor"
            ref={this.ref}
            value={this.state.value}
            onChange={this.onChange}
            renderMark={this.renderMark}
            renderBlock={this.renderBlock}
            onKeyDown={this.onKeyDown}
          />
        </div>

        <div className="note-show-tagbar">
          Tags 
        </div>

      </React.Fragment>
    )
  }
}
