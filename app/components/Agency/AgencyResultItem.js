import React from 'react';

import BlinkingText from '../BlinkingText';

export default function AgencyResultItem(props) {

  const { item } = props;

  const name = item.nome;
  const initials = item.sigla;

  const city = item.cidades.nome;
  const state = item.cidades.estados.nome;
  
  return (
    <li className="tnm-agency-result-item" onClick={props.onClick}>
      <div className="tnm-agency-content">
        <BlinkingText>
          {`${initials.toUpperCase()} - ${name}`}
        </BlinkingText>
      </div>

      <div className="tnm-agency-location">
        {`${city} • ${state}`}
      </div>
    </li>
  );
}