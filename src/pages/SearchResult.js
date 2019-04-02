import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import MyNeeds from '../components/MyNeeds';

import '../public/styles/searchresult.css';

class SearchResult extends Component {

    state = {
        needs: [],
        keyword: '',
        isLoaded: false,
    }

    async componentDidMount() {
        // only if you go by url  the location will be undefined
        if (this.props.location.state !== undefined) {
            const { needs, keyword } = this.props.location.state;

            this.setState({
                needs,
                keyword,
                isLoaded: true
            });
        } else {
            this.setState({
                needs: [],
                keyword: 'Bad way..',
                isLoaded: true
            });
        }
    }

    render() {

        return (
            <section className="searchresult-section">
                <h1>Results:</h1>
                <h3>{this.state.keyword}</h3>
                {this.state.isLoaded ? <MyNeeds needs={this.state.needs} /> : <p>Loading...</p>}
            </section>
        );
    }

}

export default withRouter(SearchResult);