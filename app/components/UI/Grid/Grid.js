import React from 'react';

export default function Grid(props) {

  const { className, style } = props; 

  let clazz = 'tnm-grid';

  if(className) {
    clazz += ' ' + className;
  }
  
  return (
    <div className={clazz} style={style}>
      {props.children}
    </div>
  );
}