import React from 'react';
import VelocityComponent from 'velocity-react/velocity-component';

import Modal from '../../../components/Modal';

export default function DeleteSegment(props) {

  const {
    segment,
  } = props;

  const buttons = [
    { text: 'Cancelar', onClick: props.onCancel },
    { text: 'Sim, tenho', onClick: props.onDeleteConfirm },
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
      <Modal title="Confirmação de Remoção" buttons={buttons}>
        <p>O segmento <span className="highlight white">{segment.descricao}</span> será permanentemente deletado.</p>
        <br/>
        <p>Tem certeza disso?</p>
      </Modal>
    </VelocityComponent>
  );
}