import React, { Component } from 'react'
// import { withAuth } from '../providers/AuthProvider';

import Searchbar from '../components/Home/Searchbar';
import Categories from '../components/Home/Categories';
import NeedList from '../components/NeedList';

class Home extends Component {

  state = {
    needs: [],
  }

  render() {

    return (
      <>
        <Searchbar />
        <Categories/>
        <NeedList content={this.state.needs}/>
      </>
    )
  }

}

export default Home;