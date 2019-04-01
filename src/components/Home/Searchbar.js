import React, { Component } from 'react';
import { Redirect } from 'react-router';

import '../../public/styles/searchbar.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
library.add(faSearch);

class Searchbar extends Component {

    state = {
        search: ''
    }

    inputHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    redirect = (e) => {
        e.preventDefault();
        this.setState({
            redirect: (
                <Redirect
                    to={{
                        pathname: "/search",
                        // search: "?utm=your+face",
                        state: { search: this.state.search }
                    }}
                />
            )
        })
    }

    render() {

        return (

            <section className="home-search">
                <form onSubmit={(e) => this.redirect(e)}>
                    <input placeholder="title, category..." className="shadow" type="text" name="search" value={this.state.search} onChange={(e) => this.inputHandler(e)} />
                    <button className="shadow" type="submit"><FontAwesomeIcon icon="search" /></button>
                    {this.state.redirect !== undefined && this.state.redirect}
                </form>
            </section>

        );
    }
}

export default Searchbar;