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
      const response = await needService.getAll();
      const needs = response.data.needs;
      const latestNeeds = needs.slice(0, 10);
      const filteredNeeds = latestNeeds;

      this.setState({ needs: needs.reverse(), filteredNeeds, latestNeeds: latestNeeds.reverse(), isLoaded: true });

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

        {/* Next component need some refactor. Should be replaced by MyNeeds. I always use MyNeeds except here. */}
        {/* <NeedList needs={this.state.needs} updateNeeds={this.updateNeeds} searchKeyword={this.state.searchKeyword} /> */}
        {this.state.isLoaded && <MyNeeds needs={this.state.filteredNeeds} />}
      </>
    )
  }

}

export default Home;