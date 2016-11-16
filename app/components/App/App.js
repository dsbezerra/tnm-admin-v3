import React, { Component } from 'react';

import Main from '../../containers/Main';
import ModalManager from '../../containers/ModalManager';
import ToastManager from '../../containers/ToastManager';

class App extends Component {

  render() {
    return (
      <div className="app-two">
        <ModalManager />
        <ToastManager />
        {this.props.children || <Main />}
      </div>
      
    )
  }
}

export default App;
