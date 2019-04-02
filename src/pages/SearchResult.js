import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import '../public/styles/searchresult.css';

// import searchService from '../lib/search-service';
// import ListCard from '../components/NeedCard';

class SearchResult extends Component {

    state = {
        searchKeyword: '',
        needs: []
    }

    async componentDidMount() {
        const needs = this.props.location.state !== undefined ? this.props.location.state.needs : '';
        const { searchKeyword } = this.props.searchKeyword === undefined ? '' : this.props;

        if (searchKeyword !== undefined) {
            // Array filter.
            const filtered = needs.filter(need => {
                //Check if title or description got the text from searchbar
                if (need.title.includes(searchKeyword) || need.description.includes(searchKeyword)) return true;
    
                // if itsn't in the title/desc, check tags. If some tag is equals to searchbar text, return the item.
                return need.tags.some(tag => tag.text.includes(searchKeyword));
            });
            console.log(filtered)
        } else {
            console.log(needs)
        }
        


        this.setState({
            needs
        });
    }

    // listNeeds = () => {
    //     const { needs } = this.state;

    //     if (needs) {
    //         return needs.map((need, i) => <ListCard key={i} need={need} />);
    //     }
    //     return <p>No results found..</p>
    // }

    render() {

        return (
            <section>
                <h1>Results:</h1>
                <h3>{this.state.searchKeyword}</h3>
                {/* {this.listNeeds()} */}
            </section>
        );
    }

}

export default withRouter(SearchResult);