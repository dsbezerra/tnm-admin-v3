import React from 'react';
import VelocityComponent from 'velocity-react/velocity-component';

import Modal from './Modal';

export default function ConfirmationModal(props) {

  const {
    title,
    text,
    onConfirm,
    onCancel,
  } = props;

  const buttons = [
    {
      text: props.cancelText || 'Cancelar', onClick: onCancel 
    },
    {
      text: props.confirmText || 'Confirmar', onClick: onConfirm
    }
  ];

  const animationProps = {
    animation: {
      opacity: [1, 0],
      scale: [1, 0.8],
    },
    duration: 400,
  };

  return (
    <VelocityComponent {...animationProps} runOnMount>
      <Modal title={title} buttons={buttons}>
        {text || props.children}
      </Modal>
    </VelocityComponent>
  );
}