import React from 'react';

export default function ModalButton(props) {
  const { text } = props;
  return (
    <button className="tnm-modal-button" onClick={props.onClick}>
      {text}
    </button>
  );
}