import React from 'react';

export default function HorizontalScroller(props) {
  const {
    className,
    style
  } = props;

  let clazz = 'scroller horizontal ' + className;
  
  const inlineProps = {
    className: clazz,
    style
  }
  
  return (
    <div className="scroller-wrapper">
      <div {...inlineProps} >
        {props.children}
      </div>
    </div>
  );
}