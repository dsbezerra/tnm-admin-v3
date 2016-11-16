import React from 'react';

export default function VerticalScroller(props) {
  const {
    className,
    style
  } = props;

  let clazz = 'scroller vertical ' + className;
  
  const inlineProps = {
    className: clazz,
    style
  }
  
  return (
    <div {...inlineProps} >
      {props.children}
    </div>
  );
}