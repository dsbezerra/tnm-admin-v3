import React from 'react';
import VelocityTransitionGroup from 'velocity-react/velocity-transition-group';

import { Icon } from '../UI';

import AdminContextMenu from '../ContextMenu/AdminContextMenu';

const adminContextMenuAnimation = {
  component: 'div',
  enter: {
    animation: {
      opacity: [1, 0],
      translateY: ["0%", "-50%"]
    },
    duration: 200,
    easing: 'ease-out',
  },
  leave: {
    animation: {
      opacity: 0,
      translateY: '-50%'
    },
    duration: 200,
    easing: 'ease-in',
  },
}

export default function TopBar(props) {
  const {
    title,
    username,
    isAdminContextMenuVisible
  } = props;
  
  return (
    <header className="tnm-top-bar">
      <div className="tnm-top-bar-inner">
        <Icon name="menu" className="menu" onClick={props.onToggleNavbar}/>
        <div className="tnm-page-title">
          {title}
        </div>

        <div id="topBarUser"
             className="tnm-user"
             onClick={props.onToggleAdminContextMenu}>
          <span>{username}</span>
          <Icon name="keyboard_arrow_down" />
        </div>

        <VelocityTransitionGroup {...adminContextMenuAnimation}>
          { isAdminContextMenuVisible ?
            <AdminContextMenu onLogout={props.onLogout} /> : null }
        </VelocityTransitionGroup>
      </div>
    </header>
  );
}