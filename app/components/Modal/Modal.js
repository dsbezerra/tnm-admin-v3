import React from 'react';

import ModalHeader from './ModalHeader';
import ModalClose from './ModalClose';
import ModalContent from './ModalContent';
import ModalFooter from './ModalFooter';

export default function Modal(props) {

  const {
    title,
    buttons,
    content,
    className
  } = props;

  let clazz = 'tnm-modal';
  if(className)
    clazz += ' ' + className;

  return (
    <div className="tnm-modal-wrapper">
      <div className={clazz}>
        <ModalHeader title={title} />
        <ModalContent>
          {props.children}
        </ModalContent>
        <ModalFooter buttons={buttons}/>
      </div>
    </div>
  );
}