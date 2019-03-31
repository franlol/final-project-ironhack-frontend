import React, { Component } from 'react';
import { withAuth } from '../providers/AuthProvider';

import ApplyService from '../lib/apply-service';

import '../public/styles/status.css'

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
library.add(faTimes);

class Status extends Component {

    state = {
        status: 'Pending'
    }

    async componentDidMount() {
        const { status } = this.props.apply;

        this.setState({
            status: status === undefined ? 'Pending' : status
        });
    }

    updateStatus = async (status) => {
        const { apply, user } = this.props;
        let updatedStatus;

        try {
            const updated = await ApplyService.updateStatus(apply._id, { status, userId: user._id, applyId: apply._id });
            updatedStatus = updated.data.Apply.status;
        } catch (err) {
            console.log(err)
        }

        this.setState({
            status: updatedStatus
        });

    }

    render() {
        const { status } = this.state;
        const { isOwnNeed } = this.props;

        const { user, apply } = this.props;

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
                            <p className="status-accepted">Accepted</p><FontAwesomeIcon onClick={() => this.updateStatus('Pending')} icon="times" />
                        </div>
                    );

                case 'Declined':
                    return (
                        <div className="status-wrap">
                            <p className="status-declined">Declined</p><FontAwesomeIcon onClick={() => this.updateStatus('Pending')} icon="times" />
                        </div>
                    );

                default:
                    return (
                        <p className="status-pending-me">{status}</p>
                    );
            }
        }

        if (user._id === apply.applicant._id) {
            return (
                <div className="status-wrap">
                    {
                        status === 'Declined' ? <p className="status-declined-me">{status}</p>
                            : status === 'Accepted' ? <p className="status-accepted-me">{status}</p>
                                : <p className="status-pending-me">{status}</p>
                    }
                </div>
            )
        }

        return (
            <div className="status-wrap">
                <p className="status-pending">{status}</p>
            </div>
        );



    }
}

export default withAuth(Status);