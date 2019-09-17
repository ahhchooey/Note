import React from "react";
import {Link} from "react-router-dom";
import {fetchNotes} from "../../utils/api_note_util.js";
import TagUpdateFormContainer from "./tag_update_form_container.js";


export default class TagIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tag: {},
      number: 0
    }
    this.addCurrentTag = this.addCurrentTag.bind(this);
    this.actionButton = "actionButton" + this.props.tag.id;
    this.dropdown = "dropdown" + this.props.tag.id;
    this.showModal = this.showModal.bind(this);
    this.destroyTag = this.destroyTag.bind(this);
  }

  componentDidMount() {
    this.setState({tag: this.props.tag}, () => {
      this.fetchNumber();
    })
    this.handleInput();
  }

  componentDidUpdate() {
    if (this.state.tag != this.props.tag) {
      this.setState({tag: this.props.tag}, () => {
        this.fetchNumber();
      })
    }
  }

  handleInput() {
    this.dropdown = document.querySelector(`.${this.dropdown}`);
    this.button = document.querySelector(`.${this.actionButton}`);
    if(this.button === null) return;
    this.button.addEventListener("click", (e) => {
      e.stopPropagation();
      if (!this.dropdown.classList.contains("visible")) {
        $(".tag-actions-dropdown").each((i, thing) => {
          thing.classList.remove("visible")
        });
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

  addCurrentTag() {
    this.props.addCurrentTag(this.state.tag)
  }

  fetchNumber() {
    fetchNotes(null, this.state.tag.id).then(res => {
      this.setState({number: Object.values(res).length})
    })
  }

  showModal() {
    let iden = ".notebook-update-form-modal" + this.props.tag.id;
    let modal = document.querySelector(iden);
    if (modal) {
      modal.classList.add("notebook-create-form-modal-active");
    }
  }

  destroyTag(e) {
    this.props.destroyTag(this.props.tag.id);
  }

  render() {
    return (
      <div className="tag-index-item">
        <Link className="tag-index-item-link" to={"/note/notes"}
          onClick={this.addCurrentTag} 
        >
          {`${this.state.tag.title}(${this.state.number})`}
        </Link>
        <span className={`tag-dropdown-button ${this.actionButton}`}>
          <img src="https://img.icons8.com/metro/26/000000/chevron-down.png" />
        </span>
        <div className="tag-dropdown-holder">
          <div className={`tag-actions-dropdown ${this.dropdown}`}>
            <p>Tag Actions</p>
            <div className="tag-dropdown-buttons">
              <div className="update-tag-button" onClick={this.showModal}>
                Rename Tag 
              </div>
              <br />
              <div className="destroy-tag-button" onClick={this.destroyTag}>
                Delete Tag 
              </div>
            </div>
          </div>
        </div>
        <TagUpdateFormContainer tag={this.props.tag} />
      </div>
    )
  }
}
