import React, { Component } from 'react';

import '../../public/styles/categories.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBroom, faLeaf, faPlug, faUserGraduate } from '@fortawesome/free-solid-svg-icons';

library.add(faBroom, faLeaf, faPlug, faUserGraduate);

class Categories extends Component {

    render() {
        return (
            <main className="home-content">
                {/* <h1>Categories:</h1> */}
                <section>
                    <div className="shadow home-categories home-category-1">
                        <p><FontAwesomeIcon icon="broom" /> Cleaning</p>
                    </div>
                    <div className="shadow home-categories home-category-2">
                        <p><FontAwesomeIcon icon="leaf" /> Gardener</p>
                    </div>
                    <div className="shadow home-categories home-category-3">
                        <p><FontAwesomeIcon icon="plug" /> Plumber</p>
                    </div>
                    <div className="shadow home-categories home-category-4">
                        <p><FontAwesomeIcon icon="user-graduate" /> Teacher</p>
                    </div>
                </section>
            </main>
        );
    }

}

export default Categories;

