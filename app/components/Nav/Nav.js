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

  let clazz = 'tnm-nav-wrapper';
  if(visible) {
    clazz += ' visible';
  }
  
  return (
    <div className={clazz}>
      <nav>
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