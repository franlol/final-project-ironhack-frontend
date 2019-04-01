import React, { Component } from 'react';
import { withAuth } from '../providers/AuthProvider';

import UserCard from '../components/UserCard';
import NeedsWaitingResponse from '../components/NeedsWaitingResponse';
import '../public/styles/profile.css'

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
                <UserCard user={user} />
                <h4>Some needs wait for answer:</h4>
                <section className="needlist">
                    <NeedsWaitingResponse user={user} />
                </section>
            </>
        );
    }
}
// return <ApplicantCard key={i} apply={apply} isOwnNeed={this.state.isOwnNeed}/>;

export default withAuth(Profile);
