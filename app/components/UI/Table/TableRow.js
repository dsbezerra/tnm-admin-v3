import React from 'react';

export default function TableRow(props) {
  return (
    <tr onClick={props.onClick}>
      {props.children}
    </tr>
  );
}