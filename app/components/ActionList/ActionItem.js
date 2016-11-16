import React from 'react';

import Icon from '../UI/Icon';

function ActionItem(props) {
  const { action, active } = props;
  
  return (
    <li className={active ? 'active' : null} onClick={props.onClick}>
      <Icon name={action.icon} />
      <span>{action.text}</span>
    </li>
  );
}

export default ActionItem;