import React, { Component } from 'react';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import '../public/styles/profile.css'

library.add(faStar);

class UserCard extends Component {

    render() {
        const { user } = this.props;

        return (
            <article className="list-card shadow">
                <img src={user.photo} alt={user.username} />

                <div className="list-card-img-faker"></div>
                <div className="list-card-info">
                    <h3>{user.username}</h3>
                    <p>{user.profession}</p>
                    <p className="list-card-info-description">{user.description}</p>
                    <div className="list-card-details">
                        <div>
                            <p className="list-card-info-title">Rating:</p>
                            <p className="list-card-info-value"><FontAwesomeIcon icon="star" /> {user.rating}</p>
                        </div>
                        <div>
                            <p className="list-card-info-title">Jobs:</p>
                            <p className="list-card-info-value">{user.jobsDone.length}</p>
                        </div>
                        <div>
                            <p className="list-card-info-title">Rate:</p>
                            <p className="list-card-info-value">{user.rate}€/h</p>
                        </div>
                    </div>
                    {/* <Comment comment={comment} />
                        <Status apply={apply} isOwnNeed={isOwnNeed} /> */}
                </div>
            </article>
        );
    }

}

export default UserCard;