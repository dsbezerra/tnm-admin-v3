import React from 'react';

export default function AdminContextMenu(props) {
  return (
    <div className="tnm-contextmenu-wrapper admin">
      <ul className="tnm-contextmenu">
        <li onClick={props.onLogout}>Deslogar</li>
      </ul>
    </div>
  );
}