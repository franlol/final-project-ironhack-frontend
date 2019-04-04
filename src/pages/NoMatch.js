import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NoMatch extends Component {
    render() {
        return (
            <div style={{ textAlign: 'center' }}>
                <h1>Serv-Seeker</h1>
                <h4>Something went wrong...</h4>
                <Link to="/">Back home</Link>
            </div>
        );
    }
}

export default NoMatch;