import React, { PropTypes } from 'react';

function Header(props) {
  const { text } = props;
  return (
    <h3 className="tnm-header" style={props.style}>
      {text}
      {props.children}
    </h3>
  );
}

Header.propTypes = {
  text: PropTypes.string.isRequired
}

export default Header;