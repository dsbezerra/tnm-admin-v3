import React from 'react';

export default function Table(props) {
  return (
    <table className="tnm-table"
           style={props.style}
           cellSpacing="0">
      {props.children}
    </table>
  );
}