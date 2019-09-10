import React from "react";
import {Link} from "react-router-dom";


export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.login(this.state);
  }

  handleChange(type) {
    return (e) => {
      this.setState({[type]: e.target.value})
    }
  }

  render() {
    return (
      <div className="session-page">
        <div className="signup-form">
          <img className="session-logo" src="https://www.designfreelogoonline.com/wp-content/uploads/2017/07/000856-Wolf-head-logo-maker-01.png" alt="logo" />
          <h2>note</h2>
          <p>Remember everything important.</p>
          {(this.props.errors.responseJSON !== undefined) 
              ? <p style={{color: 'red', position: 'absolute', top: '10px'}}>
                  {this.props.errors.responseJSON[0]}
                </p> 
            : ""
          }
          <form onSubmit={this.handleSubmit}>
            <input type="email" value={this.state.email}
              onChange={this.handleChange("email")}
              placeholder="Email" 
            />
            <br />
            <input type="password" value={this.state.password}
              onChange={this.handleChange("password")}
              placeholder="Password"
            />
            <br />
            <input className="session-button" type="submit" value="Login" />
          </form>
          <p className="t-and-c">By creating an account, you are agreeing to our Terms of Service and Privacy Policy.</p>
          <div className="change-session">
            <span>Don't have an account yet?</span>
            <Link className="change-session-button" to={"/signup"}>Sign Up</Link>
          </div>
        </div>
      </div>
    )
  }
}

