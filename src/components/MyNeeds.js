import React, { Component } from 'react';

import NeedCard from './NeedCard';

class MyNeeds extends Component {

    state = {
        needs: [],
        isLoaded: false,
    }

    componentDidMount = () => {
        const { needs } = this.props;

        this.setState({
            needs,
            isLoaded: true
        });
    }

    listNeeds = () => {
        const { needs } = this.props;
        return needs.map((need, i) => <NeedCard key={i} need={need} />);
    }

    render() {
        return (
            <div>
                {this.state.isLoaded ? this.listNeeds() : <p>Loading..</p>}
            </div>
        );
    }

}

export default MyNeeds;