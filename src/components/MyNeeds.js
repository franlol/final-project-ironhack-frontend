import React, { Component } from 'react';
// import { withAuth } from '../providers/AuthProvider';

// import needService from '../lib/need-service';
import NeedCard from './NeedCard';

class MyNeeds extends Component {

    // async componentDidMount() {
    //     try {
    //         const { user } = this.props;
    //         const needs = await needService.getAll(user._id)

    //         this.setState({
    //             needs: needs.data.needs.reverse()
    //         });

    //     } catch (err) {
    //         console.log(err)
    //     }
    // }

    state = {
        needs: []
    }

    componentDidMount = () => {
        console.log(this.props)
        const { needs } = this.props;
        this.setState({ needs });
    }

    listNeeds = () => {
        const { needs } = this.state;
        return needs.map((need, i) => <NeedCard key={i} need={need} />);
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