import React, { Component } from 'react';
import { Switch } from 'react-router-dom'

import PrivateRoute from './components/PrivateRoute';
import AnonRoute from './components/AnonRoute';
import AuthProvider from './providers/AuthProvider';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import NeedsAdd from './pages/NeedsAdd';
import Profile from './pages/Profile';
import NeedDetail from './pages/NeedDetail';
import SearchResult from './pages/SearchResult';
import ProfileEdit from './pages/ProfileEdit';
import NoMatch from './pages/NoMatch';

import './public/styles/app.css';

class App extends Component {
  render() {
    return (
      <AuthProvider>

        <div className="container">
          <Switch>
            {/* App routes */}
            <PrivateRoute exact path="/" component={Home} />
            <PrivateRoute exact path="/need/add" component={NeedsAdd} />
            <PrivateRoute exact path="/search" component={SearchResult} />
            <PrivateRoute exact path="/need/:id" component={NeedDetail} />
            <PrivateRoute exact path="/need/:id/edit" test={"test"} component={NeedsAdd} />
            <PrivateRoute exact path="/profile" component={Profile} />
            <PrivateRoute exact path="/profile/edit" component={ProfileEdit} />
            <PrivateRoute exact path="/profile/:id" component={Profile} />
            {/* Auth routes */}
            <AnonRoute path="/signup" component={Signup} />
            <AnonRoute path="/login" component={Login} />
            <PrivateRoute component={NoMatch} />
          </Switch>

        </div>

        <Navbar />

      </AuthProvider>
    )
  }
}

export default App;
