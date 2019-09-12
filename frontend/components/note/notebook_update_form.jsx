import React from "react";


export default class NotebookUpdateForm extends React.Component {
  constructor(props) {
    super(props);
    let userId = this.props.userId;
    this.state = {
      id: this.props.identity,
      title: this.props.title,
      user_id: userId
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.updateNotebook(this.state).then(() => this.hideModal());
  }

  handleChange(e) {
    this.setState({title: e.target.value})
  }

  hideModal() {
    let iden = ".notebook-update-form-modal" + this.props.identity
    let modal = document.querySelector(iden);
    if (modal) {
      modal.classList.remove("notebook-create-form-modal-active");
      this.props.clearErrors();
      this.setState({title: ""})
    }
  }

  render() {
    let iden = "notebook-update-form-modal" + this.props.identity
    return (
      <div className={`nufm ${iden}`}>
        <div className="notebook-create-form">
          <h3>Rename Notebook</h3>  
          <p>Notebooks are useful for grouping notes around a common topic.
            They can be private or shared.</p>
          <form>
            <label htmlFor="notebook-title">Title</label>     
            <br />
            <input type="text" placeholder="Notebook Title" id="notebook-title" value={this.state.title}
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
                className="notebook-create-form-button" type="submit" value="Update" />
            </div>
          </form>
        </div>
      </div>
    )
  }
}
