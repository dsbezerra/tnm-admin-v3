import React from 'react';

export default function NavWelcome(props) {

  const { username } = props;
  
  return (
    <div className="tnm-nav-welcome">
      <div>
	<p>Bem-vindo,</p>
	<p>{username}</p>
      </div>
      <div className="tnm-nav-logout">
	<span onClick={props.onLogout}>Sair</span>
      </div>
    </div>
  );
}