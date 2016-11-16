import React from 'react';

import ModalHeader from './ModalHeader';
import ModalClose from './ModalClose';
import ModalContent from './ModalContent';
import ModalFooter from './ModalFooter';

export default function Modal(props) {

  const {
    title,
    buttons,
    content
  } = props;

  return (
    <div className="tnm-modal-wrapper">
      <div className="tnm-modal">
        <ModalHeader title={title} />
        <ModalContent>
          {props.children}
        </ModalContent>
        <ModalFooter buttons={buttons}/>
      </div>
    </div>
  );
}