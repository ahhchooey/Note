import React from "react";
import {Link} from "react-router-dom";

import {sortNotesByDate} from "../../utils/sorting_util.jsx";


export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
    this.notebookDropdown = this.notebookDropdown.bind(this);
    this.hideNotebookDropdown = this.hideNotebookDropdown.bind(this);
    this.pushHis = this.pushHis.bind(this);
    this.makeNote = this.makeNote.bind(this);
    this.state = {
      notebooks: {},
      notes: {},
      currentNote: null,
      search: ""
    }
    this.extraButtons = false;
    this.search = this.search.bind(this);
    this.searchSubmit = this.searchSubmit.bind(this);
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
    this.props.fetchNotes().then(res => {
      this.setState({notes: res.notes},
        () => {
          let sortedNotes = sortNotesByDate(Object.values(this.state.notes));
          this.props.fetchCurrentNote(sortedNotes[0])
          if (this.props.location.pathname.startsWith("/note/notes")) {
            if (sortedNotes.length === 0) {
              this.props.history.push("/note/notebooks")
            } else {
              this.props.history.push(`/note/notes/${sortedNotes[0].id}`)
            }
          }
        }
      )});
    this.props.fetchNotebooks().then(res => {
      this.setState({notebooks: res.notebooks},
        () => this.props.fetchCurrentNotebook(this.props.defaultNotebook) 
      );
    });
  }

  componentDidUpdate(prevProps, nextState) {
    if (this.props.location.pathname != prevProps.location.pathname) {
      this.props.fetchNotebooks().then(res => {
        this.setState({notebooks: res.notebooks});
    });
      this.initialHighligher();
      this.setState({currentNote: this.props.currentNote})
    }
    if (Object.keys(prevProps.notebooks).length !== Object.keys(this.props.notebooks).length) {
      this.props.fetchNotebooks().then(res => {
        this.setState({notebooks: res.notebooks});
    });
      this.setState({currentNote: this.props.currentNote})
    }
  }

  initialHighligher() {
    let buttons = $(".side-button");
    Array.from(buttons).forEach(button => {
      button.classList.remove("side-button-active");
    })

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
      e.currentTarget.classList.add("side-button-active");
    });
  }

  notebookDropdown(e) {
    if (!this.extraButtons) {
      this.extraButtons = true;
      this.buttonHighlighter();
    }
    e.stopPropagation();
    e.target.classList.remove("visible");
    $(".daa").addClass("visible");
    $(".notebook-dropdown").addClass("visible");
  }

  hideNotebookDropdown(e) {
    e.stopPropagation();
    e.target.classList.remove("visible");
    $(".raa").addClass("visible");
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
    this.props.createNote({notebook_id: this.props.notebook}).then((res) => {
      if (this.props.location.pathname.startsWith("/note/notebooks")) {
        this.props.history.push(`/note/notebooks/${this.props.notebook}/notes/${res.note.id}`)
      } else {
        this.props.history.push(`/note/notes/${res.note.id}`)
      }
    })
  }

  search(e) {
    this.setState({search: e.target.value})
  }

  searchSubmit(e) {
    e.preventDefault();
    this.props.history.push(`/note/search/${this.state.search.toLowerCase()}`)
  }

  render() {
    let user = this.props.currentUser;
    let name = user.username ? user.username : user.email;
    return (
      <div className="sidebar">
        <div className="username-button">
          <img id="sidebar-logo" src="https://www.designfreelogoonline.com/wp-content/uploads/2017/07/000856-Wolf-head-logo-maker-01.png" alt="logo" />
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
        <form onSubmit={this.searchSubmit}>
          <input className="search-bar" type="text" placeholder="Search All Notes..." 
            value={this.state.search} onChange={this.search} 
          />
        </form>
        <div className="new-note-cluster">
          <button onClick={this.makeNote} className="generic-new-note-button">
            {"+   New Note"}
          </button>
          <button className="new-note-dropdown-button">
            <img src="https://img.icons8.com/ios-glyphs/24/000000/chevron-down.png" />
          </button>
        </div>
        <div className="sidebar-buttons">
          <Link to={`/note/notes`} className="side-button all-notes-button">
            <img className="side-image" src="https://img.icons8.com/ios/50/000000/note.png" />
              All Notes
          </Link>
          <img className="raa right-arrow visible" onClick={this.notebookDropdown} 
            src="https://img.icons8.com/material-rounded/24/000000/sort-right.png"/ >
          <img className="daa down-arrow" onClick={this.hideNotebookDropdown}
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
                    onClick={this.pushHis(notebook.id)} >
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
