import React, { Component } from 'react';

import { Header } from '../../components/UI';

class Scraper extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header text="Scraper" />
      </div>
    );
  }
}

export default Scraper;