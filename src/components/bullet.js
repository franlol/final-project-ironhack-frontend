import React, { Component } from 'react';

class bullet extends Component {

    state = {
        number: 0
    }

    render() {

        return (
            <>
                {this.state.number > 0 && <p className="bullet">{this.state.number}</p>}
            </>
        );
    }

}

export default bullet;