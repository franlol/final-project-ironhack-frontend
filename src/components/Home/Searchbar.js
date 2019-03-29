import React, { Component } from 'react';

import '../../public/styles/searchbar.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
library.add(faSearch);

class Searchbar extends Component {
    render() {
        return (

            <section className="home-search">
                <form action="" method="get">
                    <input className="shadow" type="text" name="search" />
                    <button className="shadow" type="submit"><FontAwesomeIcon icon="search" /></button>
                </form>
            </section>

        );
    }
}

export default Searchbar;