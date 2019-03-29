import React, { Component } from 'react';
import { withAuth } from '../providers/AuthProvider';

import { MDBInput, MDBModalFooter } from "mdbreact";

import '../public/styles/login.css';
// import '../public/styles/login.css';

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
        <h1>Login</h1>
        <form onSubmit={this.handleFormSubmit}>
          <MDBInput type="text" name="username" value={username} label="Username" outline onChange={this.handleChange} />
          <MDBInput type="password" name="password" value={password} label="Password" outline onChange={this.handleChange} />
          <div className="text-center mt-5">
            <input type="submit" value="Login" />
          </div>
        </form>
        <MDBModalFooter className="mt-5">
          <div className="font-weight-light">
            <p>Not a member? <a href="/signup">Sign up</a></p>
          </div>
        </MDBModalFooter>
      </main>
    )
  }
}

export default withAuth(Login);
