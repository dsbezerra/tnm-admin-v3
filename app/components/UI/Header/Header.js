import React, { PropTypes } from 'react';

function Header(props) {
  const { text } = props;
  return (
    <h3 id={props.id} className="tnm-header" style={props.style}>
      {text}
      {props.children}
    </h3>
  );
}

Header.propTypes = {
  text: PropTypes.string.isRequired
}

export default Header;