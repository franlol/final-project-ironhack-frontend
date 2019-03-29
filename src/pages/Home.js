import React, { Component } from 'react'
import { withAuth } from '../providers/AuthProvider';

import Searchbar from '../components/Home/Searchbar';
import Categories from '../components/Home/Categories';
import MoreContent from '../components/Home/MoreContent';

class Home extends Component {

  state = {
    moreContent: [],
  }

  render() {

    return (
      <>
        <Searchbar />
        <Categories/>
        <MoreContent content={this.state.moreContent}/>
      </>
    )
  }

}

export default Home;