import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';

import Error from '../components/Error';

import '../public/styles/login.css';

class Signup extends Component {

  state = {
    username: "",
    password: "",
    profession: '',
    telephone: '',

    error: false,
    errors: [],
  };

  handleFormSubmit = async (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    const profession = this.state.profession;
    const telephone = this.state.telephone;

    this.props.signup({ username, password, profession, telephone })
      .then(signup => {
        if (signup !== undefined) {
          let error = '';
          if (signup.message === 'Validation error') {
            error = 'Validation error';
          } else if (signup.message === 'Unprocessable Entity') {
            error = 'Username already taken';
          }
          this.setState({
            error: true,
            errors: [error],
          });
        }
      })
    // .catch(error => console.log("CATCH", error.response.data))  // No catch because from AuthProvider im returning err, so is what i get here
  }



  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    const { username, password, profession, telephone } = this.state;
    return (

      <main className="login">
        <h1 className="login-title">Serv-Seeker</h1>
        <form className="login-form" onSubmit={this.handleFormSubmit}>

          <div className="login-field">
            <label htmlFor="login-username">Username:</label>
            <input required id="login-username" type="text" name="username" value={username} onChange={this.handleChange} />
          </div>

          <div className="login-field">
            <label htmlFor="login-profession">Profession:</label>
            <input required id="login-profession" type="text" name="profession" value={profession} onChange={this.handleChange} />
          </div>

          <div className="login-field">
            <label htmlFor="login-telephone">Telephone:</label>
            <input required id="login-telephone" type="number" name="telephone" value={telephone} onChange={this.handleChange} />
          </div>

          <div className="login-field">
            <label htmlFor="login-password">Password:</label>
            <input required id="login-password" type="password" name="password" value={password} onChange={this.handleChange} />
          </div>

          {this.state.error && <Error errors={this.state.errors} />}

          <div className="login-button">
            <input type="submit" value="Sign up" />
          </div>

        </form>
        <div className="login-toggle">
          <p>Have an account? <Link to="/login">Login</Link></p>
        </div>
      </main>

    )
  }
}

export default withAuth(Signup);