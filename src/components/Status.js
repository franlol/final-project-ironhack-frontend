import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../public/styles/status.css'

class Status extends Component {

    state = {
        status: 'Pending'
    }

    render() {
        // console.log(this.state)

        const { status } = this.state;

        switch (status) {
            case 'Pending':
                return (
                    <div className="status-wrap">
                        <>
                            <Link to="/" className="status-accept">Accept</Link>
                            <Link to="/" className="status-decline">Decline</Link>
                        </>
                    </div>
                )

            case 'Accepted':
                return (
                    <div className="status-wrap">
                        <p className="status-accepted">Accepted</p>
                    </div>
                )

            case 'Declined':
                return (
                    <div className="status-wrap">
                        <p className="status-declined">Declined</p>
                    </div>
                )

            default:
                return (
                    <p></p>
                )

        }

    }
}

export default Status;