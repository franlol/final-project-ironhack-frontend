import React, { Component } from 'react';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';


import { Link } from 'react-router-dom';
library.add(faChevronRight);

class ListCard extends Component {

    render() {
        const { need } = this.props;
        
        return (
            <div>
                <Link to={`/need/${need._id}`}>{need.title}</Link><FontAwesomeIcon icon="chevron-right" />
            </div>
        );
    }

}

export default ListCard;