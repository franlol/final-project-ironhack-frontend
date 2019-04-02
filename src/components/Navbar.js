import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';
import { withRouter } from 'react-router';

import '../public/styles/navbar.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPlus, faUser } from '@fortawesome/free-solid-svg-icons';
library.add(faHome, faPlus, faUser);

class Navbar extends Component {

  render() {
    // className="home-nav-active"
    return (
      <nav className="home-nav">
        <div className="home-nav-container">
          {this.props.location.pathname === '/' ?
            <Link className="home-nav-active" to="/"><FontAwesomeIcon icon="home" /></Link>
            :
            <Link to="/"><FontAwesomeIcon icon="home" /></Link>
          }

          {this.props.location.pathname === '/need/add' ?
            <Link className="home-nav-active" to="/need/add"><FontAwesomeIcon icon="plus" /></Link>
            :
            <Link to="/need/add"><FontAwesomeIcon icon="plus" /></Link>
          }

          {this.props.location.pathname === '/profile' ?
            <Link className="home-nav-active" to="/profile"><FontAwesomeIcon icon="user" /></Link>
            :
            <Link to="/profile"><FontAwesomeIcon icon="user" /></Link>
          }
        </div>
      </nav>
    );
  }

}

export default withRouter(withAuth(Navbar));
