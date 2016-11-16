import React from 'react';

export default function Divider(props) {

  const {
    className
  } = props;

  let clazz = 'tnm-divider';
  if(className)
    clazz += ' ' + className;
  
  return (
    <div className={clazz}></div>
  );
}