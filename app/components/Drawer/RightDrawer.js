import React from 'react';

import {
  Icon,
  Header
} from '../UI';

export default function RightDrawer(props) {

  const { header } = props;
  
  return (
    <div className="tnm-rightdrawer-wrapper">
      <div className="tnm-drawer">

        <div className="drawer-header">
          <div className="tnm-drawer-close" onClick={props.onDrawerClose}>
            <Icon name="close" />
          </div>
          <Header text={header} />
        </div>   
        
        
        
        {props.children}
      </div>
    </div>
  );
}