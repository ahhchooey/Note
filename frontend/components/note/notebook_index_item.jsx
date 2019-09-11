import React from "react";
import {Link} from "react-router-dom";


export default class NotebookIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "searching..."
    }
  }

  componentDidMount() {
    fetchNotebookUser(this.props.author).then(res => {
      let user = res;
      let name = res.username ? res.username : res.email;
      this.setState({name: name})
    });    
  }

  render() {
    return (
    <div className="notebook-index-item">
      <Link className="ti" to={`/note/notebooks/${this.props.identity}`}>{this.props.title}</Link>
      <span className="cr">{this.state.name}</span>
      <span className="up">{formatDateTime(this.props.updatedAt)}</span>
      <span className="sh">Only You</span>
      <span className="ac">...</span>
    </div>
    )
  }
}

const fetchNotebookUser = (id) => {
  return $.ajax({
    url: `api/users/${id}`,
    method: "GET"
  })
}


const formatDate = date => {
  const months = {
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December',
  };
  const daysOfWeek = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday',
  };
  const obj = new Date(date);
  const month = months[obj.getMonth()];
  const day = obj.getDate();
  const year = obj.getFullYear();
  const dayOfWeek = daysOfWeek[obj.getDay()];
  return `${month} ${day}, ${year} (${dayOfWeek})`;
};

const formatTime = date => {
  const obj = new Date(date);
  const fullHours = obj.getHours();
  let hours = fullHours % 12;
  if (hours === 0) hours = 12;
  const minutes = obj.getMinutes();
  const tmp = `0${minutes}`;
  const paddedMinutes = tmp.slice(tmp.length - 2);
  const ampm = fullHours < 12 || fullHours === 0 ? 'am' : 'pm';
  return `${hours}:${paddedMinutes}${ampm}`;
};

const formatDateTime = date => (
  `${formatDate(date)} ${formatTime(date)}`
);

