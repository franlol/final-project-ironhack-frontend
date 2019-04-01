import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import '../public/styles/needcard.css';

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

            const response = needs.data;
            console.log(response)
            this.setState({ search, needs: response.needs, isLoaded: true });

        } catch (error) {
            console.log(error);
        }
    }

    listNeeds = () => {
        const { needs } = this.state;
        if (needs) {
            return needs.map((need, i) => <ListCard key={i} need={need} />);
        }
        return <p>No results found..</p>
    }

    render() {

        return (
            <section>
                <h1>Results:</h1>
                <h3>{this.state.search}</h3>
                {this.listNeeds()}
            </section>
        );
    }

}

export default withRouter(SearchResult);