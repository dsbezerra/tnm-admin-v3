import React from 'react';

export default function Field(props) {

  const {
    className
  } = props;

  let clazz = 'field';
  if(className) {
    clazz += ' ' + className;
  }
  
  return (
    <div className={clazz} style={props.style}>
      {props.children}
    </div>
  );
}