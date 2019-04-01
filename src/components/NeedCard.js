import React, { Component } from 'react';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

import '../public/styles/listcard.css';

import { Link } from 'react-router-dom';
library.add(faChevronRight);

class ListCard extends Component {

    state = {
        newApplies: 0    
    }

    render() {
        const { need } = this.props;
        
        return (
            <div className="needcard">
                <Link to={`/need/${need._id}`}>{need.title}</Link>{this.state.newApplies > 0 && <p>this.state.newApplies</p>}<FontAwesomeIcon icon="chevron-right" />
            </div>
        );
    }

}

export default ListCard;