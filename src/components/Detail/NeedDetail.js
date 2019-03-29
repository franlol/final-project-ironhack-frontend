import React, { Component } from 'react';

import needService from '../../lib/need-service';

import '../../public/styles/needdetail.css';

class NeedDetail extends Component {

    state = {
        need: [],
        isLoaded: false,
    }

    componentDidMount = async () => {
        const { id } = this.props.match.params;

        try {
            const need = await needService.getById(id);
            if (need.status === 200) {
                this.setState({
                    need: need.data,
                    isLoaded: true
                });

            }
        } catch (error) {

        }

    }

    render() {
        const { need } = this.state;
        console.log(need)
        if (this.state.isLoaded) {
            return (
                <>
                    <h1>Need detail:</h1>
                    <main className="detail-content">

                        <article className="detail-card shadow">
                            {/* <!-- <img src="./img/faked_user.jpg" alt="faked user"> --> */}
                            <div className="detail-card-img-faker"></div>
                            <div className="detail-card-info">
                                <h3>{need.title}</h3>
                                <p>{need.owner.username}</p>
                                <div className="detail-card-description">
                                    <p>{need.description}</p>
                                </div>
                                <div className="detail-card-details">
                                    <div></div>
                                    <p className="detail-card-info-apply"><a href="#1">Apply</a></p>
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

export default NeedDetail;