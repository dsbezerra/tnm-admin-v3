import React from 'react';
import _ from 'lodash';

import Divider from '../Divider';
import Header from './Header';
import Icon from '../Icon';

function renderViewStyles(props) {
  const {
    viewStyles,
    active,    
  } = props;

  const items = _.map(viewStyles, (style, i) => {

    const clazz = active === style.id ? 'active' : '';
    
    return (
      <li key={style.id}
          className={clazz}
          onClick={props.onViewStyleClick ? props.onViewStyleClick.bind(this, style.id) : null}
      >
        {style.icon ? <Icon name={style.icon} /> : null}
        {style.text ? style.text : null }
      </li>
    );
  });

  return (
    <ul className="tnm-header-actions-list">
      {items}
    </ul>
  );
}

export default function ActionHeader(props) {

  const {
    header,
    viewStyles
  } = props;

  return (
    <div className="tnm-header-actions">
      <div className="tnm-horizontal-layout vertical-centered spaced">
        <Header text={header} />
        {renderViewStyles(props)}
      </div>
      <Divider />
    </div>
  );
}