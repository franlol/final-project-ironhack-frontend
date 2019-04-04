import React, { Component } from 'react';
import '../public/styles/error.css';

// When callin this component, you should send prop 'errors' with an array of strings
class error extends Component {

    showErrors = () => {
        const { errors } = this.props;

        return errors.map((error, i) => {
            return <p key={i}>{error}</p>
        })
    }

    render() {

        return (
            <>
                <div className="error">
                    {this.showErrors()}
                </div>
            </>
        );
    }
}

export default error;