import React from 'react';

import { Icon } from '../UI';

export default function TopBar(props) {
  const { title } = props;
  return (
    <header className="tnm-top-bar">
      <div className="tnm-top-bar-inner">
        <Icon name="menu" onClick={props.onToggleNavbar}/>
        <div className="tnm-page-title">
          {title}
        </div>
      </div>
    </header>
  );
}