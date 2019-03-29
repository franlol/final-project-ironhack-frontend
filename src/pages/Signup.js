import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';

import { MDBInput, MDBModalFooter } from "mdbreact";


class Signup extends Component {

  state = {
    username: "",
    password: "",
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;

    this.props.signup({ username, password })
      // .then(() => {
      //   this.setState({
      //       username: "",
      //       password: "",
      //   });
      // })
      .catch(error => console.log(error))
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    const { username, password } = this.state;
    return (
      <div>
        <h1>Sign up</h1>
        <form onSubmit={this.handleFormSubmit}>
          <MDBInput type="text" name="username" value={username} label="Username" outline onChange={this.handleChange} />
          <MDBInput type="passowrd" name="password" value={password} label="Password" outline onChange={this.handleChange} />
          <div className="text-center mt-5">
            <input type="submit" value="Signup" />
          </div>
        </form>
        <MDBModalFooter className="mt-5">
          <div className="font-weight-light">
            <p>Have an account? <a href="/login">Login</a></p>
          </div>
        </MDBModalFooter>

      </div>
    )
  }
}

export default withAuth(Signup);