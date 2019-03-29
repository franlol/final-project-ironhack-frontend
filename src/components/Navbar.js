import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';

import '../public/styles/navbar.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPlus, faUser } from '@fortawesome/free-solid-svg-icons';
library.add(faHome, faPlus, faUser);

// class Navbar extends Component {
//   render() {
//     const { isLogged, user, logout } = this.props;
//     const { username } = user;

//     if (isLogged) {
//       return (
//         <div>
//           <p>Wellcome: {username}</p>
//           <p onClick={logout}><button>Logout</button></p>
//         </div>
//       )
//     } else {
//       return (
//         <div>
//           <Link to='/login'>Login</Link>
//           <Link to='/signup'>Signup</Link>
//         </div>
//       )
//     }

//   }
// }

class Navbar extends Component {

  render() {
    // console.log(this.props)
    return (
      <nav className="home-nav">
        <div className="home-nav-container">

          <Link to="/" className="home-nav-active"><FontAwesomeIcon icon="home" /></Link>
          <Link to="/need/add"><FontAwesomeIcon icon="plus" /></Link>
          <Link to="/profile"><FontAwesomeIcon icon="user" /></Link>
        </div>
      </nav>
    );
  }

}

export default withAuth(Navbar);
