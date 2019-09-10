import React from "react";
import {Link} from "react-router-dom";


export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
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
    let buttons = $(".side-button");
    buttons.on("click", (e) => {
      Array.from(buttons).forEach(button => {
        button.classList.remove("side-button-active");
      })
      e.target.classList.add("side-button-active");
    })
  }

  logout() {
    this.props.logout();
  }

  render() {
    let user = this.props.currentUser;
    let name = user.username ? user.username : user.email;

    return (
      <div className="sidebar">
        <div className="username-button">
          {name}<font className="down-caret">╲╱</font>
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
          <button className="generic-new-note-button">{"+   New Note"}</button>
          <button className="new-note-dropdown-button">↴</button>
        </div>
        <div className="sidebar-buttons">
          <Link to={"/note/notes"} className="side-button all-notes-button">
            <img className="side-image" src="https://img.icons8.com/ios/50/000000/note.png" />
              All Notes
          </Link>
          <Link to={"/note/notebooks"} className="side-button notebooks-button">
            <img className="side-image" src="https://img.icons8.com/pastel-glyph/64/000000/spiral-bound-booklet.png" />
            Notebooks
          </Link>
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
