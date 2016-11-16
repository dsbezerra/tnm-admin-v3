import React from 'react';

export default function ModalHeader(props) {
  const { title } = props;
  return (
    <div className="tnm-modal-header">
      {title}
    </div>
  );
}