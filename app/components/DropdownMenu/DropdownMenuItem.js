import React from 'react';

export default function DropdownMenuItem(props) {
  const { text } = props;

  return (
    <li className="item" style={props.style} onClick={props.onClick}>
      {text}
    </li>
  );
}