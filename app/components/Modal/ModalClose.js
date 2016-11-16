import React from 'react';

import { Icon } from '../UI';

export default function ModalClose(props) {
  return (
    <span className="tnm-modal-close" onClick={props.onClick}>
      <Icon name="close" />
    </span>
  );
}