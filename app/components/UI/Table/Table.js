import React from 'react';

export default function Table(props) {

  let clazz = 'tnm-table';
  if(props.className) {
    clazz += ' ' + props.className;
  }
  
  return (
    <table className={clazz}
           style={props.style}
           cellSpacing="0">
      {props.children}
    </table>
  );
}