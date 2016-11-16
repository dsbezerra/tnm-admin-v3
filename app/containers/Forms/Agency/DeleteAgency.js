import React from 'react';

import HighlightText from '../../../components/HighlightText';
import BlinkingText from '../../../components/BlinkingText';

export default function DeleteAgency(props) {

  const {
    agency
  } = props;

  return (
    <div>
      <p>
        O órgão <BlinkingText text={agency.nome} /> será removido permanentemente do banco de dados.
      </p>

      <br/>

      <HighlightText>ID: </HighlightText>
      <span>{agency.id}</span>

      <br/>

      <HighlightText>Sigla: </HighlightText>
      <span>{agency.sigla.toUpperCase()}</span>

      <br/>
      
      <HighlightText>Nome: </HighlightText>
      <span>{agency.nome}</span>

      <br/>
      
      <HighlightText>Local: </HighlightText>
      <span>{agency.cidades.nome + ' - ' + agency.cidades.estados.nome}</span>

      <br/>
      <br/>
      
      <p>Tem certeza de que quer continuar?</p>
    </div>
  );
}