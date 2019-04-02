import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';

import '../public/styles/login.css';

class Signup extends Component {

  state = {
    username: "",
    password: "",
    profession: '',
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
    const { username, password, profession } = this.state;
    return (
      // <main className="signup">
      //   <h1 className="signup-title">Sign up</h1>
      //   <form className="login-form" onSubmit={this.handleFormSubmit}>

      //     <input type="text" name="username" value={username} label="Username" onChange={this.handleChange} />

      //     <input type="passowrd" name="password" value={password} label="Password" onChange={this.handleChange} />
      //     <div className="text-center mt-5">
      //       <input type="submit" value="Signup" />
      //     </div>
      //   </form>
      //     <div className="font-weight-light">
      //       <p>Have an account? <Link to="/login">Login</Link></p>
      //     </div>

      // </main>


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
            <label htmlFor="login-password">Password:</label>
            <input required id="login-password" type="password" name="password" value={password} onChange={this.handleChange} />
          </div>

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