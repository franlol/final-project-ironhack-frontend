import React, { Component } from 'react'
import io from 'socket.io-client';

import { Link } from 'react-router-dom';

import needService from '../lib/need-service';

import Searchbar from '../components/Searchbar';
import Categories from '../components/Categories';
import MyNeeds from '../components/MyNeeds';

import '../public/styles/home.css';

class Home extends Component {

  state = {
    needs: [],
    latestNeeds: [],
    filteredNeeds: [],
    isLoaded: false,
    socket: io(process.env.REACT_APP_SOCKET_IO),
  }

  componentDidMount() {
    // Adding new listener to socket
    this.state.socket.on("NEW_NEED", () => {
      this.updateState();
    });

    this.updateState();
  }

  componentWillUnmount() {
    this.state.socket.disconnect();
  }

  updateState = async () => {
    try {
      // only 1 query to get needs and then i work only with this array
      let response = await needService.getAll();
      let needs = response.data.needs.reverse();
      let latestNeeds = needs.slice(0, 10);
      let filteredNeeds = latestNeeds;

      this.setState({ needs, filteredNeeds, latestNeeds: latestNeeds, isLoaded: true });

    } catch (error) {
      console.log(error);
    }
  }

  filter = (str) => {
    const { needs } = this.state;

    // Searchbar filter.
    const filtered = needs.filter(need => {
      //Check if title or description is the same that the text from searchbar
      if (need.title.includes(str) || need.description.includes(str)) return true;

      // if itsn't in the title/desc, check tags. If some tag is equals to searchbar text, return the item.
      return need.tags.some(tag => tag.text.includes(str));
    });
    return filtered;
  }

  // callback to recive the input data in searchbar
  setKeyword = (keyword) => {
    if (keyword !== '') {
      this.setState({ filteredNeeds: this.filter(keyword) })
      // this.filter(keyword);
    } else {
      this.setState({ filteredNeeds: this.state.latestNeeds });
    }
  }

  // Callbacks to 
  showResults = (keyword) => {
    const filtered = this.filter(keyword);

    this.props.history.push({
      pathname: '/search',
      state: { needs: filtered, keyword }
    });
  }

  render() {

    return (
      <>
        <Searchbar setKeyword={this.setKeyword} />
        <Categories showResults={this.showResults} />
        <div className="home-latest-title">
          <h2 className="title">Latest:</h2>
          <Link to={{ pathname: '/search', state: { needs: this.state.needs, keyword: 'All needs:' } }}>See all</Link>
        </div>
        <section className="home-needlist">
          {/* MyNeeds component is used in several plces */}
          {this.state.isLoaded ? <MyNeeds needs={this.state.filteredNeeds} /> : <p>Loading</p>}
        </section>
      </>
    )
  }

}

export default Home;