import React, { Component } from 'react';
import { withAuth } from '../providers/AuthProvider';

// import Bullet from '../components/bullet';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

import '../public/styles/listcard.css';
import '../public/styles/bullet.css';

import { Link } from 'react-router-dom';
library.add(faChevronRight);

class ListCard extends Component {

    state = {
        notifications: 0
    }

    componentDidMount = () => {
        //If im the owner of the need, i will put the notifications bullet
        const notifications = this.props.user._id === this.props.need.owner ? this.props.need.waitingNotification : 0;
        this.setState({ notifications });
    }

    render() {
        const { need } = this.props;

        return (
            <div className="needcard">
                {/* <Link to={`/need/${need._id}`}>{need.title}</Link><Bullet number={this.state.notifications}/><FontAwesomeIcon icon="chevron-right" /> */}
                <Link to={`/need/${need._id}`}>{need.title}</Link>{this.state.notifications > 0 && <p className="bullet">{this.state.notifications}</p>}<FontAwesomeIcon icon="chevron-right" />
            </div>
        );
    }

}

export default withAuth(ListCard);