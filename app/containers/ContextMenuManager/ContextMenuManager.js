import React, { Component } from 'react';
import _ from 'lodash';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class ContextMenuManager extends Component {

  render() {
    return (
      <div className="tnm-contextmenu-wrapper">
        <ul className="tnm-contextmenu">
          <li>Deslogar</li>
        </ul>
      </div>
    );
  }
}

export default ContextMenuManager;