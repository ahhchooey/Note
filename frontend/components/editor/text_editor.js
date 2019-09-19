import React from "react";
import {Link} from "react-router-dom";
import {Editor, getEventTransfer} from "slate-react";
import Plain from 'slate-plain-serializer';
import {Value, Text} from "slate";
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
import {table} from 'react-icons-kit/icomoon/table'
import defaultTable from "./default_table.json";
import TagBarContainer from "../note/tagbar_container.js";
import {enlarge} from 'react-icons-kit/icomoon/enlarge';
import {shrink} from 'react-icons-kit/icomoon/shrink';

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
      note: {},
      notebookTitle: this.props.notebookTitle
    }
    this.ref = (editor) => {
      this.editor = editor
    }
    this.timestamp = undefined;
    this.onChange = (editor) => {
      if (editor.value.document != this.state.value.document) {
        clearTimeout(this.timestamp);
        this.timestamp = setTimeout(() => {
          const content = JSON.stringify(editor.value.toJSON());
          let nt = Object.assign({}, this.state.note);
          nt.body = content;
          this.props.updateNote(nt).then((res) => {
            this.setState({note: res.note});
          })
        }, 1000)
      }
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
    this.onDropOrPaste = this.onDropOrPaste.bind(this);
    this.createTable = this.createTable.bind(this);
    this.expand = this.expand.bind(this);
    this.shrink = this.shrink.bind(this);
  }

  componentDidMount() {
    this.setState({note: this.props.note})
    this.handleInput();
  }

  componentDidUpdate(prevProps) {
    if (Object.keys(prevProps.note).length !== Object.keys(this.props.note).length) {
      this.setState({note: this.props.note})
    }
    if (prevProps.note !== this.props.note) {
      this.setState({note: this.props.note, value: Value.fromJSON(JSON.parse(this.props.note.body))})
    }
    if (this.props.notebookTitle !== this.state.notebookTitle) {
      this.setState({notebookTitle: this.props.notebookTitle})
    }
  }

  handleInput() {
    this.dropdown = document.querySelector(".nsmadr");
    this.button = document.querySelector(".note-show-more-actions-button");
    this.button.addEventListener("click", (e) => {
      e.stopPropagation();
      if (!this.dropdown.classList.contains("visible")) {
        this.dropdown.classList.add("visible");
      } else {
        this.dropdown.classList.remove("visible");
      }
    })
    document.addEventListener("click", (e) => {
      if (this.dropdown.classList.contains("visible")) {
        this.dropdown.classList.remove("visible");
      }
    });
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
    const { value } = editor
    const { document, selection } = value
    const { start, isCollapsed } = selection
    const startNode = document.getDescendant(start.key)

    if (isCollapsed && start.isAtStartOfNode(startNode)) {
      const previous = document.getPreviousText(startNode.key)

      if (!previous) {
        return next()
      }

      const prevBlock = document.getClosestBlock(previous.key)

      if (prevBlock.type === 'table-cell') {
        if (['Backspace', 'Delete', 'Enter'].includes(event.key)) {
          event.preventDefault()
        } else {
          return next()
        }
      }
    }

    if (value.startBlock.type !== 'table-cell') {
      return next()
    }

    switch (event.key) {
      case 'Backspace':
        return this.onBackspace(event, editor, next)
      case 'Delete':
        return this.onDelete(event, editor, next)
      case 'Enter':
        return this.onEnter(event, editor, next)
      default:
        return next()
    }

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
  
  onBackspace(event, editor, next) {
    const value = editor.value;
    const selection = value.selection;
    if (selection.start.offset !== 0) return next();
    event.preventDefault();
  }

  onDelete(event, editor, next) {
    const value = editor.value;
    const selection = value.selection;
    if (selection.end.offset !== value.startText.text.length) return next();
    e.preventDefault();
  }

  onDropOrPaste(event, editor, next) {
    const transfer = getEventTransfer(event);
    const value = editor.value;
    const {text = ""} = transfer;
    if (value.startBlock.type !== 'table-cell') return next();
    if (!text) return next();
    const lines = text.split('\n');
    const {document} = Plain.deserialize(lines[0] || '');
    editor.insertFragment(document);
  }

  onEnter(event, editor, next) {
    event.preventDefault();
  }

  renderMark(props, editor, next) {
    const { children, mark, attributes } = props

    switch (mark.type) {
      case 'bold':
        return <strong {...attributes}>{children}</strong>
      case 'code':
        return <code className="code-block" {...attributes}>{children}</code>
      case 'italic':
        return <em {...attributes}>{children}</em>
      case 'underlined':
        return <u {...attributes}>{children}</u>
      case 'highlight':
        return <mark {...attributes}>{children}</mark>

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
        return <li className="editor-list" {...attributes}>{children}</li>
      case 'numbered-list':
        return <ol {...attributes}>{children}</ol>
      case 'table':
        return (
          <table className="editor-table">
            <tbody {...attributes}>{children}</tbody>
          </table>
        )
      case 'table-row':
        return <tr className="editor-table-row" {...attributes}>{children}</tr>
      case 'table-cell':
        return <td className="editor-table-cell" {...attributes}>{children}</td>

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
      case "ic_highlight":
        thing = ic_highlight;
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
      case "table":
        thing = table;
        break;
      default:
        thing = undefined;
        break;
    }

    if (['numbered-list', 'bulleted-list', 'table'].includes(type)) {
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
    this.props.destroyNote(this.state.note.id).then(() => {
      this.props.history.push("/note/trash")
    });
  }

  createTable() {
    this.editor.insertBlock(defaultTable).moveEndForward(10);
  }

  expand(e) {
    $(".shrink-button").addClass("editor-es-button")
    $(".expand-button").removeClass("editor-es-button")
    $(".note-show").addClass("note-show-expanded")
    $(".note-show").removeClass("note-show-shrink")
  }

  shrink(e) {
    $(".expand-button").addClass("editor-es-button")
    $(".shrink-button").removeClass("editor-es-button")
    $(".note-show").removeClass("note-show-expanded")
    $(".note-show").addClass("note-show-shrink")
  }
  
  render() {
    let thing;
    if (this.state.note.notebook_id) {
      thing = this.props.note.id;
    }
    return (
      <React.Fragment>

        <div className="note-show-topbar">
          <div className="editor-tl expand-button editor-es-button" onClick={this.expand}>
            <img src="https://img.icons8.com/ios/50/000000/expand.png" /> 
          </div>
          <div className="editor-tl shrink-button" onClick={this.shrink}>
            <img src="https://img.icons8.com/ios/50/000000/collapse.png" /> 
          </div>
          <Link className="note-show-notebook-link"
            to={`/note/notebooks/${this.state.note.notebook_id}/notes/${this.state.note.id}`}>
            {this.state.notebookTitle}
          </Link>
          <IconIcon className="note-show-more-actions-button" icon={ic_more_vert} />
          
            <div className="nsmadr">
              <p>Note Actions</p>
              <div className="note-show-dropdown-buttons">
                <div onClick={this.deleteNote} className="destroy-note-button">
                  Delete Note
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
          {this.renderMarkButton('highlight', 'ic_highlight')}
          {this.renderMarkButton('code', 'ic_code')}
          {this.renderBlockButton('numbered-list', 'ic_format_list_numbered')}
          {this.renderBlockButton('bulleted-list', 'ic_format_list_bulleted')}
          <div className="custom-icon" onMouseDown={this.createTable}>
            <IconIcon icon={table} />
          </div>
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
            onDrop={this.onDropOrPaste}
            onPaste={this.onDropOrPaste}
          />
        </div>

        <div className="note-show-tagbar">
          <TagBarContainer noteId={thing} />
        </div>

      </React.Fragment>
    )
  }
}
