import React, { Component } from 'react';
import needService from '../lib/need-service';
import NeedCard from './NeedCard';

class NeedsWaitingMyResponse extends Component {

    state = {
        needs: []
    }

    async componentDidMount() {
        try {
            const { user } = this.props;

            const needs = await needService.getPendingNeeds(user._id)

            console.log(needs)

            this.setState({
                needs: needs.data.needs.reverse()
            });
        } catch (err) {
            console.log(err)
        }
    }

    listNeeds = () => {
        const { needs } = this.state;
        return needs.map((need, i) => <NeedCard key={i} need={need} />)
    }

    render() {
        return (
            <div>
                {this.listNeeds()}
            </div>
        );
    }

}

export default NeedsWaitingMyResponse;