import React from 'react';

export default function NavLogout(props) {
  return (
    <div className="tnm-nav-logout" onClick={props.onClick}>
      <p>SAIR</p>
    </div>
  );
}