import React, { Component } from 'react'

import needService from '../lib/need-service';

import Searchbar from '../components/Searchbar';
import Categories from '../components/Categories';
// import NeedList from '../components/NeedList';
import MyNeeds from '../components/MyNeeds';

class Home extends Component {

  state = {
    needs: [],
    latestNeeds: [],
    filteredNeeds: [],
    isLoaded: false,
  }

  async componentDidMount() {
    try {
      // only 1 query to get needs and then i work only with this array
      const response = await needService.getAll();
      const needs = response.data.needs.reverse();
      const latestNeeds = needs.slice(0, 10);
      const filteredNeeds = latestNeeds;

      this.setState({ needs, filteredNeeds, latestNeeds: latestNeeds, isLoaded: true });

    } catch (error) {
      console.log(error);
    }
  }

  filter = (str) => {
    const { needs } = this.state;
    // Searchbar filter.
    const filtered = needs.filter(need => {
      //Check if title or description got the text from searchbar
      if (need.title.includes(str) || need.description.includes(str)) return true;

      // if itsn't in the title/desc, check tags. If some tag is equals to searchbar text, return the item.
      return need.tags.some(tag => tag.text.includes(str));
    });
    this.setState({ filteredNeeds: filtered });
  }

  // callback to recive the input data in searchbar
  setKeyword = (keyword) => {
    
    if (keyword !== '') {
      this.filter(keyword);
    } else {
      this.setState({ filteredNeeds: this.state.needs });
    }
  }

  render() {

    return (
      <>
        <Searchbar setKeyword={this.setKeyword} />
        <Categories />
        {this.state.isLoaded ? <MyNeeds needs={this.state.filteredNeeds} /> : <p>Loading</p>}
      </>
    )
  }

}

export default Home;