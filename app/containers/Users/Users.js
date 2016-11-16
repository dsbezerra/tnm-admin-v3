import React, { Component } from 'react';

import { Header } from '../../components/UI';

class Users extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header text="Users" />
      </div>
    );
  }
}

export default Users;