import React, { Component } from 'react';

import Comment from './Comment';
import Status from './Status';

import '../public/styles/applicantcard.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
library.add(faStar);

class ApplicantCard extends Component {

    render() {
        const { applicant, comment } = this.props.apply;
        const { apply, isOwnNeed } = this.props;

        return (
            <>
                <article className="list-card shadow">
                    <img src={applicant.photo} alt={applicant.username} />
                    <div className="list-card-img-faker"></div>
                    <div className="list-card-info">
                        <h3>{applicant.username}</h3>
                        <p>{applicant.profession}</p>
                        <div className="list-card-details">
                            <div>
                                <p className="list-card-info-title">Rating:</p>
                                <p className="list-card-info-value"><FontAwesomeIcon icon="star" /> {applicant.rating}</p>
                            </div>
                            <div>
                                <p className="list-card-info-title">Jobs:</p>
                                <p className="list-card-info-value">{applicant.jobsDone.length}</p>
                            </div>
                            <div>
                                <p className="list-card-info-title">Rate:</p>
                                <p className="list-card-info-value">{applicant.rate}€/h</p>
                            </div>
                        </div>
                        <Comment comment={comment} />
                        <Status apply={apply} isOwnNeed={isOwnNeed} />
                    </div>
                </article>

            </>
        );
    }

}

export default ApplicantCard;

// description.replace(/\n/g, '<br>');