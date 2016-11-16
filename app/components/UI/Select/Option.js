import React, { Component } from 'react';

export default function Option(props) {

  const { active, text } = props; 
  
  return (
    <span className={active ? 'tnm-option active' : 'tnm-option'}
          onClick={props.onClick}>{text}</span>
  );
}