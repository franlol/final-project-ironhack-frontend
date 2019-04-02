import React, { Component } from 'react'
// import { withAuth } from '../providers/AuthProvider';

import Searchbar from '../components/Searchbar';
import Categories from '../components/Categories';
import NeedList from '../components/NeedList';

class Home extends Component {

  state = {
    searchKeyword: ''
  }

  setKeyword = (keyword) => {
    this.setState({ searchKeyword: keyword });
  }

  render() {
    console.log(this.state)
    return (
      <>
        <Searchbar setKeyword={this.setKeyword}/>
        <Categories />
        <NeedList searchKeyword={this.state.searchKeyword}/>
      </>
    )
  }

}

export default Home;