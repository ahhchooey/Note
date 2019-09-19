import React from "react";
import {fetchTrashes} from "../../utils/api_trash_util.js";
import TrashIndexItem from "./trash_index_item.jsx";
import {sortNotesByDate} from "../../utils/sorting_util.jsx";


export default class TrashIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trashes: {},
      number: 0
    }
    this.emptyTrash = this.emptyTrash.bind(this);
  }

  componentDidMount() {
    this.props.fetchTrashes().then(res => {
      this.setState({trashes: res.trashes}, () => {
          let sortedNotes = sortNotesByDate(Object.values(this.state.trashes));
          this.props.fetchCurrentNote(sortedNotes[0])
          if (this.props.location.pathname.startsWith("/note/trash")) {
            if (sortedNotes.length === 0) {
              this.props.history.push(`/note/trash/`)
            } else {
              this.props.history.push(`/note/trash/${sortedNotes[0].id}`)
            }
          }

      })
      this.fetchNumber();
    })
  }

  componentDidUpdate(nextProps) {
    if (this.props.location.pathname != nextProps.location.pathname) {
      this.fetchNumber();
    }
  }

  fetchNumber() {
    fetchTrashes().then(trashes => this.setState({number: Object.keys(trashes).length}))
  }

  emptyTrash(e) {
    e.preventDefault();
    this.props.emptyTrash().then(() => {
      this.setState({trashes: {}});
      this.fetchNumber();
    });
  }

  render() {
    let trashes = sortNotesByDate(Object.values(this.state.trashes));

    return (
      <div className="trash-box">
        <div className="trash-show-box">
          <h3>Trash</h3>
          <div className="empty-trash-button" onClick={this.emptyTrash}>Empty Trash</div>
      
          <div className="all-notes-show-box-bottom">
            <p>{this.state.number} notes</p>
            <div className="all-notes-show-box-buttons">
            </div>
          </div>

        </div>

        <div className="trash-index">
          {
            trashes.map(trash => (
              <TrashIndexItem key={trash.id} trash={trash}
                restoreTrash={this.props.restoreTrash} history={this.props.history}
              />
            ))
          }
        </div>
      </div>
    )
  }
}
