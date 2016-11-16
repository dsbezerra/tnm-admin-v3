import React from 'react';

export default function Toast(props) {

  const {
    text
  } = props;
  
  return (
    <div className="tnm-toast-wrapper" onClick={props.onClick}>
      <div className="tnm-toast-wrapper">
        <div className="tnm-toast">
          <span className="text">{text}</span>
        </div>
        <span className="time-indicator"></span>
      </div>
    </div>
  );
}