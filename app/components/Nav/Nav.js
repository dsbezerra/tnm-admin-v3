import React from 'react';

import NavMenuItemDivider from './MenuItems/NavMenuItemDivider';

import NavLogo from './NavLogo';
import NavWelcome from './NavWelcome';
import NavMenu from './NavMenu';

import { Icon } from '../UI';

export default function Nav(props) {

  const {
    menuItems,
    active,
    visible,
    username
  } = props;
  
  const visibleStyle = {
    transform: 'translateX(0px)',
    WebkitTransform: 'translateX(0px)',
    MozTransform: 'translateX(0px)',
    MsTransform: 'translateX(0px)'
  }
  
  return (
    <div className="tnm-nav-wrapper" style={visible ? visibleStyle : null}>
      <nav>
        <Icon className="tnm-nav-close" name="close" onClick={props.onCloseClick}/>
        <NavLogo />
        <NavMenuItemDivider />
        <NavWelcome username={username} onLogout={props.onLogout} />
        <NavMenuItemDivider />
        <NavMenu menuItems={menuItems}
                 active={active}
                 onMenuItemClick={props.onMenuItemClick} />
      </nav>
    </div>
  );
}