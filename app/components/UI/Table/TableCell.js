import React from 'react';

export default function TableCell(props) {

  const {
    text
  } = props;
  
  let clazz = 'table-cell';

  if(props.className) {
    clazz += ' ' + props.className;
  }
  
  return (
    <td className={clazz}>
      {text ? text : props.children }
    </td>
  );
}