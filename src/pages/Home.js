import React, { Component } from 'react'
// import { withAuth } from '../providers/AuthProvider';

import Searchbar from '../components/Searchbar';
import Categories from '../components/Categories';
import NeedList from '../components/NeedList';

class Home extends Component {

  state = {
    searchKeyword: '',
  }

  setKeyword = (keyword) => {
    this.setState({ searchKeyword: keyword });
  }

  render() {

    return (
      <>
        <Searchbar setKeyword={this.setKeyword}/>
        <Categories />

        {/* Next component need some refactor. Should be replaced by MyNeeds. I always use MyNeeds except here. */}
        <NeedList needs={this.state.needs} updateNeeds={this.updateNeeds} searchKeyword={this.state.searchKeyword}/>
      </>
    )
  }

}

export default Home;