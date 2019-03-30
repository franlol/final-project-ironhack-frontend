import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withAuth } from '../../providers/AuthProvider';

import UserCard from '../../components/UserCard';

import needService from '../../lib/need-service';
import applyService from '../../lib/apply-service';

import '../../public/styles/needdetail.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

library.add(faEdit, faTrashAlt);

class NeedDetail extends Component {

    state = {
        need: {},
        applicants: [],
        isLoaded: false,
        isOwnNeed: false,
        iApply: false,
    }

    async componentDidMount() {
        const needId = this.props.match.params.id;
        const userId = this.props.user._id;

        try {
            // get the need by id
            const need = await needService.getById(needId);
            const needOwnerId = need.data.owner._id;
            let isOwnNeed = (userId === needOwnerId);

            //getting all applicants of needId
            const allApplies = await applyService.getApplicants(needId);

            // get clean array from json response (data)
            let applicants = allApplies.data.allApplies;
            applicants = applicants.map(apply => apply.applicant)

            // check if I applied to this need
            let iApply = applicants.filter(applicant => applicant._id === userId);
            iApply = iApply.length > 0;

            this.setState({
                isLoaded: true,
                need: need.data,
                isOwnNeed,
                iApply,
                applicants
            });

        } catch (error) {
            console.log(error);
            this.props.history.push("/");
        }
    }

    apply = async () => {
        if (this.state.isOwnNeed) {
            this.props.history.push("/");
            return;
        }

        try {
            const userId = this.props.user._id;
            await applyService.add(this.state.need._id, userId);
            this.setState({
                iApply: true,
                applicants: [...this.state.applicants, this.props.user]
            });
        } catch (error) {
            console.log(error);
            this.props.history.push("/");
        }
    }

    fillApplicantsList = () => {
        const applicants = this.state.applicants.map((applicant, i) => {
            return <UserCard key={i} applicant={applicant} />;
        });
        return applicants;
    }

    // Because condition get complicated, I use a function to not degrade my code readability
    iAppliedCondition = () => {
        if (this.state.isOwnNeed) {
            const { need } = this.state;
            return (
                <>
                    <p className="detail-card-info-title">Own recipe:</p>
                    <Link to={`/need/${need._id}/edit`} className="detail-card-info-value"><FontAwesomeIcon icon="edit" /></Link>
                    <p onClick={this.deleteNeed} className="detail-card-info-value"><FontAwesomeIcon icon="trash-alt" /></p>
                </>
            );
        } else {
            if (this.state.iApply) {
                return <p className="detail-card-info-apply">Already applied</p>
            } else {
                return <p className="detail-card-info-apply"><button onClick={() => this.apply()}>Apply</button></p>
            }
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
            console.log("delete")
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
                    <h1>Need detail:</h1>
                    <main className="detail-content">

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
                                        <p className="detail-card-info-value">14</p>
                                    </div>
                                    <div>
                                        <p className="detail-card-info-title">Rate:</p>
                                        <p className="detail-card-info-value">{need.rate}€</p>
                                    </div>
                                </div>
                            </div>
                        </article>
                        <h1>Applicants:</h1>
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