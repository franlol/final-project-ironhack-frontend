import React, { Component } from 'react';

import NeedCard from './NeedCard';

class MyNeeds extends Component {

    state = {
        needs: []
    }

    componentDidMount = () => {
        const { needs } = this.props;

        this.setState({ needs });
    }

    listNeeds = () => {
        const { needs } = this.props;
        return needs.map((need, i) => <NeedCard key={i} need={need} />);
    }

    render() {
        console.log(this.props.needs)
        return (
            <div>
                {this.listNeeds()}
            </div>
        );
    }

}

export default MyNeeds;