import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import searchService from '../lib/search-service';
import ListCard from '../components/NeedCard';

class SearchResult extends Component {

    state = {
        search: '',
        needs: []
    }

    async componentDidMount() {
        const search = this.props.location.state !== undefined ? this.props.location.state.search : '';

        try {
            const needs = await searchService.search(search);
            console.log(needs)
            // const data = needs.data;

            // this.setState({ needs: data, isLoaded: true });

        } catch (error) {
            console.log(error);
        }

        this.setState({
            search
        });
    }

    listNeeds = () => {
        const { needs } = this.state;
        return needs.map((need, i) => <ListCard key={i} need={need} />);
    }

    render() {

        return (
            <section>
                <h1>asd</h1>
                {this.listNeeds()}
            </section>
        );
    }

}

export default withRouter(SearchResult);