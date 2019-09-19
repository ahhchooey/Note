import React from "react"; 
import NoteIndexContainer from "./note_index_container.js";
import NotebookUpdateFormContainer from "./notebook_update_form_container.js";
import {fetchNotes} from "../../utils/api_note_util.js";


export default class NotebookShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 0,
      tags: {},
      sortedBy: "time"
    }
    this.mounted = false;
    this.destroyNotebook = this.destroyNotebook.bind(this);
    this.showModal = this.showModal.bind(this);
    this.fetchNumber = this.fetchNumber.bind(this);
    this.setCurrentTag = this.setCurrentTag.bind(this);
    this.removeCurrentTag = this.removeCurrentTag.bind(this);
    this.setSortedBy = this.setSortedBy.bind(this);
  }

  removeCurrentTag() {
    this.props.removeCurrentTag();
  }

  componentDidMount() {
    this.mounted = true;
    this.props.fetchNotebook(this.props.id);
    this.handleInput();
    this.fetchNumber();
    this.props.fetchCurrentNotebook(this.props.id);
    this.props.fetchTags().then(res => {
      this.setState({tags: res.tags})
    })
    this.handleTagDropdownClick();
    this.handleSortDropdownClick();
  }

  componentDidUpdate(nextProps, nextState) {
    if (this.props.location.pathname != nextProps.location.pathname) {
      this.fetchNumber();
      this.props.fetchCurrentNotebook(this.props.id);
    }
  }

  fetchNumber() {
    fetchNotes(this.props.id).then(notes => this.setState({number: Object.keys(notes).length}));
  }

  handleInput() {
    this.dropdown = document.querySelector(".notebook-show-more-actions-dropdown");
    this.button = document.querySelector(".notebook-more-actions-button");
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

  handleTagDropdownClick() {
    $(".tag-dropdown-button").on("click", (e) => {
      e.stopPropagation();
      if ($(".dddd").hasClass("visible")) {
        $(".dddd").removeClass("visible")
      }
      $(".tag-filter-dropdown").toggleClass("visible")
    })
    document.addEventListener("click", (e) => {
      if ($(".dddd").hasClass("visible")) {
        $(".dddd").removeClass("visible")
      }
    }) 
  }

  handleSortDropdownClick() {
    $(".sort-dropdown-button").on("click", (e) => {
      e.stopPropagation();
      if ($(".dddd").hasClass("visible")) {
        $(".dddd").removeClass("visible")
      }
      $(".sort-dropdown").toggleClass("visible")
    })
  }

  destroyNotebook() {
    this.props.destroyNotebook(this.props.id)
      .then(() => this.props.history.push("/note/notebooks"))
  }
  
  showModal() {
    let iden = ".notebook-update-form-modal" + this.props.id;
    let modal = document.querySelector(iden);
    if (modal) {
      modal.classList.add("notebook-create-form-modal-active");
    }
  }

  setCurrentTag(tag) {
    return (e) => {
      e.preventDefault();
      this.props.addCurrentTag(tag);
    }
  }

  setSortedBy(method) {
    return (e) => {
      e.preventDefault();
      this.setState({sortedBy: method})
    }
  }

  render() {
    let title = this.props.notebook ? this.props.notebook.title : "";
    let frog = Object.values(this.state.tags);
    frog = frog.map(tag => {
      return (
        <div className="tag-filter-index-item" key={tag.id} onClick={this.setCurrentTag(tag)}>
          {tag.title}
        </div>
      )
    })
    let cow = "";
    if (this.props.currentTag) {
      cow = (
        <div className="current-tag-button">
          <span>{this.props.currentTag.title}</span>
          <div className="remove-current-tag-button" 
            onClick={this.removeCurrentTag}>
            &#9747;
          </div>
        </div>
      )
    }

    return (
      <div className="notebook-show">
        <div className="notebook-show-box">
          <h3>{title}</h3>
          <div className="notebook-show-box-bottom">
            <p>{this.state.number} notes</p>
            {cow}
            <div className="notebook-show-box-buttons">

              <img className="sort-dropdown-button" 
                src="https://img.icons8.com/ios/50/000000/generic-sorting-2.png" 
              />
              <div className="dddd sort-dropdown">
                <p>Sort By</p>
                <div className="sort-button sort-time-button" 
                  onClick={this.setSortedBy("time")}>
                  Recent
                </div>
                <div className="sort-button sort-title-button" 
                  onClick={this.setSortedBy("title")}>
                  Title
                </div>
              </div>


              <img className="tag-dropdown-button" 
                src="https://img.icons8.com/ios/50/000000/tags.png" />   
              <div className="dddd tag-filter-dropdown">
                <p>Filter By Tag</p>
                <div className="tag-filter-index">
                  {frog}
                </div>
              </div>

              <div className="notebook-more-actions-button">•••</div>
              <div className="notebook-show-more-actions-dropdown">
                <p>Actions</p>
                <div className="notebook-show-dropdown-buttons">
                  <div onClick={this.showModal} className="update-notebook-button">
                    Rename Notebook
                  </div>
                  <div onClick={this.destroyNotebook} className="destroy-notebook-button">
                    Delete Notebook
                  </div>  
                </div>
              </div>
            </div>
          </div>
        </div>

        <NotebookUpdateFormContainer identity={this.props.id} title={title} />
        <NoteIndexContainer notebookId={this.props.id} sortedBy={this.state.sortedBy}/>
      </div>
    )
  }
}
