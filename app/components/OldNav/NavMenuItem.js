import React, { PropTypes } from 'react';

import DashboardIcon from './NavIcons/DashboardIcon';
import FormsIcon from './NavIcons/FormsIcon';
import UsersIcon from './NavIcons/UsersIcon';
import ScraperIcon from './NavIcons/ScraperIcon';

function NavMenuItem(props) {
  const {
    icon,
    text
  } = props;

  let _icon = null;

  if(icon === 'dashboard') {
    _icon = <DashboardIcon />;
  }
  else if(icon === 'forms') {
    _icon = <FormsIcon />;
  }
  else if (icon === 'users') {
    _icon = <UsersIcon />;
  }
  else if (icon === 'scraper') {
    _icon = <ScraperIcon />;
  }

  let clazz = 'tnm-nav-menu-item';

  if(props.active)
    clazz += ' active';
  
  return (
    <div className={clazz} onClick={props.onClick}>
      { icon ? _icon : null }
      { text ? <span className="tnm-nav-menu-item-text">{text}</span> : null }
    </div>
  );
}

NavMenuItem.propTypes = {
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}

export default NavMenuItem;