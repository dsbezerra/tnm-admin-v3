import React from 'react';

import {
  Header
} from '../UI';

export default function Filter(props) {

  const {
    title
  } = props;
  
  return (
    <div className="tnm-filter">
      <Header text={title || 'Filtro'} />
      {props.children}
    </div>
  );
}