import React, { Component } from 'react';
import { withAuth } from '../providers/AuthProvider';

import { Link } from 'react-router-dom';

import '../public/styles/login.css';

class Login extends Component {

  state = {
    username: "",
    password: "",
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state

    this.props.login({ username, password })
      .then(() => { })
      .catch(error => console.log(error))
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    const { username, password } = this.state;

    return (
      <main className="login">
        <h1 className="login-title">Serv-Seeker</h1>
        <form className="login-form" onSubmit={this.handleFormSubmit}>

          <div className="login-field">
            <label htmlFor="login-username">Username:</label>
            <input required id="login-username" type="text" name="username" value={username} onChange={this.handleChange} />
          </div>

          <div className="login-field">
            <label htmlFor="login-password">Password:</label>
            <input required id="login-password" type="password" name="password" value={password} label="Password" onChange={this.handleChange} />
          </div>

          <div className="login-button">
            <input type="submit" value="Login" />
          </div>

        </form>
        <div className="login-toggle">
          <p>Not a member? <Link to="/signup">Sign up</Link></p>
        </div>
      </main>
    )
  }

}

export default withAuth(Login);
