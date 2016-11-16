import React from 'react';

import {
  Button
} from '../UI';

export default function FilterButtons(props) {
  return (
    <div className="tnm-filter-buttons">
      <Button text="Aplicar mudanças" onClick={props.onApply} />
      <Button text="Limpar filtro" onClick={props.onClear} />
    </div>
  );
}