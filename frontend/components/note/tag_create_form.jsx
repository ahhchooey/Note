import React from "react";


export default class TagCreateForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.createTag(this.state).then(() => this.hideModal());
    this.setState({title: ""})
  }

  handleChange(e) {
    this.setState({title: e.target.value})
  }

  hideModal() {
    let modal = document.querySelector(".notebook-create-form-modal");
    if (modal) {
      modal.classList.remove("notebook-create-form-modal-active");
      this.props.clearTagErrors();
      this.setState({title: ""})
    }
  }

  render() {
    return (
      <div className="notebook-create-form-modal">
        <div className="notebook-create-form">
          <h3>Create New Tag</h3>  
          <p>Tags are useful for filtering notes with similar content.</p>
          <form>
            <label htmlFor="notebook-title">Title</label>     
            <br />
            <input type="text" autoFocus placeholder="Tag Title" id="notebook-title" value={this.state.title}
              onChange={this.handleChange} 
            />
            <br />
            {(this.props.errors.responseJSON !== undefined) 
                ? <p className="notebook-create-error">
                    {this.props.errors.responseJSON[0]}
                  </p> 
              : ""
            }
            <div className="notebook-create-form-buttons">
              <button onClick={this.hideModal}
                className="cancel-notebook-create-form-button">Cancel</button>
              <input onClick={this.handleSubmit}
                className="notebook-create-form-button" type="submit" value="Create" />
            </div>
          </form>
        </div>
      </div>
    )
  }
}

