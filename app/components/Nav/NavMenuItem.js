import React from 'react';
import { Link } from 'react-router';

export default function NavMenuItem(props) {

  const { menu, active } = props;
  
  return (
    <li className={active ? 'active': ''}>
      <Link to={menu.pathname} onClick={props.onClick}>
        <i className="tnm-nav-menu-icon material-icons">{menu.icon}</i>
        <div className="tnm-nav-menu-text">
          {menu.text}
        </div>
      </Link>
    </li>
  );
}