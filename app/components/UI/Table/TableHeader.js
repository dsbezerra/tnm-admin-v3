import React from 'react';

import { Icon } from '../../UI';

export default function TableHeader(props) {

  const { header, active, order } = props;

  let clazz = 'table-header';

  if(props.className) {
    clazz += ' ' + props.className;
  }

  if(active) {
    clazz += ' active';
  }
  
  return (
    <th className={clazz} onClick={props.onClick}>
      {header}
      {active ? <Icon name={order === 'DESC' ? 'keyboard_arrow_down' : 'keyboard_arrow_up'}
                      style={{
                        position: 'relative',
                        top: '5px',
                        left: '5px',
                        fontSize: '22px',
                      }}
                /> : null }
    </th>
  );
}