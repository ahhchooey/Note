import React from "react";
import {Link} from "react-router-dom";

import {receiveCurrentNotebook} from "../../actions/ui_actions.js";


export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
    this.notebookDropdown = this.notebookDropdown.bind(this);
    this.hideNotebookDropdown = this.hideNotebookDropdown.bind(this);
    this.pushHis = this.pushHis.bind(this);
    this.makeNote = this.makeNote.bind(this);
    this.state = {
      notebooks: {}
    }
    this.extraButtons = false;
  }

  componentDidMount() {
    this.dropdown = document.querySelector(".username-button-dropdown");
    this.button = document.querySelector(".username-button");
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
    this.buttonHighlighter();
    this.initialHighligher();
    this.props.fetchNotes();
    this.props.fetchNotebooks().then(res => this.setState({notebooks: res.notebooks}));
     
  }

  initialHighligher() {
    let path = this.props.location.pathname;
    switch(true) {
      case path.startsWith("/note/notes"):
        $(".all-notes-button").addClass("side-button-active")
        break;
      case path.startsWith("/note/notebooks"):
        $(".notebooks-button").addClass("side-button-active")
        break;
      case path.startsWith("/note/tags"):
        $(".tags-button").addClass("side-button-active")
        break;
      case path.startsWith("/note/trash"):
        $(".trash-button").addClass("side-button-active")
        break;
    }
  }

  buttonHighlighter() {
    let buttons = $(".side-button");
    buttons.on("click", (e) => {
      Array.from(buttons).forEach(button => {
        button.classList.remove("side-button-active");
      })
      e.target.classList.add("side-button-active");
    });
  }

  componentDidUpdate(nextProps, nextState) {
    if (!this.extraButtons) {
      this.extraButtons = true;
      this.buttonHighlighter();
    }
    if (this.props.location.pathname != nextProps.location.pathname) {
      this.props.fetchNotebooks();
    }
  }

  notebookDropdown(e) {
    e.stopPropagation();
    e.target.classList.remove("visible");
    $(".down-arrow").addClass("visible");
    $(".notebook-dropdown").addClass("visible");
  }

  hideNotebookDropdown(e) {
    e.stopPropagation();
    e.target.classList.remove("visible");
    $(".right-arrow").addClass("visible");
    $(".notebook-dropdown").removeClass("visible");
  }

  logout() {
    this.props.logout();
  }

  pushHis(id) {
    return () => (
      this.props.history.push(`/note/notebooks/${id}`)
    )
  }

  makeNote() {
    console.log(this.props)
  }

  render() {
    let user = this.props.currentUser;
    let name = user.username ? user.username : user.email;

    return (
      <div className="sidebar">
        <div className="username-button">
          {name}<img src="https://img.icons8.com/ios-glyphs/24/000000/chevron-down.png" />
        </div>
        <div className="username-button-dropdown">
          <p>Account</p>
          <h2>{name}</h2>
          <div className="break"></div>
          <div className="username-button-dropdown-buttons">
            <div className="logout-button" onClick={this.logout}>Logout</div>
          </div>
        </div>
        <input className="search-bar" type="text" placeholder="Search All Notes..." />
        <div className="new-note-cluster">
          <button onClick={this.makeNote} className="generic-new-note-button">
            {"+   New Note"}
          </button>
          <button className="new-note-dropdown-button">
            <img src="https://img.icons8.com/ios-glyphs/24/000000/chevron-down.png" />
          </button>
        </div>
        <div className="sidebar-buttons">
          <Link to={"/note/notes"} className="side-button all-notes-button">
            <img className="side-image" src="https://img.icons8.com/ios/50/000000/note.png" />
              All Notes
          </Link>
          <img className="right-arrow visible" onClick={this.notebookDropdown} 
            src="https://img.icons8.com/material-rounded/24/000000/sort-right.png"/ >
          <img className="down-arrow" onClick={this.hideNotebookDropdown}
            src="https://img.icons8.com/material-rounded/24/000000/sort-down.png" />
          <Link to={"/note/notebooks"} className="side-button notebooks-button">
            <img className="side-image" src="https://img.icons8.com/pastel-glyph/64/000000/spiral-bound-booklet.png" />
            Notebooks
          </Link>
          <div className="notebook-dropdown">
            {
              Object.values(this.state.notebooks).map(notebook => {
                return (
                  <div key={notebook.id} className="sub-dd side-button"
                    onClick={this.pushHis(notebook.id)} 
                  >
                    <img src="https://img.icons8.com/ios/24/000000/spiral-bound-booklet.png" />  
                    {notebook.title}
                  </div>
                )
              })
            }
          </div>
          <Link to={"/note/tags"} className="side-button tags-button">
            <img className="side-image" src="https://img.icons8.com/ios/50/000000/tags.png" />   
            Tags
          </Link>
          <Link to={"/note/trash"} className="side-button trash-button">
            <img className="side-image" src="https://img.icons8.com/ios/50/000000/trash.png" />
            Trash
          </Link>
        </div>
      </div>
    )
  }
}
