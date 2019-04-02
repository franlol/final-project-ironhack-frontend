import React, { Component } from 'react'

import needService from '../lib/need-service';

import Searchbar from '../components/Searchbar';
import Categories from '../components/Categories';
import NeedList from '../components/NeedList';

class Home extends Component {

  state = {
    searchKeyword: '',
    needs: [],
    latestNeeds: [],
  }

  async componentDidMount() {
    try {
      const needs = await needService.getAll();
      const latestNeeds = needs.data.needs.slice(0, 10);

      this.setState({ needs: needs.data.needs.reverse(), latestNeeds: latestNeeds.reverse(), isLoaded: true });

    } catch (error) {
      console.log(error);
    }
  }
  filter = (str) => {

    // Searchbar filter.
    const filtered = needs.filter(need => {
      //Check if title or description got the text from searchbar
      if (need.title.includes(searchKeyword) || need.description.includes(searchKeyword)) return true;

      // if itsn't in the title/desc, check tags. If some tag is equals to searchbar text, return the item.
      return need.tags.some(tag => tag.text.includes(searchKeyword));
    });
  }

  // callback to recive the input data in searchbar
  setKeyword = (keyword) => {
    this.setState({ searchKeyword: keyword });
  }

  render() {

    return (
      <>
        <Searchbar setKeyword={this.setKeyword} />
        <Categories />

        {/* Next component need some refactor. Should be replaced by MyNeeds. I always use MyNeeds except here. */}
        <NeedList needs={this.state.needs} updateNeeds={this.updateNeeds} searchKeyword={this.state.searchKeyword} />
      </>
    )
  }

}

export default Home;