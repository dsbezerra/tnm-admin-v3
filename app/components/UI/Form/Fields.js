import React from 'react';

export default function Fields(props) {

  const {
    num,
    centered
  } = props;
  
  let clazz = 'fields';
  if(num) {
    clazz += ' ' + num;
  }

  if(centered) {
    clazz += ' horizontal-centered';
  }
  
  return (
    <div className={clazz}>
      {props.children}
    </div>
  );
}