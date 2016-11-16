import React from 'react';

export default function BlinkingText(props) {
  const { text, color } = props;
  return (
    <span className={'blinking ' + (color ? color : 'white')} style={props.style}>
      {text || props.children}
    </span>
  );
}