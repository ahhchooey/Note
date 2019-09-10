import React from "react";
import {Link} from "react-router-dom";


export default class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.demoLogin = this.demoLogin.bind(this);
    this.login = this.login.bind(this);
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.signup(this.state);
  }

  handleChange(type) {
    return (e) => {
      this.setState({[type]: e.target.value})
    }
  }

  demoLogin() {
    const demoEmail = "demo@demo.io";
    const demoPassword = "password1";

    const typer = (string, type) => () => {
      if (string.length > 0) {
        this.setState({[type]: this.state[type] + string[0]});
        setTimeout(typer(string.slice(1), type), 100);
      }
    }
    typer(demoEmail, "email")();
    typer(demoPassword, "password")();
    setTimeout(this.login, 1500);
  }

  login() {
    this.props.login(this.state);
  }

  render() {
    return (
      <div className="session-page">
        <div className="signup-form">
          <Link className="session-return-to-front" to={"/"}>
            <img className="session-logo" src="https://www.designfreelogoonline.com/wp-content/uploads/2017/07/000856-Wolf-head-logo-maker-01.png" alt="logo" />
            <h2>note</h2>
          </Link>
          <p>Remember everything important.</p>
          <button onClick={() => {
            this.setState({email: "", password: ""},
              this.demoLogin
            )
          }} className="demo-button">Demo</button>
          <div className="or"></div>
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
            {(this.props.errors.responseJSON !== undefined) 
                ? <p className="session-error">
                    {this.props.errors.responseJSON[0]}
                  </p> 
              : ""
            }
            <input className="session-button" type="submit" value="Sign Up" />
          </form>
          <p className="t-and-c">By creating an account, you are agreeing to our Terms of Service and Privacy Policy.</p>
          <div className="change-session">
            <span>Already have an account?</span>
            <Link className="change-session-button" to={"/login"}>Login</Link>
          </div>
        </div>
      </div>
    )
  }
}
