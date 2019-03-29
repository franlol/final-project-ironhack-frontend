import React, { Component } from 'react';
// import { Link } from 'react-router-dom';

import { withAuth } from '../../providers/AuthProvider';

import needService from '../../lib/need-service';
import applyService from '../../lib/apply-service';

import '../../public/styles/needdetail.css';

class NeedDetail extends Component {

    state = {
        need: [],
        isLoaded: false,
        isOwnNeed: false,
    }

    async componentDidMount() {
        const needId = this.props.match.params.id;
        const userId = this.props.user._id;

        try {
            const need = await needService.getById(needId);
            const needOwnerId = need.data.owner._id;
            let isOwnNeed = (userId === needOwnerId);

            this.setState({
                isLoaded: true,
                need: need.data,
                isOwnNeed
            });
            

        } catch (error) {
            console.log(error)
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
            const result = await applyService.add(this.state.need._id, userId);
            console.log(result);
        } catch (error) {
            console.log(error);
            this.props.history.push("/");
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
                                        {this.state.isOwnNeed ?
                                            <p className="detail-card-info-apply">Own need</p>
                                            :
                                            <p className="detail-card-info-apply"><button onClick={() => this.apply()}>Apply</button></p>
                                        }
                                    </div>
                                    <div>
                                        <p className="detail-card-info-title">Applies:</p>
                                        <p className="detail-card-info-value">14</p>
                                    </div>
                                    <div>
                                        <p className="detail-card-info-title">Rate:</p>
                                        <p className="detail-card-info-value">120€</p>
                                    </div>
                                </div>
                            </div>
                        </article>
                        <h1>Applicants:</h1>
                        <p>cards here</p>
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