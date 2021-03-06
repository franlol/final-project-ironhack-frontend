import React, { Component } from 'react';
// import { Redirect } from 'react-router';

import '../public/styles/searchbar.css';

import { library } from '@fortawesome/fontawesome-svg-core';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
library.add(faSearch);

class Searchbar extends Component {

    state = {
        search: ''
    }

    inputHandler = (e) => {
        const { setKeyword } = this.props;

        // Sending value to Home
        setKeyword(e.target.value);
        
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {

        return (

            <section className="searchbar">
                    <input placeholder="Search..." className="shadow" type="text" name="search" value={this.state.search} onChange={(e) => this.inputHandler(e)} />
            </section>

        );
    }
}

export default Searchbar;