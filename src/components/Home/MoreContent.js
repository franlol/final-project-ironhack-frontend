import React, { Component } from 'react';

import NeedCardSmall from './NeedCardSmall';

import needService from '../../lib/need-service';

import '../../public/styles/moreContent.css';

import { library } from '@fortawesome/fontawesome-svg-core';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

library.add(faChevronRight);

class MoreContent extends Component {

    state = {
        list: [],
        isLoaded: false
    }

    componentDidMount = async () => {
        try {
            const list = await needService.moreContentGetLatest();
            const { latest } = list.data;

            this.setState({ list: latest, isLoaded: true })
        } catch (error) {
            console.log(error)
        }
    }

    listLatest = () => {
        const { list } = this.state;
        return list.map((need, i) => <NeedCardSmall key={i} need={need} />)
    }

    render() {

        return (
            <>
                <section className="home-content-more">
                    <div className="title">
                        <h2>Latest:</h2>
                        <a href="/list.html">See all</a>
                    </div>
                    <section>
                        {this.state.isLoaded && this.listLatest()}
                        {/* <div><a href="/needdetail.html">Dj for my private friday party</a><FontAwesomeIcon icon="chevron-right" /></div>
                        <div><a href="/needdetail.html">Electrician to fix bathroom lights</a><FontAwesomeIcon icon="chevron-right" /></div>
                        <div><a href="/needdetail.html">UI designer to take away my headaches</a><FontAwesomeIcon icon="chevron-right" /></div>
                        <div><a href="/needdetail.html">Verificator to verify some shit</a><FontAwesomeIcon icon="chevron-right" /></div>
                        <div><a href="/needdetail.html">Ironhacker to code my application</a><FontAwesomeIcon icon="chevron-right" /></div>
                        <div><a href="/needdetail.html">Electrician to fix bathroom lights</a><FontAwesomeIcon icon="chevron-right" /></div>
                        <div><a href="/needdetail.html">UI designer to take away my headaches</a><FontAwesomeIcon icon="chevron-right" /></div>
                        <div><a href="/needdetail.html">Verificator to verify some shit</a><FontAwesomeIcon icon="chevron-right" /></div> */}
                    </section>
                </section>
            </>
        );
    }

}

export default MoreContent;