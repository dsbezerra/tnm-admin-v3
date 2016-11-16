import React from 'react';

import { Link } from 'react-router';

export default function Page(props) {
  const {
    text,
    num,
    active,
  } = props;
  
  return (
    <div className={"tnm-page" + (active ? ' active' : '')}
         onClick={props.onClick.bind(this, num)}>
      {text}
    </div>
  );
}