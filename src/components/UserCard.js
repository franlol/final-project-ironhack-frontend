import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faEdit, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import '../public/styles/usercard.css'

library.add(faStar, faEdit, faSignOutAlt);

class UserCard extends Component {

    componentDidMount() {
        // Formating need description to replace \n by <br>
        let description = document.querySelector('.user-card-info-description').innerHTML;
        let p = document.querySelector('.user-card-info-description');
        let descriptionReplaced = description.replace(/\n/g, '<br>');
        p.innerHTML = descriptionReplaced;
    }

    render() {
        const { user, logout } = this.props;

        return (
            <article className="user-card shadow">
                <img src={user.photo} alt={user.username} />

                <div className="user-card-img-faker"></div>
                <div className="user-card-info">
                    <div className="user-card-info">
                        <div className="user-edit">
                            <h3 className="user-card-info-title">{user.username}</h3>
                            <Link className="user-action-edit" to="/profile/edit"><FontAwesomeIcon icon="edit" /></Link>
                            <button onClick={logout} className="user-action-logout"><FontAwesomeIcon icon="sign-out-alt" /></button>
                        </div>
                    </div>
                    <p>{user.profession}</p>
                    <p className="user-card-info-description">{user.description}</p>
                    <div className="user-card-details">
                        <div>
                            <p className="user-card-info-title">Rating:</p>
                            <p className="user-card-info-value"><FontAwesomeIcon icon="star" /> {user.rating}</p>
                        </div>
                        <div>
                            <p className="user-card-info-title">Jobs:</p>
                            <p className="user-card-info-value">{user.jobsDone}</p>
                        </div>
                        <div>
                            <p className="user-card-info-title">Rate:</p>
                            <p className="user-card-info-value">{user.rate}€/h</p>
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