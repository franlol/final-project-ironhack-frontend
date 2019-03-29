import React, { Component } from 'react';
import { withAuth } from '../providers/AuthProvider';

import { Link } from 'react-router-dom';

class Profile extends Component {
    render() {
        const { logout } = this.props;

        return (
            <div>
                <Link to="/" >Home</Link>
                <button onClick={logout}>Logout</button>
            </div>
        );
    }
}

export default withAuth(Profile);