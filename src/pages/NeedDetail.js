import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withAuth } from '../providers/AuthProvider';

import ApplicantCard from '../components/ApplicantCard';
import AddComment from '../components/AddComment';

import needService from '../lib/need-service';
import applyService from '../lib/apply-service';

import '../public/styles/needdetail.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

library.add(faEdit, faTrashAlt);

class NeedDetail extends Component {

    state = {
        need: {},
        applies: [],
        isLoaded: false,
        isOwnNeed: false,
        iApplied: false,
    }

    async componentDidMount() {
        const needId = this.props.match.params.id;
        const userId = this.props.user._id;

        try {
            // get the need by id
            const need = await needService.getById(needId);
            const needOwnerId = need.data.owner._id;
            let isOwnNeed = (userId === needOwnerId);

            //getting all applies of needId
            const allApplies = await applyService.getApplicants(needId);

            // get clean array from json response (data). I get the apply data (applicant (populated), comments, timestamps etc..)
            let applies = allApplies.data.allApplies;

            // parsing applies to use in setSTate later
            applies = applies.map(apply => {
                return apply;
                // return {
                    
                //     applicant: apply.applicant,
                //     comment: apply.comment
                // }
            });

            // check if I applied to this need
            let iApplied = applies.filter(apply => apply.applicant._id === userId);
            iApplied = iApplied.length > 0;

            this.setState({
                isLoaded: true,
                need: need.data,
                isOwnNeed,
                iApplied,
                applies: applies.reverse()
            });

        } catch (error) {
            console.log(error);
            this.props.history.push("/");
        }

        // Formating need description to replace \n by <br>
        let description = document.querySelector('.detail-card-description p').innerHTML;
        let p = document.querySelector('.detail-card-description p');
        let descriptionReplaced = description.replace(/\n/g, '<br>');
        p.innerHTML = descriptionReplaced;
    }

    apply = async (comment = '') => {
        if (this.state.isOwnNeed) {
            this.props.history.push("/");
            return;
        }

        try {
            const userId = this.props.user._id;
            const needId = this.state.need._id;

            //TODO SEND DATA AS SINGLE OBJECT (BODY)
            await applyService.add(needId, userId, comment);
            this.setState({
                iApplied: true,
                applies: [{ applicant: this.props.user, comment }, ...this.state.applies]
            });

        } catch (error) {
            console.log(error);
            this.props.history.push("/");
        }
    }

    fillApplicantsList = () => {
        const applies = this.state.applies.map((apply, i) => {
            return <ApplicantCard key={i} apply={apply} isOwnNeed={this.state.isOwnNeed}/>;
        });
        return applies;
    }

    // Because condition get 'complicated', I use a function to not degrade my code readability
    iAppliedCondition = () => {
        if (this.state.isOwnNeed) {
            const { need } = this.state;
            return (
                <>
                    <p className="detail-card-info-title">Own recipe:</p>
                    <div className="detail-card-details-actions">
                        <Link to={`/need/${need._id}/edit`} className="detail-card-info-value"><FontAwesomeIcon icon="edit" /></Link>
                        <p onClick={this.deleteNeed} className="detail-card-details-actions-trash detail-card-info-value"><FontAwesomeIcon icon="trash-alt" /></p>
                    </div>
                </>
            );
        } else {
            if (this.state.iApplied) {
                return <p className="detail-card-info-title">Already applied</p>
            }
            // Updated: Now i use this comparation and button with new Apply system (with comments)
            // else {
            //     return <p className="detail-card-info-apply"><button onClick={() => this.apply()}>Apply</button></p>
            // }
        }
    }

    deleteNeed = async () => {
        if (!this.state.isOwnNeed) {
            this.props.history.push("/");
            return;
        }

        try {
            const needId = this.state.need._id;
            const userId = this.props.user._id;

            await needService.delete(needId, userId);
            this.props.history.push("/");

        } catch (err) {
            this.props.history.push("/");
            console.log(err)
        }
    }


    render() {
        const { need } = this.state;

        if (this.state.isLoaded) {
            return (
                <>
                    <main className="detail-content">

                        <h1>Need detail:</h1>
                        <article className="detail-card shadow">
                            {/* <img src="./img/faked_user.jpg" alt="faked user"/> */}
                            <div className="detail-card-img-faker"></div>
                            <div className="detail-card-info">
                                <h3>{need.title}</h3>
                                <p>{need.owner.username}</p>
                                <div className="detail-card-description">
                                    <p>{need.description}</p>
                                </div>
                                <div className="detail-card-details">
                                    <div>
                                        {/* Apply / Own need - edit / Already applied / delete */}
                                        {this.iAppliedCondition()}
                                    </div>
                                    <div>
                                        <p className="detail-card-info-title">Applies:</p>
                                        <p className="detail-card-info-value">{this.state.applies.length}</p>
                                    </div>
                                    <div>
                                        <p className="detail-card-info-title">Rate:</p>
                                        <p className="detail-card-info-value">{need.rate}€</p>
                                    </div>
                                </div>
                            </div>
                        </article>

                        <h1>Applicants:</h1>
                        {/* {!this.state.iApplied && !this.state.isOwnNeed && <button onClick={() => this.apply()}>Apply</button>} */}
                        {!this.state.iApplied && !this.state.isOwnNeed && <AddComment apply={this.apply} />}
                        {this.fillApplicantsList()}

                    </main>
                </>
            );
        }
        else {
            return (
                <>
                    <h1>Need detail:</h1>
                    <p>Loading..</p>
                </>
            )
        }
    }

}

export default withAuth(NeedDetail);