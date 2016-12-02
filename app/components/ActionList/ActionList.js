import React from 'react';
import _ from 'lodash';

import ActionItem from './ActionItem';

import {
  Header
} from '../UI';

function ActionList(props) {

  const { actions, active } = props;
  
  const items = _.map(actions, (action, index) => {
    return <ActionItem
               key={index}
               action={action}
               active={active === action.id}
               onClick={props.onClick ? props.onClick.bind(this, action) : null} />
  });
  
  return (
    <div className="tnm-actions-wrapper">
      <Header text="Ações" />
      <ul className="tnm-actions-list">
        {items}
      </ul>
    </div>
  );
}

export default ActionList;