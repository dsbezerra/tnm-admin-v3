import React from 'react';

export default function TextArea(props) {
  const { placeholder } = props;

  let clazz = 'tnm-textarea';
  if(props.className) {
    clazz += ' ' + props.className;
  }
  
  return (
    <textarea id={props.id}
              placeholder={placeholder}
              className={clazz}
              onChange={props.onChange}
    >
    </textarea>
  );
}