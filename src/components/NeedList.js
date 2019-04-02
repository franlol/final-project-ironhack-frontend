import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import NeedCard from './NeedCard';

import needService from '../lib/need-service';

import '../public/styles/needlist.css';

class NeedList extends Component {

    state = {
        needs: [],
        latestNeeds: [],
        filtered: [],
        isLoaded: false,
    }

    componentDidMount = async () => {
        try {
            const needs = await needService.getAll();
            const latestNeeds = await needService.getLatest(); // Ordered by date (fomr bd)

            this.setState({ needs: needs.data.needs.reverse(), latestNeeds: latestNeeds.data.latest, isLoaded: true });

        } catch (error) {
            console.log(error);
        }
    }

    listNeeds = () => {
        const { latestNeeds, needs } = this.state;
        const { searchKeyword } = this.props;

        if (searchKeyword.length === 0) return latestNeeds.map((need, i) => <NeedCard key={i} need={need} />);
        
        // Searchbar filter.
        const filtered = needs.filter(need => {
            //Check if title or description got the text from searchbar
            if (need.title.includes(searchKeyword) || need.description.includes(searchKeyword)) return true;

            // if itsn't in the title/desc, check tags. If some tag is equals to searchbar text, return the item.
            return need.tags.some(tag=> tag.text.includes(searchKeyword));
        });

        // console.log(filtered)
        return filtered.map((need, i) => <NeedCard key={i} need={need} />);
    }

    render() {

        return (
            <>
                <section className="home-content-more">
                    <div className="title">
                        <h2>Latest:</h2>
                        <Link to="/search">See all</Link>
                    </div>
                    <section>

                        {this.state.isLoaded && this.listNeeds()}
                        {/* <div><a href="/needdetail.html">Dj for my private friday party</a><FontAwesomeIcon icon="chevron-right" /></div>
                        <div><a href="/needdetail.html">Electrician to fix bathroom lights</a><FontAwesomeIcon icon="chevron-right" /></div>
                        <div><a href="/needdetail.html">UI designer to take away my headaches</a><FontAwesomeIcon icon="chevron-right" /></div>
                        <div><a href="/needdetail.html">Verificator to verify some shit</a><FontAwesomeIcon icon="chevron-right" /></div> */}
                    </section>
                </section>
            </>
        );
    }

}

export default NeedList;