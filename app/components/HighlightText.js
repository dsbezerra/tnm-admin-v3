import React from 'react';

export default function HighlightText(props) {
  const { text, color } = props;
  return (
    <span className={'highlight ' + (color ? color : 'white')}>
      {text || props.children}
    </span>
  );
}