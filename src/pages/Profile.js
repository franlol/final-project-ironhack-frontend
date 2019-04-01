import React, { Component } from 'react';
import { withAuth } from '../providers/AuthProvider';

import UserCard from '../components/UserCard';
import MyNeeds from '../components/MyNeeds';
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
                <h4 className="profile-list-title">My needs:</h4>
                <section className="needlist">
                    <MyNeeds user={user} />
                </section>
                <h4 className="profile-list-title">My Applies:</h4>
                <section className="needlist">
                    <MyNeeds user={user} />
                </section>
            </>
        );
    }
}
// return <ApplicantCard key={i} apply={apply} isOwnNeed={this.state.isOwnNeed}/>;

export default withAuth(Profile);
