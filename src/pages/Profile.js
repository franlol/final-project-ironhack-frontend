import React, { Component } from 'react';
import { withAuth } from '../providers/AuthProvider';

import needService from '../lib/need-service'
import applyService from '../lib/apply-service';

import UserCard from '../components/UserCard';
import MyNeeds from '../components/MyNeeds';

import '../public/styles/profile.css'

class Profile extends Component {

    // This arrays are sending to 'MyNeeds' component to render differents needs lists
    state = {
        myNeeds: [],
        myApplies: [],
        isLoaded: false,
    }

    async componentDidMount() {
        try {
            const { user } = this.props;

            // getting all my needs to pas MyNeeds component
            const myNeeds = await needService.getAllbyUser(user._id)

            // Getting all needs where I applied, to pass MyNeed component
            const myApplies = await applyService.needsWhereUsedApplied(user._id);

            this.setState({
                myNeeds: myNeeds.data.needs.reverse(),
                myApplies: myApplies.data.needs.reverse(),
                isLoaded: true
            });
        } catch (err) {
            console.log(err)
        }
    }

    render() {
        const { logout, user } = this.props;

        return (
            <>
                {/* <div>
                    <button onClick={logout}>Logout</button>
                </div> */}
                <UserCard user={user} logout={logout}/>
                <h4 className="profile-list-title">My needs:</h4>
                <section className="needlist">
                    {this.state.isLoaded && <MyNeeds needs={this.state.myNeeds} />}
                </section>
                <h4 className="profile-list-title">My Applies:</h4>
                <section className="needlist">
                    {this.state.isLoaded && <MyNeeds needs={this.state.myApplies} />}
                </section>
            </>
        );
    }
}

export default withAuth(Profile);
