import React, { Component } from 'react';

import ApplyService from '../lib/apply-service';

import '../public/styles/status.css'

class Status extends Component {

    state = {
        status: 'Pending'
    }

    updateStatus = async (status) => {
        console.log(status)
        const { apply } = this.props;


        try {
            const updated = await ApplyService.updateStatus(apply._id, status);
            console.log(updated)
        } catch (err) {
            console.log(err)
        }

        this.setState({
            status
        });

    }

    resetStatus = async () => {
        console.log("reset");


        this.resetStatus({
            status: 'Pending'
        })
    }

    render() {
        // console.log(this.state)

        const { status } = this.state;
        const { isOwnNeed } = this.props;

        if (isOwnNeed) {
            switch (status) {
                case 'Pending':
                    return (
                        <div className="status-wrap">
                            <>
                                <p onClick={() => this.updateStatus('Accepted')} className="status-accept">Accept</p>
                                <p onClick={() => this.updateStatus('Declined')} className="status-decline">Decline</p>
                            </>
                        </div>
                    );

                case 'Accepted':
                    return (
                        <div className="status-wrap">
                            <p className="status-accepted">Accepted</p>
                        </div>
                    );

                case 'Declined':
                    return (
                        <div className="status-wrap">
                            <p className="status-declined">Declined</p>
                        </div>
                    );

                default:
                    return (
                        <p></p>
                    );
            }
        }

        return (
            <div className="status-wrap">
                <p className="status-pending">{status}</p>
            </div>
        );



    }
}

export default Status;