import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import NeedCard from './NeedCard';

import needService from '../lib/need-service';

import '../public/styles/needlist.css';

class NeedList extends Component {

    constructor(props) {
        super(props);
        console.log(this.props)
    }
    state = {
        needs: [],
        isLoaded: false,
        searchKeyword: this.props.searchKeyword,
    }

    componentDidMount = async () => {
        try {
            const needs = await needService.getLatest();
            const data = needs.data;

            this.setState({ needs: data, isLoaded: true });

        } catch (error) {
            console.log(error);
        }
    }

    // componentDidUpdate = () => {
    //     const { searchKeyword } = this.props;
    //     this.setState({ searchKeyword });
    // }

    listNeeds = () => {
        const { needs } = this.state;
        return needs.latest.map((need, i) => <NeedCard key={i} need={need} />)
    }

    render() {
        console.log(this.props.searchKeyword)
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