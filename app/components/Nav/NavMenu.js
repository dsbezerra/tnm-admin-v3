import React from 'react';
import _ from 'lodash';

import { MENUITEM_NAV_DIVIDER,
         MENUITEM_NAV_HEADER,
         MENUITEM_NAV_LIST,
         MENUITEM_NAV_LIST_ITEM } from '../../constants/MenuItemTypes.js';

import NavMenuItemDivider from './MenuItems/NavMenuItemDivider';
import NavMenuItemHeader from './MenuItems/NavMenuItemHeader';
import NavMenuItem from './NavMenuItem';


function checkForActivePath(pathname, active) {

  if(pathname === '/')
    return false;
  
  return active.indexOf(pathname) > -1;
}

export default function NavMenu(props) {

  const { menuItems, active } = props;
  const children = _.map(menuItems, (menuItem, menuItemIndex) => {
    
    if(menuItem.type === MENUITEM_NAV_DIVIDER) {
      return <NavMenuItemDivider key={menuItemIndex}/>;
    }

    if(menuItem.type === MENUITEM_NAV_HEADER) {
      return <NavMenuItemHeader key={menuItemIndex} text={menuItem.text} />;
    }

    if(menuItem.type === MENUITEM_NAV_LIST) {
      const listItems = _.map(menuItem.items, (item, index) => {
        if(item.type === MENUITEM_NAV_LIST_ITEM) {
          return (
            <NavMenuItem key={item.pathname}
                         menu={item}
                         active={checkForActivePath(item.pathname, active)}
                         onClick={props.onMenuItemClick.bind(this, item)}
            />
          );
        }
      });

      return (
        <ul key={'ul-' + menuItemIndex}>
          {listItems}
        </ul>
      );
    }
  });
  
  
  return (
    <div className="tnm-nav-menu">
      {children}
    </div>
  );
}