import React from 'react';
import _ from 'lodash';

import ModalButton from './ModalButton';

export default function ModalFooter(props) {

  const {
    buttons,
  } = props;

  const children = _.map(buttons, (button, index) => {
    return (
      <ModalButton key={index}
                   text={button.text}
                   onClick={button.onClick}
      />
    );
  });
  
  return (
    <div className="tnm-modal-footer">
      {children}
    </div>
  );
}
