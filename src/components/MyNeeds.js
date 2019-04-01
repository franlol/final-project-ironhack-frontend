import React, { Component } from 'react';
import needService from '../lib/need-service';
import NeedCard from './NeedCard';

class MyNeeds extends Component {

    state = {
        needs: [],
    }

    async componentDidMount() {
        try {
            const { user } = this.props;
            const needs = await needService.getAll(user._id)

            this.setState({
                needs: needs.data.needs.reverse()
            });
            
        } catch (err) {
            console.log(err)
        }
    }

    listNeeds = () => {
        const { needs } = this.state;
        return needs.map((need, i) => <NeedCard key={i} need={need} notification={need.waitingNotification}/>)
    }

    render() {
        return (
            <div>
                {this.listNeeds()}
            </div>
        );
    }

}

export default MyNeeds;