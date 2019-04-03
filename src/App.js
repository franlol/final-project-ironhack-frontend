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
import ProfileEdit from './components/ProfileEdit';

import './public/styles/app.css';

// import '@fortawesome/fontawesome-free/css/all.min.css';
// import 'bootstrap-css-only/css/bootstrap.min.css';
// import 'mdbreact/dist/css/mdb.css';

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
            <PrivateRoute exact path="/need/:id/edit" component={NeedsAdd} />
            <PrivateRoute exact path="/profile" component={Profile} />
            <PrivateRoute exact path="/profile/edit" component={ProfileEdit} />
            {/* Auth routes */}
            <AnonRoute path="/signup" component={Signup} />
            <AnonRoute path="/login" component={Login} />

          </Switch>

        </div>

        <Navbar />

      </AuthProvider>
    )
  }
}

export default App;
