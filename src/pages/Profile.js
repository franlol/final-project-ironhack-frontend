import React, { Component } from 'react';
import { withAuth } from '../providers/AuthProvider';

import UserCard from '../components/UserCard';

import '../public/styles/profile.css'

// import ApplicantCard from '../components/ApplicantCard';

class Profile extends Component {
    render() {
        const { logout, user } = this.props;
        // console.log(this.props)
        // console.log(user)

        return (
            <>
                <div>
                    <button onClick={logout}>Logout</button>
                </div>
                <UserCard user={user}/>
            </>
        );
    }
}
// return <ApplicantCard key={i} apply={apply} isOwnNeed={this.state.isOwnNeed}/>;

export default withAuth(Profile);
