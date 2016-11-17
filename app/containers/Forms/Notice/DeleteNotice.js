import React from 'react';

import {
  getModalityName,
} from '../../../utils/NoticeUtils';

import BlinkingText from '../../../components/BlinkingText';

export default function DeleteNotice(props) {
  const {
    notice
  } = props;

  return (
    <div>
      <p>
        A licitação <BlinkingText text={getModalityName(notice.modalidade) + ' - ' + notice.numero} /> será removida permanentemente.
      </p>
      <br/>
      <br/>
      
      <p>Tem certeza de que quer continuar?</p>
    </div>
  );
}