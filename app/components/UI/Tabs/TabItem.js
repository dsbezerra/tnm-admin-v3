import React from 'react';

import { Link } from 'react-router';

function TabItem(props) {
  const { name, active, pathname } = props;
  return (
    <li ref={props.tabRef}
        className={active ? 'active' : ''}
        onClick={!pathname ? props.onClick : null}>
      {
        pathname ? <Link to={pathname}>{name}</Link> : name
      } 
    </li>
  );
}

export default TabItem;