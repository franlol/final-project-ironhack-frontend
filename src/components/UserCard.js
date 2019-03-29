import React, { Component } from 'react';
import '../public/styles/usercard.css';

class UserCard extends Component {

    render() {
        const { applicant } = this.props;

        return (
            <article className="list-card shadow">
                <img src="https://qsf.fs.quoracdn.net/-3-images.new_grid.profile_pic_anon.png-26-da5ea6d307f82722.png" alt="faked user" />
                <div className="list-card-img-faker"></div>
                <div className="list-card-info">
                    <h3>{applicant.username}</h3>
                    <p>{applicant.profession}</p>
                    <div className="list-card-details">
                        <div>
                            <p className="list-card-info-title">Rating:</p>
                            <p className="list-card-info-value"><i className="fas fa-star"></i> {applicant.rating}</p>
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
                </div>
            </article>
        );
    }

}

export default UserCard;