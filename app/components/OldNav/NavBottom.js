import React from 'react';

import NavDivider from './NavDivider';
import NavLogout from './NavLogout';

export default function NavBottom(props) {
  return (
    <div className="tnm-nav-bottom">
      <NavDivider />
      <NavLogout onClick={props.onLogoutClick}/>
    </div>
  );
}