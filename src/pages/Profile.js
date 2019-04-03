import React, { Component } from 'react';

import { withAuth } from '../providers/AuthProvider';
import { withRouter } from 'react-router';

import needService from '../lib/need-service'
import applyService from '../lib/apply-service';
import userService from '../lib/user-service';

import UserCard from '../components/UserCard';
import MyNeeds from '../components/MyNeeds';

import '../public/styles/profile.css'

class Profile extends Component {

    // This arrays are sending to 'MyNeeds' component to render differents needs lists
    state = {
        user: '',
        myNeeds: [],
        myApplies: [],
        isLoaded: false,
    }

    async componentDidMount() {
        const { path } = this.props.match;
        let user = '';
        try {
            if (path === '/profile/:id') {

                // try inside try, not pretty, but sometimes there are no alternatives.
                const { id } = this.props.match.params;
                const response = await userService.get(id);
                user = response.data.user;
            } else {
                user = this.props.user;
            }
            console.log(user)

            // getting all my needs to pas MyNeeds component
            const myNeeds = await needService.getAllbyUser(user._id)

            // Getting all needs where I applied, to pass MyNeed component
            const myApplies = await applyService.needsWhereUsedApplied(user._id);

            this.setState({
                user,
                myNeeds: myNeeds.data.needs.reverse(),
                myApplies: myApplies.data.needs.reverse(),
                isLoaded: true
            });
        } catch (err) {
            console.log(err)
        }
    }

    render() {
        const { logout } = this.props;
        const { user } = this.state;

        return (
            <>
                <UserCard user={user} logout={logout} />
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

export default withRouter(withAuth(Profile));
